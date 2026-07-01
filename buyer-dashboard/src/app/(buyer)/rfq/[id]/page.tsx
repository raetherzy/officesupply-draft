"use client";

import { useParams } from "next/navigation";
import { rfqs } from "@/lib/mock-data";
import Link from "next/link";

const statusStyles: Record<string, string> = {
  rfq_draft: "bg-[#f5f5f5] text-[#666666]",
  rfq_submitted: "bg-[#fef3c7] text-[#92400e] border border-[#fde68a]",
  rfq_in_review: "bg-[#dbeafe] text-[#1e40af] border border-[#bfdbfe]",
  rfq_rejected: "bg-[#fee2e2] text-[#991b1b] border border-[#fecaca]",
  rfq_expired: "bg-[#f5f5f5] text-[#999999] border border-[#e5e5e5]",
};

const statusLabels: Record<string, string> = {
  rfq_draft: "Draft",
  rfq_submitted: "Submitted",
  rfq_in_review: "In Review",
  rfq_rejected: "Rejected",
  rfq_expired: "Expired",
};

export default function RfqDetailPage() {
  const params = useParams();
  const rfq = rfqs.find((r) => r.id === params.id);

  if (!rfq) {
    return (
      <div className="text-center py-20">
        <p className="text-[#666666] font-medium">RFQ tidak ditemukan.</p>
        <Link href="/rfq" className="text-sm font-semibold text-black hover:underline mt-2 inline-block transition-colors">
          ← Kembali
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <Link href="/rfq" className="font-semibold text-black hover:underline transition-colors">
          RFQ
        </Link>
        <span className="text-[#cccccc]">/</span>
        <span className="font-semibold text-black">{rfq.rfq_number}</span>
      </div>

      {/* Header Card */}
      <div className="rounded-lg border border-[#e5e5e5] bg-white p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-black tracking-tight">{rfq.rfq_number}</h1>
            <p className="text-sm text-[#666666] mt-1">
              Dibuat {new Date(rfq.created_at).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <span className={`text-[10px] font-semibold px-3 py-1.5 rounded-full ${statusStyles[rfq.status]}`}>
            {statusLabels[rfq.status]}
          </span>
        </div>
      </div>

      {/* Items Table */}
      <div className="rounded-lg border border-[#e5e5e5] bg-white overflow-hidden">
        <div className="px-6 py-4 border-b border-[#e5e5e5]">
          <h2 className="text-sm font-bold text-black tracking-tight">Item RFQ</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
              <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-3">Produk</th>
              <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-3">Qty</th>
              <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-3">Spesifikasi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0f0f0]">
            {rfq.items.map((item, i) => (
              <tr key={i} className="hover:bg-[#fafafa] transition-colors">
                <td className="px-6 py-3.5 text-sm font-medium text-black">{item.product_name}</td>
                <td className="px-6 py-3.5 text-sm text-[#666666]">{item.qty}</td>
                <td className="px-6 py-3.5 text-sm text-[#666666]">{item.specification || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Notes */}
      {rfq.notes && (
        <div className="rounded-lg bg-[#fafafa] border border-[#e5e5e5] p-5">
          <p className="text-sm font-semibold text-[#333333]">Catatan</p>
          <p className="text-sm text-[#666666] mt-1 leading-relaxed">{rfq.notes}</p>
        </div>
      )}
    </div>
  );
}
