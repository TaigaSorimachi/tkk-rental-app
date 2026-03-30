"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { orders, type OrderStatus } from "@/data/orders";

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.siteName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    confirmed: orders.filter((o) => o.status === "confirmed").length,
    delivering: orders.filter((o) => o.status === "delivering").length,
    active: orders.filter((o) => o.status === "active").length,
    returning: orders.filter((o) => o.status === "returning").length,
    completed: orders.filter((o) => o.status === "completed").length,
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>注文一覧</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Tabs */}
          <Tabs value={statusFilter} onValueChange={setStatusFilter} className="mb-6">
            <TabsList>
              <TabsTrigger value="all">全て ({statusCounts.all})</TabsTrigger>
              <TabsTrigger value="pending">受付中 ({statusCounts.pending})</TabsTrigger>
              <TabsTrigger value="confirmed">確定 ({statusCounts.confirmed})</TabsTrigger>
              <TabsTrigger value="delivering">配送中 ({statusCounts.delivering})</TabsTrigger>
              <TabsTrigger value="active">貸出中 ({statusCounts.active})</TabsTrigger>
              <TabsTrigger value="returning">返却中 ({statusCounts.returning})</TabsTrigger>
              <TabsTrigger value="completed">完了 ({statusCounts.completed})</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Search */}
          <div className="mb-6 relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="注文番号・顧客名・現場名で検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">注文No</TableHead>
                  <TableHead>顧客名</TableHead>
                  <TableHead>現場名</TableHead>
                  <TableHead>機材</TableHead>
                  <TableHead>期間</TableHead>
                  <TableHead className="text-right">金額</TableHead>
                  <TableHead>状態</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="table-zebra">
                {filteredOrders.slice(0, 15).map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{order.siteName}</TableCell>
                    <TableCell>
                      {order.items.map((item) => item.equipmentName).join(", ").slice(0, 30)}
                      {order.items.map((item) => item.equipmentName).join(", ").length > 30 && "..."}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {order.startDate.slice(5)} 〜 {order.endDate.slice(5)}
                    </TableCell>
                    <TableCell className="text-right">
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

          <div className="mt-4 text-sm text-muted-foreground">
            {filteredOrders.length} 件中 {Math.min(15, filteredOrders.length)} 件を表示
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
