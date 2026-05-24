import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, ArrowLeft, ArrowRight, TreePine, Eye, Hammer, Sparkles, ChevronDown } from "lucide-react";
import workingImg from "../branding/working.png";

// ─── Animated counter hook ─────────────────────────────────────────
function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();

          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

// ─── Stat card with countup ────────────────────────────────────────
const StatCard = ({
  value,
  suffix,
  label,
  sub,
}: {
  value: number
  suffix: string
  label: string
  sub: string
}) => {
  const { count, ref } = useCountUp(value, 1600);

  return (
    <div ref={ref} className="text-center group">
      <p className="text-4xl md:text-6xl font-black text-[#c8a96e] leading-none mb-1 tabular-nums transition-all duration-300">
        {count}{suffix}
      </p>
      <p className="text-xs md:text-sm font-semibold text-[#e8dcc8] mb-0.5 tracking-wide">{label}</p>
      <p className="text-[10px] md:text-xs text-[#5c4a30] tracking-widest uppercase">{sub}</p>
    </div>
  );
};

// ─── Wizard steps data ─────────────────────────────────────────────
const steps = [
  {
    number: "01",
    icon: TreePine,
    title: "La búsqueda de la madera",
    subtitle: "El origen lo es todo",
    color: "text-[#5a7a4a]",
    accent: " bg-[#4b5744]",
    lightBg: " bg-[#4b5744]/8",
    border: "border-[#5a7a4a]/20",
    content: [
      {
        heading: "Bosques con historia",
        body: "No compramos madera. La encontramos. Recorremos bosques nativos, montes abandonados y campos en desuso buscando árboles caídos, ramas gruesas y troncos que el tiempo ya trabajó por nosotros.",
      },
      {
        heading: "Observación y paciencia",
        body: "Cada pieza de madera se estudia durante días antes de ser seleccionada. Observamos la veta, el color, la densidad, los nudos. Buscamos la historia que tiene para contar.",
      },
      {
        heading: "Madera reciclada, no talada",
        body: "El 100% de nuestra madera proviene de árboles que ya cumplieron su ciclo natural. Nunca talamos. Rescatamos lo que el bosque ya dejó ir, dándole una segunda vida con propósito.",
      },
    ],
    stat: { value: "100%", label: "Madera reciclada" },
  },
  {
    number: "02",
    icon: Eye,
    title: "El diseño y la observación",
    subtitle: "Escuchar lo que la madera quiere ser",
    color: "text-[#c8a96e]",
    accent: "bg-[#c8a96e]",
    lightBg: "bg-[#c8a96e]/8",
    border: "border-[#c8a96e]/20",
    content: [
      {
        heading: "La madera dicta el diseño",
        body: "No llegamos al taller con un plano fijo. Llegamos con una idea y dejamos que la madera la moldee. La forma de un nudo, la curva de una veta, una grieta natural — todo influye en el resultado final.",
      },
      {
        heading: "Bocetos a mano",
        body: "Cada pieza comienza en papel. Dibujamos proporciones, pensamos la luz, imaginamos cómo va a caer la sombra. El diseño es un diálogo entre lo que queremos y lo que la madera permite.",
      },
      {
        heading: "Tiempo de contemplación",
        body: "Antes de hacer el primer corte, la madera descansa en el taller. La observamos en distintas horas del día, con distintas luces. Ese tiempo de contemplación es parte del proceso.",
      },
    ],
    stat: { value: "7 días", label: "Promedio de diseño por pieza" },
  },
  {
    number: "03",
    icon: Hammer,
    title: "La construcción a mano",
    subtitle: "Donde el oficio se convierte en objeto",
    color: "text-[#8a7055]",
    accent: "bg-[#8a7055]",
    lightBg: "bg-[#8a7055]/8",
    border: "border-[#8a7055]/20",
    content: [
      {
        heading: "Herramientas de oficio",
        body: "Trabajamos con tornos, gubias, formones y lijas. Sin CNC, sin moldes, sin producción en serie. Cada corte es una decisión, cada lijada es una elección. El tiempo que lleva es parte del valor.",
      },
      {
        heading: "Acabados naturales",
        body: "Usamos aceites naturales de linaza y cera de abeja para proteger y realzar la madera. Sin barnices sintéticos. El acabado respira, envejece bien y se puede renovar en casa.",
      },
      {
        heading: "Control pieza por pieza",
        body: "Antes de salir del taller, cada objeto pasa por una revisión exhaustiva. Probamos la estabilidad, la calidad del cableado si lleva luz, y el acabado superficial. Si no nos convence, vuelve al banco.",
      },
    ],
    stat: { value: "6+", label: "Tipos de madera que trabajamos" },
  },
];

