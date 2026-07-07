"use client";

import Link from "next/link";
import { inboundShipments } from "@/lib/principal-mock-data";
import { InboundStatus } from "@/lib/principal-types";

const statusLabel: Record<InboundStatus, string> = {
  consolidating: "Konsolidasi",
  ready_to_delivery: "Siap Kirim",
  done: "Selesai",
};

const statusColor: Record<InboundStatus, string> = {
  consolidating: "bg-amber-50 text-amber-700 border-amber-200",
  ready_to_delivery: "bg-emerald-50 text-emerald-700 border-emerald-200",
  done: "bg-[#f5f5f5] text-[#888888] border-[#e5e5e5]",
};

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default function InboundListPage() {
  return (
    <div className="space-y-5">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-black">Inbound & Label QR</h1>
          <p className="mt-0.5 text-sm text-[#888888]">Kelola paket inbound & cetak label QR untuk gudang</p>
        </div>
      </div>

      {/* Shipment Cards */}
      <div className="space-y-3">
        {inboundShipments.map((inb) => {
          const totalPackages = inb.packages.length;
          const printedLabels = inb.packages.filter((p) => p.label_printed).length;
          const totalWeight = inb.packages.reduce((sum, p) => sum + p.weight_kg, 0);

          return (
            <Link
              key={inb.id}
              href={`/principal/inbound/${inb.id}`}
              className="block rounded-lg border border-[#e5e5e5] bg-white p-5 transition-colors hover:border-[#d4d4d4]"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-black">{inb.po_number}</p>
                    <span className={`inline-block rounded border px-2 py-0.5 text-[11px] font-medium ${statusColor[inb.status]}`}>
                      {statusLabel[inb.status]}
                    </span>
                  </div>
                  <p className="text-[12px] text-[#888888]">{formatDateTime(inb.created_at)}</p>
                </div>

                <div className="flex gap-6">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-widest text-[#888888]">Paket</p>
                    <p className="mt-0.5 text-sm font-medium text-black">{totalPackages} pkg</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-widest text-[#888888]">Berat Total</p>
                    <p className="mt-0.5 text-sm font-medium text-black">{totalWeight.toFixed(1)} kg</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-widest text-[#888888]">Label</p>
                    <p className="mt-0.5 text-sm font-medium text-black">{printedLabels}/{totalPackages} cetak</p>
                  </div>
                </div>

                <div className="text-[13px] font-medium text-black">
                  Detail →
                </div>
              </div>

              {/* Package preview */}
              <div className="mt-4 flex flex-wrap gap-2 border-t border-[#f0f0f0] pt-3">
                {inb.packages.map((pkg) => (
                  <span
                    key={pkg.id}
                    className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[11px] font-medium ${
                      pkg.label_printed
                        ? "border-[#e5e5e5] bg-[#fafafa] text-[#666666]"
                        : "border-amber-200 bg-amber-50 text-amber-700"
                    }`}
                  >
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5zM13.5 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5z" />
                    </svg>
                    {pkg.package_number}
                    {pkg.label_printed && <span className="text-[#888888]">✓</span>}
                  </span>
                ))}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
