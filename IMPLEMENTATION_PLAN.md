# Implementation Plan

Generated: 2026-03-09

## Priority Queue

Items with remaining work, sorted by priority (highest first).

### 1. agent:sigil
- **Status:** partial
- **Spec detail:** detailed
- **Spec:** `grimoire/agents/sigil.md`
- **Dependencies:** skill:checks (done), agent:familiar (done)
- **Tasks:**
  1. ~~Create sigil agent definition and prompt (single-context vulnerability hunter)~~ DONE
  2. ~~Implement summon → sigil spawning logic (requires summon update)~~ DONE — Added step 9 to summon workflow, reference doc `sigil-spawning.md` with subagent prompt template, `select-checks.sh` for language filtering, slug convention, user confirmation gate, batch-of-5 parallelism. Familiar triage deferred with explicit insertion point.
  3. ~~Build check-based sigil abstraction for deterministic findings~~ DONE (Mode 1 step 3)
  4. ~~Implement variant-sigil for recurring bug patterns (post-finding)~~ DONE (Mode 2)
  5. Implement super-sigil pattern (semgrep/slither runners spawning validation sigils) — blocked on semgrep/slither skills
  6. ~~Design sigil → familiar triage coordination~~ DONE — Sigil constraint updated to route findings through familiar. Summon step 9 invokes familiar batch triage. Sigil-spawning reference doc updated with active integration pipeline.

### 2. agent:scribe
- **Status:** done
- **Spec detail:** detailed
- **Spec:** `grimoire/agents/scribe.md`
- **Dependencies:** skill:checks (done), agent:familiar (done)
- **Tasks:**
  1. ~~Design scribe agent prompt (autonomous detection module builder)~~ DONE — `agents/scribe.md` with 3 modes (distill, spellbook management, query), core principle "Every finding is a lesson", strategy section covering static analysis preference/FP discipline/Gnome collaboration/Familiar handoff/incremental growth, output format templates, 8 constraints.
  2. ~~Implement scribe invocation from finding workflows~~ DONE — finding-draft step 6 suggests `/scribe-distill`, sigil agent constraint updated with active scribe reference, checks SKILL.md suggests scribe distill, finding-structure.md references scribe-distill.
  3. ~~Build enscribe skill (finding → static analysis module or knowledge artifact)~~ DONE — Implemented as `skills/scribe-distill/` with 9-step workflow, `references/feasibility-criteria.md` (3-tier classification: static/agentic/not-automatable with FP estimation), `references/sigil-types.md` (taxonomy with decision flowchart, available-now vs planned types). Gnome delegation stubbed with fallback to direct check creation.
  4. ~~Implement variant analysis workflow~~ DONE — scribe-distill step 8 assesses variant analysis potential, step 9 suggests spawning variant sigil. Actual variant scanning delegated to sigil agent Mode 2 (existing).
  5. ~~Create spellbook storage structure~~ DONE — Uses established `grimoire/spells/checks/` for checks, adds `grimoire/spells/knowledge/` for knowledge artifacts, `~/.grimoire/sigils/` and `~/.grimoire/knowledge/` for personal grimoire.
  6. ~~Document scribe-summon integration~~ DONE — summon step 8 updated: personal grimoire discovery, `/scribe-gc` suggestion with scope "both", GRIMOIRE.md notes `/scribe-distill` for future modules.
- **Additional skills:** `skills/scribe-gc/` (5-step GC workflow with archive-not-delete, user confirmation gates), `skills/scribe-utilities/` (4-step query workflow: list/describe/stats/search).
- **Spec coverage:** 47/53 requirements covered, 1 partial (FP feedback loop — lifecycle feature for future), 2 noted-planned (Gnome delegation). 3 minor gaps: FP feedback loop for refining existing sigils, sigil upgrade tracking when semgrep/slither ship, knowledge artifact promotion path (added during review).

### 3. concept:backpressure (enforcement in skills)
- **Status:** partial
- **Spec detail:** detailed
- **Spec:** `grimoire/concepts/backpressure.md`
- **Dependencies:** None
- **Tasks:**
  1. Create shared reference doc `backpressure-methods.md` listing when to use semgrep/codeql/slither
  2. Add to summon step 8: explicit check for backpressure before recommending autonomous findings
  3. Add to write-poc: "avoid unmeasurable claims" guidance

