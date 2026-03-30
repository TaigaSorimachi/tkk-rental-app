"use client";

import { TrendingUp, TrendingDown, Activity, Package, Users, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  trend: "up" | "down";
  type: "revenue" | "utilization" | "rentals" | "customers";
}

const iconMap = {
  revenue: DollarSign,
  utilization: Activity,
  rentals: Package,
  customers: Users,
};

export function KPICard({ title, value, change, trend, type }: KPICardProps) {
  const Icon = iconMap[type];
  const isPositive = trend === "up";
  const changeText = type === "utilization"
    ? `${change > 0 ? "+" : ""}${change}pp`
    : type === "rentals" || type === "customers"
    ? `${change > 0 ? "+" : ""}${change}`
    : `${change > 0 ? "+" : ""}${change}%`;

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-3 sm:p-6">
        <div className="flex items-start sm:items-center justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">{title}</p>
            <p className="mt-1 sm:mt-2 text-xl sm:text-3xl font-bold truncate">{value}</p>
            <div className="mt-1 sm:mt-2 flex items-center gap-1 flex-wrap">
              {isPositive ? (
                <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
              ) : (
                <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4 text-red-600 flex-shrink-0" />
              )}
              <span
                className={cn(
                  "text-xs sm:text-sm font-medium",
                  isPositive ? "text-green-600" : "text-red-600"
                )}
              >
                {changeText}
              </span>
              <span className="text-xs sm:text-sm text-muted-foreground hidden sm:inline">前月比</span>
            </div>
          </div>
          <div className="flex h-8 w-8 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[hsl(var(--primary)/0.1)] flex-shrink-0">
            <Icon className="h-4 w-4 sm:h-6 sm:w-6 text-[hsl(var(--primary))]" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
