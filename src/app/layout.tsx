import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "NDRIA - Neutral DeFi Risk Intelligence Aggregator",
  description:
    "A neutral, open-source public good showing what every major DeFi risk feed says about a protocol, side by side, verbatim - without synthesis or scoring.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-[var(--border)]">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
            <Link href="/" className="font-mono text-sm font-semibold tracking-tight">
              NDRIA
            </Link>
            <nav className="flex gap-4 text-sm text-[var(--muted)]">
              <Link href="/" className="hover:text-[var(--fg)]">
                Matrix
              </Link>
              <Link href="/methodology" className="hover:text-[var(--fg)]">
                Methodology
              </Link>
              <a
                href="https://github.com/Cybercentry/ndria"
                className="hover:text-[var(--fg)]"
              >
                GitHub
              </a>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>
        <footer className="border-t border-[var(--border)] py-6 text-center text-xs text-[var(--muted)]">
          NDRIA is a public good. It aggregates existing feeds verbatim and produces no
          risk scores of its own. AGPL-3.0.
        </footer>
      </body>
    </html>
  );
}
