// KPIデータ
export const kpiData = {
  monthlyRevenue: {
    value: 48500000,
    previousValue: 46100000,
    change: 5.2,
    trend: "up" as const,
  },
  utilizationRate: {
    value: 78.3,
    previousValue: 80.0,
    change: -2.1,
    trend: "down" as const,
  },
  activeRentals: {
    value: 234,
    previousValue: 216,
    change: 18,
    trend: "up" as const,
  },
  newCustomers: {
    value: 12,
    previousValue: 9,
    change: 3,
    trend: "up" as const,
  },
};

// 月別売上推移（12ヶ月）
export const monthlyRevenueData = [
  { month: "2025/04", rental: 42000000, sales: 5000000, total: 47000000 },
  { month: "2025/05", rental: 44000000, sales: 4500000, total: 48500000 },
  { month: "2025/06", rental: 46000000, sales: 5500000, total: 51500000 },
  { month: "2025/07", rental: 48000000, sales: 6000000, total: 54000000 },
  { month: "2025/08", rental: 45000000, sales: 4000000, total: 49000000 },
  { month: "2025/09", rental: 43000000, sales: 5000000, total: 48000000 },
  { month: "2025/10", rental: 47000000, sales: 5500000, total: 52500000 },
  { month: "2025/11", rental: 49000000, sales: 6000000, total: 55000000 },
  { month: "2025/12", rental: 44000000, sales: 4000000, total: 48000000 },
  { month: "2026/01", rental: 41000000, sales: 3500000, total: 44500000 },
  { month: "2026/02", rental: 43000000, sales: 4500000, total: 47500000 },
  { month: "2026/03", rental: 45000000, sales: 3500000, total: 48500000 },
];

// 機材カテゴリ別稼働率
export const categoryUtilizationData = [
  { category: "タンク・水処理", rate: 85, status: "high" as const },
  { category: "圧気関連", rate: 72, status: "medium" as const },
  { category: "基礎工事", rate: 88, status: "high" as const },
  { category: "地盤改良", rate: 65, status: "medium" as const },
  { category: "トンネル・搬送", rate: 92, status: "high" as const },
  { category: "耐震補強", rate: 58, status: "low" as const },
  { category: "環境・プラント", rate: 70, status: "medium" as const },
  { category: "汎用機材", rate: 45, status: "low" as const },
];

// 拠点別売上ランキング
export const locationRevenueData = [
  { location: "本社（東京）", revenue: 22000000, percentage: 45.4 },
  { location: "千葉機材センター", revenue: 9500000, percentage: 19.6 },
  { location: "名古屋機材センター", revenue: 7500000, percentage: 15.5 },
  { location: "大阪機材センター", revenue: 6500000, percentage: 13.4 },
  { location: "北海道機材センター", revenue: 3000000, percentage: 6.2 },
];

// アラート一覧
export type AlertSeverity = "high" | "medium" | "low";

export type Alert = {
  id: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  timestamp: string;
  category: "inventory" | "return" | "maintenance" | "order";
};

export const alerts: Alert[] = [
  {
    id: "ALT-001",
    title: "在庫不足警告",
    description: "千葉機材センター: 水槽タンク50m³ 残2台",
    severity: "high",
    timestamp: "2026-03-30T09:00:00",
    category: "inventory",
  },
  {
    id: "ALT-002",
    title: "返却遅延",
    description: "大成建設: ハンマーグラブ 3日超過",
    severity: "high",
    timestamp: "2026-03-30T08:30:00",
    category: "return",
  },
  {
    id: "ALT-003",
    title: "点検期限接近",
    description: "OFコンプレッサー C-001 点検期限まで5日",
    severity: "medium",
    timestamp: "2026-03-30T08:00:00",
    category: "maintenance",
  },
  {
    id: "ALT-004",
    title: "稼働率低下",
    description: "北海道機材センター: 稼働率が20%を下回っています",
    severity: "medium",
    timestamp: "2026-03-29T17:00:00",
    category: "inventory",
  },
  {
    id: "ALT-005",
    title: "大型案件受注",
    description: "鹿島建設より¥35M規模の案件を受注",
    severity: "low",
    timestamp: "2026-03-29T15:00:00",
    category: "order",
  },
];

