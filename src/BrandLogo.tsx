import { useState } from "react";
import { BRAND } from "../data/brand";
import { cn } from "../utils/cn";

export function BrandLogo({ className }: { className?: string }) {
  const [failed, setFailed] = useState(false);
  if (!BRAND.originalLogoUrl || failed) return null;

  return (
    <img
      src={BRAND.originalLogoUrl}
      alt=""
      width={48}
      height={48}
      onError={() => setFailed(true)}
      className={cn("brand-logo h-12 w-12 shrink-0", className)}
    />
  );
}