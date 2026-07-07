"use client";

import { useState } from "react";
import { principalProducts } from "@/lib/principal-mock-data";

function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
}

type SortKey = "name" | "category" | "price" | "stock";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("name");

  const filtered = principalProducts
    .filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "category") return a.category.localeCompare(b.category);
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "stock") return b.stock - a.stock;
      return 0;
    });

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-black">Kelola Produk</h1>
          <p className="mt-0.5 text-sm text-[#888888]">
            Manage produk Principal — berat, dimensi, harga, stok
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortKey)}
            className="rounded-md border border-[#e5e5e5] bg-white px-3 py-2 text-sm text-black focus:border-black focus:outline-none"
          >
            <option value="name">Nama</option>
            <option value="category">Kategori</option>
            <option value="price">Harga</option>
            <option value="stock">Stok</option>
          </select>
          <input
            type="text"
            placeholder="Cari produk / SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-md border border-[#e5e5e5] bg-white px-3 py-2 text-sm text-black focus:border-black focus:outline-none w-56"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-[#e5e5e5] bg-white">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
              <th className="px-6 py-3 text-[12px] font-medium text-[#888888]">Produk</th>
              <th className="px-6 py-3 text-[12px] font-medium text-[#888888]">SKU</th>
              <th className="px-6 py-3 text-[12px] font-medium text-[#888888]">Kategori</th>
              <th className="px-6 py-3 text-[12px] font-medium text-[#888888]">Berat (g)</th>
              <th className="px-6 py-3 text-[12px] font-medium text-[#888888]">Dimensi (cm)</th>
              <th className="px-6 py-3 text-[12px] font-medium text-[#888888]">Harga</th>
              <th className="px-6 py-3 text-[12px] font-medium text-[#888888]">Stok</th>
              <th className="px-6 py-3 text-[12px] font-medium text-[#888888]">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0f0f0]">
            {filtered.map((product) => {
              const dimStr = `${product.length_cm}×${product.width_cm}×${product.height_cm}`;
              const isLowStock = product.stock > 0 && product.stock < 50;

              return (
                <tr key={product.id} className="transition-colors hover:bg-[#fafafa]">
                  <td className="px-6 py-4">
                    <p className="text-[13px] font-medium text-black">{product.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-[11px] text-[#888888] bg-[#f5f5f5] rounded px-1.5 py-0.5">{product.sku}</code>
                  </td>
                  <td className="px-6 py-4 text-[13px] text-[#666666]">{product.category}</td>
                  <td className="px-6 py-4 text-[13px] text-[#666666]">{product.weight_gram}</td>
                  <td className="px-6 py-4 text-[13px] text-[#666666]">{dimStr}</td>
                  <td className="px-6 py-4 text-[13px] font-medium text-black">{formatRupiah(product.price)}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-[13px] font-medium ${
                        product.stock === 0
                          ? "text-red-600"
                          : isLowStock
                          ? "text-amber-600"
                          : "text-black"
                      }`}
                    >
                      {product.stock === 0 ? "Habis" : product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block rounded border px-2 py-0.5 text-[11px] font-medium ${
                        product.is_active
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-[#f5f5f5] text-[#888888] border-[#e5e5e5]"
                      }`}
                    >
                      {product.is_active ? "Aktif" : "Nonaktif"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-[12px] text-[#888888]">
        Menampilkan {filtered.length} dari {principalProducts.length} produk
      </p>
    </div>
  );
}