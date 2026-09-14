import {
  BUSINESS_EMAIL,
  COMMISSION,
  PAKISTAN_TIME_LABEL,
  PAYMENT_METHODS,
  type EditDuration,
  type InquiryType,
  type PaymentMethod,
} from "../data/commission";
import { calculateOrderPricing, formatUsd } from "./pricing";

export interface InquiryDetails {
  name: string;
  email: string;
  message: string;
  type: InquiryType;
  duration: EditDuration;
  quantity: number;
  payment: PaymentMethod;
}

export function createInquiryDraft(details: InquiryDetails) {
  const isCommission = details.type === "commission";
  const pricing = isCommission ? calculateOrderPricing(details.duration, details.quantity) : null;
  const subject = pricing
    ? `${COMMISSION.name} request - ${details.quantity} x ${details.duration}s - ${formatUsd(pricing.totalCents)} ${COMMISSION.currency}`
    : "Business inquiry for Plasm";

  const body = [
    "Hi Plasm,",
    "",
    `Name: ${details.name.trim()}`,
    `Contact email: ${details.email.trim()}`,
    "",
    ...(pricing
      ? [
          `Package: ${COMMISSION.name}`,
          `Preferred length: up to ${details.duration} seconds per edit`,
          `Number of edits: ${details.quantity}`,
          `Price per edit before discount: ${formatUsd(pricing.unitPriceCents)} ${COMMISSION.currency}`,
          `Subtotal: ${formatUsd(pricing.subtotalCents)} ${COMMISSION.currency}`,
          pricing.discountPercent > 0
            ? `Limited-time multi-edit discount (${pricing.discountPercent}%): -${formatUsd(pricing.discountCents)} ${COMMISSION.currency}`
            : `Limited-time multi-edit discount: not applied (${COMMISSION.bulkDiscount.percent}% off ${COMMISSION.bulkDiscount.minimumQuantity}+ edits)`,
          `Order total: ${formatUsd(pricing.totalCents)} ${COMMISSION.currency}`,
          "Total rounded to the nearest US cent after discount.",
          `Format: vertical ${COMMISSION.aspectRatio}`,
          `Delivery: ${COMMISSION.deliveryHours} hours`,
          `Preferred payment method: ${PAYMENT_METHODS[details.payment]}`,
        ]
      : ["Inquiry: Business / collaboration"]),
    `Plasm's timezone: Pakistan, ${PAKISTAN_TIME_LABEL}`,
    "",
    isCommission ? "Footage, references, and project details:" : "Message:",
    details.message.trim(),
  ].join("\r\n");

  return {
    subject,
    body,
    href: `mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
  };
}