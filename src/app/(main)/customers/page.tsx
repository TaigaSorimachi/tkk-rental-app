"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RankBadge } from "@/components/ui/RankBadge";
import { customers } from "@/data/customers";

const industries = [
  { id: "general_contractor", name: "ゼネコン" },
  { id: "subcontractor", name: "専門工事" },
  { id: "civil_eng", name: "土木" },
  { id: "plant", name: "プラント" },
  { id: "government", name: "官公庁" },
  { id: "other", name: "その他" },
];

const salesReps = ["佐藤", "田中", "鈴木"];

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [rankFilter, setRankFilter] = useState("all");
  const [salesFilter, setSalesFilter] = useState("all");

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = industryFilter === "all" || customer.industry === industryFilter;
    const matchesRank = rankFilter === "all" || customer.rank === rankFilter;
    const matchesSales = salesFilter === "all" || customer.assignedSales === salesFilter;
    return matchesSearch && matchesIndustry && matchesRank && matchesSales;
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-lg sm:text-xl">顧客一覧</CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-6">
          {/* Filters */}
          <div className="mb-4 sm:mb-6 space-y-3 sm:space-y-0 sm:flex sm:flex-wrap sm:gap-4">
            <div className="relative flex-1 min-w-0 sm:min-w-[200px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="顧客名で検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-sm"
              />
            </div>
            <div className="grid grid-cols-3 gap-2 sm:flex sm:gap-4">
              <Select value={industryFilter} onValueChange={setIndustryFilter}>
                <SelectTrigger className="w-full sm:w-[130px] text-xs sm:text-sm">
                  <SelectValue placeholder="業種" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全業種</SelectItem>
                  {industries.map((ind) => (
                    <SelectItem key={ind.id} value={ind.id}>
                      {ind.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={rankFilter} onValueChange={setRankFilter}>
                <SelectTrigger className="w-full sm:w-[110px] text-xs sm:text-sm">
                  <SelectValue placeholder="ランク" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全ランク</SelectItem>
                  <SelectItem value="S">Sランク</SelectItem>
                  <SelectItem value="A">Aランク</SelectItem>
                  <SelectItem value="B">Bランク</SelectItem>
                  <SelectItem value="C">Cランク</SelectItem>
                </SelectContent>
              </Select>
              <Select value={salesFilter} onValueChange={setSalesFilter}>
                <SelectTrigger className="w-full sm:w-[110px] text-xs sm:text-sm">
                  <SelectValue placeholder="担当" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全担当</SelectItem>
                  {salesReps.map((rep) => (
                    <SelectItem key={rep} value={rep}>
                      {rep}
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
                  <TableHead className="text-xs sm:text-sm">顧客名</TableHead>
                  <TableHead className="text-xs sm:text-sm hidden sm:table-cell">業種</TableHead>
                  <TableHead className="text-xs sm:text-sm">ランク</TableHead>
                  <TableHead className="text-right text-xs sm:text-sm">年間取引額</TableHead>
                  <TableHead className="text-xs sm:text-sm">担当</TableHead>
                  <TableHead className="text-xs sm:text-sm">稼働</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="table-zebra">
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="text-xs sm:text-sm">
                      <Link
                        href={`/customers/${customer.id}`}
                        className="font-medium text-[hsl(var(--primary))] hover:underline"
                      >
                        {customer.name}
                      </Link>
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm hidden sm:table-cell">{customer.industryName}</TableCell>
                    <TableCell>
                      <RankBadge rank={customer.rank} />
                    </TableCell>
                    <TableCell className="text-right text-xs sm:text-sm whitespace-nowrap">
                      ¥{(customer.annualRevenue / 1000000).toFixed(1)}M
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm">{customer.assignedSales}</TableCell>
                    <TableCell className="text-xs sm:text-sm">{customer.activeOrders}件</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="text-xs text-muted-foreground mt-3 sm:hidden">← 横スクロールで全列を表示</p>

          <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-muted-foreground">
            {filteredCustomers.length} 件を表示
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
