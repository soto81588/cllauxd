import { X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { translations } from "@/lib/translations";

export default function NotFor() {
  const { t } = useI18n();
  // Falls back to English until this section is translated.
  const n = t.notFor || translations.en.notFor;

  return (
    <section id="not-for" className="py-20 lg:py-28 px-6 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <p className="font-body text-[11px] tracking-[0.3em] uppercase text-[#A3895D] mb-5 text-center">
          {n.eyebrow}
        </p>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] leading-tight font-medium text-[#1A1A1A] text-center mb-12">
          {n.title1} <span className="italic text-[#A3895D]">{n.title2}</span>
        </h2>

        <ul className="space-y-4">
          {n.items.map((item) => (
            <li key={item} className="flex items-start gap-4 bg-white border border-[#E4E0D8] rounded-2xl px-6 py-5">
              <X size={20} className="shrink-0 mt-1 text-[#A3895D]" />
              <span className="font-body text-base text-[#1A1A1A]/80 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>

        <p className="mt-10 font-display text-xl text-[#1A1A1A] text-center">{n.closer}</p>
        <div className="mt-6 flex justify-center">
          <a
            href="#apply"
            className="bg-[#1A1A1A] text-[#F5F2ED] font-body text-sm font-medium tracking-wide py-4 px-8 hover:bg-[#A3895D] transition-colors text-center rounded-full"
          >
            {n.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