// 在庫マトリクス（拠点×カテゴリ）
export const inventoryMatrix = {
  "loc-01": { tank: { rented: 12, total: 15 }, pneumatic: { rented: 8, total: 10 }, foundation: { rented: 6, total: 8 }, ground: { rented: 4, total: 5 }, tunnel: { rented: 2, total: 3 }, seismic: { rented: 2, total: 3 }, plant: { rented: 2, total: 3 }, general: { rented: 4, total: 6 } },
  "loc-02": { tank: { rented: 5, total: 8 }, pneumatic: { rented: 3, total: 5 }, foundation: { rented: 4, total: 6 }, ground: { rented: 2, total: 3 }, tunnel: { rented: 1, total: 2 }, seismic: { rented: 1, total: 2 }, plant: { rented: 1, total: 2 }, general: { rented: 2, total: 4 } },
  "loc-03": { tank: { rented: 3, total: 6 }, pneumatic: { rented: 4, total: 4 }, foundation: { rented: 2, total: 4 }, ground: { rented: 1, total: 2 }, tunnel: { rented: 1, total: 2 }, seismic: { rented: 1, total: 2 }, plant: { rented: 0, total: 1 }, general: { rented: 2, total: 3 } },
  "loc-04": { tank: { rented: 4, total: 5 }, pneumatic: { rented: 2, total: 3 }, foundation: { rented: 3, total: 5 }, ground: { rented: 2, total: 3 }, tunnel: { rented: 0, total: 1 }, seismic: { rented: 0, total: 1 }, plant: { rented: 1, total: 2 }, general: { rented: 1, total: 2 } },
  "loc-05": { tank: { rented: 2, total: 4 }, pneumatic: { rented: 1, total: 2 }, foundation: { rented: 1, total: 3 }, ground: { rented: 1, total: 1 }, tunnel: { rented: 1, total: 2 }, seismic: { rented: 0, total: 1 }, plant: { rented: 0, total: 1 }, general: { rented: 1, total: 2 } },
};

// 融通提案データ
export type TransferSuggestion = {
  id: string;
  fromLocationId: string;
  fromLocationName: string;
  toLocationId: string;
  toLocationName: string;
  equipmentCategory: string;
  equipmentName: string;
  quantity: number;
  reason: string;
  estimatedCost: number;
  urgency: "high" | "medium" | "low";
};

export const transferSuggestions: TransferSuggestion[] = [
  {
    id: "TRF-001",
    fromLocationId: "loc-01",
    fromLocationName: "本社（東京）",
    toLocationId: "loc-02",
    toLocationName: "千葉機材センター",
    equipmentCategory: "tank",
    equipmentName: "水槽タンク 50m³",
    quantity: 2,
    reason: "千葉で在庫残2台。本社に余剰3台あり。",
    estimatedCost: 45000,
    urgency: "high",
  },
  {
    id: "TRF-002",
    fromLocationId: "loc-05",
    fromLocationName: "北海道機材センター",
    toLocationId: "loc-04",
    toLocationName: "大阪機材センター",
    equipmentCategory: "pneumatic",
    equipmentName: "オイルフリーコンプレッサー 37kW",
    quantity: 1,
    reason: "大阪で需要増（来月+4台見込み）。北海道は稼働率20%。",
    estimatedCost: 120000,
    urgency: "medium",
  },
  {
    id: "TRF-003",
    fromLocationId: "loc-03",
    fromLocationName: "名古屋機材センター",
    toLocationId: "loc-01",
    toLocationName: "本社（東京）",
    equipmentCategory: "foundation",
    equipmentName: "パワージャッキ 200t",
    quantity: 1,
    reason: "東京で大型案件確定。名古屋に予備機あり。",
    estimatedCost: 80000,
    urgency: "low",
  },
];
