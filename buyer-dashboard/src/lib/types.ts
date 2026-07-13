// ─── Role Types ───────────────────────────────────────────
export type BuyerRole = "head_purchasing" | "admin_purchasing" | "finance_buyer";
export type SchemaType = "schema_2" | "schema_3";

// ─── User ─────────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  email: string;
  role: BuyerRole;
  company_id: string;
  company_name: string;
}

// ─── Sales Order ──────────────────────────────────────────
export type SoStatus =
  // PRD SO: Draft, Submitted, Rejected, In Review, Cannot Process, Confirmed, In Process, Delivery, Expired, Done
  | "draft"
  | "submitted"
  | "rejected"
  | "in_review"
  | "cannot_process"
  | "confirmed"
  | "in_process"
  | "delivery"
  | "expired"
  | "done";


export interface SalesOrder {
  id: string;
  so_number: string;
  created_at: string;
  status: SoStatus;
  total_amount: number;
  shipping_cost: number;
  grand_total: number;
  payment_term: string;
  delivery_term: "franco" | "non_franco";
  notes: string;
  items: SoItem[];
  origins: ShippingOrigin[];
}

export interface SoItem {
  product_id: string;
  product_name: string;
  qty: number;
  unit_price: number;
  subtotal: number;
  weight_gram: number;
  origin_id: string;
}

export interface ShippingOrigin {
  origin_id: string;
  origin_name: string;
  chargeable_weight_kg: number;
  shipping_cost: number;
}

// ─── RFQ ──────────────────────────────────────────────────
// PRD RFQ: Draft, Submitted, Rejected, In Review, Ready For Quotation
export type RfqStatus =
  | "rfq_draft"
  | "rfq_submitted"
  | "rfq_rejected"
  | "rfq_in_review"
  | "rfq_ready_for_quotation";


export interface Rfq {
  id: string;
  rfq_number: string;
  created_at: string;
  status: RfqStatus;
  notes: string;
  items: RfqItem[];
}

export interface RfqItem {
  product_id: string;
  product_name: string;
  qty: number;
  specification?: string;
  attachments?: string[];
}

// ─── Quotation ────────────────────────────────────────────
// PRD Quotation: Draft, Issued, Approved, Rejected, Expired
//
// NOTE: UI/mock-data saat ini memakai status `quotation_sent`
// (lihat buyer-dashboard/src/lib/mock-data.ts).
export type QnStatus =
  | "quotation_draft"
  | "quotation_issued"
  | "quotation_sent"
  | "quotation_approved"
  | "quotation_rejected"
  | "quotation_expired";


export interface Quotation {
  id: string;
  qn_number: string;
  created_at: string;
  valid_until: string;
  status: QnStatus;
  total_amount: number;
  notes: string;
  items: QnItem[];
}

export interface QnItem {
  product_id: string;
  product_name: string;
  qty: number;
  unit_price: number;
  subtotal: number;
}

// ─── Contract ─────────────────────────────────────────────
export type CtStatus = "contract_draft" | "contract_finalized" | "contract_signed_buyer" | "contract_signed_principal" | "contract_active" | "converted_to_so" | "contract_expired";

export interface Contract {
  id: string;
  ct_number: string;
  created_at: string;
  valid_from: string;
  valid_until: string;
  status: CtStatus;
  items: ContractItem[];
}

export interface ContractItem {
  product_id: string;
  product_name: string;
  qty_min: number;
  unit_price: number;
}

// ─── Tracking ─────────────────────────────────────────────
export type TrackingStatus = "processing" | "shipped" | "in_transit" | "delivered";

export interface Tracking {
  id: string;
  so_number: string;
  status: TrackingStatus;
  courier: string;
  awb_number: string;
  estimated_delivery: string;
  history: TrackingEvent[];
}

export interface TrackingEvent {
  timestamp: string;
  location: string;
  description: string;
}

// ─── Invoice ──────────────────────────────────────────────
export type InvoiceStatus = "draft" | "issued" | "current" | "overdue" | "paid";

export interface Invoice {
  id: string;
  invoice_number: string;
  so_number: string;
  issued_at: string;
  due_date: string;
  status: InvoiceStatus;
  total_amount: number;
  items: InvoiceItem[];
}

export interface InvoiceItem {
  description: string;
  qty: number;
  unit_price: number;
  total: number;
}

// ─── Payment ──────────────────────────────────────────────
export interface Payment {
  id: string;
  invoice_id: string;
  invoice_number: string;
  amount: number;
  method: "va" | "transfer";
  paid_at?: string;
  proof_url?: string;
  status: "pending" | "verified" | "paid" | "failed";
}

// ─── Dashboard Stats ──────────────────────────────────────
export interface DashboardStats {
  total_spent_this_month: number;
  submitted_so: number;
  active_contracts: number;
  in_transit_shipments: number;
  current_invoices: number;
  total_orders: number;
}

// ─── Menu Item ────────────────────────────────────────────
export interface MenuItem {
  label: string;
  href: string;
  icon: string;
  roles: BuyerRole[];
  admin_only?: boolean;
}