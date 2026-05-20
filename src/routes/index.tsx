import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  ArrowUpRight,
  Mail,
  Phone,
  Linkedin,
  MapPin,
  Cpu,
  Radio,
  ShieldAlert,
  Pickaxe,
  Lightbulb,
  BarChart3,
  Plus,
} from "lucide-react";
import heroMine from "@/assets/hero-mine.jpg";
import gTruck from "@/assets/gallery-truck.jpg";
import gControl from "@/assets/gallery-control.jpg";
import gDrill from "@/assets/gallery-drill.jpg";
import gPano from "@/assets/gallery-pano.jpg";
import portrait from "@/assets/portrait-placeholder.jpg";

const NAV = [
  ["Perfil", "about"],
  ["Proyectos", "projects"],
  ["Galería", "gallery"],
  ["Formación", "training"],
  ["Skills", "skills"],
  ["Contacto", "contact"],
] as const;

const PROJECTS = [
  {
    n: "001",
    cat: "Autonomía · Equipos Pesados",
    title: "Implementación AHS — Camiones 793F",
    desc: "Despliegue de camiones autónomos en faena de gran minería. Configuración de rutas, zonas de operación y protocolos con flota mixta.",
    year: "2023",
  },
  {
    n: "002",
    cat: "Seguridad Operacional",
    title: "Detección de Fatiga en Operadores",
    desc: "Monitoreo biométrico en tiempo real para equipos de extracción. Reducción del 40% en eventos de fatiga en turno nocturno.",
    year: "2022",
  },
  {
    n: "003",
    cat: "Gestión de Flotas · FMS",
    title: "Dispatch Inteligente — MineStar",
    desc: "Rediseño de algoritmos de despacho para maximizar productividad. KPIs en tiempo real y dashboards operacionales.",
    year: "2022",
  },
  {
    n: "004",
    cat: "Innovación · Desarrollo",
    title: "Módulo de Datos para Perforadora DML",
    desc: "Adquisición MWD e integración con plataforma geológica para correlación automática con el modelo de yacimiento.",
    year: "2021",
  },
  {
    n: "005",
    cat: "Mejora de Producto · TPMS",
    title: "Upgrade TPMS — Flota 48 Camiones 400T",
    desc: "Migración y mejora del monitoreo de presión. Reducción de reventones y +15% en vida útil del neumático.",
    year: "2020",
  },
];

const SKILLS = [
  {
    icon: Cpu,
    name: "Equipos Autónomos",
    items: [
      "Cat Command for Hauling",
      "Komatsu Autonomous Haulage",
      "Rutas y zonas autónomas",
      "Protocolos AHS",
      "Integración flota mixta",
    ],
  },
  {
    icon: Radio,
    name: "Gestión de Flotas",
    items: [
      "Cat MineStar Fleet",
      "Wenco / Leica JIGSAW",
      "Modular DISPATCH",
      "KPIs en tiempo real",
      "Optimización de despacho",
    ],
  },
  {
    icon: ShieldAlert,
    name: "Seguridad Operacional",
    items: [
      "Detección de fatiga (DSS/DMS)",
      "TPMS · presión neumáticos",
      "Collision Avoidance",
      "Proximity Detection",
      "Gestión de riesgos",
    ],
  },
  {
    icon: Pickaxe,
    name: "Perforación",
    items: [
      "Rotativas DML / MD6",
      "MWD",
      "AutoLevel · Terrain Leveler",
      "Modelo geológico 3D",
      "Mallas de perforación",
    ],
  },
  {
    icon: Lightbulb,
    name: "Innovación & Desarrollo",
    items: [
      "Proyectos tecnológicos",
      "Personalización OEM",
      "Lean Mining",
      "Integración de plataformas",
      "Gestión del cambio",
    ],
  },
  {
    icon: BarChart3,
    name: "Datos & Conectividad",
    items: [
      "Redes LTE/5G minera",
      "Telemetría de equipos",
      "Power BI · dashboards",
      "Análisis productivo",
      "IoT industrial",
    ],
  },
];

const TRAINING = [
  {
    year: "2024",
    title: "Advanced Safety Tech in Mining",
    inst: "MineSafe Institute",
    desc: "Sistemas activos de prevención: DSS, proximity, collision avoidance y gestión integrada.",
    badge: "Certificado",
  },
  {
    year: "2023",
    title: "Autonomy & AHS Systems",
    inst: "Komatsu / Caterpillar OEM",
    desc: "Conducción autónoma para minería de gran escala, zonas, protocolos y comisionamiento.",
    badge: "OEM Certified",
  },
  {
    year: "2022",
    title: "Fleet Management Systems",
    inst: "Caterpillar · MineStar",
    desc: "Administración avanzada de FMS, despacho y análisis de productividad en tiempo real.",
    badge: "Advanced",
  },
  {
    year: "2020",
    title: "Ingeniería en Automatización",
    inst: "Universidad — Facultad de Ingeniería",
    desc: "Formación en control de procesos industriales, instrumentación y sistemas autónomos.",
    badge: "Titulado",
  },
];

const GALLERY = [
  { src: heroMine, cap: "Faena nocturna · vista panorámica", area: "a" },
  { src: gTruck, cap: "Camión autónomo · 400T", area: "b" },
  { src: gControl, cap: "Centro de despacho", area: "c" },
  { src: gDrill, cap: "Perforadora blasthole", area: "d" },
  { src: gPano, cap: "Pit · vista panorámica", area: "e" },
];

