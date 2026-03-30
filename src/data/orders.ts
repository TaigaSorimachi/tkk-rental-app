export type OrderStatus = "pending" | "confirmed" | "delivering" | "active" | "returning" | "completed";

export type OrderItem = {
  equipmentId: string;
  equipmentName: string;
  quantity: number;
  dailyRate: number;
  subtotal: number;
};

export type Order = {
  id: string;
  customerId: string;
  customerName: string;
  siteName: string;
  siteAddress: string;
  items: OrderItem[];
  status: OrderStatus;
  orderDate: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  notes: string;
};

export const orders: Order[] = [
  {
    id: "ORD-2401",
    customerId: "C001",
    customerName: "大成建設株式会社",
    siteName: "渋谷再開発プロジェクト",
    siteAddress: "東京都渋谷区渋谷2丁目",
    items: [
      { equipmentId: "T-001", equipmentName: "水槽タンク 50m³（鋼製）", quantity: 2, dailyRate: 8000, subtotal: 1936000 },
      { equipmentId: "C-002", equipmentName: "オイルフリーコンプレッサー 55kW", quantity: 1, dailyRate: 20000, subtotal: 2420000 },
    ],
    status: "active",
    orderDate: "2026-02-15",
    startDate: "2026-03-01",
    endDate: "2026-06-30",
    totalAmount: 4356000,
    notes: "長期レンタル案件。月次点検必要。",
  },
  {
    id: "ORD-2402",
    customerId: "C002",
    customerName: "鹿島建設株式会社",
    siteName: "品川駅前開発",
    siteAddress: "東京都港区港南2丁目",
    items: [
      { equipmentId: "C-003", equipmentName: "オイルフリーコンプレッサー 75kW", quantity: 1, dailyRate: 25000, subtotal: 4575000 },
    ],
    status: "delivering",
    orderDate: "2026-03-10",
    startDate: "2026-03-15",
    endDate: "2026-09-15",
    totalAmount: 4575000,
    notes: "",
  },
  {
    id: "ORD-2403",
    customerId: "C006",
    customerName: "清水建設株式会社",
    siteName: "新宿駅西口地下工事",
    siteAddress: "東京都新宿区西新宿1丁目",
    items: [
      { equipmentId: "P-001", equipmentName: "パワージャッキ 200t", quantity: 3, dailyRate: 12000, subtotal: 4392000 },
      { equipmentId: "P-003", equipmentName: "パワージャッキ 500t", quantity: 1, dailyRate: 20000, subtotal: 2440000 },
    ],
    status: "confirmed",
    orderDate: "2026-03-20",
    startDate: "2026-04-01",
    endDate: "2026-07-31",
    totalAmount: 6832000,
    notes: "耐震補強工事用",
  },
  {
    id: "ORD-2404",
    customerId: "C003",
    customerName: "株式会社竹中工務店",
    siteName: "大阪梅田タワー",
    siteAddress: "大阪府大阪市北区梅田3丁目",
    items: [
      { equipmentId: "H-001", equipmentName: "ハンマーグラブ 1.5t", quantity: 1, dailyRate: 18000, subtotal: 1620000 },
      { equipmentId: "SC-002", equipmentName: "スライムクリーナー", quantity: 1, dailyRate: 28000, subtotal: 2520000 },
    ],
    status: "active",
    orderDate: "2026-02-01",
    startDate: "2026-02-10",
    endDate: "2026-05-10",
    totalAmount: 4140000,
    notes: "",
  },
  {
    id: "ORD-2405",
    customerId: "C004",
    customerName: "前田建設工業株式会社",
    siteName: "横浜みなとみらい21",
    siteAddress: "神奈川県横浜市西区みなとみらい",
    items: [
      { equipmentId: "M-002", equipmentName: "ミキシングプラント TMP-300", quantity: 1, dailyRate: 50000, subtotal: 7650000 },
    ],
    status: "active",
    orderDate: "2026-01-20",
    startDate: "2026-02-01",
    endDate: "2026-07-31",
    totalAmount: 7650000,
    notes: "地盤改良工事",
  },
  {
    id: "ORD-2406",
    customerId: "C007",
    customerName: "株式会社大林組",
    siteName: "名古屋駅リニア工事",
    siteAddress: "愛知県名古屋市中村区名駅",
    items: [
      { equipmentId: "TN-002", equipmentName: "連続ベルトコンベヤ 100m", quantity: 1, dailyRate: 30000, subtotal: 5490000 },
      { equipmentId: "H-003", equipmentName: "ハンマーグラブ 2.5t", quantity: 1, dailyRate: 25000, subtotal: 4575000 },
    ],
    status: "active",
    orderDate: "2026-01-15",
    startDate: "2026-02-01",
    endDate: "2026-08-31",
    totalAmount: 10065000,
    notes: "大規模トンネル工事",
  },
  {
    id: "ORD-2407",
    customerId: "C019",
    customerName: "東京都建設局",
    siteName: "環状2号線整備",
    siteAddress: "東京都港区虎ノ門",
    items: [
      { equipmentId: "T-009", equipmentName: "フィルタープレス 50枚", quantity: 1, dailyRate: 18000, subtotal: 2754000 },
    ],
    status: "active",
    orderDate: "2026-02-05",
    startDate: "2026-02-15",
    endDate: "2026-07-31",
    totalAmount: 2754000,
    notes: "公共工事",
  },
  {
    id: "ORD-2408",
    customerId: "C017",
    customerName: "株式会社不動テトラ",
    siteName: "千葉港湾整備",
    siteAddress: "千葉県千葉市中央区千葉港",
    items: [
      { equipmentId: "M-005", equipmentName: "ミキシングプラント TMP-150", quantity: 1, dailyRate: 35000, subtotal: 4270000 },
    ],
    status: "active",
    orderDate: "2026-02-10",
    startDate: "2026-02-20",
    endDate: "2026-06-30",
    totalAmount: 4270000,
    notes: "",
  },
  {
    id: "ORD-2409",
    customerId: "C005",
    customerName: "株式会社安藤・間",
    siteName: "福岡空港拡張",
    siteAddress: "福岡県福岡市博多区",
    items: [
      { equipmentId: "PL-002", equipmentName: "発電機 300kVA", quantity: 1, dailyRate: 25000, subtotal: 3050000 },
    ],
    status: "active",
    orderDate: "2026-02-01",
    startDate: "2026-02-15",
    endDate: "2026-06-15",
    totalAmount: 3050000,
    notes: "",
  },
  {
    id: "ORD-2410",
    customerId: "C009",
    customerName: "株式会社熊谷組",
    siteName: "北海道新幹線延伸",
    siteAddress: "北海道札幌市",
    items: [
      { equipmentId: "TN-004", equipmentName: "モグラック（仮設エレベーター）", quantity: 1, dailyRate: 50000, subtotal: 4550000 },
    ],
    status: "active",
    orderDate: "2026-01-25",
    startDate: "2026-02-01",
    endDate: "2026-05-01",
    totalAmount: 4550000,
    notes: "トンネル工事用",
  },
  {
    id: "ORD-2411",
    customerId: "C020",
    customerName: "首都高速道路株式会社",
    siteName: "首都高大規模更新",
    siteAddress: "東京都品川区",
    items: [
      { equipmentId: "SE-003", equipmentName: "油圧ポンプユニット", quantity: 2, dailyRate: 12000, subtotal: 1464000 },
    ],
    status: "active",
    orderDate: "2026-02-20",
    startDate: "2026-03-01",
    endDate: "2026-05-01",
    totalAmount: 1464000,
    notes: "橋梁補修工事",
  },
  {
    id: "ORD-2412",
    customerId: "C016",
    customerName: "佐藤工業株式会社",
    siteName: "東京駅八重洲開発",
    siteAddress: "東京都中央区八重洲",
    items: [
      { equipmentId: "P-002", equipmentName: "パワージャッキ 300t", quantity: 2, dailyRate: 15000, subtotal: 2430000 },
    ],
    status: "active",
    orderDate: "2026-02-15",
    startDate: "2026-02-25",
    endDate: "2026-05-25",
    totalAmount: 2430000,
    notes: "基礎工事",
  },
  {
    id: "ORD-2413",
    customerId: "C001",
    customerName: "大成建設株式会社",
    siteName: "横浜駅西口",
    siteAddress: "神奈川県横浜市西区",
    items: [
      { equipmentId: "T-005", equipmentName: "円形組立タンク 40m³", quantity: 1, dailyRate: 7500, subtotal: 682500 },
    ],
    status: "active",
    orderDate: "2026-02-28",
    startDate: "2026-03-10",
    endDate: "2026-06-10",
    totalAmount: 682500,
    notes: "",
  },
  {
    id: "ORD-2414",
    customerId: "C010",
    customerName: "戸田建設株式会社",
    siteName: "神戸港整備",
    siteAddress: "兵庫県神戸市中央区",
    items: [
      { equipmentId: "G-004", equipmentName: "タイヤ洗浄機", quantity: 1, dailyRate: 8000, subtotal: 408000 },
    ],
    status: "active",
    orderDate: "2026-03-01",
    startDate: "2026-03-15",
    endDate: "2026-05-01",
    totalAmount: 408000,
    notes: "",
  },
  {
    id: "ORD-2415",
    customerId: "C002",
    customerName: "鹿島建設株式会社",
    siteName: "羽田空港拡張",
    siteAddress: "東京都大田区羽田空港",
    items: [
      { equipmentId: "T-002", equipmentName: "水槽タンク 100m³（鋼製）", quantity: 1, dailyRate: 12000, subtotal: 1464000 },
    ],
    status: "active",
    orderDate: "2026-02-20",
    startDate: "2026-03-01",
    endDate: "2026-07-01",
    totalAmount: 1464000,
    notes: "",
  },
  // 返却予定が近い案件
  {
    id: "ORD-2380",
    customerId: "C001",
    customerName: "大成建設株式会社",
    siteName: "品川開発",
    siteAddress: "東京都港区港南",
    items: [
      { equipmentId: "H-002", equipmentName: "ハンマーグラブ 2.0t", quantity: 1, dailyRate: 22000, subtotal: 1320000 },
    ],
    status: "returning",
    orderDate: "2026-01-05",
    startDate: "2026-01-15",
    endDate: "2026-04-02",
    totalAmount: 1320000,
    notes: "返却予定日近い",
  },
  {
    id: "ORD-2381",
    customerId: "C003",
    customerName: "株式会社竹中工務店",
    siteName: "名古屋栄地区",
    siteAddress: "愛知県名古屋市中区栄",
    items: [
      { equipmentId: "C-001", equipmentName: "オイルフリーコンプレッサー 37kW", quantity: 1, dailyRate: 15000, subtotal: 900000 },
    ],
    status: "returning",
    orderDate: "2026-01-10",
    startDate: "2026-01-20",
    endDate: "2026-04-05",
    totalAmount: 900000,
    notes: "",
  },
  // 完了済み
  {
    id: "ORD-2355",
    customerId: "C001",
    customerName: "大成建設株式会社",
    siteName: "新宿駅前",
    siteAddress: "東京都新宿区西新宿",
    items: [
      { equipmentId: "P-001", equipmentName: "パワージャッキ 200t", quantity: 3, dailyRate: 12000, subtotal: 2160000 },
    ],
    status: "completed",
    orderDate: "2025-10-01",
    startDate: "2025-10-15",
    endDate: "2026-02-15",
    totalAmount: 2160000,
    notes: "",
  },
  {
    id: "ORD-2350",
    customerId: "C006",
    customerName: "清水建設株式会社",
    siteName: "大阪駅前",
    siteAddress: "大阪府大阪市北区梅田",
    items: [
      { equipmentId: "M-001", equipmentName: "ミキシングプラント TMP-200", quantity: 1, dailyRate: 40000, subtotal: 4800000 },
    ],
    status: "completed",
    orderDate: "2025-09-15",
    startDate: "2025-10-01",
    endDate: "2026-02-01",
    totalAmount: 4800000,
    notes: "",
  },
];

// 返却遅延中の注文（デモ用）
export const overdueOrders = orders.filter(
  (order) => order.status === "active" && new Date(order.endDate) < new Date()
);
