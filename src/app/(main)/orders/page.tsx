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
    <div className="space-y-4 sm:space-y-6">
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-lg sm:text-xl">注文一覧</CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-6">
          {/* Tabs */}
          <div className="mb-4 sm:mb-6 overflow-x-auto -mx-3 px-3 sm:mx-0 sm:px-0">
            <Tabs value={statusFilter} onValueChange={setStatusFilter}>
              <TabsList className="w-max sm:w-auto">
                <TabsTrigger value="all" className="text-xs sm:text-sm px-2 sm:px-3">全て ({statusCounts.all})</TabsTrigger>
                <TabsTrigger value="pending" className="text-xs sm:text-sm px-2 sm:px-3">受付 ({statusCounts.pending})</TabsTrigger>
                <TabsTrigger value="confirmed" className="text-xs sm:text-sm px-2 sm:px-3">確定 ({statusCounts.confirmed})</TabsTrigger>
                <TabsTrigger value="delivering" className="text-xs sm:text-sm px-2 sm:px-3">配送 ({statusCounts.delivering})</TabsTrigger>
                <TabsTrigger value="active" className="text-xs sm:text-sm px-2 sm:px-3">貸出 ({statusCounts.active})</TabsTrigger>
                <TabsTrigger value="returning" className="text-xs sm:text-sm px-2 sm:px-3 hidden sm:inline-flex">返却 ({statusCounts.returning})</TabsTrigger>
                <TabsTrigger value="completed" className="text-xs sm:text-sm px-2 sm:px-3 hidden sm:inline-flex">完了 ({statusCounts.completed})</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Search */}
          <div className="mb-4 sm:mb-6 relative max-w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="注文番号・顧客名・現場名で検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 text-sm"
            />
          </div>

          {/* Table */}
          <div className="rounded-md border overflow-x-auto -mx-3 sm:mx-0">
            <Table className="min-w-[700px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[90px] sm:w-[120px] text-xs sm:text-sm">注文No</TableHead>
                  <TableHead className="text-xs sm:text-sm">顧客名</TableHead>
                  <TableHead className="text-xs sm:text-sm hidden md:table-cell">現場名</TableHead>
                  <TableHead className="text-xs sm:text-sm hidden lg:table-cell">機材</TableHead>
                  <TableHead className="text-xs sm:text-sm whitespace-nowrap">期間</TableHead>
                  <TableHead className="text-right text-xs sm:text-sm">金額</TableHead>
                  <TableHead className="text-xs sm:text-sm">状態</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="table-zebra">
                {filteredOrders.slice(0, 15).map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium text-xs sm:text-sm">{order.id}</TableCell>
                    <TableCell className="text-xs sm:text-sm">{order.customerName}</TableCell>
                    <TableCell className="max-w-[150px] sm:max-w-[200px] truncate text-xs sm:text-sm hidden md:table-cell">{order.siteName}</TableCell>
                    <TableCell className="text-xs sm:text-sm hidden lg:table-cell">
                      {order.items.map((item) => item.equipmentName).join(", ").slice(0, 30)}
                      {order.items.map((item) => item.equipmentName).join(", ").length > 30 && "..."}
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-xs sm:text-sm">
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

          <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-muted-foreground">
            {filteredOrders.length} 件中 {Math.min(15, filteredOrders.length)} 件を表示
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
