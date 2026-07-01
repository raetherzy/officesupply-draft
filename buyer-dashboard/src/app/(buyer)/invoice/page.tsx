"use client";

import { invoices } from "@/lib/mock-data";
import Link from "next/link";

const statusColors: Record<string, string> = {
  draft: "bg-[#f5f5f5] text-[#666666]",
  issued: "bg-[#dbeafe] text-[#1e40af]",
  current: "bg-[#fef3c7] text-[#92400e]",
  overdue: "bg-[#fee2e2] text-[#991b1b]",
  paid: "bg-[#d1fae5] text-[#065f46]",
};

const statusLabels: Record<string, string> = {
  draft: "Draft",
  issued: "Issued",
  current: "Current",
  overdue: "Overdue",
  paid: "Paid",
};

export default function InvoiceListPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-black tracking-tight">Invoice</h1>
        <p className="text-sm text-[#666666] mt-1">Daftar invoice yang perlu dibayar (status Current)</p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {invoices.map((inv) => (
          <Link
            key={inv.id}
            href={`/invoice/${inv.id}`}
            className="group block rounded-lg border border-[#e5e5e5] bg-white hover:border-[#d4d4d4] transition-colors overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm font-semibold text-black">{inv.invoice_number}</p>
                  <p className="text-xs text-[#666666] mt-0.5">{inv.so_number}</p>
                </div>
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${statusColors[inv.status]}`}>
                  {statusLabels[inv.status]}
                </span>
              </div>
              <div className="flex items-end justify-between mt-3">
                <div>
                  <p className="text-xs text-[#888888]">
                    Due: {new Date(inv.due_date).toLocaleDateString("id-ID")}
                  </p>
                </div>
                <p className="text-xl font-bold text-black tracking-tight">Rp {(inv.total_amount / 1000000).toFixed(1)}M</p>
              </div>
              {inv.status === "current" && (
                <div className="mt-4 pt-4 border-t border-[#f0f0f0]">
                  <span className="text-xs font-semibold text-black">Bayar sekarang →</span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
