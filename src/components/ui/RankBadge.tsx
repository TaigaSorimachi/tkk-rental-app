import { cn } from "@/lib/utils";

export type CustomerRank = "S" | "A" | "B" | "C";

const rankConfig: Record<CustomerRank, { emoji: string; className: string }> = {
  S: { emoji: "🥇", className: "bg-amber-100 text-amber-800" },
  A: { emoji: "🥈", className: "bg-slate-100 text-slate-800" },
  B: { emoji: "🥉", className: "bg-orange-100 text-orange-800" },
  C: { emoji: "", className: "bg-gray-100 text-gray-800" },
};

interface RankBadgeProps {
  rank: CustomerRank;
  showLabel?: boolean;
  className?: string;
}

export function RankBadge({ rank, showLabel = true, className }: RankBadgeProps) {
  const config = rankConfig[rank];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
        config.className,
        className
      )}
    >
      {config.emoji && <span>{config.emoji}</span>}
      {showLabel && <span>{rank}</span>}
    </span>
  );
}
