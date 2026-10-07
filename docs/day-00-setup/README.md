## Date / Topic

2026-10-07 — Environment & CI Setup

## Problem / Goal (SMART goal)

(see below)

## What I built

- Base configuration: Playwright + TypeScript + ESLint + Prettier
- Folder structure: tests/api, tests/ui, tests/common
- One UI smoke test, one API smoke test
- GitHub Actions CI pipeline
- Husky + lint-staged: automatic Prettier formatting of staged files before commit
- CI checks: ESLint and Prettier validation before Playwright tests
- Scripts for manual formatting and formatting checks

## Why I did it this way

- Two separate "projects" in playwright.config.ts (ui/api), because separation
  of concerns keeps UI and API test execution and configuration independent:
  each has its own baseURL, only UI uses a browser profile, and either suite
  can be run separately with --project.
- The pre-commit hook formats only staged files, keeping commits focused.
- The npm prepare script activates Husky hooks after dependency installation.
  Git hook configuration is local, so it must also be set up after cloning.
- CI uses HUSKY=0 because it does not need local commit hooks. This does not
  disable the separate lint and formatting checks.
- CI checks formatting without modifying files and validates the entire project,
  because local hooks can be skipped.
- Lint and formatting checks run before Playwright installation and tests to
  fail early when a quality check fails.
- TypeScript 6.0.3 was chosen because typescript-eslint 8.71.1 supports
  TypeScript >=4.8.4 and <6.1.0, but not TypeScript 7.

## Alternatives considered

- A single Playwright project with tags or file filters: possible, but the
  different UI and API base URLs would need fixture or test-level overrides.
- Separate UI and API configuration files: valid, but shared settings would
  need to be duplicated or extracted into a common configuration.
- Formatting the entire project before every commit: could introduce unrelated
  changes instead of limiting formatting to staged files.
- Relying only on local hooks: hooks can be skipped, so CI also validates.
- Using --force or --legacy-peer-deps: bypasses compatibility checks without
  resolving the dependency conflict.

## Anti-patterns avoided

- Scattering hardcoded environment URLs and repeated configuration overrides
  across tests instead of keeping suite-specific settings in named projects.
- Forcing incompatible dependency versions.
- Automatically rewriting source files in CI.
- Treating local Git hooks as the only quality gate.
- Activating unnecessary Git hooks in CI.

## Copilot review summary

...

## SMART goal achieved? ✅/❌ + evidence

...
