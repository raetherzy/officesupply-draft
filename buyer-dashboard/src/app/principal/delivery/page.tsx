"use client";

import Link from "next/link";
import { principalPOs, inboundShipments } from "@/lib/principal-mock-data";

const inboundStatusLabel: Record<string, string> = {
  consolidating: "Konsolidasi",
  ready_to_delivery: "Siap Kirim",
  done: "Selesai",
};

const inboundStatusColor: Record<string, string> = {
  consolidating: "bg-amber-50 text-amber-700 border-amber-200",
  ready_to_delivery: "bg-emerald-50 text-emerald-700 border-emerald-200",
  done: "bg-[#f5f5f5] text-[#888888] border-[#e5e5e5]",
};

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
}

// Shipments ready for delivery confirmation
const readyToDeliver = inboundShipments.filter((inb) => inb.status === "consolidating" || inb.status === "ready_to_delivery");
const doneShipments = inboundShipments.filter((inb) => inb.status === "done");

export default function DeliveryConfirmationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-black">Konfirmasi Pengiriman</h1>
        <p className="mt-0.5 text-sm text-[#888888]">Tandai shipment sebagai Ready to Delivery setelah semua paket siap</p>
      </div>

      {/* Ready to Confirm */}
      <div>
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-black">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-[11px] font-bold text-amber-700">
            {readyToDeliver.length}
          </span>
          Menunggu Konfirmasi
        </h2>

        {readyToDeliver.length === 0 ? (
          <div className="rounded-lg border border-[#e5e5e5] bg-white p-8 text-center">
            <p className="text-sm text-[#888888]">Tidak ada shipment yang menunggu konfirmasi.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {readyToDeliver.map((inb) => {
              const po = principalPOs.find((p) => p.id === inb.po_id);
              const totalWeight = inb.packages.reduce((sum, p) => sum + p.weight_kg, 0);
              const allLabeled = inb.packages.every((p) => p.label_printed);

              return (
                <div key={inb.id} className="rounded-lg border border-[#e5e5e5] bg-white p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-black">{inb.po_number}</p>
                        <span className={`inline-block rounded border px-2 py-0.5 text-[11px] font-medium ${inboundStatusColor[inb.status]}`}>
                          {inboundStatusLabel[inb.status]}
                        </span>
                      </div>
                      <p className="text-[12px] text-[#888888]">
                        {inb.packages.length} paket • {totalWeight.toFixed(1)} kg • {formatDateTime(inb.created_at)}
                      </p>
                      {po && (
                        <p className="text-[12px] text-[#888888]">
                          Buyer: {po.buyer_company} • Total PO: {formatRupiah(po.total_amount)}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      {!allLabeled && (
                        <span className="text-[12px] font-medium text-amber-600">
                          ⚠ {inb.packages.filter((p) => !p.label_printed).length} label belum dicetak
                        </span>
                      )}
                      <Link
                        href={`/principal/inbound/${inb.id}`}
                        className="rounded-md border border-[#e5e5e5] bg-white px-3 py-1.5 text-[12px] font-medium text-[#666666] transition-colors hover:border-[#d4d4d4] hover:text-black"
                      >
                        Detail
                      </Link>
                      <button
                        disabled={inb.status === "ready_to_delivery" || !allLabeled}
                        className={`rounded-md border px-4 py-2 text-[13px] font-medium transition-colors ${
                          inb.status === "ready_to_delivery"
                            ? "border-[#e5e5e5] bg-[#fafafa] text-[#888888] cursor-not-allowed"
                            : !allLabeled
                            ? "border-[#e5e5e5] bg-[#fafafa] text-[#888888] cursor-not-allowed"
                            : "border-black bg-black text-white hover:bg-[#222]"
                        }`}
                      >
                        {inb.status === "ready_to_delivery"
                          ? "✓ Ready to Delivery"
                          : !allLabeled
                          ? "Label Belum Lengkap"
                          : "Konfirmasi Ready to Delivery"}
                      </button>
                    </div>
                  </div>

                  {/* Package Summary */}
                  <div className="mt-4 flex flex-wrap gap-2 border-t border-[#f0f0f0] pt-3">
                    {inb.packages.map((pkg) => (
                      <span
                        key={pkg.id}
                        className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[11px] font-medium ${
                          pkg.label_printed
                            ? "border-[#e5e5e5] bg-[#fafafa] text-[#666666]"
                            : "border-amber-200 bg-amber-50 text-amber-700"
                        }`}
                      >
                        {pkg.package_number}
                        {pkg.label_printed ? " ✓" : " — label"}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Done Shipments */}
      {doneShipments.length > 0 && (
        <div>
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-black">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#f0f0f0] text-[11px] font-bold text-[#888888]">
              {doneShipments.length}
            </span>
            Selesai Dikirim
          </h2>
          <div className="space-y-2">
            {doneShipments.map((inb) => (
              <Link
                key={inb.id}
                href={`/principal/inbound/${inb.id}`}
                className="flex items-center justify-between rounded-lg border border-[#e5e5e5] bg-white p-4 transition-colors hover:border-[#d4d4d4]"
              >
                <div>
                  <p className="text-sm font-medium text-black">{inb.po_number}</p>
                  <p className="text-[12px] text-[#888888]">{inb.packages.length} paket</p>
                </div>
                <span className="text-[13px] text-[#888888]">Lihat Detail →</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}