# Anti-pattern Log

Quick index of anti-patterns identified/avoided during this learning journey.
Full explanation (why it's a problem, how I fixed it) is in the linked day doc.

| Day | Anti-pattern                         | Short description                                                                                         | Details                                                    |
| --- | ------------------------------------ | --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| 0   | Scattered test configuration         | Keep suite-specific URLs and settings in Playwright projects instead of repeating them across tests.      | [Day 0](docs/day-00-setup/README.md#anti-patterns-avoided) |
| 0   | Forcing incompatible dependencies    | Choose supported versions instead of bypassing peer dependency checks with --force or --legacy-peer-deps. | [Day 0](docs/day-00-setup/README.md#anti-patterns-avoided) |
| 0   | Rewriting source files in CI         | Check formatting in CI; apply formatting changes locally before committing.                               | [Day 0](docs/day-00-setup/README.md#anti-patterns-avoided) |
| 0   | Local hooks as the only quality gate | Validate in CI too, because local Git hooks can be skipped.                                               | [Day 0](docs/day-00-setup/README.md#anti-patterns-avoided) |
| 0   | Unnecessary Git hooks in CI          | Use HUSKY=0 to skip hook activation while keeping explicit CI checks enabled.                             | [Day 0](docs/day-00-setup/README.md#anti-patterns-avoided) |
