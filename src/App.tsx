import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { ArrowRight, BrainCircuit, ChartNoAxesCombined, Check, Sparkles, UserRound } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

function useIsMobile() {
  const [mobile, setMobile] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width:800px)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(max-width:800px)')
    const onChange = () => setMobile(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return mobile
}

const installUrl = 'https://toniree.github.io/stratfolio-app/'
const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`
const TOP_ANCHOR = 'top'
const BOTTOM_ANCHOR = 'bottom'

const Fade = ({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .72, delay, ease: [0.16, 1, 0.3, 1] }}>{children}</motion.div>
)

function Brand() {
  return <a href={`#${TOP_ANCHOR}`} className="brand" aria-label="StratFolio home"><img src={asset('brand-mark.svg')} alt="" /><span>Strat<span>Folio</span></span></a>
}

function HorseMark() {
  return <svg className="horse-mark" viewBox="40 40 390 350" aria-hidden="true">
    <path pathLength="1" className="horse-trace horse-trace-soft" d="m323 82 34 79c32 32 51 75 51 122v92H144v-39c0-43 17-83 48-113l31-30c-30 11-61 17-93 20l-31 3c-27 3-48-21-43-48 3-16 16-28 32-30l43-7c37-6 70-25 95-54l37-45c13-15 30-26 49-30z" />
    <path pathLength="1" className="horse-trace" d="m323 82 34 79c32 32 51 75 51 122v92H144v-39c0-43 17-83 48-113l31-30c-30 11-61 17-93 20l-31 3c-27 3-48-21-43-48 3-16 16-28 32-30l43-7c37-6 70-25 95-54l37-45c13-15 30-26 49-30z" />
    <path pathLength="1" className="horse-detail" d="m178 350 66-70 41 35 79-67m26 1-28 73-48-57" />
  </svg>
}

function InstallCard({ floating = false, nav = false }: { floating?: boolean; nav?: boolean }) {
  const hapticPress = () => {
    if ('vibrate' in navigator) navigator.vibrate(35)
  }
  return <motion.a href={nav ? undefined : installUrl} target={nav ? undefined : '_blank'} rel={nav ? undefined : 'noreferrer'} className={`install-card ${floating ? 'install-float' : ''} ${nav ? 'nav-install' : ''}`} onPointerDown={nav ? undefined : hapticPress} onClick={nav ? undefined : hapticPress} aria-label="Install StratFolio demo on iOS or Android" initial={floating ? { opacity: 0, x: 30 } : undefined} animate={floating ? { opacity: 1, x: 0 } : undefined} transition={{ delay: 1.1 }}>
    <img src={asset('install-qr.png')} alt="QR code to install StratFolio" />
    <div><strong>{nav ? <>Install demo<br />on iOS/Android</> : <>Try StratFolio<br />on your mobile today</>}</strong><small><span className="desktop-install">Scan to install</span><span className="mobile-install">Press to install</span> <ArrowRight size={13} /></small></div>
  </motion.a>
}

