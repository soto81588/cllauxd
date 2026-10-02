import { useI18n } from "@/lib/i18n";
import { CALENDLY_URL } from "@/lib/booking";

export default function Hero() {
  const { t } = useI18n();
  const h = t.hero;

  return (
    <section id="top" className="pt-32 pb-20 lg:pt-44 lg:pb-28 px-6 lg:px-10">
      <div className="mx-auto max-w-3xl text-center flex flex-col items-center">
        <img src={`${import.meta.env.BASE_URL}vantier-logo.png`} alt="Vantier logo" className="h-12 w-auto mb-8" />

        <span className="inline-block font-body text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[#A3895D] border border-[#A3895D]/40 rounded-full px-5 py-2 mb-8">
          {h.badge}
        </span>

        <h1 className="font-display text-[2.3rem] sm:text-5xl lg:text-[3.6rem] leading-[1.1] font-medium text-[#1A1A1A] tracking-tight">
          {h.headline1}
          <br />
          {h.headline2}
          <br />
          <span className="italic text-[#A3895D]" style={{ fontFamily: "'Playfair Display', serif" }}>
            {h.headline3}
          </span>
        </h1>

        <div className="mt-7 font-body text-sm text-[#1A1A1A]/80 tracking-wide">
          <span>{h.tag1}</span>
          <span className="mx-3 text-[#C9C4BA]">|</span>
          <span>{h.tag2}</span>
          <span className="mx-3 text-[#C9C4BA]">|</span>
          <span>{h.tag3}</span>
        </div>

        <p className="mt-8 max-w-xl font-display text-lg sm:text-xl leading-relaxed text-[#1A1A1A]/85">
          {h.body}
        </p>

        <div className="mt-6 font-body text-sm text-[#1A1A1A]/75 tracking-wide">
          <span className="font-semibold text-[#1A1A1A]">Juan Soto</span>
          <span className="mx-2 text-[#C9C4BA]">·</span>
          <span>{h.founderRole || "CEO, Vantier"}</span>
          <span className="mx-2 text-[#C9C4BA]">·</span>
          <a href="tel:+17866902405" className="border-b border-[#1A1A1A]/30 hover:text-[#A3895D] hover:border-[#A3895D] transition-colors">(786) 690-2405</a>
        </div>

        <div className="mt-10 flex flex-col items-stretch gap-3 w-full max-w-xs">
          <a
            href="#apply"
            className="bg-[#1A1A1A] text-[#F5F2ED] font-body text-sm font-medium tracking-wide py-4 px-6 hover:bg-[#A3895D] transition-colors text-center rounded-full"
          >
            {h.ctaPrimary}
          </a>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 font-body text-sm tracking-wide text-[#1A1A1A]/65 hover:text-[#A3895D] transition-colors text-center underline underline-offset-4"
          >
            {h.ctaCall || "or book a free 30-min call"}
          </a>
        </div>

        <p className="mt-6 font-body text-xs text-[#1A1A1A]/55 tracking-wide">
          {h.fineprint}
        </p>
      </div>
    </section>
  );
}
