import { useEffect, useState } from "react";
import { PAKISTAN_TIME_ZONE } from "../data/commission";
import { cn } from "../utils/cn";
import { ClockIcon } from "./Icons";

const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: PAKISTAN_TIME_ZONE,
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});

export function PakistanTime({ className }: { className?: string }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const update = () => setNow(new Date());
    const interval = window.setInterval(update, 1000);
    document.addEventListener("visibilitychange", update);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return (
    <div className={cn("flex items-center gap-3 text-sm", className)}>
      <ClockIcon className="h-5 w-5 shrink-0 text-sky-300" aria-hidden="true" />
      <div>
        <p className="font-semibold text-slate-300">My local time in Pakistan</p>
        <p className="mt-1 text-slate-400">
          <time dateTime={now.toISOString()} className="tabular-nums text-white">
            {formatter.format(now)}
          </time>
          <span className="ml-2">PKT / GMT+5</span>
        </p>
      </div>
    </div>
  );
}