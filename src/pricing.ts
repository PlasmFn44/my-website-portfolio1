import { COMMISSION, type EditDuration } from "../data/commission";

const maximumUnitPrice = Math.max(...Object.values(COMMISSION.unitPricesCents));
export const MAX_EDIT_QUANTITY = Math.floor(Number.MAX_SAFE_INTEGER / maximumUnitPrice);

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: COMMISSION.currency,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatUsd(cents: number) {
  return currencyFormatter.format(cents / 100);
}

export function isValidEditQuantity(quantity: number) {
  return Number.isSafeInteger(quantity) && quantity >= 1 && quantity <= MAX_EDIT_QUANTITY;
}

export function calculateOrderPricing(duration: EditDuration, quantity: number) {
  const unitPriceCents = COMMISSION.unitPricesCents[duration];
  if (!unitPriceCents || !isValidEditQuantity(quantity)) {
    throw new RangeError("Choose a supported duration and a positive whole number of edits.");
  }

  const subtotalCents = unitPriceCents * quantity;
  const discountPercent = quantity >= COMMISSION.bulkDiscount.minimumQuantity
    ? COMMISSION.bulkDiscount.percent
    : 0;

  // Discount the subtotal and round once; splitting keeps large integer amounts precise.
  const payablePercent = 100 - discountPercent;
  const totalCents = Math.floor(subtotalCents / 100) * payablePercent
    + Math.round((subtotalCents % 100) * payablePercent / 100);

  return {
    quantity,
    unitPriceCents,
    subtotalCents,
    discountPercent,
    discountCents: subtotalCents - totalCents,
    totalCents,
  };
}