function AppShot({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return <div className={`phone ${className}`}><div className="phone-speaker" /><img src={src} alt={alt} /></div>
}

function TradeFlow({ mobile = false }: { mobile?: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const sendOpacity = useTransform(scrollYProgress, [0.04, 0.14], [0, 1])
  const branchScale = useTransform(scrollYProgress, [0.45, 0.68], [0, 1])
  const branchOpacity = useTransform(scrollYProgress, [0.45, 0.49], [0, 1])
  const brokerHighlightProgress = useTransform(scrollYProgress, [0.68, 0.74], [0, 1])
  const brokerOrderProgress = useTransform(scrollYProgress, [0.62, 0.72], [0, 1])
  const followupMessageProgress = useTransform(scrollYProgress, [0.8, 0.86], [0, 1])
  const checkScale = useTransform(scrollYProgress, [0.9, 1], [0, 1])
  const checkOpacity = useTransform(scrollYProgress, [0.9, 0.98], [0, 1])
  const junctionGlowOpacity = useTransform(scrollYProgress, [0.38, 0.45], [0, 1])
  const mainLineScale = useTransform(scrollYProgress, [0.12, 0.42], [0, 1])
  const mainLineOpacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1])
  return <section className="trade-flow" ref={ref}>
    <div className="flow-sticky">
      <div className="flow-heading"><span className="section-num">01 — ONE TRADE, EVERYWHERE</span><h2><span className="flow-title-line">Say the rule. </span><em>StratFolio watches it.</em></h2>{mobile
        ? <p><span className="flow-lead">Write the way you think.</span><span>StratFolio turns plain English into an executable trade plan across all your brokerages.</span></p>
        : <p><span className="flow-lead">Write the way you think.</span><span>StratFolio turns plain English into a monitored executable trade plan.<br />Approve the plan, and watch it execute across any of your brokerages once criteria are met.</span></p>}</div>
      <div className="flow-stage">
        <div className="flow-grid" />
        <motion.div className="send-ticket" style={{ opacity: sendOpacity }}><span className="ticket-avatar"><UserRound size={14} /></span><div><small>USER TRADE RULE</small><strong>“trim semis when Fed says rate-hikes”</strong></div></motion.div>
        <motion.div className="flow-line main-line" style={{ scaleY: mainLineScale, opacity: mainLineOpacity, originY: 0 }} />
        <div className="branch-nodes">
          <div className="junction-node"><HorseMark /><motion.span className="junction-glow" style={{ opacity: junctionGlowOpacity }} /></div>
          <motion.div className="branch-lines" style={{ scale: branchScale, opacity: branchOpacity, originX: 0.5, originY: 0 }}><div className="branch-line line-a" /><div className="branch-line line-b" /><div className="branch-line line-c" /></motion.div>
          <Broker position="broker-left" name="E*TRADE" logo="/etrade-logo.jpg" order="CLOSE 1x MU $500 CALL" highlightProgress={brokerHighlightProgress} orderProgress={brokerOrderProgress} messageProgress={followupMessageProgress} />
          <Broker position="broker-center" name="Schwab" logo="/schwab-mark.svg" order="CLOSE 3x TSM $700 CALL" highlightProgress={brokerHighlightProgress} orderProgress={brokerOrderProgress} messageProgress={followupMessageProgress} />
          <Broker position="broker-right" name="Robinhood" logo="/robin.png" order="CLOSE 2x AMD $600 CALL" highlightProgress={brokerHighlightProgress} orderProgress={brokerOrderProgress} messageProgress={followupMessageProgress} />
        </div>
        <motion.div className="success-badge" style={{ scale: checkScale, opacity: checkOpacity }}><Check size={24} /><span><small>SUCCESS</small><strong>Trade fulfilled</strong></span></motion.div>
      </div>
    </div>
  </section>
}

function Broker({ position, name, logo, order, highlightProgress, orderProgress, messageProgress }: { position: string; name: string; logo: string; order: string; highlightProgress: MotionValue<number>; orderProgress: MotionValue<number>; messageProgress: MotionValue<number> }) {
  const highlightRotation = useTransform(highlightProgress, [0, 1], [0, 360])
  const highlightColor = useTransform(highlightProgress, [0, 1], ['#4d98ff', '#195e4b'])
  const orderGlowProgress = useTransform(orderProgress, [0.96, 1], [0, 1])
  const orderGlowShadow = useTransform(orderGlowProgress, [0, 1], ['0 0 0 rgba(56,217,161,0)', '0 0 22px 6px rgba(56,217,161,.95)'])
  return <div className={`broker-stack ${position}`}><div className="broker-node logo-node"><motion.svg className="logo-halo" viewBox="0 0 100 100" aria-hidden="true" style={{ opacity: 1, x: '-50%', y: '-50%', rotate: highlightRotation }}><motion.circle cx="50" cy="50" r="46" fill="none" strokeWidth="2.5" strokeLinecap="round" style={{ pathLength: highlightProgress, stroke: highlightColor, color: highlightColor }} /></motion.svg><img className="broker-logo" src={logo} alt={`${name} logo`} /></div><motion.div className="order-popup" style={{ scale: orderProgress, opacity: orderProgress }}><motion.span className="order-check" style={{ boxShadow: orderGlowShadow }}><Check size={14} strokeWidth={2.5} /></motion.span><strong>{order}</strong></motion.div>{position === 'broker-center' && <motion.p className="flow-tagline" style={{ opacity: messageProgress }}>That’s how easy it is to manage<br /><em>all your portfolios, 24/7.</em></motion.p>}</div>
}

