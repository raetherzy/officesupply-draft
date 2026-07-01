"use client";

import { useParams } from "next/navigation";
import { quotations } from "@/lib/mock-data";
import Link from "next/link";

const statusStyles: Record<string, string> = {
  quotation_draft: "bg-[#f5f5f5] text-[#666666]",
  quotation_sent: "bg-[#fef3c7] text-[#92400e] border border-[#fde68a]",
  quotation_under_revision: "bg-[#dbeafe] text-[#1e40af] border border-[#bfdbfe]",
  quotation_rejected: "bg-[#fee2e2] text-[#991b1b] border border-[#fecaca]",
};

const statusLabels: Record<string, string> = {
  quotation_draft: "Draft",
  quotation_sent: "Sent",
  quotation_under_revision: "Under Revision",
  quotation_rejected: "Rejected",
};

export default function QuotationDetailPage() {
  const params = useParams();
  const qn = quotations.find((q) => q.id === params.id);

  if (!qn) {
    return (
      <div className="text-center py-20">
        <p className="text-[#666666] font-medium">Quotation tidak ditemukan.</p>
        <Link href="/quotation" className="text-sm font-semibold text-black hover:underline mt-2 inline-block transition-colors">
          ← Kembali
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <Link href="/quotation" className="font-semibold text-black hover:underline transition-colors">
          Quotation
        </Link>
        <span className="text-[#cccccc]">/</span>
        <span className="font-semibold text-black">{qn.qn_number}</span>
      </div>

      {/* Header Card */}
      <div className="rounded-lg border border-[#e5e5e5] bg-white p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-black tracking-tight">{qn.qn_number}</h1>
            <p className="text-sm text-[#666666] mt-1">
              Dibuat {new Date(qn.created_at).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })}
              {" · "}Berlaku sampai {new Date(qn.valid_until).toLocaleDateString("id-ID")}
            </p>
          </div>
          <span className={`text-[10px] font-semibold px-3 py-1.5 rounded-full ${statusStyles[qn.status]}`}>
            {statusLabels[qn.status]}
          </span>
        </div>

        {/* Approval Actions */}
        {qn.status === "quotation_sent" && (
          <div className="flex flex-wrap gap-3 mt-5 pt-5 border-t border-[#e5e5e5]">
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white text-sm font-semibold rounded-md hover:bg-[#333333] transition-colors">
              Approve Quotation
            </button>
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#666666] border border-[#e5e5e5] text-sm font-semibold rounded-md hover:bg-[#fafafa] transition-colors">
              Reject
            </button>
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#666666] border border-[#e5e5e5] text-sm font-semibold rounded-md hover:bg-[#fafafa] transition-colors">
              Request Revision
            </button>
          </div>
        )}
      </div>

      {/* Items Table */}
      <div className="rounded-lg border border-[#e5e5e5] bg-white overflow-hidden">
        <div className="px-6 py-4 border-b border-[#e5e5e5]">
          <h2 className="text-sm font-bold text-black tracking-tight">Item Quotation</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
              <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-3">Produk</th>
              <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-3">Qty</th>
              <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-3">Harga Satuan</th>
              <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-3">Subtotal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0f0f0]">
            {qn.items.map((item, i) => (
              <tr key={i} className="hover:bg-[#fafafa] transition-colors">
                <td className="px-6 py-3.5 text-sm font-medium text-black">{item.product_name}</td>
                <td className="px-6 py-3.5 text-sm text-[#666666]">{item.qty}</td>
                <td className="px-6 py-3.5 text-sm text-[#666666]">Rp {(item.unit_price / 1000).toFixed(0)}K</td>
                <td className="px-6 py-3.5 text-sm font-semibold text-black">Rp {(item.subtotal / 1000000).toFixed(1)}M</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-[#e5e5e5] bg-[#fafafa]">
              <td colSpan={3} className="px-6 py-3.5 text-sm font-bold text-black text-right">Total:</td>
              <td className="px-6 py-3.5 text-sm font-bold text-black">Rp {(qn.total_amount / 1000000).toFixed(1)}M</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Notes */}
      {qn.notes && (
        <div className="rounded-lg bg-[#fafafa] border border-[#e5e5e5] p-5">
          <p className="text-sm font-semibold text-[#333333]">Catatan</p>
          <p className="text-sm text-[#666666] mt-1 leading-relaxed">{qn.notes}</p>
        </div>
      )}
    </div>
  );
}
