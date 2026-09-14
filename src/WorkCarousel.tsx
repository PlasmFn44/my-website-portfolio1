import { Children, useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { ArrowRightIcon } from "./Icons";

const EDGE_TOLERANCE = 2;
const arrowClass = "grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/[0.04] text-slate-200 transition-colors enabled:hover:border-sky-400/50 enabled:hover:bg-sky-400/10 enabled:hover:text-sky-300 disabled:cursor-not-allowed disabled:opacity-30";

export function WorkCarousel({ children }: { children: ReactNode }) {
  const id = useId();
  const viewportRef = useRef<HTMLDivElement>(null);
  const destinationRef = useRef<number | null>(null);
  const itemCount = Children.count(children);
  const [position, setPosition] = useState({ overflow: false, atStart: true, atEnd: true });

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    let frame = 0;
    let settleTimer: number | undefined;

    const measure = () => {
      frame = 0;
      const max = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
      const left = Math.max(0, Math.min(viewport.scrollLeft, max));
      const next = {
        overflow: max > EDGE_TOLERANCE,
        atStart: left <= EDGE_TOLERANCE,
        atEnd: left >= max - EDGE_TOLERANCE,
      };
      setPosition((current) => (
        current.overflow === next.overflow && current.atStart === next.atStart && current.atEnd === next.atEnd
          ? current
          : next
      ));
    };

    const scheduleMeasure = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };
    const resetDestination = () => {
      destinationRef.current = null;
    };
    const onScroll = () => {
      scheduleMeasure();
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(resetDestination, 160);
    };
    const onResize = () => {
      resetDestination();
      scheduleMeasure();
    };

    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(onResize);
    observer?.observe(viewport);
    Array.from(viewport.children).forEach((child) => observer?.observe(child));
    viewport.addEventListener("scroll", onScroll, { passive: true });
    viewport.addEventListener("pointerdown", resetDestination, { passive: true });
    viewport.addEventListener("wheel", resetDestination, { passive: true });
    window.addEventListener("resize", onResize);
    measure();

    return () => {
      observer?.disconnect();
      viewport.removeEventListener("scroll", onScroll);
      viewport.removeEventListener("pointerdown", resetDestination);
      viewport.removeEventListener("wheel", resetDestination);
      window.removeEventListener("resize", onResize);
      window.cancelAnimationFrame(frame);
      window.clearTimeout(settleTimer);
      resetDestination();
    };
  }, [itemCount]);

  const scrollTo = (left: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    destinationRef.current = left;
    viewport.scrollTo({
      left,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };

  const move = (direction: -1 | 1) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const max = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    if (max <= EDGE_TOLERANCE) return;

    const from = Math.max(0, Math.min(destinationRef.current ?? viewport.scrollLeft, max));
    const padding = Number.parseFloat(window.getComputedStyle(viewport).paddingLeft) || 0;
    const origin = viewport.getBoundingClientRect().left + viewport.clientLeft;

    // Align to the next card without scrolling the surrounding page or its links.
    const stops = [0, ...Array.from(viewport.children, (child) => (
      Math.max(0, Math.min(child.getBoundingClientRect().left - origin + viewport.scrollLeft - padding, max))
    )), max];
    const target = direction === 1
      ? stops.find((stop) => stop > from + EDGE_TOLERANCE) ?? max
      : stops.reverse().find((stop) => stop < from - EDGE_TOLERANCE) ?? 0;

    scrollTo(target);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || event.altKey || event.ctrlKey || event.metaKey || !position.overflow) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      move(event.key === "ArrowLeft" ? -1 : 1);
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      const viewport = viewportRef.current;
      if (viewport) scrollTo(event.key === "Home" ? 0 : viewport.scrollWidth - viewport.clientWidth);
    }
  };

  return (
    <div className="relative mt-16">
      {position.overflow && (
        <div role="group" aria-label="Work gallery navigation" className="absolute -top-14 right-0 flex gap-2">
          <button
            type="button"
            aria-label="Previous work"
            title="Previous work"
            aria-controls={id}
            disabled={position.atStart}
            onClick={() => move(-1)}
            className={arrowClass}
          >
            <ArrowRightIcon className="h-5 w-5 rotate-180" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next work"
            title="Next work"
            aria-controls={id}
            disabled={position.atEnd}
            onClick={() => move(1)}
            className={arrowClass}
          >
            <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      )}
      <div
        id={id}
        ref={viewportRef}
        role="region"
        aria-label="Work projects"
        aria-roledescription={position.overflow ? "carousel" : undefined}
        tabIndex={position.overflow ? 0 : undefined}
        onKeyDown={onKeyDown}
        className={cn(
          "no-scrollbar -mx-6 flex snap-x snap-proximity gap-6 overflow-x-auto overscroll-x-contain scroll-px-6 px-6 pb-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300 motion-reduce:scroll-auto lg:mx-0 lg:scroll-px-0 lg:px-0 [&>*]:snap-start",
          position.overflow ? "lg:overflow-x-auto" : "lg:overflow-visible"
        )}
      >
        {children}
      </div>
    </div>
  );
}