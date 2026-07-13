import {
  DashboardStats,
  SalesOrder,
  Rfq,
  Quotation,
  Contract,
  Tracking,
  Invoice,
  Payment,
  User,
} from "@/lib/types";

// ─── Current User (simulated) ─────────────────────────────
export const currentUser: User = {
  id: "usr-001",
  name: "Budi Santoso",
  email: "budi@acme-corp.co.id",
  role: "head_purchasing",
  company_id: "comp-001",
  company_name: "PT Nirmana Sthavira Dharma",
};

export const adminPurchasing: User = {
  id: "usr-002",
  name: "Ani Wijaya",
  email: "ani@acme-corp.co.id",
  role: "admin_purchasing",
  company_id: "comp-001",
  company_name: "PT Nirmana Sthavira Dharma",
};

export const financeBuyer: User = {
  id: "usr-003",
  name: "Citra Dewi",
  email: "citra@acme-corp.co.id",
  role: "finance_buyer",
  company_id: "comp-001",
  company_name: "PT Nirmana Sthavira Dharma",
};

export const allUsers: User[] = [currentUser, adminPurchasing, financeBuyer];

// ─── Dashboard Stats ──────────────────────────────────────
export const dashboardStats: DashboardStats = {
  total_spent_this_month: 125400000,
  submitted_so: 3,
  active_contracts: 5,
  in_transit_shipments: 2,
  current_invoices: 4,
  total_orders: 48,
};

// ─── Sales Orders ─────────────────────────────────────────
export const salesOrders: SalesOrder[] = [
  {
    id: "so-001",
    so_number: "SO-20260701-001",
    created_at: "2026-07-01T08:30:00Z",
    status: "delivery",
    total_amount: 45000000,
    shipping_cost: 250000,
    grand_total: 45250000,
    payment_term: "TOP 30",
    delivery_term: "non_franco",
    notes: "Dikirim ke gudang pusat",
    items: [
      { product_id: "prod-001", product_name: "Kertas A4 80gsm - Box", qty: 200, unit_price: 45000, subtotal: 9000000, weight_gram: 2500, origin_id: "origin-jkt" },
      { product_id: "prod-002", product_name: "Pulpen Gel Biru - Pack 12", qty: 50, unit_price: 36000, subtotal: 1800000, weight_gram: 200, origin_id: "origin-klt" },
    ],
    origins: [
      { origin_id: "origin-jkt", origin_name: "Jakarta", chargeable_weight_kg: 510, shipping_cost: 150000 },
      { origin_id: "origin-klt", origin_name: "Klaten", chargeable_weight_kg: 12, shipping_cost: 100000 },
    ],
  },
  {
    id: "so-002",
    so_number: "SO-20260702-001",
    created_at: "2026-07-02T10:15:00Z",
    status: "submitted",
    total_amount: 28000000,
    shipping_cost: 180000,
    grand_total: 28180000,
    payment_term: "TOP 30",
    delivery_term: "franco",
    notes: "Mohon diproses segera",
    items: [
      { product_id: "prod-003", product_name: "Tinta Printer Epson 001 - Black", qty: 20, unit_price: 150000, subtotal: 3000000, weight_gram: 100, origin_id: "origin-jkt" },
      { product_id: "prod-004", product_name: "Map Folder Plastik - Pack 50", qty: 100, unit_price: 25000, subtotal: 2500000, weight_gram: 500, origin_id: "origin-klt" },
    ],
    origins: [
      { origin_id: "origin-jkt", origin_name: "Jakarta", chargeable_weight_kg: 2, shipping_cost: 50000 },
      { origin_id: "origin-klt", origin_name: "Klaten", chargeable_weight_kg: 51, shipping_cost: 130000 },
    ],
  },
  {
    id: "so-003",
    so_number: "SO-20260630-001",
    created_at: "2026-06-30T14:00:00Z",
    status: "in_review",
    total_amount: 15000000,
    shipping_cost: 120000,
    grand_total: 15120000,
    payment_term: "CBD",
    delivery_term: "non_franco",
    notes: "",
    items: [
      { product_id: "prod-005", product_name: "Amplop Polos Coklat - Box", qty: 30, unit_price: 35000, subtotal: 1050000, weight_gram: 800, origin_id: "origin-jkt" },
    ],
    origins: [
      { origin_id: "origin-jkt", origin_name: "Jakarta", chargeable_weight_kg: 25, shipping_cost: 120000 },
    ],
  },
  {
    id: "so-004",
    so_number: "SO-20260629-002",
    created_at: "2026-06-29T09:45:00Z",
    status: "in_process",
    total_amount: 35000000,
    shipping_cost: 300000,
    grand_total: 35300000,
    payment_term: "TOP 30",
    delivery_term: "non_franco",
    notes: "Konsolidasi selesai",
    items: [
      { product_id: "prod-006", product_name: "Binder Clip 260 - Box 12", qty: 200, unit_price: 18000, subtotal: 3600000, weight_gram: 100, origin_id: "origin-klt" },
    ],
    origins: [
      { origin_id: "origin-klt", origin_name: "Klaten", chargeable_weight_kg: 22, shipping_cost: 300000 },
    ],
  },
];

