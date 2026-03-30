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
      <CardHeader>
        <CardTitle className="text-lg font-semibold">アラート一覧</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-3">
            {alerts.map((alert) => {
              const config = severityConfig[alert.severity];
              const Icon = config.icon;

              return (
                <div
                  key={alert.id}
                  className="flex items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50"
                >
                  <div className={cn("flex h-8 w-8 items-center justify-center rounded-full", config.bgColor)}>
                    <Icon className={cn("h-4 w-4", config.color)} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{alert.title}</p>
                      <Badge
                        variant="outline"
                        className={cn("text-xs", config.color)}
                      >
                        {config.label}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {alert.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
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
