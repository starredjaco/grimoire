# Implementation Plan

Generated: 2026-03-06

## Priority Queue

Items with remaining work, sorted by priority (highest first).

### 1. skill:checks
- **Status:** not_implemented
- **Spec detail:** detailed
- **Spec:** `grimoire/skills/sigils/checks.md`
- **Dependencies:** None (standalone)
- **Tasks:**
  1. Create `skills/checks/` directory structure
  2. Implement SKILL.md with YAML frontmatter and workflow for creating/applying vulnerability pattern checks
  3. Create `references/` with check file format spec, design principles (simplicity, attention management, splitting criteria)
  4. Create `examples/` with 3-5 concrete check examples (debug assertions, rounding errors, ERC-4626 patterns)
  5. Create `scripts/` for check validation/management utilities
  6. Document integration with scribe workflow

### 2. skill:write-poc (structural improvements)
- **Status:** partial
- **Spec detail:** detailed
- **Spec:** `grimoire/skills/proof of concept.md`
- **Dependencies:** None
- **Tasks:**
  1. Add `user_invocable: true` to SKILL.md YAML frontmatter
  2. Add "Philosophy" section articulating opinionated structure, 90% one-shot success, core principles
  3. Create `examples/` directory with 3-4 worked examples (smart contract fork test, web app XSS, race condition, config issue)
  4. Refactor workflow steps to explicitly tie vulnerability class to reference file selection in step 3
  5. Add explicit confirmation checkpoints at each numbered step
  6. (Optional) Create `scripts/` with output validator (checks for destructive commands, hardcoded targets)

### 3. skill:review-cartography (supporting infrastructure)
- **Status:** shallow
- **Spec detail:** detailed
- **Spec:** `grimoire/skills/cartography.md`
- **Dependencies:** skill:cartography (implemented)
- **Tasks:**
  1. Create `references/cartography-format.md` (copy/symlink from cartography skill)
  2. Create `references/overlap-detection.md` formalizing >40% threshold, shared component detection
  3. Create `examples/cartography-review-example.md` showing before/after review cycle
  4. Create `scripts/validate-cartography.sh` (verify format, frontmatter, file existence, link reciprocity)
  5. Create `scripts/find-overlaps.sh` (compare flows, flag >40% overlap candidates)

### 4. skill:gc-cartography (supporting infrastructure)
- **Status:** shallow
- **Spec detail:** detailed
- **Spec:** `grimoire/skills/cartography.md`
- **Dependencies:** skill:cartography (implemented)
- **Tasks:**
  1. Create `references/merge-decisions.md` formalizing decision framework and >40% threshold
  2. Create `references/overlap-metrics.md` defining overlap calculation
  3. Create `examples/` with before/after GC pair showing actual merge
  4. Create `scripts/detect-overlaps.sh` (calculate and report flow overlap percentages)
  5. Create `scripts/merge-flows.sh` (automate merge of two files)
  6. Create `scripts/update-references.sh` (fix stale cartography links across repo)
  7. Create `scripts/validate-gc.sh` (verify merge result integrity)

### 5. agent:librarian
- **Status:** not_implemented
- **Spec detail:** detailed
- **Spec:** `grimoire/agents/librarian.md`
- **Dependencies:** None (standalone, used on-demand by other agents)
- **Tasks:**
  1. Design agent prompt emphasizing reference-backed claims, no speculation
  2. Implement directed-question workflow
  3. Implement generic-study workflow (async context priming)
  4. Set up integrations: solodit, exa, github CLI, web search
  5. Build reference tracking and citation system
  6. Create personal grimoire lookup for local knowledge

### 6. agent:sigil
- **Status:** not_implemented
- **Spec detail:** detailed
- **Spec:** `grimoire/agents/sigil.md`
- **Dependencies:** skill:checks, agent:familiar (for triage)
- **Tasks:**
  1. Create sigil agent definition and prompt (single-context vulnerability hunter)
  2. Implement summon -> sigil spawning logic
  3. Build check-based sigil abstraction for deterministic findings
  4. Implement variant-sigil for recurring bug patterns (post-finding)
  5. Implement super-sigil pattern (semgrep/slither runners spawning validation sigils)
  6. Design sigil -> familiar triage coordination

