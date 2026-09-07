import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

import { SERVICES } from "../../services/aiChatService";

export default function ChatServicesPanel({ onBook }) {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-900 text-white">
            <Sparkles className="h-5 w-5" />
          </div>

          <div>
            <h1 className="text-[28px] font-semibold tracking-tight text-zinc-900">
              Services
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              Choose a service to start a new booking conversation.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {SERVICES.map((service) => (
          <article
            key={service.id}
            className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="aspect-[16/10] overflow-hidden bg-zinc-100">
              <img
                src={service.image}
                alt={service.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-zinc-900">
                    {service.name}
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-500">
                    {service.blurb}
                  </p>
                </div>

                <span className="shrink-0 rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700">
                  Rs {service.priceFrom.toLocaleString()}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-500">
                <span className="rounded-full bg-zinc-50 px-2.5 py-1">
                  {service.duration}
                </span>
                <span className="rounded-full bg-zinc-50 px-2.5 py-1">
                  {service.unit}
                </span>
              </div>

              <button
                type="button"
                onClick={() =>
                  onBook?.(`I need ${service.name.toLowerCase()}`)
                }
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800"
              >
                Book now
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}