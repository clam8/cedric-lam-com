/**
 * Open Studio Atlas — a warm editorial, spatial personal-studio experience.
 * Style cue: cool-white cartography, fine orbit signals, studio verdigris, and deliberate motion.
 */
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronRight,
  CircleArrowRight,
  ExternalLink,
  Mail,
  MoveDown,
  Plus,
  Sparkles,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const roomLinks = [
  { id: "welcome", index: "01", label: "Welcome" },
  { id: "studio-map", index: "02", label: "Look around" },
  { id: "workbench", index: "03", label: "Workbench" },
  { id: "layers", index: "04", label: "Layers" },
  { id: "method", index: "05", label: "Method" },
  { id: "margin-notes", index: "06", label: "Margin notes" },
  { id: "hello", index: "07", label: "Hello" },
];

const projects = [
  {
    tag: "Learning",
    name: "Tick. Done.",
    title: "Make useful knowledge easier to absorb.",
    short: "Micro-video stories, built for the step you need right now.",
    body:
      "A mobile-first platform for step-by-step micro-video stories: repeat the step you need, skip what you already understand, and publish the result so others can find it on the web.",
    roles: "Co-founder · Product · Design · Engineering",
    accent: "bg-[#6E70A8]",
  },
  {
    tag: "Information agency",
    name: "Open recommendation infrastructure",
    title: "Give people more choice over what shapes their attention.",
    short: "A configurable ranking layer designed to serve users first.",
    body:
      "A configurable recommendation layer built independently from social platforms, using public blockchain data and designed around the belief that ranking systems should serve users — not only engagement metrics.",
    roles: "Founding team · Product · Systems · Engineering",
    accent: "bg-[#94A1B2]",
  },
  {
    tag: "Health",
    name: "Sleep analysis platform",
    title: "Notice sleep problems in ordinary life, not only in a lab.",
    short: "Multi-night wearable data, interpreted for earlier awareness.",
    body:
      "A platform paired with regulated wearables to analyse multi-night sleep data at home, with particular attention to oxygen variation and early indicators associated with sleep apnoea.",
    roles: "CTO · Product · Mobile · Wearables",
    accent: "bg-[#B49686]",
  },
  {
    tag: "Travel",
    name: "HackHorizon winning prototype",
    title: "Turn dead time in the air into a useful head start.",
    short: "A bridge from in-flight curiosity to an arrival-day plan.",
    body:
      "An in-flight experience for last-minute travellers to discover activities, save ideas, buy tickets, and carry the plan onto their phone at arrival.",
    roles: "Product concept · Prototype · First place",
    accent: "bg-[#D8AE4C]",
  },
  {
    tag: "Early-stage building",
    name: "Startup advising + prototyping",
    title: "Help an uncertain idea become something a team can test.",
    short: "A credible first system, before the guesswork grows expensive.",
    body:
      "Technical strategy, hiring, architecture, product framing, and fast prototypes for founders who need to move from a promising idea to a credible first system.",
    roles: "Advisor · Product technologist · Builder",
    accent: "bg-[#798E6A]",
  },
];

const layers = [
  {
    title: "Cultures + languages",
    note: "Notice context before assuming universality.",
    expanded:
      "A childhood in Hong Kong, formative years in Canada, work across Korea and the UK, an MBA in France and Singapore, and life now centred in Taiwan.",
  },
  {
    title: "Engineering depth",
    note: "Understand constraints without letting technology dictate the product.",
    expanded:
      "From bootloaders and mobile systems to native apps, cloud architecture, and AI products — technical depth makes trade-offs visible earlier.",
  },
  {
    title: "Product + design",
    note: "Decide what should be built, then make it learnable.",
    expanded:
      "The energy is in turning an observed problem into a coherent experience, then narrowing it into something a team can actually make and learn from.",
  },
  {
    title: "Business + incentives",
    note: "See the gap between shareholder value and human value.",
    expanded:
      "Strategy, markets, incentives, financing, and the persistent question of how organisations can create value without losing the people inside the system.",
  },
  {
    title: "Craft + curiosity",
    note: "Pay attention, keep learning, refine with care.",
    expanded:
      "Music, languages, coffee, running, visual design, and long conversations with builders feed the same habit: make the result feel considered, not merely complete.",
  },
];

