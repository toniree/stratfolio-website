import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { ArrowRight, BrainCircuit, ChartNoAxesCombined, Check, Layers3, ShieldCheck, Sparkles, UserRound } from 'lucide-react'
import { useRef } from 'react'

const installUrl = 'https://toniree.github.io/stratfolio-app/'

const Fade = ({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .72, delay, ease: [0.16, 1, 0.3, 1] }}>{children}</motion.div>
)

function Brand() {
  return <a href="#top" className="brand" aria-label="StratFolio home"><img src="/brand-mark.svg" alt="" /><span>Strat<span>Folio</span></span></a>
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
    <img src="/install-qr.png" alt="QR code to install StratFolio" />
    <div><strong>{nav ? <>Install demo<br />on iOS/Android</> : <>Try StratFolio<br />on your mobile today</>}</strong><small><span className="desktop-install">Scan to install</span><span className="mobile-install">Press to install</span> <ArrowRight size={13} /></small></div>
  </motion.a>
}

function AppShot({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return <div className={`phone ${className}`}><div className="phone-speaker" /><img src={src} alt={alt} /></div>
}

function TradeFlow() {
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
      <div className="flow-heading"><span className="section-num">01 — ONE TRADE, EVERYWHERE</span><h2>One clear move.<br /><em>Three connected books.</em></h2><p>Write the trade once. StratFolio routes the intent across every portfolio you manage—then keeps watching after the fill.</p></div>
      <div className="flow-stage">
        <div className="flow-grid" />
        <motion.div className="send-ticket" style={{ opacity: sendOpacity }}><span className="ticket-avatar"><UserRound size={14} /></span><div><small>USER TRADE RULE</small><strong>“trim semis when Kevin Warsh mentions rate hikes”</strong></div></motion.div>
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

function DataMatrix() {
  const cells = Array.from({ length: 64 })
  return <section className="data-matrix"><div className="matrix-copy"><span className="section-num">05 — ALWAYS IN MOTION</span><h2>Markets move.<br /><em>Your plan moves with them.</em></h2><p>Price, news, catalysts, and risk signals flow through one living system—so your portfolio keeps making sense after the trade.</p></div><div className="matrix-visual" aria-hidden="true"><div className="matrix-beam beam-one" /><div className="matrix-beam beam-two" /><div className="matrix-cells">{cells.map((_, i) => <i key={i} style={{ animationDelay: `${(i % 8) * 0.11 + Math.floor(i / 8) * .04}s` }} />)}</div><div className="matrix-pops"><span className="matrix-pop pop-tesla" aria-label="Tesla logo"><i className="glyph glyph-tesla">T</i></span><span className="matrix-pop pop-nvidia" aria-label="Nvidia logo"><i className="glyph glyph-nvidia" /></span><span className="matrix-pop pop-amazon" aria-label="Amazon logo"><i className="glyph glyph-amazon">a</i></span><span className="matrix-pop pop-google" aria-label="Google logo"><i className="glyph glyph-google">G</i></span><span className="matrix-pop pop-news" aria-label="News headline"><i className="glyph glyph-news" /></span><span className="matrix-pop pop-trump" aria-label="Donald Trump market commentary"><i className="glyph glyph-avatar">DT</i></span><span className="matrix-pop pop-cramer" aria-label="Jim Cramer market commentary"><i className="glyph glyph-avatar">JC</i></span></div><div className="matrix-readout"><span>MARKET DATA STREAM</span><strong>LIVE <i>●</i></strong><small>SPY&nbsp;&nbsp; 5,325.81&nbsp;&nbsp; +0.62%</small><small>PLTR&nbsp; 75.68&nbsp;&nbsp;&nbsp; +1.04%</small><small>WMT&nbsp;&nbsp; 102.06&nbsp; −0.08%</small></div></div></section>
}

export function App() {
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

  return <main id="top">
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
        <div className="mobile-screens" aria-label="StratFolio mobile app screens"><div className="mobile-screen screen-one"><img src="/m2-screen.png" alt="StratFolio portfolio plans screen" /></div><div className="mobile-screen screen-two"><img src="/m1-screen.png" alt="StratFolio marketwire screen" /></div><span className="dashboard-glow" /></div>
      </motion.div>
      <div className="hero-qr" aria-label="Install StratFolio demo on iOS or Android"><img src="/install-qr.png" alt="Scan to install the StratFolio mobile app" /><span>INSTALL DEMO<br />ON IOS/ANDROID</span></div>
      <a href="#bottom" className="scroll-mark" onClick={scrollToBottom}><span>SCROLL TO EXPLORE</span><i className="scroll-rail" aria-hidden="true"><b /><b /><b /></i></a>
    </section>

    <TradeFlow />

    <section className="statement">
      <Fade><span className="section-num">01 — THE IDEA</span><h2>Your portfolio tells you <i>what happened.</i><br />StratFolio tells you <em>what to do next.</em></h2></Fade>
    </section>

    <section className="feature-grid" id="intelligence">
      <Fade className="feature-card feature-wide">
        <div className="feature-copy"><span className="icon"><BrainCircuit /></span><p className="label">CONTEXT, NOT CHATTER</p><h3>Intelligence that knows your position.</h3><p>Ask a real portfolio question. Get an answer grounded in your contract, catalysts, conviction, and risk—not generic market commentary.</p><div className="quote">“When should I sell my PLTR calls?”<span>Analyzing 30 contracts · Jan 15 ’27 · $95 call</span></div></div>
        <AppShot src="/thesis-bottom.png" alt="StratFolio position-specific AI analysis" />
      </Fade>
      <Fade className="feature-card stat-card" delay={.08}><span className="icon"><ChartNoAxesCombined /></span><p className="label">ONE CLEAR VIEW</p><h3>Every account.<br />One intelligent book.</h3><div className="broker-cloud"><span>Robinhood</span><span>Schwab</span><span>Fidelity</span><span>E*TRADE</span><span>Webull</span><span>IBKR</span></div></Fade>
      <Fade className="feature-card metric-card" delay={.14}><span className="metric">24/7</span><h3>Your thesis never clocks out.</h3><p>Continuous monitoring across price, news, catalysts, and every rule you approve.</p><div className="wave"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div></Fade>
    </section>

    <section className="plans" id="plans">
      <div className="plans-intro"><Fade><span className="section-num">03 — FROM THESIS TO ACTION</span><h2>Say the rule.<br /><em>StratFolio watches it.</em></h2><p>Write the way you think. StratFolio turns plain English into a monitored, explainable plan that never acts without your authorization.</p></Fade></div>
      <div className="plan-stack">
        <Fade className="rule-card"><span className="rule-index">01</span><div><small>YOU TYPE</small><p>“Trim 50% when PLTR is around $195.”</p></div><span className="status">DRAFT</span></Fade>
        <Fade className="rule-card" delay={.08}><span className="rule-index">02</span><div><small>STRATFOLIO MONITORS</small><p>Price, catalyst, conviction &amp; risk.</p></div><span className="status watching">WATCHING</span></Fade>
        <Fade className="rule-card" delay={.16}><span className="rule-index">03</span><div><small>YOU STAY IN CONTROL</small><p>Review the signal. Authorize the action.</p></div><span className="status ready">READY</span></Fade>
      </div>
    </section>

    <section className="platform" id="platform">
      <Fade><div className="platform-title"><span className="section-num">04 — ENGINEERED TO SCALE</span><h2>A prototype with<br /><em>production bones.</em></h2></div></Fade>
      <div className="platform-grid">
        <Fade className="platform-card"><Layers3 /><h3>Transport-agnostic</h3><p>Typed API boundaries keep every component independent from the data source. Real services are a swap—not a rewrite.</p><code>React · TypeScript · Query · Zustand</code></Fade>
        <Fade className="platform-card" delay={.08}><ShieldCheck /><h3>Human-authorized</h3><p>AI proposes. The investor approves. Execution state is explicit, auditable, and constrained by risk controls.</p><code>draft → watching → ready</code></Fade>
        <Fade className="platform-card architecture" delay={.16}><span>PLATFORM VISION</span><div className="arch-row"><b>Java</b><i /><b>Go</b><i /><b>Python</b><i /><b>AI</b></div><p>Strongly consistent trades, real-time market intelligence, quantitative models, and an agent layer designed for controlled action.</p></Fade>
      </div>
    </section>

    <DataMatrix />

    <section className="film" id="film">
      <div className="film-heading"><Fade><span className="section-num">06 — SEE IT FOR REAL</span><h2>Built to feel alive.<br /><em>Because markets are.</em></h2></Fade><Fade delay={.1}><p>From the first position to the final plan, here is StratFolio working in the browser and in your hand.</p></Fade></div>
      <Fade className="film-frame"><video src="/walkthrough.mp4" autoPlay muted loop playsInline poster="/social-preview.png" /><div className="film-label"><span className="pulse" /> LIVE PRODUCT WALKTHROUGH</div></Fade>
    </section>

    <section className="final-cta">
      <div className="final-glow" />
      <Fade><span className="kicker"><Sparkles size={14} /> THE NEXT MOVE IS YOURS</span><h2>Know what to buy.<br />Know when to buy.<br /><em>Know when to get out.</em></h2></Fade>
      <Fade delay={.12} className="final-install"><InstallCard /></Fade>
    </section>

    <footer id="bottom"><Brand /><p>AI-native trading intelligence, built with intention.</p><div><a href="https://github.com/toniree/stratfolio-app" target="_blank" rel="noreferrer">GitHub</a><span>© 2026 StratFolio</span></div><small>Everything in this demo is simulated. Not investment advice. No orders leave the browser.</small></footer>
  </main>
}