const GoogleG = () => <svg viewBox="0 0 48 48" aria-hidden="true">
  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
</svg>

const AmazonA = () => <i className="glyph glyph-amazon-forge">a<svg viewBox="0 0 44 16" aria-hidden="true">
  <path d="M3 3c10.5 9 27.5 9 37-1.5" fill="none" stroke="#ff9900" strokeWidth="3" strokeLinecap="round" />
  <path d="M40.2 0l1.6 7.2-7-1.6z" fill="#ff9900" />
</svg></i>

const AppleMark = () => <svg viewBox="0 0 814 1000" aria-hidden="true">
  <path fill="#f2f6fb" d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
</svg>

const FORGE_POPS = [
  { cls: 'pop-tesla', label: 'Tesla logo', glyph: <i className="glyph glyph-tesla">T</i> },
  { cls: 'pop-google', label: 'Google logo', glyph: <i className="glyph glyph-google-classic"><GoogleG /></i> },
  { cls: 'pop-nvidia', label: 'Nvidia logo', glyph: <i className="glyph glyph-nvidia" /> },
  { cls: 'pop-apple', label: 'Apple logo', glyph: <i className="glyph glyph-apple"><AppleMark /></i> },
  { cls: 'pop-amazon', label: 'Amazon logo', glyph: <AmazonA /> },
  { cls: 'pop-news', label: 'News headline', glyph: <i className="glyph glyph-news" /> },
]

const SPARK_COLORS = ['#dff7ff', '#63c3ff', '#a98dff', '#45d7ab', '#ffffff', '#8ecbff']

type Spark = {
  x: number; y: number; vx: number; vy: number
  tx: number; ty: number
  born: number; ttl: number; size: number
  color: string; twinklePhase: number; twinkleFreq: number
  drift: number
}

