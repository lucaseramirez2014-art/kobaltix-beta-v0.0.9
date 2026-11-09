# Cobalix

## Cobalix v0.10.0

Cobalix is the product-facing name; existing Graphite source paths and imports are intentionally preserved for incremental compatibility.

Storage defaults to validated local JSON. `STORAGE_DRIVER=supabase` is an explicit, fail-closed boundary and does not imply hosted Supabase/auth is configured. The migration SQL and `scripts/import-json-state.mjs` are supplied for a later credentialed setup; the importer is dry-run and never modifies `data/store.json`.

v0.9 is a connected deterministic repository workspace foundation: server-side GitHub/imported repository data, JSON persistence, task lifecycle and activity logging, stored-data search, change and architecture analysis, validated architecture rules, and safe data clearing. Dashboard metrics are derived from connected repositories; empty states are explicit. The UI does not claim OAuth or paid AI, and repository analysis never executes source code. Mock repositories are only returned when `GITHUB_MOCK_MODE=true`; live GitHub failures are surfaced rather than silently replaced. This remains a single-server development release, not a production multi-tenant service.

## Repository scanning (v0.10.0)

Connect GitHub and import individual repositories; there is no account transfer or migration flow. Repository Intelligence uses `POST /api/repository-scan` with `owner`, `name`, and `ref`. The server retrieves bounded GitHub tree/source metadata, reuses the architecture parser, performs conservative redacted secret-like and suspicious-path heuristics, calculates health only from available categories, and persists deduplicated JSON-compatible scan history/activity. Results explicitly report partial coverage and limitations. No repository code is executed, and Guardian makes no vulnerability claims without advisory evidence. `GET /api/repository-scan` is scoped by repository and ref. Existing Change Intelligence `/api/analysis` compatibility is retained.

## Change Intelligence (v0.7.0)

Change Intelligence provides a deterministic, server-only analysis slice for TypeScript, TSX, JavaScript, and JSX changes. It retrieves GitHub commit details or comparisons, normalizes file status and patches, extracts symbols/imports conservatively, resolves bounded relative imports, computes reverse-importer impact, and persists analysis history in the atomic JSON store. Findings always include confidence and evidence limitations. No repository code is executed. The parser is intentionally line-based and may miss syntax errors, re-exports, dynamic imports, and unsupported aliases.

Run from **Intelligence** with owner, repository, base ref, and head ref. Analyses are deduplicated by identical inputs; rerun support is available through the API (`POST /api/analysis` with `rerun: true`). History is available via `GET /api/analysis?owner=...&name=...`. GitHub credentials remain server-side. Repo v0.8.0

## Architecture Intelligence (v0.8.0)

Architecture Intelligence indexes a bounded GitHub tree and hydrates supported TypeScript/JavaScript source without executing repository code. It reports explicit binary, oversized, and unavailable content states; resolves relative imports against indexed paths; extracts conservative symbols/imports/exports; and persists deduplicated snapshots and analyses. Use `/architecture` or the Intelligence navigation, with `/api/architecture/analyze`, `/api/architecture/history`, and `/api/architecture/rules` for analysis, history, and validated rule CRUD. Rules are deterministic forbidden-import and directory-boundary checks. Aliases are not guessed unless a safely readable tsconfig integration is available; current indexing intentionally records unresolved aliases as limitations.

Repository intelligence UI with a secure, server-side GitHub REST foundation.

## Run

```bash
cp .env.example .env.local
npm install
npm run dev
```

`GITHUB_TOKEN` is server-only and is never sent to the browser. Set a fine-grained token with the minimum repository read permissions required. `GITHUB_OWNER` selects the default user/org. If no token is configured, the API returns demo data only when `GITHUB_MOCK_MODE=true`; otherwise it reports a configuration error. The UI labels fallback data explicitly.

Imported repositories and workspace tasks persist in `data/store.json` using atomic temporary-file replacement. This is a small, single-server-instance store; use a database for multi-instance or production deployments. The data file is gitignored. No browser localStorage is used.

Implemented API foundations:

- `/api/github/status`, `/api/github/repos`, `/api/github/import`
- `/api/github/repos/:owner/:name/tree`
- `/api/github/repos/:owner/:name/content?path=...`
- `/api/github/repos/:owner/:name/branches`
- `/api/github/repos/:owner/:name/commits`
- `/api/analysis` deterministic health, Guardian, and preview response foundation

OAuth is **not complete**. This release supports safe server-configured bearer tokens only; OAuth requires an external identity provider, callback/session storage, and deployment configuration.

## Verification

```bash
npm run lint
npx tsc --noEmit
npm run build
```
