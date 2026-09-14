import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  type RefObject,
  type SVGProps,
} from "react";
import { cn } from "../utils/cn";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* --------------------------- Scroll progress bar -------------------------- */

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? (doc.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[80] h-[3px] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-sky-400 via-cyan-300 to-purple-500 shadow-[0_0_12px_rgba(56,189,248,0.8)] transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

/* ----------------------------- Cursor glow -------------------------------- */

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let targetX = x;
    let targetY = y;
    let shown = false;

    const onMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (!shown && ref.current) {
        ref.current.style.opacity = "1";
        shown = true;
      }
    };

    const loop = () => {
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${x - 320}px, ${y - 320}px, 0)`;
      }
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    frame = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[5] h-[640px] w-[640px] rounded-full opacity-0 mix-blend-screen transition-opacity duration-500"
      style={{
        background:
          "radial-gradient(circle, rgba(56,189,248,0.10) 0%, rgba(168,85,247,0.07) 35%, transparent 65%)",
      }}
    />
  );
}

/* ------------------------- Global spotlight cards ------------------------- */

/** Delegates one mousemove listener; any element with `.spotlight-card` lights up. */
export function useSpotlightGlobal() {
  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const card = target?.closest?.(".spotlight-card") as HTMLElement | null;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      card.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    return () => document.removeEventListener("mousemove", onMove);
  }, []);
}

/* ------------------------------ Typewriter -------------------------------- */

interface TypewriterProps {
  phrases: string[];
  className?: string;
}

export function Typewriter({ phrases, className }: TypewriterProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIndex % phrases.length];
    let delay = deleting ? 40 : 75;

    if (!deleting && text === current) delay = 1700;
    if (deleting && text === "") delay = 350;

    const timer = window.setTimeout(() => {
      if (!deleting && text === current) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setPhraseIndex((index) => (index + 1) % phrases.length);
      } else {
        setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [text, deleting, phraseIndex, phrases]);

  return (
    <span className={className}>
      {text}
      <span className="typewriter-caret" aria-hidden="true" />
    </span>
  );
}

/* -------------------------------- 3D tilt --------------------------------- */

interface TiltProps {
  children: ReactNode;
  className?: string;
  max?: number;
}

export function TiltCard({ children, className, max = 7 }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1000px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(
      2
    )}deg) translateY(-4px)`;
  };

  const reset = () => {
    if (ref.current) {
      ref.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
    }
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={cn("will-change-transform transition-transform duration-300 ease-out", className)}
    >
      {children}
    </div>
  );
}

/* ------------------------------ Magnetic wrap ----------------------------- */

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function Magnetic({ children, className, strength = 0.22 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * strength;
    const y = (event.clientY - rect.top - rect.height / 2) * strength;
    el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={cn("inline-block transition-transform duration-300 ease-out", className)}
    >
      {children}
    </div>
  );
}

/* ----------------------------- Count-up number ---------------------------- */

interface CounterProps {
  target: number;
  suffix?: string;
  duration?: number;
}

export function Counter({ target, suffix = "", duration = 1500 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let frame = 0;
    let start: number | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const animate = (timestamp: number) => {
          if (start === null) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(target * eased);
          if (progress < 1) frame = requestAnimationFrame(animate);
        };

        frame = requestAnimationFrame(animate);
        observer.disconnect();
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, duration]);

  return (
    <span ref={ref}>
      {Math.round(value)}
      {suffix}
    </span>
  );
}

/* ----------------------------- Floating dock ------------------------------ */

export type DockItem = {
  label: string;
  href: string;
  Icon?: ComponentType<SVGProps<SVGSVGElement>>;
  brand?: "discord" | "youtube";
  divider?: boolean;
};

interface DockProps {
  items: DockItem[];
  active: string;
}

function DockButton({
  item,
  mouseX,
  dockRef,
  active,
}: {
  item: DockItem;
  mouseX: number | null;
  dockRef: RefObject<HTMLDivElement | null>;
  active: string;
}) {
  const buttonRef = useRef<HTMLAnchorElement>(null);

  let scale = 1;
  if (mouseX !== null && dockRef.current && buttonRef.current) {
    const dockRect = dockRef.current.getBoundingClientRect();
    const buttonRect = buttonRef.current.getBoundingClientRect();
    const center = buttonRect.left - dockRect.left + buttonRect.width / 2;
    const distance = Math.abs(center - mouseX);
    scale = Math.max(1, 1.32 - (Math.min(distance, 150) / 150) * 0.32);
  }

  const isActive = active !== "top" && item.href === `#${active}`;
  const isExternal = /^https?:\/\//i.test(item.href);

  return (
    <a
      ref={buttonRef}
      href={item.href}
      aria-label={item.label}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="group relative flex h-11 w-11 items-center justify-center"
      style={{
        transform: `scale(${scale}) translateY(${scale > 1 ? `-${(scale - 1) * 22}px` : "0px"})`,
        transition: "transform 150ms ease-out",
      }}
    >
      <span className="pointer-events-none absolute -top-11 whitespace-nowrap rounded-lg border border-white/10 bg-[#0d1322] px-2.5 py-1 text-[11px] font-bold text-white opacity-0 shadow-xl transition-all duration-200 group-hover:-top-10 group-hover:opacity-100">
        {item.label}
      </span>
      <span
        className={cn(
          "grid h-10 w-10 place-items-center rounded-xl border text-slate-300 transition-colors",
          item.brand === "discord" && "border-[#5865F2]/50 bg-[#5865F2] text-white",
          item.brand === "youtube" && "border-red-500/50 bg-red-600 text-white",
          !item.brand &&
            (isActive
              ? "border-sky-400/50 bg-sky-400/15 text-sky-300 shadow-[0_0_18px_rgba(56,189,248,0.35)]"
              : "border-white/10 bg-white/[0.06] group-hover:border-sky-400/40 group-hover:text-white")
        )}
      >
        {item.Icon && <item.Icon className="h-4.5 w-4.5" />}
      </span>
    </a>
  );
}

export function Dock({ items, active }: DockProps) {
  const dockRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState<number | null>(null);

  return (
    <div className="fixed bottom-5 left-1/2 z-[60] hidden -translate-x-1/2 sm:block">
      <div
        ref={dockRef}
        onMouseMove={(event) => {
          const rect = dockRef.current?.getBoundingClientRect();
          if (rect) setMouseX(event.clientX - rect.left);
        }}
        onMouseLeave={() => setMouseX(null)}
        className="flex items-end gap-1.5 rounded-2xl border border-white/10 bg-[#0b1120]/85 px-3 py-2 shadow-2xl shadow-black/60 backdrop-blur-xl"
      >
        {items.map((item) =>
          item.divider ? (
            <span key={`divider-${item.label}`} className="mx-1 h-8 w-px self-center bg-white/10" />
          ) : (
            <DockButton key={item.label} item={item} mouseX={mouseX} dockRef={dockRef} active={active} />
          )
        )}
      </div>
    </div>
  );
}
