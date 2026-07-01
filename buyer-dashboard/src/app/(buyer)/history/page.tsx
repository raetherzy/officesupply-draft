"use client";

import { salesOrders, rfqs, quotations, contracts, invoices } from "@/lib/mock-data";

interface ActivityItem {
  type: "so" | "rfq" | "quotation" | "contract" | "invoice";
  id: string;
  number: string;
  date: string;
  amount?: number;
  status: string;
}

const allActivities: ActivityItem[] = [
  ...salesOrders.map((so) => ({ type: "so" as const, id: so.id, number: so.so_number, date: so.created_at, amount: so.grand_total, status: so.status })),
  ...rfqs.map((rfq) => ({ type: "rfq" as const, id: rfq.id, number: rfq.rfq_number, date: rfq.created_at, status: rfq.status })),
  ...quotations.map((qn) => ({ type: "quotation" as const, id: qn.id, number: qn.qn_number, date: qn.created_at, amount: qn.total_amount, status: qn.status })),
  ...contracts.map((ct) => ({ type: "contract" as const, id: ct.id, number: ct.ct_number, date: ct.created_at, status: ct.status })),
  ...invoices.map((inv) => ({ type: "invoice" as const, id: inv.id, number: inv.invoice_number, date: inv.issued_at, amount: inv.total_amount, status: inv.status })),
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const typeLabels: Record<string, string> = {
  so: "Sales Order",
  rfq: "RFQ",
  quotation: "Quotation",
  contract: "Contract",
  invoice: "Invoice",
};

const typeColors: Record<string, string> = {
  so: "bg-neutral-100 text-black",
  rfq: "bg-neutral-100 text-black",
  quotation: "bg-neutral-100 text-black",
  contract: "bg-neutral-100 text-black",
  invoice: "bg-neutral-100 text-black",
};

const statusColors: Record<string, string> = {
  draft: "bg-[#f5f5f5] text-[#666666]",
  submitted: "bg-[#fef3c7] text-[#92400e]",
  rejected: "bg-[#fee2e2] text-[#991b1b]",
  approved: "bg-[#dbeafe] text-[#1e40af]",
  confirmed: "bg-[#e0e7ff] text-[#3730a3]",
  sent_to_principal: "bg-[#fce7f3] text-[#9d174d]",
  consolidating: "bg-[#fefce8] text-[#854d0e]",
  ready_to_be_picked_up: "bg-[#ede9fe] text-[#5b21b6]",
  delivered: "bg-[#d1fae5] text-[#065f46]",
  expired: "bg-[#f5f5f5] text-[#999999]",
  rfq_draft: "bg-[#f5f5f5] text-[#666666]",
  rfq_submitted: "bg-[#fef3c7] text-[#92400e]",
  rfq_in_review: "bg-[#dbeafe] text-[#1e40af]",
  rfq_rejected: "bg-[#fee2e2] text-[#991b1b]",
  rfq_expired: "bg-[#f5f5f5] text-[#999999]",
  quotation_draft: "bg-[#f5f5f5] text-[#666666]",
  quotation_sent: "bg-[#fef3c7] text-[#92400e]",
  quotation_under_revision: "bg-[#dbeafe] text-[#1e40af]",
  quotation_rejected: "bg-[#fee2e2] text-[#991b1b]",
  contract_draft: "bg-[#f5f5f5] text-[#666666]",
  contract_finalized: "bg-[#dbeafe] text-[#1e40af]",
  contract_signed_buyer: "bg-[#e0e7ff] text-[#3730a3]",
  contract_signed_principal: "bg-[#fce7f3] text-[#9d174d]",
  contract_active: "bg-[#d1fae5] text-[#065f46]",
  converted_to_so: "bg-[#ede9fe] text-[#5b21b6]",
  contract_expired: "bg-[#fee2e2] text-[#991b1b]",
  issued: "bg-[#dbeafe] text-[#1e40af]",
  current: "bg-[#fef3c7] text-[#92400e]",
  overdue: "bg-[#fee2e2] text-[#991b1b]",
  paid: "bg-[#d1fae5] text-[#065f46]",
};

export default function HistoryPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-black tracking-tight">Histori Transaksi</h1>
        <p className="text-sm text-[#666666] mt-1">Riwayat semua transaksi perusahaan Anda</p>
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {["Semua", "SO", "RFQ", "Quotation", "Contract", "Invoice"].map((tab, i) => (
          <button
            key={tab}
            className={`px-5 py-2 text-sm font-medium rounded-md transition-colors ${
              i === 0
                ? "bg-black text-white"
                : "bg-white border border-[#e5e5e5] text-[#666666] hover:bg-[#fafafa] hover:text-black"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-lg border border-[#e5e5e5] bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
                <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-4">Tipe</th>
                <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-4">Nomor</th>
                <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-4">Tanggal</th>
                <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-4">Jumlah</th>
                <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f0f0]">
              {allActivities.map((act, i) => (
                <tr key={`${act.type}-${act.id}-${i}`} className="hover:bg-[#fafafa] transition-colors">
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-2 text-xs font-semibold px-2.5 py-1 rounded-full ${typeColors[act.type]}`}>
                      {typeLabels[act.type]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-black font-semibold">{act.number}</td>
                  <td className="px-6 py-4 text-sm text-[#666666]">
                    {new Date(act.date).toLocaleDateString("id-ID")}
                  </td>
                  <td className="px-6 py-4 text-sm text-black font-medium">
                    {act.amount ? `Rp ${(act.amount / 1000000).toFixed(1)}M` : "—"}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${statusColors[act.status] || "bg-slate-100 text-slate-600"}`}>
                      {act.status.replace(/_/g, " ")}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
