import type { CoverageStatus } from "@/data/types";
import { STATUS_LABEL } from "@/data/coverage";

const STYLES: Record<CoverageStatus, string> = {
  covered: "bg-green-600/20 text-green-400 border-green-600/40",
  partial: "bg-amber-600/20 text-amber-400 border-amber-600/40",
  not_yet: "bg-gray-600/20 text-gray-400 border-gray-600/40",
  unknown: "bg-gray-800/40 text-gray-500 border-gray-700/40",
};

export function StatusBadge({ status }: { status: CoverageStatus }) {
  return (
    <span
      className={`inline-block rounded border px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${STYLES[status]}`}
      title={STATUS_LABEL[status]}
    >
      {status === "covered"
        ? "✓"
        : status === "partial"
          ? "◐"
          : status === "not_yet"
            ? "○"
            : "?"}
    </span>
  );
}
