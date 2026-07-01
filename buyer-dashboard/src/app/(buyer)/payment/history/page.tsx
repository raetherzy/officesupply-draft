"use client";

import { payments } from "@/lib/mock-data";

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

export default function PaymentHistoryPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-black tracking-tight">Riwayat Pembayaran</h1>
        <p className="text-sm text-[#666666] mt-1">Semua transaksi pembayaran Anda</p>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-[#e5e5e5] bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
                <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-4">Invoice</th>
                <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-4">Metode</th>
                <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-4">Jumlah</th>
                <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-4">Status</th>
                <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-4">Tanggal Bayar</th>
                <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-4">Bukti</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f0f0]">
              {payments.map((pay) => (
                <tr key={pay.id} className="hover:bg-[#fafafa] transition-colors">
                  <td className="px-6 py-4 text-sm text-black font-semibold">{pay.invoice_number}</td>
                  <td className="px-6 py-4 text-sm text-[#666666]">{pay.method === "va" ? "VA (Xendit)" : "Transfer Bank"}</td>
                  <td className="px-6 py-4 text-sm text-black font-medium">Rp {(pay.amount / 1000000).toFixed(1)}M</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${statusColors[pay.status]}`}>
                      {statusLabels[pay.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#666666]">
                    {pay.paid_at ? new Date(pay.paid_at).toLocaleDateString("id-ID") : "—"}
                  </td>
                  <td className="px-6 py-4">
                    {pay.proof_url ? (
                      <a href={pay.proof_url} className="text-xs font-semibold text-black hover:underline transition-colors">
                        Lihat
                      </a>
                    ) : pay.status === "paid" ? (
                      <span className="text-xs text-emerald-600 font-medium">Auto-verified</span>
                    ) : (
                      <span className="text-xs text-[#888888]">—</span>
                    )}
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
