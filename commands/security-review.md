---
description: Comprehensive security review — OWASP Top 10, UU PDP, ISO 27001, multi-tenant isolation, AI/LLM security, infrastructure audit. Modes: full, module, blueprint, compliance, infra, api, data, ai, mobile, deps, pen-test.
---

# Security Review: $ARGUMENTS

## Mode Detection

Detect the review mode from `$ARGUMENTS`:
- `full` or `--all` → Full codebase security audit (all 12 domains)
- `module <path>` → Targeted module review
- `blueprint <name>` → Blueprint spec security review
- `compliance [owasp|uupdp|iso27001|all]` → Compliance gap analysis
- `infra` or `infrastructure` → Docker, cloud, secrets, network
- `api` → API security: auth, validation, rate limiting
- `data` → Data protection, PII, encryption, tenant isolation
- `ai` or `llm` → AI/LLM security: prompt injection, cost, output validation
- `mobile` → Mobile app security (Expo/React Native)
- `deps` or `dependencies` → Dependency vulnerability audit
- `pen-test` → Penetration testing guidance and test cases

If only a file path is given → `module` mode.
If no arguments → `full` mode with summary.

## Execution

1. **Read project context**: Atlas files, CLAUDE.md, SECURITY.md
2. **Execute the security review** following the 12-domain framework in `.amanah/security-review/AGENT.md`
3. **Generate the report** with findings, compliance status, and remediation roadmap
4. **Present findings** with severity ratings and code-level recommendations

## Key Areas

| # | Domain | OWASP Ref |
|---|--------|-----------|
| 1 | Authentication & Authorization | A01 |
| 2 | Injection Attacks | A03 |
| 3 | Data Protection & Privacy (UU PDP) | A02 |
| 4 | Multi-Tenant Isolation | Project-specific |
| 5 | Input Validation | A03 |
| 6 | API Security | A01, A05, A07 |
| 7 | Infrastructure & Configuration | A05 |
| 8 | AI/LLM Security | OWASP LLM Top 10 |
| 9 | Mobile Security | OWASP Mobile Top 10 |
| 10 | Dependency & Supply Chain | A06 |
| 11 | Business Logic & Payment | A04 |
| 12 | Logging, Monitoring & IR | A09 |

## Output

- Executive summary with severity counts
- Detailed findings with file:line references
- OWASP Top 10 compliance status
- UU PDP compliance status
- ISO 27001 compliance status
- Priority remediation roadmap
- Verdict: APPROVED / NEEDS REMEDIATION / CRITICAL
