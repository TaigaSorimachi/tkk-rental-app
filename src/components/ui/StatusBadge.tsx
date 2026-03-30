import { cn } from "@/lib/utils";

export type EquipmentStatus = "available" | "rented" | "maintenance" | "retired";
export type OrderStatus = "pending" | "confirmed" | "delivering" | "active" | "returning" | "completed";
export type DealStage = "lead" | "negotiation" | "proposal" | "won" | "lost";

const equipmentStatusConfig: Record<EquipmentStatus, { label: string; className: string }> = {
  available: { label: "貸出可", className: "bg-green-100 text-green-800" },
  rented: { label: "貸出中", className: "bg-blue-100 text-blue-800" },
  maintenance: { label: "整備中", className: "bg-yellow-100 text-yellow-800" },
  retired: { label: "廃棄", className: "bg-gray-100 text-gray-800" },
};

const orderStatusConfig: Record<OrderStatus, { label: string; className: string }> = {
  pending: { label: "受付中", className: "bg-gray-100 text-gray-800" },
  confirmed: { label: "確定", className: "bg-green-100 text-green-800" },
  delivering: { label: "配送中", className: "bg-yellow-100 text-yellow-800" },
  active: { label: "貸出中", className: "bg-blue-100 text-blue-800" },
  returning: { label: "返却中", className: "bg-orange-100 text-orange-800" },
  completed: { label: "完了", className: "bg-gray-100 text-gray-800" },
};

const dealStageConfig: Record<DealStage, { label: string; className: string }> = {
  lead: { label: "リード", className: "bg-gray-100 text-gray-800" },
  negotiation: { label: "商談中", className: "bg-blue-100 text-blue-800" },
  proposal: { label: "見積提出", className: "bg-yellow-100 text-yellow-800" },
  won: { label: "受注", className: "bg-green-100 text-green-800" },
  lost: { label: "失注", className: "bg-red-100 text-red-800" },
};

interface StatusBadgeProps {
  status: EquipmentStatus | OrderStatus | DealStage;
  type?: "equipment" | "order" | "deal";
  className?: string;
}

export function StatusBadge({ status, type = "equipment", className }: StatusBadgeProps) {
  let config;

  if (type === "equipment") {
    config = equipmentStatusConfig[status as EquipmentStatus];
  } else if (type === "order") {
    config = orderStatusConfig[status as OrderStatus];
  } else {
    config = dealStageConfig[status as DealStage];
  }

  if (!config) {
    return null;
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
