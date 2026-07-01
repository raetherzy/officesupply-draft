"use client";

import { useParams } from "next/navigation";
import { contracts } from "@/lib/mock-data";
import Link from "next/link";

const statusStyles: Record<string, string> = {
  contract_draft: "bg-[#f5f5f5] text-[#666666]",
  contract_finalized: "bg-[#dbeafe] text-[#1e40af] border border-[#bfdbfe]",
  contract_signed_buyer: "bg-[#e0e7ff] text-[#3730a3] border border-[#c7d2fe]",
  contract_signed_principal: "bg-[#fce7f3] text-[#9d174d] border border-[#fbcfe8]",
  contract_active: "bg-[#d1fae5] text-[#065f46] border border-[#a7f3d0]",
  converted_to_so: "bg-[#ede9fe] text-[#5b21b6] border border-[#ddd6fe]",
  contract_expired: "bg-[#fee2e2] text-[#991b1b] border border-[#fecaca]",
};

const statusLabels: Record<string, string> = {
  contract_draft: "Draft",
  contract_finalized: "Finalized",
  contract_signed_buyer: "Signed Buyer",
  contract_signed_principal: "Signed Principal",
  contract_active: "Active",
  converted_to_so: "Converted to SO",
  contract_expired: "Expired",
};

export default function ContractDetailPage() {
  const params = useParams();
  const ct = contracts.find((c) => c.id === params.id);

  if (!ct) {
    return (
      <div className="text-center py-20">
        <p className="text-[#666666] font-medium">Contract tidak ditemukan.</p>
        <Link href="/contract" className="text-sm font-semibold text-black hover:underline mt-2 inline-block transition-colors">
          ← Kembali
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <Link href="/contract" className="font-semibold text-black hover:underline transition-colors">
          Contract
        </Link>
        <span className="text-[#cccccc]">/</span>
        <span className="font-semibold text-black">{ct.ct_number}</span>
      </div>

      {/* Header Card */}
      <div className="rounded-lg border border-[#e5e5e5] bg-white p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-black tracking-tight">{ct.ct_number}</h1>
            <p className="text-sm text-[#666666] mt-1">
              Berlaku: {ct.valid_from} — {ct.valid_until}
            </p>
          </div>
          <span className={`text-[10px] font-semibold px-3 py-1.5 rounded-full ${statusStyles[ct.status]}`}>
            {statusLabels[ct.status]}
          </span>
        </div>
      </div>

      {/* Items Table */}
      <div className="rounded-lg border border-[#e5e5e5] bg-white overflow-hidden">
        <div className="px-6 py-4 border-b border-[#e5e5e5]">
          <h2 className="text-sm font-bold text-black tracking-tight">Item Contract</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
              <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-3">Produk</th>
              <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-3">Qty Min</th>
              <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-3">Harga Satuan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0f0f0]">
            {ct.items.map((item, i) => (
              <tr key={i} className="hover:bg-[#fafafa] transition-colors">
                <td className="px-6 py-3.5 text-sm font-medium text-black">{item.product_name}</td>
                <td className="px-6 py-3.5 text-sm text-[#666666]">{item.qty_min}</td>
                <td className="px-6 py-3.5 text-sm font-semibold text-black">Rp {(item.unit_price / 1000).toFixed(0)}K</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
