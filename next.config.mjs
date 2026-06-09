/** @type {import('next').NextConfig} */

// Content-Security-Policy tuned for this app:
// - Self-hosted fonts (next/font) and Tailwind CSS -> 'self' (+ 'unsafe-inline' for the
//   style/script bootstrap Next injects; no nonce/middleware in use).
// - DefiLlama is fetched server-side, so the browser only talks to 'self'.
// - No framing, no plugins, no base-tag hijacking.
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "font-src 'self'",
  "img-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline'",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
