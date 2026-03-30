"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { locationRevenueData } from "@/data/dashboard";

export function LocationRanking() {
  const maxRevenue = Math.max(...locationRevenueData.map((d) => d.revenue));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">拠点別売上ランキング</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {locationRevenueData.map((location, index) => (
            <div key={location.location} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  <span className="font-medium">{location.location}</span>
                </div>
                <div className="text-right">
                  <span className="font-semibold">
                    ¥{(location.revenue / 1000000).toFixed(1)}M
                  </span>
                  <span className="ml-2 text-muted-foreground">
                    ({location.percentage}%)
                  </span>
                </div>
              </div>
              <Progress
                value={(location.revenue / maxRevenue) * 100}
                className="h-2"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
