import type { CoverageStatus } from "@/data/types";
import { STATUS_LABEL } from "@/data/coverage";

const STYLES: Record<CoverageStatus, string> = {
  covered: "bg-green-100 text-green-700 border-green-300",
  partial: "bg-amber-100 text-amber-700 border-amber-300",
  not_yet: "bg-stone-100 text-stone-500 border-stone-300",
  unknown: "bg-stone-50 text-stone-400 border-stone-200",
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
