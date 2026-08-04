import { Envelope, MapPin, Clock } from "@phosphor-icons/react/dist/ssr";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function ContactInfo({
  info,
}: {
  info: Dictionary["contact"]["info"];
}) {
  return (
    <div className="rounded-[10px] border border-border bg-surface-raised p-8">
      <h2 className="text-xl font-semibold text-text-primary">
        {info.heading}
      </h2>
      <address className="mt-6 flex flex-col gap-5 text-sm not-italic text-text-muted">
        <div className="flex items-start gap-3">
          <Envelope size={20} weight="regular" className="mt-0.5 shrink-0 text-accent" />
          <a href={`mailto:${info.email}`} className="hover:text-text-primary">
            {info.email}
          </a>
        </div>
        <div className="flex items-start gap-3">
          <MapPin size={20} weight="regular" className="mt-0.5 shrink-0 text-accent" />
          <span>{info.address}</span>
        </div>
        <div className="flex items-start gap-3">
          <Clock size={20} weight="regular" className="mt-0.5 shrink-0 text-accent" />
          <span>{info.hours}</span>
        </div>
      </address>
    </div>
  );
}
