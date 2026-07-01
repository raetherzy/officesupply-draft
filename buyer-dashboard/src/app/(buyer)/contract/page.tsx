"use client";

import { contracts } from "@/lib/mock-data";
import Link from "next/link";

const statusColors: Record<string, string> = {
  contract_draft: "bg-[#f5f5f5] text-[#666666]",
  contract_finalized: "bg-[#dbeafe] text-[#1e40af]",
  contract_signed_buyer: "bg-[#e0e7ff] text-[#3730a3]",
  contract_signed_principal: "bg-[#fce7f3] text-[#9d174d]",
  contract_active: "bg-[#d1fae5] text-[#065f46]",
  converted_to_so: "bg-[#ede9fe] text-[#5b21b6]",
  contract_expired: "bg-[#fee2e2] text-[#991b1b]",
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

export default function ContractListPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-black tracking-tight">Contract</h1>
        <p className="text-sm text-[#666666] mt-1">Kontrak harga aktif dan riwayat kontrak perusahaan Anda</p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {contracts.map((ct) => (
          <Link
            key={ct.id}
            href={`/contract/${ct.id}`}
            className="group block rounded-lg border border-[#e5e5e5] bg-white hover:border-[#d4d4d4] transition-colors overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm font-semibold text-black">{ct.ct_number}</p>
                  <p className="text-xs text-[#666666] mt-1">
                    {ct.valid_from} — {ct.valid_until}
                  </p>
                </div>
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${statusColors[ct.status]}`}>
                  {statusLabels[ct.status]}
                </span>
              </div>
              <div className="space-y-2.5">
                {ct.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <span className="text-[#666666] truncate max-w-[60%]">{item.product_name}</span>
                    <span className="text-black font-semibold">
                      Rp {(item.unit_price / 1000).toFixed(0)}K
                      <span className="text-xs text-[#888888] font-normal ml-1">(min {item.qty_min})</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
