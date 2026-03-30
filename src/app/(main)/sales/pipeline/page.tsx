"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { deals, type DealStage } from "@/data/deals";
import { cn } from "@/lib/utils";

const stageConfig: Record<DealStage, { label: string; color: string }> = {
  lead: { label: "リード", color: "bg-gray-100" },
  negotiation: { label: "商談中", color: "bg-blue-100" },
  proposal: { label: "見積提出", color: "bg-yellow-100" },
  won: { label: "受注確定", color: "bg-green-100" },
  lost: { label: "失注", color: "bg-red-100" },
};

const stages: DealStage[] = ["lead", "negotiation", "proposal", "won"];

export default function PipelinePage() {
  const dealsByStage = (stage: DealStage) => deals.filter((d) => d.stage === stage);

  const totalByStage = (stage: DealStage) =>
    dealsByStage(stage).reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-lg sm:text-xl">営業パイプライン</CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-6">
          {/* Horizontal scroll container for mobile */}
          <div className="overflow-x-auto -mx-3 px-3 sm:mx-0 sm:px-0">
            <div className="flex gap-3 sm:gap-4 min-w-[800px] sm:min-w-0 sm:grid sm:grid-cols-4">
              {stages.map((stage) => {
                const stageDeals = dealsByStage(stage);
                const total = totalByStage(stage);

                return (
                  <div key={stage} className="flex flex-col w-[200px] sm:w-auto flex-shrink-0 sm:flex-shrink">
                    {/* Stage Header */}
                    <div
                      className={cn(
                        "rounded-t-lg p-2 sm:p-3",
                        stageConfig[stage].color
                      )}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-semibold text-sm sm:text-base">{stageConfig[stage].label}</h3>
                        <Badge variant="secondary" className="text-xs">{stageDeals.length}件</Badge>
                      </div>
                      <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                        ¥{(total / 1000000).toFixed(1)}M
                      </p>
                    </div>

                    {/* Cards */}
                    <ScrollArea className="h-[400px] sm:h-[500px] rounded-b-lg border border-t-0 bg-muted/30 p-1.5 sm:p-2">
                      <div className="space-y-2">
                        {stageDeals.map((deal) => (
                          <Card key={deal.id} className="cursor-pointer hover:shadow-md transition-shadow">
                            <CardContent className="p-2 sm:p-3">
                              <div className="font-medium text-xs sm:text-sm">{deal.customerName}</div>
                              <div className="text-xs text-muted-foreground mt-1 line-clamp-1">
                                {deal.title}
                              </div>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs sm:text-sm font-semibold text-[hsl(var(--primary))]">
                                  ¥{(deal.amount / 1000000).toFixed(1)}M
                                </span>
                                <Badge variant="outline" className="text-[10px] sm:text-xs">
                                  {deal.probability}%
                                </Badge>
                              </div>
                              <div className="mt-2 flex flex-wrap gap-1">
                                {deal.equipmentNeeds.slice(0, 2).map((need) => (
                                  <Badge key={need} variant="secondary" className="text-[10px] sm:text-xs">
                                    {need === "foundation"
                                      ? "基礎"
                                      : need === "tank"
                                      ? "タンク"
                                      : need === "pneumatic"
                                      ? "圧気"
                                      : need === "tunnel"
                                      ? "トンネル"
                                      : need === "ground"
                                      ? "地盤"
                                      : need === "seismic"
                                      ? "耐震"
                                      : need === "plant"
                                      ? "プラント"
                                      : need}
                                  </Badge>
                                ))}
                              </div>
                              <div className="mt-2 text-[10px] sm:text-xs text-muted-foreground">
                                担当: {deal.assignedSales}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                );
              })}
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3 sm:hidden">← 横スクロールで全ステージを表示</p>
        </CardContent>
      </Card>
    </div>
  );
}
