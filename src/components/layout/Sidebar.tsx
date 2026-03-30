"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  Truck,
  Users,
  TrendingUp,
  Settings,
  ChevronDown,
  ChevronRight,
  PanelLeftClose,
  PanelLeft,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent } from "@/components/ui/sheet";

type NavItem = {
  label: string;
  href?: string;
  icon: React.ReactNode;
  children?: { label: string; href: string }[];
};

const navItems: NavItem[] = [
  {
    label: "ダッシュボード",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    label: "機材管理",
    icon: <Package className="h-5 w-5" />,
    children: [
      { label: "機材一覧", href: "/equipment" },
      { label: "在庫状況", href: "/equipment/inventory" },
    ],
  },
  {
    label: "受発注",
    icon: <ClipboardList className="h-5 w-5" />,
    children: [
      { label: "注文一覧", href: "/orders" },
      { label: "新規注文", href: "/orders/new" },
      { label: "返却管理", href: "/orders/returns" },
    ],
  },
  {
    label: "物流",
    icon: <Truck className="h-5 w-5" />,
    children: [
      { label: "配送スケジュール", href: "/logistics/schedule" },
      { label: "拠点間融通", href: "/logistics/transfer" },
    ],
  },
  {
    label: "顧客管理",
    icon: <Users className="h-5 w-5" />,
    children: [
      { label: "顧客一覧", href: "/customers" },
    ],
  },
  {
    label: "営業支援",
    icon: <TrendingUp className="h-5 w-5" />,
    children: [
      { label: "見積作成", href: "/quotes/new" },
      { label: "営業パイプライン", href: "/sales/pipeline" },
      { label: "失注分析", href: "/sales/lost-analysis" },
    ],
  },
  {
    label: "設定",
    href: "/settings",
    icon: <Settings className="h-5 w-5" />,
  },
];

interface SidebarProps {
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>(["機材管理", "受発注", "物流", "顧客管理", "営業支援"]);

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const isActive = (href: string) => pathname === href;
  const isParentActive = (children?: { href: string }[]) =>
    children?.some((child) => pathname === child.href);

  const handleLinkClick = () => {
    if (onNavigate) {
      onNavigate();
    }
  };

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-border bg-card transition-all duration-300",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-border px-4">
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center gap-2" onClick={handleLinkClick}>
            <div className="flex h-8 w-8 items-center justify-center rounded bg-[hsl(var(--primary))] text-white font-bold text-sm">
              TKK
            </div>
            <span className="font-semibold text-sm">Rental Platform</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 hidden lg:flex"
        >
          {collapsed ? (
            <PanelLeft className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-4">
        <nav className="space-y-1 px-2">
          {navItems.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = expandedItems.includes(item.label);
            const active = item.href ? isActive(item.href) : isParentActive(item.children);

            return (
              <div key={item.label}>
                {item.href ? (
                  <Link
                    href={item.href}
                    onClick={handleLinkClick}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      active
                        ? "bg-[hsl(var(--primary))] text-white"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {item.icon}
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => toggleExpanded(item.label)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        active
                          ? "text-[hsl(var(--primary))]"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {item.icon}
                      {!collapsed && (
                        <>
                          <span className="flex-1 text-left">{item.label}</span>
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </>
                      )}
                    </button>
                    {!collapsed && isExpanded && hasChildren && (
                      <div className="ml-8 mt-1 space-y-1">
                        {item.children!.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={handleLinkClick}
                            className={cn(
                              "block rounded-lg px-3 py-2 text-sm transition-colors",
                              isActive(child.href)
                                ? "bg-[hsl(var(--primary))] text-white"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </nav>
      </ScrollArea>
    </aside>
  );
}

export function Sidebar({ isMobile, isOpen, onClose }: SidebarProps) {
  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="w-60 p-0">
          <SidebarContent onNavigate={onClose} />
        </SheetContent>
      </Sheet>
    );
  }

  return <SidebarContent />;
}
