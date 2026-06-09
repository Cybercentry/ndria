# NDRIA - Neutral DeFi Risk Intelligence Aggregator

A neutral, open-source public good that shows **what every major DeFi risk feed says about a
protocol, side by side, verbatim** - without synthesis or scoring.

> The mental model is **oracle diversity**: no single feed should be canonical for something
> this important. The aggregation is the value.

Built in response to the Ethereum Foundation App Relations
[RFP: Neutral DeFi Risk Intelligence Aggregator](https://esp.ethereum.foundation/applicants/rfp/defi_risk_intel_agg).

**Live Reference Implementation:** https://ndria.up.railway.app

## What this is

- A protocol-by-feed **coverage matrix** across the top 20 Ethereum DeFi protocols by TVL.
- Every cell is explicitly labeled: **covered**, **partial**, or **not yet covered**.
- Per-protocol detail pages with governance data (provenance-tagged), verbatim feed ratings,
  audit history, and incident history.
- A methodology page documenting the feed registry and data provenance.

## What this is NOT

NDRIA produces **no risk scores or composite assessments of its own**. Feed ratings are shown
verbatim only. Coverage status describes whether a feed *covers* a protocol - never how *risky*
a protocol is. This constraint is binding; see [CHARTER.md](./CHARTER.md).

## Tech stack

- [Next.js](https://nextjs.org/) (App Router) + TypeScript
- Tailwind CSS - legible, data-dense interface (references: L2Beat, Walletbeat, DeFiScan)
- File-based, community-correctable data layer in [`src/data`](./src/data)

## Project structure

```
src/
  app/                     # Next.js routes
    page.tsx               # Summary matrix (protocols × feeds)
    protocol/[slug]/       # Per-protocol detail page
    methodology/           # Methodology + feed registry
  components/              # UI components
  data/
    types.ts               # Core data model
    protocols.ts           # 20 seed protocols (RFP Section 3)
    feeds.ts               # Feed registry (RFP Section 4)
    coverage.ts            # Protocol × feed matrix cells
```

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run build
```

## Data layer & corrections

The data layer is **community-correctable**. Coverage cells, feed registry entries, and
governance data live as typed source files under [`src/data`](./src/data). Anyone can propose a
correction or addition via pull request. See [CONTRIBUTING.md](./CONTRIBUTING.md) for the
process for corrections, adding protocols, and adding feed providers.

Every datum carries a **provenance tag** (`onchain`, `feed-api`, `feed-manual`,
`self-reported`, `defillama`). NDRIA never fabricates feed data - unassessed cells are shown
as such rather than guessed.

## Team & stewardship

Led and stewarded by **Leigh Cronian** ([LinkedIn](https://www.linkedin.com/in/leigh-cronian/)) **/ [Cybercentry](https://centry.cybercentry.co.uk/)** - author of Ethereum standards [ERC-8126](https://eips.ethereum.org/EIPS/eip-8126) and
[ERC-8196](https://eips.ethereum.org/EIPS/eip-8196), and operator of production on-chain
verification tooling across 30+ EVM chains. See [TEAM.md](./TEAM.md) and
[STEWARDSHIP.md](./STEWARDSHIP.md).

## License

[AGPL-3.0-or-later](./LICENSE). The full codebase and data layer are open source.

## Status

Early scaffold. See the issues and project board for milestone progress (M1 - Week 12,
M2 - Week 20).
