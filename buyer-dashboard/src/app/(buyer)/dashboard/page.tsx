"use client";

import { dashboardStats, salesOrders, rfqs, quotations, trackings } from "@/lib/mock-data";
import Link from "next/link";

const kpiCards = [
  { label: "Total Belanja Bulan Ini", value: `Rp ${(dashboardStats.total_spent_this_month / 1000000).toFixed(1)}M`, href: undefined },
  { label: "SO Submitted", value: dashboardStats.submitted_so, href: "/so" },
  { label: "Contract Aktif", value: dashboardStats.active_contracts, href: "/contract" },
  { label: "Pengiriman Aktif", value: dashboardStats.in_transit_shipments, href: "/tracking" },
  { label: "Invoice Current", value: dashboardStats.current_invoices, href: "/invoice" },
  { label: "Total Order", value: dashboardStats.total_orders, href: undefined },
];

const statusStyles: Record<string, string> = {
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

const paymentBadge: Record<string, string> = {
  "TOP 30": "text-[#666666]",
  CBD: "text-[#888888]",
};

export default function DashboardPage() {
  const recentSO = salesOrders.slice(0, 5);
  const pendingRFQ = rfqs.filter((r) => r.status === "rfq_submitted").length;
  const pendingQn = quotations.filter((q) => q.status === "quotation_sent").length;
  const activeTrackings = trackings.filter((t) => t.status !== "delivered").length;

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-black">Dashboard</h1>
        <p className="mt-1 text-sm text-[#888888]">
          Overview transaksi, order, dan status procurement perusahaan Anda.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {kpiCards.map((card) => {
          const inner = (
            <div className="rounded-lg border border-[#e5e5e5] bg-white p-5 transition-colors hover:border-[#d4d4d4]">
              <p className="text-[11px] font-medium uppercase tracking-widest text-[#888888]">{card.label}</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-black">{card.value}</p>
            </div>
          );
          if (card.href) {
            return (
              <Link key={card.label} href={card.href} className="block">
                {inner}
              </Link>
            );
          }
          return <div key={card.label}>{inner}</div>;
        })}
      </div>

      {/* Activity Summary Row */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/rfq" className="rounded-lg border border-[#e5e5e5] bg-white p-4 transition-colors hover:border-[#d4d4d4]">
          <p className="text-[11px] font-medium uppercase tracking-widest text-[#888888]">RFQ Menunggu</p>
          <p className="mt-1 text-2xl font-semibold text-black">{pendingRFQ}</p>
        </Link>
        <Link href="/quotation" className="rounded-lg border border-[#e5e5e5] bg-white p-4 transition-colors hover:border-[#d4d4d4]">
          <p className="text-[11px] font-medium uppercase tracking-widest text-[#888888]">Quotation Pending</p>
          <p className="mt-1 text-2xl font-semibold text-black">{pendingQn}</p>
        </Link>
        <Link href="/tracking" className="rounded-lg border border-[#e5e5e5] bg-white p-4 transition-colors hover:border-[#d4d4d4]">
          <p className="text-[11px] font-medium uppercase tracking-widest text-[#888888]">Pengiriman Aktif</p>
          <p className="mt-1 text-2xl font-semibold text-black">{activeTrackings}</p>
        </Link>
        <Link href="/invoice" className="rounded-lg border border-[#e5e5e5] bg-white p-4 transition-colors hover:border-[#d4d4d4]">
          <p className="text-[11px] font-medium uppercase tracking-widest text-[#888888]">Invoice Unpaid</p>
          <p className="mt-1 text-2xl font-semibold text-black">{dashboardStats.current_invoices}</p>
        </Link>
      </div>

      {/* Recent Sales Orders Table */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-[#888888]">Recent Sales Orders</h2>
          <Link href="/so" className="text-xs font-medium text-black hover:underline">
            Lihat Semua
          </Link>
        </div>
        <div className="overflow-hidden rounded-lg border border-[#e5e5e5] bg-white">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
                <th className="px-4 py-3 text-[11px] font-medium uppercase tracking-wider text-[#888888]">SO Number</th>
                <th className="px-4 py-3 text-[11px] font-medium uppercase tracking-wider text-[#888888]">Tanggal</th>
                <th className="px-4 py-3 text-[11px] font-medium uppercase tracking-wider text-[#888888]">Items</th>
                <th className="px-4 py-3 text-[11px] font-medium uppercase tracking-wider text-[#888888]">Amount</th>
                <th className="px-4 py-3 text-[11px] font-medium uppercase tracking-wider text-[#888888]">Delivery</th>
                <th className="px-4 py-3 text-[11px] font-medium uppercase tracking-wider text-[#888888]">Payment</th>
                <th className="px-4 py-3 text-[11px] font-medium uppercase tracking-wider text-[#888888]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f0f0]">
              {recentSO.map((so) => (
                <tr key={so.id} className="transition-colors hover:bg-[#fafafa]">
                  <td className="px-4 py-3">
                    <Link href={`/so/${so.id}`} className="font-medium text-black hover:underline">
                      {so.so_number}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-[#666666]">
                    {new Date(so.created_at).toLocaleDateString("id-ID")}
                  </td>
                  <td className="px-4 py-3 text-[#666666]">{so.items.length} item</td>
                  <td className="px-4 py-3 font-medium text-black">
                    Rp {(so.grand_total / 1000000).toFixed(1)}M
                  </td>
                  <td className="px-4 py-3 text-[#666666] capitalize">
                    {so.delivery_term === "franco" ? "Franco" : "Non Franco"}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium ${paymentBadge[so.payment_term] || "text-[#666666]"}`}>
                      {so.payment_term}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${statusStyles[so.status] || "bg-[#f5f5f5] text-[#666666]"}`}>
                      {statusLabels[so.status] || so.status}
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
