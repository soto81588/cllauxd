import { useI18n } from "@/lib/i18n";

export default function Services() {
  const { t } = useI18n();
  const s = t.services;

  const services = [
    { num: "001", title: s.s1Title, body: s.s1Body },
    { num: "002", title: s.s2Title, body: s.s2Body },
    { num: "003", title: s.s3Title, body: s.s3Body },
    { num: "004", title: s.s4Title, body: s.s4Body },
  ];

  return (
    <section id="what-we-do" className="py-20 lg:py-28 px-6 lg:px-10 bg-[#1A1A1A]">
      <div className="mx-auto max-w-3xl">
        <p className="font-body text-[11px] tracking-[0.3em] uppercase text-[#C5A975] mb-5 text-center">
          {s.eyebrow}
        </p>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] leading-tight font-medium text-white text-center mb-6">
          {s.title1} <span className="italic text-[#C5A975]">{s.title2}</span>
        </h2>
        <p className="font-body text-base text-white/60 text-center max-w-2xl mx-auto leading-relaxed">
          {s.subtitle}
        </p>

        <div className="mt-14 flex flex-col gap-5">
          {services.map((item) => (
            <div key={item.num} className="bg-[#2A2A26] border border-white/10 rounded-2xl px-7 py-8">
              <span className="font-body text-xs tracking-widest text-[#C5A975]">[{item.num}]</span>
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-white mt-3 mb-3">
                {item.title}
              </h3>
              <p className="font-body text-base text-white/60 leading-relaxed max-w-xl">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
