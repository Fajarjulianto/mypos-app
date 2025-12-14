# MYPOS Frontend Roadmap (Next.js)

## 🏗️ Phase 1: Setup & Architecture (Week 1-2)

- [x] **Project Initialization**
  - [x] `npx create-next-app@latest` (App Router, TypeScript, Tailwind).
  - [x] Setup Folder Structure (`/components`, `/lib`, `/hooks`, `/types`, `/services`).
  - [x] Install Core Libs: `lucide-react` (Icons), `clsx/tailwind-merge` (Styles), `zustand` (State Management), `tanstack-query` (Data Fetching).
- [x] **UI Component Library (shadcn/ui setup)**
  - [x] Install basic components: Button, Input, Card, Dialog (Modal), Dropdown, Table, Toast.
  - [x] Setup Global Theme (Colors, Typography) di `globals.css`.
- [ ] **Authentication Flow (Frontend)**
  - [x] Create Login Page UI.
  - [x] Create Register Page UI.
  - [ ] Setup Protected Routes (Middleware) & Auth Context/Hook.

## 🛒 Phase 2: Core POS System (Week 3-6)

- [ ] **Dashboard Layout**
  - [ ] Create Sidebar Navigation (Responsive).
  - [ ] Create Header (User profile, Notifications).
- [ ] **Product Management (Inventory)**
  - [ ] UI: Product List Table (Search, Filter, Pagination).
  - [ ] UI: Add/Edit Product Form (Modal/Page).
  - [ ] Integration: Connect to Backend API (GET, POST, PUT, DELETE products).
- [ ] **Cashier Interface (The Heart)**
  - [ ] Layout: Split screen (Product Grid vs Cart Summary).
  - [ ] Feature: Add to Cart logic (Zustand store).
  - [ ] Feature: Update Qty, Remove Item.
  - [ ] Feature: Calculation (Subtotal, Tax, Discount).
  - [ ] UI: Checkout Modal (Payment Method selection).
  - [ ] UI: Receipt Generator (Printable view).

## 🤝 Phase 3: Rekber & Supplier Features (Week 7-10)

- [ ] **Supplier Marketplace UI**
  - [ ] UI: Browse Supplier Products.
  - [ ] UI: Supplier Profile Page.
- [ ] **Transaction Management (Escrow)**
  - [ ] UI: Order Status Page (Pending, Paid, Shipped, Received, Completed).
  - [ ] Feature: "Confirm Goods Received" Button (Triggers fund release).
  - [ ] UI: Dispute/Complain Form (If goods are damaged).
- [ ] **Wallet/Balance UI**
  - [ ] UI: Balance Card (Total saldo, Saldo tertahan).
  - [ ] UI: Top-up & Withdraw Request Forms.

## 🧠 Phase 4: AI Features Implementation (Week 11-16)

- [ ] **Smart Inventory (Image Recognition)**
  - [ ] Feature: Camera Access (MediaDevices API) or File Upload.
  - [ ] UI: "Scanning..." Loading State (Skeleton/Animation).
  - [ ] Integration: Send Image to AI Endpoint -> Receive Data.
  - [ ] UI: Verification Modal (User confirms AI count result before saving).
  - [ ] **Camera Feature**
    - [ ] Install `react-webcam` atau gunakan Native Camera API.
    - [ ] Buat fungsi `captureImage()` yang menghasilkan format Base64 atau Blob.
- [ ] **Image Optimization**
  - [ ] Resize gambar di client-side (Frontend) sebelum upload. Jangan kirim foto 4K (5MB). Resize ke max-width 1024px (cukup ~300KB) agar proses cepat.
  - [ ] Gunakan library `browser-image-compression`.
- [ ] **UI Feedback**
  - [ ] Buat _Bounding Box Overlay_. Saat backend membalas koordinat barang, gambar kotak di layar HP user agar terlihat canggih.
- [ ] **AI Finance Dashboard**
  - [ ] Install Chart Library (`recharts` or `tremor`).
  - [ ] UI: Revenue Chart, Profit Trends.
  - [ ] UI: "AI Insights" Card (Display text suggestions from API).
- [ ] **Smart Suggestion (POS)**
  - [ ] UI: Small Pop-up/Toast in Cashier View: "Suggest bundling with Item X?".

## 🚀 Phase 5: Optimization & Polish (Week 17-20)

- [ ] **Performance**
  - [ ] Implement Lazy Loading for heavy components/images.
  - [ ] Optimize Re-renders (React.memo, useMemo).
- [ ] **Mobile Responsiveness**
  - [ ] Test layout on Mobile (Warung owners might use phones).
  - [ ] Test layout on Tablet (Common POS device).
- [ ] **PWA (Progressive Web App)**
  - [ ] Setup `manifest.json`.
  - [ ] Ensure offline capability (Service Workers) for basic POS functions.
- [ ] **Deployment**
  - [ ] Deploy to Vercel/Netlify.
  - [ ] Environment Variables Setup.

## 🐛 Backlog / Bugs

- [ ] (Empty)
