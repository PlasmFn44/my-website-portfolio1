export const BUSINESS_EMAIL = "plasmfnyt44@gmail.com";
export const PAKISTAN_TIME_ZONE = "Asia/Karachi";
export const PAKISTAN_TIME_LABEL = "PKT (GMT+5)";

export const COMMISSION = {
  name: "Short Video Edit",
  currency: "USD",
  deliveryHours: 48,
  aspectRatio: "9:16",
  durations: [30, 45, 60],
  unitPricesCents: { 30: 370, 45: 500, 60: 500 },
  bulkDiscount: { minimumQuantity: 2, percent: 25 },
} as const;

export type EditDuration = (typeof COMMISSION.durations)[number];
export type InquiryType = "commission" | "business";

export const PAYMENT_METHODS = {
  easypaisa: "Easypaisa",
} as const;

export type PaymentMethod = keyof typeof PAYMENT_METHODS;