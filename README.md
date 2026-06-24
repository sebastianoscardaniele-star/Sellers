# Repositorio de Sellers

Aplicación web para administrar sellers por tienda bancaria, lista para subir a GitHub y desplegar en Vercel.

## Tiendas incluidas

- Tienda BNA: `#0484A8` y `#F99C0C`
- Tienda Macro: `#0039E3` y `#FF7DCB`
- Tienda Ciudad: `#10049E`
- Tienda Comafi: `#21A954`
- Tienda MasBanco: `#37E1FB`
- Tienda Yappy: colores propuestos `#6B7280` y `#111827`

## Campos del seller

- Nombre del seller
- Razón Social
- Nombre de los shops y sus números asociados
- Número de ID site
- Número de comercio Visa
- Número de comercio Master
- CUIT
- Email Logística
- Email Comercial
- Email Operaciones
- Comercial a cargo
- Activo / Inactivo
- Integración: Producteca, Fulljaus o Nada
- Tipo de envío

## Uso local

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`.

## Subir a GitHub

```bash
git init
git add .
git commit -m "Repositorio inicial de sellers"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
git push -u origin main
```

## Deploy en Vercel

1. Entrar a Vercel.
2. Importar el repositorio de GitHub.
3. Framework: Next.js.
4. Build command: `npm run build`.
5. Output directory: dejar vacío.
6. Deploy.

## Nota sobre almacenamiento

Esta primera versión guarda la información en memoria del navegador durante la sesión. Para producción multiusuario se recomienda agregar base de datos, por ejemplo:

- Vercel Postgres
- Supabase
- Neon

Tablas sugeridas:

- `sellers`
- `seller_stores`
- `audit_log`
- `users`
