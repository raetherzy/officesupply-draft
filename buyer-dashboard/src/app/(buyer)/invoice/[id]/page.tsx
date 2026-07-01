"use client";

import { useParams } from "next/navigation";
import { invoices } from "@/lib/mock-data";
import Link from "next/link";

const statusStyles: Record<string, string> = {
  draft: "bg-[#f5f5f5] text-[#666666]",
  issued: "bg-[#dbeafe] text-[#1e40af] border border-[#bfdbfe]",
  current: "bg-[#fef3c7] text-[#92400e] border border-[#fde68a]",
  overdue: "bg-[#fee2e2] text-[#991b1b] border border-[#fecaca]",
  paid: "bg-[#d1fae5] text-[#065f46] border border-[#a7f3d0]",
};

const statusLabels: Record<string, string> = {
  draft: "Draft",
  issued: "Issued",
  current: "Current",
  overdue: "Overdue",
  paid: "Paid",
};

export default function InvoiceDetailPage() {
  const params = useParams();
  const inv = invoices.find((i) => i.id === params.id);

  if (!inv) {
    return (
      <div className="text-center py-20">
        <p className="text-[#666666] font-medium">Invoice tidak ditemukan.</p>
        <Link href="/invoice" className="text-sm font-semibold text-black hover:underline mt-2 inline-block transition-colors">
          ← Kembali
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <Link href="/invoice" className="font-semibold text-black hover:underline transition-colors">
          Invoice
        </Link>
        <span className="text-[#cccccc]">/</span>
        <span className="font-semibold text-black">{inv.invoice_number}</span>
      </div>

      {/* Header Card */}
      <div className="rounded-lg border border-[#e5e5e5] bg-white p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-black tracking-tight">{inv.invoice_number}</h1>
            <p className="text-sm text-[#666666] mt-1">{inv.so_number}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#666666] bg-[#f5f5f5] rounded-md px-2.5 py-1">
                Issued: {new Date(inv.issued_at).toLocaleDateString("id-ID")}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#666666] bg-[#f5f5f5] rounded-md px-2.5 py-1">
                Due: {new Date(inv.due_date).toLocaleDateString("id-ID")}
              </span>
            </div>
          </div>
          <span className={`text-[10px] font-semibold px-3 py-1.5 rounded-full ${statusStyles[inv.status]}`}>
            {statusLabels[inv.status]}
          </span>
        </div>

        {/* Pay Button */}
        {inv.status === "current" && (
          <div className="flex gap-3 mt-5 pt-5 border-t border-[#e5e5e5]">
            <Link
              href="/payment"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white text-sm font-semibold rounded-md hover:bg-[#333333] transition-colors"
            >
              Bayar Invoice
            </Link>
          </div>
        )}
      </div>

      {/* Items Table */}
      <div className="rounded-lg border border-[#e5e5e5] bg-white overflow-hidden">
        <div className="px-6 py-4 border-b border-[#e5e5e5]">
          <h2 className="text-sm font-bold text-black tracking-tight">Detail Invoice</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
              <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-3">Deskripsi</th>
              <th className="text-center text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-3">Qty</th>
              <th className="text-right text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-3">Harga Satuan</th>
              <th className="text-right text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-3">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0f0f0]">
            {inv.items.map((item, i) => (
              <tr key={i} className="hover:bg-[#fafafa] transition-colors">
                <td className="px-6 py-3.5 text-sm font-medium text-black">{item.description}</td>
                <td className="px-6 py-3.5 text-sm text-[#666666] text-center">{item.qty}</td>
                <td className="px-6 py-3.5 text-sm text-[#666666] text-right">Rp {(item.unit_price / 1000).toFixed(0)}K</td>
                <td className="px-6 py-3.5 text-sm font-semibold text-black text-right">Rp {(item.total / 1000).toFixed(0)}K</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-[#e5e5e5] bg-[#fafafa]">
              <td colSpan={3} className="px-6 py-3.5 text-sm font-bold text-black text-right">Grand Total:</td>
              <td className="px-6 py-3.5 text-sm font-bold text-black text-right">
                Rp {(inv.total_amount / 1000000).toFixed(1)}M
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
