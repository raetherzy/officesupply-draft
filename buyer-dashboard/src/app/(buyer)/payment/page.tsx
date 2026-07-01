"use client";

import { useState } from "react";
import { payments, invoices } from "@/lib/mock-data";

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  verified: "bg-blue-100 text-blue-700",
  paid: "bg-emerald-100 text-emerald-700",
  failed: "bg-rose-100 text-rose-600",
};

const statusLabels: Record<string, string> = {
  pending: "Pending",
  verified: "Verified",
  paid: "Paid",
  failed: "Failed",
};

export default function PaymentPage() {
  const unpaidInv = invoices.filter((i) => i.status === "current");
  const [selectedInv, setSelectedInv] = useState(unpaidInv[0]?.id || "");
  const [method, setMethod] = useState<"va" | "transfer">("transfer");
  const [showUpload, setShowUpload] = useState(false);

  const selectedInvoice = invoices.find((i) => i.id === selectedInv);

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-black tracking-tight">Pembayaran</h1>
        <p className="text-sm text-[#666666] mt-1">Bayar invoice atau upload bukti transfer</p>
      </div>

      {/* Payment Form */}
      <div className="rounded-lg border border-[#e5e5e5] bg-white p-7 space-y-6">
        <h2 className="text-lg font-semibold text-black">Form Pembayaran</h2>

        {/* Select Invoice */}
        <div>
          <label className="block text-sm font-semibold text-[#333333] mb-2">Pilih Invoice</label>
          <select
            value={selectedInv}
            onChange={(e) => {
              setSelectedInv(e.target.value);
            }}
            className="w-full rounded-md border border-[#e5e5e5] bg-white px-4 py-3 text-sm text-black focus:outline-none focus:border-black transition-colors"
          >
            {unpaidInv.map((inv) => (
              <option key={inv.id} value={inv.id}>
                {inv.invoice_number} — Rp {(inv.total_amount / 1000000).toFixed(1)}M
              </option>
            ))}
          </select>
        </div>

        {/* Method */}
        <div>
          <label className="block text-sm font-semibold text-[#333333] mb-2">Metode Pembayaran</label>
          <div className="flex gap-3">
            <button
              onClick={() => setMethod("va")}
              className={`flex-1 px-4 py-3.5 text-sm font-semibold rounded-md border transition-colors ${
                method === "va"
                  ? "border-black bg-black text-white"
                  : "border-[#e5e5e5] bg-white text-[#666666] hover:bg-[#fafafa]"
              }`}
            >
              Virtual Account (Xendit)
            </button>
            <button
              onClick={() => setMethod("transfer")}
              className={`flex-1 px-4 py-3.5 text-sm font-semibold rounded-md border transition-colors ${
                method === "transfer"
                  ? "border-black bg-black text-white"
                  : "border-[#e5e5e5] bg-white text-[#666666] hover:bg-[#fafafa]"
              }`}
            >
              Transfer Bank
            </button>
          </div>
        </div>

        {/* VA Number */}
        {method === "va" && selectedInvoice && (
          <div className="rounded-md border border-[#e5e5e5] bg-[#fafafa] p-5">
            <p className="text-xs text-[#888888] font-semibold uppercase tracking-wide">Nomor Virtual Account</p>
            <p className="text-2xl font-bold text-black mt-2 font-mono tracking-wider">
              8812 3456 7890 1234
            </p>
            <p className="text-xs text-[#666666] mt-2">
              Bayar sebelum: {new Date(selectedInvoice.due_date).toLocaleDateString("id-ID")}
            </p>
          </div>
        )}

        {/* Transfer Info */}
        {method === "transfer" && (
          <div className="rounded-md border border-[#e5e5e5] bg-[#fafafa] p-5">
            <p className="text-xs text-[#888888] font-semibold uppercase tracking-wide mb-3">Transfer ke rekening</p>
            <div className="space-y-1 text-sm text-[#333333]">
              <p>
                <strong>Bank BCA</strong> — 123 456 7890 a/n PT Nirmana Sthavira Dharma
              </p>
              <p className="text-xs text-[#888888] mt-2">Setelah transfer, upload bukti di bawah</p>
            </div>
          </div>
        )}

        {/* Upload Proof */}
        {method === "transfer" && (
          <div>
            <button
              onClick={() => setShowUpload(true)}
              className="text-sm text-black hover:underline font-semibold transition-colors"
            >
              Upload Bukti Transfer
            </button>
            {showUpload && (
              <div className="mt-3 border-2 border-dashed border-[#e5e5e5] rounded-md p-8 text-center hover:border-black transition-colors cursor-pointer bg-white">
                <p className="text-sm text-[#666666]">Drag & drop atau klik untuk upload</p>
                <p className="text-xs text-[#888888] mt-1">JPG, PNG, PDF (Max 5MB)</p>
              </div>
            )}
          </div>
        )}

        {/* Amount */}
        <div className="border-t border-[#e5e5e5] pt-5 flex items-center justify-between">
          <span className="text-sm text-[#666666] font-medium">Jumlah Pembayaran:</span>
          <span className="text-xl font-bold text-black tracking-tight">
            Rp {(selectedInvoice?.total_amount || 0).toLocaleString("id-ID")}
          </span>
        </div>

        <button className="w-full py-3.5 bg-black text-white text-sm font-semibold rounded-md hover:bg-[#333333] transition-colors">
          Konfirmasi Pembayaran
        </button>
      </div>

      {/* Payment History */}
      <div>
        <h2 className="text-lg font-semibold text-black mb-4">Riwayat Pembayaran</h2>
        <div className="rounded-lg border border-[#e5e5e5] bg-white overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
                <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-4">Invoice</th>
                <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-4">Metode</th>
                <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-4">Jumlah</th>
                <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-4">Status</th>
                <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-4">Tanggal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f0f0]">
              {payments.map((pay) => (
                <tr key={pay.id} className="hover:bg-[#fafafa] transition-colors">
                  <td className="px-6 py-4 text-sm text-black font-semibold">{pay.invoice_number}</td>
                  <td className="px-6 py-4 text-sm text-[#666666]">{pay.method === "va" ? "VA" : "Transfer"}</td>
                  <td className="px-6 py-4 text-sm text-black font-medium">Rp {(pay.amount / 1000000).toFixed(1)}M</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${statusColors[pay.status]}`}>
                      {statusLabels[pay.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#666666]">
                    {pay.paid_at ? new Date(pay.paid_at).toLocaleDateString("id-ID") : "—"}
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
