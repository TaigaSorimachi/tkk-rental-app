export type CustomerRank = "S" | "A" | "B" | "C";
export type Industry = "general_contractor" | "subcontractor" | "civil_eng" | "plant" | "government" | "other";

export type Customer = {
  id: string;
  name: string;
  industry: Industry;
  industryName: string;
  rank: CustomerRank;
  annualRevenue: number;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  assignedSales: string;
  lastOrderDate: string;
  activeOrders: number;
  notes: string;
};

export const customers: Customer[] = [
  { id: "C001", name: "大成建設株式会社", industry: "general_contractor", industryName: "ゼネコン", rank: "S", annualRevenue: 128500000, contactPerson: "山田 一郎", phone: "03-3348-1111", email: "yamada@taisei.co.jp", address: "東京都新宿区西新宿1-25-1", assignedSales: "佐藤", lastOrderDate: "2026-03-15", activeOrders: 5, notes: "長期取引先。大型プロジェクト多数。" },
  { id: "C002", name: "鹿島建設株式会社", industry: "general_contractor", industryName: "ゼネコン", rank: "S", annualRevenue: 95200000, contactPerson: "鈴木 次郎", phone: "03-5544-1111", email: "suzuki@kajima.co.jp", address: "東京都港区元赤坂1-3-1", assignedSales: "田中", lastOrderDate: "2026-03-20", activeOrders: 4, notes: "トンネル工事に強み。" },
  { id: "C003", name: "株式会社竹中工務店", industry: "general_contractor", industryName: "ゼネコン", rank: "A", annualRevenue: 62300000, contactPerson: "高橋 三郎", phone: "06-6252-1201", email: "takahashi@takenaka.co.jp", address: "大阪府大阪市中央区本町4-1-13", assignedSales: "佐藤", lastOrderDate: "2026-03-10", activeOrders: 3, notes: "建築工事中心。" },
  { id: "C004", name: "前田建設工業株式会社", industry: "general_contractor", industryName: "ゼネコン", rank: "A", annualRevenue: 45800000, contactPerson: "伊藤 四郎", phone: "03-3265-5551", email: "ito@maeda.co.jp", address: "東京都千代田区富士見2-10-2", assignedSales: "鈴木", lastOrderDate: "2026-02-28", activeOrders: 2, notes: "土木工事実績多数。" },
  { id: "C005", name: "株式会社安藤・間", industry: "general_contractor", industryName: "ゼネコン", rank: "B", annualRevenue: 28100000, contactPerson: "渡辺 五郎", phone: "03-6234-3600", email: "watanabe@ad-hzm.co.jp", address: "東京都港区北青山2-5-8", assignedSales: "田中", lastOrderDate: "2026-03-05", activeOrders: 2, notes: "" },
  { id: "C006", name: "清水建設株式会社", industry: "general_contractor", industryName: "ゼネコン", rank: "A", annualRevenue: 55000000, contactPerson: "佐々木 六郎", phone: "03-3561-1111", email: "sasaki@shimz.co.jp", address: "東京都中央区京橋2-16-1", assignedSales: "佐藤", lastOrderDate: "2026-03-18", activeOrders: 3, notes: "耐震補強案件増加中。" },
  { id: "C007", name: "株式会社大林組", industry: "general_contractor", industryName: "ゼネコン", rank: "A", annualRevenue: 48000000, contactPerson: "加藤 七郎", phone: "03-5769-1111", email: "kato@obayashi.co.jp", address: "東京都港区港南2-15-2", assignedSales: "田中", lastOrderDate: "2026-02-25", activeOrders: 2, notes: "" },
  { id: "C008", name: "西松建設株式会社", industry: "general_contractor", industryName: "ゼネコン", rank: "B", annualRevenue: 22000000, contactPerson: "松本 八郎", phone: "03-3502-0202", email: "matsumoto@nishimatsu.co.jp", address: "東京都港区虎ノ門1-20-10", assignedSales: "鈴木", lastOrderDate: "2026-02-20", activeOrders: 1, notes: "" },
  { id: "C009", name: "株式会社熊谷組", industry: "general_contractor", industryName: "ゼネコン", rank: "B", annualRevenue: 18500000, contactPerson: "井上 九郎", phone: "03-3235-8600", email: "inoue@kumagaigumi.co.jp", address: "東京都新宿区津久戸町2-1", assignedSales: "佐藤", lastOrderDate: "2026-03-01", activeOrders: 1, notes: "トンネル工事に注力。" },
  { id: "C010", name: "戸田建設株式会社", industry: "general_contractor", industryName: "ゼネコン", rank: "B", annualRevenue: 15000000, contactPerson: "小林 十郎", phone: "03-3535-1361", email: "kobayashi@toda.co.jp", address: "東京都中央区京橋1-7-1", assignedSales: "田中", lastOrderDate: "2026-02-15", activeOrders: 1, notes: "" },
  { id: "C011", name: "株式会社フジタ", industry: "general_contractor", industryName: "ゼネコン", rank: "B", annualRevenue: 12000000, contactPerson: "中村 十一郎", phone: "03-3402-1911", email: "nakamura@fujita.co.jp", address: "東京都渋谷区千駄ヶ谷4-25-2", assignedSales: "鈴木", lastOrderDate: "2026-01-30", activeOrders: 0, notes: "" },
  { id: "C012", name: "三井住友建設株式会社", industry: "general_contractor", industryName: "ゼネコン", rank: "B", annualRevenue: 10500000, contactPerson: "森田 十二郎", phone: "03-4582-3000", email: "morita@smcon.co.jp", address: "東京都中央区佃2-1-6", assignedSales: "佐藤", lastOrderDate: "2026-02-10", activeOrders: 1, notes: "" },
  { id: "C013", name: "東急建設株式会社", industry: "general_contractor", industryName: "ゼネコン", rank: "C", annualRevenue: 8000000, contactPerson: "岡田 十三郎", phone: "03-5466-5010", email: "okada@tokyu-cnst.co.jp", address: "東京都渋谷区渋谷1-16-14", assignedSales: "田中", lastOrderDate: "2026-01-25", activeOrders: 0, notes: "" },
  { id: "C014", name: "株式会社錢高組", industry: "general_contractor", industryName: "ゼネコン", rank: "C", annualRevenue: 6500000, contactPerson: "藤井 十四郎", phone: "06-6531-2111", email: "fujii@zenitaka.co.jp", address: "大阪府大阪市西区西本町2-2-4", assignedSales: "鈴木", lastOrderDate: "2026-01-20", activeOrders: 0, notes: "" },
  { id: "C015", name: "飛島建設株式会社", industry: "general_contractor", industryName: "ゼネコン", rank: "C", annualRevenue: 5000000, contactPerson: "山口 十五郎", phone: "03-6455-8300", email: "yamaguchi@tobishima.co.jp", address: "東京都港区港南1-8-15", assignedSales: "佐藤", lastOrderDate: "2026-01-15", activeOrders: 0, notes: "" },
  { id: "C016", name: "佐藤工業株式会社", industry: "subcontractor", industryName: "専門工事", rank: "B", annualRevenue: 9000000, contactPerson: "木村 十六郎", phone: "03-5425-7500", email: "kimura@satokogyo.co.jp", address: "東京都中央区日本橋本町4-12-20", assignedSales: "田中", lastOrderDate: "2026-02-28", activeOrders: 1, notes: "基礎工事専門。" },
  { id: "C017", name: "株式会社不動テトラ", industry: "civil_eng", industryName: "土木", rank: "A", annualRevenue: 35000000, contactPerson: "林 十七郎", phone: "03-5644-8500", email: "hayashi@fudotetra.co.jp", address: "東京都中央区日本橋小網町7-2", assignedSales: "鈴木", lastOrderDate: "2026-03-12", activeOrders: 2, notes: "地盤改良工事に強み。" },
  { id: "C018", name: "ライト工業株式会社", industry: "civil_eng", industryName: "土木", rank: "B", annualRevenue: 16000000, contactPerson: "清水 十八郎", phone: "03-3265-0331", email: "shimizu@raito.co.jp", address: "東京都千代田区九段北4-2-35", assignedSales: "佐藤", lastOrderDate: "2026-02-22", activeOrders: 1, notes: "法面工事中心。" },
  { id: "C019", name: "東京都建設局", industry: "government", industryName: "官公庁", rank: "A", annualRevenue: 42000000, contactPerson: "田辺 十九郎", phone: "03-5320-5203", email: "tanabe@kensetsu.metro.tokyo.jp", address: "東京都新宿区西新宿2-8-1", assignedSales: "田中", lastOrderDate: "2026-03-08", activeOrders: 3, notes: "公共工事案件。" },
  { id: "C020", name: "首都高速道路株式会社", industry: "government", industryName: "官公庁", rank: "A", annualRevenue: 38000000, contactPerson: "石井 二十郎", phone: "03-3539-9275", email: "ishii@shutoko.jp", address: "東京都千代田区霞が関1-4-1", assignedSales: "鈴木", lastOrderDate: "2026-03-15", activeOrders: 2, notes: "道路維持管理。" },
];
