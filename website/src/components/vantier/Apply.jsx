import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { CALENDLY_URL } from "@/lib/booking";
import { submitApplication } from "@/lib/applications";

export default function Apply() {
  const { t } = useI18n();
  const a = t.apply;
  const [form, setForm] = useState({ name: "", clinic: "", email: "", phone: "", website: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setError("");

    try {
      await submitApplication(form);
      if (typeof window !== "undefined" && typeof window.fbq === "function") {
        window.fbq("track", "Lead");
      }
      setStatus("sent");
    } catch (err) {
      setError(a.error);
      setStatus("error");
    }
  };

  if (status === "sent") {
    const referralUrl = `${window.location.origin}${window.location.pathname}?ref=${btoa(encodeURIComponent(form.email))}`;
    const shareText = `I just signed up for a free Meta ads trial with Vantier. Thought you might want to check it out: ${referralUrl}`;

    return (
      <section id="apply" className="py-20 lg:py-28 px-6 lg:px-10">
        <div className="mx-auto max-w-xl text-center">
          <p className="font-body text-[11px] tracking-[0.3em] uppercase text-[#A3895D] mb-5">
            {a.eyebrowReceived}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-medium text-[#1A1A1A] mb-5">
            {a.successTitle}
          </h2>
          <p className="font-display text-lg text-[#1A1A1A]/75 leading-relaxed mb-12">
            {a.successBody}
          </p>

          <div className="border-t border-[#D1D0CE] pt-10 text-left">
            <p className="font-display text-lg text-[#1A1A1A] leading-relaxed mb-6">
              Know another business owner who could use more booked appointments? Share your personal link.
            </p>
            <div className="flex items-stretch gap-3 mb-4">
              <input
                readOnly
                value={referralUrl}
                onClick={(e) => e.target.select()}
                className="flex-1 bg-[#F5F2ED] border border-[#C9C4BA] rounded-full px-5 py-3 font-body text-sm text-[#1A1A1A] outline-none"
              />
              <button
                type="button"
                onClick={async () => {
                  try { await navigator.clipboard.writeText(referralUrl); } catch {}
                }}
                className="shrink-0 bg-[#1A1A1A] text-[#F5F2ED] font-body text-sm font-medium tracking-wide px-5 py-3 rounded-full hover:bg-[#A3895D] transition-colors"
              >
                Copy link
              </button>
            </div>
            <div className="bg-[#F0EDE6] rounded-2xl p-5">
              <p className="font-body text-xs tracking-wide text-[#1A1A1A]/60 mb-2">Instagram DM message</p>
              <p className="font-body text-sm text-[#1A1A1A]/80 leading-relaxed mb-3">{shareText}</p>
              <button
                type="button"
                onClick={async () => {
                  try { await navigator.clipboard.writeText(shareText); } catch {}
                }}
                className="text-[#A3895D] font-body text-sm font-medium tracking-wide hover:underline"
              >
                Copy DM message
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="apply" className="py-20 lg:py-28 px-6 lg:px-10 bg-[#F0EDE6]">
      <div className="mx-auto max-w-xl">
        <p className="font-body text-[11px] tracking-[0.3em] uppercase text-[#A3895D] mb-5 text-center">
          {a.eyebrow}
        </p>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] leading-tight font-medium text-[#1A1A1A] text-center mb-6">
          {a.title}
        </h2>
        <p className="font-display text-lg text-[#1A1A1A]/75 text-center leading-relaxed mb-12">
          {a.body}
        </p>

        <form onSubmit={submit} className="flex flex-col gap-7">
          <div>
            <label className="font-body text-xs tracking-wide text-[#1A1A1A]/60 mb-2 block">{a.labelName}</label>
            <input
              name="name"
              required
              value={form.name}
              onChange={onChange}
              className="w-full bg-transparent border-0 border-b border-[#C9C4BA] focus:border-[#1A1A1A] py-2.5 font-body text-base text-[#1A1A1A] outline-none transition-colors"
            />
          </div>
          <div>
            <label className="font-body text-xs tracking-wide text-[#1A1A1A]/60 mb-2 block">{a.labelClinic}</label>
            <input
              name="clinic"
              required
              value={form.clinic}
              onChange={onChange}
              className="w-full bg-transparent border-0 border-b border-[#C9C4BA] focus:border-[#1A1A1A] py-2.5 font-body text-base text-[#1A1A1A] outline-none transition-colors"
            />
          </div>
          <div>
            <label className="font-body text-xs tracking-wide text-[#1A1A1A]/60 mb-2 block">{a.labelEmail}</label>
            <input
              name="email"
              type="email"
              required
              value={form.email}
              onChange={onChange}
              className="w-full bg-transparent border-0 border-b border-[#C9C4BA] focus:border-[#1A1A1A] py-2.5 font-body text-base text-[#1A1A1A] outline-none transition-colors"
            />
          </div>
          <div>
            <label className="font-body text-xs tracking-wide text-[#1A1A1A]/60 mb-2 block">{a.labelPhone}</label>
            <input
              name="phone"
              type="tel"
              required
              value={form.phone}
              onChange={onChange}
              placeholder={a.placeholderPhone}
              className="w-full bg-transparent border-0 border-b border-[#C9C4BA] focus:border-[#1A1A1A] py-2.5 font-body text-base text-[#1A1A1A] outline-none transition-colors placeholder:text-[#1A1A1A]/30"
            />
          </div>
          <div>
            <label className="font-body text-xs tracking-wide text-[#1A1A1A]/60 mb-2 block">{a.labelWebsite}</label>
            <input
              name="website"
              type="text"
              value={form.website}
              onChange={onChange}
              placeholder={a.placeholderWebsite}
              className="w-full bg-transparent border-0 border-b border-[#C9C4BA] focus:border-[#1A1A1A] py-2.5 font-body text-base text-[#1A1A1A] outline-none transition-colors placeholder:text-[#1A1A1A]/30"
            />
          </div>

          {error && <p className="font-body text-sm text-red-700">{error}</p>}

          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-2 bg-[#1A1A1A] text-[#F5F2ED] font-body text-sm font-medium tracking-wide py-4 px-6 hover:bg-[#A3895D] transition-colors disabled:opacity-60 rounded-full"
          >
            {status === "sending" ? a.sending : a.submit}
          </button>
        </form>

        <p className="mt-6 text-center font-body text-sm text-[#1A1A1A]/70">
          {a.callPrompt || "Prefer to talk first?"}{" "}
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#1A1A1A] border-b border-[#1A1A1A] pb-0.5 hover:text-[#A3895D] hover:border-[#A3895D] transition-colors"
          >
            {a.callLink || "Book a free 30-min call →"}
          </a>
        </p>

        <div className="mt-10 border-t border-[#D1D0CE] pt-6 text-center">
          <p className="font-body text-sm tracking-[0.15em] uppercase text-[#1A1A1A] font-semibold">
            {a.guarantee}
          </p>
        </div>
      </div>
    </section>
  );
}
