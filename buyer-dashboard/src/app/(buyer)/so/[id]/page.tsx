"use client";

import { useParams } from "next/navigation";
import { salesOrders } from "@/lib/mock-data";
import Link from "next/link";

const statusStyles: Record<string, string> = {
  draft: "bg-[#f5f5f5] text-[#666666]",
  submitted: "bg-[#fef3c7] text-[#92400e] border border-[#fde68a]",
  rejected: "bg-[#fee2e2] text-[#991b1b] border border-[#fecaca]",
  approved: "bg-[#dbeafe] text-[#1e40af] border border-[#bfdbfe]",
  confirmed: "bg-[#e0e7ff] text-[#3730a3] border border-[#c7d2fe]",
  sent_to_principal: "bg-[#fce7f3] text-[#9d174d] border border-[#fbcfe8]",
  consolidating: "bg-[#fefce8] text-[#854d0e] border border-[#fde68a]",
  ready_to_be_picked_up: "bg-[#ede9fe] text-[#5b21b6] border border-[#ddd6fe]",
  delivered: "bg-[#d1fae5] text-[#065f46] border border-[#a7f3d0]",
  expired: "bg-[#f5f5f5] text-[#999999] border border-[#e5e5e5]",
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

export default function SODetailPage() {
  const params = useParams();
  const so = salesOrders.find((s) => s.id === params.id);

  if (!so) {
    return (
      <div className="text-center py-20">
        <p className="text-[#666666] font-medium">Sales Order tidak ditemukan.</p>
        <Link href="/so" className="text-sm font-semibold text-black hover:underline mt-2 inline-block transition-colors">
          ← Kembali ke daftar
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <Link href="/so" className="font-semibold text-black hover:underline transition-colors">
          Sales Orders
        </Link>
        <span className="text-[#d4d4d4]">/</span>
        <span className="font-semibold text-black">{so.so_number}</span>
      </div>

      {/* Header Card */}
      <div className="rounded-lg border border-[#e5e5e5] bg-white p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-black tracking-tight">{so.so_number}</h1>
            <p className="text-sm text-[#666666] mt-1">
              Dibuat {new Date(so.created_at).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#666666] bg-[#f5f5f5] rounded-md px-2.5 py-1">
                {so.payment_term}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#666666] bg-[#f5f5f5] rounded-md px-2.5 py-1">
                {so.delivery_term === "franco" ? "Franco" : "Non-Franco"}
              </span>
            </div>
          </div>
          <span className={`text-[10px] font-semibold px-3 py-1.5 rounded-full ${statusStyles[so.status]}`}>
            {statusLabels[so.status]}
          </span>
        </div>

        {/* Approval Actions */}
        {so.status === "submitted" && (
          <div className="flex gap-3 mt-5 pt-5 border-t border-[#e5e5e5]">
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white text-sm font-medium rounded-md hover:bg-[#1a1a1a] transition-colors">
              Approve SO
            </button>
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#666666] border border-[#e5e5e5] text-sm font-medium rounded-md hover:bg-[#fafafa] transition-colors">
              Reject SO
            </button>
          </div>
        )}
      </div>

      {/* Info Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <InfoCard label="Total Produk" value={`Rp ${(so.total_amount / 1000000).toFixed(1)}M`} />
        <InfoCard label="Ongkir Total" value={`Rp ${(so.shipping_cost / 1000).toFixed(0)}K`} />
        <InfoCard label="Grand Total" value={`Rp ${(so.grand_total / 1000000).toFixed(1)}M`} highlight />
      </div>

      {/* Items Table */}
      <div className="rounded-lg border border-[#e5e5e5] bg-white overflow-hidden">
        <div className="px-6 py-4 border-b border-[#e5e5e5]">
          <h2 className="text-sm font-semibold text-black tracking-tight">Item Produk</h2>
        </div>
        <div className="overflow-x-auto">
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
              {so.items.map((item, i) => (
                <tr key={i} className="hover:bg-[#fafafa] transition-colors">
                  <td className="px-6 py-3.5 text-sm font-medium text-black">{item.product_name}</td>
                  <td className="px-6 py-3.5 text-sm text-[#666666]">{item.qty}</td>
                  <td className="px-6 py-3.5 text-sm text-[#666666]">Rp {(item.unit_price / 1000).toFixed(0)}K</td>
                  <td className="px-6 py-3.5 text-sm font-semibold text-black">Rp {(item.subtotal / 1000000).toFixed(1)}M</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Shipping Breakdown */}
      <div className="rounded-lg border border-[#e5e5e5] bg-white overflow-hidden">
        <div className="px-6 py-4 border-b border-[#e5e5e5]">
          <h2 className="text-sm font-semibold text-black tracking-tight">Breakdown Ongkir (Multi-Origin)</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
                <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-3">Origin</th>
                <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-3">Chargeable Weight</th>
                <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-3">Ongkir</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f0f0]">
              {so.origins.map((o, i) => (
                <tr key={i} className="hover:bg-[#fafafa] transition-colors">
                  <td className="px-6 py-3.5 text-sm font-medium text-black">{o.origin_name}</td>
                  <td className="px-6 py-3.5 text-sm text-[#666666]">{o.chargeable_weight_kg} kg</td>
                  <td className="px-6 py-3.5 text-sm font-semibold text-black">Rp {(o.shipping_cost / 1000).toFixed(0)}K</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Notes */}
      {so.notes && (
        <div className="rounded-lg border border-[#e5e5e5] bg-[#fafafa] p-5">
          <p className="text-sm font-semibold text-black">Catatan</p>
          <p className="text-sm text-[#666666] mt-1 leading-relaxed">{so.notes}</p>
        </div>
      )}
    </div>
  );
}

function InfoCard({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div
      className={`rounded-lg p-5 border transition-colors ${
        highlight
          ? "border-[#d4d4d4] bg-[#fafafa]"
          : "border-[#e5e5e5] bg-white"
      }`}
    >
      <p className="text-[11px] font-medium text-[#888888] uppercase tracking-wider mb-1">{label}</p>
      <p className={`text-xl font-semibold tracking-tight ${highlight ? "text-black" : "text-black"}`}>{value}</p>
    </div>
  );
}
