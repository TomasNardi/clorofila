import { Truck, CreditCard, Package, Leaf, ArrowUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SectionProps {
  fullpageApi: any;
}

// ─── Info cards ────────────────────────────────────────────────────
const cards = [
  {
    icon: Truck,
    title: "Envío a todo el país",
    desc: "Embalamos cada pieza con cuidado para que llegue perfecta a tu puerta.",
    color: "text-[#c8a96e]",
  },
  {
    icon: CreditCard,
    title: "Todos los medios de pago",
    desc: "Transferencia, tarjeta, efectivo. Elegís vos cómo pagar.",
    color: "text-[#5a7a4a]",
  },
  {
    icon: Package,
    title: "Retiro en Punto de entrega",
    desc: "Coorinda con nosotros para retirar tus productos.",
    color: "text-[#c8a96e]",
  },
];

// ─── Section 3 ────────────────────────────────────────────────────
const Section3: React.FC<SectionProps> = ({ fullpageApi }) => {
  const navigate = useNavigate();
  return (
    <div className="section relative flex flex-col items-center justify-center px-6 md:px-16 py-16 bg-[#2c2416] overflow-hidden">

      {/* ── Background organic shapes ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full  bg-[#4b5744]/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-[#c8a96e]/10 blur-3xl" />
      </div>

      {/* ── Header ── */}
      <div className="relative z-10 text-center mb-12 md:mb-16">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Leaf className="text-[#5a7a4a] w-4 h-4" />
          <span className="text-xs tracking-[0.25em] uppercase text-[#8a7055] font-medium">
            Cómo funciona
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-[#e8dcc8] leading-tight mb-3">
          Simple, directo<br className="hidden md:block" /> y artesanal
        </h2>
        <p className="text-sm md:text-base text-[#a89070] font-light max-w-sm mx-auto">
          Trabajamos con pedidos personalizados y stock disponible. Siempre en contacto directo con vos.
        </p>
      </div>

      {/* ── Cards ── */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl w-full mb-12 md:mb-16">
        {cards.map(({ icon: Icon, title, desc, color }, i) => (
          <div
            key={i}
            className="
              flex flex-col items-center text-center
              p-6 md:p-8 rounded-2xl
              bg-[#3d3020]/60 border border-[#8a7055]/20
              backdrop-blur-sm
              hover:-translate-y-1 transition-transform duration-300
            "
          >
            <div className={`mb-4 ${color}`}>
              <Icon size={36} strokeWidth={1.5} />
            </div>
            <h3 className="text-base md:text-lg font-semibold text-[#e8dcc8] mb-2">{title}</h3>
            <p className="text-sm text-[#a89070] font-light leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* ── CTA + back ── */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        <a
          href="https://wa.me/541140880279?text=Hola!%20🌿%20Quiero%20info%20sobre%20Clorofila"
          target="_blank"
          rel="noopener noreferrer"
          className="
            px-8 py-3 rounded-full
             bg-[#4b5744] text-white
            font-medium text-base tracking-wide
            hover:-translate-y-0.5 hover:bg-[#4a6a3a]
            transition-all duration-300
            shadow-lg shadow-[#5a7a4a]/30
          "
        >
          Escribinos por WhatsApp
        </a>

        <button
          onClick={() => navigate("/taller")}
          className="
            flex items-center gap-1.5
            text-[#c8a96e] text-xs tracking-widest uppercase
            hover:text-[#e8dcc8] transition-colors duration-300
            cursor-pointer
          "
        >
          <Leaf className="w-3 h-3" />
          Conocé el taller
        </button>

        <button
          onClick={() => fullpageApi.moveTo(1)}
          className="
            flex items-center gap-1.5
            text-[#8a7055] text-xs tracking-widest uppercase
            hover:text-[#c8a96e] transition-colors duration-300
            cursor-pointer
          "
        >
          <ArrowUp className="w-3 h-3" />
          Volver al inicio
        </button>
      </div>

      {/* ── Footer note ── */}
      <p className="absolute bottom-4 left-0 right-0 text-center text-[10px] text-[#5c4a30] tracking-widest uppercase">
        © 2026 Clorofila · Taller Artesanal
      </p>

    </div>
  );
};

export default Section3;