### 7. agent:familiar
- **Status:** not_implemented
- **Spec detail:** detailed
- **Spec:** `grimoire/agents/familiar.md`
- **Dependencies:** agent:sigil (provides findings to triage)
- **Tasks:**
  1. Design familiar agent prompt (skepticism, verification, honesty about limitations)
  2. Implement finding triage workflow (accepts hypothesis or sigil output)
  3. Build librarian invocation for external references
  4. Implement customization system (animal type, name)
  5. Add quality control helpers (accuracy checks, completeness estimates)
  6. Create PoC review and feedback workflow

### 8. agent:scribe
- **Status:** not_implemented
- **Spec detail:** detailed
- **Spec:** `grimoire/agents/scribe.md`
- **Dependencies:** skill:checks, agent:familiar (for triage)
- **Tasks:**
  1. Design scribe agent prompt (autonomous detection module builder)
  2. Implement scribe invocation from finding workflows
  3. Build enscribe skill (finding -> static analysis module or knowledge artifact)
  4. Implement variant analysis workflow (run detector against rest of codebase)
  5. Create spellbook storage structure (detect/, rules/, modules/)
  6. Document scribe-summon integration for audit initialization

### 9. concept:backpressure (enforcement in skills)
- **Status:** not_implemented in skills
- **Spec detail:** detailed
- **Spec:** `grimoire/concepts/(trivial) verifiability.md`, `grimoire/notes.md`
- **Dependencies:** None
- **Tasks:**
  1. Create shared reference doc `backpressure-methods.md` listing when to use semgrep/codeql/slither
  2. Add to summon step 8: explicit check for backpressure before recommending autonomous findings
  3. Add to write-poc: "avoid unmeasurable claims" guidance

### 10. concept:the-original-sin + concept:leverage (explicit in skills)
- **Status:** minimal / implicit
- **Spec detail:** detailed
- **Dependencies:** None
- **Tasks:**
  1. Create shared reference doc `principles.md` covering human judgment, leverage, and the original sin
  2. Update write-poc philosophy section to reference human-directed hypothesis, not autonomous exploitation
  3. Update summon philosophy to emphasize researcher interprets crown jewels, agent only maps

### 11. skill:scribe-distill
- **Status:** not_implemented
- **Spec detail:** partial
- **Spec:** `grimoire/skills/scribe.md`
- **Dependencies:** agent:scribe
- **Tasks:**
  1. Create `skills/scribe-distill/` directory
  2. Draft SKILL.md with workflow (capture context -> analyze for patterns -> propose automation)
  3. Build examples of distillation for common vuln types
  4. Define trigger conditions and integration with scribe agent

### 12. skill:semgrep
- **Status:** not_implemented
- **Spec detail:** sketch
- **Spec:** `grimoire/skills/sigils/semgrep.md`
- **Dependencies:** None
- **Tasks:**
  1. Create `skills/semgrep/` directory
  2. Draft SKILL.md covering rule anatomy -> testing -> merging -> deployment
  3. Create `examples/` with sample rules for common vuln patterns
  4. Add `references/` with semgrep best practices
  5. Build validation utilities (test rule against known vulnerable code)

### 13. skill:slither
- **Status:** not_implemented
- **Spec detail:** sketch
- **Spec:** `grimoire/skills/sigils/slither.md`
- **Dependencies:** None
- **Tasks:**
  1. Create `skills/slither/` directory
  2. Draft SKILL.md covering detector anatomy -> documentation -> napalm integration -> testing
  3. Create `examples/` with sample detectors
  4. Add `references/` including napalm docs
  5. Build validation utilities

## Implementation Debt

Items that work but need structural improvements.

### skill:review-cartography
- SKILL.md is complete (6,229 bytes) but has no supporting infrastructure
- No references/, examples/, or scripts/ directories
- See Priority Queue #3 for tasks

