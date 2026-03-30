export type EquipmentStatus = "available" | "rented" | "maintenance" | "retired";

export type Equipment = {
  id: string;
  name: string;
  category: string;
  categoryName: string;
  locationId: string;
  locationName: string;
  status: EquipmentStatus;
  dailyRate: number;
  nextAvailable: string | null;
  lastInspection: string;
  specs: string;
};

export const equipment: Equipment[] = [
  // タンク・水処理
  { id: "T-001", name: "水槽タンク 50m³（鋼製）", category: "tank", categoryName: "タンク・水処理", locationId: "loc-01", locationName: "本社（東京）", status: "available", dailyRate: 8000, nextAvailable: null, lastInspection: "2026-02-15", specs: "容量50m³、鋼製" },
  { id: "T-002", name: "水槽タンク 100m³（鋼製）", category: "tank", categoryName: "タンク・水処理", locationId: "loc-02", locationName: "千葉機材センター", status: "rented", dailyRate: 12000, nextAvailable: "2026-06-30", lastInspection: "2026-01-20", specs: "容量100m³、鋼製" },
  { id: "T-003", name: "ステンレス製水槽タンク 30m³", category: "tank", categoryName: "タンク・水処理", locationId: "loc-01", locationName: "本社（東京）", status: "available", dailyRate: 10000, nextAvailable: null, lastInspection: "2026-03-01", specs: "容量30m³、SUS304" },
  { id: "T-004", name: "角形組立タンク 20m³", category: "tank", categoryName: "タンク・水処理", locationId: "loc-03", locationName: "名古屋機材センター", status: "available", dailyRate: 6000, nextAvailable: null, lastInspection: "2026-02-28", specs: "容量20m³、組立式" },
  { id: "T-005", name: "円形組立タンク 40m³", category: "tank", categoryName: "タンク・水処理", locationId: "loc-04", locationName: "大阪機材センター", status: "rented", dailyRate: 7500, nextAvailable: "2026-05-15", lastInspection: "2026-02-10", specs: "容量40m³、円形" },
  { id: "T-006", name: "水槽タンク 50m³（鋼製）", category: "tank", categoryName: "タンク・水処理", locationId: "loc-01", locationName: "本社（東京）", status: "available", dailyRate: 8000, nextAvailable: null, lastInspection: "2026-03-10", specs: "容量50m³、鋼製" },
  { id: "T-007", name: "水槽タンク 50m³（鋼製）", category: "tank", categoryName: "タンク・水処理", locationId: "loc-02", locationName: "千葉機材センター", status: "maintenance", dailyRate: 8000, nextAvailable: "2026-04-15", lastInspection: "2026-01-05", specs: "容量50m³、鋼製" },
  { id: "T-008", name: "濁水処理装置 100t/h", category: "tank", categoryName: "タンク・水処理", locationId: "loc-01", locationName: "本社（東京）", status: "available", dailyRate: 25000, nextAvailable: null, lastInspection: "2026-02-20", specs: "処理能力100t/h" },
  { id: "T-009", name: "フィルタープレス 50枚", category: "tank", categoryName: "タンク・水処理", locationId: "loc-03", locationName: "名古屋機材センター", status: "rented", dailyRate: 18000, nextAvailable: "2026-07-31", lastInspection: "2026-01-15", specs: "50枚仕様" },
  { id: "T-010", name: "スクリューデカンタ（遠心分離機）", category: "tank", categoryName: "タンク・水処理", locationId: "loc-04", locationName: "大阪機材センター", status: "available", dailyRate: 30000, nextAvailable: null, lastInspection: "2026-03-05", specs: "処理能力20m³/h" },

  // 圧気関連
  { id: "C-001", name: "オイルフリーコンプレッサー 37kW", category: "pneumatic", categoryName: "圧気関連", locationId: "loc-03", locationName: "名古屋機材センター", status: "maintenance", dailyRate: 15000, nextAvailable: "2026-04-10", lastInspection: "2026-01-10", specs: "37kW、吐出量6.5m³/min" },
  { id: "C-002", name: "オイルフリーコンプレッサー 55kW", category: "pneumatic", categoryName: "圧気関連", locationId: "loc-01", locationName: "本社（東京）", status: "available", dailyRate: 20000, nextAvailable: null, lastInspection: "2026-02-25", specs: "55kW、吐出量10m³/min" },
  { id: "C-003", name: "オイルフリーコンプレッサー 75kW", category: "pneumatic", categoryName: "圧気関連", locationId: "loc-02", locationName: "千葉機材センター", status: "rented", dailyRate: 25000, nextAvailable: "2026-08-15", lastInspection: "2026-02-01", specs: "75kW、吐出量13m³/min" },
  { id: "C-004", name: "レシーバータンク 3m³", category: "pneumatic", categoryName: "圧気関連", locationId: "loc-01", locationName: "本社（東京）", status: "available", dailyRate: 3000, nextAvailable: null, lastInspection: "2026-03-01", specs: "容量3m³" },
  { id: "C-005", name: "レシーバータンク 5m³", category: "pneumatic", categoryName: "圧気関連", locationId: "loc-04", locationName: "大阪機材センター", status: "available", dailyRate: 4000, nextAvailable: null, lastInspection: "2026-02-15", specs: "容量5m³" },
  { id: "C-006", name: "オイルフリーコンプレッサー 37kW", category: "pneumatic", categoryName: "圧気関連", locationId: "loc-05", locationName: "北海道機材センター", status: "available", dailyRate: 15000, nextAvailable: null, lastInspection: "2026-02-20", specs: "37kW、吐出量6.5m³/min" },

  // 基礎工事
  { id: "P-001", name: "パワージャッキ 200t", category: "foundation", categoryName: "基礎工事", locationId: "loc-01", locationName: "本社（東京）", status: "available", dailyRate: 12000, nextAvailable: null, lastInspection: "2026-03-01", specs: "推力200t" },
  { id: "P-002", name: "パワージャッキ 300t", category: "foundation", categoryName: "基礎工事", locationId: "loc-02", locationName: "千葉機材センター", status: "rented", dailyRate: 15000, nextAvailable: "2026-05-20", lastInspection: "2026-01-25", specs: "推力300t" },
  { id: "P-003", name: "パワージャッキ 500t", category: "foundation", categoryName: "基礎工事", locationId: "loc-01", locationName: "本社（東京）", status: "available", dailyRate: 20000, nextAvailable: null, lastInspection: "2026-02-10", specs: "推力500t" },
  { id: "H-001", name: "ハンマーグラブ 1.5t", category: "foundation", categoryName: "基礎工事", locationId: "loc-04", locationName: "大阪機材センター", status: "rented", dailyRate: 18000, nextAvailable: "2026-04-05", lastInspection: "2026-01-20", specs: "バケット1.5m³" },
  { id: "H-002", name: "ハンマーグラブ 2.0t", category: "foundation", categoryName: "基礎工事", locationId: "loc-01", locationName: "本社（東京）", status: "available", dailyRate: 22000, nextAvailable: null, lastInspection: "2026-02-28", specs: "バケット2.0m³" },
  { id: "H-003", name: "ハンマーグラブ 2.5t", category: "foundation", categoryName: "基礎工事", locationId: "loc-03", locationName: "名古屋機材センター", status: "rented", dailyRate: 25000, nextAvailable: "2026-06-15", lastInspection: "2026-01-30", specs: "バケット2.5m³" },
  { id: "S-001", name: "スタンドパイプ φ600", category: "foundation", categoryName: "基礎工事", locationId: "loc-01", locationName: "本社（東京）", status: "available", dailyRate: 5000, nextAvailable: null, lastInspection: "2026-03-05", specs: "φ600mm" },
  { id: "S-002", name: "スタンドパイプ φ800", category: "foundation", categoryName: "基礎工事", locationId: "loc-02", locationName: "千葉機材センター", status: "available", dailyRate: 6000, nextAvailable: null, lastInspection: "2026-02-15", specs: "φ800mm" },
  { id: "SC-001", name: "スライムキャッチャー（自走式）", category: "foundation", categoryName: "基礎工事", locationId: "loc-01", locationName: "本社（東京）", status: "available", dailyRate: 35000, nextAvailable: null, lastInspection: "2026-03-10", specs: "自走式スライム処理機" },
  { id: "SC-002", name: "スライムクリーナー", category: "foundation", categoryName: "基礎工事", locationId: "loc-04", locationName: "大阪機材センター", status: "rented", dailyRate: 28000, nextAvailable: "2026-05-01", lastInspection: "2026-01-10", specs: "スライム吸引装置" },

  // 地盤改良
  { id: "M-001", name: "ミキシングプラント TMP-200", category: "ground", categoryName: "地盤改良", locationId: "loc-01", locationName: "本社（東京）", status: "available", dailyRate: 40000, nextAvailable: null, lastInspection: "2026-02-20", specs: "処理能力200m³/h" },
  { id: "M-002", name: "ミキシングプラント TMP-300", category: "ground", categoryName: "地盤改良", locationId: "loc-02", locationName: "千葉機材センター", status: "rented", dailyRate: 50000, nextAvailable: "2026-07-31", lastInspection: "2026-01-05", specs: "処理能力300m³/h" },
  { id: "M-003", name: "サイクロンスクリーン", category: "ground", categoryName: "地盤改良", locationId: "loc-03", locationName: "名古屋機材センター", status: "available", dailyRate: 25000, nextAvailable: null, lastInspection: "2026-03-01", specs: "土砂分離装置" },
  { id: "M-004", name: "サンドコレクター（大容量土砂分離機）", category: "ground", categoryName: "地盤改良", locationId: "loc-01", locationName: "本社（東京）", status: "available", dailyRate: 45000, nextAvailable: null, lastInspection: "2026-02-25", specs: "大容量タイプ" },
  { id: "M-005", name: "ミキシングプラント TMP-150", category: "ground", categoryName: "地盤改良", locationId: "loc-04", locationName: "大阪機材センター", status: "rented", dailyRate: 35000, nextAvailable: "2026-06-30", lastInspection: "2026-01-15", specs: "処理能力150m³/h" },
  { id: "M-006", name: "超音波側壁測定装置", category: "ground", categoryName: "地盤改良", locationId: "loc-01", locationName: "本社（東京）", status: "available", dailyRate: 15000, nextAvailable: null, lastInspection: "2026-03-05", specs: "壁面測定用" },

  // トンネル・搬送
  { id: "TN-001", name: "モグラック（仮設エレベーター）", category: "tunnel", categoryName: "トンネル・搬送", locationId: "loc-01", locationName: "本社（東京）", status: "available", dailyRate: 50000, nextAvailable: null, lastInspection: "2026-02-15", specs: "積載量2t" },
  { id: "TN-002", name: "連続ベルトコンベヤ 100m", category: "tunnel", categoryName: "トンネル・搬送", locationId: "loc-02", locationName: "千葉機材センター", status: "rented", dailyRate: 30000, nextAvailable: "2026-08-31", lastInspection: "2026-01-20", specs: "延長100m" },
  { id: "TN-003", name: "連続ベルトコンベヤ 50m", category: "tunnel", categoryName: "トンネル・搬送", locationId: "loc-03", locationName: "名古屋機材センター", status: "available", dailyRate: 20000, nextAvailable: null, lastInspection: "2026-02-28", specs: "延長50m" },
  { id: "TN-004", name: "モグラック（仮設エレベーター）", category: "tunnel", categoryName: "トンネル・搬送", locationId: "loc-05", locationName: "北海道機材センター", status: "rented", dailyRate: 50000, nextAvailable: "2026-05-15", lastInspection: "2026-01-10", specs: "積載量2t" },

  // 耐震補強
  { id: "SE-001", name: "油圧ジャッキ 100t", category: "seismic", categoryName: "耐震補強", locationId: "loc-01", locationName: "本社（東京）", status: "available", dailyRate: 8000, nextAvailable: null, lastInspection: "2026-03-01", specs: "推力100t" },
  { id: "SE-002", name: "油圧ジャッキ 200t", category: "seismic", categoryName: "耐震補強", locationId: "loc-02", locationName: "千葉機材センター", status: "available", dailyRate: 10000, nextAvailable: null, lastInspection: "2026-02-20", specs: "推力200t" },
  { id: "SE-003", name: "油圧ポンプユニット", category: "seismic", categoryName: "耐震補強", locationId: "loc-03", locationName: "名古屋機材センター", status: "rented", dailyRate: 12000, nextAvailable: "2026-04-30", lastInspection: "2026-01-25", specs: "電動式" },

  // 環境・プラント
  { id: "PL-001", name: "発電機 125kVA", category: "plant", categoryName: "環境・プラント", locationId: "loc-01", locationName: "本社（東京）", status: "available", dailyRate: 15000, nextAvailable: null, lastInspection: "2026-02-28", specs: "125kVA" },
  { id: "PL-002", name: "発電機 300kVA", category: "plant", categoryName: "環境・プラント", locationId: "loc-02", locationName: "千葉機材センター", status: "rented", dailyRate: 25000, nextAvailable: "2026-06-15", lastInspection: "2026-01-15", specs: "300kVA" },
  { id: "PL-003", name: "発電機 500kVA", category: "plant", categoryName: "環境・プラント", locationId: "loc-04", locationName: "大阪機材センター", status: "available", dailyRate: 35000, nextAvailable: null, lastInspection: "2026-03-05", specs: "500kVA" },

  // 汎用機材
  { id: "G-001", name: "敷鉄板 5×10（1枚）", category: "general", categoryName: "汎用機材", locationId: "loc-01", locationName: "本社（東京）", status: "available", dailyRate: 500, nextAvailable: null, lastInspection: "2026-01-01", specs: "5m×10m" },
  { id: "G-002", name: "敷鉄板 4×8（1枚）", category: "general", categoryName: "汎用機材", locationId: "loc-02", locationName: "千葉機材センター", status: "available", dailyRate: 400, nextAvailable: null, lastInspection: "2026-01-01", specs: "4m×8m" },
  { id: "G-003", name: "配管材セット（各種）", category: "general", categoryName: "汎用機材", locationId: "loc-01", locationName: "本社（東京）", status: "available", dailyRate: 3000, nextAvailable: null, lastInspection: "2026-02-15", specs: "φ100〜300mm各種" },
  { id: "G-004", name: "タイヤ洗浄機", category: "general", categoryName: "汎用機材", locationId: "loc-03", locationName: "名古屋機材センター", status: "rented", dailyRate: 8000, nextAvailable: "2026-04-20", lastInspection: "2026-01-20", specs: "自動式" },
  { id: "G-005", name: "タイヤ洗浄機", category: "general", categoryName: "汎用機材", locationId: "loc-05", locationName: "北海道機材センター", status: "available", dailyRate: 8000, nextAvailable: null, lastInspection: "2026-02-10", specs: "自動式" },
];