/* ────────────────────────────────────────────────────────────── */

function Index() {
  return (
    <div className="mt-bg">
      <Style />
      <Nav />
      <Hero />
      <About />
      <Projects />
      <Gallery />
      <Training />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}

/* ── Nav ─────────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`mt-nav ${scrolled ? "mt-nav--scrolled" : ""}`}
      aria-label="Principal"
    >
      <a href="#top" className="mt-logo">
        MINE<span>.TECH</span>
      </a>
      <ul className="mt-nav-list">
        {NAV.map(([label, id]) => (
          <li key={id}>
            <a href={`#${id}`}>{label}</a>
          </li>
        ))}
      </ul>
      <div className="mt-status">
        <span className="mt-dot" />
        <span>Disponible</span>
      </div>
    </nav>
  );
}

/* ── Hero ────────────────────────────────────────────────────── */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="top" ref={ref} className="mt-hero">
      <motion.div className="mt-hero-bg" style={{ y, opacity }}>
        <img
          src={heroMine}
          alt="Vista nocturna de una mina a tajo abierto"
          width={1920}
          height={1280}
        />
        <div className="mt-hero-grad" />
        <div className="mt-grid" />
      </motion.div>

      <div className="mt-hero-split">
        <motion.div
          className="mt-hero-content"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mt-eyebrow">
            <span className="mt-mark" />
            Portafolio · Tecnología Minera · 2025
          </div>
          <h1 className="mt-h1">
            <span>Construyo</span>
            <span className="mt-outline">la minería</span>
            <span>autónoma.</span>
          </h1>
          <p className="mt-hero-sub">
            Especialista en equipos autónomos, gestión de flotas y seguridad
            operacional para faenas de gran minería.
          </p>
          <div className="mt-hero-cta">
            <a href="#projects" className="mt-btn mt-btn--primary">
              Ver proyectos <ArrowUpRight size={16} />
            </a>
            <a href="#contact" className="mt-btn mt-btn--ghost">
              Contactar
            </a>
          </div>

          <div className="mt-hero-stats">
            {[
              ["12+", "años en faena"],
              ["8", "operaciones"],
              ["40%", "reducción de incidentes"],
              ["AHS · FMS", "stack principal"],
            ].map(([k, v]) => (
              <div key={v} className="mt-stat">
                <div className="mt-stat-k">{k}</div>
                <div className="mt-stat-v">{v}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-hero-photo"
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mt-photo-frame">
            <img
              src={portrait}
              alt="Foto de perfil"
              width={896}
              height={1280}
            />
            <div className="mt-photo-grain" />
            <div className="mt-photo-tag">
              <span className="mt-mark" />
              Tu foto · reemplazar
            </div>
            <div className="mt-photo-meta">
              <div>
                <div className="k">Nombre</div>
                <div className="v">Tu Nombre</div>
              </div>
              <div>
                <div className="k">Rol</div>
                <div className="v">Mining Tech Specialist</div>
              </div>
            </div>
          </div>
          <div className="mt-photo-corner mt-photo-corner--tl" />
          <div className="mt-photo-corner mt-photo-corner--br" />
        </motion.div>
      </div>

      <div className="mt-scroll-hint">
        <div className="mt-scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  );
}

/* ── About ───────────────────────────────────────────────────── */
function About() {
  return (
    <Section id="about" idx="01" label="Perfil">
      <SectionHeading head="Acerca" dim="de mí" />
      <div className="mt-about">
        <div className="mt-about-text">
          <p>
            Profesional especializado en la intersección de{" "}
            <em>tecnología y operaciones mineras</em>. Implemento y optimizo
            sistemas para perforadoras, camiones autónomos de alto tonelaje y
            flotas de extracción en faenas de clase mundial.
          </p>
          <p>
            Mi trabajo abarca el diseño de <em>sistemas de seguridad</em> y la{" "}
            <em>gestión integral de flotas</em>, con enfoque en innovación
            continua y personalización de soluciones tecnológicas para entornos
            de alta exigencia.
          </p>
          <p>
            He liderado proyectos de transformación digital que aumentan la
            eficiencia operativa y reducen significativamente los índices de
            incidentes a gran escala.
          </p>
          <div className="mt-tags">
            {[
              "Camiones Autónomos",
              "Perforadoras",
              "Gestión de Flotas",
              "Seguridad",
              "AHS / FMS",
              "Dispatch",
              "Mejora Continua",
            ].map((t) => (
              <span key={t} className="mt-tag">
                {t}
              </span>
            ))}
          </div>
        </div>

        <aside className="mt-about-card">
          <div className="mt-card-grid" />
          <div className="mt-card-inner">
            <div className="mt-card-eyebrow">PROFILE / META</div>
            <h3>Operador de Innovación Minera</h3>
            <dl>
              {[
                ["Empresa", "Tu empresa actual"],
                ["Cargo", "Especialista en Tecnología Minera"],
                ["Ubicación", "Antofagasta, Chile"],
                ["Experiencia", "12+ años"],
                ["LinkedIn", "linkedin.com/in/tu-perfil"],
              ].map(([k, v]) => (
                <div key={k} className="mt-row">
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>
    </Section>
  );
}

/* ── Projects ────────────────────────────────────────────────── */
function Projects() {
  return (
    <Section id="projects" idx="02" label="Proyectos" tone="deep">
      <SectionHeading head="Trabajo" dim="realizado" />
      <div className="mt-projects">
        {PROJECTS.map((p, i) => (
          <motion.a
            key={p.n}
            href="#contact"
            className="mt-project"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: i * 0.06 }}
          >
            <div className="mt-project-num">{p.n}</div>
            <div className="mt-project-body">
              <div className="mt-project-cat">{p.cat}</div>
              <h3 className="mt-project-title">{p.title}</h3>
              <p className="mt-project-desc">{p.desc}</p>
            </div>
            <div className="mt-project-right">
              <div className="mt-project-year">{p.year}</div>
              <div className="mt-project-arrow">
                <ArrowUpRight size={18} />
              </div>
            </div>
          </motion.a>
        ))}
        <button className="mt-add">
          <Plus size={16} />
          <span>Agregar proyecto</span>
        </button>
      </div>
    </Section>
  );
}

/* ── Gallery ─────────────────────────────────────────────────── */
function Gallery() {
  return (
    <Section id="gallery" idx="03" label="Galería" wide>
      <SectionHeading head="En" dim="terreno" />
      <div className="mt-gallery">
        {GALLERY.map((g) => (
          <figure key={g.cap} className={`mt-g mt-g--${g.area}`}>
            <img src={g.src} alt={g.cap} loading="lazy" />
            <figcaption>{g.cap}</figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

/* ── Training ────────────────────────────────────────────────── */
function Training() {
  return (
    <Section id="training" idx="04" label="Formación" tone="deep">
      <SectionHeading head="Formación" dim="& certificaciones" />
      <div className="mt-training">
        {TRAINING.map((t, i) => (
          <motion.article
            key={t.title}
            className="mt-t"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          >
            <div className="mt-t-year">{t.year}</div>
            <h3 className="mt-t-title">{t.title}</h3>
            <div className="mt-t-inst">{t.inst}</div>
            <p className="mt-t-desc">{t.desc}</p>
            <span className="mt-t-badge">{t.badge}</span>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

/* ── Skills ──────────────────────────────────────────────────── */
function Skills() {
  return (
    <Section id="skills" idx="05" label="Competencias">
      <SectionHeading head="Stack" dim="técnico" />
      <div className="mt-skills">
        {SKILLS.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.name}
              className="mt-sk"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <div className="mt-sk-num">0{i + 1}</div>
              <div className="mt-sk-icon">
                <Icon size={20} />
              </div>
              <h3>{s.name}</h3>
              <ul>
                {s.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

/* ── Contact ─────────────────────────────────────────────────── */
function Contact() {
  return (
    <Section id="contact" idx="06" label="Contacto" tone="deep">
      <div className="mt-contact">
        <div>
          <h2 className="mt-contact-h">
            Hablemos
            <br />
            <em>de tu</em> proyecto.
          </h2>
          <div className="mt-c-list">
            {[
              [Mail, "Email", "tu.email@dominio.com"],
              [Phone, "Teléfono / WhatsApp", "+56 9 0000 0000"],
              [Linkedin, "LinkedIn", "linkedin.com/in/tu-perfil"],
              [MapPin, "Disponibilidad", "Faenas · Consulting · Remoto"],
            ].map(([Icon, label, val]) => {
              const I = Icon as typeof Mail;
              return (
                <div key={label as string} className="mt-c-item">
                  <I size={16} />
                  <div>
                    <div className="mt-c-lbl">{label as string}</div>
                    <div className="mt-c-val">{val as string}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <form className="mt-form" onSubmit={(e) => e.preventDefault()}>
          <Field label="Nombre" placeholder="Nombre completo" />
          <Field label="Email" placeholder="correo@empresa.com" type="email" />
          <Field label="Asunto" placeholder="Proyecto / Consultoría / Otro" />
          <Field label="Mensaje" placeholder="Cuéntame tu proyecto..." textarea />
          <button className="mt-btn mt-btn--primary" type="submit">
            Enviar mensaje <ArrowUpRight size={16} />
          </button>
        </form>
      </div>
    </Section>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
  textarea = false,
}: {
  label: string;
  placeholder: string;
  type?: string;
  textarea?: boolean;
}) {
  return (
    <label className="mt-field">
      <span>{label}</span>
      {textarea ? (
        <textarea placeholder={placeholder} rows={5} />
      ) : (
        <input type={type} placeholder={placeholder} />
      )}
    </label>
  );
}

/* ── Footer ──────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="mt-footer">
      <div className="mt-logo">
        MINE<span>.TECH</span>
      </div>
      <div className="mt-copy">
        © {new Date().getFullYear()} · Portafolio en Tecnología Minera
      </div>
    </footer>
  );
}

/* ── Generic Section ─────────────────────────────────────────── */
function Section({
  id,
  idx,
  label,
  tone,
  wide,
  children,
}: {
  id: string;
  idx: string;
  label: string;
  tone?: "deep";
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`mt-sec ${tone === "deep" ? "mt-sec--deep" : ""} ${
        wide ? "mt-sec--wide" : ""
      }`}
    >
      <div className="mt-sec-label">
        <span>{idx}</span>
        {label}
      </div>
      {children}
    </section>
  );
}

function SectionHeading({ head, dim }: { head: string; dim: string }) {
  return (
    <h2 className="mt-h2">
      {head} <span className="mt-dim">{dim}</span>
    </h2>
  );
}

/* ── Inline scoped styles ────────────────────────────────────── */
function Style() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Inter:wght@200;300;400&display=swap');

      .mt-bg {
        --bg: #050608;
        --bg-deep: #08090d;
        --surface: #0c0e13;
        --line: rgba(120,200,255,.08);
        --line-strong: rgba(120,200,255,.18);
        --cyan: #5ee3ff;
        --cyan-soft: rgba(94,227,255,.55);
        --text: #e8f0f7;
        --muted: #6b7a8c;
        --muted-2: #98a6b7;
        background: var(--bg);
        color: var(--text);
        font-family: 'Inter', system-ui, sans-serif;
        font-weight: 200;
        letter-spacing: -0.005em;
        min-height: 100vh;
        overflow-x: hidden;
      }
      .mt-bg * { box-sizing: border-box; }

      /* NAV */
      .mt-nav {
        position: fixed; inset: 0 0 auto 0; z-index: 80;
        display: flex; align-items: center; justify-content: space-between;
        padding: 1.1rem 2rem;
        transition: background .35s ease, backdrop-filter .35s ease, border-color .35s ease, padding .25s;
        border-bottom: 1px solid transparent;
      }
      .mt-nav--scrolled {
        background: rgba(5,6,8,.65);
        backdrop-filter: blur(20px) saturate(160%);
        -webkit-backdrop-filter: blur(20px) saturate(160%);
        border-bottom-color: var(--line);
        padding: .8rem 2rem;
      }
      .mt-logo {
        font-family: 'Syne', sans-serif; font-weight: 500;
        font-size: .92rem; letter-spacing: .22em; text-transform: uppercase;
        color: var(--text); text-decoration: none;
      }
      .mt-logo span { color: var(--cyan); }
      .mt-nav-list { display: flex; gap: 2rem; list-style: none; padding: 0; margin: 0; }
      .mt-nav-list a {
        font-family: 'JetBrains Mono', monospace; font-size: .72rem;
        letter-spacing: .12em; text-transform: uppercase;
        color: var(--muted); text-decoration: none;
        transition: color .2s;
      }
      .mt-nav-list a:hover { color: var(--cyan); }
      .mt-status {
        display: flex; align-items: center; gap: .55rem;
        font-family: 'JetBrains Mono', monospace; font-size: .68rem;
        letter-spacing: .14em; color: var(--muted-2);
        padding: .45rem .75rem;
        border: 1px solid var(--line); border-radius: 999px;
        background: rgba(94,227,255,.04);
      }
      .mt-dot {
        width: 7px; height: 7px; border-radius: 50%;
        background: var(--cyan); box-shadow: 0 0 10px 2px rgba(94,227,255,.6);
        animation: mt-pulse 2.4s ease infinite;
      }
      @keyframes mt-pulse { 0%,100%{opacity:1} 50%{opacity:.4} }

      @media (max-width: 820px) { .mt-nav-list { display:none } }

      /* HERO */
      .mt-hero {
        position: relative; min-height: 100vh;
        display: flex; align-items: center; justify-content: center;
        padding: 8rem 2rem 4rem;
        overflow: hidden;
      }
      .mt-hero-bg {
        position: absolute; inset: 0; z-index: 0; pointer-events: none;
      }
      .mt-hero-bg img {
        width: 100%; height: 100%; object-fit: cover;
        filter: brightness(.55) saturate(1.1) contrast(1.05);
      }
      .mt-hero-grad {
        position: absolute; inset: 0;
        background:
          radial-gradient(60% 60% at 50% 30%, rgba(94,227,255,.12), transparent 70%),
          linear-gradient(180deg, rgba(5,6,8,.4) 0%, rgba(5,6,8,.85) 70%, var(--bg) 100%);
      }
      .mt-grid {
        position: absolute; inset: 0;
        background-image:
          linear-gradient(to right, rgba(94,227,255,.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(94,227,255,.05) 1px, transparent 1px);
        background-size: 64px 64px;
        mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
      }
      .mt-hero-split {
        position: relative; z-index: 1;
        width: 100%; max-width: 1280px;
        display: grid; grid-template-columns: 1.15fr .85fr;
        gap: 4rem; align-items: center;
      }
      @media (max-width: 960px) {
        .mt-hero-split { grid-template-columns: 1fr; gap: 3rem; }
      }
      .mt-hero-content {
        display: flex; flex-direction: column; gap: 1.4rem;
      }
      .mt-eyebrow {
        display: inline-flex; align-items: center; gap: .7rem;
        font-family: 'JetBrains Mono', monospace; font-size: .7rem;
        letter-spacing: .18em; text-transform: uppercase;
        color: var(--cyan-soft);
        align-self: flex-start;
        padding: .45rem .8rem;
        border: 1px solid var(--line-strong);
        border-radius: 999px;
        background: rgba(94,227,255,.04);
        backdrop-filter: blur(8px);
      }
      .mt-mark {
        width: 6px; height: 6px; background: var(--cyan); border-radius: 50%;
        box-shadow: 0 0 8px var(--cyan);
      }
      .mt-h1 {
        font-family: 'Syne', sans-serif; font-weight: 500;
        font-size: clamp(2.6rem, 5.6vw, 5.4rem);
        line-height: .95; letter-spacing: -0.035em;
        margin: 0;
        display: flex; flex-direction: column; gap: .15rem;
      }

      /* Hero photo card */
      .mt-hero-photo {
        position: relative; justify-self: center;
        width: 100%; max-width: 420px;
      }
      .mt-photo-frame {
        position: relative; aspect-ratio: 4/5;
        border-radius: 18px; overflow: hidden;
        border: 1px solid var(--line-strong);
        background: var(--surface);
        box-shadow: 0 40px 80px -30px rgba(94,227,255,.25), 0 0 0 1px rgba(94,227,255,.05) inset;
      }
      .mt-photo-frame img {
        width: 100%; height: 100%; object-fit: cover;
        filter: brightness(.92) saturate(1.05) contrast(1.02);
      }
      .mt-photo-grain {
        position: absolute; inset: 0; pointer-events: none;
        background:
          linear-gradient(180deg, transparent 55%, rgba(5,6,8,.85) 100%),
          radial-gradient(ellipse at top right, rgba(94,227,255,.18), transparent 60%);
        mix-blend-mode: normal;
      }
      .mt-photo-tag {
        position: absolute; top: 1rem; left: 1rem;
        display: inline-flex; align-items: center; gap: .55rem;
        font-family: 'JetBrains Mono', monospace; font-size: .58rem;
        letter-spacing: .18em; text-transform: uppercase;
        color: var(--cyan);
        padding: .4rem .7rem; border-radius: 999px;
        background: rgba(5,6,8,.6);
        border: 1px solid var(--line-strong);
        backdrop-filter: blur(8px);
      }
      .mt-photo-meta {
        position: absolute; left: 1rem; right: 1rem; bottom: 1rem;
        display: flex; gap: 1.2rem; padding: .9rem 1rem;
        background: rgba(5,6,8,.55); border: 1px solid var(--line);
        border-radius: 12px; backdrop-filter: blur(10px);
      }
      .mt-photo-meta .k {
        font-family: 'JetBrains Mono', monospace; font-size: .56rem;
        letter-spacing: .18em; text-transform: uppercase; color: var(--muted);
      }
      .mt-photo-meta .v {
        font-family: 'Syne', sans-serif; font-size: .9rem; color: #fff; margin-top: .2rem;
      }
      .mt-photo-corner {
        position: absolute; width: 36px; height: 36px;
        border: 1px solid var(--cyan); opacity: .8; pointer-events: none;
      }
      .mt-photo-corner--tl { top: -8px; left: -8px; border-right: none; border-bottom: none; }
      .mt-photo-corner--br { bottom: -8px; right: -8px; border-left: none; border-top: none; }

      .mt-h1 .mt-outline {
        -webkit-text-stroke: 1.2px var(--cyan);
        color: transparent;
        font-style: italic;
      }
      .mt-hero-sub {
        font-size: clamp(1rem, 1.4vw, 1.2rem);
        line-height: 1.6; max-width: 540px;
        color: var(--muted-2); margin: 0;
      }
      .mt-hero-cta { display: flex; gap: .9rem; flex-wrap: wrap; margin-top: .4rem; }
      .mt-btn {
        display: inline-flex; align-items: center; gap: .55rem;
        font-family: 'JetBrains Mono', monospace; font-size: .72rem;
        letter-spacing: .14em; text-transform: uppercase;
        padding: .95rem 1.6rem;
        border: 1px solid transparent;
        text-decoration: none; cursor: pointer;
        border-radius: 999px;
        transition: transform .2s, background .2s, color .2s, box-shadow .2s, border-color .2s;
      }
      .mt-btn--primary {
        background: var(--cyan); color: #00131a;
        box-shadow: 0 8px 32px -8px rgba(94,227,255,.55);
      }
      .mt-btn--primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 14px 40px -8px rgba(94,227,255,.8);
      }
      .mt-btn--ghost {
        color: var(--text);
        border-color: var(--line-strong);
        background: rgba(255,255,255,.02);
        backdrop-filter: blur(8px);
      }
      .mt-btn--ghost:hover { border-color: var(--cyan); color: var(--cyan); }

      .mt-hero-stats {
        margin-top: 2.5rem;
        display: grid; grid-template-columns: repeat(4, 1fr);
        gap: 0;
        border-top: 1px solid var(--line);
        padding-top: 1.25rem;
      }
      .mt-stat { padding: 0 1rem; border-left: 1px solid var(--line); }
      .mt-stat:first-child { border-left: none; padding-left: 0; }
      .mt-stat-k {
        font-family: 'Syne', sans-serif; font-weight: 500;
        font-size: clamp(1.4rem, 2.2vw, 1.9rem); color: #fff;
        letter-spacing: -0.02em;
      }
      .mt-stat-v {
        font-family: 'JetBrains Mono', monospace; font-size: .65rem;
        letter-spacing: .15em; text-transform: uppercase;
        color: var(--muted); margin-top: .3rem;
      }
      @media (max-width: 720px) {
        .mt-hero-stats { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        .mt-stat { border-left: none; padding-left: 0; }
      }

      .mt-scroll-hint {
        position: absolute; bottom: 1.6rem; left: 50%; transform: translateX(-50%);
        z-index: 2; display: flex; flex-direction: column; align-items: center; gap: .5rem;
      }
      .mt-scroll-line {
        width: 1px; height: 50px;
        background: linear-gradient(to bottom, var(--cyan), transparent);
        animation: mt-scroll 2s ease infinite;
      }
      .mt-scroll-hint span {
        font-family: 'JetBrains Mono', monospace; font-size: .56rem;
        letter-spacing: .22em; text-transform: uppercase; color: var(--muted);
      }
      @keyframes mt-scroll { 0%,100%{opacity:.3;transform:scaleY(.5)} 50%{opacity:1;transform:scaleY(1)} }

      /* SECTIONS */
      .mt-sec {
        position: relative;
        padding: 8rem 2rem;
        max-width: 1280px; margin: 0 auto;
      }
      .mt-sec--deep { background: linear-gradient(180deg, transparent, var(--bg-deep) 8%, var(--bg-deep) 92%, transparent); max-width: none; }
      .mt-sec--deep > * { max-width: 1280px; margin-left: auto; margin-right: auto; }
      .mt-sec--wide { max-width: none; padding-left: 0; padding-right: 0; }
      .mt-sec--wide .mt-sec-label,
      .mt-sec--wide .mt-h2 { padding-left: 2rem; padding-right: 2rem; max-width: 1280px; margin-left: auto; margin-right: auto; }

      .mt-sec-label {
        display: flex; align-items: center; gap: .8rem;
        font-family: 'JetBrains Mono', monospace; font-size: .68rem;
        letter-spacing: .22em; text-transform: uppercase; color: var(--cyan);
        margin-bottom: 1.25rem;
      }
      .mt-sec-label span { color: var(--muted); }
      .mt-sec-label::after {
        content: ''; flex: 0 0 40px; height: 1px; background: linear-gradient(to right, var(--cyan), transparent);
      }

      .mt-h2 {
        font-family: 'Syne', sans-serif; font-weight: 500;
        font-size: clamp(2.2rem, 5vw, 4.5rem); line-height: .95;
        letter-spacing: -0.03em; color: #fff;
        margin: 0 0 3.5rem;
      }
      .mt-dim { color: rgba(232,240,247,.18); font-style: italic; font-weight: 400; }

      /* ABOUT */
      .mt-about {
        display: grid; grid-template-columns: 1.2fr 1fr; gap: 4rem;
        align-items: start;
      }
      .mt-about-text p {
        font-size: 1rem; line-height: 1.85; color: var(--muted-2);
        margin: 0 0 1.1rem; max-width: 580px;
      }
      .mt-about-text em { color: var(--cyan); font-style: normal; font-weight: 400; }
      .mt-tags { display: flex; flex-wrap: wrap; gap: .5rem; margin-top: 1.6rem; }
      .mt-tag {
        font-family: 'JetBrains Mono', monospace; font-size: .66rem;
        letter-spacing: .12em; text-transform: uppercase;
        padding: .4rem .85rem; border-radius: 999px;
        border: 1px solid var(--line-strong);
        color: var(--cyan-soft);
        background: rgba(94,227,255,.04);
        transition: border-color .2s, color .2s, transform .2s;
      }
      .mt-tag:hover { color: var(--cyan); border-color: var(--cyan); transform: translateY(-1px); }

      .mt-about-card {
        position: relative;
        border: 1px solid var(--line-strong);
        border-radius: 18px;
        padding: 2rem;
        background: linear-gradient(160deg, rgba(94,227,255,.05), rgba(94,227,255,0) 60%), var(--surface);
        overflow: hidden;
      }
      .mt-card-grid {
        position: absolute; inset: 0; opacity: .35;
        background-image:
          linear-gradient(to right, rgba(94,227,255,.06) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(94,227,255,.06) 1px, transparent 1px);
        background-size: 28px 28px;
        mask-image: radial-gradient(ellipse at top, black, transparent 80%);
      }
      .mt-card-inner { position: relative; }
      .mt-card-eyebrow {
        font-family: 'JetBrains Mono', monospace; font-size: .6rem;
        letter-spacing: .22em; color: var(--cyan); margin-bottom: 1rem;
      }
      .mt-card-inner h3 {
        font-family: 'Syne', sans-serif; font-weight: 500;
        font-size: 1.5rem; color: #fff; line-height: 1.2;
        letter-spacing: -.02em; margin: 0 0 1.5rem;
      }
      .mt-row {
        display: grid; grid-template-columns: 120px 1fr; gap: 1rem;
        padding: .9rem 0; border-top: 1px solid var(--line); align-items: baseline;
      }
      .mt-row dt {
        font-family: 'JetBrains Mono', monospace; font-size: .65rem;
        letter-spacing: .12em; color: var(--muted); text-transform: uppercase;
      }
      .mt-row dd { margin: 0; font-size: .9rem; color: var(--text); }

      @media (max-width: 900px) { .mt-about { grid-template-columns: 1fr; gap: 3rem; } }

      /* PROJECTS */
      .mt-projects { display: flex; flex-direction: column; }
      .mt-project {
        display: grid; grid-template-columns: 80px 1fr auto;
        gap: 2rem; align-items: center;
        padding: 2rem 1.2rem;
        border-top: 1px solid var(--line);
        text-decoration: none; color: inherit;
        position: relative; overflow: hidden;
        transition: padding-left .35s, background .35s;
      }
      .mt-project:last-of-type { border-bottom: 1px solid var(--line); }
      .mt-project::before {
        content: ''; position: absolute; inset: 0;
        background: linear-gradient(90deg, rgba(94,227,255,.07), transparent 70%);
        transform: translateX(-100%); transition: transform .5s ease;
      }
      .mt-project:hover { padding-left: 2.2rem; }
      .mt-project:hover::before { transform: translateX(0); }
      .mt-project-num {
        font-family: 'JetBrains Mono', monospace; font-size: .8rem;
        color: var(--muted); letter-spacing: .12em; position: relative;
      }
      .mt-project-body { position: relative; display: flex; flex-direction: column; gap: .5rem; }
      .mt-project-cat {
        font-family: 'JetBrains Mono', monospace; font-size: .6rem;
        letter-spacing: .22em; text-transform: uppercase; color: var(--cyan);
      }
      .mt-project-title {
        font-family: 'Syne', sans-serif; font-weight: 500;
        font-size: 1.4rem; color: #fff; letter-spacing: -.01em; margin: 0;
        transition: color .2s;
      }
      .mt-project:hover .mt-project-title { color: var(--cyan); }
      .mt-project-desc {
        font-size: .88rem; color: var(--muted-2); line-height: 1.65;
        max-width: 620px; margin: 0;
      }
      .mt-project-right {
        position: relative; display: flex; flex-direction: column;
        align-items: flex-end; gap: .8rem;
      }
      .mt-project-year {
        font-family: 'JetBrains Mono', monospace; font-size: .7rem;
        color: var(--muted); letter-spacing: .12em;
      }
      .mt-project-arrow {
        width: 38px; height: 38px; border-radius: 50%;
        border: 1px solid var(--line-strong);
        display: flex; align-items: center; justify-content: center;
        color: var(--cyan);
        transition: background .25s, border-color .25s, transform .25s;
      }
      .mt-project:hover .mt-project-arrow {
        background: var(--cyan); color: #00131a;
        border-color: var(--cyan); transform: rotate(-45deg) scale(1.05);
      }
      .mt-add {
        display: flex; align-items: center; gap: .7rem;
        padding: 1.8rem 1.2rem;
        background: transparent;
        border: none; border-top: 1px dashed rgba(94,227,255,.18);
        color: var(--muted); cursor: pointer; width: 100%;
        font-family: 'JetBrains Mono', monospace; font-size: .68rem;
        letter-spacing: .18em; text-transform: uppercase;
        transition: color .2s, background .2s;
      }
      .mt-add:hover { color: var(--cyan); background: rgba(94,227,255,.03); }

      @media (max-width: 720px) {
        .mt-project { grid-template-columns: 50px 1fr; }
        .mt-project-right { grid-column: 1 / -1; flex-direction: row; align-items: center; justify-content: space-between; }
      }

      /* GALLERY */
      .mt-gallery {
        display: grid; grid-template-columns: repeat(12, 1fr);
        grid-auto-rows: 220px;
        gap: 6px;
        padding: 0 2rem;
        max-width: 1400px; margin: 0 auto;
      }
      .mt-g {
        position: relative; overflow: hidden;
        border-radius: 14px; margin: 0;
        border: 1px solid var(--line);
        background: var(--surface);
      }
      .mt-g img {
        width: 100%; height: 100%; object-fit: cover;
        filter: brightness(.7) saturate(1.05);
        transition: transform .8s ease, filter .5s;
      }
      .mt-g:hover img { transform: scale(1.05); filter: brightness(.95) saturate(1.2); }
      .mt-g figcaption {
        position: absolute; left: 0; right: 0; bottom: 0;
        padding: 1.4rem 1.2rem .9rem;
        background: linear-gradient(to top, rgba(5,6,8,.9), transparent);
        font-family: 'JetBrains Mono', monospace; font-size: .62rem;
        letter-spacing: .14em; color: var(--cyan);
        text-transform: uppercase;
        opacity: 0; transform: translateY(8px);
        transition: opacity .35s, transform .35s;
      }
      .mt-g:hover figcaption { opacity: 1; transform: translateY(0); }
      .mt-g--a { grid-column: span 7; grid-row: span 2; }
      .mt-g--b { grid-column: span 5; grid-row: span 1; }
      .mt-g--c { grid-column: span 5; grid-row: span 1; }
      .mt-g--d { grid-column: span 4; grid-row: span 2; }
      .mt-g--e { grid-column: span 8; grid-row: span 2; }
      @media (max-width: 800px) {
        .mt-gallery { grid-template-columns: 1fr 1fr; padding: 0 1rem; }
        .mt-g--a, .mt-g--b, .mt-g--c, .mt-g--d, .mt-g--e { grid-column: span 2; grid-row: span 1; }
      }

      /* TRAINING */
      .mt-training {
        display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;
      }
      .mt-t {
        padding: 2rem;
        border: 1px solid var(--line);
        border-radius: 16px;
        background: linear-gradient(160deg, var(--surface), transparent);
        position: relative; overflow: hidden;
        transition: border-color .3s, transform .3s, background .3s;
      }
      .mt-t::after {
        content: ''; position: absolute; bottom: 0; left: 0; right: 0;
        height: 1px; background: linear-gradient(90deg, var(--cyan), transparent);
        transform: scaleX(0); transform-origin: left; transition: transform .5s;
      }
      .mt-t:hover { border-color: var(--line-strong); transform: translateY(-3px); }
      .mt-t:hover::after { transform: scaleX(1); }
      .mt-t-year {
        font-family: 'JetBrains Mono', monospace; font-size: .68rem;
        letter-spacing: .16em; color: var(--cyan); margin-bottom: .9rem;
      }
      .mt-t-title {
        font-family: 'Syne', sans-serif; font-weight: 500;
        font-size: 1.2rem; color: #fff; margin: 0 0 .35rem;
      }
      .mt-t-inst {
        font-family: 'JetBrains Mono', monospace; font-size: .65rem;
        letter-spacing: .08em; color: var(--cyan-soft); margin-bottom: .9rem;
      }
      .mt-t-desc { font-size: .88rem; line-height: 1.65; color: var(--muted-2); margin: 0 0 1.1rem; }
      .mt-t-badge {
        display: inline-block;
        font-family: 'JetBrains Mono', monospace; font-size: .6rem;
        letter-spacing: .16em; text-transform: uppercase;
        padding: .35rem .85rem; border-radius: 999px;
        border: 1px solid var(--line-strong); color: var(--cyan-soft);
      }
      @media (max-width: 720px) { .mt-training { grid-template-columns: 1fr; } }

      /* SKILLS */
      .mt-skills {
        display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px;
        background: var(--line);
        border: 1px solid var(--line);
        border-radius: 16px; overflow: hidden;
      }
      .mt-sk {
        padding: 2rem 1.8rem; background: var(--bg);
        position: relative; overflow: hidden;
        transition: background .3s;
      }
      .mt-sk:hover { background: var(--surface); }
      .mt-sk-num {
        position: absolute; right: 1.4rem; top: 1rem;
        font-family: 'JetBrains Mono', monospace; font-weight: 500;
        font-size: 2.6rem; color: rgba(94,227,255,.06); line-height: 1;
      }
      .mt-sk-icon {
        width: 38px; height: 38px; border-radius: 10px;
        display: flex; align-items: center; justify-content: center;
        color: var(--cyan); margin-bottom: 1.1rem;
        background: rgba(94,227,255,.08); border: 1px solid var(--line-strong);
      }
      .mt-sk h3 {
        font-family: 'Syne', sans-serif; font-weight: 500;
        font-size: 1.05rem; color: #fff; margin: 0 0 1rem;
      }
      .mt-sk ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: .45rem; }
      .mt-sk li {
        font-family: 'JetBrains Mono', monospace; font-size: .68rem;
        letter-spacing: .04em; color: var(--muted-2);
        padding-left: 1rem; position: relative;
      }
      .mt-sk li::before {
        content: '—'; position: absolute; left: 0; color: var(--cyan); opacity: .55;
      }
      @media (max-width: 900px) { .mt-skills { grid-template-columns: 1fr 1fr; } }
      @media (max-width: 600px) { .mt-skills { grid-template-columns: 1fr; } }

      /* CONTACT */
      .mt-contact {
        display: grid; grid-template-columns: 1fr 1fr; gap: 5rem;
        align-items: start;
      }
      .mt-contact-h {
        font-family: 'Syne', sans-serif; font-weight: 500;
        font-size: clamp(2rem, 5vw, 4rem); line-height: .95;
        letter-spacing: -.03em; color: #fff; margin: 0 0 2.2rem;
      }
      .mt-contact-h em {
        font-style: italic; font-weight: 500;
        -webkit-text-stroke: 1px var(--cyan); color: transparent;
      }
      .mt-c-list { display: flex; flex-direction: column; gap: .6rem; }
      .mt-c-item {
        display: flex; align-items: center; gap: 1rem;
        padding: 1rem 1.2rem;
        border: 1px solid var(--line); border-radius: 14px;
        background: rgba(94,227,255,.03);
        transition: border-color .25s, background .25s, transform .2s;
        color: var(--cyan);
      }
      .mt-c-item:hover { border-color: var(--line-strong); transform: translateY(-2px); background: rgba(94,227,255,.06); }
      .mt-c-lbl {
        font-family: 'JetBrains Mono', monospace; font-size: .6rem;
        letter-spacing: .16em; text-transform: uppercase; color: var(--muted);
      }
      .mt-c-val { font-size: .9rem; color: var(--text); margin-top: .15rem; }

      .mt-form {
        display: flex; flex-direction: column; gap: 1.1rem;
        padding: 2rem; border: 1px solid var(--line-strong); border-radius: 18px;
        background: linear-gradient(160deg, var(--surface), transparent);
      }
      .mt-field { display: flex; flex-direction: column; gap: .45rem; }
      .mt-field span {
        font-family: 'JetBrains Mono', monospace; font-size: .62rem;
        letter-spacing: .16em; text-transform: uppercase; color: var(--cyan);
      }
      .mt-field input, .mt-field textarea {
        background: rgba(255,255,255,.02);
        border: 1px solid var(--line);
        border-radius: 10px;
        color: var(--text); font-family: 'Inter', sans-serif; font-size: .92rem;
        padding: .85rem 1rem; outline: none;
        transition: border-color .2s, background .2s;
        width: 100%; resize: vertical;
      }
      .mt-field input:focus, .mt-field textarea:focus {
        border-color: var(--cyan); background: rgba(94,227,255,.04);
      }
      @media (max-width: 900px) { .mt-contact { grid-template-columns: 1fr; gap: 3rem; } }

      /* FOOTER */
      .mt-footer {
        border-top: 1px solid var(--line);
        padding: 2rem; display: flex; justify-content: space-between;
        align-items: center; gap: 1rem;
        background: var(--bg-deep);
        flex-wrap: wrap;
      }
      .mt-copy {
        font-family: 'JetBrains Mono', monospace; font-size: .62rem;
        letter-spacing: .12em; color: var(--muted);
      }
    `}</style>
  );
}

export default Index;