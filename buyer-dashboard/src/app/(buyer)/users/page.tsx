"use client";

import { allUsers } from "@/lib/mock-data";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-black tracking-tight">Kelola User Buyer</h1>
          <p className="text-sm text-[#666666] mt-1">Atur user dan role di perusahaan Anda (HeadPurchasing only)</p>
        </div>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white text-sm font-semibold rounded-md hover:bg-[#333333] transition-colors whitespace-nowrap">
          + Tambah User
        </button>
      </div>

      {/* Schema Info */}
      <div className="rounded-md bg-[#fafafa] border border-[#e5e5e5] px-6 py-4">
        <p className="text-sm font-semibold text-black">Skema Aktif: Schema 3 (3 Role)</p>
        <p className="text-xs text-[#666666] mt-1">
          HeadPurchasing (approval) + AdminPurchasing (pembuat SO) + FinanceBuyer (pembayaran).
        </p>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-[#e5e5e5] bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
                <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-4">Nama</th>
                <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-4">Email</th>
                <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-4">Role</th>
                <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-4">Status</th>
                <th className="text-left text-[11px] font-medium text-[#888888] uppercase tracking-wider px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f0f0]">
              {allUsers.map((user) => {
                const roleLabel: Record<string, string> = {
                  head_purchasing: "Head Purchasing",
                  admin_purchasing: "Admin Purchasing",
                  finance_buyer: "Finance Buyer",
                };
                const roleColor: Record<string, string> = {
                  head_purchasing: "bg-blue-100 text-blue-700",
                  admin_purchasing: "bg-amber-100 text-amber-700",
                  finance_buyer: "bg-emerald-100 text-emerald-700",
                };
                return (
                  <tr key={user.id} className="hover:bg-[#fafafa] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded bg-black text-white flex items-center justify-center text-xs font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <span className="text-sm font-semibold text-black">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#666666]">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${roleColor[user.role]}`}>
                        {roleLabel[user.role]}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button className="text-xs font-semibold text-black hover:underline transition-colors">
                          Edit
                        </button>
                        <button className="text-xs font-semibold text-rose-500 hover:text-rose-600 transition-colors">
                          Nonaktifkan
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
