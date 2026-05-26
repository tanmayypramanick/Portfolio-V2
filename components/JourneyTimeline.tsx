'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Entry {
  id: number;
  title: string;
  company: string;
  location: string;
  period: string;
  startMonth: number;
  startYear: number;
  endMonth: number | null;
  endYear: number;
  type: 'work' | 'education';
  highlights: string[];
  tags: string[];
  logo?: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
// Sorted by start date (most recent first) - this determines display order

const ENTRIES: Entry[] = [
  {
    id: 1,
    title: 'Software Engineer',
    company: 'ISKCON New Vrindaban',
    location: 'Moundsville, WV',
    period: 'Mar 2025 – Present',
    startMonth: 3, startYear: 2025,
    endMonth: null, endYear: 2026,
    type: 'work',
    highlights: [
      'Launched AI travel concierge via Vapi + GPT APIs — cut inquiry response time 70%, tripled self-service adoption',
      'Built AI demand forecasting engine — reduced waste 18%, lifted occupancy 30%, profit +22%',
    ],
    tags: ['Vapi', 'GPT API', 'Python', 'FastAPI', 'React'],
    logo: '/iskcon.png',
  },
  {
    id: 4,
    title: 'Master of Computer Science',
    company: 'Illinois Institute of Technology',
    location: 'Chicago, IL',
    period: 'Aug 2023 – May 2025',
    startMonth: 8, startYear: 2023,
    endMonth: 5, endYear: 2025,
    type: 'education',
    highlights: [
      'GPA: 3.50/4.0 — Specialization in AI, Machine Learning & Distributed Systems',
      'Shipped production-grade AI systems as part of coursework and independent research',
    ],
    tags: ['Python', 'Machine Learning', 'Algorithms', 'Distributed Systems', 'AI'],
    logo: '/iit.png',
  },
  {
    id: 3,
    title: 'AI Engineer (Full-Stack)',
    company: 'HCA Healthcare',
    location: 'Chicago, IL',
    period: 'Mar 2024 – Feb 2025',
    startMonth: 3, startYear: 2024,
    endMonth: 2, endYear: 2025,
    type: 'work',
    highlights: [
      'Architected AI clinical ops assistant — 1,200+ patient inquiries/month, saved 20 hrs/week of front-desk work',
      'LLM + RAG system (PostgreSQL + FAISS) — improved accuracy 28%, cut hallucinations 35% across 500+ contexts',
    ],
    tags: ['LLM', 'RAG', 'FAISS', 'PostgreSQL', 'Next.js', 'FastAPI', 'SSE'],
    logo: '/hca.png',
  },
  {
    id: 2,
    title: 'Student Assistant',
    company: 'Chicago Public Schools',
    location: 'Chicago, IL',
    period: 'Oct 2024 – May 2025',
    startMonth: 10, startYear: 2024,
    endMonth: 5, endYear: 2025,
    type: 'work',
    highlights: [
      'Exam proctoring & academic operations support across multiple school sites',
      'Data entry, scheduling, and administrative workflow coordination',
    ],
    tags: ['Operations', 'Administration', 'Education'],
    logo: '/cps.png',
  },
  {
    id: 5,
    title: 'Technical Operations Executive',
    company: 'Hexaware Technologies',
    location: 'Navi Mumbai, India',
    period: 'Feb 2023 – Jul 2023',
    startMonth: 2, startYear: 2023,
    endMonth: 7, endYear: 2023,
    type: 'work',
    highlights: [
      'Python + SQL pipelines resolving 1,000+ immigration cases/month — cut query resolution time 35%',
      'Power BI dashboards for real-time tracking — boosted team efficiency 20%, CSAT +60%',
    ],
    tags: ['Python', 'SQL', 'Power BI', 'Data Pipelines'],
    logo: '/hexaware.png',
  },
  {
    id: 6,
    title: 'Software Developer Intern',
    company: 'Vigo Infotech',
    location: 'Mumbai, India',
    period: 'Mar 2022 – Sep 2022',
    startMonth: 3, startYear: 2022,
    endMonth: 9, endYear: 2022,
    type: 'work',
    highlights: [
      'ERP system (Spring Boot, PostgreSQL, Redis) managing shifts & assets — reduced operational errors 25%',
      'Flutter mobile app with Google Maps & REST APIs — saved 20+ hours/month in reporting',
    ],
    tags: ['Spring Boot', 'PostgreSQL', 'Redis', 'Flutter', 'Google Maps'],
    logo: '/vigo.png',
  },
  {
    id: 7,
    title: 'Senior Customer Service Representative',
    company: 'Teleperformance',
    location: 'Mumbai, India',
    period: 'Oct 2019 – Feb 2020',
    startMonth: 10, startYear: 2019,
    endMonth: 2, endYear: 2020,
    type: 'work',
    highlights: [
      'Amazon refunds/returns — consistently maintained high CSAT scores across hundreds of daily cases',
    ],
    tags: ['Customer Support', 'CRM', 'Amazon'],
    logo: '/teleperformance.png',
  },
  {
    id: 8,
    title: 'Bachelor of Computer Engineering',
    company: 'Savitribai Phule Pune University',
    location: 'Nashik, India',
    period: 'Aug 2018 – Jul 2022',
    startMonth: 8, startYear: 2018,
    endMonth: 7, endYear: 2022,
    type: 'education',
    highlights: [
      'GPA: 3.55/4.0 — Strong foundations in Computer Engineering & Software Systems',
      'Coursework: Data Structures, Algorithms, DBMS, Operating Systems, Computer Networks',
    ],
    tags: ['C++', 'Java', 'Data Structures', 'DBMS', 'OS'],
    logo: '/sppu_logo.png',
  },
];

