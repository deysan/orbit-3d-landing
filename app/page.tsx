import AICoreDemo from "@/components/ai-core-demo";

const capabilities = [
  {
    number: "01",
    title: "Shared context",
    description: "Keep task instructions and project knowledge together.",
    icon: "context",
  },
  {
    number: "02",
    title: "Connected tools",
    description: "Bring the tools needed for a workflow into one workspace.",
    icon: "tools",
  },
  {
    number: "03",
    title: "Review checkpoints",
    description: "Check results before treating a task as complete.",
    icon: "review",
  },
];

const workflow = [
  { number: "01", title: "Define", description: "Describe the task and provide its context." },
  { number: "02", title: "Connect", description: "Choose the tools needed for the workflow." },
  { number: "03", title: "Review", description: "Inspect the result and decide what happens next." },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="arrow-icon">
      <path
        d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function OrbitMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 36 36" fill="none" className="orbit-mark">
      <path d="M30 12a13 13 0 1 0-7 18" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 10C-3 14 5 24 19 28s20-2 12-10" stroke="currentColor" strokeWidth="1.5" />
      <path d="m18 12 5 3v6l-5 3-5-3v-6Z" fill="currentColor" />
    </svg>
  );
}

function CapabilityIcon({ type }: { type: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" className="capability-icon">
      {type === "context" ? (
        <>
          <rect x="6" y="5" width="20" height="22" rx="2" />
          <path d="M11 11h10M11 16h10M11 21h6" />
        </>
      ) : type === "tools" ? (
        <>
          <rect x="3" y="12" width="8" height="8" rx="2" />
          <rect x="21" y="3" width="8" height="8" rx="2" />
          <rect x="21" y="21" width="8" height="8" rx="2" />
          <path d="M11 16h5V7h5M16 16v9h5" />
        </>
      ) : (
        <>
          <path d="m16 3 11 5v8c0 6-11 13-11 13S5 22 5 16V8Z" />
          <path d="m11 16 3 3 7-7" />
        </>
      )}
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <header id="top" className="site-header page-width">
        <a href="#top" className="brand" aria-label="ORBIT home">
          <OrbitMark />
          <span>ORBIT</span>
        </a>
        <nav aria-label="Main navigation" className="flex items-center gap-8">
          <a href="#capabilities" className="nav-detail">Capabilities</a>
          <a href="#workflow" className="nav-detail">Workflow</a>
          <a href="#demo" className="nav-demo">Explore the core <Arrow diagonal /></a>
        </nav>
      </header>

      <main id="main">
        <section className="hero page-width" aria-labelledby="hero-title">
          <div className="hero-content">
            <div className="hero-copy">
              <p className="eyebrow"><span className="eyebrow-marker" aria-hidden="true" />AI WORKFLOW SPACE</p>
              <h1 id="hero-title">Your AI workflows.<br /><span className="muted-title">In one <span className="text-orbit-teal">orbit.</span></span></h1>
              <p className="hero-description">Bring context, tools and checks together in one focused workspace for your team.</p>
              <a href="#demo" className="button-primary">Explore the core <Arrow /></a>
              <p className="hero-note">One core. A clearer way to work.</p>
            </div>
            <AICoreDemo />
          </div>
          <div className="hero-footnote">
            <span className="mono-label">CONTEXT / TOOLS / CHECKS</span>
            <a href="#capabilities" className="scroll-link">A closer look <span aria-hidden="true">↓</span></a>
          </div>
        </section>

        <section id="capabilities" className="content-section page-width" aria-labelledby="capabilities-title">
          <div className="section-heading">
            <p className="eyebrow section-index">01 / CAPABILITIES</p>
            <h2 id="capabilities-title">Everything your workflow<br className="desktop-break" /> revolves around.</h2>
          </div>
          <div className="capability-grid grid grid-cols-1 md:grid-cols-3">
            {capabilities.map((capability) => (
              <article className="capability-card" key={capability.number}>
                <div className="flex items-center justify-between">
                  <CapabilityIcon type={capability.icon} />
                  <span className="mono-label card-number">/{capability.number}</span>
                </div>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="workflow" className="content-section workflow-section page-width" aria-labelledby="workflow-title">
          <div className="section-heading">
            <p className="eyebrow section-index">02 / WORKFLOW</p>
            <h2 id="workflow-title">From intention<br />to a checked result.</h2>
          </div>
          <ol className="workflow-list grid grid-cols-1 md:grid-cols-3">
            {workflow.map((step) => (
              <li key={step.number}>
                <span className="step-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="final-cta page-width" aria-labelledby="final-title">
          <p className="eyebrow">FIND YOUR ORBIT</p>
          <h2 id="final-title">Give your next<br />workflow a center.</h2>
          <a href="#demo" className="button-primary">Explore the core <Arrow /></a>
        </section>
      </main>

      <footer className="site-footer page-width">
        <a href="#top" className="brand footer-brand" aria-label="ORBIT — back to top"><OrbitMark /><span>ORBIT</span></a>
        <p>A fictional product. An interactive concept.</p>
        <a href="#top" className="back-to-top">Back to top <span aria-hidden="true">↑</span></a>
      </footer>
    </>
  );
}
