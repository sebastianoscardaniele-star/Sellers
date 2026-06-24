export type StoreKey = "BNA" | "MACRO" | "CIUDAD" | "COMAFI" | "MASBANCO" | "YAPPY";

export const STORE_THEMES: Record<StoreKey, { label: string; primary: string; secondary: string }> = {
  BNA: { label: "Tienda BNA", primary: "#0484A8", secondary: "#F99C0C" },
  MACRO: { label: "Tienda Macro", primary: "#0039E3", secondary: "#FF7DCB" },
  CIUDAD: { label: "Tienda Ciudad", primary: "#10049E", secondary: "#10049E" },
  COMAFI: { label: "Tienda Comafi", primary: "#21A954", secondary: "#21A954" },
  MASBANCO: { label: "Tienda MasBanco", primary: "#37E1FB", secondary: "#37E1FB" },
  YAPPY: { label: "Tienda Yappy", primary: "#6B7280", secondary: "#111827" },
};

export const STORE_OPTIONS = Object.keys(STORE_THEMES) as StoreKey[];
