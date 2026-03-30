"use client";

import { AlertCircle, AlertTriangle, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { alerts, type AlertSeverity } from "@/data/dashboard";
import { cn } from "@/lib/utils";

const severityConfig: Record<AlertSeverity, { icon: typeof AlertCircle; color: string; bgColor: string; label: string }> = {
  high: { icon: AlertCircle, color: "text-red-600", bgColor: "bg-red-100", label: "高" },
  medium: { icon: AlertTriangle, color: "text-yellow-600", bgColor: "bg-yellow-100", label: "中" },
  low: { icon: Info, color: "text-green-600", bgColor: "bg-green-100", label: "低" },
};

export function AlertList() {
  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="text-base sm:text-lg font-semibold">アラート一覧</CardTitle>
      </CardHeader>
      <CardContent className="px-3 sm:px-6">
        <ScrollArea className="h-[250px] sm:h-[300px] pr-2 sm:pr-4">
          <div className="space-y-2 sm:space-y-3">
            {alerts.map((alert) => {
              const config = severityConfig[alert.severity];
              const Icon = config.icon;

              return (
                <div
                  key={alert.id}
                  className="flex items-start gap-2 sm:gap-3 rounded-lg border p-2 sm:p-3 transition-colors hover:bg-muted/50"
                >
                  <div className={cn("flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full flex-shrink-0", config.bgColor)}>
                    <Icon className={cn("h-3 w-3 sm:h-4 sm:w-4", config.color)} />
                  </div>
                  <div className="flex-1 space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                      <p className="text-xs sm:text-sm font-medium">{alert.title}</p>
                      <Badge
                        variant="outline"
                        className={cn("text-[10px] sm:text-xs", config.color)}
                      >
                        {config.label}
                      </Badge>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                      {alert.description}
                    </p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">
                      {new Date(alert.timestamp).toLocaleString("ja-JP", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
