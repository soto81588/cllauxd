import { useI18n } from "@/lib/i18n";

export default function Process() {
  const { t } = useI18n();
  const p = t.process;

  const phases = [
    { num: "01", title: p.p1Title, body: p.p1Body },
    { num: "02", title: p.p2Title, body: p.p2Body },
    { num: "03", title: p.p3Title, body: p.p3Body },
    { num: "04", title: p.p4Title, body: p.p4Body },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 px-6 lg:px-10 bg-[#F0EDE6]">
      <div className="mx-auto max-w-3xl">
        <p className="font-body text-[11px] tracking-[0.3em] uppercase text-[#A3895D] mb-5 text-center">
          {p.eyebrow}
        </p>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] leading-tight font-medium text-[#1A1A1A] text-center mb-6">
          {p.title1} <span className="italic text-[#A3895D]">{p.title2}</span>
        </h2>
        <p className="font-display text-lg text-[#1A1A1A]/75 text-center max-w-2xl mx-auto leading-relaxed">
          {p.subtitle}
        </p>

        <div className="mt-14">
          {phases.map((ph) => (
            <div key={ph.num} className="bg-white border border-[#E4E0D8] rounded-2xl px-7 py-8 mb-4 last:mb-0">
              <span className="font-display text-lg text-[#A3895D] block mb-3">{ph.num}</span>
              <h3 className="font-display text-2xl font-semibold text-[#1A1A1A] mb-2">{ph.title}</h3>
              <p className="font-body text-base text-[#1A1A1A]/70 leading-relaxed">{ph.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
