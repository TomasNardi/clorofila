import { useNavigate } from "react-router-dom";
import { Leaf, ArrowRight, ChevronDown } from "lucide-react";
import { featuredProducts } from "../data/products";

// ─── Tag color map ─────────────────────────────────────────────────
const tagStyles: Record<string, string> = {
  Bestseller:       "bg-[#c8a96e] text-[#2c2416]",
  Nuevo:            " bg-[#4b5744] text-white",
  "Edición Limitada": "bg-[#2c2416] text-[#c8a96e]",
  Oferta:           "bg-[#c0392b] text-white",
};

// ─── Feature pills ─────────────────────────────────────────────────
const features = [
  { icon: "🌳", text: "Madera nativa certificada" },
  { icon: "🤲", text: "100% hecho a mano" },
  { icon: "♻️", text: "Producción sustentable" },
  { icon: "✦",  text: "Diseño exclusivo" },
];

// ─── Section 2 — Colección showcase ───────────────────────────────
const Section2 = () => {
  const navigate = useNavigate();

  return (
    <div className="section relative min-h-screen bg-[#ede8dc] flex flex-col items-center justify-center px-6 md:px-16 py-14 md:py-20" style={{ touchAction: "pan-y" }}>

      {/* ── Header ── */}
      <div className="text-center mb-10 md:mb-14 max-w-xl">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Leaf className="text-[#5a7a4a] w-4 h-4" />
          <span className="text-xs tracking-[0.3em] uppercase text-[#8a7055] font-medium">
            Colección 2026
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-[#2c2416] leading-tight mb-4">
          Luz que nace<br className="hidden md:block" /> de la madera
        </h2>
        <p className="text-sm md:text-base text-[#5c4a30] font-light leading-relaxed">
          Cada pieza es trabajada a mano en nuestro taller, respetando la veta
          natural y la esencia de cada especie.
        </p>
      </div>

      {/* ── Asymmetric editorial grid ── */}
      <div className="w-full max-w-5xl mb-10 md:mb-14">

        {/* Row 1: large left + 2 small right */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-3 md:mb-4">

          {/* Featured large card */}
          <div
            className="col-span-1 md:col-span-2 relative group overflow-hidden rounded-2xl cursor-pointer"
            style={{ minHeight: "280px", touchAction: "pan-y" }}
            onClick={() => navigate("/tienda")}
          >
            {featuredProducts[0]?.tag && (
              <span className={`absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase ${tagStyles[featuredProducts[0].tag]}`}>
                {featuredProducts[0].tag}
              </span>
            )}
            <img
              src={featuredProducts[0]?.image}
              alt={featuredProducts[0]?.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ minHeight: "280px", filter: "saturate(0.9) contrast(1.04)" }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#1a1208]/80 via-[#1a1208]/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
              <p className="text-[#c8a96e] text-xs tracking-widest uppercase mb-1">{featuredProducts[0]?.material}</p>
              <p className="text-white font-bold text-xl md:text-2xl leading-tight">{featuredProducts[0]?.title}</p>
              <p className="text-[#e8dcc8]/70 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {featuredProducts[0]?.subtitle}
              </p>
            </div>
          </div>

          {/* Two small cards stacked */}
          <div className="col-span-1 flex flex-col gap-3 md:gap-4">
            {featuredProducts.slice(1, 3).map((p) => (
              <div
                key={p.id}
                className="relative group overflow-hidden rounded-2xl cursor-pointer flex-1"
                style={{ minHeight: "130px", touchAction: "pan-y" }}
                onClick={() => navigate("/tienda")}
              >
                {p.tag && (
                  <span className={`absolute top-3 left-3 z-20 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase ${tagStyles[p.tag]}`}>
                    {p.tag}
                  </span>
                )}
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{ minHeight: "130px", filter: "saturate(0.9) contrast(1.04)" }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#1a1208]/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                  <p className="text-white font-semibold text-sm md:text-base leading-tight">{p.title}</p>
                  <p className="text-[#c8a96e] text-xs mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {p.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: 3 equal cards */}
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {featuredProducts.slice(3, 6).map((p) => (
            <div
              key={p.id}
              className="relative group overflow-hidden rounded-2xl cursor-pointer"
              style={{ minHeight: "160px", touchAction: "pan-y" }}
              onClick={() => navigate("/tienda")}
            >
              {p.tag && (
                <span className={`absolute top-3 left-3 z-20 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase ${tagStyles[p.tag]}`}>
                  {p.tag}
                </span>
              )}
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                style={{ minHeight: "160px", filter: "saturate(0.9) contrast(1.04)" }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#1a1208]/80 via-transparent to-transparent opacity-50 group-hover:opacity-90 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white font-semibold text-xs md:text-sm leading-tight">{p.title}</p>
                <p className="text-[#c8a96e] text-[10px] md:text-xs mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {p.material}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll hint for section 2 — visible on desktop and mobile */}
      <div className="absolute bottom-8 right-8 md:right-14 z-20 flex flex-col items-center gap-1 opacity-80 pointer-events-none">
        <span className="text-[10px] tracking-[0.2em] uppercase text-[#5c4a30] rotate-90 mb-2">
          scroll
        </span>
        <ChevronDown className="text-[#5c4a30] w-4 h-4 animate-bounce" />
      </div>

      {/* ── CTA + pills row ── */}
      <div className="flex flex-col items-center gap-6 w-full max-w-5xl">

        <button
          onClick={() => navigate("/tienda")}
          className="
            flex items-center gap-2
            px-8 py-3.5 rounded-full
            bg-[#2c2416] text-[#e8dcc8]
            font-medium text-sm tracking-widest uppercase
            hover:-translate-y-0.5 hover:bg-[#3d3020]
            transition-all duration-300
            shadow-lg shadow-[#2c2416]/20
            cursor-pointer
          "
        >
          Ver toda la colección <ArrowRight className="w-4 h-4" />
        </button>

        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {features.map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#2c2416]/6 border border-[#8a7055]/20 text-[#5c4a30] text-xs md:text-sm font-medium"
            >
              <span>{f.icon}</span>
              <span>{f.text}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Section2;