function MatrixForge() {
  const visualRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const horseRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLSpanElement>(null)
  const popRefs = useRef<(HTMLSpanElement | null)[]>([])
  const sparksRef = useRef<Spark[]>([])
  const chargeRef = useRef(0)
  const [active, setActive] = useState(0)
  const cells = Array.from({ length: 64 })

  // one logo at a time: form out of the tiles → float up → burst into sparks
  useEffect(() => {
    let i = 0
    let burstTimer: ReturnType<typeof setTimeout>
    const cycle = setInterval(() => {
      i = (i + 1) % FORGE_POPS.length
      setActive(i)
      burstTimer = setTimeout(() => spawnBurst(i), 1000)
    }, 1250)
    burstTimer = setTimeout(() => spawnBurst(0), 1000)
    return () => { clearInterval(cycle); clearTimeout(burstTimer) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const spawnBurst = (index: number) => {
    const visual = visualRef.current, pop = popRefs.current[index], horse = horseRef.current
    if (!visual || !pop || !horse) return
    const vb = visual.getBoundingClientRect()
    const pb = pop.getBoundingClientRect()
    const hb = horse.getBoundingClientRect()
    const now = performance.now()
    const cx = pb.left - vb.left + pb.width / 2
    const cy = pb.top - vb.top + pb.height / 2
    const tx = hb.left - vb.left + hb.width / 2
    const ty = hb.top - vb.top + hb.height / 2
    const sparks = sparksRef.current
    for (let s = 0; s < 48; s++) {
      const a = Math.random() * Math.PI * 2
      const r = Math.random() * pb.width * 0.45
      sparks.push({
        x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r * 0.8,
        vx: (Math.random() - 0.5) * 46, vy: -18 - Math.random() * 60,
        tx: tx + (Math.random() - 0.5) * 14, ty: ty + (Math.random() - 0.5) * 10,
        born: now + Math.random() * 160, ttl: 1200 + Math.random() * 500,
        size: 0.6 + Math.random() * 1.7,
        color: SPARK_COLORS[(Math.random() * SPARK_COLORS.length) | 0],
        twinklePhase: Math.random() * Math.PI * 2, twinkleFreq: 6 + Math.random() * 9,
        drift: (Math.random() - 0.5) * 40,
      })
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current, visual = visualRef.current
    if (!canvas || !visual) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let raf = 0
    let last = performance.now()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      const b = visual.getBoundingClientRect()
      canvas.width = b.width * dpr
      canvas.height = b.height * dpr
      canvas.style.width = `${b.width}px`
      canvas.style.height = `${b.height}px`
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(visual)
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.globalCompositeOperation = 'lighter'
      const sparks = sparksRef.current
      let arrived = 0
      for (let i = sparks.length - 1; i >= 0; i--) {
        const p = sparks[i]
        if (now < p.born) continue
        const age = now - p.born
        const life = age / p.ttl
        if (life >= 1) { sparks.splice(i, 1); arrived++; continue }
        // scatter first, then get pulled up into the horse
        const pull = life < 0.22 ? 0 : Math.min((life - 0.22) / 0.5, 1)
        const ease = pull * pull * (3 - 2 * pull)
        p.x += (p.vx + Math.sin(now / 240 + p.twinklePhase) * p.drift * (1 - ease)) * dt * (1 - ease) + (p.tx - p.x) * ease * dt * 4.2
        p.y += p.vy * dt * (1 - ease) + (p.ty - p.y) * ease * dt * 4.2
        const dx = p.tx - p.x, dy = p.ty - p.y
        if (ease > 0.6 && dx * dx + dy * dy < 64) { sparks.splice(i, 1); arrived++; continue }
        const twinkle = 0.45 + 0.55 * Math.abs(Math.sin(now / 1000 * p.twinkleFreq + p.twinklePhase))
        const fade = life < 0.12 ? life / 0.12 : life > 0.86 ? (1 - life) / 0.14 : 1
        ctx.globalAlpha = twinkle * fade
        ctx.fillStyle = p.color
        ctx.shadowColor = p.color
        ctx.shadowBlur = 6
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }
      if (arrived > 0) chargeRef.current = Math.min(chargeRef.current + arrived * 0.06, 1)
      chargeRef.current = Math.max(chargeRef.current - dt * 0.55, 0)
      if (glowRef.current) glowRef.current.style.opacity = String(0.3 + chargeRef.current * 0.7)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [])

  return <div className="matrix-visual matrix-forge" aria-hidden="true" ref={visualRef}>
    <div className="matrix-beam beam-one" /><div className="matrix-beam beam-two" />
    <div className="matrix-cells">{cells.map((_, i) => <i key={i} style={{ animationDelay: `${(i % 8) * 0.11 + Math.floor(i / 8) * .04}s` }} />)}</div>
    <div className="forge-horse" ref={horseRef}><HorseMark /><span className="forge-horse-glow" ref={glowRef} /></div>
    <div className="matrix-pops forge-pops">
      {FORGE_POPS.map((p, i) => <motion.span
        key={p.cls}
        ref={el => { popRefs.current[i] = el }}
        className={`matrix-pop forge-pop ${p.cls}`}
        aria-label={p.label}
        initial={{ opacity: 0, y: 26, scale: 0.4, filter: 'blur(3px)' }}
        animate={active === i
          ? { opacity: [0, 1, 1, 1, 0], y: [26, 0, -6, -44, -50], scale: [0.4, 1, 1.03, 1.05, 0.5], filter: ['blur(3px)', 'blur(0px)', 'blur(0px)', 'blur(0px)', 'blur(3px)'] }
          : { opacity: 0, y: 26, scale: 0.4, filter: 'blur(3px)', transition: { duration: 0.01 } }}
        transition={active === i ? { duration: 1.15, times: [0, 0.26, 0.45, 0.85, 1], ease: 'easeInOut' } : undefined}
      >{p.glyph}</motion.span>)}
    </div>
    <canvas className="forge-canvas" ref={canvasRef} />
    <MachineStream />
  </div>
}

const MACHINE_CHUNKS = [
  '0x7F45 4C46 ▸ exec agent.bin',
  'mov  r1, [thesis_ptr]',
  'attn ▸ softmax(QKᵀ/√64)·V',
  'kv_cache hit ▸ 98.4%',
  'a2a ▸ {"act":"HOLD","p":.97}',
  'tok/s 1.2e4 ▸ ctx 200k',
  'grad_norm 0.003 ▸ stable',
  'mcp ▸ tools/call quotes.get',
  'spec_decode ▸ accept 7/8',
  '0xDEAD BEEF ▸ risk_guard ok',
  'rlhf reward ▸ +1 (user smiled)',
  'temp 0.2 ▸ do not hallucinate',
  'jmp  loop_market_open',
  'xor  fear, fear ▸ 0x0',
]

function MachineStream() {
  const [head, setHead] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setHead(h => (h + 1) % MACHINE_CHUNKS.length), 700)
    return () => clearInterval(t)
  }, [])
  const lines = Array.from({ length: 3 }, (_, i) => MACHINE_CHUNKS[(head - (2 - i) + MACHINE_CHUNKS.length * 2) % MACHINE_CHUNKS.length])
  return <div className="matrix-readout code-readout"><span>MARKET DATA STREAM</span>
    {lines.map((l, i) => <small key={`${head}-${i}`} className={i === 2 ? 'code-line code-line-new' : 'code-line'} style={{ opacity: 0.35 + i * 0.3 }}>{l}{i === 2 && <b className="code-caret" />}</small>)}
  </div>
}

function DataMatrix({ mobile = false }: { mobile?: boolean }) {
  const cells = Array.from({ length: 64 })
  return <section className="data-matrix"><div className="matrix-copy"><span className="section-num">{mobile ? '02 — PERPETUAL MOTION' : '05 — ALWAYS IN MOTION'}</span><h2>Markets move.<br /><em>Your plan moves with them.</em></h2><p>Price, news, catalysts, and risk signals flow through one living system—a system that evolves alongside your portfolio.</p></div>{mobile ? <MatrixForge /> : <div className="matrix-visual" aria-hidden="true"><div className="matrix-beam beam-one" /><div className="matrix-beam beam-two" /><div className="matrix-cells">{cells.map((_, i) => <i key={i} style={{ animationDelay: `${(i % 8) * 0.11 + Math.floor(i / 8) * .04}s` }} />)}</div><div className="matrix-pops"><span className="matrix-pop pop-tesla" aria-label="Tesla logo"><i className="glyph glyph-tesla">T</i></span><span className="matrix-pop pop-nvidia" aria-label="Nvidia logo"><i className="glyph glyph-nvidia" /></span><span className="matrix-pop pop-amazon" aria-label="Amazon logo"><i className="glyph glyph-amazon">a</i></span><span className="matrix-pop pop-google" aria-label="Google logo"><i className="glyph glyph-google">G</i></span><span className="matrix-pop pop-news" aria-label="News headline"><i className="glyph glyph-news" /></span><span className="matrix-pop pop-trump" aria-label="Donald Trump market commentary"><i className="glyph glyph-avatar">DT</i></span><span className="matrix-pop pop-cramer" aria-label="Jim Cramer market commentary"><i className="glyph glyph-avatar">JC</i></span></div><div className="matrix-readout"><span>MARKET DATA STREAM</span><strong>LIVE <i>●</i></strong><small>SPY&nbsp;&nbsp; 5,325.81&nbsp;&nbsp; +0.62%</small><small>PLTR&nbsp; 75.68&nbsp;&nbsp;&nbsp; +1.04%</small><small>WMT&nbsp;&nbsp; 102.06&nbsp; −0.08%</small></div></div>}</section>
}

export function App() {
  const isMobile = useIsMobile()
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, .25], [0, 110])
  const scrollToBottom = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    const start = window.scrollY
    const distance = document.documentElement.scrollHeight - window.innerHeight - start
    const duration = 15000
    const startedAt = performance.now()
    const easeInOut = (progress: number) => progress < .5 ? 4 * progress ** 3 : 1 - Math.pow(-2 * progress + 2, 3) / 2
    const animate = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1)
      window.scrollTo(0, start + distance * easeInOut(progress))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }

  return <main id={TOP_ANCHOR}>
    <div className="noise" />
    <section className="hero">
      <div className="hero-brand"><Brand /></div>
      <div className="hero-copy">
        <motion.h1 initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, ease: [0.16, 1, 0.3, 1] }}>AI financial intelligence<br /><em>platform that never sleeps.</em></motion.h1>
        <Fade delay={.18}><p>StratFolio turns every position into a living thesis—monitoring markets, news, and risk so you always know the next move.</p></Fade>
        <Fade delay={.38} className="trust-row"><span><Check /> multi-brokerage support</span><span><Check /> user-guided agentic workflows</span><span><Check /> custom mcp servers</span></Fade>
      </div>
      <motion.div className="hero-media" style={{ y: heroY }}>
        <div className="orb orb-one" /><div className="orb orb-two" />
        <div className="mobile-screens" aria-label="StratFolio mobile app screens"><div className="mobile-screen screen-one"><img src={asset('m2-screen.png')} alt="StratFolio portfolio plans screen" /></div><div className="mobile-screen screen-two"><img src={asset('desktop/m3.png')} alt="StratFolio position thesis dashboard" /></div><span className="dashboard-glow" /></div>
      </motion.div>
      <div className="hero-qr" aria-label="Install StratFolio demo on iOS or Android"><img src={asset('install-qr.png')} alt="Scan to install the StratFolio mobile app" /><span>INSTALL DEMO<br />ON IOS/ANDROID</span></div>
      <a href={`#${BOTTOM_ANCHOR}`} className="scroll-mark" onClick={scrollToBottom}><span>SCROLL TO EXPLORE</span><i className="scroll-rail" aria-hidden="true"><b /><b /><b /></i></a>
    </section>

    <TradeFlow mobile={isMobile} />

    {isMobile && <DataMatrix mobile />}

    <div className="feature-section-label"><Fade><span className="section-num">03 — NEW ERA OF TRADING</span></Fade></div>

    <section className="feature-grid" id="intelligence">
      <Fade className="feature-card feature-wide">
        <div className="feature-copy"><span className="icon"><BrainCircuit /></span><p className="label">CONTEXT, NOT CHATTER</p><h3>Intelligence that knows your position.</h3><p>Ask a real portfolio question. Get an answer grounded in your contract, catalysts, conviction, and risk—not generic market commentary.</p></div>
        <AppShot src={asset('desktop/m3.png')} alt="StratFolio position-specific AI analysis" />
      </Fade>
      <Fade className="feature-card stat-card" delay={.08}><span className="icon"><ChartNoAxesCombined /></span><p className="label">ONE CLEAR VIEW</p><h3>Every account.<br />One intelligent book.</h3><div className="broker-cloud"><span>Robinhood</span><span>Schwab</span><span>Fidelity</span><span>E*TRADE</span><span>Webull</span><span>IBKR</span></div></Fade>
      <Fade className="feature-card metric-card" delay={.14}><span className="metric">24/7</span><h3>Your thesis never clocks out.</h3><p>Continuous monitoring across price, news, catalysts, and every rule you approve.</p><div className="wave"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div></Fade>
    </section>

    {!isMobile && <DataMatrix />}

    {!isMobile && <section className="film" id="film">
      <div className="film-heading"><Fade><span className="section-num">06 — SEE IT FOR REAL</span><h2>Built to feel alive.<br /><em>Because markets are.</em></h2></Fade><Fade delay={.1}><p>From the first position to the final plan, here is StratFolio working in the browser and in your hand.</p></Fade></div>
      <Fade className="film-frame"><video src={asset('walkthrough.mp4')} autoPlay muted loop playsInline poster={asset('social-preview.png')} /><div className="film-label"><span className="pulse" /> LIVE PRODUCT WALKTHROUGH</div></Fade>
    </section>}

    <section className="final-cta">
      <div className="final-glow" />
      <Fade><span className="kicker">{isMobile ? <><span className="final-kicker-mark"><HorseMark /><span className="final-kicker-mark-trace"><HorseMark /></span></span><span className="final-kicker-label" data-text="THE NEXT MOVE IS YOURS">THE NEXT MOVE IS YOURS</span></> : <><Sparkles size={14} /> THE NEXT MOVE IS YOURS</>}</span><h2>Know what to buy.<br />Know when to buy.<br /><em>Know when to get out.</em></h2></Fade>
      <Fade delay={.12} className="final-install"><InstallCard /></Fade>
    </section>

    <footer id={BOTTOM_ANCHOR}><Brand /><p>{isMobile ? 'AI-native financial intelligence platform.' : 'AI-native trading intelligence, built with intention.'}</p><div>{!isMobile && <a href="https://github.com/toniree/stratfolio-app" target="_blank" rel="noreferrer">GitHub</a>}<span>© 2026 StratFolio</span></div><small>Everything in this demo is simulated. Not investment advice. No orders leave the browser.<span className="footer-trademark">All third-party trademarks (including Google) are property of their respective owners and used for demonstration purposes only.</span></small></footer>
  </main>
}
