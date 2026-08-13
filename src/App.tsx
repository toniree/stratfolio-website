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

const HORSE_BODY = 'm323 82 34 79c32 32 51 75 51 122v92H144v-39c0-43 17-83 48-113l31-30c-30 11-61 17-93 20l-31 3c-27 3-48-21-43-48 3-16 16-28 32-30l43-7c37-6 70-25 95-54l37-45c13-15 30-26 49-30z'
const HORSE_ZIG = 'm178 350 66-70 41 35 79-67'
const HORSE_ARROW = 'm390 226-17 45-30-35z'

function HorseMark() {
  return <svg className="horse-mark" viewBox="40 40 390 350" aria-hidden="true">
    <path pathLength="1" className="horse-trace horse-trace-soft" d={HORSE_BODY} />
    <path pathLength="1" className="horse-trace" d={HORSE_BODY} />
    <path pathLength="1" className="horse-detail" d={HORSE_ZIG} />
    <path className="horse-arrow" d={HORSE_ARROW} />
  </svg>
}

/* Full brand lockup for the signal-field finale: knight, chessboard
   plinth, and the one-zig market arrow with its filled head. */
function HorseLogoFull() {
  return <svg className="horse-mark" viewBox="40 40 390 390" aria-hidden="true">
    <path className="horse-trace horse-trace-soft" d={HORSE_BODY} />
    <path className="horse-trace" d={HORSE_BODY} />
    <rect className="horse-trace horse-base" x="121" y="375" width="310" height="55" rx="18" />
    <path className="horse-detail" d={HORSE_ZIG} />
    <path className="horse-arrow" d={HORSE_ARROW} />
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

/* ============================================================
   Signal field: the markets-move scene. Company logos, news, and
   headlines are rendered as clouds of dots that hover over rolling
   particle hills; on scroll every dot is blown loose and pulled
   into the StratFolio horse mark. */

const TAU = Math.PI * 2
const smooth = (v: number) => { const c = Math.max(0, Math.min(1, v)); return c * c * (3 - 2 * c) }

const APPLE_PATH = 'M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z'

const GOOGLE_PATHS: Array<[string, string]> = [
  ['#EA4335', 'M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z'],
  ['#4285F4', 'M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z'],
  ['#FBBC05', 'M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z'],
  ['#34A853', 'M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z'],
]

type FieldEmblem = { x: number; y: number; depth: number; step: number; bf: number; bp: number; w: number; h: number; crisp?: boolean; draw: (ctx: CanvasRenderingContext2D) => void }

const FIELD_EMBLEMS: FieldEmblem[] = [
  {
    x: .15, y: .20, depth: 1.1, step: 3, bf: .42, bp: 0.7, w: 150, h: 150,
    draw: ctx => {
      const k = 112 / 1000
      ctx.translate((150 - 814 * k) / 2, 19)
      ctx.scale(k, k)
      ctx.fillStyle = '#e8eef7'
      ctx.fill(new Path2D(APPLE_PATH))
    },
  },
  {
    x: .42, y: .11, depth: .9, step: 3, bf: .5, bp: 2.1, w: 150, h: 150,
    draw: ctx => {
      const k = 112 / 48
      ctx.translate(19, 19)
      ctx.scale(k, k)
      for (const [color, d] of GOOGLE_PATHS) { ctx.fillStyle = color; ctx.fill(new Path2D(d)) }
    },
  },
  {
    x: .73, y: .16, depth: 1.05, step: 3, bf: .38, bp: 4.4, w: 150, h: 150,
    draw: ctx => {
      ctx.strokeStyle = ctx.fillStyle = '#f4f7fd'
      ctx.lineCap = 'round'
      ctx.lineWidth = 12
      ctx.beginPath()
      ctx.arc(75, 134, 86, -Math.PI * .7, -Math.PI * .3)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(67, 55); ctx.lineTo(83, 55); ctx.lineTo(78, 132); ctx.lineTo(72, 132)
      ctx.closePath(); ctx.fill()
    },
  },
  {
    x: .88, y: .40, depth: .8, step: 4, bf: .55, bp: 1.2, w: 120, h: 140,
    draw: ctx => {
      ctx.fillStyle = '#f1e9d2'
      ctx.beginPath(); ctx.roundRect(16, 12, 88, 116, 7); ctx.fill()
      ctx.fillStyle = '#c0524e'; ctx.fillRect(26, 24, 68, 10)
      ctx.fillStyle = '#c9a06a'; ctx.fillRect(72, 46, 22, 22)
      ctx.fillStyle = '#6d6350'
      ctx.fillRect(26, 46, 38, 5); ctx.fillRect(26, 58, 38, 5); ctx.fillRect(26, 78, 68, 5)
      ctx.fillRect(26, 90, 68, 5); ctx.fillRect(26, 102, 68, 5); ctx.fillRect(26, 114, 46, 5)
    },
  },
  {
    x: .12, y: .52, depth: .85, step: 3, bf: .47, bp: 3.3, w: 150, h: 150,
    draw: ctx => {
      ctx.strokeStyle = '#7ad687'
      ctx.lineWidth = 10
      ctx.beginPath(); ctx.ellipse(75, 75, 54, 30, -.16, 0, TAU); ctx.stroke()
      ctx.lineWidth = 8
      ctx.beginPath(); ctx.arc(75, 75, 13, 0, TAU); ctx.stroke()
    },
  },
  {
    x: .68, y: .60, depth: 1, step: 3, bf: .36, bp: 5.5, w: 150, h: 150,
    draw: ctx => {
      ctx.fillStyle = '#f2f6fb'
      ctx.font = '800 116px Manrope,system-ui,sans-serif'
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      ctx.fillText('a', 75, 66)
      ctx.strokeStyle = '#ff9900'
      ctx.lineWidth = 10; ctx.lineCap = 'round'
      ctx.beginPath(); ctx.arc(75, 58, 62, Math.PI * .3, Math.PI * .7); ctx.stroke()
      const ang = Math.PI * .3
      const ax = 75 + Math.cos(ang) * 62, ay = 58 + Math.sin(ang) * 62
      ctx.fillStyle = '#ff9900'
      ctx.beginPath(); ctx.moveTo(ax + 10, ay - 15); ctx.lineTo(ax + 13, ay + 8); ctx.lineTo(ax - 11, ay + 2); ctx.closePath(); ctx.fill()
    },
  },
  {
    x: .38, y: .74, depth: 1, step: 2, bf: .6, bp: 2.8, w: 360, h: 60, crisp: true,
    draw: ctx => {
      ctx.fillStyle = '#9fc4ff'
      ctx.font = '600 36px "DM Mono",monospace'
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      ctx.fillText('FED HOLDS RATES', 180, 30)
    },
  },
  {
    x: .76, y: .78, depth: .95, step: 2, bf: .52, bp: .4, w: 240, h: 60, crisp: true,
    draw: ctx => {
      ctx.fillStyle = '#7de3b3'
      ctx.font = '600 36px "DM Mono",monospace'
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      ctx.fillText('NVDA +3.2%', 120, 30)
    },
  },
]

const FIELD_GLOW = [[125, 183, 255], [223, 243, 255], [169, 146, 255], [255, 255, 255], [99, 195, 255]]
const GROUND_COLORS = [[64, 124, 214], [90, 160, 255], [122, 108, 255], [63, 191, 150]]

type FieldParticle = {
  e: number; lx: number; ly: number
  u: number; v: number
  r: number; g: number; b: number
  gr: number; gg: number; gb: number
  size: number; delay: number
  sx: number; sy: number
  phase: number
}

type GroundDot = {
  u: number; t: number; row: number
  size: number; alpha: number
  r: number; g: number; b: number
  phase: number; liftX: number; liftY: number; delay: number
}

const sampleEmblems = () => {
  const parts: FieldParticle[] = []
  FIELD_EMBLEMS.forEach((spec, e) => {
    const cv = document.createElement('canvas')
    cv.width = spec.w; cv.height = spec.h
    const g2 = cv.getContext('2d')
    if (!g2) return
    spec.draw(g2)
    const data = g2.getImageData(0, 0, spec.w, spec.h).data
    for (let y = 0; y < spec.h; y += spec.step) {
      for (let x = 0; x < spec.w; x += spec.step) {
        const i = (y * spec.w + x) * 4
        if (data[i + 3] < 110) continue
        const glow = FIELD_GLOW[(Math.random() * FIELD_GLOW.length) | 0]
        const a = Math.random() * TAU
        const mag = 50 + Math.random() * 130
        const jit = spec.crisp ? .3 : 1
        parts.push({
          e, lx: x - spec.w / 2 + (Math.random() - .5) * jit, ly: y - spec.h / 2 + (Math.random() - .5) * jit,
          u: 0, v: 0,
          r: data[i], g: data[i + 1], b: data[i + 2],
          gr: glow[0], gg: glow[1], gb: glow[2],
          size: spec.crisp ? 1 + Math.random() * .5 : 1.5 + Math.random() * 1.3,
          delay: .24 + e * .04 + Math.random() * .07,
          sx: Math.cos(a) * mag, sy: Math.sin(a) * mag - 70,
          phase: Math.random() * TAU,
        })
      }
    }
  })
  return parts
}

const sampleHorse = () => {
  const w = 280, h = 280
  const cv = document.createElement('canvas')
  cv.width = w; cv.height = h
  const ctx = cv.getContext('2d')
  const pts: { u: number; v: number }[] = []
  if (!ctx) return pts
  const k = w / 390
  ctx.scale(k, k)
  ctx.translate(-40, -40)
  ctx.strokeStyle = ctx.fillStyle = '#fff'
  ctx.lineJoin = 'round'; ctx.lineCap = 'round'
  ctx.lineWidth = 17
  ctx.stroke(new Path2D(HORSE_BODY))
  ctx.beginPath()
  ctx.roundRect(121, 375, 310, 55, 18)
  ctx.stroke()
  ctx.lineWidth = 22
  ctx.stroke(new Path2D(HORSE_ZIG))
  ctx.fill(new Path2D(HORSE_ARROW))
  const data = ctx.getImageData(0, 0, w, h).data
  for (let y = 0; y < h; y += 3) for (let x = 0; x < w; x += 3) {
    if (data[(y * w + x) * 4 + 3] > 110) pts.push({ u: x / w, v: y / h })
  }
  return pts
}

function SignalField({ progress }: { progress: MotionValue<number> }) {
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const horseRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLSpanElement>(null)
  const readoutRef = useRef<HTMLDivElement>(null)
  const captionRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const stage = stageRef.current, canvas = canvasRef.current, horseEl = horseRef.current
    if (!stage || !canvas || !horseEl) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const narrow = window.matchMedia('(max-width:800px)')
    const amp = reduced ? 0 : 1
    let parts: FieldParticle[] = []
    let ground: GroundDot[] = []
    let W = 0, H = 0, scale = 1
    let horse = { cx: 0, cy: 0, w: 0, h: 0 }
    let raf = 0
    let alive = true
    let pointerX = 0, pointerY = 0, parX = 0, parY = 0
    const ecx: number[] = [], ecy: number[] = []

    const resize = () => {
      const b = stage.getBoundingClientRect()
      W = b.width; H = b.height
      canvas.width = W * dpr; canvas.height = H * dpr
      canvas.style.width = `${W}px`; canvas.style.height = `${H}px`
      scale = Math.max(.55, Math.min(1, Math.min(W / 880, H / 640)))
      const hw = Math.min(W, H) * .58
      // The glyph's visual mass sits right of the viewBox center (the box
      // reserves room for the muzzle), so shift the box left to center it.
      const hoff = hw * .105
      horse = { cx: W * .5 - hoff, cy: H * .45, w: hw, h: hw }
      horseEl.style.width = `${hw}px`
      horseEl.style.height = `${horse.h}px`
      horseEl.style.marginLeft = `${-hw / 2 - hoff}px`
      horseEl.style.marginTop = `${-horse.h / 2}px`
    }

    const build = () => {
      if (!alive) return
      parts = sampleEmblems()
      const targets = sampleHorse()
      for (let i = targets.length - 1; i > 0; i--) {
        const j = (Math.random() * (i + 1)) | 0
        const t = targets[i]; targets[i] = targets[j]; targets[j] = t
      }
      if (targets.length) parts.forEach((p, i) => { const t = targets[i % targets.length]; p.u = t.u; p.v = t.v })
      ground = []
      for (let row = 0; row < 8; row++) {
        const t = row / 7
        const n = 24 + row * 6
        for (let i = 0; i < n; i++) {
          const c = GROUND_COLORS[(Math.random() * GROUND_COLORS.length) | 0]
          ground.push({
            u: (i + Math.random() * .8) / n, t, row,
            size: .9 + t * 1.7, alpha: .14 + t * .3,
            r: c[0], g: c[1], b: c[2],
            phase: Math.random() * TAU,
            liftX: (Math.random() - .5) * 160, liftY: 60 + Math.random() * 140,
            delay: .3 + Math.random() * .2,
          })
        }
      }
    }

    const onPointer = (ev: PointerEvent) => {
      const b = stage.getBoundingClientRect()
      pointerX = ((ev.clientX - b.left) / Math.max(b.width, 1) - .5) * 2
      pointerY = ((ev.clientY - b.top) / Math.max(b.height, 1) - .5) * 2
    }

    const tick = (now: number) => {
      if (!alive) return
      raf = requestAnimationFrame(tick)
      const t = now / 1000
      const p = progress.get()
      parX += (pointerX - parX) * .04
      parY += (pointerY - parY) * .04
      horseEl.style.opacity = String(smooth((p - .8) / .12))
      horseEl.style.transform = `scale(${.9 + .1 * smooth((p - .8) / .15)})`
      if (glowRef.current) glowRef.current.style.opacity = String(.9 * smooth((p - .55) / .37))
      if (readoutRef.current) readoutRef.current.style.opacity = String(1 - smooth((p - .35) / .15))
      if (captionRef.current) {
        const c = smooth((p - .9) / .085)
        captionRef.current.style.opacity = String(c)
        captionRef.current.style.transform = `translateX(-50%) translateY(${(1 - c) * 14}px)`
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, W, H)
      ctx.globalCompositeOperation = 'lighter'
      for (let e = 0; e < FIELD_EMBLEMS.length; e++) {
        const s = FIELD_EMBLEMS[e]
        // Desktop stages are shorter relative to glyph size, so compress the
        // field downward to keep the top row clear of the stage edge.
        const ey = narrow.matches ? s.y : .07 + s.y * .88
        ecx[e] = s.x * W + Math.sin(t * s.bf + s.bp) * 13 * s.depth * amp + parX * 16 * s.depth * amp
        ecy[e] = ey * H + Math.cos(t * s.bf * .8 + s.bp * 1.7) * 9 * s.depth * amp + parY * 12 * s.depth * amp
      }
      const roll = amp ? t : 0
      for (const d of ground) {
        const q = smooth((p - d.delay) / .38)
        if (q >= 1) continue
        const dir = d.row % 2 ? 1 : -1
        const u = (d.u + roll * .006 * dir * (.4 + d.t) + 8) % 1
        const x = u * W + d.liftX * q
        const y = (0.68 + 0.29 * Math.pow(d.t, 1.4)) * H
          + Math.sin(u * TAU * 1.35 + d.row * .8 + roll * .35) * (5 + 11 * d.t)
          - d.liftY * q
        ctx.globalAlpha = d.alpha * (1 - q) * (.75 + .25 * Math.sin(t * 1.3 + d.phase))
        ctx.fillStyle = `rgb(${d.r},${d.g},${d.b})`
        const gs = d.size * (1 - q * .5)
        ctx.fillRect(x - gs / 2, y - gs / 2, gs, gs)
      }
      const endFade = 1 - .8 * smooth((p - .86) / .1)
      for (const pt of parts) {
        const spec = FIELD_EMBLEMS[pt.e]
        const ds = spec.depth
        // Text emblems keep a minimum scale so they stay legible on phones.
        const bs = spec.crisp ? Math.max(scale, .78) : scale
        const hx = ecx[pt.e] + pt.lx * bs * ds
        const hy = ecy[pt.e] + pt.ly * bs * ds
        const q = smooth((p - pt.delay) / .3)
        let x: number, y: number, r: number, g: number, b: number, al: number, size: number
        if (q <= 0) {
          const wob = (spec.crisp ? .35 : 1.6) * amp
          x = hx + Math.sin(t * 1.7 + pt.phase) * wob
          y = hy + Math.cos(t * 1.4 + pt.phase) * wob
          r = pt.r; g = pt.g; b = pt.b
          al = .82 + .18 * Math.sin(t * 2.2 + pt.phase)
          size = pt.size * bs * (.6 + .4 * ds)
        } else {
          const tx = horse.cx - horse.w / 2 + pt.u * horse.w
          const ty = horse.cy - horse.h / 2 + pt.v * horse.h
          const mx = (hx + tx) / 2 + pt.sx * scale
          const my = (hy + ty) / 2 + pt.sy * scale
          const i1x = hx + (mx - hx) * q, i1y = hy + (my - hy) * q
          const i2x = mx + (tx - mx) * q, i2y = my + (ty - my) * q
          r = pt.r + (pt.gr - pt.r) * q
          g = pt.g + (pt.gg - pt.g) * q
          b = pt.b + (pt.gb - pt.b) * q
          size = pt.size * bs * (.6 + .4 * ds) * (1 - .25 * q)
          if (q >= 1) {
            x = tx + Math.sin(t * 2.1 + pt.phase) * 1.2 * amp
            y = ty + Math.cos(t * 1.9 + pt.phase) * 1.2 * amp
            al = .55 + .45 * Math.sin(t * 5 + pt.phase)
          } else {
            x = i1x + (i2x - i1x) * q
            y = i1y + (i2y - i1y) * q
            al = 1
          }
        }
        ctx.globalAlpha = Math.max(0, Math.min(1, al * endFade))
        ctx.fillStyle = `rgb(${r | 0},${g | 0},${b | 0})`
        ctx.fillRect(x - size / 2, y - size / 2, size, size)
      }
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(stage)
    if (document.fonts?.ready) document.fonts.ready.then(() => { if (alive) build() })
    else build()
    window.addEventListener('pointermove', onPointer)
    raf = requestAnimationFrame(tick)
    return () => {
      alive = false
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('pointermove', onPointer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div className="field-stage" ref={stageRef} aria-hidden="true">
    <canvas className="field-canvas" ref={canvasRef} />
    <span className="field-glow" ref={glowRef} style={{ opacity: 0 }} />
    <div className="field-horse" ref={horseRef} style={{ opacity: 0 }}><HorseLogoFull /></div>
    <div className="field-readout" ref={readoutRef}><MachineStream /></div>
    <p className="field-caption" ref={captionRef} style={{ opacity: 0 }}>EVERY SIGNAL — AI GENERATED THESES</p>
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

function DataMatrix() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  return <section className="data-matrix field-section" ref={ref}>
    <div className="field-sticky">
      <div className="matrix-copy"><span className="section-num">02 — PERPETUAL MOTION</span><h2>Markets move.<br /><em>Your plans move with them.</em></h2><p>Price, news, catalysts, and risk signals flow through one living system—a system that evolves alongside your portfolio.</p></div>
      <SignalField progress={scrollYProgress} />
    </div>
  </section>
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

    {isMobile && <DataMatrix />}
    {!isMobile && <DataMatrix />}

    <div className="feature-section-label"><Fade><span className="section-num">03 — NEW ERA OF TRADING</span></Fade></div>

    <section className="feature-grid" id="intelligence">
      <Fade className="feature-card feature-wide">
        <div className="feature-copy"><span className="icon"><BrainCircuit /></span><p className="label">CONTEXT, NOT CHATTER</p><h3>Intelligence that knows your position.</h3><p>Ask a real portfolio question. Get an answer grounded in your contract, catalysts, conviction, and risk—not generic market commentary.</p></div>
        <AppShot src={asset('desktop/m3.png')} alt="StratFolio position-specific AI analysis" />
      </Fade>
      <Fade className="feature-card stat-card" delay={.08}><span className="icon"><ChartNoAxesCombined /></span><p className="label">ONE CLEAR VIEW</p><h3>Every account.<br />One intelligent book.</h3><div className="broker-cloud"><span>Robinhood</span><span>Schwab</span><span>Fidelity</span><span>E*TRADE</span><span>Webull</span><span>IBKR</span></div></Fade>
      <Fade className="feature-card metric-card" delay={.14}><span className="metric">24/7</span><h3>Your thesis never clocks out.</h3><p>Continuous monitoring across price, news, catalysts, and every rule you approve.</p><div className="wave"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div></Fade>
    </section>

    <section className="final-cta">
      <div className="final-glow" />
      <Fade><span className="kicker">{isMobile ? <><span className="final-kicker-mark"><HorseMark /><span className="final-kicker-mark-trace"><HorseMark /></span></span><span className="final-kicker-label" data-text="THE NEXT MOVE IS YOURS">THE NEXT MOVE IS YOURS</span></> : <><Sparkles size={14} /> THE NEXT MOVE IS YOURS</>}</span><h2>Know what to buy.<br />Know when to buy.<br /><em>Know when to get out.</em></h2></Fade>
      <Fade delay={.12} className="final-install"><InstallCard /></Fade>
    </section>

    <footer id={BOTTOM_ANCHOR}><Brand /><p>{isMobile ? 'AI-native financial intelligence platform.' : 'AI-native trading intelligence, built with intention.'}</p><div>{!isMobile && <a href="https://github.com/toniree/stratfolio-app" target="_blank" rel="noreferrer">GitHub</a>}<span>© 2026 StratFolio</span></div><small>Everything in this demo is simulated. Not investment advice. No orders leave the browser.<span className="footer-trademark">All third-party trademarks (including Google) are property of their respective owners and used for demonstration purposes only.</span></small></footer>
  </main>
}
