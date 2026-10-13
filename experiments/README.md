# Experiments

This folder contains deliberately broken or anti-pattern code, written to
demonstrate specific violations (e.g., LSP) for learning purposes.

These files are intentionally excluded from:

- the main TypeScript project (tsconfig.json `include` only covers `tests/**`)
- ESLint (`experiments/**` is in the `ignores` list)
- Playwright test discovery (testDir only points to `tests/`)

Each subfolder corresponds to a day in the learning plan. See the linked
day doc in `docs/` for the full explanation.

To reproduce a captured compiler error:
npx tsc --noEmit -p experiments/tsconfig.json
