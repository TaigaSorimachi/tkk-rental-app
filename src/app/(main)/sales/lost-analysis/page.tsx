"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { deals, lostReasons, competitorLosses } from "@/data/deals";

const COLORS = ["#E63E1E", "#1B4D8E", "#D97706", "#059669", "#6B7280"];

const lostReasonData = [
  { name: "価格", value: lostReasons.price.percentage },
  { name: "在庫なし", value: lostReasons.inventory.percentage },
  { name: "納期", value: lostReasons.delivery.percentage },
  { name: "競合優位", value: lostReasons.competitor.percentage },
  { name: "その他", value: lostReasons.other.percentage },
];

export default function LostAnalysisPage() {
  const lostDeals = deals.filter((d) => d.stage === "lost");

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Lost Reason Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">失注理由の内訳</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={lostReasonData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, value }) => `${name} (${value}%)`}
                  >
                    {lostReasonData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "割合"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Competitor Losses */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">競合別失注件数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={competitorLosses} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fontSize: 12 }}
                    width={120}
                  />
                  <Tooltip />
                  <Bar dataKey="count" fill="#E63E1E" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lost Deals Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">失注案件一覧</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>顧客名</TableHead>
                  <TableHead>案件名</TableHead>
                  <TableHead className="text-right">金額</TableHead>
                  <TableHead>失注理由</TableHead>
                  <TableHead>競合先</TableHead>
                  <TableHead>担当</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="table-zebra">
                {lostDeals.map((deal) => (
                  <TableRow key={deal.id}>
                    <TableCell className="font-medium">{deal.customerName}</TableCell>
                    <TableCell>{deal.title}</TableCell>
                    <TableCell className="text-right">
                      ¥{(deal.amount / 1000000).toFixed(1)}M
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          deal.lostReason === "price"
                            ? "border-red-500 text-red-500"
                            : deal.lostReason === "inventory"
                            ? "border-blue-500 text-blue-500"
                            : "border-yellow-500 text-yellow-500"
                        }
                      >
                        {deal.lostReason === "price"
                          ? "価格"
                          : deal.lostReason === "inventory"
                          ? "在庫なし"
                          : deal.lostReason === "delivery"
                          ? "納期"
                          : deal.lostReason === "competitor"
                          ? "競合優位"
                          : "その他"}
                      </Badge>
                    </TableCell>
                    <TableCell>{deal.competitor || "-"}</TableCell>
                    <TableCell>{deal.assignedSales}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
