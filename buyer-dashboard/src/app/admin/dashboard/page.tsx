"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  adminDashboardKpis,
  adminRoleLabels,
  adminRoles,
  internalFinanceInvoices,
  internalFinancePayments,
  internalPrincipalHutang,
  internalPurchasingOrders,
  internalSalesAdminDocs,
} from "@/lib/admin-mock-data";

type AdminRole = (typeof adminRoles)[number];

const statusBadgeStyles: Record<string, string> = {
  current: "bg-[#d1fae5] text-[#065f46]",
  overdue: "bg-[#fee2e2] text-[#991b1b]",
  pending: "bg-[#fef3c7] text-[#92400e]",
  verified: "bg-[#dbeafe] text-[#1e40af]",
  paid: "bg-[#bbf7d0] text-[#166534]",
  authorized: "bg-blue-50 text-blue-700 border border-blue-200",
  sent_to_principal: "bg-amber-50 text-amber-700 border border-amber-200",
  consolidating: "bg-amber-50 text-amber-700 border border-amber-200",
  ready_to_pay: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  ready_to_delivery: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  in_review: "bg-[#dbeafe] text-[#1e40af]",
  "Ready For Quotation": "bg-[#fef3c7] text-[#92400e]",
};

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

export default function AdminDashboardPage() {
  const [role, setRole] = useState<AdminRole>("super_admin");

  const kpis = useMemo(() => {
    return adminDashboardKpis[role] ?? [];
  }, [role]);

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-black">Dashboard Internal</h1>
        <p className="mt-1 text-sm text-[#888888]">
          Ringkasan operasional sesuai PRD — RFQ/Qn, DPO/Inbound (Scan QR), invoice & pecel.
        </p>
      </div>

      {/* Header / Role Switcher */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div />
        <div className="min-w-[260px]">
          <p className="mb-2 text-[10px] font-medium uppercase tracking-widest text-[#888888]">Role</p>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as AdminRole)}
            className="w-full rounded-md border border-[#e5e5e5] bg-white px-3 py-2 text-sm text-black focus:border-black"
          >
            {adminRoles.map((r) => (
              <option key={r} value={r}>
                {adminRoleLabels[r]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {kpis.map((card) => (
          <div
            key={card.label}
            className="rounded-lg border border-[#e5e5e5] bg-white p-5 transition-colors hover:border-[#d4d4d4]"
          >
            <p className="text-[11px] font-medium uppercase tracking-widest text-[#888888]">{card.label}</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-black">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Role-specific sections (subset sesuai PRD scope role) */}
      {role === "sales_admin" && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-[#888888]">Dokumen Penjualan</h2>
            <Link href="#" className="text-xs font-medium text-black hover:underline">
              Lihat detail (placeholder)
            </Link>
          </div>
          <div className="overflow-hidden rounded-lg border border-[#e5e5e5] bg-white">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
                  <th className="px-4 py-3 text-[11px] font-medium uppercase tracking-wider text-[#888888]">
                    Dokumen
                  </th>
                  <th className="px-4 py-3 text-[11px] font-medium uppercase tracking-wider text-[#888888]">
                    Nomor
                  </th>
                  <th className="px-4 py-3 text-[11px] font-medium uppercase tracking-wider text-[#888888]">
                    Status
                  </th>
                  <th className="px-4 py-3 text-[11px] font-medium uppercase tracking-wider text-[#888888]">
                    Nilai
                  </th>
                  <th className="px-4 py-3 text-[11px] font-medium uppercase tracking-wider text-[#888888]">
                    Update
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f0f0]">
                {internalSalesAdminDocs.map((d) => (
                  <tr key={d.id} className="transition-colors hover:bg-[#fafafa]">
                    <td className="px-4 py-3 text-[#666666]">{d.doc_type}</td>
                    <td className="px-4 py-3 font-medium text-black">{d.doc_number}</td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide border",
                          statusBadgeStyles[d.status] ?? "bg-[#f5f5f5] text-[#666666] border-[#e5e5e5]"
                        )}
                      >
                        {d.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium text-black">{d.amount ? formatRupiah(d.amount) : "-"}</td>
                    <td className="px-4 py-3 text-[#666666]">{formatDate(d.updatedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {(role === "purchasing_user" || role === "super_admin" || role === "super_user") && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-[#888888]">DPO & Inbound (Operasional)</h2>
            <span className="text-xs font-medium text-[#888888]">Ringkas sesuai role</span>
          </div>
          <div className="overflow-hidden rounded-lg border border-[#e5e5e5] bg-white">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
                  <th className="px-4 py-3 text-[11px] font-medium uppercase tracking-wider text-[#888888]">
                    Dokumen
                  </th>
                  <th className="px-4 py-3 text-[11px] font-medium uppercase tracking-wider text-[#888888]">
                    Origin
                  </th>
                  <th className="px-4 py-3 text-[11px] font-medium uppercase tracking-wider text-[#888888]">
                    Status
                  </th>
                  <th className="px-4 py-3 text-[11px] font-medium uppercase tracking-wider text-[#888888]">
                    SO
                  </th>
                  <th className="px-4 py-3 text-[11px] font-medium uppercase tracking-wider text-[#888888]">
                    Nilai
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f0f0]">
                {internalPurchasingOrders.map((o) => (
                  <tr key={o.id} className="transition-colors hover:bg-[#fafafa]">
                    <td className="px-4 py-3 font-medium text-black">{o.doc_number}</td>
                    <td className="px-4 py-3 text-[#666666]">{o.origin}</td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide border",
                          statusBadgeStyles[o.status] ?? "bg-[#f5f5f5] text-[#666666] border-[#e5e5e5]"
                        )}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#666666]">{o.soNumber}</td>
                    <td className="px-4 py-3 font-medium text-black">{o.amount ? formatRupiah(o.amount) : "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {(role === "finance_user" || role === "super_admin" || role === "super_user") && (
        <section className="space-y-5">
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-[#888888]">Invoice Buyer</h2>
              </div>
              <div className="overflow-hidden rounded-lg border border-[#e5e5e5] bg-white">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
                      <th className="px-4 py-3 text-[11px] font-medium uppercase tracking-wider text-[#888888]">
                        Invoice
                      </th>
                      <th className="px-4 py-3 text-[11px] font-medium uppercase tracking-wider text-[#888888]">
                        Status
                      </th>
                      <th className="px-4 py-3 text-[11px] font-medium uppercase tracking-wider text-[#888888]">
                        Due
                      </th>
                      <th className="px-4 py-3 text-[11px] font-medium uppercase tracking-wider text-[#888888]">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f0f0f0]">
                    {internalFinanceInvoices.map((inv) => (
                      <tr key={inv.id} className="transition-colors hover:bg-[#fafafa]">
                        <td className="px-4 py-3 font-medium text-black">{inv.invoice_number}</td>
                        <td className="px-4 py-3">
                          <span
                            className={cn(
                              "inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide border",
                              statusBadgeStyles[inv.status] ?? "bg-[#f5f5f5] text-[#666666] border-[#e5e5e5]"
                            )}
                          >
                            {inv.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-[#666666]">{inv.due_date}</td>
                        <td className="px-4 py-3 font-medium text-black">{formatRupiah(inv.total_amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-[#888888]">Pembayaran & Hutang Principal</h2>
              </div>

              <div className="overflow-hidden rounded-lg border border-[#e5e5e5] bg-white">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
                      <th className="px-4 py-3 text-[11px] font-medium uppercase tracking-wider text-[#888888]">Item</th>
                      <th className="px-4 py-3 text-[11px] font-medium uppercase tracking-wider text-[#888888]">Status</th>
                      <th className="px-4 py-3 text-[11px] font-medium uppercase tracking-wider text-[#888888]">Deadline/Due</th>
                      <th className="px-4 py-3 text-[11px] font-medium uppercase tracking-wider text-[#888888]">Nilai</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f0f0f0]">
                    {internalFinancePayments.map((p) => (
                      <tr key={p.id} className="transition-colors hover:bg-[#fafafa]">
                        <td className="px-4 py-3 text-[#666666]">
                          Payment • {p.invoice_number}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={cn(
                              "inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide border",
                              statusBadgeStyles[p.status] ?? "bg-[#f5f5f5] text-[#666666] border-[#e5e5e5]"
                            )}
                          >
                            {p.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-[#666666]">{p.received_at ? formatDate(p.received_at) : "-"}</td>
                        <td className="px-4 py-3 font-medium text-black">{formatRupiah(p.amount)}</td>
                      </tr>
                    ))}
                    {internalPrincipalHutang.map((h) => (
                      <tr key={h.id} className="transition-colors hover:bg-[#fafafa]">
                        <td className="px-4 py-3 text-[#666666]">
                          Hutang • {h.so_number}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={cn(
                              "inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide border",
                              statusBadgeStyles[h.status] ?? "bg-[#f5f5f5] text-[#666666] border-[#e5e5e5]"
                            )}
                          >
                            {h.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-[#666666]">{h.deadline}</td>
                        <td className="px-4 py-3 font-medium text-black">{formatRupiah(h.total_amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
