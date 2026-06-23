# Rebar V1: AI Bid Coordination

**Product Manager Case Study — written response**

> Companion to the interactive prototype in this repo (`rebar-bid-coordination/`, `npm run dev`). The prototype demonstrates the routing experience described below; this document covers the thinking, scope, and tradeoffs behind it.

---

## Thesis

This is not primarily an automation problem. It's a **trust and consistency** problem that automation can help with — but only if we sequence it correctly.

The brief says it plainly: *"bad routing creates downstream frustration even when it eventually gets corrected,"* *"Bad assignment wastes more time than slow assignment,"* and from a manager, *"I care less about saving a few clicks and more about routing jobs consistently... I don't want a black box making mistakes."* The single most valuable thing V1 can do is take routing logic that *"mostly lives in my head"* and turn it into a **visible, shared, auditable system**. Faster routing is the second-order win; consistency and reduced key-person risk are the first-order win.

So the design principle for V1 is: **be conservative where the system is uncertain, transparent everywhere, and let speed follow trust — not the other way around.**

---

## 1. The workflow today

A contractor emails a plan set to the supplier office. A bid coordinator then: downloads the files → opens them (usually Bluebeam) → reviews the job for the handful of attributes that drive assignment → uploads it into Rebar → applies internal office rules → assigns an estimator, who starts the takeoff.

The decision hinges on a known, small set of attributes: job size, estimated equipment value, building type, equipment, duct type, contractor/territory, branch rules, estimator specialization, urgency, and whether the job should stay with someone who already owns it.

Critically, **most of this happens outside Rebar** — in email, shared folders, and Bluebeam — *before* the job ever fully enters the system. ~75% of jobs are reviewed outside Rebar first.

## 2. Where the real pain is

It is not "too many clicks." The pain is structural:

- **Tribal knowledge / key-person risk.** *"The rules mostly live in my head. We have patterns, but there are always exceptions."* The process depends on specific people; if they're out, routing degrades.
- **The verification tax.** Coordinators say they can tell where a job goes *in a few minutes* — but they still open everything to check. That re-verification is the bulk of the ~10 min/job, repeated ~60×/week (~10 hrs/week per office just triaging).
- **Cost of bad routing.** ~10% of jobs are reassigned. Each bad route is rework *plus* downstream frustration *plus* an erosion of trust in any future system.
- **Messy inputs.** ~30% of jobs arrive incomplete or unclear; subject lines and attachments are inconsistent. This is exactly where naive automation fails loudly.

## 3. What I'd build for V1

A **bid-coordination inbox** inside Rebar that takes a job from email to a confident assignment on one screen:

1. **Pull jobs from email** — ingest the plan set and message automatically.
2. **AI extraction** — read the email + plan set into the structured decision fields (contractor, value estimate, building type, equipment, duct type, branch, federal flag, addendum/continuity signal), each with a **confidence score** and a link back to the source.
3. **Visible rule engine** — evaluate the job against the office's explicit rules.
4. **One of three outcomes** — auto-assign, recommend-with-review, or hold-for-manual-review (see §6).
5. **Explainable result** — every recommendation cites the rule(s) and the field values that triggered them.
6. **Override with reason code** — corrections are one click and always capture *why*, feeding a weekly review loop.

**Explicitly out of scope for V1** (consistent with "limited engineering resources" and "one office"): multi-office rollout, real-time estimator-capacity/load-balancing, fully autonomous routing with no review path, and end-user inline rule editing (rules are admin-configured and reviewed in V1).

## 4. Where AI should — and shouldn't — be used

This is the most important tradeoff in the design.

- **AI should do the extraction.** Turning a messy email + PDF plan set into normalized, structured fields is the genuinely hard, high-leverage problem, and it's what Rebar's drawing-analysis capability is already good at. Output every field *with a confidence score.*
- **AI should not make the routing decision opaquely.** The routing decision should be a **deterministic, inspectable rule engine** operating on the AI-extracted fields.

