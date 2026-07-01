"use client";

import { salesOrders } from "@/lib/mock-data";
import Link from "next/link";

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
};

const statusLabels: Record<string, string> = {
  draft: "Draft",
  submitted: "Submitted",
  rejected: "Rejected",
  approved: "Approved",
  confirmed: "Confirmed",
  sent_to_principal: "Sent to Principal",
  consolidating: "Consolidating",
  ready_to_be_picked_up: "Ready Pickup",
  delivered: "Delivered",
  expired: "Expired",
};

export default function SOListPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-black tracking-tight">Sales Orders</h1>
          <p className="text-sm text-[#666666] mt-1">Daftar semua Sales Order perusahaan Anda</p>
        </div>
        <Link
          href="/so/create"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-black text-white text-sm font-medium rounded-md hover:bg-[#1a1a1a] transition-colors whitespace-nowrap"
        >
          + Buat SO Baru
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {["Semua", "Submitted", "Approved", "Ready Pickup", "Delivered", "Expired"].map((tab, i) => (
          <button
            key={tab}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              i === 0
                ? "bg-black text-white"
                : "bg-white border border-[#e5e5e5] text-[#666666] hover:border-[#d4d4d4] hover:text-black"
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
                <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-4">No. SO</th>
                <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-4">Tanggal</th>
                <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-4">Item</th>
                <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-4">Total</th>
                <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-4">Status</th>
                <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f0f0]">
              {salesOrders.map((so) => (
                <tr key={so.id} className="hover:bg-[#fafafa] transition-colors">
                  <td className="px-6 py-4">
                    <Link href={`/so/${so.id}`} className="text-sm font-semibold text-black hover:underline transition-colors">
                      {so.so_number}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#666666]">
                    {new Date(so.created_at).toLocaleDateString("id-ID")}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#666666]">{so.items.length} produk</td>
                  <td className="px-6 py-4 text-sm font-semibold text-black">
                    Rp {(so.grand_total / 1000).toFixed(0)}K
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${statusColors[so.status]}`}>
                      {statusLabels[so.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/so/${so.id}`}
                      className="text-xs font-semibold text-black hover:underline transition-colors"
                    >
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