const methodSteps = [
  { title: "Observe", body: "Start with what people are actually experiencing — not the feature request or convenient technical framing." },
  { title: "Frame", body: "Find the underlying problem, the trade-offs, and the smallest useful promise the product should make." },
  { title: "Connect", body: "Bring user experience, engineering constraints, business logic, culture, and incentives into the same conversation." },
  { title: "Make", body: "Turn ambiguity into flows, prototypes, architecture, and a buildable direction that others can react to." },
  { title: "Refine", body: "Observe real use, notice where the model was wrong, and let the next version become more truthful." },
];

const notes = [
  {
    category: "Agency",
    text: "How do we build technology that increases human agency without consuming our attention?",
    breaks: ["Engagement metrics often reward time spent rather than user intent.", "The logic behind ranking is rarely legible or configurable to the person affected by it.", "The cost of distraction is carried by the user, not by the system that benefits from it."],
  },
  {
    category: "Health",
    text: "How can healthier eating, movement, and sleep become intuitive habits much earlier in life?",
    breaks: ["Support is often corrective and late, rather than woven into ordinary routines.", "Signals from sleep, movement, food, and stress are fragmented across disconnected experiences.", "Healthy choices still rely too heavily on willpower when the environment shapes behaviour."],
  },
  {
    category: "Learning",
    text: "Can learning become genuinely adaptive while still giving society the signals and credentials it relies on?",
    breaks: ["Standardised pacing can hide both unhelpful friction and real individual potential.", "Credentials are useful social shortcuts, but weak proxies for evolving capability.", "Feedback often arrives after the moment when it could have most helped someone learn."],
  },
  {
    category: "Incentives",
    text: "How might economic incentives reward real social good rather than treating it as a side constraint?",
    breaks: ["Positive externalities are hard to price, so they are easy to ignore.", "The people carrying care, risk, or long-term costs are often outside the value loop.", "Short evaluation cycles can make durable social benefit look less urgent than immediate returns."],
  },
  {
    category: "Identity",
    text: "What happens to identity when several cultures feel like home — and none of them entirely does?",
    breaks: ["Many systems still expect identity to fit one stable, singular category.", "Belonging can be conditional even for people fluent in more than one cultural context.", "Cultural familiarity is often mistaken for a universal experience rather than a local one."],
  },
  {
    category: "Equity",
    text: "How should access to AI, compute, and productivity gains avoid widening existing inequality?",
    breaks: ["The highest-leverage tools tend to reach people who already hold capital, time, and access.", "Access requires more than an account: it also depends on language, confidence, data, and agency.", "Efficiency gains do not automatically redistribute power or opportunity."],
  },
];

const reveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.52, ease: "circOut" },
} as const;

