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
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="mt-2 text-3xl font-bold">{value}</p>
            <div className="mt-2 flex items-center gap-1">
              {isPositive ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
              <span
                className={cn(
                  "text-sm font-medium",
                  isPositive ? "text-green-600" : "text-red-600"
                )}
              >
                {changeText}
              </span>
              <span className="text-sm text-muted-foreground">前月比</span>
            </div>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--primary)/0.1)]">
            <Icon className="h-6 w-6 text-[hsl(var(--primary))]" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
