"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock } from "lucide-react";
import { orders } from "@/data/orders";
import { cn } from "@/lib/utils";

export default function ReturnsPage() {
  const today = new Date();

  // Filter orders that are active or returning with end date within 7 days
  const upcomingReturns = orders.filter((order) => {
    if (order.status !== "active" && order.status !== "returning") return false;
    const endDate = new Date(order.endDate);
    const diffDays = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  });

  // Overdue orders (end date has passed)
  const overdueOrders = orders.filter((order) => {
    if (order.status !== "active") return false;
    const endDate = new Date(order.endDate);
    return endDate < today;
  });

  const getDaysInfo = (endDate: string) => {
    const end = new Date(endDate);
    const diff = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (diff < 0) {
      return { text: `${Math.abs(diff)}日超過`, isOverdue: true };
    } else if (diff === 0) {
      return { text: "本日", isOverdue: false };
    } else {
      return { text: `${diff}日後`, isOverdue: false };
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Overdue Section */}
      {overdueOrders.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="flex items-center gap-2 text-red-800 text-base sm:text-lg">
              <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5" />
              返却遅延中（{overdueOrders.length}件）
            </CardTitle>
          </CardHeader>
          <CardContent className="px-3 sm:px-6">
            <div className="rounded-md border border-red-200 bg-white overflow-x-auto -mx-3 sm:mx-0">
              <Table className="min-w-[550px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs sm:text-sm">注文No</TableHead>
                    <TableHead className="text-xs sm:text-sm">顧客名</TableHead>
                    <TableHead className="text-xs sm:text-sm hidden sm:table-cell">機材</TableHead>
                    <TableHead className="text-xs sm:text-sm">返却予定</TableHead>
                    <TableHead className="text-xs sm:text-sm">超過</TableHead>
                    <TableHead className="text-xs sm:text-sm">アクション</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {overdueOrders.map((order) => {
                    const daysInfo = getDaysInfo(order.endDate);
                    return (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium text-xs sm:text-sm">{order.id}</TableCell>
                        <TableCell className="text-xs sm:text-sm">{order.customerName}</TableCell>
                        <TableCell className="text-xs sm:text-sm hidden sm:table-cell">
                          {order.items.map((i) => i.equipmentName).join(", ").slice(0, 20)}...
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm whitespace-nowrap">{order.endDate}</TableCell>
                        <TableCell>
                          <Badge variant="destructive" className="text-[10px] sm:text-xs">{daysInfo.text}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                            <Button size="sm" variant="outline" className="text-[10px] sm:text-xs h-7 px-2">
                              延長
                            </Button>
                            <Button size="sm" className="text-[10px] sm:text-xs h-7 px-2">返却</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
            <p className="text-xs text-muted-foreground mt-3 sm:hidden">← 横スクロールで全列を表示</p>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Returns */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
            返却予定（7日以内）
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-6">
          <div className="rounded-md border overflow-x-auto -mx-3 sm:mx-0">
            <Table className="min-w-[600px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs sm:text-sm">注文No</TableHead>
                  <TableHead className="text-xs sm:text-sm">顧客名</TableHead>
                  <TableHead className="text-xs sm:text-sm hidden md:table-cell">現場名</TableHead>
                  <TableHead className="text-xs sm:text-sm hidden sm:table-cell">機材</TableHead>
                  <TableHead className="text-xs sm:text-sm">返却予定</TableHead>
                  <TableHead className="text-xs sm:text-sm">残日数</TableHead>
                  <TableHead className="text-xs sm:text-sm">アクション</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="table-zebra">
                {upcomingReturns
                  .filter((o) => !overdueOrders.includes(o))
                  .map((order) => {
                    const daysInfo = getDaysInfo(order.endDate);
                    return (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium text-xs sm:text-sm">{order.id}</TableCell>
                        <TableCell className="text-xs sm:text-sm">{order.customerName}</TableCell>
                        <TableCell className="max-w-[120px] truncate text-xs sm:text-sm hidden md:table-cell">{order.siteName}</TableCell>
                        <TableCell className="text-xs sm:text-sm hidden sm:table-cell">
                          {order.items.map((i) => i.equipmentName).join(", ").slice(0, 20)}...
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm whitespace-nowrap">{order.endDate}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-[10px] sm:text-xs",
                              daysInfo.isOverdue
                                ? "border-red-500 text-red-500"
                                : "border-yellow-500 text-yellow-600"
                            )}
                          >
                            {daysInfo.text}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                            <Button size="sm" variant="outline" className="text-[10px] sm:text-xs h-7 px-2">
                              延長
                            </Button>
                            <Button size="sm" className="text-[10px] sm:text-xs h-7 px-2">返却</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </div>
          <p className="text-xs text-muted-foreground mt-3 sm:hidden">← 横スクロールで全列を表示</p>
        </CardContent>
      </Card>
    </div>
  );
}
