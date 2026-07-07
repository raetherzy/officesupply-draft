"use client";

import Link from "next/link";
import { useState } from "react";
import { principalPOs } from "@/lib/principal-mock-data";
import { PoStatus } from "@/lib/principal-types";

const statusLabel: Record<PoStatus, string> = {
  sent_to_principal: "PO Masuk",
  consolidating: "Konsolidasi",
  ready_to_delivery: "Siap Kirim",
  done: "Selesai",
};

const statusColor: Record<PoStatus, string> = {
  sent_to_principal: "bg-blue-50 text-blue-700 border-blue-200",
  consolidating: "bg-amber-50 text-amber-700 border-amber-200",
  ready_to_delivery: "bg-emerald-50 text-emerald-700 border-emerald-200",
  done: "bg-[#f5f5f5] text-[#888888] border-[#e5e5e5]",
};

const tabs: { label: string; value: string }[] = [
  { label: "Semua", value: "all" },
  { label: "PO Masuk", value: "sent_to_principal" },
  { label: "Konsolidasi", value: "consolidating" },
  { label: "Siap Kirim", value: "ready_to_delivery" },
  { label: "Selesai", value: "done" },
];

function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

export default function PrincipalPOListPage() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredPOs =
    activeTab === "all"
      ? principalPOs
      : principalPOs.filter((po) => po.status === activeTab);

  return (
    <div className="space-y-5">
      {/* Page Title */}
      <div>
        <h1 className="text-xl font-semibold text-black">PO Masuk</h1>
        <p className="mt-0.5 text-sm text-[#888888]">Purchase order dari buyer — proses inbound & pengiriman</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`rounded-md border px-3 py-1.5 text-[13px] font-medium transition-colors ${
              activeTab === tab.value
                ? "border-black bg-black text-white"
                : "border-[#e5e5e5] bg-white text-[#666666] hover:border-[#d4d4d4] hover:text-black"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-[#e5e5e5] bg-white">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
              <th className="px-6 py-3 text-[12px] font-medium text-[#888888]">No. PO</th>
              <th className="px-6 py-3 text-[12px] font-medium text-[#888888]">SO Reference</th>
              <th className="px-6 py-3 text-[12px] font-medium text-[#888888]">Buyer</th>
              <th className="px-6 py-3 text-[12px] font-medium text-[#888888]">Kota Tujuan</th>
              <th className="px-6 py-3 text-[12px] font-medium text-[#888888]">Tanggal</th>
              <th className="px-6 py-3 text-[12px] font-medium text-[#888888]">Items</th>
              <th className="px-6 py-3 text-[12px] font-medium text-[#888888]">Total</th>
              <th className="px-6 py-3 text-[12px] font-medium text-[#888888]">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0f0f0]">
            {filteredPOs.map((po) => (
              <tr key={po.id} className="transition-colors hover:bg-[#fafafa]">
                <td className="px-6 py-4">
                  <Link href={`/principal/po/${po.id}`} className="text-black font-medium hover:underline">
                    {po.po_number}
                  </Link>
                </td>
                <td className="px-6 py-4 text-[13px] text-[#666666]">{po.so_number}</td>
                <td className="px-6 py-4 text-[13px] text-[#666666]">{po.buyer_company}</td>
                <td className="px-6 py-4 text-[13px] text-[#666666]">{po.delivery_address.city}</td>
                <td className="px-6 py-4 text-[13px] text-[#666666]">{formatDate(po.created_at)}</td>
                <td className="px-6 py-4 text-[13px] text-[#666666]">{po.items.length} produk</td>
                <td className="px-6 py-4 text-[13px] font-medium text-black">{formatRupiah(po.total_amount)}</td>
                <td className="px-6 py-4">
                  <span className={`inline-block rounded border px-2 py-0.5 text-[11px] font-medium ${statusColor[po.status]}`}>
                    {statusLabel[po.status]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
