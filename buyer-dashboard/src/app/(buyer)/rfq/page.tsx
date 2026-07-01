"use client";

import { rfqs } from "@/lib/mock-data";
import Link from "next/link";

const statusColors: Record<string, string> = {
  rfq_draft: "bg-[#f5f5f5] text-[#666666]",
  rfq_submitted: "bg-[#fef3c7] text-[#92400e]",
  rfq_in_review: "bg-[#dbeafe] text-[#1e40af]",
  rfq_rejected: "bg-[#fee2e2] text-[#991b1b]",
  rfq_expired: "bg-[#f5f5f5] text-[#999999]",
};

const statusLabels: Record<string, string> = {
  rfq_draft: "Draft",
  rfq_submitted: "Submitted",
  rfq_in_review: "In Review",
  rfq_rejected: "Rejected",
  rfq_expired: "Expired",
};

export default function RfqListPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-black tracking-tight">RFQ (Request for Quotation)</h1>
          <p className="text-sm text-[#666666] mt-1">
            Ajukan permintaan penawaran untuk produk reguler maupun produk cetak
          </p>
        </div>
        <Link
          href="/rfq/create"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white text-sm font-semibold rounded-md transition-colors hover:bg-[#333333] whitespace-nowrap"
        >
          + Buat RFQ
        </Link>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-[#e5e5e5] bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
                <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-4">No. RFQ</th>
                <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-4">Tanggal</th>
                <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-4">Item</th>
                <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-4">Catatan</th>
                <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-4">Status</th>
                <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f0f0]">
              {rfqs.map((rfq) => (
                <tr key={rfq.id} className="hover:bg-[#fafafa] transition-colors">
                  <td className="px-6 py-4">
                    <Link href={`/rfq/${rfq.id}`} className="text-sm font-semibold text-black hover:underline transition-colors">
                      {rfq.rfq_number}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#666666]">
                    {new Date(rfq.created_at).toLocaleDateString("id-ID")}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#666666]">{rfq.items.length} produk</td>
                  <td className="px-6 py-4 text-sm text-[#666666] max-w-[200px] truncate">{rfq.notes || "—"}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${statusColors[rfq.status]}`}>
                      {statusLabels[rfq.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`/rfq/${rfq.id}`} className="text-xs font-semibold text-black hover:underline transition-colors">
                      Detail →
                    </Link>
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
