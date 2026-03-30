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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>顧客一覧</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="mb-6 flex flex-wrap gap-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="顧客名で検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={industryFilter} onValueChange={setIndustryFilter}>
              <SelectTrigger className="w-[150px]">
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
              <SelectTrigger className="w-[120px]">
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
              <SelectTrigger className="w-[120px]">
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

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>顧客名</TableHead>
                  <TableHead>業種</TableHead>
                  <TableHead>ランク</TableHead>
                  <TableHead className="text-right">年間取引額</TableHead>
                  <TableHead>担当</TableHead>
                  <TableHead>稼働案件</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="table-zebra">
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <Link
                        href={`/customers/${customer.id}`}
                        className="font-medium text-[hsl(var(--primary))] hover:underline"
                      >
                        {customer.name}
                      </Link>
                    </TableCell>
                    <TableCell>{customer.industryName}</TableCell>
                    <TableCell>
                      <RankBadge rank={customer.rank} />
                    </TableCell>
                    <TableCell className="text-right">
                      ¥{(customer.annualRevenue / 1000000).toFixed(1)}M
                    </TableCell>
                    <TableCell>{customer.assignedSales}</TableCell>
                    <TableCell>{customer.activeOrders}件</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            {filteredCustomers.length} 件を表示
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