**Why separate them?** Because it's what makes the system trustworthy and debuggable. When a job is mis-routed you can immediately tell *which layer failed* — a bad extraction (fix the model/field) or a bad/missing rule (fix the rule) — and correct the right thing. An end-to-end LLM that both reads *and* decides cannot give a faithful "why," which collides head-on with *"If the system is going to route something, I need to understand why"* and *"I don't want a black box making mistakes."* Separation also lets extraction accuracy and routing rules improve independently.

## 5. How assignment logic should work

Rules are **explicit, typed, and visible** to coordinators. There are three kinds, evaluated with clear precedence:

1. **Hard gates (highest precedence).** Federal jobs → always manual review. Missing/low-confidence *gating* field → hold. These never get auto-resolved, regardless of confidence.
2. **Continuity.** Addendum-only updates → stay with the original estimator if one exists. Continuity beats fresh routing.
3. **Routing rules.** The specialization/value/contractor/territory rules.

**Conflict handling is the heart of the engine.** When multiple routing rules match *and disagree*, the system does **not** silently pick one — it surfaces all matching rules with their reasons and asks the coordinator to decide. Resolving a genuine conflict "correctly" requires exactly the human judgment we're trying to respect; auto-resolving it is how you manufacture the bad routes that destroy trust. (An office can configure tie-break priority later, once we've watched real conflicts resolve.)

**Worked against the brief's sample jobs:**

| Job | Decision-relevant facts | Rules that fire | Outcome |
|---|---|---|---|
| **A — Memorial West** | Hospital, spiral, **$420k**, Houston | Value→Senior · Hospital→Healthcare · Spiral→Mark | **3 rules disagree → recommend, surface conflict** |
| **B — Lakeside Retail** | GRD-only, **$18k** | GRD-only <$25k → Bob | **single clean match → auto-assign candidate** |
| **C — Green Valley HS** | School/N. Texas, RTUs+fans+accessories | School N.TX→Sarah · fans+RTUs+accessories→Commercial Applied | **2 rules disagree → recommend, surface conflict** |
| **D — Jefferson Labs** | Lab, spiral, **$310k**, Contractor X | Value→Senior · Lab→Healthcare · Spiral→Mark · Contractor X→Dallas | **4 rules disagree → recommend, surface conflict** |
| *Federal job* | any | Federal gate | **hold for manual review, even if confident** |

Job B is the one clean auto-assign in the sample set — which is the right instinct for V1: automate the unambiguous, surface the rest.

## 6. When to recommend vs. auto-assign

A job **auto-assigns only if all of the following hold**:

- exactly **one** routing rule matches (no conflict), **and**
- extraction confidence on the fields that rule depends on is **above threshold**, **and**
- **no hard gate** applies (not federal, no missing gating field), **and**
- the office has **opted in** to auto-assign for that rule class.

Everything else is a **recommendation with review**, or a **hold**. We start with auto-assign **off or limited to the most unambiguous rule classes** (e.g. GRD-only under $25k) and expand rule-by-rule as the data earns it. This conservative default is deliberate: the brief is explicit that customers *"may not initially trust full auto-assignment,"* and that incorrect routing is worse than slow routing.

## 7. The human review experience

One screen that collapses the "open everything and check" ritual into fast verification:

- **A triaged queue** — *Needs your call* (conflicts), *Manual review* (gates), *Auto-eligible*, *Done*.
- **Per job:** the AI-extracted fields with per-field confidence and a link to the source email/plan set; the rule(s) that fired in plain language; the recommendation; one-click **Assign** or **Override**.
- **For conflicts:** all competing rules shown side by side, each with its reason — the coordinator chooses, they don't reverse-engineer.
- **For gates:** a clear banner explaining *why* the job is held, plus a **required acknowledgment** ("I've reviewed the plan set and the fields are correct") before assignment unlocks.

The goal is to honor *"Don't just dump a project in my lap"* — the estimator receives a job with its full extracted context and the reason it was routed to them.

## 8. How users understand *why*

Every recommendation cites **the specific rule(s) by plain-language name and the field values that triggered them** — e.g. *"Equipment value $420,000 is above the $250,000 senior-estimator threshold."* Extraction confidence is shown per field, so a coordinator can see at a glance whether the *inputs* are trustworthy, separately from whether the *rule* applies.

