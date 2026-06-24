import type { Seller } from "./types";

export const SAMPLE_SELLERS: Seller[] = [
  {
    id: "1",
    nombreSeller: "Seller Demo",
    razonSocial: "Seller Demo S.A.",
    cuit: "30-00000000-0",
    emailLogistica: "logistica@seller.com",
    emailComercial: "comercial@seller.com",
    emailOperaciones: "operaciones@seller.com",
    comercialACargo: "Comercial Avenida",
    activo: true,
    integracion: "Producteca",
    tipoEnvio: "Andreani",
    stores: [
      { tienda: "BNA", shopNombre: "Seller Demo BNA", shopNumero: "1001", siteId: "SITE-BNA-1", comercioVisa: "VISA-001", comercioMaster: "MASTER-001" },
      { tienda: "MACRO", shopNombre: "Seller Demo Macro", shopNumero: "2001", siteId: "SITE-MACRO-1", comercioVisa: "VISA-002", comercioMaster: "MASTER-002" }
    ]
  }
];
