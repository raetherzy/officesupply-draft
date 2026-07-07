import { PrincipalMenuItem } from "@/lib/principal-types";

export const principalMenuItems: PrincipalMenuItem[] = [
  {
    label: "Dashboard",
    href: "/principal/dashboard",
    icon: "grid",
    roles: ["sales_principal", "product_manager"],
  },
  {
    label: "PO Masuk",
    href: "/principal/po",
    icon: "file-text",
    roles: ["sales_principal"],
  },
  {
    label: "Inbound & Label QR",
    href: "/principal/inbound",
    icon: "truck",
    roles: ["sales_principal"],
  },
  {
    label: "Konfirmasi Pengiriman",
    href: "/principal/delivery",
    icon: "send",
    roles: ["sales_principal"],
  },
  {
    label: "View Invoice",
    href: "/principal/invoice",
    icon: "receipt",
    roles: ["sales_principal"],
  },
  {
    label: "Kelola Produk",
    href: "/principal/products",
    icon: "shield",
    roles: ["product_manager"],
  },
];
