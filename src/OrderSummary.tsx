import { COMMISSION, type EditDuration } from "../data/commission";
import { calculateOrderPricing, formatUsd } from "../utils/pricing";

interface OrderSummaryProps {
  duration: EditDuration;
  quantity: number;
  announce?: boolean;
}

export function OrderSummary({ duration, quantity, announce = false }: OrderSummaryProps) {
  const pricing = calculateOrderPricing(duration, quantity);

  return (
    <div className="border-t border-white/10 pt-5" aria-live={announce ? "polite" : undefined} aria-atomic={announce || undefined}>
      <dl className="space-y-3 text-sm">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <dt className="text-slate-400">
            Subtotal <span className="text-xs">({quantity} x {formatUsd(pricing.unitPriceCents)})</span>
          </dt>
          <dd className="tabular-nums text-slate-200">{formatUsd(pricing.subtotalCents)}</dd>
        </div>
        {pricing.discountPercent > 0 ? (
          <div className="flex flex-wrap items-baseline justify-between gap-2 text-emerald-300">
            <dt>Limited-time {pricing.discountPercent}% discount</dt>
            <dd className="tabular-nums">-{formatUsd(pricing.discountCents)}</dd>
          </div>
        ) : (
          <div className="flex flex-wrap items-baseline justify-between gap-2 text-slate-400">
            <dt>Multi-edit discount</dt>
            <dd>Limited-time: {COMMISSION.bulkDiscount.percent}% off {COMMISSION.bulkDiscount.minimumQuantity}+ edits</dd>
          </div>
        )}
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-t border-white/10 pt-4">
          <dt className="font-semibold text-white">Order total <span className="text-xs font-normal text-slate-400">USD</span></dt>
          <dd className="font-display text-2xl font-bold tabular-nums text-white">{formatUsd(pricing.totalCents)}</dd>
        </div>
      </dl>
    </div>
  );
}