// ─── RFQs ─────────────────────────────────────────────────
export const rfqs: Rfq[] = [
  {
    id: "rfq-001",
    rfq_number: "RFQ-20260701-001",
    created_at: "2026-07-01T11:00:00Z",
    status: "rfq_submitted",
    notes: "Mohon penawaran untuk list di bawah",
    items: [
      { product_id: "prod-007", product_name: "Poster Cetak A3 Full Color", qty: 500 },
      { product_id: "prod-008", product_name: "Kartu Nama Cetak", qty: 2000 },
    ],
  },
  {
    id: "rfq-002",
    rfq_number: "RFQ-20260628-001",
    created_at: "2026-06-28T13:20:00Z",
    status: "rfq_ready_for_quotation",
    notes: "Untuk kebutuhan event Agustus",
    items: [
      { product_id: "prod-009", product_name: "Banner Cetak 2x1m", qty: 10 },
    ],
  },
];

// ─── Quotations ───────────────────────────────────────────
export const quotations: Quotation[] = [
  {
    id: "qn-001",
    qn_number: "QN-20260629-001",
    created_at: "2026-06-29T10:00:00Z",
    valid_until: "2026-07-14T10:00:00Z",
    status: "quotation_sent",
    total_amount: 12500000,
    notes: "Penawaran dari RFQ-20260628-001",
    items: [
      { product_id: "prod-009", product_name: "Banner Cetak 2x1m", qty: 10, unit_price: 1250000, subtotal: 12500000 },
    ],
  },
  {
    id: "qn-002",
    qn_number: "QN-20260701-001",
    created_at: "2026-07-01T15:00:00Z",
    valid_until: "2026-07-15T15:00:00Z",
    status: "quotation_sent",
    total_amount: 9800000,
    notes: "Penawaran dari RFQ-20260701-001 (produk cetak)",
    items: [
      { product_id: "prod-007", product_name: "Poster Cetak A3 Full Color", qty: 500, unit_price: 16000, subtotal: 8000000 },
      { product_id: "prod-008", product_name: "Kartu Nama Cetak", qty: 2000, unit_price: 900, subtotal: 1800000 },
    ],
  },
];

