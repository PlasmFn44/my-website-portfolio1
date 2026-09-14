import { useEffect, useState, type CSSProperties, type SyntheticEvent } from "react";
import { Reveal } from "./components/Reveal";
import { BrandLogo } from "./components/BrandLogo";
import { CommissionOffer } from "./components/CommissionOffer";
import { InquiryForm } from "./components/InquiryForm";
import { PakistanTime } from "./components/PakistanTime";
import { WorkCarousel } from "./components/WorkCarousel";
import { BUSINESS_EMAIL, COMMISSION, type EditDuration, type InquiryType } from "./data/commission";
import {
  HANDLES,
  LINKS,
  VIDEO_EMBED,
  VIDEO_THUMB,
  VIDEO_THUMB_FALLBACK,
  VIDEO_URL,
} from "./data/links";
import { cn } from "./utils/cn";
import { calculateOrderPricing, formatUsd } from "./utils/pricing";
import {
  ArrowRightIcon,
  ArrowUpIcon,
  ArrowUpRightIcon,
  CheckIcon,
  ClockIcon,
  CloseIcon,
  CopyIcon,
  DiscordIcon,
  EnvelopeIcon,
  HomeIcon,
  InstagramIcon,
  MenuIcon,
  PaletteIcon,
  PlayIcon,
  ServerIcon,
  SparklesIcon,
  VideoIcon,
  XSocialIcon,
  YouTubeIcon,
} from "./components/Icons";
import {
  CursorGlow,
  Dock,
  Magnetic,
  ScrollProgress,
  TiltCard,
  Typewriter,
  useSpotlightGlobal,
  type DockItem,
} from "./components/Effects";

/* ----------------------------- Plasm details ----------------------------- */

const EMAIL = BUSINESS_EMAIL;

const DISCORD_INVITE = LINKS.discord;
const YOUTUBE_CHANNEL = LINKS.youtube;
const X_PROFILE = LINKS.x;
const INSTAGRAM_PROFILE = LINKS.instagram;

const socials = [
  { name: "YouTube", href: YOUTUBE_CHANNEL, Icon: YouTubeIcon },
  { name: "X / Twitter", href: X_PROFILE, Icon: XSocialIcon },
  { name: "Instagram", href: INSTAGRAM_PROFILE, Icon: InstagramIcon },
  { name: "Discord", href: DISCORD_INVITE, Icon: DiscordIcon },
];

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Commissions", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const dockItems: DockItem[] = [
  { label: "Home", href: "#top", Icon: HomeIcon },
  { label: "About", href: "#about", Icon: SparklesIcon },
  { label: "Work", href: "#work", Icon: PlayIcon },
  { label: "Commissions", href: "#services", Icon: VideoIcon },
  { label: "Contact", href: "#contact", Icon: EnvelopeIcon },
  { label: "Social", href: "#", divider: true },
  { label: "Discord", href: DISCORD_INVITE, Icon: DiscordIcon, brand: "discord" },
  { label: "YouTube", href: YOUTUBE_CHANNEL, Icon: YouTubeIcon, brand: "youtube" },
  { label: "Back to top", href: "#top", Icon: ArrowUpIcon },
];

const marqueeItems = [
  "Gaming montages",
  "Short-form edits",
  "Smooth transitions",
  "Discord servers",
  "Custom roles",
  "Logos & PFPs",
  "Server banners",
  "Social branding",
  "Beat-synced cuts",
  "Automation setup",
];

const aboutSkills = [
  {
    Icon: VideoIcon,
    title: "Video editing",
    description:
      "High-energy gaming montages, smooth transitions, and vertical clips built to hold attention on YouTube, TikTok, and Shorts.",
  },
  {
    Icon: PaletteIcon,
    title: "Graphic design",
    description:
      "Custom logos, profile pictures, server banners, and social media branding with a clean, recognizable look.",
  },
  {
    Icon: ServerIcon,
    title: "Discord server creation",
    description:
      "Clean, structured, and automated communities with custom roles, reactive utilities, and sleek visual layouts.",
  },
];

