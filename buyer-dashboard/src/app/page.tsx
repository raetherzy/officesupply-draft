import Link from "next/link";

const features = [
  {
    title: "Buyer Dashboard",
    description: "Procurement dashboard lengkap: Sales Order, RFQ, Quotation, Contract, Tracking, Invoice, dan Payment.",
    href: "/dashboard",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
    badge: "Aktif",
  },
  {
    title: "Principal Panel",
    description: "Dashboard Principal: manajemen PO masuk, inbound & label QR, konfirmasi pengiriman, invoice, dan produk.",
    href: "/principal/dashboard",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375M12 9.75v.75m0 2.25v.75m0 2.25v.75m0 2.25v.75" />
      </svg>
    ),
    badge: "Aktif",
  },
  {
    title: "Admin Console",
    description: "Dashboard Internal — manajemen user, approval workflow, dan konfigurasi sistem procurement.",
    href: "/admin/dashboard",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    badge: "Aktif",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <header className="border-b border-[#e5e5e5] bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black text-xs font-bold text-white">
              OS
            </div>
            <div>
              <p className="text-sm font-semibold text-black">OfficeSupply</p>
              <p className="text-[11px] text-[#888888]">B2B Procurement Platform</p>
            </div>
          </div>
          <Link
            href="/dashboard"
            className="rounded-md bg-black px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-[#222222]"
          >
            Buka Dashboard
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-[#e5e5e5] bg-white px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-black sm:text-4xl">
            Platform Procurement B2B
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[#666666]">
            Kelola seluruh siklus procurement perusahaan Anda — dari Sales Order, RFQ, Quotation, Contract, hingga Tracking pengiriman dan Invoice — dalam satu platform terintegrasi.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#222222]"
            >
              Masuk ke Dashboard
            </Link>
            <span className="text-sm text-[#888888]">PT Nirmana Sthavira Dharma</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-8">
          <h2 className="text-lg font-semibold tracking-tight text-black">Fitur</h2>
          <p className="mt-1 text-sm text-[#888888]">Modul yang tersedia dalam platform.</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {features.map((feat) => (
            <Link
              key={feat.title}
              href={feat.href}
              className="group relative rounded-lg border border-[#e5e5e5] bg-white p-6 transition-colors hover:border-[#d4d4d4]"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-[#f5f5f5] text-black">
                {feat.icon}
              </div>
              <h3 className="text-sm font-semibold text-black">{feat.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[#888888]">
                {feat.description}
              </p>
              <span
                className={`mt-4 inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                  feat.badge === "Aktif"
                    ? "bg-[#d1fae5] text-[#065f46]"
                    : "bg-[#f5f5f5] text-[#999999]"
                }`}
              >
                {feat.badge}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e5e5e5] bg-white">
        <div className="mx-auto max-w-5xl px-6 py-6 text-center">
          <p className="text-xs text-[#888888]">
            &copy; {new Date().getFullYear()} PT Nirmana Sthavira Dharma. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}