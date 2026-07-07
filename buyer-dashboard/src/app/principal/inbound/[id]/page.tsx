"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { inboundShipments } from "@/lib/principal-mock-data";
import { InboundStatus, PackageStatus } from "@/lib/principal-types";

const inboundStatusLabel: Record<InboundStatus, string> = {
  consolidating: "Konsolidasi",
  ready_to_delivery: "Siap Kirim",
  done: "Selesai",
};

const inboundStatusColor: Record<InboundStatus, string> = {
  consolidating: "bg-amber-50 text-amber-700 border-amber-200",
  ready_to_delivery: "bg-emerald-50 text-emerald-700 border-emerald-200",
  done: "bg-[#f5f5f5] text-[#888888] border-[#e5e5e5]",
};

const packageStatusColor: Record<PackageStatus, string> = {
  received: "bg-emerald-50 text-emerald-700 border-emerald-200",
  damaged: "bg-red-50 text-red-700 border-red-200",
  issue_found: "bg-amber-50 text-amber-700 border-amber-200",
};

const packageStatusLabel: Record<PackageStatus, string> = {
  received: "Diterima",
  damaged: "Rusak",
  issue_found: "Ada Issue",
};

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default function InboundDetailPage() {
  const params = useParams();
  const inbound = inboundShipments.find((inb) => inb.id === params.id);

  if (!inbound) {
    return (
      <div className="space-y-4">
        <Link href="/principal/inbound" className="text-[13px] font-medium text-black hover:underline">
          ← Kembali ke Inbound
        </Link>
        <div className="rounded-lg border border-[#e5e5e5] bg-white p-8 text-center">
          <p className="text-sm text-[#888888]">Inbound shipment tidak ditemukan.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[13px]">
        <Link href="/principal/inbound" className="text-[#888888] hover:text-black">
          Inbound & Label QR
        </Link>
        <span className="text-[#888888]">/</span>
        <span className="font-medium text-black">{inbound.po_number}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold text-black">{inbound.po_number}</h1>
            <span className={`inline-block rounded border px-2 py-0.5 text-[11px] font-medium ${inboundStatusColor[inbound.status]}`}>
              {inboundStatusLabel[inbound.status]}
            </span>
          </div>
          <p className="mt-1 text-sm text-[#888888]">{formatDateTime(inbound.created_at)} • {inbound.packages.length} paket</p>
        </div>
      </div>

      {/* Packages */}
      <div className="space-y-4">
        {inbound.packages.map((pkg, idx) => (
          <div key={pkg.id} className="rounded-lg border border-[#e5e5e5] bg-white overflow-hidden">
            {/* Package header */}
            <div className="flex flex-col gap-4 border-b border-[#f0f0f0] p-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-black">Paket {idx + 1}</p>
                  <span className={`inline-block rounded border px-2 py-0.5 text-[11px] font-medium ${packageStatusColor[pkg.status]}`}>
                    {packageStatusLabel[pkg.status]}
                  </span>
                </div>
                <p className="text-[13px] text-[#666666]">{pkg.package_number}</p>
                <div className="flex gap-4 mt-2 text-[12px] text-[#888888]">
                  <span>Berat: <strong className="text-black">{pkg.weight_kg} kg</strong></span>
                  <span>Dimensi: <strong className="text-black">{pkg.dimension} cm</strong></span>
                </div>
              </div>

              {/* QR Code & Print */}
              <div className="flex flex-col items-center gap-2 sm:items-end">
                <div className="flex h-24 w-24 items-center justify-center rounded-md border border-[#e5e5e5] bg-white">
                  <svg className="h-20 w-20" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5zM13.5 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5z" />
                  </svg>
                </div>
                <p className="text-[10px] font-mono text-[#888888]">{pkg.qr_code}</p>
                <button
                  className={`rounded-md border px-3 py-1.5 text-[12px] font-medium transition-colors ${
                    pkg.label_printed
                      ? "border-[#e5e5e5] bg-[#fafafa] text-[#888888]"
                      : "border-black bg-black text-white hover:bg-[#222]"
                  }`}
                >
                  {pkg.label_printed ? "✓ Label Dicetak" : "Cetak Label PDF"}
                </button>
              </div>
            </div>

            {/* Package Items */}
            <div className="p-5">
              <p className="mb-2 text-[11px] font-medium uppercase tracking-widest text-[#888888]">Isi Paket</p>
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[#f0f0f0]">
                    <th className="pb-2 text-[12px] font-medium text-[#888888]">Produk</th>
                    <th className="pb-2 text-right text-[12px] font-medium text-[#888888]">Qty</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f5f5f5]">
                  {pkg.items.map((item, i) => (
                    <tr key={i}>
                      <td className="py-2 text-[13px] text-black">{item.product_name}</td>
                      <td className="py-2 text-right text-[13px] text-[#666666]">{item.qty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* Action Footer */}
      {inbound.status === "consolidating" && (
        <div className="flex justify-end gap-2 border-t border-[#e5e5e5] pt-4">
          <Link
            href="/principal/delivery"
            className="rounded-md border border-black bg-black px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-[#222]"
          >
            Lanjut ke Konfirmasi Pengiriman
          </Link>
        </div>
      )}
    </div>
  );
}
