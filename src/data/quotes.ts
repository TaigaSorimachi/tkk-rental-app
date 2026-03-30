export type QuoteStatus = "draft" | "sent" | "accepted" | "rejected" | "expired";

export type QuoteItem = {
  equipmentId: string;
  equipmentName: string;
  dailyRate: number;
  quantity: number;
  days: number;
  subtotal: number;
};

export type Quote = {
  id: string;
  customerId: string;
  customerName: string;
  siteName: string;
  items: QuoteItem[];
  deliveryFee: number;
  totalAmount: number;
  quoteDate: string;
  validUntil: string;
  status: QuoteStatus;
  notes: string;
  createdBy: string;
};

export const quotes: Quote[] = [
  {
    id: "Q-2401",
    customerId: "C001",
    customerName: "大成建設株式会社",
    siteName: "虎ノ門ヒルズ拡張",
    items: [
      { equipmentId: "T-001", equipmentName: "水槽タンク 50m³（鋼製）", dailyRate: 8000, quantity: 2, days: 90, subtotal: 1440000 },
      { equipmentId: "C-002", equipmentName: "オイルフリーコンプレッサー 55kW", dailyRate: 20000, quantity: 1, days: 90, subtotal: 1800000 },
    ],
    deliveryFee: 80000,
    totalAmount: 3320000,
    quoteDate: "2026-03-20",
    validUntil: "2026-04-20",
    status: "accepted",
    notes: "長期レンタル割引適用",
    createdBy: "佐藤",
  },
  {
    id: "Q-2402",
    customerId: "C002",
    customerName: "鹿島建設株式会社",
    siteName: "中央リニア関連工事",
    items: [
      { equipmentId: "TN-001", equipmentName: "モグラック（仮設エレベーター）", dailyRate: 50000, quantity: 2, days: 180, subtotal: 18000000 },
      { equipmentId: "C-003", equipmentName: "オイルフリーコンプレッサー 75kW", dailyRate: 25000, quantity: 3, days: 180, subtotal: 13500000 },
    ],
    deliveryFee: 500000,
    totalAmount: 32000000,
    quoteDate: "2026-03-15",
    validUntil: "2026-04-15",
    status: "accepted",
    notes: "大型案件特別価格",
    createdBy: "田中",
  },
  {
    id: "Q-2403",
    customerId: "C003",
    customerName: "株式会社竹中工務店",
    siteName: "品川駅周辺耐震補強",
    items: [
      { equipmentId: "SE-001", equipmentName: "油圧ジャッキ 100t", dailyRate: 8000, quantity: 5, days: 60, subtotal: 2400000 },
      { equipmentId: "SE-002", equipmentName: "油圧ジャッキ 200t", dailyRate: 10000, quantity: 3, days: 60, subtotal: 1800000 },
      { equipmentId: "SE-003", equipmentName: "油圧ポンプユニット", dailyRate: 12000, quantity: 2, days: 60, subtotal: 1440000 },
    ],
    deliveryFee: 120000,
    totalAmount: 5760000,
    quoteDate: "2026-03-18",
    validUntil: "2026-04-18",
    status: "sent",
    notes: "耐震補強パッケージ",
    createdBy: "佐藤",
  },
  {
    id: "Q-2404",
    customerId: "C019",
    customerName: "東京都建設局",
    siteName: "外環道接続工事",
    items: [
      { equipmentId: "TN-002", equipmentName: "連続ベルトコンベヤ 100m", dailyRate: 30000, quantity: 2, days: 120, subtotal: 7200000 },
      { equipmentId: "M-001", equipmentName: "ミキシングプラント TMP-200", dailyRate: 40000, quantity: 1, days: 120, subtotal: 4800000 },
      { equipmentId: "T-008", equipmentName: "濁水処理装置 100t/h", dailyRate: 25000, quantity: 1, days: 120, subtotal: 3000000 },
    ],
    deliveryFee: 300000,
    totalAmount: 15300000,
    quoteDate: "2026-03-10",
    validUntil: "2026-04-10",
    status: "sent",
    notes: "公共工事入札用",
    createdBy: "田中",
  },
  {
    id: "Q-2405",
    customerId: "C020",
    customerName: "首都高速道路株式会社",
    siteName: "首都高更新2期",
    items: [
      { equipmentId: "P-003", equipmentName: "パワージャッキ 500t", dailyRate: 20000, quantity: 4, days: 150, subtotal: 12000000 },
      { equipmentId: "SE-003", equipmentName: "油圧ポンプユニット", dailyRate: 12000, quantity: 4, days: 150, subtotal: 7200000 },
    ],
    deliveryFee: 200000,
    totalAmount: 19400000,
    quoteDate: "2026-03-12",
    validUntil: "2026-04-12",
    status: "sent",
    notes: "",
    createdBy: "鈴木",
  },
  {
    id: "Q-2406",
    customerId: "C004",
    customerName: "前田建設工業株式会社",
    siteName: "北陸新幹線延伸工事",
    items: [
      { equipmentId: "TN-003", equipmentName: "連続ベルトコンベヤ 50m", dailyRate: 20000, quantity: 3, days: 180, subtotal: 10800000 },
    ],
    deliveryFee: 250000,
    totalAmount: 11050000,
    quoteDate: "2026-03-25",
    validUntil: "2026-04-25",
    status: "draft",
    notes: "見積作成中",
    createdBy: "佐藤",
  },
  {
    id: "Q-2407",
    customerId: "C017",
    customerName: "株式会社不動テトラ",
    siteName: "東京湾岸地盤改良",
    items: [
      { equipmentId: "M-002", equipmentName: "ミキシングプラント TMP-300", dailyRate: 50000, quantity: 2, days: 120, subtotal: 12000000 },
      { equipmentId: "M-004", equipmentName: "サンドコレクター", dailyRate: 45000, quantity: 1, days: 120, subtotal: 5400000 },
    ],
    deliveryFee: 400000,
    totalAmount: 17800000,
    quoteDate: "2026-03-22",
    validUntil: "2026-04-22",
    status: "draft",
    notes: "",
    createdBy: "鈴木",
  },
  {
    id: "Q-2390",
    customerId: "C015",
    customerName: "飛島建設株式会社",
    siteName: "仙台駅前開発",
    items: [
      { equipmentId: "H-002", equipmentName: "ハンマーグラブ 2.0t", dailyRate: 22000, quantity: 2, days: 90, subtotal: 3960000 },
    ],
    deliveryFee: 150000,
    totalAmount: 4110000,
    quoteDate: "2026-02-15",
    validUntil: "2026-03-15",
    status: "rejected",
    notes: "価格競争で敗退",
    createdBy: "鈴木",
  },
  {
    id: "Q-2385",
    customerId: "C011",
    customerName: "株式会社フジタ",
    siteName: "横浜みなとみらい",
    items: [
      { equipmentId: "T-003", equipmentName: "ステンレス製水槽タンク 30m³", dailyRate: 10000, quantity: 1, days: 60, subtotal: 600000 },
    ],
    deliveryFee: 50000,
    totalAmount: 650000,
    quoteDate: "2026-02-01",
    validUntil: "2026-03-01",
    status: "expired",
    notes: "有効期限切れ",
    createdBy: "佐藤",
  },
  {
    id: "Q-2380",
    customerId: "C010",
    customerName: "戸田建設株式会社",
    siteName: "神戸港整備",
    items: [
      { equipmentId: "G-004", equipmentName: "タイヤ洗浄機", dailyRate: 8000, quantity: 2, days: 45, subtotal: 720000 },
    ],
    deliveryFee: 60000,
    totalAmount: 780000,
    quoteDate: "2026-02-20",
    validUntil: "2026-03-20",
    status: "accepted",
    notes: "",
    createdBy: "田中",
  },
];
