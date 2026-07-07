"use client";

import Link from "next/link";
import { principalDashboardStats, principalPOs } from "@/lib/principal-mock-data";

const poStatusLabel: Record<string, string> = {
  sent_to_principal: "PO Masuk",
  consolidating: "Konsolidasi",
  ready_to_delivery: "Siap Kirim",
  done: "Selesai",
};

const poStatusColor: Record<string, string> = {
  sent_to_principal: "bg-blue-50 text-blue-700 border-blue-200",
  consolidating: "bg-amber-50 text-amber-700 border-amber-200",
  ready_to_delivery: "bg-emerald-50 text-emerald-700 border-emerald-200",
  done: "bg-[#f5f5f5] text-[#888888] border-[#e5e5e5]",
};

function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

const kpiCards = [
  { label: "PO Masuk", value: principalDashboardStats.incoming_po, href: "/principal/po", icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" },
  { label: "Siap Kirim", value: principalDashboardStats.ready_to_delivery, href: "/principal/delivery", icon: "M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" },
  { label: "Inbound Pending", value: principalDashboardStats.pending_inbound, href: "/principal/inbound", icon: "M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" },
  { label: "Invoice Overdue", value: principalDashboardStats.overdue_invoice, href: "/principal/invoice", icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" },
];

const recentPOs = [...principalPOs].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

export default function PrincipalDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-xl font-semibold text-black">Dashboard Principal</h1>
        <p className="mt-0.5 text-sm text-[#888888]">Ringkasan pesanan, inbound, dan invoice</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {kpiCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-lg border border-[#e5e5e5] bg-white p-4 transition-colors hover:border-[#d4d4d4]"
          >
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-medium text-[#888888]">{card.label}</p>
              <svg className="h-4 w-4 text-[#888888]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d={card.icon} />
              </svg>
            </div>
            <p className="mt-2 text-2xl font-bold text-black">{card.value}</p>
          </Link>
        ))}
      </div>

      {/* Recent PO Table */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-black">PO Terbaru</h2>
          <Link href="/principal/po" className="text-[13px] font-medium text-black hover:underline">
            Lihat Semua →
          </Link>
        </div>
        <div className="overflow-hidden rounded-lg border border-[#e5e5e5] bg-white">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
                <th className="px-4 py-2.5 text-[12px] font-medium text-[#888888]">No. PO</th>
                <th className="px-4 py-2.5 text-[12px] font-medium text-[#888888]">Buyer</th>
                <th className="px-4 py-2.5 text-[12px] font-medium text-[#888888]">Tanggal</th>
                <th className="px-4 py-2.5 text-[12px] font-medium text-[#888888]">Total</th>
                <th className="px-4 py-2.5 text-[12px] font-medium text-[#888888]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f0f0]">
              {recentPOs.map((po) => (
                <tr key={po.id} className="transition-colors hover:bg-[#fafafa]">
                  <td className="px-4 py-3">
                    <Link href={`/principal/po/${po.id}`} className="text-black font-medium hover:underline">
                      {po.po_number}
                    </Link>
                    <p className="text-[11px] text-[#888888]">{po.so_number}</p>
                  </td>
                  <td className="px-4 py-3 text-[13px] text-[#666666]">{po.buyer_company}</td>
                  <td className="px-4 py-3 text-[13px] text-[#666666]">{formatDate(po.created_at)}</td>
                  <td className="px-4 py-3 text-[13px] font-medium text-black">{formatRupiah(po.total_amount)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block rounded border px-2 py-0.5 text-[11px] font-medium ${poStatusColor[po.status]}`}>
                      {poStatusLabel[po.status]}
                    </span>
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
