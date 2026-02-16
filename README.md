<p align="center">
  <img src="grimoire_logo.png" alt="Grimoire" width="300" />
</p>

# Grimoire

A Claude Code plugin for security researchers helping projects discover and patch vulnerabilities.

## Skills

### write-poc

Write proof-of-concept demonstrations for discovered vulnerabilities. Supports all major vulnerability classes with flexible output formats adapted to each case.

**Trigger phrases:** "write a proof of concept", "create a PoC", "demonstrate a vulnerability", "PoC for CVE"

## Installation

```bash
claude --plugin-dir /path/to/grimoire
```

## Usage

Install the plugin and ask Claude to write a PoC for a vulnerability you've discovered during authorized security research. The skill walks through gathering details, selecting the right demonstration format, writing safe/benign PoC code, and including remediation guidance.
