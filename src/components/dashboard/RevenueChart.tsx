"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { monthlyRevenueData } from "@/data/dashboard";

export function RevenueChart() {
  const formatYAxis = (value: number) => `${(value / 1000000).toFixed(0)}M`;

  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="text-base sm:text-lg font-semibold">月別売上推移</CardTitle>
      </CardHeader>
      <CardContent className="px-3 sm:px-6">
        <div className="h-[250px] sm:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyRevenueData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRental" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1B4D8E" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#1B4D8E" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E63E1E" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#E63E1E" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={{ stroke: "#E5E7EB" }}
              />
              <YAxis
                tickFormatter={formatYAxis}
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={{ stroke: "#E5E7EB" }}
                width={35}
              />
              <Tooltip
                formatter={(value) => `¥${(Number(value) / 1000000).toFixed(1)}M`}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  fontSize: "12px",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Area
                type="monotone"
                dataKey="rental"
                name="レンタル売上"
                stroke="#1B4D8E"
                fillOpacity={1}
                fill="url(#colorRental)"
              />
              <Area
                type="monotone"
                dataKey="sales"
                name="販売・その他"
                stroke="#E63E1E"
                fillOpacity={1}
                fill="url(#colorSales)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
