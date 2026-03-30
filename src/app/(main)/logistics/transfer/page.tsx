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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            融通提案（自動）
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
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
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3 flex-1">
                      {/* Alert Header */}
                      <div className="flex items-center gap-2">
                        <AlertTriangle
                          className={cn(
                            "h-5 w-5",
                            suggestion.urgency === "high"
                              ? "text-red-600"
                              : suggestion.urgency === "medium"
                              ? "text-yellow-600"
                              : "text-green-600"
                          )}
                        />
                        <span className="font-semibold">
                          {suggestion.toLocationName}: {suggestion.equipmentName} が不足見込み
                        </span>
                        <Badge
                          variant="outline"
                          className={cn(urgencyConfig[suggestion.urgency].color)}
                        >
                          {urgencyConfig[suggestion.urgency].label}
                        </Badge>
                      </div>

                      {/* Suggestion */}
                      <div className="flex items-center gap-2 bg-white/50 rounded-lg p-3">
                        <Lightbulb className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm">
                          提案: {suggestion.fromLocationName}（余剰あり）
                        </span>
                        <ArrowRight className="h-4 w-4" />
                        <span className="text-sm">{suggestion.toLocationName}</span>
                        <span className="text-sm font-medium">へ {suggestion.quantity}台 移送</span>
                      </div>

                      {/* Reason */}
                      <p className="text-sm text-muted-foreground pl-6">
                        {suggestion.reason}
                      </p>

                      {/* Cost */}
                      <p className="text-sm pl-6">
                        推定コスト: <span className="font-semibold">¥{suggestion.estimatedCost.toLocaleString()}</span>
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 ml-4">
                      <Button size="sm" className="bg-[hsl(var(--primary))]">
                        <Check className="mr-1 h-4 w-4" />
                        承認
                      </Button>
                      <Button size="sm" variant="outline">
                        <X className="mr-1 h-4 w-4" />
                        却下
                      </Button>
                      <Button size="sm" variant="ghost">
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
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <Lightbulb className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium">融通提案について</h3>
              <p className="text-sm text-muted-foreground mt-1">
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
