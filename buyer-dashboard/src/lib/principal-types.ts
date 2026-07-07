// ─── Principal Role Types ─────────────────────────────────
export type PrincipalRole = "sales_principal" | "product_manager";

// ─── Principal User ───────────────────────────────────────
export interface PrincipalUser {
  id: string;
  name: string;
  email: string;
  role: PrincipalRole;
  company_id: string;
  company_name: string;
}

// ─── Purchase Order (dari OfficeSupply ke Principal) ──────
export type PoStatus =
  | "sent_to_principal"
  | "consolidating"
  | "ready_to_delivery"
  | "done";

export interface DeliveryAddress {
  recipient_name: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  zip: string;
}

export interface PrincipalPO {
  id: string;
  po_number: string;
  so_number: string;
  buyer_company: string;
  created_at: string;
  status: PoStatus;
  items: PoItem[];
  total_amount: number;
  notes: string;
  delivery_address: DeliveryAddress;
}

export interface PoItem {
  product_id: string;
  product_name: string;
  qty: number;
  unit_price: number;
  subtotal: number;
}

// ─── Inbound Shipment ─────────────────────────────────────
export type InboundStatus = "consolidating" | "ready_to_delivery" | "done";
export type PackageStatus = "received" | "damaged" | "issue_found";

export interface InboundShipment {
  id: string;
  po_id: string;
  po_number: string;
  created_at: string;
  status: InboundStatus;
  packages: InboundPackage[];
}

export interface InboundPackage {
  id: string;
  package_number: string;
  weight_kg: number;
  dimension: string; // LxWxH in cm
  qr_code: string;
  label_printed: boolean;
  status: PackageStatus;
  items: PackageItem[];
}

export interface PackageItem {
  product_name: string;
  qty: number;
}

// ─── Principal Invoice (view-only) ────────────────────────
export type PrincipalInvoiceStatus = "ready_to_pay" | "paid" | "overdue";

export interface PrincipalInvoiceView {
  id: string;
  invoice_number: string;
  po_number: string;
  so_number: string;
  buyer_company: string;
  issued_at: string;
  due_date: string;
  total_amount: number;
  status: PrincipalInvoiceStatus;
  paid_at?: string;
  items: PrincipalInvoiceItem[];
}

export interface PrincipalInvoiceItem {
  description: string;
  qty: number;
  unit_price: number;
  total: number;
}

// ─── Product Management ───────────────────────────────────
export interface PrincipalProduct {
  id: string;
  name: string;
  sku: string;
  category: string;
  weight_gram: number;
  length_cm: number;
  width_cm: number;
  height_cm: number;
  price: number;
  stock: number;
  is_active: boolean;
}

// ─── Principal Dashboard Stats ────────────────────────────
export interface PrincipalDashboardStats {
  incoming_po: number;
  ready_to_delivery: number;
  pending_inbound: number;
  overdue_invoice: number;
  total_products: number;
}

// ─── Principal Menu Item ──────────────────────────────────
export interface PrincipalMenuItem {
  label: string;
  href: string;
  icon: string;
  roles: PrincipalRole[];
}
