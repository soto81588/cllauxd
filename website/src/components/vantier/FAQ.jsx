import { Plus } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { translations } from "@/lib/translations";

export default function FAQ() {
  const { t } = useI18n();
  // Falls back to English until this section is translated.
  const f = t.faq || translations.en.faq;

  return (
    <section id="faq" className="py-20 lg:py-28 px-6 lg:px-10 bg-[#F0EDE6]">
      <div className="mx-auto max-w-3xl">
        <p className="font-body text-[11px] tracking-[0.3em] uppercase text-[#A3895D] mb-5 text-center">
          {f.eyebrow}
        </p>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] leading-tight font-medium text-[#1A1A1A] text-center mb-14">
          {f.title1} <span className="italic text-[#A3895D]">{f.title2}</span>
        </h2>

        <div className="space-y-3">
          {f.items.map((item) => (
            <details
              key={item.q}
              className="group bg-white border border-[#E4E0D8] rounded-2xl px-7 py-6 open:pb-7"
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <span className="font-display text-lg sm:text-xl font-semibold text-[#1A1A1A]">{item.q}</span>
                <Plus
                  size={20}
                  className="shrink-0 text-[#A3895D] transition-transform duration-200 group-open:rotate-45"
                />
              </summary>
              <p className="mt-4 font-body text-base text-[#1A1A1A]/70 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
