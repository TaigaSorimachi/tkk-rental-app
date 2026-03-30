"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Truck } from "lucide-react";
import { deliveries, weeklyDeliverySummary } from "@/data/deliveries";
import { locations } from "@/data/locations";
import { cn } from "@/lib/utils";

const days = ["月", "火", "水", "木", "金", "土"];

const statusConfig = {
  scheduled: { label: "配車済", color: "bg-gray-100 text-gray-800" },
  dispatched: { label: "出発", color: "bg-blue-100 text-blue-800" },
  in_transit: { label: "移動中", color: "bg-yellow-100 text-yellow-800" },
  delivered: { label: "到着", color: "bg-green-100 text-green-800" },
  completed: { label: "完了", color: "bg-green-100 text-green-800" },
};

export default function SchedulePage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Weekly Calendar View */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-lg sm:text-xl">配送カレンダー（週表示）</CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-6">
          <div className="overflow-x-auto -mx-3 px-3 sm:mx-0 sm:px-0">
            <Table className="min-w-[500px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] sm:w-[180px] text-xs sm:text-sm">拠点</TableHead>
                  {days.map((day) => (
                    <TableHead key={day} className="text-center min-w-[50px] sm:min-w-[80px] text-xs sm:text-sm">
                      {day}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {locations.map((loc) => {
                  const summary = weeklyDeliverySummary[loc.id as keyof typeof weeklyDeliverySummary];
                  const dayKeys = ["mon", "tue", "wed", "thu", "fri", "sat"] as const;

                  return (
                    <TableRow key={loc.id}>
                      <TableCell className="font-medium text-xs sm:text-sm whitespace-nowrap">{loc.name}</TableCell>
                      {dayKeys.map((dayKey) => {
                        const count = summary[dayKey];
                        return (
                          <TableCell key={dayKey} className="text-center p-1 sm:p-2">
                            {count > 0 ? (
                              <div className="flex items-center justify-center gap-0.5 sm:gap-1">
                                <Truck className="h-3 w-3 sm:h-4 sm:w-4 text-[hsl(var(--primary))]" />
                                <span className="text-xs sm:text-sm font-medium">×{count}</span>
                              </div>
                            ) : (
                              <span className="text-muted-foreground text-xs sm:text-sm">-</span>
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          <p className="text-xs text-muted-foreground mt-3 sm:hidden">← 横スクロールで全日程を表示</p>
        </CardContent>
      </Card>

      {/* Delivery Details */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-lg sm:text-xl">配送詳細</CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-6">
          <div className="space-y-3 sm:space-y-4">
            {deliveries.slice(0, 8).map((delivery) => (
              <div
                key={delivery.id}
                className="rounded-lg border p-3 sm:p-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-sm sm:text-base">
                        {delivery.scheduledDate} ({delivery.scheduledTime})
                      </span>
                      <Badge
                        className={cn(
                          statusConfig[delivery.status].color,
                          "text-[10px] sm:text-xs"
                        )}
                      >
                        {statusConfig[delivery.status].label}
                      </Badge>
                    </div>
                    <p className="text-xs sm:text-sm truncate">
                      {delivery.fromLocationName} → {delivery.customerName} {delivery.siteName}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1">
                      機材: {delivery.equipmentList.join(", ")}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      ドライバー: {delivery.driver}
                    </p>
                  </div>
                  <div className="flex flex-row sm:flex-col gap-1 flex-wrap sm:flex-nowrap">
                    {["scheduled", "dispatched", "in_transit", "delivered"].map((s, index) => {
                      const isActive = ["scheduled", "dispatched", "in_transit", "delivered", "completed"].indexOf(delivery.status) >= index;
                      return (
                        <Badge
                          key={s}
                          variant={isActive ? "default" : "outline"}
                          className={cn(
                            "text-[10px] sm:text-xs",
                            isActive ? "bg-[hsl(var(--primary))]" : ""
                          )}
                        >
                          {s === "scheduled"
                            ? "配車済"
                            : s === "dispatched"
                            ? "出発"
                            : s === "in_transit"
                            ? "移動中"
                            : "到着"}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
                {delivery.notes && (
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground bg-muted rounded p-2">
                    備考: {delivery.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
