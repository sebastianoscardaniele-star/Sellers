import type { StoreKey } from "./storeThemes";

export type Integration = "Producteca" | "Fulljaus" | "Nada";
export type ShippingType = "Propio" | "Andreani" | "Correo Argentino" | "Retiro en tienda" | "Otro";

export type SellerStore = {
  tienda: StoreKey;
  shopNombre: string;
  shopNumero: string;
  siteId: string;
  comercioVisa: string;
  comercioMaster: string;
};

export type Seller = {
  id: string;
  nombreSeller: string;
  razonSocial: string;
  cuit: string;
  emailLogistica: string;
  emailComercial: string;
  emailOperaciones: string;
  comercialACargo: string;
  activo: boolean;
  integracion: Integration;
  tipoEnvio: ShippingType;
  stores: SellerStore[];
};
