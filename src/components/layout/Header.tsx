"use client";

import { usePathname } from "next/navigation";
import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const pathLabels: Record<string, string> = {
  "/dashboard": "ダッシュボード",
  "/equipment": "機材一覧",
  "/equipment/inventory": "在庫状況",
  "/orders": "注文一覧",
  "/orders/new": "新規注文",
  "/orders/returns": "返却管理",
  "/logistics/schedule": "配送スケジュール",
  "/logistics/transfer": "拠点間融通",
  "/customers": "顧客一覧",
  "/quotes/new": "見積作成",
  "/sales/pipeline": "営業パイプライン",
  "/sales/lost-analysis": "失注分析",
  "/settings": "設定",
};

export function Header() {
  const pathname = usePathname();
  const pageTitle = pathLabels[pathname] || "TKK Rental Platform";

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
      {/* Page Title */}
      <div>
        <h1 className="text-xl font-semibold text-foreground">{pageTitle}</h1>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="検索..."
            className="w-64 pl-10"
          />
        </div>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center bg-[hsl(var(--secondary))]">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>通知</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
              <span className="font-medium">返却遅延アラート</span>
              <span className="text-sm text-muted-foreground">
                大成建設: ハンマーグラブ 3日超過
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
              <span className="font-medium">在庫不足警告</span>
              <span className="text-sm text-muted-foreground">
                千葉機材センター: 水槽タンク 残2台
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
              <span className="font-medium">新規注文</span>
              <span className="text-sm text-muted-foreground">
                鹿島建設より新規注文が入りました
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-[hsl(var(--primary))] text-white text-sm">
                  田
                </AvatarFallback>
              </Avatar>
              <span className="hidden md:inline text-sm font-medium">田中 太郎</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>アカウント</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              プロフィール
            </DropdownMenuItem>
            <DropdownMenuItem>設定</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">ログアウト</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