function scrollToRoom(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function RouteStamp({ index, room, next, dark = false }: { index: string; room: string; next: string; dark?: boolean }) {
  const baseTone = dark ? "text-[#F8FAFC]/52" : "text-[#697386]";
  const activeTone = dark ? "text-[#F8FAFC]" : "text-[#202435]";
  return (
    <div className={`mb-10 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10px] uppercase tracking-[0.16em] ${baseTone}`}>
      <span className={`flex items-center gap-2 ${activeTone}`}><span className="h-2 w-2 rounded-full bg-[#6E70A8]" /> {index} / {room}</span>
      <span className="hidden h-px w-10 bg-current opacity-40 sm:block" />
      <span>Next room: <span className={activeTone}>{next}</span></span>
    </div>
  );
}

export default function Home() {
  const [activeRoom, setActiveRoom] = useState("welcome");
  const [activeProject, setActiveProject] = useState(0);
  const [activeLayer, setActiveLayer] = useState(0);
  const [activeMethod, setActiveMethod] = useState(0);
  const [activeNoteCategory, setActiveNoteCategory] = useState("All");
  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, { stiffness: 130, damping: 24, mass: 0.3 });

  const visibleNotes = useMemo(
    () => notes.filter((note) => activeNoteCategory === "All" || note.category === activeNoteCategory),
    [activeNoteCategory],
  );

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-room]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (current) setActiveRoom(current.target.id);
      },
      { rootMargin: "-28% 0px -58% 0px", threshold: [0.05, 0.2, 0.55] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen overflow-x-clip bg-[#FBFCFF] text-[#202435] selection:bg-[#6E70A8] selection:text-[#FBFCFF]">
      <motion.div className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-[#6E70A8]" style={{ scaleX: progressScale }} />

      <header className="sticky top-0 z-40 border-b border-[#202435]/10 bg-[#FBFCFF]/88 backdrop-blur-xl">
        <div className="mx-auto flex h-[74px] max-w-[1440px] items-center justify-between px-5 md:px-8 lg:px-12">
          <button onClick={() => scrollToRoom("welcome")} className="group flex items-center text-left" aria-label="Back to the studio entrance">
            <span className="wordmark-averia text-[18px] tracking-[0.01em] text-[#202435]">Cedric Lam<span className="text-[#FBF7AC]">.</span></span>
          </button>
          <div className="hidden items-center gap-6 lg:flex">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8A94A6]">Open studio / Taipei + Hong Kong</span>
            <button onClick={() => scrollToRoom("hello")} className="inline-flex items-center gap-2 border-b border-[#202435] pb-1 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors hover:text-[#6E70A8]">
              Say hello <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <button onClick={() => scrollToRoom("studio-map")} className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] lg:hidden">
            Explore <MoveDown className="h-3.5 w-3.5" />
          </button>
        </div>
      </header>

      <aside aria-label="Studio navigation" className="fixed left-7 top-[54%] z-30 hidden -translate-y-1/2 lg:block">
        <div className="relative border-l border-[#202435]/30 pl-4">
          <p className="mb-5 font-mono text-[9px] uppercase tracking-[0.2em] text-[#8A94A6]">Studio route</p>
          <div className="relative flex flex-col gap-[18px]">
          <div className="absolute left-[3px] top-[9px] h-[calc(100%-18px)] border-l border-[#202435]/15" />
          {roomLinks.map((room) => {
            const isActive = activeRoom === room.id;
            return (
              <button key={room.id} onClick={() => scrollToRoom(room.id)} className="group relative flex items-center gap-3 text-left" aria-current={isActive ? "location" : undefined}>
                <span className={`z-10 h-[7px] w-[7px] rounded-full border transition-all duration-200 ${isActive ? "scale-[1.45] border-[#6E70A8] bg-[#6E70A8]" : "border-[#8A94A6] bg-[#FBFCFF] group-hover:border-[#6E70A8]"}`} />
                <span className={`font-mono text-[9px] uppercase tracking-[0.13em] transition-colors ${isActive ? "text-[#202435]" : "text-[#8A94A6] group-hover:text-[#697386]"}`}><span className="mr-2 opacity-65">{room.index}</span>{room.label}</span>
              </button>
            );
          })}
          </div>
        </div>
      </aside>

      <section id="welcome" data-room className="atlas-field relative isolate min-h-[calc(100svh-74px)] overflow-hidden bg-[#FBFCFF]">
        <div aria-hidden="true" className="absolute right-[-9rem] top-[8%] h-[42rem] w-[42rem] rounded-full border border-[#6E70A8]/35" />
        <div aria-hidden="true" className="absolute right-[3%] top-[18%] h-[29rem] w-[29rem] rounded-full border border-[#202435]/12" />
        <div aria-hidden="true" className="absolute right-[11%] top-[27%] h-[17rem] w-[17rem] rounded-full border border-dashed border-[#6E70A8]/40" />
        <div aria-hidden="true" className="absolute right-[19%] top-[39%] h-5 w-5 rounded-full border-[5px] border-[#FBF7AC] bg-[#FBFCFF]" />
        <div aria-hidden="true" className="absolute right-[15%] top-[17%] h-px w-[26rem] rotate-[31deg] bg-[#202435]/15" />
        <div aria-hidden="true" className="absolute bottom-[16%] right-[4%] h-px w-[30rem] -rotate-[13deg] bg-[#6E70A8]/40" />
        <div className="relative mx-auto flex min-h-[calc(100svh-74px)] max-w-[1440px] items-end px-5 pb-14 pt-16 md:px-8 md:pb-20 lg:px-20 lg:pb-24 xl:pl-48">
          <motion.div {...reveal} className="max-w-4xl">
            <div className="mb-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#697386]">
              <span className="h-2 w-2 rounded-full bg-[#6E70A8]" /> Cedric Lam · Studio
            </div>
            <h1 className="wordmark-averia text-[clamp(4.2rem,10.4vw,10.75rem)] leading-[0.83] tracking-[-0.075em] text-[#202435]">Cedric<br />Lam<span className="text-[#6E70A8]">.</span></h1>
            <p className="mt-10 max-w-2xl font-display text-[clamp(1.45rem,2.4vw,2.55rem)] leading-[1.2] tracking-[-0.035em] text-[#202435]">A globally minded product creator building the connective tissue between technology, design, business, and human-centred thinking.</p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
              <button onClick={() => scrollToRoom("studio-map")} className="group inline-flex items-center gap-3 border-b border-[#202435] pb-2 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors hover:text-[#6E70A8]">
                Enter the studio <ArrowDownRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:translate-y-1" />
              </button>
              <span className="max-w-xs font-sans text-sm leading-6 text-[#697386]">Useful ideas. Thoughtful details. People on the other side.</span>
            </div>
          </motion.div>
          <div className="absolute bottom-7 right-5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#697386] md:bottom-10 md:right-8 lg:right-20">01 — Welcome</div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-[#202435]/10 bg-[#E9EDF5] py-24 md:py-32 xl:pl-28">
        <motion.div {...reveal} className="relative mx-auto max-w-6xl px-5 md:px-8 lg:px-12">
          <p className="font-display text-[clamp(2.7rem,5.8vw,6.6rem)] font-light leading-[1.12] tracking-[-0.055em] text-[#202435]">I absorb <em className="font-medium text-[#4E4F80]">broadly</em>,<br />connect <em className="font-medium text-[#4E4F80]">deeply</em>,</p>
          <div className="ml-0 mt-4 flex items-center gap-3 sm:ml-[12%] sm:gap-5 md:mt-7">
            <span className="h-7 w-7 shrink-0 rounded-full border border-[#6E70A8] bg-[#6E70A8]/10 sm:h-10 sm:w-10" />
            <p className="whitespace-nowrap font-display text-[clamp(1.45rem,8vw,2.7rem)] font-light leading-[1.12] tracking-[-0.055em] sm:text-[clamp(2.7rem,5.8vw,6.6rem)]">and build <em className="font-medium text-[#4E4F80]">thoughtfully.</em></p>
          </div>
        </motion.div>
      </section>

      <section id="studio-map" data-room className="relative bg-white py-24 md:py-32 xl:pl-40">
        <div className="mx-auto max-w-[1240px] px-5 md:px-8 lg:px-12">
          <motion.div {...reveal} className="grid gap-10 border-b border-[#292330]/15 pb-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <RouteStamp index="02" room="Look around" next="Workbench" />
              <h2 className="section-title">Take a look around.</h2>
            </div>
            <p className="max-w-xl text-lg leading-8 text-[#615A69]">This is a working studio: part evidence, part reflection, and part unfinished notebook. Start wherever your curiosity pulls you.</p>
          </motion.div>
          <div className="mt-8 grid gap-x-14 gap-y-2 md:grid-cols-2">
            {[
              { index: "01", eyebrow: "Workbench", title: "Things I've tried to improve", desc: "Products, prototypes, and companies that began with an ordinary friction.", target: "workbench" },
              { index: "02", eyebrow: "Layers", title: "What I carry forward", desc: "Cultures, disciplines, values, and practices that overlap in how I see.", target: "layers" },
              { index: "03", eyebrow: "Method", title: "How I work", desc: "A repeatable movement from lived reality to something people can use.", target: "method" },
              { index: "04", eyebrow: "Margin notes", title: "Things I can't stop thinking about", desc: "Questions that keep returning — and might become a next beginning.", target: "margin-notes" },
            ].map((room, index) => (
              <motion.button {...reveal} transition={{ ...reveal.transition, delay: index * 0.06 }} key={room.title} onClick={() => scrollToRoom(room.target)} className="group grid grid-cols-[44px_1fr_auto] gap-4 border-b border-[#292330]/15 py-7 text-left first:border-t md:first:border-t-0">
                <span className="font-mono text-[10px] tracking-[0.15em] text-[#9891A0]">{room.index}</span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-[#6E70A8]">{room.eyebrow}</span>
                  <span className="mt-2 block font-display text-2xl leading-tight tracking-[-0.035em] text-[#292330] md:text-[1.7rem]">{room.title}</span>
                  <span className="mt-2 block max-w-sm text-sm leading-6 text-[#615A69]">{room.desc}</span>
                </span>
                <ChevronRight className="mt-8 h-5 w-5 text-[#9891A0] transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#6E70A8]" />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <section id="workbench" data-room className="relative overflow-hidden bg-[#111217] py-24 text-[#F8FAFC] md:py-32 xl:pl-40">
        <div aria-hidden="true" className="absolute -right-14 top-20 h-72 w-72 rounded-full border border-[#FBF7AC]/35" />
        <div aria-hidden="true" className="absolute right-20 top-52 h-40 w-40 rounded-full border border-[#6E70A8]/65" />
        <div aria-hidden="true" className="absolute left-[44%] top-16 h-px w-[36rem] rotate-[23deg] bg-[#FBF7AC]/25" />
        <div className="mx-auto max-w-[1240px] px-5 md:px-8 lg:px-12">
          <motion.div {...reveal} className="max-w-3xl">
            <RouteStamp index="03" room="Workbench" next="Layers" dark />
            <h2 className="section-title text-[#F8FAFC]">Things I’ve tried to improve.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#F8FAFC]/62">I tend to begin with something in ordinary life that feels unnecessarily difficult, unhealthy, disempowering, or wasteful — and ask whether a product could make it better.</p>
          </motion.div>
          <div className="mt-14 grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:gap-16">
            <motion.div {...reveal} className="relative border-y border-[#F8FAFC]/15">
              <div aria-hidden="true" className="absolute bottom-8 left-[42px] top-8 w-px bg-[#FBF7AC]/55" />
              {projects.map((project, index) => (
                <button key={project.name} onClick={() => setActiveProject(index)} className={`group mx-3 flex w-[calc(100%-1.5rem)] items-start gap-4 px-3 py-5 text-left transition-colors ${index < projects.length - 1 ? "border-b border-[#F8FAFC]/15" : ""} ${activeProject === index ? "bg-[#FBF7AC]/[0.12] text-[#F8FAFC]" : "hover:bg-[#F8FAFC]/[0.07]"}`} aria-pressed={activeProject === index}>
                  <span className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-mono text-[10px] tracking-[0.12em] ${activeProject === index ? "border-[#FBF7AC] bg-[#FBF7AC] text-[#111217]" : "border-[#F8FAFC]/45 bg-[#111217] text-[#F8FAFC]/55"}`}>0{index + 1}</span>
                  <span className="min-w-0 flex-1 pr-4">
                    <span className={`block font-mono text-[10px] uppercase tracking-[0.14em] ${activeProject === index ? "text-[#FBF7AC]" : "text-[#F8FAFC]/45"}`}>{project.tag}</span>
                    <span className="mt-1 block font-display text-xl leading-6 tracking-[-0.025em]">{project.title}</span>
                  </span>
                  <CircleArrowRight className={`mt-3 h-4 w-4 shrink-0 transition-all duration-200 ${activeProject === index ? "text-[#FBF7AC]" : "text-[#F8FAFC]/45 group-hover:translate-x-1"}`} />
                </button>
              ))}
            </motion.div>
            <motion.div {...reveal} className="relative min-h-[460px] overflow-hidden border border-[#FBF7AC]/30 bg-[#090A0D] p-7 text-[#F8FAFC] sm:p-10" key={projects[activeProject].name}>
              <div aria-hidden="true" className="absolute -right-24 -top-20 h-96 w-96 rounded-full border border-[#FBF7AC]/70" />
              <div aria-hidden="true" className="absolute right-10 top-16 h-56 w-56 rounded-full border border-dashed border-[#F8FAFC]/20" />
              <div aria-hidden="true" className="absolute -right-8 bottom-12 h-72 w-72 rounded-full border border-[#6E70A8]/55" />
              <div aria-hidden="true" className="absolute right-16 top-[44%] h-4 w-4 rounded-full border-[4px] border-[#FBF7AC]/85 bg-[#090A0D]" />
              <div aria-hidden="true" className="absolute -right-6 top-[45%] h-px w-[22rem] -rotate-[27deg] bg-[#FBF7AC]/42" />
              <div aria-hidden="true" className="absolute right-0 top-[52%] h-px w-[15rem] rotate-[48deg] bg-[#F8FAFC]/18" />
              <div className="relative flex h-full max-w-md flex-col">
                <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[#FBF7AC]"><span className={`h-2 w-2 rounded-full ${projects[activeProject].accent}`} /> Active trajectory</div>
                <h3 className="mt-10 font-display text-[clamp(2.3rem,4vw,4rem)] leading-[0.98] tracking-[-0.055em]">{projects[activeProject].name}</h3>
                <p className="mt-5 font-display text-xl leading-7 text-[#F1F4FA]">{projects[activeProject].short}</p>
                <p className="mt-6 text-[15px] leading-7 text-[#F8FAFC]/65">{projects[activeProject].body}</p>
                <div className="mt-auto pt-10 font-mono text-[10px] uppercase tracking-[0.15em] text-[#F8FAFC]/45">{projects[activeProject].roles}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="layers" data-room className="atlas-field relative overflow-hidden bg-[#FBFCFF] py-24 text-[#202435] md:py-32 xl:pl-40">
        <div aria-hidden="true" className="absolute -right-20 top-8 h-[34rem] w-[34rem] rounded-full border border-[#6E70A8]/30" />
        <div aria-hidden="true" className="absolute right-[10%] top-[23%] h-56 w-56 rounded-full border border-[#202435]/12" />
        <div className="relative mx-auto max-w-[1240px] px-5 md:px-8 lg:px-12">
          <motion.div {...reveal} className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="max-w-md">
              <RouteStamp index="04" room="Layers" next="Method" />
              <h2 className="section-title">What I carry forward.</h2>
              <p className="mt-6 text-lg leading-8 text-[#697386]">The parts of me do not sit in separate boxes. They overlap — cultures, technical depth, business, design, values, music, movement — and become the lens I bring to new problems.</p>
              <div className="mt-12 font-mono text-[10px] leading-6 uppercase tracking-[0.14em] text-[#697386]">Hong Kong <span className="px-1 text-[#6E70A8]">→</span> Canada <span className="px-1 text-[#6E70A8]">→</span> Korea / UK <span className="px-1 text-[#6E70A8]">→</span> France / Singapore <span className="px-1 text-[#6E70A8]">→</span> <span className="text-[#202435]">Taiwan</span></div>
            </div>
            <div className="relative pt-2 lg:pt-7">
              {layers.map((layer, index) => {
                const isSelected = activeLayer === index;
                return (
                  <motion.button {...reveal} transition={{ ...reveal.transition, delay: index * 0.05 }} key={layer.title} onClick={() => setActiveLayer(index)} className={`relative block w-full border border-[#202435]/12 px-5 py-5 text-left transition-all duration-200 sm:px-7 ${isSelected ? "bg-[#F1F4FA]" : "bg-white/55 hover:bg-white"}`} style={{ marginLeft: `${index * 3.4}%`, width: `${100 - index * 3.4}%` }} aria-pressed={isSelected}>
                    <span className="flex items-center gap-4"><span className="font-mono text-[10px] tracking-[0.1em] text-[#6E70A8]">0{index + 1}</span><Plus className={`h-4 w-4 transition-transform duration-200 ${isSelected ? "rotate-45 text-[#4E4F80]" : "text-[#6E70A8]"}`} /><span className="font-display text-xl tracking-[-0.025em]">{layer.title}</span></span>
                    <span className={`mt-2 block pl-8 text-sm leading-6 ${isSelected ? "text-[#202435]/85" : "text-[#697386]"}`}>{isSelected ? layer.expanded : layer.note}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="method" data-room className="relative bg-white py-24 md:py-32 xl:pl-40">
        <div className="mx-auto max-w-[1240px] px-5 md:px-8 lg:px-12">
          <motion.div {...reveal} className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <RouteStamp index="05" room="Method" next="Margin notes" />
              <h2 className="section-title">From ambiguity to something real.</h2>
            </div>
            <p className="max-w-xl text-lg leading-8 text-[#615A69]">The exact tools change. The underlying movement is fairly consistent: understand the human situation, find the structure inside it, and make the next idea tangible enough to learn from.</p>
          </motion.div>
          <div className="relative mt-16 grid gap-4 border-t border-[#292330]/15 pt-7 md:grid-cols-5">
            {methodSteps.map((step, index) => {
              const active = index === activeMethod;
              return (
                <motion.button {...reveal} transition={{ ...reveal.transition, delay: index * 0.05 }} key={step.title} onClick={() => setActiveMethod(index)} className={`relative min-h-[270px] border-b border-[#292330]/15 pb-7 text-left md:border-b-0 md:pr-5 ${index < methodSteps.length - 1 ? "md:border-r" : ""} ${active ? "text-[#292330]" : "text-[#615A69]"}`} aria-pressed={active}>
                  <span className={`flex h-8 w-8 items-center justify-center rounded-full border font-mono text-[10px] ${active ? "border-[#6E70A8] bg-[#6E70A8] text-[#F2EEE6]" : "border-[#9891A0] text-[#9891A0]"}`}>0{index + 1}</span>
                  <span className="mt-8 block font-display text-2xl tracking-[-0.035em]">{step.title}</span>
                  <span className={`mt-4 block text-sm leading-6 transition-colors ${active ? "text-[#615A69]" : "text-[#9891A0]"}`}>{step.body}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      <section id="margin-notes" data-room className="atlas-field relative bg-[#FBFCFF] py-24 md:py-32 xl:pl-40">
        <div className="mx-auto max-w-[1240px] px-5 md:px-8 lg:px-12">
          <motion.div {...reveal} className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
            <div className="max-w-md">
              <RouteStamp index="06" room="Margin notes" next="Hello" />
              <h2 className="section-title">Things I can’t stop thinking about.</h2>
              <p className="mt-6 text-lg leading-8 text-[#615A69]">Not a roadmap. Just recurring questions that return in conversations, while running, over coffee, or whenever a new product idea begins to form.</p>
              <div className="mt-9 flex flex-wrap gap-x-4 gap-y-3">
                {["All", ...notes.map((note) => note.category)].map((category) => (
                  <button key={category} onClick={() => setActiveNoteCategory(category)} className={`border-b pb-1 font-mono text-[10px] uppercase tracking-[0.13em] transition-colors ${activeNoteCategory === category ? "border-[#6E70A8] text-[#4E4F80]" : "border-transparent text-[#9891A0] hover:text-[#615A69]"}`} aria-pressed={activeNoteCategory === category} aria-expanded={activeNoteCategory === category && category !== "All"}>{category}</button>
                ))}
              </div>
            </div>
            <div className="relative border-t border-[#292330]/15">
              {visibleNotes.map((note, index) => (
                <motion.article key={note.category} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32, delay: index * 0.04 }} className="grid grid-cols-[100px_1fr] gap-4 border-b border-[#292330]/15 py-7 sm:grid-cols-[125px_1fr]">
                  <span className="pt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-[#6E70A8]"><span className="mr-2 text-[#9891A0]">0{index + 1}</span>{note.category}</span>
                  <p className="font-display text-[clamp(1.35rem,2vw,1.8rem)] font-light leading-[1.35] tracking-[-0.03em] text-[#292330]">{note.text}</p>
                  {activeNoteCategory !== "All" && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.24 }} className="col-start-2 mt-1 border-t border-[#202435]/12 pt-5">
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#4E4F80]">What’s broken</p>
                      <ul className="mt-3 space-y-3">
                        {note.breaks.map((item, breakIndex) => (
                          <li key={item} className="grid grid-cols-[18px_1fr] gap-3 text-sm leading-6 text-[#697386]">
                            <span className="pt-[2px] font-mono text-[10px] text-[#6E70A8]">0{breakIndex + 1}</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="hello" data-room className="relative isolate overflow-hidden bg-[#202435] py-24 text-[#F8FAFC] md:py-32 xl:pl-40">
        <div className="absolute right-[-5%] top-[-12%] h-[440px] w-[440px] rounded-full border border-[#6E70A8]/50" />
        <div className="absolute right-[10%] top-[13%] h-[18px] w-[18px] rounded-full bg-[#6E70A8]" />
        <div className="relative mx-auto max-w-[1240px] px-5 md:px-8 lg:px-12">
          <motion.div {...reveal} className="max-w-3xl">
            <RouteStamp index="07" room="Hello" next="Welcome" dark />
            <h2 className="font-display text-[clamp(3.3rem,7vw,7.4rem)] font-medium leading-[0.9] tracking-[-0.065em]">Make the next useful action easier to see.</h2>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#F2EEE6]/65">Currently based between Taiwan and Hong Kong, making space for family and considering the next useful contribution — beginning a new build, joining a thoughtful team, or helping a founder turn an ambiguous idea into a product people can test.</p>
            <div className="mt-11 flex flex-wrap gap-x-8 gap-y-4">
              <a href="mailto:cedric.lam@gmail.com" className="group inline-flex items-center gap-3 border-b border-[#F2EEE6]/50 pb-2 font-mono text-[11px] uppercase tracking-[0.13em] transition-colors hover:border-[#6E70A8] hover:text-[#B5B6DD]"><Mail className="h-4 w-4" /> cedric.lam@gmail.com</a>
              <a href="https://www.linkedin.com/in/lamcedric/" target="_blank" rel="noreferrer" className="group inline-flex items-center gap-3 border-b border-[#F2EEE6]/50 pb-2 font-mono text-[11px] uppercase tracking-[0.13em] transition-colors hover:border-[#6E70A8] hover:text-[#B5B6DD]"><ExternalLink className="h-4 w-4" /> LinkedIn</a>
            </div>
          </motion.div>
          <motion.div {...reveal} className="mt-24 flex items-end justify-between gap-5 border-t border-[#F2EEE6]/15 pt-8">
            <div className="wordmark-averia text-[clamp(4.5rem,11vw,11rem)] leading-[0.74] tracking-[-0.085em]">Cedric<br />Lam<span className="text-[#FBF7AC]">.</span></div>
            <button onClick={() => scrollToRoom("welcome")} className="mb-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[#F2EEE6]/55 transition-colors hover:text-[#B5B6DD]"><Sparkles className="h-3.5 w-3.5" /> Replay the studio</button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
