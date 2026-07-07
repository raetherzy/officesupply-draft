"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { principalPOs, inboundShipments } from "@/lib/principal-mock-data";
import { PoStatus } from "@/lib/principal-types";

const statusLabel: Record<PoStatus, string> = {
  sent_to_principal: "PO Masuk",
  consolidating: "Konsolidasi",
  ready_to_delivery: "Siap Kirim",
  done: "Selesai",
};

const statusColor: Record<PoStatus, string> = {
  sent_to_principal: "bg-blue-50 text-blue-700 border-blue-200",
  consolidating: "bg-amber-50 text-amber-700 border-amber-200",
  ready_to_delivery: "bg-emerald-50 text-emerald-700 border-emerald-200",
  done: "bg-[#f5f5f5] text-[#888888] border-[#e5e5e5]",
};

function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default function PrincipalPODetailPage() {
  const params = useParams();
  const po = principalPOs.find((p) => p.id === params.id);

  if (!po) {
    return (
      <div className="space-y-4">
        <Link href="/principal/po" className="text-[13px] font-medium text-black hover:underline">
          ← Kembali ke PO Masuk
        </Link>
        <div className="rounded-lg border border-[#e5e5e5] bg-white p-8 text-center">
          <p className="text-sm text-[#888888]">PO tidak ditemukan.</p>
        </div>
      </div>
    );
  }

  const relatedInbound = inboundShipments.filter((inb) => inb.po_id === po.id);

  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[13px]">
        <Link href="/principal/po" className="text-[#888888] hover:text-black">
          PO Masuk
        </Link>
        <span className="text-[#888888]">/</span>
        <span className="font-medium text-black">{po.po_number}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold text-black">{po.po_number}</h1>
            <span className={`inline-block rounded border px-2 py-0.5 text-[11px] font-medium ${statusColor[po.status]}`}>
              {statusLabel[po.status]}
            </span>
          </div>
          <p className="mt-1 text-sm text-[#888888]">
            SO Reference: {po.so_number} • {formatDateTime(po.created_at)}
          </p>
        </div>
        <div className="flex gap-2">
          {po.status === "sent_to_principal" && (
            <Link
              href="/principal/inbound"
              className="rounded-md border border-black bg-black px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-[#222]"
            >
              Buat Inbound
            </Link>
          )}
          {po.status === "consolidating" && (
            <Link
              href="/principal/delivery"
              className="rounded-md border border-black bg-black px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-[#222]"
            >
              Konfirmasi Pengiriman
            </Link>
          )}
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-[#e5e5e5] bg-white p-4">
          <p className="text-[11px] font-medium uppercase tracking-widest text-[#888888]">Buyer</p>
          <p className="mt-1 text-sm font-medium text-black">{po.buyer_company}</p>
        </div>
        <div className="rounded-lg border border-[#e5e5e5] bg-white p-4">
          <p className="text-[11px] font-medium uppercase tracking-widest text-[#888888]">Total Nilai PO</p>
          <p className="mt-1 text-sm font-bold text-black">{formatRupiah(po.total_amount)}</p>
        </div>
        <div className="rounded-lg border border-[#e5e5e5] bg-white p-4">
          <p className="text-[11px] font-medium uppercase tracking-widest text-[#888888]">Jumlah Item</p>
          <p className="mt-1 text-sm font-medium text-black">{po.items.length} produk</p>
        </div>
        <div className="rounded-lg border border-[#e5e5e5] bg-white p-4">
          <p className="text-[11px] font-medium uppercase tracking-widest text-[#888888]">Penerima</p>
          <p className="mt-1 text-sm font-medium text-black">{po.delivery_address.recipient_name}</p>
          <p className="text-[12px] text-[#888888]">{po.delivery_address.phone}</p>
        </div>
      </div>

      {/* Delivery Address */}
      <div className="rounded-lg border border-[#e5e5e5] bg-white p-4">
        <p className="text-[11px] font-medium uppercase tracking-widest text-[#888888]">Alamat Pengiriman</p>
        <p className="mt-1 text-sm text-black">{po.delivery_address.address}</p>
        <p className="text-[13px] text-[#666666]">
          {po.delivery_address.city}, {po.delivery_address.province} {po.delivery_address.zip}
        </p>
      </div>

      {/* Items Table */}
      <div>
        <h2 className="mb-3 text-sm font-semibold text-black">Items PO</h2>
        <div className="overflow-x-auto rounded-lg border border-[#e5e5e5] bg-white">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
                <th className="px-6 py-3 text-[12px] font-medium text-[#888888]">Produk</th>
                <th className="px-6 py-3 text-[12px] font-medium text-[#888888]">Qty</th>
                <th className="px-6 py-3 text-[12px] font-medium text-[#888888]">Harga Satuan</th>
                <th className="px-6 py-3 text-[12px] font-medium text-[#888888]">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f0f0]">
              {po.items.map((item, i) => (
                <tr key={i} className="transition-colors hover:bg-[#fafafa]">
                  <td className="px-6 py-4 text-[13px] font-medium text-black">{item.product_name}</td>
                  <td className="px-6 py-4 text-[13px] text-[#666666]">{item.qty}</td>
                  <td className="px-6 py-4 text-[13px] text-[#666666]">{formatRupiah(item.unit_price)}</td>
                  <td className="px-6 py-4 text-[13px] font-medium text-black">{formatRupiah(item.subtotal)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-[#e5e5e5] bg-[#fafafa]">
                <td colSpan={3} className="px-6 py-3 text-right text-[12px] font-medium text-[#888888]">
                  Total
                </td>
                <td className="px-6 py-3 text-sm font-bold text-black">{formatRupiah(po.total_amount)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Notes */}
      {po.notes && (
        <div className="rounded-lg border border-[#e5e5e5] bg-white p-4">
          <p className="text-[11px] font-medium uppercase tracking-widest text-[#888888]">Catatan Buyer</p>
          <p className="mt-1 text-[13px] text-black">{po.notes}</p>
        </div>
      )}

      {/* Related Inbound */}
      {relatedInbound.length > 0 && (
        <div>
          <h2 className="mb-3 text-sm font-semibold text-black">Inbound Terkait</h2>
          <div className="space-y-2">
            {relatedInbound.map((inb) => (
              <Link
                key={inb.id}
                href={`/principal/inbound/${inb.id}`}
                className="flex items-center justify-between rounded-lg border border-[#e5e5e5] bg-white p-4 transition-colors hover:border-[#d4d4d4]"
              >
                <div>
                  <p className="text-sm font-medium text-black">{inb.po_number}</p>
                  <p className="text-[12px] text-[#888888]">{inb.packages.length} paket • {formatDateTime(inb.created_at)}</p>
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
