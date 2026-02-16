<p align="center">
  <img src="grimoire_logo.png" alt="Grimoire" width="300" />
</p>

<h1 align="center">Grimoire</h1>

<p align="center">
  <strong>A spellbook for the modern security researcher.</strong><br/>
  Claude Code plugin that channels vulnerability discovery into structured, weaponized proof-of-concept code — safely, methodically, and ready for disclosure.
</p>

<p align="center">
  <a href="#installation"><img src="https://img.shields.io/badge/Claude_Code-Plugin-8B5CF6?style=flat-square" alt="Claude Code Plugin" /></a>
  <img src="https://img.shields.io/badge/version-0.1.0-blue?style=flat-square" alt="Version 0.1.0" />
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="License MIT" />
  <img src="https://img.shields.io/badge/vuln_classes-20%2B-critical?style=flat-square&color=dc2626" alt="20+ vulnerability classes" />
</p>

---

## What is Grimoire?

Security researchers live in the gap between *finding* a vulnerability and *proving* it exists. Grimoire bridges that gap.

It's a [Claude Code](https://docs.anthropic.com/en/docs/claude-code) plugin that transforms your vulnerability analysis into production-grade proof-of-concept demonstrations. You describe what you found. Grimoire conjures the PoC — complete with benign payloads, parameterized targets, clear exploit-chain annotations, and remediation guidance.

No boilerplate. No guessing at formats. Just tell Claude what you discovered, and Grimoire inscribes the proof.

### Designed for

- **Penetration testers** writing deliverables for client reports
- **Bug bounty hunters** submitting clear, reproducible findings
- **Security engineers** validating fixes in their own codebases
- **CTF competitors** documenting exploitation chains
- **Coordinated disclosure** participants building maintainer-friendly reports

## Capabilities

### `write-poc` — Proof of Concept Scribe

The core incantation. Grimoire walks through a structured six-phase ritual to produce PoCs that maintainers can actually understand and act on:

```
1. Gather    → Establish vulnerability class, root cause, attack surface, impact
2. Approach  → Select minimum viable proof strategy
3. Write     → Generate annotated PoC with benign payloads
4. Format    → Adapt output to vulnerability type (script, curl, multi-step, snippet)
5. Context   → Attach reproduction steps, impact analysis, remediation
6. Review    → Verify safety, completeness, and clarity
```

**Invoke it naturally:**

> *"Write a PoC for the SQL injection I found in the login endpoint"*
> *"Create a proof of concept for CVE-2024-XXXXX"*
> *"Demonstrate that this SSRF is exploitable"*
> *"Show this auth bypass is real"*

### Vulnerability Classes

Grimoire carries reference tomes covering 20+ vulnerability classes with tailored formats, detection signals, and demonstration approaches:

<table>
<tr>
<td width="50%" valign="top">

**Web Application**
- SQL Injection
- Cross-Site Scripting (XSS)
- Server-Side Request Forgery (SSRF)
- Authentication & Authorization Bypass
- Insecure Direct Object Reference (IDOR)
- Race Conditions
- Deserialization

</td>
<td width="50%" valign="top">

**Systems & Cryptography**
- Buffer Overflow
- Format String Vulnerabilities
- Heap Corruption & Use-After-Free
- Integer Overflow
- Weak Randomness & Crypto Flaws
- Configuration & Deployment Issues
- Supply Chain & Dependency Confusion

</td>
</tr>
</table>

### Language Selection

Grimoire selects the right language for the target ecosystem:

| Language | When |
|----------|------|
| **Python** | Default. Rich stdlib, universally readable |
| **Bash / curl** | Simple HTTP issues, quick pipeline demos |
| **C** | Memory corruption, binary exploitation, kernel |
| **JavaScript** | Browser-based vulns, DOM XSS, Node.js |
| **Ruby / Go / Rust** | When matching the target's native ecosystem |

## Installation

```bash
claude --plugin-dir /path/to/grimoire
```

That's it. No dependencies, no build step, no configuration. Grimoire activates inside Claude Code and its skills become available immediately.

## Usage

### Basic Flow

```
You:     "Write a PoC for the blind SQL injection in /api/users?id="
Grimoire: → Gathers details about the injection point
          → Selects time-based blind SQLi approach
          → Writes parameterized Python script with sleep() payload
          → Adds reproduction steps, impact analysis, fix recommendation
          → Delivers complete, annotated PoC ready for your report
```

### What You Get

Every PoC Grimoire produces includes:

```
┌─────────────────────────────────────────────┐
│  Header Block                               │
│  Title, CWE, affected component, impact     │
├─────────────────────────────────────────────┤
│  Exploit Code                               │
│  Annotated, benign payloads, parameterized  │
├─────────────────────────────────────────────┤
│  Reproduction Steps                         │
│  Numbered, maintainer-friendly              │
├─────────────────────────────────────────────┤
│  Impact Analysis                            │
│  Precise, realistic worst-case              │
├─────────────────────────────────────────────┤
│  Remediation                                │
│  Specific fix direction with references     │
└─────────────────────────────────────────────┘
```

### Safety Principles

Grimoire is built on a strict defensive philosophy:

- **Benign payloads only** — `alert(1)`, `sleep()`, `id`, never destructive commands
- **Parameterized targets** — localhost and variables, never hardcoded production URLs
- **Minimum viable proof** — demonstrate the issue exists, nothing beyond that
- **Clear annotations** — every step explained so maintainers can write the fix
- **Authorized contexts only** — pentests, bug bounty, coordinated disclosure, CTF

## Project Structure

```
grimoire/
├── .claude-plugin/
│   └── plugin.json              # Plugin manifest
├── skills/
│   └── write-poc/
│       ├── SKILL.md             # Core skill — PoC writing workflow
│       └── references/
│           ├── poc-formats.md   # Format templates by vulnerability class
│           └── vulnerability-patterns.md  # Detection signals & demo approaches
└── grimoire_logo.png
```

## Contributing

Grimoire's power grows with the knowledge inscribed in it. Contributions welcome:

- **New vulnerability patterns** — Add detection signals and demo approaches to `references/vulnerability-patterns.md`
- **Format templates** — Expand `references/poc-formats.md` with new vulnerability class formats
- **New skills** — Create new skills in `skills/` for adjacent security research workflows
- **Refinements** — Improve prompts, add edge cases, sharpen remediation guidance

## License

MIT

---

<p align="center">
  <sub>Built for those who find the flaws so others can fix them.</sub>
</p>
