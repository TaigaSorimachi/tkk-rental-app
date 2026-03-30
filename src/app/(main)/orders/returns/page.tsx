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
    <div className="space-y-6">
      {/* Overdue Section */}
      {overdueOrders.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="h-5 w-5" />
              返却遅延中（{overdueOrders.length}件）
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-red-200 bg-white">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>注文No</TableHead>
                    <TableHead>顧客名</TableHead>
                    <TableHead>機材</TableHead>
                    <TableHead>返却予定日</TableHead>
                    <TableHead>超過日数</TableHead>
                    <TableHead>アクション</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {overdueOrders.map((order) => {
                    const daysInfo = getDaysInfo(order.endDate);
                    return (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customerName}</TableCell>
                        <TableCell>
                          {order.items.map((i) => i.equipmentName).join(", ").slice(0, 30)}...
                        </TableCell>
                        <TableCell>{order.endDate}</TableCell>
                        <TableCell>
                          <Badge variant="destructive">{daysInfo.text}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              延長申請
                            </Button>
                            <Button size="sm">返却処理</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Returns */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            返却予定（7日以内）
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>注文No</TableHead>
                  <TableHead>顧客名</TableHead>
                  <TableHead>現場名</TableHead>
                  <TableHead>機材</TableHead>
                  <TableHead>返却予定日</TableHead>
                  <TableHead>残日数</TableHead>
                  <TableHead>アクション</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="table-zebra">
                {upcomingReturns
                  .filter((o) => !overdueOrders.includes(o))
                  .map((order) => {
                    const daysInfo = getDaysInfo(order.endDate);
                    return (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customerName}</TableCell>
                        <TableCell className="max-w-[150px] truncate">{order.siteName}</TableCell>
                        <TableCell>
                          {order.items.map((i) => i.equipmentName).join(", ").slice(0, 25)}...
                        </TableCell>
                        <TableCell>{order.endDate}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={cn(
                              daysInfo.isOverdue
                                ? "border-red-500 text-red-500"
                                : "border-yellow-500 text-yellow-600"
                            )}
                          >
                            {daysInfo.text}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              延長
                            </Button>
                            <Button size="sm">返却</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
