"use client";

import { useParams } from "next/navigation";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { RankBadge } from "@/components/ui/RankBadge";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Lightbulb, Package } from "lucide-react";
import { customers } from "@/data/customers";
import { orders } from "@/data/orders";

// Mock monthly data for the customer
const monthlyData = [
  { month: "10月", amount: 8500000 },
  { month: "11月", amount: 12000000 },
  { month: "12月", amount: 9500000 },
  { month: "1月", amount: 7000000 },
  { month: "2月", amount: 11000000 },
  { month: "3月", amount: 10500000 },
];

// Mock top equipment
const topEquipment = [
  { name: "水槽タンク", percentage: 35 },
  { name: "コンプレッサー", percentage: 22 },
  { name: "ハンマーグラブ", percentage: 18 },
  { name: "パワージャッキ", percentage: 15 },
  { name: "発電機", percentage: 10 },
];

// Mock recommendations
const recommendations = [
  {
    name: "スライムキャッチャー",
    reason: "場所打杭工事が多い顧客。過去にハンマーグラブと併用された実績が多数。",
  },
  {
    name: "超音波側壁測定装置",
    reason: "地中連続壁工事の受注が増加傾向。品質管理強化ニーズに合致。",
  },
  {
    name: "ミキシングプラント TMP-300",
    reason: "大規模地盤改良工事の需要増。現在TMP-200を利用中、アップグレード提案。",
  },
];

export default function CustomerDetailPage() {
  const params = useParams();
  const customerId = params.id as string;
  const customer = customers.find((c) => c.id === customerId);
  const customerOrders = orders.filter((o) => o.customerId === customerId);

  if (!customer) {
    return <div>顧客が見つかりません</div>;
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <Card>
        <CardContent className="pt-4 sm:pt-6 px-3 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <h1 className="text-xl sm:text-2xl font-bold">{customer.name}</h1>
                <RankBadge rank={customer.rank} />
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                <span>{customer.industryName}</span>
                <span className="hidden sm:inline">|</span>
                <span>担当: {customer.assignedSales}</span>
                <span className="hidden sm:inline">|</span>
                <span>年間: ¥{(customer.annualRevenue / 1000000).toFixed(1)}M</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="overview" className="flex-1 sm:flex-none text-xs sm:text-sm">概要</TabsTrigger>
          <TabsTrigger value="history" className="flex-1 sm:flex-none text-xs sm:text-sm">取引履歴</TabsTrigger>
          <TabsTrigger value="recommend" className="flex-1 sm:flex-none text-xs sm:text-sm">レコメンド</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
            {/* Monthly Revenue Chart */}
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-base sm:text-lg">月別取引額推移</CardTitle>
              </CardHeader>
              <CardContent className="px-3 sm:px-6">
                <div className="h-[200px] sm:h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                      <YAxis
                        tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                        tick={{ fontSize: 10 }}
                        width={35}
                      />
                      <Tooltip
                        formatter={(value) => [`¥${(Number(value) / 1000000).toFixed(1)}M`, "取引額"]}
                      />
                      <Bar dataKey="amount" fill="#1B4D8E" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Top Equipment */}
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-base sm:text-lg">よく借りる機材 TOP5</CardTitle>
              </CardHeader>
              <CardContent className="px-3 sm:px-6">
                <div className="space-y-3 sm:space-y-4">
                  {topEquipment.map((eq, index) => (
                    <div key={eq.name} className="flex items-center gap-2 sm:gap-3">
                      <span className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-[10px] sm:text-xs font-bold text-white flex-shrink-0">
                        {index + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs sm:text-sm font-medium truncate">{eq.name}</span>
                          <span className="text-xs sm:text-sm text-muted-foreground ml-2">{eq.percentage}%</span>
                        </div>
                        <div className="h-1.5 sm:h-2 rounded-full bg-muted">
                          <div
                            className="h-1.5 sm:h-2 rounded-full bg-[hsl(var(--primary))]"
                            style={{ width: `${eq.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Orders */}
          <Card>
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="text-base sm:text-lg">直近の取引</CardTitle>
            </CardHeader>
            <CardContent className="px-3 sm:px-6">
              <div className="space-y-2 sm:space-y-3">
                {customerOrders.slice(0, 5).map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-lg border p-2 sm:p-3 gap-2"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 min-w-0">
                      <span className="font-medium text-xs sm:text-sm">{order.id}</span>
                      <span className="text-xs sm:text-sm text-muted-foreground truncate">
                        {order.items.map((i) => i.equipmentName).join(", ").slice(0, 30)}...
                      </span>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-4">
                      <span className="text-xs sm:text-sm truncate max-w-[100px] sm:max-w-none">{order.siteName}</span>
                      <StatusBadge status={order.status} type="order" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history">
          <Card>
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="text-base sm:text-lg">取引履歴</CardTitle>
            </CardHeader>
            <CardContent className="px-3 sm:px-6">
              <div className="rounded-md border overflow-x-auto -mx-3 sm:mx-0">
                <Table className="min-w-[600px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs sm:text-sm">注文No</TableHead>
                      <TableHead className="text-xs sm:text-sm hidden sm:table-cell">現場名</TableHead>
                      <TableHead className="text-xs sm:text-sm">機材</TableHead>
                      <TableHead className="text-xs sm:text-sm whitespace-nowrap">期間</TableHead>
                      <TableHead className="text-right text-xs sm:text-sm">金額</TableHead>
                      <TableHead className="text-xs sm:text-sm">状態</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="table-zebra">
                    {customerOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium text-xs sm:text-sm">{order.id}</TableCell>
                        <TableCell className="text-xs sm:text-sm hidden sm:table-cell truncate max-w-[150px]">{order.siteName}</TableCell>
                        <TableCell className="text-xs sm:text-sm">
                          {order.items.map((i) => i.equipmentName).join(", ").slice(0, 20)}...
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm whitespace-nowrap">
                          {order.startDate.slice(5)} 〜 {order.endDate.slice(5)}
                        </TableCell>
                        <TableCell className="text-right text-xs sm:text-sm whitespace-nowrap">
                          ¥{(order.totalAmount / 1000).toFixed(0)}K
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={order.status} type="order" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <p className="text-xs text-muted-foreground mt-3 sm:hidden">← 横スクロールで全列を表示</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recommend Tab */}
        <TabsContent value="recommend">
          <Card>
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
                この顧客へのおすすめ提案
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 sm:px-6">
              <div className="space-y-3 sm:space-y-4">
                {recommendations.map((rec) => (
                  <div
                    key={rec.name}
                    className="rounded-lg border p-3 sm:p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                      <Package className="h-4 w-4 sm:h-5 sm:w-5 text-[hsl(var(--primary))] flex-shrink-0" />
                      <span className="font-semibold text-sm sm:text-base">{rec.name}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground pl-6 sm:pl-8">{rec.reason}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
