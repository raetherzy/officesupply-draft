import { MenuItem } from "@/lib/types";

export const menuItems: MenuItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: "grid",
    roles: ["head_purchasing", "admin_purchasing", "finance_buyer"],
  },
  {
    label: "Sales Orders",
    href: "/so",
    icon: "file-text",
    roles: ["head_purchasing", "admin_purchasing"],
  },
  {
    label: "Buat SO",
    href: "/so/create",
    icon: "plus",
    roles: ["head_purchasing", "admin_purchasing"],
  },
  {
    label: "RFQ",
    href: "/rfq",
    icon: "send",
    roles: ["head_purchasing", "admin_purchasing"],
  },
  {
    label: "Quotation",
    href: "/quotation",
    icon: "message",
    roles: ["head_purchasing"],
  },
  {
    label: "Contract",
    href: "/contract",
    icon: "shield",
    roles: ["head_purchasing"],
  },
  {
    label: "Tracking",
    href: "/tracking",
    icon: "truck",
    roles: ["head_purchasing", "admin_purchasing"],
  },
  {
    label: "Invoice",
    href: "/invoice",
    icon: "receipt",
    roles: ["finance_buyer", "head_purchasing"],
  },
  {
    label: "Payment",
    href: "/payment",
    icon: "credit-card",
    roles: ["finance_buyer"],
  },
  {
    label: "History",
    href: "/history",
    icon: "clock",
    roles: ["head_purchasing", "admin_purchasing", "finance_buyer"],
  },
  {
    label: "Kelola User",
    href: "/users",
    icon: "users",
    roles: ["head_purchasing"],
  },
];