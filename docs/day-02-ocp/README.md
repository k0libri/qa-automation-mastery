## Date / Topic

2026-10-09 — Open/Closed Principle (OCP)

## Problem / Goal (SMART goal)

By the end of today's session, tests/ui/po/pages/basePage.ts exists with shared behavior (waitForLoad, getTitle); the Day 1 LoginPage now extends BasePage without any behavior change, and login.spec.ts from Day 1 still passes unmodified; a new HomePage class also extends BasePage, proving a new page type can be added without modifying BasePage; a new test (home.spec.ts) using HomePage passes; all tests (old and new) pass locally; docs/day-02-ocp/README.md documents the if/switch OCP violation that was identified and avoided, with a corresponding ANTIPATTERNS.md entry.

## What I built

Add basePage as the ancestor of other pages.
Add a badBasePage as a bad OCP example.
Add a new homePage.
Add a new home page test.

## Why I did it this way

To see the bad OCP disadvantage.

## Alternatives considered

The base class uses Playwright's `Page` because the current page objects and the shared methods need browser-page operations. Making it accept a broader abstraction now would add indirection without a second real use case.

An iframe can still be handled by a page object through `page.frameLocator()`. If a future page object must be built around a `Frame` rather than a `Page`, and genuinely needs the same shared behavior, that is a good point to extract a small interface for the capabilities those methods use. Keep page-specific readiness checks in the page object (for example, waiting for a results locator); don't broaden the base class just to anticipate hypothetical lifecycle differences.

## Anti-patterns avoided

OCP

### The if/switch OCP violation

`badBasePage.ts` demonstrates a base class that receives a page type and branches on it. Each new page type, such as checkout, requires editing this shared class and adding another branch. The base class must know about every concrete page, changes to it can affect existing pages, and the same conditional tends to grow as the application grows. The problem is not that `if` or `switch` is inherently wrong; it is that this decision point couples the shared class to all page types and makes adding one require modifying the class.

### Extending without modifying the base

The refactored `BasePage` contains behavior shared by the current pages. `LoginPage` and `HomePage` extend it, while each page keeps its own locators and actions. Adding another page can be done by creating another subclass, without adding a page-type branch to `BasePage`. That is the OCP evidence in this example: the base supports extension through subclasses while its shared implementation stays unchanged.

This abstraction is intentionally limited to behavior that is actually common. A page with different readiness needs can add its own wait method; `waitForLoad()` using `networkidle` should not be treated as a universal guarantee that every page's content is ready.

## Copilot review summary

**Rating: Pass.** The shared `BasePage` behavior is page-agnostic, while `LoginPage` and `HomePage` own their page-specific locators and actions. The unchanged Day 1 `login.spec.ts` and the new HomePage test pass in the reported six-test run, showing that an additional page type can be introduced without adding page-type conditionals to `BasePage`. The anti-pattern and the extension approach are now documented, and the `ANTIPATTERNS.md` entry links to this page. One limitation: `waitForLoad()` uses `networkidle`, which may be unreliable for pages with ongoing network activity; use page-specific readiness checks where needed.

## SMART goal achieved? ✅/❌ + evidence

Self-assessment: ✅

local run:

```
Running 6 tests using 4 workers

  ✓  1 [ui] › tests\ui\specs\login.spec.ts:6:7 › Login › valid credentials redirect to account page (4.0s)
  ✓  2 [ui] › tests\ui\specs\smoke.spec.ts:3:5 › homepage loads successfully (3.6s)
  ✓  3 [ui] › tests\ui\specs\home.spec.ts:4:5 › searching for a product returns results (3.9s)
  ✓  4 [api] › tests\api\specs\smoke.spec.ts:3:5 › GET /products returns 200 (317ms)
  ✓  5 [ui] › tests\ui\specs\login.spec.ts:17:7 › Login › valid credentials redirect to account page without SRP (861ms)
  ✓  6 [ui] › tests\ui\specs\login.spec.ts:28:7 › Login › invalid credentials show error message (755ms)

  6 passed (6.4s)
```

CI run:
https://github.com/k0libri/qa-automation-mastery/actions/runs/37929054375/job/113814967088
