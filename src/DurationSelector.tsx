import { COMMISSION, type EditDuration } from "../data/commission";
import { cn } from "../utils/cn";
import { formatUsd } from "../utils/pricing";

interface DurationSelectorProps {
  value: EditDuration;
  onChange: (duration: EditDuration) => void;
  name: string;
}

export function DurationSelector({ value, onChange, name }: DurationSelectorProps) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-semibold text-slate-300">Choose your video length</legend>
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {COMMISSION.durations.map((duration) => (
          <label key={duration} className="relative cursor-pointer">
            <input
              type="radio"
              name={name}
              value={duration}
              checked={value === duration}
              onChange={() => onChange(duration)}
              className="peer sr-only"
              aria-label={`Up to ${duration} seconds, ${formatUsd(COMMISSION.unitPricesCents[duration])} USD per edit before discount`}
            />
            <span
              className={cn(
                "block rounded-xl border px-2 py-3 text-center transition duration-200 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-sky-300",
                value === duration
                  ? "border-sky-400/70 bg-sky-400/10 text-white"
                  : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/30 hover:text-white"
              )}
            >
              <span className="block text-[11px] font-medium uppercase tracking-wider">Up to</span>
              <span className="mt-1 block font-display text-xl font-bold">
                {duration}<span className="ml-0.5 text-sm font-medium">s</span>
              </span>
              <span className="mt-1 block text-xs font-medium tabular-nums">
                {formatUsd(COMMISSION.unitPricesCents[duration])}
              </span>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}