"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Lightbulb, ArrowRight, Check, X } from "lucide-react";
import { transferSuggestions } from "@/data/dashboard";
import { cn } from "@/lib/utils";

const urgencyConfig = {
  high: { label: "緊急", color: "bg-red-100 text-red-800 border-red-200" },
  medium: { label: "中", color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  low: { label: "低", color: "bg-green-100 text-green-800 border-green-200" },
};

export default function TransferPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
            融通提案（自動）
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-6">
          <div className="space-y-3 sm:space-y-4">
            {transferSuggestions.map((suggestion) => (
              <Card
                key={suggestion.id}
                className={cn(
                  "border-2",
                  suggestion.urgency === "high"
                    ? "border-red-200 bg-red-50"
                    : suggestion.urgency === "medium"
                    ? "border-yellow-200 bg-yellow-50"
                    : "border-green-200 bg-green-50"
                )}
              >
                <CardContent className="pt-3 sm:pt-4 px-3 sm:px-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="space-y-2 sm:space-y-3 flex-1 min-w-0">
                      {/* Alert Header */}
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                        <AlertTriangle
                          className={cn(
                            "h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0",
                            suggestion.urgency === "high"
                              ? "text-red-600"
                              : suggestion.urgency === "medium"
                              ? "text-yellow-600"
                              : "text-green-600"
                          )}
                        />
                        <span className="font-semibold text-sm sm:text-base">
                          {suggestion.toLocationName}: {suggestion.equipmentName} が不足見込み
                        </span>
                        <Badge
                          variant="outline"
                          className={cn(urgencyConfig[suggestion.urgency].color, "text-[10px] sm:text-xs")}
                        >
                          {urgencyConfig[suggestion.urgency].label}
                        </Badge>
                      </div>

                      {/* Suggestion */}
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2 bg-white/50 rounded-lg p-2 sm:p-3">
                        <Lightbulb className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">
                          提案: {suggestion.fromLocationName}
                        </span>
                        <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">{suggestion.toLocationName}</span>
                        <span className="text-xs sm:text-sm font-medium">へ {suggestion.quantity}台</span>
                      </div>

                      {/* Reason */}
                      <p className="text-xs sm:text-sm text-muted-foreground pl-0 sm:pl-6">
                        {suggestion.reason}
                      </p>

                      {/* Cost */}
                      <p className="text-xs sm:text-sm pl-0 sm:pl-6">
                        推定コスト: <span className="font-semibold">¥{suggestion.estimatedCost.toLocaleString()}</span>
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-row sm:flex-col gap-2">
                      <Button size="sm" className="bg-[hsl(var(--primary))] text-xs sm:text-sm flex-1 sm:flex-none">
                        <Check className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                        承認
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs sm:text-sm flex-1 sm:flex-none">
                        <X className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                        却下
                      </Button>
                      <Button size="sm" variant="ghost" className="text-xs sm:text-sm flex-1 sm:flex-none">
                        詳細
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card>
        <CardContent className="pt-4 sm:pt-6 px-3 sm:px-6">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-blue-100 flex-shrink-0">
              <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-sm sm:text-base">融通提案について</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                システムは各拠点の在庫状況と需要予測を分析し、最適な機材配置を提案します。
                提案を承認すると、配送スケジュールに自動で登録されます。
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
