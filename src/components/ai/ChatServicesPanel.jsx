import { ArrowRight } from "lucide-react";

import { SERVICES } from "../../services/aiChatService";

export default function ChatServicesPanel({ onBook }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-semibold tracking-tight text-zinc-900">
          Services
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Choose a service category to start a booking conversation.
        </p>
      </div>

      <ul aria-label="Service categories" className="divide-y divide-zinc-200 border-y border-zinc-200">
        {SERVICES.map((service) => (
          <li key={service.id}>
            <button
              type="button"
              onClick={() => onBook?.(`I need ${service.name.toLowerCase()}`)}
              className="group flex w-full items-center justify-between gap-4 px-3 py-4 text-left text-base font-medium text-zinc-800 transition-colors hover:bg-zinc-50 hover:text-zinc-950 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-zinc-900"
            >
              <span>{service.name}</span>
              <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 text-zinc-400 transition-transform group-hover:translate-x-1" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
