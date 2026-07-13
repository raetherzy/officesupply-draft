"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ContractDetailPage() {
  const router = useRouter();

  useEffect(() => {
    // PRD tidak mencantumkan fitur Contract untuk Buyer.
    // Redirect agar UI mengikuti PRD.
    router.replace("/history");
  }, [router]);

  return null;
}
