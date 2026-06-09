# Security Policy

NDRIA is a static, read-only public good. It has no user accounts, no user input, no
database, and no secrets in the client. Even so, we welcome responsible disclosure of any
security concern.

## Reporting a vulnerability

- Email: info@cybercentry.co.uk
- Please include steps to reproduce and the affected URL.
- We aim to acknowledge reports within 5 working days.

Please do not run intrusive or automated attacks against the hosted instance. Header and
configuration review against the public endpoint is welcome.

## Scope

- The deployed application at https://ndria.up.railway.app
- This repository (Cybercentry/ndria)

## Hardening

The application sets HSTS, a restrictive Content-Security-Policy, `X-Frame-Options: DENY`,
`X-Content-Type-Options: nosniff`, `Referrer-Policy`, and `Permissions-Policy`, and discloses
no framework version header. See [next.config.mjs](./next.config.mjs).
