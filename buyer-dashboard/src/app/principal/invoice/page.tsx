"use client";

import Link from "next/link";
import { principalInvoices } from "@/lib/principal-mock-data";
import { PrincipalInvoiceStatus } from "@/lib/principal-types";

const statusLabel: Record<PrincipalInvoiceStatus, string> = {
  ready_to_pay: "Ready To Pay",
  paid: "Paid",
  overdue: "Overdue",
};

const statusColor: Record<PrincipalInvoiceStatus, string> = {
  ready_to_pay: "bg-blue-50 text-blue-700 border-blue-200",
  paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
  overdue: "bg-red-50 text-red-700 border-red-200",
};

function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

export default function PrincipalInvoiceListPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-black">View Invoice</h1>
        <p className="mt-0.5 text-sm text-[#888888]">Invoice dari OfficeSupply (view-only) — SLA pembayaran 48 jam</p>
      </div>

      <div className="space-y-3">
        {principalInvoices.map((inv) => {
          const overdue = inv.status === "overdue";
          const daysOverdue = overdue
            ? Math.floor((Date.now() - new Date(inv.due_date).getTime()) / (1000 * 60 * 60 * 24))
            : 0;

          return (
            <Link
              key={inv.id}
              href={`/principal/invoice/${inv.id}`}
              className="block rounded-lg border border-[#e5e5e5] bg-white p-5 transition-colors hover:border-[#d4d4d4]"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-black">{inv.invoice_number}</p>
                    <span className={`inline-block rounded border px-2 py-0.5 text-[11px] font-medium ${statusColor[inv.status]}`}>
                      {statusLabel[inv.status]}
                    </span>
                    {overdue && (
                      <span className="text-[11px] font-medium text-red-600">
                        {daysOverdue} hari lewat
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] text-[#888888]">
                    {inv.buyer_company} • PO {inv.po_number} • SO {inv.so_number}
                  </p>
                </div>

                <div className="flex gap-6">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-widest text-[#888888]">Jatuh Tempo</p>
                    <p className={`mt-0.5 text-sm font-medium ${overdue ? "text-red-600" : "text-black"}`}>
                      {formatDate(inv.due_date)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-widest text-[#888888]">Total</p>
                    <p className="mt-0.5 text-sm font-bold text-black">{formatRupiah(inv.total_amount)}</p>
                  </div>
                  {inv.paid_at && (
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-widest text-[#888888]">Dibayar</p>
                      <p className="mt-0.5 text-sm font-medium text-emerald-700">{formatDate(inv.paid_at)}</p>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}