const processSteps = [
  {
    number: "01",
    Icon: EnvelopeIcon,
    title: "Send your brief",
    description: "Choose a length and number of edits, then share your footage and references.",
  },
  {
    number: "02",
    Icon: SparklesIcon,
    title: "Confirm your order",
    description: `Edits start at ${formatUsd(COMMISSION.unitPricesCents[30])} USD, paid via Easypaisa. Limited-time: ${COMMISSION.bulkDiscount.percent}% off ${COMMISSION.bulkDiscount.minimumQuantity} or more.`,
  },
  {
    number: "03",
    Icon: VideoIcon,
    title: "I'll get editing",
    description: "Your footage becomes an engaging short-form video, made for a vertical 9:16 screen.",
  },
  {
    number: "04",
    Icon: CheckIcon,
    title: "Delivered in 48 hours",
    description: "Receive your finished short video edit. All scheduling is in Pakistan time, GMT+5.",
  },
];

const faqs = [
  {
    question: "How do I place an order?",
    answer:
      "Choose a length and number of edits in the commission package. Your total updates automatically, including any multi-edit discount. Select Request to carry your choices into the contact form, then prepare and send your email to plasmfnyt44@gmail.com. You can also arrange an order through the Discord community.",
  },
  {
    question: "How much does a short edit cost?",
    answer:
      `An edit up to 30 seconds is ${formatUsd(COMMISSION.unitPricesCents[30])} USD. Edits up to 45 or 60 seconds are ${formatUsd(COMMISSION.unitPricesCents[45])} USD each before discounts. All use vertical 9:16 format with 48-hour delivery. This remains the only commission package available right now.`,
  },
  {
    question: "How does the limited-time discount work?",
    answer:
      `This is a limited-time offer: buy ${COMMISSION.bulkDiscount.minimumQuantity} or more edits in one order and ${COMMISSION.bulkDiscount.percent}% is automatically taken off the full subtotal. Two 30-second edits cost ${formatUsd(calculateOrderPricing(30, 2).totalCents)} USD total instead of ${formatUsd(calculateOrderPricing(30, 2).subtotalCents)}. There is no code to enter. The discount is removed if you return to one edit, and the final total is rounded to the nearest US cent after discount.`,
  },
  {
    question: "Which payment methods do you accept?",
    answer:
      "As of now, Easypaisa is the only payment method I accept. Easypaisa details are shared directly once we confirm your order; this website does not collect or process payments.",
  },
  {
    question: "What should I provide for a video edit?",
    answer:
      "Send your raw gameplay or footage at the highest quality you can, plus preferred music, reference videos, your branding, and any clips or moments you definitely want included.",
  },
  {
    question: "When will my edit be delivered?",
    answer:
      "Delivery time is 48 hours. The start time is confirmed directly when booking your edit. I am based in Pakistan and use Pakistan Standard Time (PKT, GMT+5 / UTC+5) for all scheduling.",
  },
  {
    question: "Can I order a logo or a Discord server?",
    answer:
      "Not at the moment. Graphic design and Discord creation remain part of my portfolio, but only the Short Video Edit package is open for commissions. You can still contact me for general business or collaboration inquiries.",
  },
];

/* -------------------------------- Pieces --------------------------------- */

function SectionLabel({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-sky-300">
      <SparklesIcon className="h-3.5 w-3.5" />
      {children}
    </span>
  );
}

function Thumbnail({ imgClassName }: { imgClassName?: string }) {
  const handleError = (event: SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    if (img.src.includes("maxresdefault")) {
      img.src = VIDEO_THUMB_FALLBACK;
    }
  };

  return (
    <img
      src={VIDEO_THUMB}
      onError={handleError}
      alt="Plasm YouTube video edit preview"
      loading="lazy"
      referrerPolicy="no-referrer"
      className={cn("h-full w-full object-cover transition duration-500 group-hover:scale-105", imgClassName)}
    />
  );
}