### 4. concept:the-original-sin + concept:leverage (explicit in skills)
- **Status:** partial (implicit)
- **Spec detail:** detailed
- **Dependencies:** None
- **Tasks:**
  1. Create shared reference doc `principles.md` covering human judgment, leverage, and the original sin
  2. Update write-poc philosophy section to reference human-directed hypothesis, not autonomous exploitation
  3. Update summon philosophy to emphasize researcher interprets crown jewels, agent only maps

### 5. concept:trivial-verifiability (explicit in skills)
- **Status:** partial
- **Spec detail:** detailed
- **Spec:** `grimoire/concepts/(trivial) verifiability.md`
- **Dependencies:** None
- **Tasks:**
  1. Add verifiability language to write-poc steps 2-3 (goal condition as testable hypothesis)
  2. Reference falsifiable vs verifiable distinction in summon step 8 and checks step 2

### 6. concept:hypothesis-generation (explicit in skills)
- **Status:** partial
- **Spec detail:** detailed
- **Spec:** `grimoire/concepts/hypothesis generation.md`
- **Dependencies:** None
- **Tasks:**
  1. Frame goal condition as "testable hypothesis" in write-poc
  2. Add seeded vs unseeded guidance to cartography exploration modes

### 7. concept:context-building (gadgets gap)
- **Status:** partial
- **Spec detail:** detailed
- **Spec:** `grimoire/concepts/context building.md`
- **Dependencies:** None for concept; gadgets depend on proof-of-concept integration
- **Tasks:**
  1. Document gadget concept and catalog structure
  2. Add gadget awareness to write-poc workflow (check for applicable gadgets)

### 8. flow:finding-discovery
- **Status:** partial
- **Spec detail:** partial
- **Spec:** `grimoire/flows/finding discovery.md`
- **Dependencies:** skill:finding (done), agent:scribe
- **Tasks:**
  1. Document end-to-end flow once finding skill is built
  2. Wire PoC → finding → scribe pipeline

### 9. flow:autonomous-discovery
- **Status:** not_implemented
- **Spec detail:** partial
- **Spec:** `grimoire/flows/autonomous discovery.md`
- **Dependencies:** agent:sigil (done), agent:familiar (done), skill:finding (done)
- **Tasks:**
  1. Implement sigil → familiar → PoC → finding pipeline
  2. Wire librarian integration points
  3. Document the full autonomous discovery flow

### 10. skill:scribe-distill
- **Status:** not_implemented
- **Spec detail:** partial
- **Spec:** `grimoire/skills/scribe.md`
- **Dependencies:** agent:scribe
- **Tasks:**
  1. Create `skills/scribe-distill/` directory
  2. Draft SKILL.md with workflow (capture context → analyze for patterns → propose automation)
  3. Build examples of distillation for common vuln types
  4. Define trigger conditions and integration with scribe agent

### 11. concept:personal-grimoire
- **Status:** not_implemented
- **Spec detail:** partial
- **Spec:** `grimoire/concepts/personal grimoire.md`
- **Dependencies:** agent:scribe (manages it)
- **Tasks:**
  1. Define ~/.grimoire/ directory structure
  2. Implement sigil merge workflow (project → personal grimoire)

### 12. infra:spellbook (management)
- **Status:** partial
- **Spec detail:** partial
- **Spec:** `grimoire/agents/scribe.md`
- **Dependencies:** agent:scribe
- **Tasks:**
  1. Add user-facing explanation of spellbook concept
  2. Implement spellbook management workflow (depends on scribe)

### 13. infra:tomes (format guidance)
- **Status:** partial
- **Spec detail:** partial
- **Spec:** `grimoire/skills/summon.md`, `grimoire/ideas/todo.md`
- **Dependencies:** None
- **Tasks:**
  1. Create format guidance doc for tomes
  2. Add "when to create a tome" guidance to summon

## Implementation Debt

Items that work but need structural improvements.

### concept:trivial-verifiability
- Enforced via PoC checklist but falsifiable vs verifiable framing absent from skill instructions
- See Priority Queue #5 for tasks

