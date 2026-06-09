# Contributing to NDRIA

NDRIA is a community-correctable public good. Corrections and additions are welcome from
anyone. This document defines the process for the three kinds of contribution the RFP requires
us to support: **corrections**, **new protocols**, and **new feed providers**.

All contributions must respect the [project charter](./CHARTER.md) - in particular, the
**no-composite-scoring** constraint.

## Golden rule: verbatim and sourced

NDRIA shows what feeds say, **verbatim**, with a link to the source. We never paraphrase a
feed's rating, and we never fabricate data. If a cell cannot be verified against a public
source, it stays `unassessed`.

## 1. Correcting a coverage cell

A cell in the protocol × feed matrix may be wrong (stale rating, wrong status, dead link).

1. Find the protocol/feed pair. Cells live in [`src/data/coverage.ts`](./src/data/coverage.ts).
2. Open a PR that adds or edits the `CoverageCell`, including:
   - `status` - `covered` | `partial` | `not_yet`
   - `verbatim` - exactly what the feed publishes (for ratings)
   - `sourceUrl` - direct link to the feed's page for this protocol
   - `provenance` - how it was obtained
   - `lastVerified` - ISO date you checked
3. In the PR description, paste a screenshot or quote showing the source supports the change.

A maintainer verifies the source before merging.

## 2. Adding a protocol

1. Add a `Protocol` entry to [`src/data/protocols.ts`](./src/data/protocols.ts) with its
   category, DefiLlama slug, and notes.
2. Open a PR. The matrix and detail page are generated automatically; all its cells start as
   `unassessed` until contributors verify feed coverage.
3. For protocols beyond the seed 20, see the roadmap for prioritisation (TVL / funds at risk).

## 3. Adding a feed provider

1. Add a `Feed` entry to [`src/data/feeds.ts`](./src/data/feeds.ts) with its focus, type,
   whether it is machine-readable, and a one-line **rationale** for inclusion.
2. Open a PR. New feeds should increase the **diversity of coverage methodologies**, not
   duplicate an existing one.
3. Disclose any relationship between the contributor and the feed in the PR.

## Conflicts of interest

If you have a commercial relationship with a listed protocol or feed provider, disclose it in
your PR and ensure it is reflected in [`CONFLICTS.md`](./CONFLICTS.md).

## Review process

- Maintainers verify every sourced claim before merge.
- Changes that would introduce scoring/synthesis are rejected per the charter.
- Substantive disputes are resolved in public issues.
