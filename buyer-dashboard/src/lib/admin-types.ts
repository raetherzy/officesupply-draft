export type AdminRole =
  | "super_admin"
  | "super_user"
  | "sales_admin"
  | "purchasing_user"
  | "finance_user";

export interface AdminDashboardKpi {
  label: string;
  value: number;
}

export interface InternalDocRow {
  id: string;
  doc_type: "RFQ" | "Quotation" | "SO" | "CMS";
  doc_number: string;
  status: string;
  amount: number;
  updatedAt: string;
}

export interface InternalOrderRow {
  id: string;
  doc_number: string;
  origin: string;
  status: string;
  soNumber: string;
  amount: number;
}

export interface InvoiceRow {
  id: string;
  invoice_number: string;
  so_number: string;
  buyer_company: string;
  status: "current" | "overdue" | "draft" | "issued" | "paid";
  due_date: string;
  total_amount: number;
}

export interface PaymentRow {
  id: string;
  invoice_number: string;
  amount: number;
  method: "va" | "transfer";
  status: "pending" | "verified" | "paid" | "failed";
  received_at?: string;
}

export interface PrincipalHutangRow {
  id: string;
  principal_company: string;
  so_number: string;
  status: "ready_to_pay" | "overdue" | "paid";
  deadline: string;
  total_amount: number;
}
