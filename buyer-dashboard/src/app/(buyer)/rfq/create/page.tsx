"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RfqCreatePage() {
  const router = useRouter();

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-black tracking-tight">Buat RFQ Baru</h1>
        <p className="text-sm text-[#666666] mt-1">Ajukan permintaan penawaran harga ke vendor</p>
      </div>

      <div className="rounded-lg border border-[#e5e5e5] bg-white p-6 space-y-6">
        {/* Product Selection */}
        <div>
          <label className="block text-xs font-medium text-[#888888] uppercase tracking-wider mb-2">Pilih Produk</label>
          <div className="rounded-md border border-[#e5e5e5] divide-y divide-[#f0f0f0] overflow-hidden">
            {[
              { name: "Kertas A4 80gsm - Box", cat: "Reguler" },
              { name: "Poster Cetak A3 Full Color", cat: "Print / Aldo" },
              { name: "Kartu Nama Cetak", cat: "Print / Aldo" },
              { name: "Banner Cetak 2x1m", cat: "Print / Aldo" },
            ].map((prod, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-3.5 hover:bg-[#fafafa] transition-colors">
                <div>
                  <p className="text-sm font-semibold text-black">{prod.name}</p>
                  <p className="text-xs text-[#666666] mt-0.5">{prod.cat}</p>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    defaultValue={0}
                    min={0}
                    className="w-20 text-center rounded-md border border-[#e5e5e5] bg-white px-2.5 py-1.5 text-sm font-medium text-black focus:outline-none focus:border-black transition-colors"
                  />
                  <span className="text-xs text-[#888888] font-medium">Qty</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Print Product Warning */}
        <div className="rounded-md bg-[#fafafa] border border-[#e5e5e5] p-4">
          <div>
            <p className="text-sm font-semibold text-black">Produk Cetak / Aldo</p>
            <p className="text-xs text-[#666666] mt-1 leading-relaxed">
              Produk cetak tidak menampilkan harga final. Anda wajib melengkapi spesifikasi dan mengunggah file pendukung.
            </p>
          </div>
        </div>

        {/* Specification Form for Print Products */}
        <div className="space-y-5">
          <div className="pb-2 border-b border-[#e5e5e5]">
            <h3 className="text-sm font-bold text-black tracking-tight">Spesifikasi Produk Cetak</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#888888] uppercase tracking-wider mb-1.5">Jenis Produk</label>
              <input type="text" className="w-full rounded-md border border-[#e5e5e5] bg-white px-3.5 py-2.5 text-sm font-medium text-black placeholder:text-[#888888] focus:outline-none focus:border-black transition-colors" placeholder="Poster, Banner, dll." />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#888888] uppercase tracking-wider mb-1.5">Ukuran</label>
              <input type="text" className="w-full rounded-md border border-[#e5e5e5] bg-white px-3.5 py-2.5 text-sm font-medium text-black placeholder:text-[#888888] focus:outline-none focus:border-black transition-colors" placeholder="A3, 2x1m, dll." />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#888888] uppercase tracking-wider mb-1.5">Bahan/Material</label>
              <input type="text" className="w-full rounded-md border border-[#e5e5e5] bg-white px-3.5 py-2.5 text-sm font-medium text-black placeholder:text-[#888888] focus:outline-none focus:border-black transition-colors" placeholder="Art Paper 150gsm..." />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#888888] uppercase tracking-wider mb-1.5">Jumlah Sisi Cetak</label>
              <select className="w-full rounded-md border border-[#e5e5e5] bg-white px-3.5 py-2.5 text-sm font-medium text-black focus:outline-none focus:border-black transition-colors">
                <option>1 Sisi</option>
                <option>2 Sisi</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#888888] uppercase tracking-wider mb-1.5">Warna</label>
              <input type="text" className="w-full rounded-md border border-[#e5e5e5] bg-white px-3.5 py-2.5 text-sm font-medium text-black placeholder:text-[#888888] focus:outline-none focus:border-black transition-colors" placeholder="Full Color, BW..." />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#888888] uppercase tracking-wider mb-1.5">Finishing</label>
              <input type="text" className="w-full rounded-md border border-[#e5e5e5] bg-white px-3.5 py-2.5 text-sm font-medium text-black placeholder:text-[#888888] focus:outline-none focus:border-black transition-colors" placeholder="Laminating, Spot UV..." />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#888888] uppercase tracking-wider mb-1.5">Catatan Tambahan</label>
            <textarea rows={3} className="w-full rounded-md border border-[#e5e5e5] bg-white px-3.5 py-2.5 text-sm font-medium text-black placeholder:text-[#888888] focus:outline-none focus:border-black transition-colors resize-none" placeholder="Deskripsi kebutuhan khusus..." />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-xs font-medium text-[#888888] uppercase tracking-wider mb-2">Upload File Pendukung</label>
            <div className="border-2 border-dashed border-[#e5e5e5] rounded-lg p-8 text-center hover:border-black transition-colors cursor-pointer bg-white">
              <p className="text-sm font-semibold text-[#666666]">Drag & drop atau klik untuk upload</p>
              <p className="text-xs text-[#888888] mt-1">PDF, JPG, PNG, DOC, DOCX, XLS, XLSX (Max 10MB)</p>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-medium text-[#888888] uppercase tracking-wider mb-1.5">Catatan RFQ</label>
          <textarea rows={2} className="w-full rounded-md border border-[#e5e5e5] bg-white px-3.5 py-2.5 text-sm font-medium text-black placeholder:text-[#888888] focus:outline-none focus:border-black transition-colors resize-none" placeholder="Tambahkan catatan untuk SalesAdmin..." />
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => router.push("/rfq")}
          className="px-5 py-2.5 text-sm font-semibold text-[#666666] border border-[#e5e5e5] rounded-md hover:bg-[#fafafa] transition-colors"
        >
          Batal
        </button>
        <button
          onClick={() => router.push("/rfq")}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-black text-white text-sm font-semibold rounded-md hover:bg-[#333333] transition-colors"
        >
          Submit RFQ
        </button>
      </div>
    </div>
  );
}
