"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PrincipalRole } from "@/lib/principal-types";
import { principalMenuItems } from "@/lib/principal-menu";
import { principalUser, productManagerUser } from "@/lib/principal-mock-data";

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

const icons: Record<string, React.ReactNode> = {
  grid: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  ),
  "file-text": (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
  truck: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  ),
  send: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
    </svg>
  ),
  receipt: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
  shield: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
};

export default function PrincipalLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [activeRole, setActiveRole] = useState<PrincipalRole>(principalUser.role);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const visibleMenu = principalMenuItems.filter((item) => item.roles.includes(activeRole));

  const currentPrincipal = activeRole === "product_manager" ? productManagerUser : principalUser;

  const roleLabel: Record<PrincipalRole, string> = {
    sales_principal: "Sales Principal",
    product_manager: "Product Manager",
  };

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
          {/* Logo */}
          <div className="flex items-center gap-3 border-b border-[#e5e5e5] px-5 py-4">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-black text-xs font-bold text-white">
              OS
            </div>
            <div>
              <p className="text-sm font-semibold text-black">OfficeSupply</p>
              <p className="text-[11px] text-[#888888]">B2B Procurement</p>
            </div>
          </div>

          {/* Company */}
          <div className="border-b border-[#e5e5e5] px-5 py-3">
            <p className="text-[10px] font-medium uppercase tracking-widest text-[#888888]">Workspace</p>
            <p className="mt-1 text-sm font-medium text-black">{currentPrincipal.company_name}</p>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto px-3 py-3">
            {visibleMenu.map((item) => {
              const isActive =
                pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
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
                  <span className="flex h-4 w-4 items-center justify-center">
                    {icons[item.icon] || null}
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Role Switcher */}
          <div className="border-t border-[#e5e5e5] px-5 py-4">
            <p className="mb-2 text-[10px] font-medium uppercase tracking-widest text-[#888888]">Role</p>
            <select
              value={activeRole}
              onChange={(e) => setActiveRole(e.target.value as PrincipalRole)}
              className="w-full rounded-md border border-[#e5e5e5] bg-white px-3 py-2 text-sm text-black focus:border-black"
            >
              <option value="sales_principal">Sales Principal</option>
              <option value="product_manager">Product Manager</option>
            </select>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className={cn("transition-all duration-200", sidebarOpen ? "pl-64" : "pl-0")}>
        {/* Header */}
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
                <p className="text-[10px] font-medium uppercase tracking-widest text-[#888888]">Principal Console</p>
                <p className="text-sm font-medium text-black">{currentPrincipal.company_name}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-md border border-[#e5e5e5] bg-[#fafafa] px-2.5 py-1 text-[11px] font-medium text-[#666666]">
                {roleLabel[activeRole]}
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
                {currentPrincipal.name.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1400px] px-6 py-6">{children}</main>
      </div>
    </div>
  );
}
