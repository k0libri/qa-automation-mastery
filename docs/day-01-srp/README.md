## Date / Topic

2026-10-08 — Single Responsibility Principle

## Problem / Goal (SMART goal)

By the end of today's session, tests/ui/po/pages/loginPage.ts exposes only locators and actions (goto, login, getErrorMessage) with no assertions inside it;
tests/ui/specs/login.spec.ts contains at least 2 tests (valid login success, invalid login error) where all assertions live in the test file;
both tests pass locally and in CI;
docs/day-01-srp/README.md documents the SRP violation, and ANTIPATTERNS.md has a new indexed row linking to it.

## What I built

I built 2 loginPage pages 1 with violated (tests\ui\po\pages\badLoginPage.ts) SRP 1 without (tests\ui\po\pages\loginPage.ts).
`BadLoginPage.loginAndVerifySuccess` performs the login actions and checks the resulting URL. This combines UI interaction with test verification.
`LoginPage.login` performs only the login actions. The test spec checks the resulting URL or error message, so the expected behavior is explicit in the test.
I added 3 tests.
I added .env files for valid user and password.

## Why I did it this way

I want to see why the violated SRP is bad.

## Alternatives considered

- N/A

## Anti-patterns demonstrated/avoided

Single Responsibility Principle
Separation of Concerns (user and password)

## Copilot review summary

The good `LoginPage` keeps UI actions and error-message retrieval separate from
test assertions. The login tests make the expected URL and error message
explicit, while `BadLoginPage` demonstrates how combining interaction and
verification in a page object hides part of the test's intent. A separate
`LoginForm` component is not necessary for a form used only on the login page.
The anti-pattern index links to this explanation, and the local and CI test
runs passed.

## SMART goal achieved? ✅/❌ + evidence

Self-assessment: ✅

Local run:

```
npx playwright test tests/ui/specs/login.spec.ts

Running 3 tests using 1 worker

  ✓  1 [ui] › tests\ui\specs\login.spec.ts:6:9 › Login › valid credentials redirect to account page (920ms)
  ✓  2 [ui] › tests\ui\specs\login.spec.ts:14:9 › Login › valid credentials redirect to account page without SRP (639ms)
  ✓  3 [ui] › tests\ui\specs\login.spec.ts:20:9 › Login › invalid credentials show error message (647ms)

  3 passed (2.7s)
```

CI run:
https://github.com/k0libri/qa-automation-mastery/actions/runs/37773524312/job/113306556937
