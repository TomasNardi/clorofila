import { useNavigate } from "react-router-dom";
import { Leaf, ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import homepageImg from "../branding/homepage.png";
import homepageMobile from "../branding/homepage_mobile.png";

// ─── Section 1 — Full-screen banner hero ──────────────────────────
const Section1 = (): JSX.Element => {
  const navigate = useNavigate();

  const irTienda = () => navigate("/tienda");

  return (
    <div className="section min-h-[65vh] md:h-screen relative overflow-hidden">

      {/* ── HERO IMAGE — full bleed ── */}
      {/* Mobile-specific image (visible on xs) */}
      <motion.img
        src={homepageMobile}
        alt="Clorofila — Lámparas de madera artesanales (mobile)"
        className="absolute inset-0 w-full h-full object-cover object-center sm:hidden"
        style={{ filter: "saturate(0.88) contrast(1.06)" }}
        initial={{ scale: 0.96 }}
        animate={{ scale: 1.22 }}
        transition={{ duration: 8, ease: "easeOut", repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Desktop image (hidden on xs) */}
      <motion.img
        src={homepageImg}
        alt="Clorofila — Lámparas de madera artesanales"
        className="absolute inset-0 w-full h-full object-cover object-center hidden sm:block"
        style={{ filter: "saturate(0.88) contrast(1.06)" }}
        initial={{ scale: 0.99 }}
        animate={{ scale: 1.03 }}
        transition={{ duration: 12, ease: "easeOut", repeat: Infinity, repeatType: "reverse" }}
      />

      {/* ── Layered overlays for text legibility ── */}
      {/* Bottom-up dark gradient */}
      <div className="absolute inset-0 bg-linear-to-t from-[#1a1208]/90 via-[#1a1208]/30 to-transparent z-10" />
      {/* Left-side gradient for copy area */}
      <div className="absolute inset-0 bg-linear-to-r from-[#1a1208]/70 via-[#1a1208]/20 to-transparent z-10" />
      {/* Subtle top vignette */}
      <div className="absolute inset-0 bg-linear-to-b from-[#1a1208]/40 via-transparent to-transparent z-10" />

      {/* ── Top bar — marquee ── */}
      <div className="absolute top-0 left-0 right-0 z-30 overflow-hidden bg-[#2c2416]/80 backdrop-blur-sm py-2">
        <div className="marquee-wrapper text-[#c8a96e]">
          <div className="marquee-content">
            <span>✦ LÁMPARAS ARTESANALES</span>
            <span>✦ MADERA NATIVA</span>
            <span>✦ DISEÑO SUSTENTABLE</span>
            <span>✦ HECHO A MANO</span>
            <span>✦ OBJETOS ÚNICOS</span>
            <span>✦ CLOROFILA</span>
          </div>
          
        </div>
      </div>

      {/* ── Main content — bottom-left editorial layout ── */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end px-8 md:px-16 pb-16 md:pb-20">

        {/* Eyebrow */}
        <div className="flex items-center gap-2 mb-4">
          <Leaf className="text-[#c8a96e] w-4 h-4" />
          <span className="text-xs md:text-sm tracking-[0.3em] uppercase text-[#c8a96e]/80 font-medium">
            Taller Artesanal · Argentina
          </span>
        </div>

        {/* Main headline */}
        <motion.h1
          className="
            text-3xl sm:text-5xl md:text-7xl lg:text-[9rem]
            font-bold tracking-tight leading-none
            text-[#f5f0e8]
            mb-4
            drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]
          "
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          CLOROFILA
        </motion.h1>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-5">
          <div className="h-px w-12 bg-[#c8a96e]/60" />
          <p className="text-sm md:text-base text-[#e8dcc8]/70 font-light tracking-wide">
            Lámparas &amp; Objetos de Madera
          </p>
        </div>

        {/* Subtext */}
        <p className="
          text-sm md:text-lg
          text-[#e8dcc8]/60
          font-light leading-relaxed
          max-w-full md:max-w-sm
          mb-8
        ">
          Cada pieza es única. Cada veta cuenta una historia.
        </p>

        {/* CTA row */}
        <div className="flex flex-row gap-3 items-center">
          <motion.button
            onClick={irTienda}
            className="
              flex items-center gap-2
              px-6 py-3 md:px-8 md:py-3.5
              rounded-full
              bg-[#f5f0e8] text-[#2c2416]
              font-semibold text-sm md:text-base tracking-wide
              transition-all duration-300
              shadow-xl shadow-black/30
              cursor-pointer
            "
            whileHover={{ scale: 1.03, translateY: -3 }}
            whileTap={{ scale: 0.98 }}
          >
            Ver Tienda <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* ── Floating badges — top-right corner ── */}
      <div className="absolute top-14 right-6 md:right-12 z-20 flex flex-col gap-3 items-end">

       
      </div>

      {/* ── Scroll hint ── */}
      <div className="absolute bottom-6 right-8 md:right-16 z-20 flex flex-col items-center gap-1 opacity-50">
        <span className="text-[10px] tracking-[0.2em] uppercase text-[#e8dcc8] rotate-90 mb-2">
          scroll
        </span>
        <ChevronDown className="text-[#e8dcc8] w-4 h-4 animate-bounce" />
      </div>

    </div>
  );
};

export default Section1;
