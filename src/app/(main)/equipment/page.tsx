"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { equipment } from "@/data/equipment";
import { categories, locations } from "@/data/locations";

export default function EquipmentPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  const filteredEquipment = equipment.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const matchesLocation = locationFilter === "all" || item.locationId === locationFilter;
    return matchesSearch && matchesCategory && matchesStatus && matchesLocation;
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-lg sm:text-xl">機材一覧</CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-6">
          {/* Filters */}
          <div className="mb-4 sm:mb-6 space-y-3 sm:space-y-0 sm:flex sm:flex-wrap sm:gap-4">
            <div className="relative flex-1 min-w-0 sm:min-w-[200px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="機材ID・名称で検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-sm"
              />
            </div>
            <div className="grid grid-cols-3 gap-2 sm:flex sm:gap-4">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[160px] text-xs sm:text-sm">
                  <SelectValue placeholder="カテゴリ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全カテゴリ</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[130px] text-xs sm:text-sm">
                  <SelectValue placeholder="状態" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全ステータス</SelectItem>
                  <SelectItem value="available">貸出可</SelectItem>
                  <SelectItem value="rented">貸出中</SelectItem>
                  <SelectItem value="maintenance">整備中</SelectItem>
                </SelectContent>
              </Select>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-full sm:w-[160px] text-xs sm:text-sm">
                  <SelectValue placeholder="拠点" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全拠点</SelectItem>
                  {locations.map((loc) => (
                    <SelectItem key={loc.id} value={loc.id}>
                      {loc.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-md border overflow-x-auto -mx-3 sm:mx-0">
            <Table className="min-w-[600px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px] sm:w-[100px] text-xs sm:text-sm">ID</TableHead>
                  <TableHead className="text-xs sm:text-sm">機材名</TableHead>
                  <TableHead className="text-xs sm:text-sm hidden sm:table-cell">カテゴリ</TableHead>
                  <TableHead className="text-xs sm:text-sm">拠点</TableHead>
                  <TableHead className="text-xs sm:text-sm">日額</TableHead>
                  <TableHead className="text-xs sm:text-sm">状態</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="table-zebra">
                {filteredEquipment.slice(0, 20).map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium text-xs sm:text-sm">{item.id}</TableCell>
                    <TableCell className="text-xs sm:text-sm">{item.name}</TableCell>
                    <TableCell className="text-xs sm:text-sm hidden sm:table-cell">{item.categoryName}</TableCell>
                    <TableCell className="text-xs sm:text-sm whitespace-nowrap">{item.locationName}</TableCell>
                    <TableCell className="text-xs sm:text-sm whitespace-nowrap">¥{item.dailyRate.toLocaleString()}</TableCell>
                    <TableCell>
                      <StatusBadge status={item.status} type="equipment" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="text-xs text-muted-foreground mt-3 sm:hidden">← 横スクロールで全列を表示</p>

          <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-muted-foreground">
            {filteredEquipment.length} 件中 {Math.min(20, filteredEquipment.length)} 件を表示
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
