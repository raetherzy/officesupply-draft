import type {
  AdminRole,
  AdminDashboardKpi,
  InternalOrderRow,
  InternalDocRow,
  InvoiceRow,
  PaymentRow,
  PrincipalHutangRow,
} from "@/lib/admin-types";

export const adminRoles: AdminRole[] = [
  "super_admin",
  "super_user",
  "sales_admin",
  "purchasing_user",
  "finance_user",
];

export const adminRoleLabels: Record<AdminRole, string> = {
  super_admin: "Super Admin",
  super_user: "Super User",
  sales_admin: "SalesAdmin",
  purchasing_user: "Purchasing User",
  finance_user: "Finance User",
};

export const adminDashboardKpis: Record<AdminRole, AdminDashboardKpi[]> = {
  super_admin: [
    { label: "Draft / Submitted RFQ", value: 6 },
    { label: "Quotation (Issued/Sent)", value: 4 },
    { label: "DPO Menunggu Otorisasi", value: 3 },
    { label: "Inbound Pending (Scan QR)", value: 2 },
    { label: "Invoice Buyer Current", value: 5 },
    { label: "Hutang Principal (Pecel) Overdue", value: 1 },
  ],
  super_user: [
    { label: "Draft / Submitted RFQ", value: 6 },
    { label: "Quotation (Issued/Sent)", value: 4 },
    { label: "DPO Menunggu Otorisasi", value: 3 },
    { label: "Inbound Pending (Scan QR)", value: 2 },
    { label: "Invoice Buyer Current", value: 5 },
    { label: "Hutang Principal (Pecel) Overdue", value: 1 },
  ],
  sales_admin: [
    { label: "RFQ In Review", value: 2 },
    { label: "Ready For Quotation", value: 3 },
    { label: "Quotation Issued", value: 2 },
    { label: "SO In Review", value: 2 },
    { label: "SO Cannot Process", value: 1 },
    { label: "CMS (Pending Review)", value: 0 },
  ],
  purchasing_user: [
    { label: "DPO Authorized (Menunggu Inbound)", value: 2 },
    { label: "DPO Ready Fulfillment", value: 1 },
    { label: "Inbound Consol. (Scan QR)", value: 2 },
    { label: "Ready To Delivery", value: 1 },
    { label: "SO Ready To Be Picked Up", value: 2 },
    { label: "Shipment/Consolidation Issues", value: 0 },
  ],
  finance_user: [
    { label: "Invoice Current", value: 5 },
    { label: "Invoice Overdue", value: 1 },
    { label: "Payment Pending", value: 2 },
    { label: "Payment Rejected", value: 0 },
    { label: "Principal Hutang (Pecel) Overdue", value: 1 },
    { label: "Refund Pending", value: 0 },
  ],
};

export const internalSalesAdminDocs: InternalDocRow[] = [
  { id: "rfq-100", doc_type: "RFQ", doc_number: "RFQ-20260701-009", status: "In Review", amount: 0, updatedAt: "2026-07-01T13:00:00Z" },
  { id: "rfq-101", doc_type: "RFQ", doc_number: "RFQ-20260628-021", status: "Ready For Quotation", amount: 0, updatedAt: "2026-06-28T11:00:00Z" },
  { id: "qn-200", doc_type: "Quotation", doc_number: "QN-20260629-777", status: "Issued", amount: 12500000, updatedAt: "2026-06-29T10:00:00Z" },
  { id: "so-300", doc_type: "SO", doc_number: "SO-20260630-112", status: "In Review", amount: 15120000, updatedAt: "2026-06-30T14:00:00Z" },
];

export const internalPurchasingOrders: InternalOrderRow[] = [
  { id: "dpo-001", doc_number: "DPO-20260702-001", origin: "Jakarta", status: "authorized", soNumber: "SO-20260702-001", amount: 28180000 },
  { id: "dpo-002", doc_number: "DPO-20260702-002", origin: "Klaten", status: "sent_to_principal", soNumber: "SO-20260701-001", amount: 45250000 },
  { id: "inb-001", doc_number: "Inbound-PO-20260702-001", origin: "Klaten", status: "consolidating", soNumber: "SO-20260702-001", amount: 0 },
];

export const internalFinanceInvoices: InvoiceRow[] = [
  { id: "inv-1001", invoice_number: "INV-20260703-001", so_number: "SO-20260701-001", buyer_company: "PT Nirmana Sthavira Dharma", status: "current", due_date: "2026-08-02", total_amount: 45250000 },
  { id: "inv-1002", invoice_number: "INV-20260625-001", so_number: "SO-20260620-003", buyer_company: "PT Mekar Abadi Sejahtera", status: "overdue", due_date: "2026-07-25", total_amount: 18750000 },
];

export const internalFinancePayments: PaymentRow[] = [
  { id: "pay-001", invoice_number: "INV-20260703-001", amount: 45250000, method: "transfer", status: "pending", received_at: "2026-07-03T11:00:00Z" },
  { id: "pay-002", invoice_number: "INV-20260625-001", amount: 18750000, method: "va", status: "paid", received_at: "2026-06-26T14:00:00Z" },
];

export const internalPrincipalHutang: PrincipalHutangRow[] = [
  { id: "pinv-1", principal_company: "PT Prima Office Supplies", so_number: "SO-20260625-003", status: "overdue", deadline: "2026-07-30T10:00:00Z", total_amount: 18750000 },
  { id: "pinv-2", principal_company: "PT Cahaya Utama Indonesia", so_number: "SO-20260701-001", status: "ready_to_pay", deadline: "2026-08-02T10:00:00Z", total_amount: 45250000 },
];
