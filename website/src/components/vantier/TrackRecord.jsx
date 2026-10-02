import { useI18n } from "@/lib/i18n";

export default function TrackRecord() {
  const { t } = useI18n();
  const tr = t.track;

  const metrics = [
    { value: tr.m1Value, caption: tr.m1Caption },
    { value: tr.m2Value, caption: tr.m2Caption },
    { value: tr.m3Value, caption: tr.m3Caption },
    { value: tr.m4Value, caption: tr.m4Caption },
  ];

  return (
    <section id="track-record" className="py-20 lg:py-28 px-6 lg:px-10 bg-[#1A1A1A]">
      <div className="mx-auto max-w-4xl">
        <p className="font-body text-[11px] tracking-[0.3em] uppercase text-[#C5A975] mb-5 text-center">
          {tr.eyebrow}
        </p>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] leading-tight font-medium text-white text-center mb-5">
          {tr.title1} <span className="italic text-[#C5A975]">{tr.title2}</span>
        </h2>
        <p className="font-body text-sm text-white/55 text-center max-w-xl mx-auto mb-14">
          {tr.subtitle}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {metrics.map((m) => (
            <div
              key={m.value + m.caption}
              className="bg-[#2A2A26] border border-white/10 rounded-2xl px-8 py-10 text-center"
            >
              <div className="font-display text-5xl lg:text-6xl font-medium text-[#C5A975] mb-3">
                {m.value}
              </div>
              <p className="font-body text-sm text-white/65 leading-relaxed max-w-xs mx-auto">{m.caption}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 font-body text-sm text-white/45 text-center max-w-lg mx-auto leading-relaxed">
          {tr.note}
        </p>
      </div>
    </section>
  );
}
