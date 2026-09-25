import { useState, useEffect, useRef } from 'react'

/* ── Bubble field ──────────────────────────────────────────── */
function Bubbles({ count = 18 }: { count?: number }) {
  const bubbles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 24 + 6,
    left: Math.random() * 100,
    delay: Math.random() * 12,
    duration: Math.random() * 10 + 8,
    bottom: Math.random() * 30,
  }))

  return (
    <>
      {bubbles.map(b => (
        <div
          key={b.id}
          className="bubble"
          style={{
            width: b.size,
            height: b.size,
            left: `${b.left}%`,
            bottom: `${b.bottom}%`,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </>
  )
}

/* ── Nemo SVG ───────────────────────────────────────────────── */
function NemoFish({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <ellipse cx="55" cy="42" rx="38" ry="22" fill="#f97316" />
      {/* White stripes */}
      <ellipse cx="55" cy="42" rx="10" ry="21" fill="white" opacity="0.9" />
      <ellipse cx="75" cy="42" rx="6" ry="18" fill="white" opacity="0.75" />
      {/* Dark outlines */}
      <ellipse cx="55" cy="42" rx="38" ry="22" stroke="#92400e" strokeWidth="1.5" fill="none" />
      {/* Tail fin */}
      <path d="M17 42 L2 25 L2 59 Z" fill="#f97316" stroke="#92400e" strokeWidth="1.2" />
      {/* Top fin */}
      <path d="M60 20 Q70 10 80 18 Q70 22 60 22 Z" fill="#f97316" stroke="#92400e" strokeWidth="1" />
      {/* Bottom fin */}
      <path d="M55 64 Q62 72 70 66 Q64 62 55 64 Z" fill="#f97316" stroke="#92400e" strokeWidth="1" />
      {/* Eye */}
      <circle cx="83" cy="37" r="7" fill="white" />
      <circle cx="84" cy="37" r="4.5" fill="#1e293b" />
      <circle cx="85.5" cy="35.5" r="1.5" fill="white" />
      {/* Smile */}
      <path d="M88 44 Q92 47 89 49" stroke="#92400e" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  )
}

/* ── Dory SVG ───────────────────────────────────────────────── */
function DoryFish({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 110 75" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="40" rx="33" ry="20" fill="#1d4ed8" />
      <path d="M50 20 Q60 8 70 18 Q62 22 50 22 Z" fill="#1d4ed8" stroke="#1e3a8a" strokeWidth="1" />
      <path d="M17 40 L3 27 L3 53 Z" fill="#1d4ed8" stroke="#1e3a8a" strokeWidth="1.2" />
      <path d="M22 52 Q30 62 40 56 Q32 52 22 52 Z" fill="#60a5fa" />
      {/* Yellow stripe */}
      <path d="M30 22 Q35 40 30 58" stroke="#fbbf24" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.8" />
      <ellipse cx="50" cy="40" rx="33" ry="20" stroke="#1e3a8a" strokeWidth="1.5" fill="none" />
      {/* Eye */}
      <circle cx="72" cy="35" r="6" fill="white" />
      <circle cx="73" cy="35" r="4" fill="#1e293b" />
      <circle cx="74" cy="33.5" r="1.3" fill="white" />
    </svg>
  )
}

/* ── Coral decoration ───────────────────────────────────────── */
function CoralDecor({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 95 L40 60" stroke="#ff6b35" strokeWidth="5" strokeLinecap="round" />
      <path d="M40 75 Q25 60 20 45 Q30 50 40 60" stroke="#ff6b35" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M40 65 Q55 50 60 35 Q50 40 40 55" stroke="#ff8c5a" strokeWidth="4" strokeLinecap="round" fill="none" />
      <circle cx="20" cy="42" r="6" fill="#ff6b35" />
      <circle cx="60" cy="32" r="7" fill="#ff8c5a" />
      <circle cx="40" cy="58" r="5" fill="#fca5a5" />
      <path d="M40 82 Q28 70 25 58" stroke="#ff6b35" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <circle cx="25" cy="56" r="5" fill="#ff6b35" />
    </svg>
  )
}

/* ── Animated skill bar ─────────────────────────────────────── */
function SkillBar({ label, level, icon }: { label: string; level: number; icon: string }) {
  const [width, setWidth] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setWidth(level); obs.disconnect() }
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [level])

  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between items-center mb-2">
        <span className="flex items-center gap-2 font-semibold text-blue-100">
          <span className="text-lg">{icon}</span>{label}
        </span>
        <span className="text-[var(--color-biolum)] font-display font-bold text-sm">{level}%</span>
      </div>
      <div className="h-2 bg-[rgba(0,212,255,0.1)] rounded-full overflow-hidden border border-[rgba(0,212,255,0.1)]">
        <div className="skill-bar-fill" style={{ width: `${width}%` }} />
      </div>
    </div>
  )
}

/* ── Project card ───────────────────────────────────────────── */
function ProjectCard({ title, description, tags, emoji, color }: {
  title: string; description: string; tags: string[]; emoji: string; color: string
}) {
  return (
    <div className="ocean-card rounded-2xl p-6 flex flex-col gap-3 cursor-default">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-1`} style={{ background: color }}>
        {emoji}
      </div>
      <h3 className="section-title text-lg text-white">{title}</h3>
      <p className="text-blue-200 text-sm leading-relaxed">{description}</p>
      <div className="flex flex-wrap gap-2 mt-auto pt-2">
        {tags.map(t => (
          <span key={t} className="text-xs px-2 py-0.5 rounded-full border border-[rgba(0,212,255,0.3)] text-[var(--color-biolum)] font-semibold">
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── Main App ───────────────────────────────────────────────── */
export default function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'projects', 'contact']
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) })
    }, { threshold: 0.5 })
    sections.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  const skills = [
    { label: 'React / TypeScript', level: 92, icon: '⚛️' },
    { label: 'Node.js / Express', level: 85, icon: '🟢' },
    { label: 'UI / UX Design', level: 80, icon: '🎨' },
    { label: 'PostgreSQL', level: 75, icon: '🐘' },
    { label: 'Python', level: 70, icon: '🐍' },
    { label: 'DevOps / CI/CD', level: 65, icon: '🚀' },
  ]

  const projects = [
    {
      title: 'DeepSea Dashboard',
      description: 'Real-time ocean monitoring platform with live sensor data, animated charts, and predictive analytics for marine researchers.',
      tags: ['React', 'D3.js', 'WebSocket'],
      emoji: '🌊',
      color: 'rgba(29,78,216,0.4)',
    },
    {
      title: 'CoralNet AI',
      description: 'Machine learning system that identifies coral species from underwater photos with 94% accuracy using custom CNN architecture.',
      tags: ['Python', 'TensorFlow', 'FastAPI'],
      emoji: '🪸',
      color: 'rgba(255,107,53,0.3)',
    },
    {
      title: 'P. Sherman 42',
      description: 'Full-stack property listings platform inspired by the famous address. Features map search, real-time chat, and virtual tours.',
      tags: ['Next.js', 'Supabase', 'Mapbox'],
      emoji: '🏠',
      color: 'rgba(212,168,83,0.3)',
    },
    {
      title: 'Whale Song',
      description: 'Audio visualization app that transforms ambient sound into generative ocean-inspired animations in real-time.',
      tags: ['Web Audio API', 'Canvas', 'GLSL'],
      emoji: '🎵',
      color: 'rgba(0,212,255,0.2)',
    },
    {
      title: 'Turtle Shell CMS',
      description: 'Headless CMS with a drag-and-drop editor, multi-tenant support, and a GraphQL API serving 200k+ monthly requests.',
      tags: ['GraphQL', 'React', 'Prisma'],
      emoji: '🐢',
      color: 'rgba(45,122,79,0.35)',
    },
    {
      title: 'The EAC',
      description: 'Open-source routing library for distributed systems, inspired by the East Australian Current. Handles 10k+ concurrent connections.',
      tags: ['Rust', 'gRPC', 'Docker'],
      emoji: '🌀',
      color: 'rgba(139,92,246,0.3)',
    },
  ]

  return (
    <div className="relative min-h-screen" style={{ fontFamily: 'var(--font-body)' }}>

      {/* ── Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4"
        style={{ background: 'linear-gradient(180deg, rgba(2,13,26,0.95) 0%, transparent 100%)', backdropFilter: 'blur(8px)' }}>
        <button onClick={() => scrollTo('home')} className="flex items-center gap-2 group">
          <NemoFish className="w-10 h-7 group-hover:scale-110 transition-transform" />
          <span className="section-title text-lg text-white hidden sm:block">Marina<span className="text-[var(--color-coral)]">Dev</span></span>
        </button>
        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {['home', 'about', 'skills', 'projects', 'contact'].map(s => (
            <button key={s} onClick={() => scrollTo(s)}
              className={`nav-link capitalize text-sm ${activeSection === s ? 'text-[var(--color-biolum)]' : ''}`}>
              {s}
            </button>
          ))}
        </div>
        {/* Mobile hamburger */}
        <button className="md:hidden text-blue-200 text-2xl" onClick={() => setMenuOpen(v => !v)}>
          {menuOpen ? '✕' : '≡'}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
          style={{ background: 'rgba(2,13,26,0.97)' }}>
          {['home', 'about', 'skills', 'projects', 'contact'].map(s => (
            <button key={s} onClick={() => scrollTo(s)}
              className="section-title text-3xl text-white capitalize hover:text-[var(--color-biolum)] transition-colors">
              {s}
            </button>
          ))}
        </div>
      )}

      {/* ── HERO ── */}
      <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-center px-6"
        style={{ background: 'linear-gradient(180deg, #020d1a 0%, #061a30 50%, #0a2540 100%)' }}>
        <Bubbles count={20} />

        {/* Caustic light rays */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,212,255,0.07) 0%, transparent 70%)',
        }} />

        {/* Seabed gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(0deg, rgba(10,25,40,1) 0%, transparent 100%)' }} />

        {/* Coral decorations */}
        <CoralDecor className="absolute bottom-0 left-4 w-16 md:w-24 sway-anim opacity-80" />
        <CoralDecor className="absolute bottom-0 right-8 w-12 md:w-20 sway-anim opacity-60" style={{ animationDelay: '1.5s' } as React.CSSProperties} />
        <CoralDecor className="absolute bottom-0 left-1/4 w-10 md:w-16 sway-anim opacity-50" style={{ animationDelay: '0.7s' } as React.CSSProperties} />

        {/* Fish swimming */}
        <NemoFish className="absolute top-32 right-1/4 w-24 float-anim opacity-60" />
        <DoryFish className="absolute top-52 left-1/5 w-20 float-anim opacity-50" style={{ animationDelay: '2s' } as React.CSSProperties} />

        {/* Hero content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-[var(--color-biolum)] font-semibold text-sm tracking-widest uppercase mb-4 opacity-80">
            🐠 &nbsp; Welcome to the reef &nbsp; 🪸
          </p>
          <h1 className="section-title text-5xl md:text-7xl lg:text-8xl text-white mb-4 leading-tight">
            Hi, I'm <span className="shimmer-text">Marina</span>
          </h1>
          <p className="section-title text-2xl md:text-3xl mb-6" style={{ color: 'var(--color-coral-light)' }}>
            Full-Stack Developer &amp; Ocean Dreamer
          </p>
          <p className="text-blue-200 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            Just keep swimming — through code, creativity, and complex problems.
            I build beautiful digital experiences from the ocean floor up.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => scrollTo('projects')} className="coral-btn px-8 py-3 rounded-full text-lg">
              View My Work 🐡
            </button>
            <button onClick={() => scrollTo('contact')} className="biolum-btn px-8 py-3 rounded-full text-lg">
              Say Hello 👋
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-blue-300 opacity-60">
          <span className="text-xs tracking-widest uppercase font-semibold">Dive in</span>
          <div className="w-0.5 h-8 bg-gradient-to-b from-[var(--color-biolum)] to-transparent rounded-full" />
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="relative py-24 px-6 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #0a2540 0%, #061a30 100%)' }}>
        <Bubbles count={8} />
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* Fish illustration side */}
          <div className="relative flex justify-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <div className="absolute inset-0 rounded-full border border-[rgba(0,212,255,0.15)]"
                style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)' }} />
              <NemoFish className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 float-anim" />
              <DoryFish className="absolute bottom-8 right-4 w-32 float-anim" style={{ animationDelay: '1.3s' } as React.CSSProperties} />
              {/* Bubbles cluster */}
              {[20, 40, 65, 80, 30].map((l, i) => (
                <div key={i} className="bubble" style={{
                  width: 8 + i * 3, height: 8 + i * 3,
                  left: `${l}%`, bottom: `${10 + i * 8}%`,
                  animationDuration: `${6 + i}s`, animationDelay: `${i * 0.8}s`,
                }} />
              ))}
            </div>
          </div>

          {/* Text side */}
          <div>
            <p className="text-[var(--color-biolum)] font-semibold text-sm tracking-widest uppercase mb-3">About Me</p>
            <h2 className="section-title text-4xl md:text-5xl text-white mb-6">
              Just a fish who<br /><span style={{ color: 'var(--color-coral)' }}>loves to code</span>
            </h2>
            <p className="text-blue-200 leading-relaxed mb-4">
              I'm a full-stack developer with 6 years of experience building products that live on the web. Like Nemo, I've ventured far from the reef — working with startups, agencies, and enterprise teams across three continents.
            </p>
            <p className="text-blue-200 leading-relaxed mb-4">
              My approach to development is a lot like Dory's: optimistic, persistent, and occasionally forgetful about semicolons. I believe the best products are built with curiosity and empathy at the core.
            </p>
            <p className="text-blue-200 leading-relaxed mb-8">
              When I'm not writing code, you'll find me scuba diving, contributing to marine conservation open-source projects, or rewatching Pixar films for "research."
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: '6+', label: 'Years at Sea' },
                { value: '40+', label: 'Projects Shipped' },
                { value: '12k', label: 'GitHub Stars' },
              ].map(s => (
                <div key={s.label} className="ocean-card rounded-xl p-4 text-center">
                  <div className="section-title text-2xl md:text-3xl" style={{ color: 'var(--color-biolum)' }}>{s.value}</div>
                  <div className="text-blue-300 text-xs mt-1 font-semibold">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="relative py-24 px-6 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #061a30 0%, #020d1a 100%)' }}>
        <Bubbles count={6} />

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[var(--color-biolum)] font-semibold text-sm tracking-widest uppercase mb-3">Skills &amp; Tools</p>
            <h2 className="section-title text-4xl md:text-5xl text-white">
              My Reef <span style={{ color: 'var(--color-coral)' }}>Arsenal</span> 🪸
            </h2>
            <p className="text-blue-300 mt-4 max-w-xl mx-auto">
              Every coral polyp plays a role in the reef ecosystem. These are the technologies I've mastered in my underwater workshop.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Skill bars */}
            <div className="ocean-card rounded-2xl p-8">
              <h3 className="section-title text-xl text-white mb-6">Technical Skills</h3>
              {skills.map(s => <SkillBar key={s.label} {...s} />)}
            </div>

            {/* Tool chips */}
            <div className="flex flex-col gap-6">
              <div className="ocean-card rounded-2xl p-8">
                <h3 className="section-title text-xl text-white mb-5">Favourite Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {['VS Code', 'Figma', 'Docker', 'GitHub Actions', 'Vercel', 'AWS', 'Tailwind CSS', 'Prisma', 'Redis', 'Cloudflare', 'Linear', 'Notion'].map(t => (
                    <span key={t} className="ocean-card px-3 py-1 rounded-full text-sm text-blue-200 font-semibold border-[rgba(0,212,255,0.2)]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="ocean-card rounded-2xl p-8">
                <h3 className="section-title text-xl text-white mb-5">Currently Exploring</h3>
                <div className="flex flex-col gap-3">
                  {[
                    { icon: '🦀', text: 'Rust for systems programming' },
                    { icon: '🤖', text: 'LLM integration & AI tooling' },
                    { icon: '🌐', text: 'WebAssembly + edge computing' },
                  ].map(i => (
                    <div key={i.text} className="flex items-center gap-3 text-blue-200">
                      <span className="text-xl">{i.icon}</span>
                      <span className="font-medium">{i.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="relative py-24 px-6 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #020d1a 0%, #061a30 100%)' }}>
        <Bubbles count={10} />

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[var(--color-biolum)] font-semibold text-sm tracking-widest uppercase mb-3">Projects</p>
            <h2 className="section-title text-4xl md:text-5xl text-white">
              Things I've <span style={{ color: 'var(--color-coral)' }}>Built</span> 🐙
            </h2>
            <p className="text-blue-300 mt-4 max-w-xl mx-auto">
              P. Sherman, 42 Wallaby Way, Sydney… and many more addresses where I've left my mark.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(p => <ProjectCard key={p.title} {...p} />)}
          </div>

          <div className="text-center mt-12">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="biolum-btn px-8 py-3 rounded-full text-base inline-block">
              View all on GitHub 🐙
            </a>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="relative py-24 px-6 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #061a30 0%, #020d1a 100%)' }}>
        <Bubbles count={12} />

        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[var(--color-biolum)] font-semibold text-sm tracking-widest uppercase mb-3">Contact</p>
          <h2 className="section-title text-4xl md:text-5xl text-white mb-4">
            Send a <span style={{ color: 'var(--color-coral)' }}>Message</span><br />in a Bottle 🍾
          </h2>
          <p className="text-blue-200 mb-12 text-lg leading-relaxed">
            Ready to make a splash together? Whether it's a new project, a job opportunity, or just a chat about marine biology — I'd love to hear from you.
          </p>

          <form className="ocean-card rounded-2xl p-8 md:p-10 text-left space-y-5"
            onSubmit={e => { e.preventDefault(); alert('Message sent into the deep! 🌊') }}>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-blue-300 font-semibold text-sm mb-2">Your Name</label>
                <input type="text" placeholder="Nemo" required
                  className="w-full bg-[rgba(0,212,255,0.05)] border border-[rgba(0,212,255,0.2)] rounded-xl px-4 py-3 text-white placeholder-blue-400 focus:outline-none focus:border-[var(--color-biolum)] transition-colors" />
              </div>
              <div>
                <label className="block text-blue-300 font-semibold text-sm mb-2">Email</label>
                <input type="email" placeholder="nemo@thereef.ocean" required
                  className="w-full bg-[rgba(0,212,255,0.05)] border border-[rgba(0,212,255,0.2)] rounded-xl px-4 py-3 text-white placeholder-blue-400 focus:outline-none focus:border-[var(--color-biolum)] transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-blue-300 font-semibold text-sm mb-2">Subject</label>
              <input type="text" placeholder="Just keep shipping…" required
                className="w-full bg-[rgba(0,212,255,0.05)] border border-[rgba(0,212,255,0.2)] rounded-xl px-4 py-3 text-white placeholder-blue-400 focus:outline-none focus:border-[var(--color-biolum)] transition-colors" />
            </div>
            <div>
              <label className="block text-blue-300 font-semibold text-sm mb-2">Message</label>
              <textarea rows={5} placeholder="What are you working on? The ocean is wide…" required
                className="w-full bg-[rgba(0,212,255,0.05)] border border-[rgba(0,212,255,0.2)] rounded-xl px-4 py-3 text-white placeholder-blue-400 focus:outline-none focus:border-[var(--color-biolum)] transition-colors resize-none" />
            </div>
            <button type="submit" className="coral-btn w-full py-4 rounded-xl text-lg">
              Launch into the Ocean 🌊
            </button>
          </form>

          {/* Social links */}
          <div className="flex justify-center gap-6 mt-10">
            {[
              { label: 'GitHub', icon: '🐙', href: '#' },
              { label: 'LinkedIn', icon: '💼', href: '#' },
              { label: 'Twitter', icon: '🐦', href: '#' },
              { label: 'Dribbble', icon: '🎨', href: '#' },
            ].map(s => (
              <a key={s.label} href={s.href}
                className="ocean-card flex items-center gap-2 px-4 py-2 rounded-full text-sm text-blue-200 font-semibold hover:text-white">
                <span>{s.icon}</span>{s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-blue-400 text-sm">
          <div className="flex justify-center items-center gap-3 mb-2">
            <NemoFish className="w-8 h-5" />
            <span className="section-title text-base text-white">MarinaDev</span>
          </div>
          <p>Built with React, Tailwind CSS &amp; a whole lot of ocean love 🌊</p>
          <p className="mt-1 opacity-60">© 2026 Marina Dev · P. Sherman, 42 Wallaby Way, Sydney</p>
        </div>
      </section>
    </div>
  )
}