// ─── Contracts ────────────────────────────────────────────
export const contracts: Contract[] = [
  {
    id: "ct-001",
    ct_number: "CT-20260601-001",
    created_at: "2026-06-01T08:00:00Z",
    valid_from: "2026-06-01",
    valid_until: "2026-12-31",
    status: "contract_active",
    items: [
      { product_id: "prod-001", product_name: "Kertas A4 80gsm - Box", qty_min: 100, unit_price: 42000 },
      { product_id: "prod-002", product_name: "Pulpen Gel Biru - Pack 12", qty_min: 30, unit_price: 34000 },
    ],
  },
  {
    id: "ct-002",
    ct_number: "CT-20260401-001",
    created_at: "2026-04-01T08:00:00Z",
    valid_from: "2026-04-01",
    valid_until: "2026-06-30",
    status: "contract_expired",
    items: [
      { product_id: "prod-003", product_name: "Tinta Printer Epson 001 - Black", qty_min: 10, unit_price: 140000 },
    ],
  },
];

// ─── Tracking ─────────────────────────────────────────────
export const trackings: Tracking[] = [
  {
    id: "trk-001",
    so_number: "SO-20260701-001",
    status: "delivered",
    courier: "Jaladara",
    awb_number: "JLD-20260702-001",
    estimated_delivery: "2026-07-03",
    history: [
      { timestamp: "2026-07-02T08:00:00Z", location: "Gudang Klaten", description: "Paket diambil oleh Jaladara" },
      { timestamp: "2026-07-02T14:30:00Z", location: "Hub Semarang", description: "Paket tiba di hub transit" },
      { timestamp: "2026-07-03T09:15:00Z", location: "Jakarta Utara", description: "Paket diterima oleh pembeli" },
    ],
  },
  {
    id: "trk-002",
    so_number: "SO-20260629-002",
    status: "in_transit",
    courier: "Jaladara",
    awb_number: "JLD-20260701-002",
    estimated_delivery: "2026-07-02",
    history: [
      { timestamp: "2026-07-01T07:30:00Z", location: "Gudang Jakarta", description: "Paket diambil oleh Jaladara" },
      { timestamp: "2026-07-01T16:00:00Z", location: "Hub Cikarang", description: "Paket tiba di hub transit" },
    ],
  },
];

// ─── Invoices ─────────────────────────────────────────────
export const invoices: Invoice[] = [
  {
    id: "inv-001",
    invoice_number: "INV-20260703-001",
    so_number: "SO-20260701-001",
    issued_at: "2026-07-03T10:00:00Z",
    due_date: "2026-08-02T10:00:00Z",
    status: "current",
    total_amount: 45250000,
    items: [
      { description: "Kertas A4 80gsm - Box (x200)", qty: 1, unit_price: 9000000, total: 9000000 },
      { description: "Pulpen Gel Biru - Pack 12 (x50)", qty: 1, unit_price: 1800000, total: 1800000 },
      { description: "Ongkir - Jakarta → Jakarta Utara", qty: 1, unit_price: 150000, total: 150000 },
      { description: "Ongkir - Klaten → Jakarta Utara", qty: 1, unit_price: 100000, total: 100000 },
    ],
  },
  {
    id: "inv-002",
    invoice_number: "INV-20260625-001",
    so_number: "SO-20260620-003",
    issued_at: "2026-06-25T08:00:00Z",
    due_date: "2026-07-25T08:00:00Z",
    status: "current",
    total_amount: 18750000,
    items: [
      { description: "Amplop Polos Coklat - Box (x50)", qty: 1, unit_price: 1750000, total: 1750000 },
      { description: "Ongkir - Klaten → Jakarta Utara", qty: 1, unit_price: 120000, total: 120000 },
    ],
  },
];

// ─── Payments ─────────────────────────────────────────────
export const payments: Payment[] = [
  {
    id: "pay-001",
    invoice_id: "inv-001",
    invoice_number: "INV-20260703-001",
    amount: 45250000,
    method: "transfer",
    status: "pending",
  },
  {
    id: "pay-002",
    invoice_id: "inv-002",
    invoice_number: "INV-20260625-001",
    amount: 18750000,
    method: "va",
    paid_at: "2026-06-26T14:00:00Z",
    status: "paid",
  },
];