/* ---------------------------------- App ---------------------------------- */

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [duration, setDuration] = useState<EditDuration>(COMMISSION.durations[0]);
  const [quantity, setQuantity] = useState(1);
  const [inquiryType, setInquiryType] = useState<InquiryType>("commission");

  useSpotlightGlobal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ["about", "work", "services", "contact"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!videoOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setVideoOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [videoOpen]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div id="top" className="min-h-screen overflow-x-hidden bg-[#090d16] text-slate-200">
      <ScrollProgress />
      <CursorGlow />

      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,#111827_0%,#090d16_58%)]" />
        <div className="absolute left-[-12rem] top-24 h-[32rem] w-[32rem] rounded-full bg-sky-500/10 blur-[120px]" />
        <div className="absolute right-[-14rem] top-[28rem] h-[34rem] w-[34rem] rounded-full bg-purple-600/15 blur-[130px]" />
      </div>

      {/* Header */}
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled || mobileOpen ? "glass border-b border-white/10 shadow-lg shadow-black/30" : "border-b border-transparent"
        )}
      >
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <a href="#top" aria-label="Plasm home" className="brand-link flex items-center gap-3 font-display text-xl font-extrabold uppercase tracking-[0.28em]">
            <BrandLogo />
            <span className="gradient-text">Plasm</span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition",
                  activeSection === link.href.slice(1)
                    ? "bg-sky-400/10 text-sky-300"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                )}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <Magnetic strength={0.15}>
              <a
                href={DISCORD_INVITE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-violet-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-sky-900/50 transition hover:shadow-violet-900/50"
              >
                <DiscordIcon className="h-4 w-4" />
                Join Discord
              </a>
            </Magnetic>
          </div>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-white md:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </nav>

        {mobileOpen && (
          <div className="border-t border-white/10 px-6 py-4 md:hidden">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-bold text-slate-300 hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={DISCORD_INVITE}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-violet-600 px-5 py-3.5 text-base font-bold text-white"
              >
                <DiscordIcon className="h-5 w-5" />
                Join Discord
              </a>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden px-6 pb-20 pt-32 sm:pt-36 lg:min-h-screen lg:pt-40">
          <div className="absolute inset-0 -z-10 bg-grid mask-fade-b opacity-70" aria-hidden="true" />

          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-sky-200 sm:text-sm">
                  <span className="h-2 w-2 animate-pulse-soft rounded-full bg-emerald-400" />
                  Short-video commissions open
                </div>
              </Reveal>

              <Reveal delay={100}>
                <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
                  Hi, I’m <span className="gradient-text">Plasm</span>
                </h1>
              </Reveal>

              <Reveal delay={180}>
                <div className="mt-4 flex min-h-[2.5rem] items-center font-display text-xl font-bold sm:text-2xl">
                  <span className="text-slate-300">I create&nbsp;</span>
                  <Typewriter
                    className="gradient-text"
                    phrases={[
                      "high-energy gaming edits.",
                      "clean Discord communities.",
                      "bold logos & PFPs.",
                      "short-form clips that pop.",
                    ]}
                  />
                </div>
              </Reveal>

              <Reveal delay={260}>
                <p className="mt-5 max-w-xl text-lg leading-8 text-slate-400">
                  Welcome to my official portfolio. I’m a video editor, Discord server creator, and graphic designer
                  crafting high-energy edits, custom branding, and communities that look built to last.
                </p>
              </Reveal>

              <Reveal delay={320}>
                <div className="mt-8 flex gap-3">
                  {socials.map(({ name, href, Icon }) => (
                    <a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={name}
                      aria-label={name}
                      className="grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-slate-400 transition duration-300 hover:-translate-y-1 hover:border-sky-400/50 hover:bg-white/[0.08] hover:text-white hover:shadow-[0_8px_24px_rgba(56,189,248,0.25)]"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={400}>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Magnetic className="w-full sm:w-auto">
                    <a
                      href="#work"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-violet-600 px-7 py-4 text-base font-bold text-white shadow-xl shadow-sky-950/50 transition hover:shadow-[0_12px_34px_rgba(124,58,237,0.45)] sm:w-auto"
                    >
                      View My Work
                      <ArrowRightIcon className="h-5 w-5" />
                    </a>
                  </Magnetic>
                  <Magnetic className="w-full sm:w-auto">
                    <a
                      href={DISCORD_INVITE}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-7 py-4 text-base font-bold text-white transition hover:border-[#5865F2]/60 hover:bg-[#5865F2]/10 sm:w-auto"
                    >
                      <DiscordIcon className="h-5 w-5" />
                      Join the Community
                    </a>
                  </Magnetic>
                </div>
              </Reveal>

            </div>

            {/* Featured video preview */}
            <Reveal delay={250} className="lg:col-span-6">
              <div className="relative mx-auto max-w-xl">
                <TiltCard max={6} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-3 shadow-2xl shadow-black/50 backdrop-blur neon-border">
                  <button
                    type="button"
                    onClick={() => setVideoOpen(true)}
                    className="group relative block aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900 text-left"
                    aria-label="Play featured YouTube video"
                  >
                    <Thumbnail />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10" />
                    <span className="play-ring absolute left-1/2 top-1/2 grid h-[4.5rem] w-[4.5rem] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-sky-500/95 p-5 text-white transition duration-300 group-hover:scale-110 group-hover:bg-sky-400">
                      <PlayIcon className="ml-1 h-8 w-8" />
                    </span>
                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 p-5">
                      <div>
                        <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-sky-300">
                          <YouTubeIcon className="h-4 w-4 text-red-500" />
                          Featured edit
                        </p>
                        <p className="mt-1 font-display text-lg font-extrabold text-white">Watch on @PlasmFN</p>
                      </div>
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/20 bg-white/10 text-white">
                        <ArrowUpRightIcon className="h-5 w-5" />
                      </span>
                    </div>
                  </button>
                </TiltCard>

                <a
                  href={YOUTUBE_CHANNEL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="animate-float absolute -right-3 -top-6 hidden items-center gap-3 rounded-2xl border border-white/10 bg-[#0d1322]/95 px-4 py-3 text-white shadow-xl backdrop-blur xl:flex"
                >
                  <YouTubeIcon className="h-6 w-6 text-red-500" />
                  <div>
                    <p className="text-sm font-extrabold">YouTube</p>
                    <p className="text-xs font-semibold text-slate-400">@PlasmFN</p>
                  </div>
                </a>

                <a
                  href={DISCORD_INVITE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="animate-float-delayed absolute -bottom-6 -left-5 hidden items-center gap-3 rounded-2xl border border-white/10 bg-[#0d1322]/95 px-4 py-3 text-white shadow-xl backdrop-blur xl:flex"
                >
                  <DiscordIcon className="h-6 w-6 text-[#7b84ff]" />
                  <div>
                    <p className="text-sm font-extrabold">Discord</p>
                    <p className="text-xs font-semibold text-slate-400">Community open</p>
                  </div>
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Marquee */}
        <section className="border-y border-white/10 bg-white/[0.02] py-6" aria-label="Skills">
          <div className="mask-fade-x overflow-hidden">
            <div className="flex w-max animate-marquee items-center gap-8 pr-8">
              {[...marqueeItems, ...marqueeItems].map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="flex items-center gap-8 whitespace-nowrap text-sm font-extrabold uppercase tracking-[0.2em] text-slate-500"
                >
                  {item}
                  <SparklesIcon className="h-4 w-4 text-sky-400/70" />
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="scroll-mt-24 px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
              <Reveal className="lg:col-span-5">
                <SectionLabel>About me</SectionLabel>
                <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                  Edits, designs, and servers with a <span className="gradient-text">pro-level finish</span>
                </h2>
              </Reveal>

              <Reveal delay={120} className="lg:col-span-7">
                <p className="text-lg leading-8 text-slate-400">
                  I’m Plasm — a passionate video editor, Discord server creator, and graphic designer. I specialize in
                  logos, profile pictures, short-form editing, and building clean, highly structured Discord communities
                  with custom roles, reactive utilities, and sleek visual layouts.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href={`mailto:${EMAIL}`}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-bold text-white transition hover:border-sky-400/40 hover:bg-sky-400/10"
                  >
                    <EnvelopeIcon className="h-4 w-4 text-sky-300" />
                    {EMAIL}
                  </a>
                  <a
                    href={DISCORD_INVITE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-bold text-white transition hover:border-[#5865F2]/50 hover:bg-[#5865F2]/10"
                  >
                    <DiscordIcon className="h-4 w-4 text-[#8b93ff]" />
                    Message me on Discord
                  </a>
                </div>
              </Reveal>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {aboutSkills.map(({ Icon, title, description }, index) => (
                <Reveal key={title} delay={index * 120}>
                  <div className="spotlight-card group relative h-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-7 backdrop-blur transition duration-300 hover:-translate-y-1.5 hover:border-sky-400/30 hover:bg-white/[0.05] hover:shadow-[0_18px_50px_-20px_rgba(56,189,248,0.45)]">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-sky-500/20 to-purple-500/20 p-3 text-sky-300 ring-1 ring-white/10 transition group-hover:text-white">
                      <Icon className="h-7 w-7" />
                    </span>
                    <h3 className="mt-5 font-display text-xl font-extrabold text-white">{title}</h3>
                    <p className="mt-3 leading-7 text-slate-400">{description}</p>
                  </div>
                </Reveal>
              ))}
            </div>

          </div>
        </section>

        {/* Work */}
        <section id="work" className="scroll-mt-24 px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal className="mx-auto max-w-3xl text-center">
              <SectionLabel>My work</SectionLabel>
              <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                Selected work & creative skills
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-400">
                Explore a featured edit, design work in progress, and the official Discord community.
              </p>
            </Reveal>

            <WorkCarousel>
              {/* Video card */}
              <Reveal className="w-[82vw] max-w-sm shrink-0 sm:w-96 lg:w-auto lg:max-w-none lg:flex-1">
                <article className="spotlight-card group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] backdrop-blur transition duration-300 hover:-translate-y-1.5 hover:border-sky-400/30 hover:shadow-[0_22px_60px_-24px_rgba(56,189,248,0.5)]">
                  <button
                    type="button"
                    onClick={() => setVideoOpen(true)}
                    className="relative aspect-video w-full overflow-hidden bg-slate-900"
                    aria-label="Play video editing preview"
                  >
                    <Thumbnail />
                    <div className="absolute inset-0 bg-black/25 transition group-hover:bg-black/45" />
                    <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-red-600/95 text-white transition duration-300 group-hover:scale-110">
                      <PlayIcon className="ml-1 h-7 w-7" />
                    </span>
                    <span className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-white backdrop-blur">
                      YouTube
                    </span>
                  </button>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl font-extrabold text-white">Video Editing</h3>
                    <p className="mt-3 flex-1 leading-7 text-slate-400">
                      Crafting high-energy gaming montages, smooth transitions, and engaging vertical clips built to
                      capture attention on YouTube and TikTok.
                    </p>
                    <div className="mt-6 flex gap-3">
                      <button
                        type="button"
                        onClick={() => setVideoOpen(true)}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-bold text-white transition hover:border-sky-400/40 hover:bg-sky-400/10"
                      >
                        <PlayIcon className="h-4 w-4" />
                        Play preview
                      </button>
                      <a
                        href={VIDEO_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] px-4 text-slate-300 transition hover:border-red-500/40 hover:text-red-400"
                        aria-label="Open video on YouTube"
                      >
                        <ArrowUpRightIcon className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>

              {/* Design card */}
              <Reveal delay={120} className="w-[82vw] max-w-sm shrink-0 sm:w-96 lg:w-auto lg:max-w-none lg:flex-1">
                <article
                  className="spotlight-card group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] backdrop-blur transition duration-300 hover:-translate-y-1.5 hover:border-purple-400/30 hover:shadow-[0_22px_60px_-24px_rgba(168,85,247,0.5)]"
                  style={{ "--glow": "rgba(168,85,247,0.14)" } as CSSProperties}
                >
                  <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.22),rgba(0,0,0,0.35))]">
                    <div className="absolute inset-0 bg-grid opacity-40" />
                    <div className="relative flex flex-col items-center gap-3 text-slate-300">
                      <PaletteIcon className="h-14 w-14 text-purple-300" />
                      <span className="text-sm font-bold uppercase tracking-[0.2em]">Portfolio coming soon</span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl font-extrabold text-white">Graphic Design</h3>
                    <p className="mt-3 flex-1 leading-7 text-slate-400">
                      Custom server banners, logos, profile pictures, and social media branding visuals.
                    </p>
                    <div className="mt-6 inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-bold text-slate-500 opacity-70">
                      <ClockIcon className="h-4 w-4" />
                      Updates pending
                    </div>
                  </div>
                </article>
              </Reveal>

              {/* Discord card */}
              <Reveal delay={240} className="w-[82vw] max-w-sm shrink-0 sm:w-96 lg:w-auto lg:max-w-none lg:flex-1">
                <article
                  className="spotlight-card group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] backdrop-blur transition duration-300 hover:-translate-y-1.5 hover:border-[#5865F2]/50 hover:shadow-[0_22px_60px_-24px_rgba(88,101,242,0.55)]"
                  style={{ "--glow": "rgba(88,101,242,0.16)" } as CSSProperties}
                >
                  <a
                    href={DISCORD_INVITE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex aspect-video items-center justify-center overflow-hidden bg-[radial-gradient(circle,#5865F2_0%,#2c2f33_75%)]"
                  >
                    <DiscordIcon className="h-20 w-20 text-white transition duration-300 group-hover:scale-110" />
                    <span className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />
                  </a>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl font-extrabold text-white">Discord Server Creation</h3>
                    <p className="mt-3 flex-1 leading-7 text-slate-400">
                      Building clean, highly structured, and fully automated Discord communities equipped with custom
                      roles, reactive utilities, and sleek visual layouts.
                    </p>
                    <a
                      href={DISCORD_INVITE}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-[#5865F2] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#4752d9]"
                    >
                      <DiscordIcon className="h-4 w-4" />
                      Join Server
                    </a>
                  </div>
                </article>
              </Reveal>
            </WorkCarousel>
          </div>
        </section>

        {/* Process */}
        <section className="px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal className="mx-auto max-w-3xl text-center">
              <SectionLabel>How it works</SectionLabel>
              <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                From first message to final delivery
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-400">
                A simple, transparent process so you always know what stage your project is at.
              </p>
            </Reveal>

            <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {processSteps.map(({ number, Icon, title, description }, index) => (
                <Reveal key={number} delay={index * 110}>
                  <div className="spotlight-card relative h-full rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-7 backdrop-blur transition duration-300 hover:-translate-y-1.5 hover:border-sky-400/30">
                    <div className="flex items-center justify-between">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-sky-500/20 to-purple-500/20 text-sky-300 ring-1 ring-white/10">
                        <Icon className="h-6 w-6" />
                      </span>
                      <span className="font-display text-4xl font-extrabold text-white/10">{number}</span>
                    </div>
                    <h3 className="mt-5 font-display text-xl font-extrabold text-white">{title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-400">{description}</p>
                    {index < processSteps.length - 1 && (
                      <ArrowRightIcon className="absolute -right-4 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-sky-400/40 lg:block" />
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Commissions */}
        <section id="services" className="scroll-mt-24 px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal className="mx-auto max-w-3xl text-center">
              <SectionLabel>Commissions</SectionLabel>
              <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                Big energy. Small price.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-400">
                Short-video edits from {formatUsd(COMMISSION.unitPricesCents[30])} USD.{" "}
                <span className="font-bold text-amber-300">Limited-time offer: save {COMMISSION.bulkDiscount.percent}% on {COMMISSION.bulkDiscount.minimumQuantity}+ edits.</span>
              </p>
            </Reveal>

            <Reveal delay={100} className="mt-14">
              <CommissionOffer
                duration={duration}
                onDurationChange={setDuration}
                quantity={quantity}
                onQuantityChange={setQuantity}
                onRequest={() => setInquiryType("commission")}
                discordInvite={DISCORD_INVITE}
              />
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="px-6 py-24 sm:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <SectionLabel>FAQ</SectionLabel>
              <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                Before you order
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-400">
                Everything to know before booking your short video edit. For anything else, just ask.
              </p>
              <a
                href={`mailto:${EMAIL}?subject=${encodeURIComponent("General question")}`}
                className="mt-8 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-bold text-white transition hover:border-sky-400/40 hover:bg-sky-400/10"
              >
                <EnvelopeIcon className="h-4 w-4 text-sky-300" />
                Still have a question?
              </a>
            </Reveal>

            <Reveal delay={150} className="lg:col-span-7">
              <div className="space-y-3">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={faq.question}
                      className={cn(
                        "overflow-hidden rounded-2xl border bg-white/[0.03] backdrop-blur transition-colors",
                        isOpen ? "border-sky-400/30" : "border-white/10"
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
                        aria-expanded={isOpen}
                      >
                        <span className="text-base font-extrabold text-white sm:text-lg">{faq.question}</span>
                        <span
                          className={cn(
                            "grid h-9 w-9 shrink-0 place-items-center rounded-full text-xl font-bold transition-all duration-300",
                            isOpen ? "rotate-180 bg-sky-500 text-white" : "bg-white/5 text-slate-300"
                          )}
                        >
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>
                      <div className={cn("faq-panel", isOpen && "open")}>
                        <div>
                          <p className="px-6 pb-6 leading-7 text-slate-400">{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Discord CTA */}
        <section className="px-6 py-12 sm:py-20">
          <Reveal>
            <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-[#5865F2]/30 bg-gradient-to-br from-[#5865F2] via-[#4752c4] to-[#2c2f33] px-6 py-16 text-center text-white shadow-2xl shadow-indigo-950/50 sm:px-12">
              <div className="absolute inset-0 bg-grid opacity-30" aria-hidden="true" />
              <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-sky-400/30 blur-3xl" aria-hidden="true" />
              <div className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-purple-400/30 blur-3xl" aria-hidden="true" />

              <div className="relative mx-auto max-w-3xl">
                <DiscordIcon className="mx-auto h-14 w-14" />
                <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight sm:text-5xl">
                  Join the official Plasm Discord
                </h2>
                <p className="mt-5 text-lg leading-8 text-indigo-100">
                  Connect with the community, request work, get updates on new edits and designs, and be first to know
                  when commissions open.
                </p>
                <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Magnetic strength={0.12}>
                    <a
                      href={DISCORD_INVITE}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 text-base font-extrabold text-[#4752c4] transition hover:bg-indigo-50"
                    >
                      <DiscordIcon className="h-5 w-5" />
                      {HANDLES.discord}
                    </a>
                  </Magnetic>
                  <a
                    href={YOUTUBE_CHANNEL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-4 text-base font-extrabold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
                  >
                    <YouTubeIcon className="h-5 w-5 text-red-200" />
                    Subscribe on YouTube
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-24 px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-12">
              <Reveal className="lg:col-span-5">
                <SectionLabel>Get in touch</SectionLabel>
                <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                  Let's create your next short.
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-400">
                  Book your next edit or get in touch about business and collaborations. Find me on email or in the Discord community.
                </p>
                <PakistanTime className="mt-7" />

                <div className="mt-8 space-y-4">
                  <div className="spotlight-card flex items-center gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-sky-500/15 text-sky-300">
                      <EnvelopeIcon className="h-6 w-6" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Business email</p>
                      <a href={`mailto:${EMAIL}`} className="block truncate text-sm font-bold text-white hover:text-sky-300">
                        {EMAIL}
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={copyEmail}
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition hover:border-sky-400/40 hover:text-sky-300"
                      aria-label="Copy email address"
                    >
                      {copied ? <CheckIcon className="h-4 w-4 text-emerald-400" /> : <CopyIcon className="h-4 w-4" />}
                    </button>
                  </div>

                  <a
                    href={DISCORD_INVITE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="spotlight-card flex items-center gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-[#5865F2]/50 hover:bg-[#5865F2]/10"
                    style={{ "--glow": "rgba(88,101,242,0.16)" } as CSSProperties}
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#5865F2]/20 text-[#9ba1ff]">
                      <DiscordIcon className="h-6 w-6" />
                    </span>
                    <div className="flex-1">
                      <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Community</p>
                      <p className="text-sm font-bold text-white">Join the Discord server</p>
                    </div>
                    <ArrowUpRightIcon className="h-5 w-5 text-slate-400" />
                  </a>

                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "YouTube", href: YOUTUBE_CHANNEL, Icon: YouTubeIcon },
                      { label: "X", href: X_PROFILE, Icon: XSocialIcon },
                      { label: "Instagram", href: INSTAGRAM_PROFILE, Icon: InstagramIcon },
                    ].map(({ label, href, Icon }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-5 text-sm font-bold text-slate-300 transition hover:-translate-y-1 hover:border-sky-400/30 hover:text-white"
                      >
                        <Icon className="h-6 w-6" />
                        {label}
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={150} className="lg:col-span-7">
                <InquiryForm
                  duration={duration}
                  onDurationChange={setDuration}
                  quantity={quantity}
                  onQuantityChange={setQuantity}
                  inquiryType={inquiryType}
                  onInquiryTypeChange={setInquiryType}
                />
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 pb-28 pt-12 sm:pb-24">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <a href="#top" aria-label="Plasm home" className="brand-link inline-flex items-center gap-3 font-display text-lg font-extrabold uppercase tracking-[0.28em]">
              <BrandLogo className="h-11 w-11" />
              <span className="gradient-text">Plasm</span>
            </a>
            <p className="mt-2 text-sm font-semibold text-slate-500">© 2026 Plasm. All rights reserved.</p>
          </div>

          <div className="flex items-center gap-3">
            {socials.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={name}
                aria-label={name}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-slate-400 transition hover:-translate-y-1 hover:border-sky-400/40 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <div className="text-center md:text-right">
            <a href={`mailto:${EMAIL}`} className="text-sm font-bold text-slate-400 transition hover:text-sky-300">
              {EMAIL}
            </a>
            <p className="mt-2 text-xs text-slate-500">Based in Pakistan / PKT (GMT+5)</p>
          </div>
        </div>
      </footer>

      {/* Floating dock */}
      <Dock items={dockItems} active={activeSection} />

      {/* Video modal */}
      {videoOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md sm:p-8"
          onClick={() => setVideoOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Plasm YouTube video player"
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setVideoOpen(false)}
              className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-black/70 text-white ring-1 ring-white/20 transition hover:bg-sky-500"
              aria-label="Close video"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
            <div className="aspect-video">
              <iframe
                className="h-full w-full"
                src={`${VIDEO_EMBED}&autoplay=1`}
                title="Plasm YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
