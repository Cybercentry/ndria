# NDRIA Project Charter

This charter defines the binding constraints of the Neutral DeFi Risk Intelligence Aggregator
(NDRIA). It is committed to the repository as required by the Ethereum Foundation App Relations
RFP and may only be amended through the process defined below.

## 1. No composite scoring

NDRIA **must not** produce its own risk scores, composite assessments, rankings, or editorial
judgements. The project presents existing feed data **verbatim**, without synthesis.

- Coverage status (`covered` / `partial` / `not yet covered` / `unassessed`) describes only
  **whether a feed covers a protocol**. It is never a statement about how risky a protocol is.
- Aggregation, sorting, and filtering of verbatim feed data is permitted. Deriving a new score
  from that data is not.

### Changing this constraint

Any future addition of composite scoring **requires prior written agreement from the Ethereum
Foundation**. The process is:

1. Open a public issue describing the proposed change and rationale.
2. Obtain written agreement from the Ethereum Foundation (App Relations or successor team).
3. Record that agreement (link/reference) in this charter via pull request.
4. Only then may scoring functionality be merged.

No maintainer, contributor, or steward may bypass this process.

## 2. Neutrality

- No undisclosed commercial relationships with listed protocols or feed providers.
- All conflicts of interest are declared in [`CONFLICTS.md`](./CONFLICTS.md).
- No feed is treated as canonical or weighted above another in the interface.

## 3. Data integrity

- NDRIA never fabricates feed data. Cells are populated only from verified, linked sources.
- Every datum carries a provenance tag.
- Governance data is sourced from onchain / verifiable sources in preference to self-reported.

## 4. Open source & stewardship

- The full codebase and data layer are AGPL-3.0 licensed and developed in the open.
- The project has a named long-term steward (recorded in [`STEWARDSHIP.md`](./STEWARDSHIP.md))
  with a public presence and a stated commitment to long-term maintenance.

## 5. Scope (v1)

- Ethereum mainnet protocols only. Cross-chain / L2 coverage is out of scope for v1 and may be
  added as a follow-on milestone if matching funding is secured.
