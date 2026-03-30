export type Location = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
};

export const locations: Location[] = [
  { id: "loc-01", name: "本社（東京）", address: "東京都中央区日本橋", lat: 35.6812, lng: 139.7671 },
  { id: "loc-02", name: "千葉機材センター", address: "千葉県市原市", lat: 35.4981, lng: 140.1164 },
  { id: "loc-03", name: "名古屋機材センター", address: "愛知県名古屋市", lat: 35.1802, lng: 136.9066 },
  { id: "loc-04", name: "大阪機材センター", address: "大阪府大阪市", lat: 34.6937, lng: 135.5023 },
  { id: "loc-05", name: "北海道機材センター", address: "北海道札幌市", lat: 43.0618, lng: 141.3545 },
];

export type Category = {
  id: string;
  name: string;
  icon: string;
};

export const categories: Category[] = [
  { id: "tank", name: "タンク・水処理", icon: "Container" },
  { id: "pneumatic", name: "圧気関連", icon: "Wind" },
  { id: "foundation", name: "基礎工事", icon: "Hammer" },
  { id: "ground", name: "地盤改良", icon: "Layers" },
  { id: "tunnel", name: "トンネル・搬送", icon: "Tunnel" },
  { id: "seismic", name: "耐震補強", icon: "Shield" },
  { id: "plant", name: "環境・プラント", icon: "Factory" },
  { id: "general", name: "汎用機材", icon: "Wrench" },
];
