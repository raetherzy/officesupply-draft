"use client";

import { quotations } from "@/lib/mock-data";
import Link from "next/link";

const statusColors: Record<string, string> = {
  quotation_draft: "bg-[#f5f5f5] text-[#666666]",
  quotation_sent: "bg-[#fef3c7] text-[#92400e]",
  quotation_under_revision: "bg-[#dbeafe] text-[#1e40af]",
  quotation_rejected: "bg-[#fee2e2] text-[#991b1b]",
};

const statusLabels: Record<string, string> = {
  quotation_draft: "Draft",
  quotation_sent: "Sent",
  quotation_under_revision: "Under Revision",
  quotation_rejected: "Rejected",
};

export default function QuotationListPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-black tracking-tight">Quotation</h1>
        <p className="text-sm text-[#666666] mt-1">Daftar penawaran harga yang perlu approval Anda</p>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-[#e5e5e5] bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
                <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-4">No. QN</th>
                <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-4">Tanggal</th>
                <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-4">Berlaku Sampai</th>
                <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-4">Total</th>
                <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-4">Status</th>
                <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f0f0]">
              {quotations.map((qn) => (
                <tr key={qn.id} className="hover:bg-[#fafafa] transition-colors">
                  <td className="px-6 py-4">
                    <Link href={`/quotation/${qn.id}`} className="text-sm font-semibold text-black hover:underline transition-colors">
                      {qn.qn_number}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#666666]">
                    {new Date(qn.created_at).toLocaleDateString("id-ID")}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#666666]">
                    {new Date(qn.valid_until).toLocaleDateString("id-ID")}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-black">
                    Rp {(qn.total_amount / 1000000).toFixed(1)}M
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${statusColors[qn.status]}`}>
                      {statusLabels[qn.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`/quotation/${qn.id}`} className="text-xs font-semibold text-black hover:underline transition-colors">
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
