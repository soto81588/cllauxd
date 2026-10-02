import { useI18n } from "@/lib/i18n";

export default function Clients() {
  const { t } = useI18n();
  const c = t.clients;
  const focusPoints = [c.point1, c.point2, c.point3, c.point4];

  return (
    <section className="py-14 border-y border-[#E4E0D8]">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <p className="text-center font-body text-[11px] tracking-[0.3em] uppercase text-[#A3895D] mb-8">
          {c.title}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {focusPoints.map((point) => (
            <span key={point} className="font-display text-lg sm:text-xl text-[#1A1A1A]/70 italic">
              {point}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