### concept:hypothesis-generation
- Partially reflected in PoC goal conditions and cartography exploration modes
- See Priority Queue #6 for tasks

### concept:backpressure
- Checks skill provides backpressure; no explicit enforcement mechanism in other skills
- See Priority Queue #3 for tasks

### infra:tomes
- Summon creates tomes/ directory; needs format guidance doc
- See Priority Queue #13

### infra:spellbook
- Summon creates spells/ directory; checks stores in grimoire/spells/checks/
- Scribe agent now provides management workflow (distill, GC, utilities, end-of-audit merge)
- Remaining: user-facing explanation doc for the spellbook concept

## Completed

- **skill:write-poc** — Production-ready. SKILL.md with Philosophy section, `user_invocable: true`, 5-step workflow with confirmation checkpoints at every step, vuln-class-to-reference lookup table in step 3. 10 reference files covering 7+ vulnerability classes. 4 worked examples (ssrf-curl, sqli-python, reentrancy-foundry, price-oracle-fork-test) demonstrating all 4 PoC approaches. scripts/validate-poc.sh for structural validation. Full spec coverage, 0 debt. Thin references (crypto-vulns, config-issues, general-principles) noted as future content improvement opportunity.
- **skill:finding** — Base knowledge skill. Teaches finding structure, format, best practices, severity scale, filing conventions. SKILL.md + references (finding-format.md, finding-best-practices.md, finding-structure.md) + examples (reentrancy, access-control, dedup-scenario) + scripts (index-findings.sh, validate-finding.sh). Full spec coverage, 0 debt.
- **skill:finding-draft** — Workflow skill. 6-step draft workflow. Loads base finding skill first.
- **skill:finding-review** — Workflow skill. 3-step review workflow. Loads base finding skill first.
- **skill:finding-dedup** — Workflow skill. 3-step dedup workflow. Loads base finding skill first.
- **infra:findings-structure** — Implemented in skill:finding. Frontmatter schema, filing conventions, cross-linking documented in skills/finding/references/.
- **skill:checks** — Production-ready. SKILL.md (3 modes: create/apply/manage), references/check-format.md + references/design-principles.md, 5 worked examples, scripts/index-checks.sh + scripts/validate-check.sh. Full spec coverage, 0 debt.
- **skill:summon** — Production-ready. 290-line SKILL.md, references/domain-crown-jewels.md, examples/grimoire-md-example.md. Full spec coverage, no debt.
- **skill:cartography** — Production-ready. SKILL.md + references/cartography-format.md + examples/cartography-example.md + scripts/index-cartography.sh. Full spec coverage, no debt.
- **concept:what-is-grimoire** — Covered by README.md and overall plugin design.
- **concept:agent-context** — Subagent patterns used throughout all implemented skills.
- **concept:dont-get-in-the-way** — Exploration-first approach in cartography and summon.
- **infra:audit-directory-structure** — Fully specified in summon SKILL.md step 2.
- **infra:cartography-directory** — Fully specified with format, indexing script, and examples.
- **skill:review-cartography** — Production-ready. SKILL.md (6-step workflow with subagent decomposition for independent verification). references/cartography-format.md (symlink to cartography skill), references/overlap-detection.md (>40% threshold formalization, 3-tier overlap classification). examples/cartography-review-example.md (before/after review cycle with 4 common issues). scripts/validate-cartography.sh (frontmatter, sections, file existence, reciprocal link checks) + scripts/find-overlaps.sh (pairwise component comparison with configurable threshold). Full spec coverage, 0 debt.
- **skill:gc-cartography** — Production-ready. SKILL.md (6-step workflow with user confirmation gates) updated with explicit pointers to reference docs and explicit file paths. references/merge-decisions.md (decision framework: merge-when/keep-separate criteria, primary flow selection, ambiguous case handling) + references/overlap-metrics.md (overlap formula, 4-tier classification, subset detection, cluster detection, metric limitations). examples/gc-before-after.md (complete worked example: two overlapping vault flows merged with conditional section, cross-reference cleanup). scripts/detect-overlaps.sh (wraps review-cartography's find-overlaps.sh, adds subset/cluster detection and primary flow suggestion) + scripts/merge-flows.sh (structural merge: frontmatter union, section merging, conditional section generation) + scripts/update-references.sh (stale link replacement with reciprocal link checking) + scripts/validate-gc.sh (post-merge integrity: runs validate-cartography.sh, checks dangling references, verifies completeness). Full spec coverage (6/6), 0 debt.
- **agent:sigil (core + summon integration)** — Single-context vulnerability hunter agent. `agents/sigil.md` with agent frontmatter (name, description with trigger phrases, tools: Read/Grep/Glob/Bash). System prompt covers three modes: Mode 1 (single sigil — 7-step hypothesis-driven hunt with GRIMOIRE.md consultation, check integration, finding output), Mode 2 (variant sigil — pattern generalization and full-codebase scan), Mode 3 (super sigil — stubbed, blocked on semgrep/slither skills). Strategy section covers hypothesis-driven hunting, check integration, external context via librarian, and scope discipline. Output format with per-finding detail and hunt summary. Constraints enforce evidence-only assertions, one-vector-per-invocation, benign payloads, parameterized targets. Summon integration: step 9 added to summon workflow with check indexing, language filtering (`select-checks.sh`), user confirmation gate, batch-of-5 subagent spawning, result aggregation, GRIMOIRE.md update. Reference doc `sigil-spawning.md` provides subagent prompt template, parallelism rationale, and familiar integration roadmap. Summon step 2 updated to create `sigil-findings/` and `tmp/` directories per spec. 20/24 spec requirements covered; 4 deferred (scribe/gnome integration, super-sigil tooling). Remaining task: super-sigil (#5).
- **agent:familiar** — QA gatekeeper and triage agent. `agents/familiar.md` with agent frontmatter (name, description with 17 trigger phrases covering all three modes, tools: Read/Grep/Glob/Bash). System prompt covers three modes: Mode 1 (finding triage — 6-step independent investigation with counter-hypothesis generation, librarian subagent invocation, structured verdict output), Mode 2 (batch triage — processes sigil-findings directory, dismisses false positives to `dismissed/` subdirectory, produces summary table), Mode 3 (PoC review — evaluates correctness, safety compliance, completeness). Core principle: "Skepticism with substance" — inverse of sigil approach (sigils prove existence, familiar proves non-existence). Strategy section covers verification hierarchy (code > static > external > human), librarian collaboration protocol, severity adjustment rules, honesty about limitations. Personality customization via GRIMOIRE.md `familiar.animal` and `familiar.name` fields (default: raven named Huginn). Output format templates for all three modes with confidence and verification coverage fields. Constraints enforce evidence-required dismissals, no severity inflation, honest uncertainty ("Uncertain" not "Dismissed" when unverifiable), scope discipline. Integration points updated: sigil.md constraint (active routing), summon step 9 (batch triage invocation), sigil-spawning.md (active integration pipeline), finding-draft (triage context consumption), finding-review (familiar verdict in review), checks (triage suggestion). 15/15 spec requirements covered, 0 contradictions.
- **agent:librarian** — External research agent. `agents/librarian.md` with agent frontmatter (name, description with trigger phrases, tools: Read/Grep/Glob/Bash/WebSearch/WebFetch). System prompt covers two modes (directed question, generic study), 6-tier source priority (specs → repos → security KBs → audits → local grimoire → web), citation format, and constraints (no file mods, no code gen, citation required). Plugin.json updated with `"agents": "auto"`. Placeholder references updated in finding-draft, finding-review, checks, and finding-best-practices. context7/exa omitted (MCP services not bundled; WebSearch covers same ground). 12/16 spec requirements covered; 4 gaps are low-severity (familiar/autonomous-discovery agents not yet implemented, context7/exa are environment-specific MCP configs).
- **agent:scribe** — Detection module builder and spellbook manager. `agents/scribe.md` with agent frontmatter (name, description with trigger phrases covering all three modes, tools: Read/Grep/Glob/Bash). System prompt covers three modes: Mode 1 (distill — 8-step finding-to-detection-module workflow with GRIMOIRE.md consultation, existing coverage check, pattern generalization, feasibility assessment, sigil type determination, check creation, variant analysis assessment), Mode 2 (spellbook management — 2a: end-of-audit merge with generalizability assessment and promote-to-personal-grimoire; 2b: delegates to scribe-gc skill), Mode 3 (query — delegates to scribe-utilities skill). Core principle: "Every finding is a lesson. Encode the lesson, not the instance." Strategy section covers static analysis preference, false positive discipline, Gnome collaboration (planned), Familiar handoff, incremental spellbook growth. Output format templates for distill, merge, and query modes. Constraints enforce filesystem scope (grimoire/spells/ + ~/.grimoire/), static analysis preference, no speculative sigils, user confirmation for spellbook mods. Skills: `skills/scribe-distill/` (9-step workflow with user confirmation gates, references/feasibility-criteria.md with 3-tier classification and FP estimation, references/sigil-types.md with taxonomy and decision flowchart), `skills/scribe-gc/` (5-step GC workflow with archive-not-delete and user confirmation), `skills/scribe-utilities/` (4-step query workflow for list/describe/stats/search). Integration points updated: finding-draft step 6 (scribe-distill suggestion), sigil.md constraint (active scribe reference), checks SKILL.md (scribe-distill suggestion), finding-structure.md (active scribe reference), summon step 8 (personal grimoire discovery + scribe-gc suggestion). Gnome delegation stubbed with fallback to direct check creation. 47/53 spec requirements covered; 3 minor gaps (FP feedback loop, sigil upgrade tracking, knowledge artifact promotion — all lifecycle features for future).

## Needs Spec Work

Items with `sketch` spec detail requiring answers before implementation.

### skill:semgrep
- Spec: 7 lines in `grimoire/skills/sigils/semgrep.md`
- What specific aspects of semgrep usage to teach? Rule anatomy? Testing? CI integration?
- How detailed should the skill be vs "just teach the agent the basics"?
- Should it include rule merging guidance (noted in spec)?

### skill:slither
- Spec: 5 lines in `grimoire/skills/sigils/slither.md`
- What napalm integration patterns should be covered?
- How to handle documentation requirements for detection modules?
- What detector anatomy to teach?

### skill:codeql
- No spec file exists at `grimoire/skills/sigils/codeql.md`
- Which languages to support initially?
- What query patterns to focus on?

### skill:enscribe
- No dedicated spec file. Referenced in `grimoire/skills/scribe.md`
- What are the handlers per tool type (semgrep YAML, slither detector, CodeQL query)?
- What's the validation workflow for generated modules?

### skill:scribe-utilities
- Brief mention in `grimoire/skills/scribe.md`
- What specific utilities? Index, search, stats?
- What information is useful to surface about sigils?

### skill:scribe-gc
- Brief mention in `grimoire/skills/scribe.md`
- What constitutes "duplication" across different tool types (semgrep vs slither vs codeql)?
- How to handle project-specific vs generalizable sigils?

### agent:gnome
- Spec: `grimoire/agents/gnome.md` (partial)
- What model tier is appropriate (Opus for code gen vs Sonnet for simple rewrites)?
- What's the task handoff protocol? How does context get passed?
- What reporting format for completion status?

### agent:imp
- Spec: brief mention in `grimoire/ideas/notes.md` and `grimoire/ideas/todo.md`
- Manual (user supplies audits) or automated (crawl audit DBs)?
- What external audit sources? (Solodit, Code4rena, OpenZeppelin?)
- How does imp differ from librarian? (imp = adversarial audit analysis, librarian = general reference?)

### concept:gadgets
- Described in `grimoire/concepts/context building.md`
- How should gadgets be cataloged? Relationship to spellbook?
- What's the indexing/retrieval mechanism during PoC development?
- Can gadgets be expressed as unit tests? What format?

### concept:personal-grimoire
- Spec: 4 lines in `grimoire/concepts/personal grimoire.md`
- How does project state merge with personal grimoire? Conflict resolution?
- What directory structure within ~/.grimoire/?
- How do teams share spellbook content?

### infra:alchemy
- Mentioned in `grimoire/ideas/notes.md`
- What is "pi" extensibility framework? What are "alloyed agents"?
- Needs full architecture spec before any implementation

### infra:grimoire-guide
- Mentioned in `grimoire/ideas/notes.md`
- Target audience? Format (single guide vs blog series)?
- Content scope (all skills or beginner subset)?
