"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import type { MenuItem, BuyerRole } from "@/lib/types";
import { adminRoleLabels } from "@/lib/admin-mock-data";

type AdminRole = "super_admin" | "super_user" | "sales_admin" | "purchasing_user" | "finance_user" | "head_purchasing";

const adminMenuItems: MenuItem[] = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: "grid",
    // role mapping belum dipakai secara runtime, tapi tetap mengikuti skema PRD internal
    roles: ["head_purchasing" as BuyerRole, "admin_purchasing" as BuyerRole, "finance_buyer" as BuyerRole],
  },
];

const adminUser = {
  id: "usr-admin-001",
  name: "Admin OfficeSupply",
  email: "admin@officesupply.local",
  role: "super_admin" as AdminRole,
  company_id: "comp-admin-001",
  company_name: "OfficeSupply Internal",
  role_label: adminRoleLabels["super_admin"],
};

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const icons: Record<string, React.ReactNode> = {
  grid: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25A2.25 2.25 0 0113.5 8.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
      />
    </svg>
  ),
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // PRD: role di sidebar kiri (mirip Buyer/Principal role switcher)
  const [activeAdminRole, setActiveAdminRole] = useState<AdminRole>(adminUser.role);

  const visibleMenu = adminMenuItems.filter((m) => m.roles.includes(activeAdminRole as any));


  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-64 border-r border-[#e5e5e5] bg-white transition-all duration-200",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-3 border-b border-[#e5e5e5] px-5 py-4">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-black text-xs font-bold text-white">OS</div>
            <div>
              <p className="text-sm font-semibold text-black">OfficeSupply</p>
              <p className="text-[11px] text-[#888888]">Internal Console</p>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-3">
            {visibleMenu.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href + item.label}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-[13px] font-medium transition-colors",
                    isActive
                      ? "bg-black text-white"
                      : "text-[#666666] hover:bg-[#f5f5f5] hover:text-black"
                  )}
                >
                  <span className="flex h-4 w-4 items-center justify-center">{icons[item.icon] || null}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-[#e5e5e5] px-5 py-4">
            <p className="mb-2 text-[10px] font-medium uppercase tracking-widest text-[#888888]">Role</p>
            <select
              value={activeAdminRole}
              onChange={(e) => setActiveAdminRole(e.target.value as AdminRole)}
              className="w-full rounded-md border border-[#e5e5e5] bg-white px-3 py-2 text-sm text-black focus:border-black"
            >
              <option value="super_admin">Super Admin</option>
              <option value="super_user">Super User</option>
              <option value="sales_admin">Sales Admin</option>
              <option value="purchasing_user">Purchasing</option>
              <option value="finance_user">Finance</option>
              <option value="head_purchasing">Head Purchasing</option>
            </select>
          </div>


        </div>
      </aside>

      {/* Main */}
      <div className={cn("transition-all duration-200", sidebarOpen ? "pl-64" : "pl-0")}>
        <header className="sticky top-0 z-30 border-b border-[#e5e5e5] bg-white/80 backdrop-blur-sm">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-[#e5e5e5] text-[#666666] hover:bg-[#f5f5f5] hover:text-black"
                aria-label="Toggle sidebar"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>

              <div>
                <p className="text-[10px] font-medium uppercase tracking-widest text-[#888888]">Admin Console</p>
                <p className="text-sm font-medium text-black">{adminUser.company_name}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
                {adminUser.name.charAt(0)}
              </div>
            </div>

          </div>
        </header>

        <main className="mx-auto max-w-[1400px] px-6 py-6">{children}</main>
      </div>
    </div>
  );
}

