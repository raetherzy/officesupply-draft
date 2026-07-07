"use client";

import { useParams } from "next/navigation";
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

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default function PrincipalInvoiceDetailPage() {
  const params = useParams();
  const inv = principalInvoices.find((i) => i.id === params.id);

  if (!inv) {
    return (
      <div className="space-y-4">
        <Link href="/principal/invoice" className="text-[13px] font-medium text-black hover:underline">
          ← Kembali ke View Invoice
        </Link>
        <div className="rounded-lg border border-[#e5e5e5] bg-white p-8 text-center">
          <p className="text-sm text-[#888888]">Invoice tidak ditemukan.</p>
        </div>
      </div>
    );
  }

  const overdue = inv.status === "overdue";
  const daysOverdue = overdue
    ? Math.floor((Date.now() - new Date(inv.due_date).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[13px]">
        <Link href="/principal/invoice" className="text-[#888888] hover:text-black">
          View Invoice
        </Link>
        <span className="text-[#888888]">/</span>
        <span className="font-medium text-black">{inv.invoice_number}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold text-black">{inv.invoice_number}</h1>
            <span className={`inline-block rounded border px-2 py-0.5 text-[11px] font-medium ${statusColor[inv.status]}`}>
              {statusLabel[inv.status]}
            </span>
            {overdue && (
              <span className="text-[11px] font-medium text-red-600">
                {daysOverdue} hari lewat
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-[#888888]">
            {inv.buyer_company} • PO {inv.po_number} • SO {inv.so_number}
          </p>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
        <div className="rounded-lg border border-[#e5e5e5] bg-white p-4">
          <p className="text-[11px] font-medium uppercase tracking-widest text-[#888888]">Diterbitkan</p>
          <p className="mt-1 text-sm font-medium text-black">{formatDateTime(inv.issued_at)}</p>
        </div>
        <div className="rounded-lg border border-[#e5e5e5] bg-white p-4">
          <p className="text-[11px] font-medium uppercase tracking-widest text-[#888888]">Jatuh Tempo</p>
          <p className={`mt-1 text-sm font-medium ${overdue ? "text-red-600" : "text-black"}`}>
            {formatDate(inv.due_date)}
          </p>
        </div>
        <div className="rounded-lg border border-[#e5e5e5] bg-white p-4">
          <p className="text-[11px] font-medium uppercase tracking-widest text-[#888888]">Total</p>
          <p className="mt-1 text-sm font-bold text-black">{formatRupiah(inv.total_amount)}</p>
        </div>
        <div className="rounded-lg border border-[#e5e5e5] bg-white p-4">
          <p className="text-[11px] font-medium uppercase tracking-widest text-[#888888]">Status Bayar</p>
          <p className="mt-1 text-sm font-medium text-black">
            {inv.paid_at ? `Dibayar ${formatDate(inv.paid_at)}` : "Belum dibayar"}
          </p>
        </div>
      </div>

      {/* SLA Warning */}
      {inv.status === "ready_to_pay" && (
        <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
          <svg className="h-4 w-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-[13px] text-amber-800">
            SLA pembayaran 48 jam. Harap dibayar sebelum <strong>{formatDate(inv.due_date)}</strong>.
          </p>
        </div>
      )}

      {inv.status === "overdue" && (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <svg className="h-4 w-4 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <p className="text-[13px] text-red-800">
            Invoice overdue — {daysOverdue} hari melewati jatuh tempo. Segera tindak lanjuti.
          </p>
        </div>
      )}

      {/* Items Table */}
      <div>
        <h2 className="mb-3 text-sm font-semibold text-black">Items Invoice</h2>
        <div className="overflow-hidden rounded-lg border border-[#e5e5e5] bg-white">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
                <th className="px-6 py-3 text-[12px] font-medium text-[#888888]">Deskripsi</th>
                <th className="px-6 py-3 text-[12px] font-medium text-[#888888]">Qty</th>
                <th className="px-6 py-3 text-[12px] font-medium text-[#888888]">Harga Satuan</th>
                <th className="px-6 py-3 text-[12px] font-medium text-[#888888]">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f0f0]">
              {inv.items.map((item, i) => (
                <tr key={i} className="transition-colors hover:bg-[#fafafa]">
                  <td className="px-6 py-4 text-[13px] font-medium text-black">{item.description}</td>
                  <td className="px-6 py-4 text-[13px] text-[#666666]">{item.qty}</td>
                  <td className="px-6 py-4 text-[13px] text-[#666666]">{formatRupiah(item.unit_price)}</td>
                  <td className="px-6 py-4 text-[13px] font-medium text-black">{formatRupiah(item.total)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-[#e5e5e5] bg-[#fafafa]">
                <td colSpan={3} className="px-6 py-3 text-right text-[12px] font-medium text-[#888888]">
                  Grand Total
                </td>
                <td className="px-6 py-3 text-sm font-bold text-black">{formatRupiah(inv.total_amount)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}