// ─── Step indicator ────────────────────────────────────────────────
const StepDot = ({
  index,
  active,
  completed,
  onClick,
}: {
  index: number
  active: boolean
  completed: boolean
  onClick: () => void
}) => (
  <button
    onClick={onClick}
    className={`
      relative flex items-center justify-center
      w-9 h-9 rounded-full text-xs font-bold
      transition-all duration-400 cursor-pointer
      ${active
        ? "bg-[#2c2416] text-[#e8dcc8] scale-110 shadow-lg shadow-[#2c2416]/20"
        : completed
          ? " bg-[#4b5744] text-white"
          : "bg-[#e0d5c5] text-[#8a7055]"
      }
    `}
  >
    {completed && !active ? "✓" : `0${index + 1}`}
  </button>
);

// ─── Taller page ───────────────────────────────────────────────────
const Taller = () => {
  const navigate  = useNavigate();
  const [step, setStep] = useState(0);
  const current   = steps[step];
  const Icon      = current.icon;

  const prev = () => setStep(s => Math.max(0, s - 1));
  const next = () => setStep(s => Math.min(steps.length - 1, s + 1));

  return (
    <div className="min-h-screen bg-[#f5f0e8]">

      {/* ── Sticky header ── */}
      <header className="sticky top-0 z-40 bg-[#f5f0e8]/95 backdrop-blur-md border-b border-[#e0d5c5]">
        <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-[#5c4a30] hover:text-[#2c2416] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium hidden sm:block">Inicio</span>
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Leaf className="text-[#5a7a4a] w-5 h-5" />
            <span className="text-lg md:text-xl font-bold text-[#2c2416] tracking-tight">CLOROFILA</span>
          </button>

          <button
            onClick={() => navigate("/tienda")}
            className="text-xs text-[#8a7055] hover:text-[#2c2416] transition-colors tracking-widest uppercase hidden sm:block cursor-pointer"
          >
            Ver Tienda →
          </button>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════════
          HERO — working.png full bleed con texto encima
      ══════════════════════════════════════════════════════════ */}
      <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">

        {/* Background image */}
        <img
          src={workingImg}
          alt="Artesano trabajando en el taller Clorofila"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ filter: "saturate(0.82) contrast(1.08)" }}
        />

        {/* Layered overlays */}
        <div className="absolute inset-0 bg-linear-to-t from-[#1a1208]/95 via-[#1a1208]/40 to-[#1a1208]/20" />
        <div className="absolute inset-0 bg-linear-to-r from-[#1a1208]/60 via-transparent to-transparent" />
        {/* Face cover — strong top-down shadow */}
        <div className="absolute inset-0 bg-linear-to-b from-[#2c2416]/95 via-[#2c2416]/60 to-transparent" style={{ height: "55%" }} />

        {/* Top marquee */}
        <div className="absolute top-0 left-0 right-0 z-20 overflow-hidden bg-[#2c2416]/70 backdrop-blur-sm py-2">
            <div className="marquee-wrapper text-[#c8a96e]">
              <div className="marquee-content">
                {/* Taller-specific items merged with global marquee items for richness */}
                {[
                  "✦ MADERA RECICLADA",
                  "✦ BOSQUE NATIVO",
                  "✦ HECHO A MANO",
                  "✦ SIN TALA",
                  "✦ OFICIO ARTESANAL",
                  "✦ CLOROFILA TALLER",
                ].map((it, i) => (
                  <span key={`t1-${i}`} className="mx-6 whitespace-nowrap">{it}</span>
                ))}
              </div>

              <div className="marquee-content" aria-hidden>
                {["✦ MADERA RECICLADA","✦ BOSQUE NATIVO","✦ HECHO A MANO","✦ SIN TALA","✦ OFICIO ARTESANAL","✦ CLOROFILA TALLER"].map((it, i) => (
                  <span key={`t2-${i}`} className="mx-6 whitespace-nowrap">{it}</span>
                ))}
              </div>
            </div>
        </div>

        {/* Hero copy — bottom left */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end px-8 md:px-16 pb-14 md:pb-20">

          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-[#c8a96e] w-4 h-4" />
            <span className="text-xs tracking-[0.3em] uppercase text-[#c8a96e]/80 font-medium">
              Nuestro proceso · Argentina
            </span>
          </div>

          <h1 className="
            text-5xl sm:text-6xl md:text-7xl lg:text-8xl
            font-bold tracking-tight leading-none
            text-[#f5f0e8] mb-5
            drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]
          ">
            EL TALLER<br />
          </h1>

          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-10 bg-[#c8a96e]/50" />
            <p className="text-sm md:text-base text-[#e8dcc8]/70 font-light tracking-wide">
              Donde la madera del bosque se convierte en luz
            </p>
          </div>

          <p className="text-sm md:text-base text-[#e8dcc8]/50 font-light max-w-md leading-relaxed">
            Rescatamos madera que el bosque ya dejó ir
            y la transformamos, con paciencia y oficio, en piezas únicas.
          </p>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-5 right-8 md:right-14 z-10 flex flex-col items-center gap-1 opacity-40">
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#e8dcc8] rotate-90 mb-1">scroll</span>
          <ChevronDown className="text-[#e8dcc8] w-4 h-4 animate-bounce" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          INTRO STRIP — 3 stats animados
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-[#2c2416]">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 md:py-14 grid grid-cols-3 gap-4 md:gap-8 divide-x divide-[#3d3020]">
          <StatCard value={100} suffix="%" label="Madera reciclada"  sub="Nunca talamos"       />
          <StatCard value={140} suffix="+" label="Piezas entregadas"  sub="Y contando"          />
          <StatCard value={0}   suffix=""  label="Piezas iguales"    sub="Cada una es única"   />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          WIZARD — 3 pasos del proceso
      ══════════════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24">

        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Leaf className="text-[#5a7a4a] w-4 h-4" />
            <span className="text-xs tracking-[0.3em] uppercase text-[#8a7055] font-medium">
              El proceso
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#2c2416] leading-tight mb-3">
            De la raíz<br className="hidden md:block" /> al objeto
          </h2>
          <p className="text-sm md:text-base text-[#5c4a30] font-light max-w-sm mx-auto leading-relaxed">
            Tres momentos que definen cada pieza que sale de nuestro taller.
          </p>
        </div>

        {/* ── Step indicators ── */}
        <div className="flex items-center justify-center gap-0 mb-12 md:mb-16">
          {steps.map((_, i) => (
            <div key={i} className="flex items-center">
              <StepDot
                index={i}
                active={i === step}
                completed={i < step}
                onClick={() => setStep(i)}
              />
              {i < steps.length - 1 && (
                <div className={`
                  h-px w-12 md:w-24 mx-1 transition-all duration-500
                  ${i < step ? " bg-[#4b5744]" : "bg-[#e0d5c5]"}
                `} />
              )}
            </div>
          ))}
        </div>

        {/* ── Step card ── */}
        <div
          key={step}
          className={`
            rounded-3xl border ${current.border} ${current.lightBg}
            p-6 md:p-10 lg:p-14
            transition-all duration-300
          `}
          style={{ animation: "fadeInUp 0.4s ease-out" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* Left — step meta */}
            <div>
              {/* Number + icon */}
              <div className="flex items-center gap-4 mb-6">
                <span className={`text-6xl md:text-8xl font-black leading-none ${current.color} opacity-15 select-none`}>
                  {current.number}
                </span>
                <div className={`p-3 rounded-2xl ${current.lightBg} border ${current.border}`}>
                  <Icon className={`w-7 h-7 ${current.color}`} strokeWidth={1.5} />
                </div>
              </div>

              {/* Title */}
              <p className={`text-xs tracking-[0.25em] uppercase font-medium mb-2 ${current.color}`}>
                {current.subtitle}
              </p>
              <h3 className="text-2xl md:text-4xl font-bold text-[#2c2416] leading-tight mb-6">
                {current.title}
              </h3>

              {/* Stat highlight */}
              <div className={`inline-flex flex-col items-start px-5 py-4 rounded-2xl ${current.lightBg} border ${current.border}`}>
                <span className={`text-3xl md:text-4xl font-black ${current.color} leading-none`}>
                  {current.stat.value}
                </span>
                <span className="text-xs text-[#8a7055] mt-1 tracking-wide">
                  {current.stat.label}
                </span>
              </div>
            </div>

            {/* Right — content blocks */}
            <div className="flex flex-col gap-6">
              {current.content.map((block, i) => (
                <div key={i} className="flex gap-4">
                  <div className={`mt-1 w-1.5 h-1.5 rounded-full ${current.accent} shrink-0 mt-2`} />
                  <div>
                    <h4 className="text-sm font-bold text-[#2c2416] mb-1.5 tracking-wide">
                      {block.heading}
                    </h4>
                    <p className="text-sm text-[#5c4a30] font-light leading-relaxed">
                      {block.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Navigation ── */}
          <div className="flex items-center justify-between mt-10 md:mt-12 pt-6 border-t border-[#e0d5c5]/60">

            <button
              onClick={prev}
              disabled={step === 0}
              className={`
                flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium
                transition-all duration-300
                ${step === 0
                  ? "text-[#c0b8a8] cursor-not-allowed"
                  : "text-[#5c4a30] hover:text-[#2c2416] cursor-pointer hover:-translate-x-0.5"
                }
              `}
            >
              <ArrowLeft className="w-4 h-4" /> Anterior
            </button>

            {/* Progress dots */}
            <div className="flex gap-2">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setStep(i)}
                  className={`
                    rounded-full transition-all duration-300 cursor-pointer
                    ${i === step
                      ? `w-6 h-2 ${current.accent}`
                      : "w-2 h-2 bg-[#e0d5c5] hover:bg-[#c8a96e]"
                    }
                  `}
                />
              ))}
            </div>

            {step < steps.length - 1 ? (
              <button
                onClick={next}
                className="
                  flex items-center gap-2 px-5 py-2.5 rounded-full
                  bg-[#2c2416] text-[#e8dcc8] text-sm font-medium
                  hover:bg-[#3d3020] hover:translate-x-0.5
                  transition-all duration-300 cursor-pointer
                  shadow-sm hover:shadow-md
                "
              >
                Siguiente <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => navigate("/tienda")}
                className="
                  flex items-center gap-2 px-5 py-2.5 rounded-full
                   bg-[#4b5744] text-white text-sm font-medium
                  hover:bg-[#4a6a3a] hover:translate-x-0.5
                  transition-all duration-300 cursor-pointer
                  shadow-sm hover:shadow-md shadow-[#5a7a4a]/20
                "
              >
                Ver la colección <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          CLOSING CTA
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-[#2c2416] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, #c8a96e 0, #c8a96e 1px, transparent 0, transparent 50%)",
            backgroundSize: "12px 12px",
          }}
        />
        <div className="relative max-w-2xl mx-auto px-5 md:px-8 py-16 md:py-20 text-center">
          <Leaf className="text-[#5a7a4a] w-8 h-8 mx-auto mb-5 opacity-60" />
          <h2 className="text-2xl md:text-4xl font-bold text-[#e8dcc8] mb-4 leading-tight">
            Cada pieza tiene<br /> una historia que contar
          </h2>
          <p className="text-sm text-[#a89070] font-light leading-relaxed mb-8 max-w-sm mx-auto">
            Si querés saber de dónde viene la madera de tu próxima lámpara,
            escribinos. Te contamos todo.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/541140880279?text=Hola!%20🌿%20Vi%20el%20taller%20de%20Clorofila%20y%20me%20gustaría%20saber%20más%20sobre%20el%20proceso%20artesanal."
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex items-center justify-center gap-2
                px-7 py-3 rounded-full
                 bg-[#4b5744] text-white font-medium text-sm tracking-wide
                hover:-translate-y-0.5 hover:bg-[#4a6a3a]
                transition-all duration-300 shadow-lg shadow-[#5a7a4a]/30
              "
            >
              Escribinos por WhatsApp
            </a>
            <button
              onClick={() => navigate("/tienda")}
              className="
                flex items-center justify-center gap-2
                px-7 py-3 rounded-full
                border border-[#e8dcc8]/20 text-[#e8dcc8]
                font-medium text-sm tracking-wide
                hover:-translate-y-0.5 hover:border-[#c8a96e] hover:text-[#c8a96e]
                transition-all duration-300 cursor-pointer
              "
            >
              Ver la colección <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e0d5c5] py-6 text-center bg-[#f5f0e8]">
        <p className="text-xs text-[#a89070] tracking-widest uppercase">
          © 2026 Clorofila · Taller Artesanal · Argentina
        </p>
      </footer>

    </div>
  );
};

export default Taller;