### skill:gc-cartography
- SKILL.md is complete (6,390 bytes) but has no supporting infrastructure
- No references/, examples/, or scripts/ directories
- See Priority Queue #4 for tasks

### skill:write-poc
- Missing `user_invocable: true` in frontmatter
- No examples/ or scripts/ directories
- No philosophy section
- See Priority Queue #2 for tasks

### infra:cartography-file-format
- Format spec is complete but needs worked example showing conditional sections

### concept:trivial-verifiability
- Enforced via PoC checklist but falsifiable vs verifiable framing absent from skill instructions
- Tasks: Add verifiability language to write-poc step 2-3; reference distinction in summon step 8

### concept:hypothesis-generation
- Partially reflected in PoC goal conditions and cartography exploration modes
- Tasks: Frame goal condition as "testable hypothesis" in write-poc; add seeded vs unseeded guidance to cartography

### concept:spellbook
- summon step 8 references it; infrastructure (spells/ dir) exists
- Needs user-facing explanation and management workflow (depends on scribe agent)

### concept:tomes
- Directory structure and cross-references exist across all skills
- Needs format guidance doc and "when to create a tome" guidance in summon

## Completed

- **skill:summon** — Production-ready. 290-line SKILL.md, references/domain-crown-jewels.md, examples/grimoire-md-example.md. Full spec coverage, no debt.
- **skill:cartography** — Production-ready. SKILL.md + references/cartography-format.md + examples/cartography-example.md + scripts/index-cartography.sh. Full spec coverage, no debt.
- **infra:audit-directory-structure** — Fully specified in summon SKILL.md step 2.
- **infra:cartography-directory** — Fully specified with format, indexing script, and examples.

## Needs Spec Work

Items with `sketch` spec detail requiring answers before implementation.

### agent:gnome
- What coding tasks does gnome handle? Sub-agent for write-poc/sigil, or standalone?
- What model tier is appropriate (Opus for code gen vs Haiku for simple rewrites)?

### agent:sage
- How does sage differ from familiar? Both are QA-adjacent.
- Is sage for validating human hypotheses, agent findings, or both?
- What's the enforcement mechanism for back-pressure?

### agent:imp
- Manual (user supplies audits) or automated (crawl audit DBs)?
- What external audit sources? (Solodit, Code4rena, OpenZeppelin?)

### skill:enscribe
- No dedicated spec file exists at `grimoire/skills/enscribe.md`
- What are the handlers per tool type (semgrep YAML, slither detector, CodeQL query)?
- What's the validation workflow for generated modules?

### skill:codeql
- No spec file at `grimoire/skills/sigils/codeql.md`
- Which languages to support initially?

### skill:scribe-gc
- What constitutes "duplication" across different tool types (semgrep vs slither vs codeql)?

### skill:scribe-indexing
- What does "indexing" mean concretely? Metadata extraction? Categorization? Search interface?

### skill:backpressure
- Referenced concept file `[[back-pressure and what not to ask]]` doesn't exist
- What's the enforcement mechanism — hook, skill, or agent?

### skill:rounding-detection
- Only 4 lines in notes.md. What contract types? What detection heuristics?
- Three components mentioned: occurrence detection, direction analysis, amplification identification

### concept:gadgets
- How should gadgets be cataloged? Relationship to spellbook?
- What's the indexing/retrieval mechanism during PoC development?

### infra:alchemy
- What is "pi" extensibility framework? What are "alloyed agents"?
- Needs full architecture spec before any implementation

### infra:check-coordination
- What problem does coordination solve? Deduplication? Prioritization? Hierarchical execution?

### infra:findings-structure
- What's the findings metadata schema (severity, date, status)?
- Filing conventions within findings/, detect/, poc/, tmp/?

### infra:static-analysis-modules
- What's the module format per tool type?
- What metadata schema for modules (priority, effectiveness, false positive rate)?

### infra:librarian-sources
- Source configuration details (endpoints, auth, rate limits) for context7, exa, solodit, github

### infra:grimoire-guide
- Target audience? Format (single guide vs blog series)?
- Content scope (all skills or beginner subset)?