Because the decision layer is deterministic rules (not an LLM verdict), the explanation is **always faithful** — it is the actual logic that produced the routing, not a plausible-sounding rationalization. That faithfulness is the entire point of the §4 architecture.

## 9. How mistakes and corrections are handled

- **Any assignment — auto or recommended — can be overridden,** and an override **requires a reason code**: *missed detail in extraction · workload balancing · relationship/continuity · other.*
- **Reason codes are the training signal.** They tell us whether a miss was an **extraction** problem (fix the model/field), a **rules** problem (add/adjust a rule), or **genuine judgment** (leave it to the human). Without the reason code, every correction looks the same and we learn nothing.
- **A weekly review** of all overrides and reassignments refines the rules and extraction. This is the loop the managers are asking for — *"routing jobs consistently"* — and it's how the system earns expanded auto-assign scope over time.

## 10. What success looks like

Ordered by what protects trust first — **deliberately not led by "% automated,"** because a high automation rate with worse routing is a failure, not a win.

1. **Guardrail — don't regress:** reassignment rate stays at or below today's ~10%. This is the line we do not cross to chase automation.
2. **Efficiency:** coordinator time per *clean* job drops from ~10 min → **<4 min** (measured only on unambiguous, single-match jobs — not conflicts or gates).
3. **Trust / adoption:** the ~75% of jobs reviewed outside Rebar first goes **down** as coordinators stop re-opening Bluebeam to second-guess the system; recommendation-accept-without-override rate goes **up**.
4. **Coverage:** % of jobs auto-assignable without review, expanded *deliberately*, rule-by-rule.

Business framing: ~60 jobs/week × several minutes saved on the clean subset is real money against $50–70k coordinator salaries — but the larger prize is consistency and removing key-person risk.

## 11. Rollout, risks, and edge cases

**Rollout — earn trust before spending it:**

- **Phase 0 — Shadow mode.** System extracts and recommends; coordinators work exactly as they do today. We measure recommendation accuracy against what they actually choose. No auto-assign. This *builds the trust case and the training data simultaneously.*
- **Phase 1 — Recommend-with-review** for everything; auto-assign still off.
- **Phase 2 — Auto-assign on,** narrowly: the unambiguous, high-confidence, no-gate, no-conflict class (e.g. GRD-only <$25k). Expand one rule at a time, gated on the reassignment guardrail staying clean.
- **Phase 3 — Configurable rules** surfaced to office admins (the brief notes *"some customers will want configurable rules"*).

**Risks and mitigations:**

- **Over-trust** (auto-assign expands too fast → bad routes → trust collapses): conservative gating + the reassignment guardrail as a hard stop.
- **Under-trust** (coordinators ignore it, keep using Bluebeam): shadow-mode accuracy proof + faithful explainability so the system visibly shows its work.
- **Extraction errors on messy inputs**: confidence gating; low confidence on a gating field → hold, never guess.
- **Rule rot**: the weekly override review keeps rules current as the office evolves.

**Edge cases (and the rule):**

- *Incomplete / missing gating field* → hold for manual review; never guess on a field that drives a gate.
- *Ambiguous building type* → low confidence on that field; if a rule depends on it, surface as uncertain rather than auto-assign.
- *Conflicting rules* → surface all, don't auto-resolve (§5).
- *Addendum / continuity* → if a prior estimator exists, continuity wins over fresh routing.
- *Federal* → always manual, even at high confidence and single match.
- *Design-build + bid due soon* → an **advisory note** ("speed may matter more than perfect specialization"), not a hard override — because *"urgency can override specialization"* is a judgment call best surfaced to the human, not enforced by the machine.
- *Unparseable email / wrong attachment* → general triage queue, not routed.

---

## Closing

V1 wins by being **conservative where it's uncertain and transparent everywhere.** It externalizes tribal knowledge into a shared, auditable rule system; it lets AI do the hard extraction work it's good at while keeping the routing decision inspectable; and it automates only the unambiguous cases, expanding that scope only as a reassignment guardrail proves the trust is earned. Speed is the reward for getting consistency and explainability right first.
