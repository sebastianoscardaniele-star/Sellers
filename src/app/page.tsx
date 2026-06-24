"use client";

import { useMemo, useState } from "react";
import { SAMPLE_SELLERS } from "@/lib/sampleData";
import { STORE_OPTIONS, STORE_THEMES, StoreKey } from "@/lib/storeThemes";
import type { Integration, Seller, SellerStore, ShippingType } from "@/lib/types";

const integrations: Integration[] = ["Producteca", "Fulljaus", "Nada"];
const shippingTypes: ShippingType[] = ["Propio", "Andreani", "Correo Argentino", "Retiro en tienda", "Otro"];

const emptyStore: SellerStore = {
  tienda: "BNA",
  shopNombre: "",
  shopNumero: "",
  siteId: "",
  comercioVisa: "",
  comercioMaster: "",
};

const emptySeller: Omit<Seller, "id"> = {
  nombreSeller: "",
  razonSocial: "",
  cuit: "",
  emailLogistica: "",
  emailComercial: "",
  emailOperaciones: "",
  comercialACargo: "",
  activo: true,
  integracion: "Nada",
  tipoEnvio: "Otro",
  stores: [{ ...emptyStore }],
};

export default function Home() {
  const [sellers, setSellers] = useState<Seller[]>(SAMPLE_SELLERS);
  const [form, setForm] = useState<Omit<Seller, "id">>(emptySeller);
  const [query, setQuery] = useState("");
  const [storeFilter, setStoreFilter] = useState<"TODAS" | StoreKey>("TODAS");
  const [integrationFilter, setIntegrationFilter] = useState<"TODAS" | Integration>("TODAS");

  const filteredSellers = useMemo(() => {
    const q = query.toLowerCase().trim();
    return sellers.filter((seller) => {
      const matchesText = !q || [seller.nombreSeller, seller.razonSocial, seller.cuit, seller.comercialACargo]
        .join(" ")
        .toLowerCase()
        .includes(q);
      const matchesStore = storeFilter === "TODAS" || seller.stores.some((store) => store.tienda === storeFilter);
      const matchesIntegration = integrationFilter === "TODAS" || seller.integracion === integrationFilter;
      return matchesText && matchesStore && matchesIntegration;
    });
  }, [sellers, query, storeFilter, integrationFilter]);

  function updateField<K extends keyof Omit<Seller, "id">>(field: K, value: Omit<Seller, "id">[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function updateStore(index: number, field: keyof SellerStore, value: string) {
    setForm((current) => ({
      ...current,
      stores: current.stores.map((store, idx) => idx === index ? { ...store, [field]: value } : store),
    }));
  }

  function addStore() {
    setForm((current) => ({ ...current, stores: [...current.stores, { ...emptyStore }] }));
  }

  function removeStore(index: number) {
    setForm((current) => ({ ...current, stores: current.stores.filter((_, idx) => idx !== index) }));
  }

  function saveSeller() {
    if (!form.nombreSeller || !form.razonSocial || !form.cuit) return;
    setSellers((current) => [{ ...form, id: crypto.randomUUID() }, ...current]);
    setForm(emptySeller);
  }

  function deleteSeller(id: string) {
    setSellers((current) => current.filter((seller) => seller.id !== id));
  }

  function exportCsv() {
    const headers = [
      "Nombre Seller", "Razon Social", "CUIT", "Activo", "Integracion", "Tipo Envio", "Email Logistica", "Email Comercial", "Email Operaciones", "Comercial a Cargo", "Tienda", "Shop Nombre", "Shop Numero", "Site ID", "Comercio Visa", "Comercio Master"
    ];
    const rows = sellers.flatMap((seller) => seller.stores.map((store) => [
      seller.nombreSeller, seller.razonSocial, seller.cuit, seller.activo ? "Si" : "No", seller.integracion, seller.tipoEnvio, seller.emailLogistica, seller.emailComercial, seller.emailOperaciones, seller.comercialACargo, STORE_THEMES[store.tienda].label, store.shopNombre, store.shopNumero, store.siteId, store.comercioVisa, store.comercioMaster
    ]));
    const csv = [headers, ...rows].map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "sellers.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <section className="mb-8 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Avenida</p>
            <h1 className="text-3xl font-bold text-slate-950">Repositorio de Sellers</h1>
            <p className="mt-2 text-slate-600">Gestión centralizada de sellers, shops, comercios y configuración por tienda.</p>
          </div>
          <button onClick={exportCsv} className="rounded-2xl bg-slate-950 px-5 py-3 font-semibold text-white hover:bg-slate-800">Exportar CSV</button>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-6">
          {STORE_OPTIONS.map((store) => (
            <div key={store} className="rounded-2xl p-4 text-white shadow-sm" style={{ background: `linear-gradient(135deg, ${STORE_THEMES[store].primary}, ${STORE_THEMES[store].secondary})` }}>
              <p className="text-sm font-semibold">{STORE_THEMES[store].label}</p>
              <p className="mt-1 text-2xl font-bold">{sellers.filter((seller) => seller.stores.some((s) => s.tienda === store)).length}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="mb-4 text-xl font-bold">Nuevo seller</h2>
        <div className="grid gap-3 md:grid-cols-3">
          <Input label="Nombre del seller" value={form.nombreSeller} onChange={(v) => updateField("nombreSeller", v)} />
          <Input label="Razón Social" value={form.razonSocial} onChange={(v) => updateField("razonSocial", v)} />
          <Input label="CUIT" value={form.cuit} onChange={(v) => updateField("cuit", v)} />
          <Input label="Email Logística" value={form.emailLogistica} onChange={(v) => updateField("emailLogistica", v)} />
          <Input label="Email Comercial" value={form.emailComercial} onChange={(v) => updateField("emailComercial", v)} />
          <Input label="Email Operaciones" value={form.emailOperaciones} onChange={(v) => updateField("emailOperaciones", v)} />
          <Input label="Comercial a cargo" value={form.comercialACargo} onChange={(v) => updateField("comercialACargo", v)} />
          <Select label="Integración" value={form.integracion} options={integrations} onChange={(v) => updateField("integracion", v as Integration)} />
          <Select label="Tipo de envío" value={form.tipoEnvio} options={shippingTypes} onChange={(v) => updateField("tipoEnvio", v as ShippingType)} />
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold">Shops por tienda</h3>
            <button onClick={addStore} className="rounded-xl bg-slate-100 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-200">Agregar tienda</button>
          </div>
          {form.stores.map((store, index) => (
            <div key={index} className="rounded-2xl border border-slate-200 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded-full px-3 py-1 text-sm font-bold text-white" style={{ background: STORE_THEMES[store.tienda].primary }}>{STORE_THEMES[store.tienda].label}</span>
                {form.stores.length > 1 && <button onClick={() => removeStore(index)} className="text-sm font-semibold text-red-600">Quitar</button>}
              </div>
              <div className="grid gap-3 md:grid-cols-6">
                <Select label="Tienda" value={store.tienda} options={STORE_OPTIONS} optionLabel={(v) => STORE_THEMES[v as StoreKey].label} onChange={(v) => updateStore(index, "tienda", v)} />
                <Input label="Nombre shop" value={store.shopNombre} onChange={(v) => updateStore(index, "shopNombre", v)} />
                <Input label="Nro shop" value={store.shopNumero} onChange={(v) => updateStore(index, "shopNumero", v)} />
                <Input label="Site ID" value={store.siteId} onChange={(v) => updateStore(index, "siteId", v)} />
                <Input label="Comercio Visa" value={store.comercioVisa} onChange={(v) => updateStore(index, "comercioVisa", v)} />
                <Input label="Comercio Master" value={store.comercioMaster} onChange={(v) => updateStore(index, "comercioMaster", v)} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center gap-4">
          <label className="flex items-center gap-2 font-semibold"><input type="checkbox" checked={form.activo} onChange={(e) => updateField("activo", e.target.checked)} /> Activo</label>
          <button onClick={saveSeller} className="rounded-2xl bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800">Guardar seller</button>
        </div>
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="mb-5 grid gap-3 md:grid-cols-3">
          <Input label="Buscar" value={query} onChange={setQuery} placeholder="Seller, razón social, CUIT o comercial" />
          <Select label="Tienda" value={storeFilter} options={["TODAS", ...STORE_OPTIONS]} optionLabel={(v) => v === "TODAS" ? "Todas" : STORE_THEMES[v as StoreKey].label} onChange={(v) => setStoreFilter(v as "TODAS" | StoreKey)} />
          <Select label="Integración" value={integrationFilter} options={["TODAS", ...integrations]} optionLabel={(v) => v === "TODAS" ? "Todas" : v} onChange={(v) => setIntegrationFilter(v as "TODAS" | Integration)} />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] text-left text-sm">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <Th>Seller</Th><Th>Razón Social</Th><Th>CUIT</Th><Th>Tiendas</Th><Th>Integración</Th><Th>Envío</Th><Th>Comercial</Th><Th>Estado</Th><Th></Th>
              </tr>
            </thead>
            <tbody>
              {filteredSellers.map((seller) => (
                <tr key={seller.id} className="border-b border-slate-100 align-top">
                  <Td>{seller.nombreSeller}</Td>
                  <Td>{seller.razonSocial}</Td>
                  <Td>{seller.cuit}</Td>
                  <Td>
                    <div className="flex flex-wrap gap-2">
                      {seller.stores.map((store, idx) => <span key={idx} className="rounded-full px-2 py-1 text-xs font-bold text-white" style={{ background: STORE_THEMES[store.tienda].primary }}>{STORE_THEMES[store.tienda].label}</span>)}
                    </div>
                  </Td>
                  <Td>{seller.integracion}</Td>
                  <Td>{seller.tipoEnvio}</Td>
                  <Td>{seller.comercialACargo}</Td>
                  <Td><span className={`rounded-full px-2 py-1 text-xs font-bold ${seller.activo ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{seller.activo ? "Activo" : "Inactivo"}</span></Td>
                  <Td><button onClick={() => deleteSeller(seller.id)} className="font-semibold text-red-600">Eliminar</button></Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

function Input({ label, value, onChange, placeholder = "" }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string }) {
  return <label className="block"><span className="mb-1 block text-sm font-semibold text-slate-600">{label}</span><input value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2 focus:border-blue-500" /></label>;
}

function Select({ label, value, options, onChange, optionLabel }: { label: string; value: string; options: readonly string[]; onChange: (value: string) => void; optionLabel?: (value: string) => string }) {
  return <label className="block"><span className="mb-1 block text-sm font-semibold text-slate-600">{label}</span><select value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2 focus:border-blue-500">{options.map((option) => <option key={option} value={option}>{optionLabel ? optionLabel(option) : option}</option>)}</select></label>;
}

function Th({ children }: { children: React.ReactNode }) { return <th className="px-3 py-3 font-bold">{children}</th>; }
function Td({ children }: { children: React.ReactNode }) { return <td className="px-3 py-4">{children}</td>; }
