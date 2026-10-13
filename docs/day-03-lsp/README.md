## Date / Topic

2026-10-13 — Liskov Substitution Principle (LSP)

## Problem / Goal (SMART goal)

By the end of today's session, tests/common/utils/pageHelpers.ts contains a verifyPageLoaded(page: BasePage) helper that works correctly with both LoginPage and HomePage (proven by tests/ui/specs/pageContract.spec.ts, passing locally and in CI); docs/day-03-lsp/README.md documents two LSP violation experiments — one signature-incompatible (with the actual TypeScript compiler error captured as evidence) and one signature-compatible but behavior-violating (not caught by the compiler, explained with its real-world risk) — with two corresponding entries added to ANTIPATTERNS.md.

## What I built

Added `verifyPageLoaded(page: BasePage)` in `tests/common/utils/pageHelpers.ts`. It
waits for the page to load and checks that its title is non-empty. The new
`pageContract.spec.ts` exercises the same helper with both `LoginPage` and
`HomePage`. Two isolated experiments demonstrate LSP violations: `BrokenPage`
changes the `waitForLoad` signature, while `SneakyBrokenPage` keeps the signature
but skips the wait.

## Why I did it this way

The helper depends on behavior declared by `BasePage`, not on either concrete
page class. Passing both page objects through the same helper demonstrates
substitutability at a real call site. The experiments separate what TypeScript
can check (method compatibility) from what it cannot infer from a signature
(whether the method actually fulfills its behavioral contract).

## Alternatives considered

Duplicating the load and title checks in each page-specific test would avoid a
shared call, but would not exercise the common `BasePage` contract and could let
the two checks drift. A structural type containing only `waitForLoad` and
`getTitle` could decouple the helper from the base class, but the goal here is
specifically to verify that `LoginPage` and `HomePage` honor that shared base
contract. No type signature can guarantee that `waitForLoad()` truly waits; that
requires behavioral checks and review of the implementation.

## Anti-patterns avoided

### Signature-incompatible override

`BrokenPage.waitForLoad(timeoutMs: number)` requires an argument that callers of
`BasePage.waitForLoad()` are not required to provide. Running
`npx tsc --noEmit -p experiments/tsconfig.json` reports TS2416: the override
`(timeoutMs: number) => Promise<void>` is not assignable to `() => Promise<void>`;
the target signature provides too few arguments. This violation is caught by
the compiler.

### Signature-compatible behavioral violation

`SneakyBrokenPage.waitForLoad(): Promise<void>` has the compatible signature,
so TypeScript accepts it, but it immediately returns `Promise.resolve()` instead
of waiting for the page. A caller can then inspect the title or interact with
the page before it is ready, causing flaky tests or hiding an incomplete page
load. This is a behavioral contract violation that requires tests or review to
catch; signature compatibility alone is not enough.

## Copilot review summary

**Assessment: Pass for the Day 3 exercise.** `verifyPageLoaded()` uses the
shared `BasePage` API and is exercised with both `LoginPage` and `HomePage`.
The experiments clearly distinguish a signature-incompatible override, which
TypeScript rejects with TS2416, from a signature-compatible implementation
that violates the behavioral contract. The local test run passed all 8 tests,
and `npm run typecheck` passed.

## SMART goal achieved? ✅/❌ + evidence

Self-assessment: ✅

local run:

```
Running 8 tests using 5 workers

  ✓  1 [ui] › tests\ui\specs\home.spec.ts:4:5 › searching for a product returns results (3.7s)
  ✓  2 [ui] › tests\ui\specs\login.spec.ts:6:7 › Login › valid credentials redirect to account page (4.2s)
  ✓  3 [ui] › tests\ui\specs\pageContract.spec.ts:6:5 › LoginPage respects the BasePage contract (4.3s)
  ✓  4 [ui] › tests\ui\specs\smoke.spec.ts:3:5 › homepage loads successfully (3.5s)
  ✓  5 [api] › tests\api\specs\smoke.spec.ts:3:5 › GET /products returns 200 (313ms)
  ✓  6 [ui] › tests\ui\specs\login.spec.ts:17:7 › Login › valid credentials redirect to account page without SRP (856ms)
  ✓  7 [ui] › tests\ui\specs\pageContract.spec.ts:12:5 › HomePage respects the BasePage contract (1.1s)
  ✓  8 [ui] › tests\ui\specs\login.spec.ts:28:7 › Login › invalid credentials show error message (779ms)

  8 passed (6.7s)
```
