import { COMMISSION, type EditDuration } from "../data/commission";
import { formatUsd } from "../utils/pricing";
import { ArrowRightIcon, DiscordIcon, SparklesIcon } from "./Icons";
import { DurationSelector } from "./DurationSelector";
import { QuantitySelector } from "./QuantitySelector";
import { OrderSummary } from "./OrderSummary";

interface CommissionOfferProps {
  duration: EditDuration;
  onDurationChange: (duration: EditDuration) => void;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onRequest: () => void;
  discordInvite: string;
}

export function CommissionOffer({ duration, onDurationChange, quantity, onQuantityChange, onRequest, discordInvite }: CommissionOfferProps) {
  return (
    <article
      aria-labelledby="commission-title"
      className="commission-offer mx-auto grid max-w-5xl overflow-hidden rounded-[1.75rem] border border-sky-400/25 bg-[#0d1524] md:grid-cols-2"
    >
      <div className="p-7 sm:p-10 lg:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">One package. All you need.</p>
        <h3 id="commission-title" className="mt-4 font-display text-3xl font-bold tracking-tight text-white">
          {COMMISSION.name}
        </h3>
        <p className="mt-4 max-w-sm leading-7 text-slate-400">
          Your footage, turned into an engaging vertical edit for Shorts, Reels, or TikTok.
        </p>

        <div className="mb-8 mt-8">
          <p className="flex flex-wrap items-baseline gap-x-3">
            <span className="font-display text-6xl font-extrabold tracking-tight text-white sm:text-7xl">{formatUsd(COMMISSION.unitPricesCents[duration])}</span>
            <span className="text-sm text-slate-400">{COMMISSION.currency} / edit</span>
          </p>
          <p className="mt-3 text-sm text-slate-400">Up to {duration} seconds, before multi-edit discount.</p>
        </div>

        <dl className="space-y-4 border-t border-white/10 pt-6 text-sm">
          <div className="flex items-center justify-between gap-4">
            <dt className="text-slate-400">Delivery time</dt>
            <dd className="font-semibold text-white">{COMMISSION.deliveryHours} hours</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-slate-400">Video format</dt>
            <dd className="font-semibold text-white">Vertical {COMMISSION.aspectRatio}</dd>
          </div>
        </dl>

        <div className="mt-7 rounded-2xl border border-amber-400/50 bg-gradient-to-r from-amber-500/20 via-orange-500/10 to-amber-500/20 px-5 py-4 shadow-[0_0_40px_-12px_rgba(251,191,36,0.5)]">
          <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-amber-300">
            <SparklesIcon className="h-4 w-4" />
            Limited-time offer
          </p>
          <p className="mt-2 font-display text-xl font-extrabold leading-tight text-white">
            Save <span className="text-amber-300">{COMMISSION.bulkDiscount.percent}%</span> on {COMMISSION.bulkDiscount.minimumQuantity}+ edits
          </p>
          <p className="mt-1.5 text-sm leading-6 text-amber-100/80">
            Applied automatically to your full order. No code needed.
          </p>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6">
          <p className="text-sm font-semibold text-white">Accepted payments</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">Easypaisa only, as of now.</p>
          <p className="mt-2 text-xs leading-5 text-slate-400">
            Payment details and the delivery start time are confirmed directly when booking.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 bg-white/[0.02] p-7 sm:p-10 md:border-l md:border-t-0 lg:p-12">
        <DurationSelector name="package-duration" value={duration} onChange={onDurationChange} />
        <div className="mt-6">
          <QuantitySelector value={quantity} onChange={onQuantityChange} />
        </div>
        <div className="mt-6">
          <OrderSummary duration={duration} quantity={quantity} announce />
        </div>
        <p className="mt-3 text-xs leading-5 text-slate-400">Discount is applied before the order total is rounded to the nearest cent.</p>

        <a
          href="#contact"
          onClick={onRequest}
          className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-violet-600 px-5 py-4 text-sm font-bold text-white transition hover:from-sky-500 hover:to-violet-500"
        >
          Request {quantity === 1 ? "this edit" : `${quantity} edits`}
          <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
        </a>
        <a
          href={discordInvite}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex items-center justify-center gap-2 py-1 text-sm font-medium text-slate-400 transition hover:text-white"
        >
          <DiscordIcon className="h-4 w-4" aria-hidden="true" />
          Prefer Discord? Let's talk.
        </a>
      </div>
    </article>
  );
}