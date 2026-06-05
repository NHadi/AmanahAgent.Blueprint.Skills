---
description: Run 29 Quality Gates audit against code or blueprints
---

# Audit: $ARGUMENTS

## Step 1: Research
Read the file or blueprint folder specified in `$ARGUMENTS`.

## Step 2: The 29 Gates
Audit the content against the Amanah Quality Gates:
- **Security**: SQL injection, Auth, Tenant Isolation, Input Validation.
- **Performance**: N+1 queries, DB indexes, Timeouts, Pagination.
- **Traceability**: Requirements → Properties → Tests.
- **Code Quality**: No stubs, No deprecated APIs.

## Step 3: Report
Show a "Pass/Fail" summary and detailed warnings for high-risk areas.
