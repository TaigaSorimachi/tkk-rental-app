"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { locationRevenueData } from "@/data/dashboard";

export function LocationRanking() {
  const maxRevenue = Math.max(...locationRevenueData.map((d) => d.revenue));

  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="text-base sm:text-lg font-semibold">拠点別売上ランキング</CardTitle>
      </CardHeader>
      <CardContent className="px-3 sm:px-6">
        <div className="space-y-3 sm:space-y-4">
          {locationRevenueData.map((location, index) => (
            <div key={location.location} className="space-y-1.5 sm:space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-[10px] sm:text-xs font-bold text-white flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="font-medium truncate">{location.location}</span>
                </div>
                <div className="text-right flex-shrink-0 ml-2">
                  <span className="font-semibold">
                    ¥{(location.revenue / 1000000).toFixed(1)}M
                  </span>
                  <span className="ml-1 sm:ml-2 text-muted-foreground hidden sm:inline">
                    ({location.percentage}%)
                  </span>
                </div>
              </div>
              <Progress
                value={(location.revenue / maxRevenue) * 100}
                className="h-1.5 sm:h-2"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