// ─── Card Component ────────────────────────────────────────────────────────────

function Card({
  entry,
  cardIndex,
  groupIndex,
  isLeft,
}: {
  entry: Entry;
  cardIndex: number;
  groupIndex: number;
  isLeft: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const isEdu = entry.type === 'education';
  const isCurrent = entry.endMonth === null;
  const accent = '#d4a574';
  const accentDim = 'rgba(212,165,116,0.18)';
  const accentGlow = 'rgba(212,165,116,0.5)';
  const badgeCls = isEdu
    ? 'bg-amber-500/10 text-amber-300 border-amber-400/25'
    : 'bg-amber-500/10 text-amber-300 border-amber-400/25';

  return (
    <motion.div
      ref={ref}
      className="h-full group"
      initial={{ opacity: 0, y: 36, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{
        duration: 0.6,
        delay: groupIndex * 0.1 + cardIndex * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <motion.div
        className="h-full"
        style={{ transformStyle: 'preserve-3d', perspective: '1100px' }}
        whileHover={{
          scale: 1.018,
          rotateX: 2,
          rotateY: isLeft ? -1.5 : 1.5,
          z: 40,
        }}
        transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      >
        <div
          className="relative h-full rounded-2xl overflow-hidden transition-all duration-500"
          style={{
            backgroundColor: 'var(--surface)',
            backdropFilter: 'blur(24px)',
            borderLeft: `3px solid ${accent}`,
            boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
            border: '1px solid var(--border)',
          }}
        >
          {/* Ambient glow — reveals on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 15% 15%, ${accentDim}, transparent 65%)`,
            }}
          />

          {/* Noise texture overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.025]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: '150px',
            }}
          />

          <div className="relative p-6 flex flex-col h-full">
            {/* Header with Logo */}
            <div className="flex items-start justify-between gap-2 mb-4">
              <div className="flex gap-2 items-center">
                {entry.logo && (
                  <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 bg-white">
                    <img
                      src={entry.logo}
                      alt={entry.company}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <span
                  className={`text-sm px-4 py-1.5 rounded-full font-semibold border flex-shrink-0 ${badgeCls}`}
                >
                  {isEdu ? 'Education' : 'Work'}
                </span>
                {isCurrent && (
                  <span className="text-sm px-3 py-1.5 rounded-full font-semibold bg-green-500/20 text-green-400 border border-green-400/25 animate-pulse">
                    Current
                  </span>
                )}
              </div>
              <span className="text-sm font-mono text-right leading-tight tabular-nums" style={{ color: 'var(--text-secondary)' }}>
                {entry.period}
              </span>
            </div>

            {/* Title */}
            <h4 className="text-2xl font-bold leading-tight mb-3" style={{ color: 'var(--text)' }}>
              {entry.title}
            </h4>

            {/* Company */}
            <p className="text-lg font-semibold mb-3" style={{ color: accent }}>
              {entry.company}
            </p>

            {/* Location */}
            <p className="text-base mb-5 flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
              <span>📍</span>
              <span>{entry.location}</span>
            </p>

            {/* Highlights */}
            <ul className="space-y-2.5 mb-5 flex-1">
              {entry.highlights.map((h, i) => (
                <li key={i} className="flex gap-2.5 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  <span className="flex-shrink-0 mt-0.5" style={{ color: accent }}>▸</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {entry.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1.5 rounded-full"
                  style={{ color: 'var(--text-secondary)', backgroundColor: 'var(--accent-glow)', border: '1px solid var(--border)' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom glow line */}
          <div
            className="absolute bottom-0 left-4 right-4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: `linear-gradient(90deg, transparent, ${accentGlow}, transparent)` }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Year Separator ───────────────────────────────────────────────────────────

function YearSeparator({ year, gi }: { year: number; gi: number }) {
  return (
    <motion.div
      className="relative flex items-center gap-4 -ml-16 mb-7"
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: gi * 0.04 }}
    >
      {/* Circle on the line */}
      <div
        className="relative w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center border-2 z-10 dark:bg-[#1a1a1a] bg-white shadow-lg"
        style={{
          borderColor: 'rgba(212,165,116,0.8)',
          boxShadow: '0 0 0 4px rgba(212,165,116,0.15), 0 0 30px rgba(212,165,116,0.4)',
        }}
      >
        <span className="text-xs font-black dark:text-amber-300 text-amber-800 tracking-tight">{year}</span>
      </div>

      {/* Separator line */}
      <div
        className="flex-1 h-px"
        style={{ background: 'linear-gradient(90deg, rgba(212,165,116,0.5), transparent)' }}
      />

      {/* Ghost watermark */}
      <span
        className="absolute right-0 text-8xl font-black pointer-events-none select-none dark:text-[#d4a574] text-[#d4a574]/15"
        style={{ lineHeight: 1, opacity: 0.5 }}
      >
        {year}
      </span>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function JourneyTimeline() {
  // Sort entries by start date (most recent first)
  const sortedEntries = [...ENTRIES].sort((a, b) => {
    if (a.startYear !== b.startYear) return b.startYear - a.startYear;
    return b.startMonth - a.startMonth;
  });

  // Track which years we've already rendered a separator for
  const seenYears = new Set<number>();

  return (
    <motion.section
      id="journey"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="section relative"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      {/* Heading */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-4xl font-bold mb-3">
          My{' '}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(135deg, #d4a574 0%, #b8956e 100%)' }}
          >
            Journey
          </span>
        </h3>
        <p className="text-base font-mono tracking-widest" style={{ color: 'var(--text-secondary)' }}>2018 → PRESENT</p>
      </motion.div>

      {/* ─── Timeline wrapper ───────────────────────────────────────────────── */}
      {/*
        KEY FIX: All cards are in normal document flow (not absolute-positioned).
        The timeline line is a simple absolute element running the full height
        of this relative container. Overlapping entries render side-by-side via
        CSS grid within each group div.

        Line is at left: 24px (left-6).
        Content area starts at ml-16 (64px), giving 40px buffer from line.
        Dots use style={{ left: '-46px' }} to sit at 64-46=18px, centered at 18+6=24px ✓
      */}
      <div className="relative max-w-4xl mx-auto">

        {/* ── Continuous vertical timeline line ──────────────────────────── */}
        <div className="absolute left-6 top-0 bottom-0 w-[2px] overflow-hidden rounded-full" style={{ backgroundColor: 'var(--border)' }}>
          {/* Base gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, #d4a574 0%, #b8956e 45%, #d4a574 75%, #c9a065 100%)',
              opacity: 0.7,
            }}
          />
          {/* Traveling shimmer */}
          <motion.div
            className="absolute w-full"
            style={{
              height: '100px',
              background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.55), transparent)',
              filter: 'blur(1px)',
            }}
            animate={{ top: ['-100px', '100%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear', repeatDelay: 0.8 }}
          />
        </div>

        {/* ── Month tick marks (decorative, on the line) ──────────────────── */}
        <div className="absolute left-6 top-0 bottom-0 pointer-events-none">
          {Array.from({ length: 84 }, (_, i) => {
            const pct = (i / 83) * 100;
            const isQuarter = i % 3 === 0;
            return (
              <div
                key={i}
                className="absolute"
                style={{
                  top: `${pct}%`,
                  left: isQuarter ? '2px' : '1px',
                  width: isQuarter ? '6px' : '4px',
                  height: '1px',
                  background: isQuarter
                    ? 'rgba(212,165,116,0.4)'
                    : 'rgba(212,165,116,0.15)',
                }}
              />
            );
          })}
        </div>

        {/* ── Content ─────────────────────────────────────────────────────── */}
        <div className="ml-16 space-y-8">
          {sortedEntries.map((entry, index) => {
            const entryYear = entry.startYear;
            const showYear = !seenYears.has(entryYear);
            if (showYear) seenYears.add(entryYear);

            const isCurrent = entry.endMonth === null;
            const accent = '#d4a574';
            const accentGlow = 'rgba(212,165,116,0.7)';

            return (
              <div key={entry.id} className="relative">
                {/* Year separator */}
                {showYear && <YearSeparator year={entryYear} gi={index} />}

                {/* Glowing dot on the timeline line */}
                <motion.div
                  className="absolute rounded-full z-20"
                  style={{
                    left: '-46px',
                    top: '20px',
                    width: isCurrent ? '18px' : '14px',
                    height: isCurrent ? '18px' : '14px',
                    background: isCurrent ? '#10b981' : accent,
                    boxShadow: `0 0 0 3px var(--bg), 0 0 12px ${isCurrent ? 'rgba(16,185,129,0.7)' : accentGlow}, 0 0 24px ${isCurrent ? 'rgba(16,185,129,0.5)' : accentGlow}`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: 'spring',
                    stiffness: 350,
                    damping: 18,
                    delay: index * 0.08,
                  }}
                />

                {/* Card */}
                <Card
                  entry={entry}
                  cardIndex={0}
                  groupIndex={index}
                  isLeft
                />
              </div>
            );
          })}

          {/* End-of-timeline marker */}
          <motion.div
            className="flex items-center gap-4 -ml-16 pt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center border border-dashed dark:border-white/15 border-black/15 flex-shrink-0 dark:bg-[#1a1a1a] bg-white shadow-lg"
            >
              <span className="text-xl">⚡</span>
            </div>
            <p className="text-sm dark:text-white/30 text-black/30 font-mono tracking-widest">
              BUILDING WHAT'S NEXT...
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Responsive: mobile overrides ───────────────────────────────────── */}
      <style jsx>{`
        @media (max-width: 640px) {
          .grid-cols-2 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </motion.section>
  );
}