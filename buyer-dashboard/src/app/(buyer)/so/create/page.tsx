"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SOCreatePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const steps = ["Pilih Produk", "Hitung Ongkir", "Konfirmasi"];

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-black tracking-tight">Buat Sales Order Baru</h1>
        <p className="text-sm text-[#666666] mt-1">Pilih produk, hitung ongkir, dan terbitkan SO</p>
      </div>

      {/* Stepper */}
      <div className="rounded-lg border border-[#e5e5e5] bg-white p-5">
        <div className="flex items-center justify-between">
          {steps.map((label, i) => (
            <div key={label} className="flex items-center gap-3 flex-1">
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-md flex items-center justify-center text-sm font-semibold transition-colors ${
                    step >= i + 1
                      ? "bg-black text-white"
                      : "bg-[#f5f5f5] text-[#888888]"
                  }`}
                >
                  {step > i + 1 ? "\u2713" : i + 1}
                </div>
                <span
                  className={`text-sm font-medium whitespace-nowrap transition-colors ${
                    step >= i + 1 ? "text-black" : "text-[#888888]"
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 rounded-full transition-colors ${
                  step > i + 1 ? "bg-black" : "bg-[#e5e5e5]"
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="rounded-lg border border-[#e5e5e5] bg-white p-6 space-y-6">
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-lg font-semibold text-black tracking-tight">Pilih Produk</h2>
              <p className="text-sm text-[#666666] mt-0.5">Pilih dari katalog atau Contract aktif</p>
            </div>

            <div className="flex gap-3">
              <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-[#e5e5e5] bg-white text-sm font-medium text-black hover:bg-[#fafafa] transition-colors">
                Dari Katalog
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-[#e5e5e5] bg-white text-sm font-medium text-black hover:bg-[#fafafa] transition-colors">
                Dari Contract
              </button>
            </div>

            <div className="rounded-md border border-[#e5e5e5] divide-y divide-[#f0f0f0] overflow-hidden">
              {[
                { name: "Kertas A4 80gsm - Box", price: "Rp 45.000", stock: 500 },
                { name: "Pulpen Gel Biru - Pack 12", price: "Rp 36.000", stock: 120 },
                { name: "Tinta Printer Epson 001 - Black", price: "Rp 150.000", stock: 200 },
                { name: "Map Folder Plastik - Pack 50", price: "Rp 25.000", stock: 300 },
              ].map((prod, i) => (
                <div key={i} className="flex items-center justify-between px-5 py-3.5 hover:bg-[#fafafa] transition-colors">
                  <div>
                    <p className="text-sm font-semibold text-black">{prod.name}</p>
                    <p className="text-xs text-[#666666] mt-0.5">Stok: {prod.stock}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold text-black">{prod.price}</span>
                    <input
                      type="number"
                      defaultValue={0}
                      min={0}
                      className="w-16 text-center rounded-md border border-[#e5e5e5] bg-white px-2 py-1.5 text-sm font-medium text-black focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-lg font-semibold text-black tracking-tight">Hitung Ongkir (Multi-Origin)</h2>
              <p className="text-sm text-[#666666] mt-0.5">Sistem otomatis menghitung ongkir per origin</p>
            </div>

            <div className="rounded-md border border-[#e5e5e5] bg-[#fafafa] p-4">
              <p className="text-sm font-semibold text-black">Validasi: Berat & Dimensi Produk</p>
              <p className="text-xs text-[#666666] mt-1">Semua produk harus memiliki berat & dimensi. Produk tanpa data diblokir.</p>
            </div>

            <div className="rounded-md border border-[#e5e5e5] overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#fafafa] border-b border-[#e5e5e5]">
                    <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-5 py-3">Origin</th>
                    <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-5 py-3">Chargeable Weight</th>
                    <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-5 py-3">Tarif/kg</th>
                    <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-5 py-3">Estimasi Ongkir</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0f0f0]">
                  <tr className="hover:bg-[#fafafa] transition-colors">
                    <td className="px-5 py-3.5 text-sm font-medium text-black">Jakarta</td>
                    <td className="px-5 py-3.5 text-sm text-[#666666]">510 kg</td>
                    <td className="px-5 py-3.5 text-sm text-[#666666]">Rp 294</td>
                    <td className="px-5 py-3.5 text-sm font-semibold text-black">Rp 150.000</td>
                  </tr>
                  <tr className="hover:bg-[#fafafa] transition-colors">
                    <td className="px-5 py-3.5 text-sm font-medium text-black">Klaten</td>
                    <td className="px-5 py-3.5 text-sm text-[#666666]">12 kg</td>
                    <td className="px-5 py-3.5 text-sm text-[#666666]">Rp 8.333</td>
                    <td className="px-5 py-3.5 text-sm font-semibold text-black">Rp 100.000</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="border-t border-[#e5e5e5] bg-[#fafafa]">
                    <td colSpan={3} className="px-5 py-3.5 text-sm font-semibold text-black text-right">Total Ongkir:</td>
                    <td className="px-5 py-3.5 text-sm font-semibold text-black">Rp 250.000</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#888888] uppercase tracking-wider mb-1.5">Delivery Term</label>
                <select className="w-full rounded-md border border-[#e5e5e5] bg-white px-3.5 py-2.5 text-sm font-medium text-black focus:outline-none focus:border-black transition-colors">
                  <option value="non_franco">Non-Franco (Beli+Ongkir)</option>
                  <option value="franco">Franco (Termasuk Ongkir)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#888888] uppercase tracking-wider mb-1.5">Metode Pembayaran</label>
                <select className="w-full rounded-md border border-[#e5e5e5] bg-white px-3.5 py-2.5 text-sm font-medium text-black focus:outline-none focus:border-black transition-colors">
                  <option value="top30">TOP 30 Hari</option>
                  <option value="top60">TOP 60 Hari</option>
                  <option value="cbd">CBD (Cash Before Delivery)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-lg font-semibold text-black tracking-tight">Konfirmasi Sales Order</h2>
              <p className="text-sm text-[#666666] mt-0.5">Periksa kembali detail pesanan sebelum terbitkan</p>
            </div>

            <div className="rounded-md border border-[#e5e5e5] divide-y divide-[#f0f0f0] overflow-hidden">
              <div className="flex justify-between px-5 py-3.5">
                <span className="text-sm text-[#666666]">Total Produk</span>
                <span className="text-sm font-semibold text-black">Rp 11.800.000</span>
              </div>
              <div className="flex justify-between px-5 py-3.5">
                <span className="text-sm text-[#666666]">Total Ongkir</span>
                <span className="text-sm font-semibold text-black">Rp 250.000</span>
              </div>
              <div className="flex justify-between px-5 py-3.5">
                <span className="text-sm text-[#666666]">Payment Term</span>
                <span className="text-sm font-medium text-black">TOP 30 Hari</span>
              </div>
              <div className="flex justify-between px-5 py-3.5">
                <span className="text-sm text-[#666666]">Delivery Term</span>
                <span className="text-sm font-medium text-black">Non-Franco</span>
              </div>
              <div className="flex justify-between px-5 py-4 bg-[#fafafa]">
                <span className="text-sm font-semibold text-black">Grand Total</span>
                <span className="text-sm font-semibold text-black">Rp 12.050.000</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-[#666666] border border-[#e5e5e5] rounded-md hover:bg-[#fafafa] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          ← Sebelumnya
        </button>
        {step < 3 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-black text-white text-sm font-medium rounded-md hover:bg-[#1a1a1a] transition-colors"
          >
            Selanjutnya →
          </button>
        ) : (
          <button
            onClick={() => router.push("/so")}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-black text-white text-sm font-medium rounded-md hover:bg-[#1a1a1a] transition-colors"
          >
            Terbitkan SO
          </button>
        )}
      </div>
    </div>
  );
}
