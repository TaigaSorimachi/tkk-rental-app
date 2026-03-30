"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { inventoryMatrix } from "@/data/dashboard";
import { locations, categories } from "@/data/locations";

type CategoryKey = "tank" | "pneumatic" | "foundation" | "ground" | "tunnel" | "seismic" | "plant" | "general";

export default function InventoryPage() {
  const categoryKeys: CategoryKey[] = ["tank", "pneumatic", "foundation", "ground", "tunnel", "seismic", "plant", "general"];

  const getCellStyle = (rented: number, total: number) => {
    const availableRate = ((total - rented) / total) * 100;
    if (availableRate <= 20) return "bg-red-100 text-red-800";
    if (availableRate <= 40) return "bg-yellow-100 text-yellow-800";
    return "";
  };

  const getLocationTotal = (locationId: string) => {
    const data = inventoryMatrix[locationId as keyof typeof inventoryMatrix];
    let totalRented = 0;
    let totalAll = 0;
    categoryKeys.forEach((key) => {
      totalRented += data[key].rented;
      totalAll += data[key].total;
    });
    return { rented: totalRented, total: totalAll };
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-lg sm:text-xl">在庫状況マトリクス（拠点×カテゴリ）</CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-6">
          <div className="overflow-x-auto -mx-3 px-3 sm:mx-0 sm:px-0">
            <Table className="min-w-[700px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] sm:w-[180px] text-xs sm:text-sm whitespace-nowrap">拠点</TableHead>
                  {categories.map((cat) => (
                    <TableHead key={cat.id} className="text-center text-xs sm:text-sm whitespace-nowrap">
                      {cat.name.split("・")[0]}
                    </TableHead>
                  ))}
                  <TableHead className="text-center font-bold text-xs sm:text-sm whitespace-nowrap">合計</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {locations.map((loc) => {
                  const locData = inventoryMatrix[loc.id as keyof typeof inventoryMatrix];
                  const total = getLocationTotal(loc.id);

                  return (
                    <TableRow key={loc.id}>
                      <TableCell className="font-medium text-xs sm:text-sm whitespace-nowrap">{loc.name}</TableCell>
                      {categoryKeys.map((key) => {
                        const cellData = locData[key];
                        return (
                          <TableCell
                            key={key}
                            className={cn(
                              "text-center text-xs sm:text-sm",
                              getCellStyle(cellData.rented, cellData.total)
                            )}
                          >
                            {cellData.rented}/{cellData.total}
                          </TableCell>
                        );
                      })}
                      <TableCell className="text-center font-bold text-xs sm:text-sm">
                        {total.rented}/{total.total}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          <p className="text-xs text-muted-foreground mt-3 sm:hidden">← 横スクロールで全カテゴリを表示</p>

          <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 sm:h-4 sm:w-4 rounded bg-red-100 border border-red-200" />
              <span>在庫率20%以下</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 sm:h-4 sm:w-4 rounded bg-yellow-100 border border-yellow-200" />
              <span>在庫率40%以下</span>
            </div>
            <div className="text-muted-foreground">
              ※ 貸出中/保有数 で表示
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
