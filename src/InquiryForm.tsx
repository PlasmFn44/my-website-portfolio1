import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  BUSINESS_EMAIL,
  COMMISSION,
  PAYMENT_METHODS,
  PAKISTAN_TIME_LABEL,
  type EditDuration,
  type InquiryType,
  type PaymentMethod,
} from "../data/commission";
import { createInquiryDraft } from "../utils/inquiry";
import { formatUsd } from "../utils/pricing";
import { DurationSelector } from "./DurationSelector";
import { QuantitySelector } from "./QuantitySelector";
import { OrderSummary } from "./OrderSummary";
import { ArrowRightIcon, EnvelopeIcon } from "./Icons";

interface InquiryFormProps {
  duration: EditDuration;
  onDurationChange: (duration: EditDuration) => void;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  inquiryType: InquiryType;
  onInquiryTypeChange: (type: InquiryType) => void;
}

const inputClass = "mt-2 w-full rounded-xl border border-white/10 bg-[#0d1322] px-4 py-3.5 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/20";

export function InquiryForm({ duration, onDurationChange, quantity, onQuantityChange, inquiryType, onInquiryTypeChange }: InquiryFormProps) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const payment: PaymentMethod = "easypaisa";
  const [error, setError] = useState("");
  const [draft, setDraft] = useState<ReturnType<typeof createInquiryDraft> | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const isCommission = inquiryType === "commission";

  useEffect(() => {
    setDraft(null);
  }, [duration, quantity, inquiryType]);

  useEffect(() => {
    if (draft) headingRef.current?.focus({ preventScroll: true });
  }, [draft]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      setError("Please add your name and a short message before preparing your email.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setError("Please enter a valid email address so Plasm can reply.");
      return;
    }

    setError("");
    setDraft(createInquiryDraft({ ...form, type: inquiryType, duration, quantity, payment }));
  };

  const editDraft = () => {
    setDraft(null);
    window.requestAnimationFrame(() => nameRef.current?.focus({ preventScroll: true }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      onChange={() => error && setError("")}
      aria-labelledby="inquiry-heading"
      className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8"
    >
      {draft ? (
        <div className="py-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">Ready for your inbox</p>
          <h3 id="inquiry-heading" ref={headingRef} tabIndex={-1} className="mt-3 font-display text-2xl font-bold text-white outline-none">
            Your email draft is ready
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            Nothing has been sent or charged. Open your email app, review the details, then send it to {BUSINESS_EMAIL}.
          </p>

          <dl className="my-6 space-y-3 border-y border-white/10 py-5 text-sm">
            <div>
              <dt className="text-slate-500">To</dt>
              <dd className="mt-1 break-all text-slate-200">{BUSINESS_EMAIL}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Subject</dt>
              <dd className="mt-1 text-slate-200">{draft.subject}</dd>
            </div>
          </dl>
          <p className="max-h-64 overflow-auto whitespace-pre-wrap break-words text-sm leading-7 text-slate-300">{draft.body}</p>

          <a href={draft.href} className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-violet-600 px-6 py-4 text-sm font-bold text-white transition hover:from-sky-500 hover:to-violet-500">
            <EnvelopeIcon className="h-4 w-4" aria-hidden="true" />
            Open email app
          </a>
          <button type="button" onClick={editDraft} className="mt-3 w-full py-3 text-sm font-semibold text-slate-300 transition hover:text-white">
            Edit my brief
          </button>
          <p className="mt-2 text-center text-xs leading-6 text-slate-400">
            No email app set up? Copy the details above into an email to <a href={`mailto:${BUSINESS_EMAIL}`} className="break-all text-sky-300 underline underline-offset-4">{BUSINESS_EMAIL}</a>.
          </p>
        </div>
      ) : (
        <>
          <h3 id="inquiry-heading" className="font-display text-xl font-bold text-white">Let's make it happen.</h3>
          <p className="mb-7 mt-2 text-sm leading-6 text-slate-400">Tell me what you have in mind. I'll take it from there.</p>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-slate-300">Your name</span>
              <input ref={nameRef} name="name" type="text" autoComplete="name" required maxLength={100} value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Your name" className={inputClass} />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-300">Email</span>
              <input name="email" type="email" autoComplete="email" required maxLength={254} value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="you@example.com" className={inputClass} />
            </label>
          </div>

          <label className="mt-5 block">
            <span className="text-sm font-semibold text-slate-300">What are you reaching out for?</span>
            <select name="inquiry-type" value={inquiryType} onChange={(event) => onInquiryTypeChange(event.target.value as InquiryType)} className={inputClass}>
              <option value="commission">{COMMISSION.name} - from {formatUsd(COMMISSION.unitPricesCents[30])} {COMMISSION.currency}</option>
              <option value="business">Business / collaboration inquiry</option>
            </select>
          </label>

          {isCommission && (
            <div className="mt-6 space-y-5">
              <DurationSelector name="inquiry-duration" value={duration} onChange={onDurationChange} />
              <QuantitySelector value={quantity} onChange={onQuantityChange} />
              <OrderSummary duration={duration} quantity={quantity} />
              <p className="text-sm leading-6 text-sky-200">
                {COMMISSION.deliveryHours}-hour delivery / Vertical {COMMISSION.aspectRatio}
              </p>
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-sm font-semibold text-slate-300">Payment method</p>
                <p className="mt-1 text-sm font-bold text-white">{PAYMENT_METHODS[payment]}</p>
                <p id="payment-note" className="mt-2 text-xs leading-6 text-slate-400">
                  Easypaisa is the only payment method accepted right now. Payment is arranged directly; this website does not collect payments.
                </p>
              </div>
            </div>
          )}

          <label className="mt-5 block">
            <span className="text-sm font-semibold text-slate-300">{isCommission ? "Your footage & ideas" : "Your message"}</span>
            <textarea name="message" rows={5} required maxLength={2000} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder={isCommission ? "Share footage links and references for each edit, the style you like, and any moments you'd like included." : "Tell me about your collaboration or business inquiry."} className={`${inputClass} resize-y`} />
          </label>

          {error && <p role="alert" className="mt-4 text-sm font-medium text-rose-300">{error}</p>}

          <button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-violet-600 px-6 py-4 text-sm font-bold text-white transition hover:from-sky-500 hover:to-violet-500">
            Prepare my email
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </button>
          <p className="mt-4 text-center text-xs leading-6 text-slate-400">
            Review your draft before opening your email app.<br />
            Based in Pakistan / {PAKISTAN_TIME_LABEL}
          </p>
        </>
      )}
    </form>
  );
}