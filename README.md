# QA Automation Mastery

A hands-on learning repository for deepening practical knowledge of JS/TS, Playwright,
design patterns, SOLID principles, test architecture, and CI/CD — using
[Toolshop](https://practicesoftwaretesting.com) as the application under test.

## Structure

- `tests/api` — API tests, clients, fixtures, test data
- `tests/ui` — UI tests, Page Objects, components, fixtures
- `tests/common` — shared fixtures, utils, test data
- `docs/day-XX-topic` — daily learning log: problem, solution, reasoning, alternatives considered
- `ANTIPATTERNS.md` — log of anti-patterns identified and avoided

## Formatting

Run `npm install` after cloning to install dependencies and enable Git hooks.
Before each commit, Husky runs lint-staged to format staged files with Prettier
and include the formatting changes in the commit. A formatting failure blocks
the commit.

- `npm run format` formats the project.
- `npm run format:check` checks formatting without changing files.

## Progress tracker

| Day | Topic                           | Status |
| --- | ------------------------------- | ------ |
| 0   | Environment & CI setup          | ✅     |
| 1   | Single Responsibility Principle | ✅     |
| ... | ...                             | ...    |
