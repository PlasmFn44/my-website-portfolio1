import { useEffect, useId, useState } from "react";
import { isValidEditQuantity, MAX_EDIT_QUANTITY } from "../utils/pricing";

interface QuantitySelectorProps {
  value: number;
  onChange: (quantity: number) => void;
}

export function QuantitySelector({ value, onChange }: QuantitySelectorProps) {
  const id = useId();
  const [input, setInput] = useState(String(value));
  const invalid = input !== "" && !isValidEditQuantity(Number(input));

  useEffect(() => {
    setInput(String(value));
  }, [value]);

  const changeQuantity = (quantity: number) => {
    if (!isValidEditQuantity(quantity)) return;
    setInput(String(quantity));
    onChange(quantity);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <label htmlFor={id} className="text-sm font-semibold text-slate-300">Number of edits</label>
        <div className="flex items-center gap-1 rounded-xl border border-white/15 bg-black/15 p-1">
          <button
            type="button"
            onClick={() => changeQuantity(value - 1)}
            disabled={value <= 1}
            aria-label="Remove one edit"
            className="grid h-10 w-10 place-items-center rounded-lg text-xl text-slate-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <span aria-hidden="true">-</span>
          </button>
          <input
            id={id}
            type="number"
            inputMode="numeric"
            min={1}
            max={MAX_EDIT_QUANTITY}
            step={1}
            required
            value={input}
            onChange={(event) => {
              const nextInput = event.target.value;
              setInput(nextInput);
              const nextQuantity = Number(nextInput);
              if (isValidEditQuantity(nextQuantity)) onChange(nextQuantity);
            }}
            onBlur={() => setInput(String(value))}
            aria-invalid={invalid || undefined}
            aria-describedby={`${id}-help`}
            className="quantity-input h-10 w-14 rounded-md bg-transparent px-1 text-center text-base font-bold tabular-nums text-white"
          />
          <button
            type="button"
            onClick={() => changeQuantity(value + 1)}
            disabled={value >= MAX_EDIT_QUANTITY}
            aria-label="Add one edit"
            className="grid h-10 w-10 place-items-center rounded-lg text-xl text-slate-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <span aria-hidden="true">+</span>
          </button>
        </div>
      </div>
      <p id={`${id}-help`} className={`mt-2 text-xs leading-5 ${invalid ? "text-rose-300" : "text-slate-400"}`}>
        {invalid ? "Enter a whole number of 1 or more." : "The selected length applies to each edit in this request."}
      </p>
    </div>
  );
}