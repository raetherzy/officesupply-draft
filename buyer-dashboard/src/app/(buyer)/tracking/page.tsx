"use client";

import { trackings } from "@/lib/mock-data";
import Link from "next/link";

const statusColors: Record<string, string> = {
  processing: "bg-amber-100 text-amber-700",
  shipped: "bg-blue-100 text-blue-700",
  in_transit: "bg-purple-100 text-purple-700",
  delivered: "bg-emerald-100 text-emerald-700",
};

const statusLabels: Record<string, string> = {
  processing: "Processing",
  shipped: "Shipped",
  in_transit: "In Transit",
  delivered: "Delivered",
};

export default function TrackingListPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-black tracking-tight">Tracking Pengiriman</h1>
        <p className="text-sm text-[#666666] mt-1">Lacak status pengiriman Sales Order Anda via Jaladara</p>
      </div>

      {/* Tracking Cards */}
      <div className="space-y-5">
        {trackings.map((trk) => (
          <div
            key={trk.id}
            className="rounded-lg border border-[#e5e5e5] bg-white overflow-hidden hover:border-[#d4d4d4] transition-colors"
          >
            <div className="flex items-start justify-between px-6 py-5 border-b border-[#e5e5e5]">
              <div>
                <p className="text-sm font-semibold text-black">{trk.so_number}</p>
                <p className="text-xs text-[#666666] mt-0.5">
                  {trk.courier} · {trk.awb_number}
                </p>
              </div>
              <div className="text-right">
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${statusColors[trk.status]}`}>
                  {statusLabels[trk.status]}
                </span>
                <p className="text-xs text-[#888888] mt-1.5">Est: {trk.estimated_delivery}</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative px-6 py-5 ml-2">
              {trk.history.map((event, i) => (
                <div key={i} className="flex gap-4 pb-5 last:pb-0">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-3.5 h-3.5 rounded-full border-2 ${
                        i === trk.history.length - 1 && trk.status === "delivered"
                          ? "border-emerald-500 bg-emerald-500"
                          : i === trk.history.length - 1
                          ? "border-black bg-white"
                          : "border-[#cccccc] bg-[#cccccc]"
                      }`}
                    />
                    {i < trk.history.length - 1 && (
                      <div className="w-px h-full bg-[#e5e5e5]" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-black">{event.description}</p>
                    <p className="text-xs text-[#888888] mt-0.5">
                      {new Date(event.timestamp).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      {" · "}
                      {event.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
