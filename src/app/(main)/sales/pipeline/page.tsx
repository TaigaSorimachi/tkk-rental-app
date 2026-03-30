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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>営業パイプライン</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            {stages.map((stage) => {
              const stageDeals = dealsByStage(stage);
              const total = totalByStage(stage);

              return (
                <div key={stage} className="flex flex-col">
                  {/* Stage Header */}
                  <div
                    className={cn(
                      "rounded-t-lg p-3",
                      stageConfig[stage].color
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{stageConfig[stage].label}</h3>
                      <Badge variant="secondary">{stageDeals.length}件</Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      ¥{(total / 1000000).toFixed(1)}M
                    </p>
                  </div>

                  {/* Cards */}
                  <ScrollArea className="h-[500px] rounded-b-lg border border-t-0 bg-muted/30 p-2">
                    <div className="space-y-2">
                      {stageDeals.map((deal) => (
                        <Card key={deal.id} className="cursor-pointer hover:shadow-md transition-shadow">
                          <CardContent className="p-3">
                            <div className="font-medium text-sm">{deal.customerName}</div>
                            <div className="text-xs text-muted-foreground mt-1 line-clamp-1">
                              {deal.title}
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-sm font-semibold text-[hsl(var(--primary))]">
                                ¥{(deal.amount / 1000000).toFixed(1)}M
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {deal.probability}%
                              </Badge>
                            </div>
                            <div className="mt-2 flex flex-wrap gap-1">
                              {deal.equipmentNeeds.slice(0, 2).map((need) => (
                                <Badge key={need} variant="secondary" className="text-xs">
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
                            <div className="mt-2 text-xs text-muted-foreground">
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
        </CardContent>
      </Card>
    </div>
  );
}
