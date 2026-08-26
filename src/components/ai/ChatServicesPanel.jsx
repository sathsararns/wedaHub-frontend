import React from "react";
import { SERVICES } from "../../services/aiChatService";

export default function ChatServicesPanel({ onBook }) {
  return (
    <div className="mx-auto max-w-6xl">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900">
          Our Services
        </h1>

        <p className="mt-2 text-zinc-500">
          Browse our trusted home services and instantly start a booking with
          WedaHub AI.
        </p>
      </div>

      {/* Services */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {SERVICES.map((service) => (
          <div
            key={service.id}
            className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <img
              src={service.image}
              alt={service.name}
              className="h-52 w-full object-cover"
            />

            <div className="p-5">
              <h2 className="text-lg font-semibold text-zinc-900">
                {service.name}
              </h2>

              <p className="mt-3 text-sm leading-6 text-zinc-500">
                {service.blurb}
              </p>

              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}