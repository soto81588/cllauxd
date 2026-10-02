import { X, Check } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { translations } from "@/lib/translations";

export default function Comparison() {
  const { t } = useI18n();
  // Falls back to English until this section is translated.
  const c = t.compare || translations.en.compare;

  return (
    <section id="why-vantier" className="py-20 lg:py-28 px-6 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <p className="font-body text-[11px] tracking-[0.3em] uppercase text-[#A3895D] mb-5 text-center">
          {c.eyebrow}
        </p>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] leading-tight font-medium text-[#1A1A1A] text-center mb-14">
          {c.title1} <span className="italic text-[#A3895D]">{c.title2}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white border border-[#E4E0D8] rounded-2xl px-7 py-8">
            <h3 className="font-body text-[11px] tracking-[0.3em] uppercase text-[#1A1A1A]/50 mb-6">
              {c.othersLabel}
            </h3>
            <ul className="space-y-4">
              {c.rows.map(([other]) => (
                <li key={other} className="flex items-start gap-3">
                  <X size={18} className="mt-0.5 shrink-0 text-[#1A1A1A]/35" />
                  <span className="font-body text-base text-[#1A1A1A]/60 leading-relaxed">{other}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#1A1A1A] border border-[#1A1A1A] rounded-2xl px-7 py-8">
            <h3 className="font-display text-xl font-semibold tracking-[0.2em] uppercase text-[#C5A975] mb-6">
              {c.usLabel}
            </h3>
            <ul className="space-y-4">
              {c.rows.map(([, ours]) => (
                <li key={ours} className="flex items-start gap-3">
                  <Check size={18} className="mt-0.5 shrink-0 text-[#C5A975]" />
                  <span className="font-body text-base text-white/85 leading-relaxed">{ours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
