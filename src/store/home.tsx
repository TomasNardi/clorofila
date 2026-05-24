import { useContext, useState, useMemo, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ShopCartContext } from "../context/shopcart"
// import CartShop from "./cartshop"
import { Leaf, ArrowLeft, MessageCircle, SlidersHorizontal, X } from "lucide-react"
import { productos, categories, type Product } from "../data/products"

// ─── Tag styles ────────────────────────────────────────────────────
const tagStyles: Record<string, string> = {
  Bestseller:         "bg-[#c8a96e] text-[#2c2416]",
  Nuevo:              " bg-[#4b5744] text-white",
  "Edición Limitada": "bg-[#2c2416] text-[#c8a96e]",
  Oferta:             "bg-[#c0392b] text-white",
}

const categoryLabels: Record<string, string> = {
  lampara: "Lámparas",
  velador: "Veladores",
  deco:    "Decoración",
}

// ─── WA contact helper ────────────────────────────────────────────
const contactarProducto = (productTitle: string) => {
  const msg = encodeURIComponent(
    `¡Hola! 🌿 Me contacto por el modelo *${productTitle}*. Estoy interesado/a en conocer más información. ¡Gracias!`
  )
  window.open(`https://wa.me/541140880279?text=${msg}`, "_blank")
}

// ─── Product Card ──────────────────────────────────────────────────
const ProductCard = ({
  product,
  onPreviewImage,
}: {
  product: Product
  onPreviewImage: (preview: { src: string; title: string }) => void
}) => {
  const { title, subtitle, image, stock, material, tag } = product
  const [active, setActive] = useState(false)
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (!window.matchMedia("(max-width: 767px)").matches) return

    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.intersectionRatio >= 0.35),
      { threshold: [0.35] }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <article
      ref={ref}
      className={`group bg-white rounded-2xl overflow-hidden shadow-sm transition-all duration-500 border border-[#e8dcc8] flex flex-col transform ${active ? "scale-105 md:scale-100" : "scale-100"} md:group-hover:scale-105`}
    >

      {/* ── Image area ── */}
      <div className="relative overflow-hidden aspect-4/5 bg-[#f0ebe0]">
        <button
          type="button"
          onClick={() => onPreviewImage({ src: image, title })}
          className="absolute inset-0 w-full h-full cursor-pointer"
          aria-label={`Ver imagen ampliada de ${title}`}
        >
          <img
            src={image}
            alt={title}
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out ${active ? "scale-105" : "group-hover:scale-105"}`}
            style={{ filter: "saturate(0.88) contrast(1.05)" }}
          />

          <div className="absolute inset-0 bg-linear-to-t from-[#1a1208]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/60 text-[10px] text-white uppercase tracking-[0.2em] px-2.5 py-1 pointer-events-none sm:hidden">
            Tocar para ampliar
          </span>

          {tag && (
            <span className={`absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase ${tagStyles[tag]}`}>
              {tag}
            </span>
          )}

          {!stock && (
            <div className="absolute inset-0 z-10 bg-[#f5f0e8]/70 backdrop-blur-[2px] flex items-center justify-center">
              <span className="px-4 py-1.5 rounded-full bg-[#2c2416]/85 text-[#e8dcc8] text-xs font-semibold tracking-widest uppercase">
                Sin stock
              </span>
            </div>
          )}
        </button>
      </div>

      {/* ── Info area ── */}
      <div className="p-4 md:p-5 flex flex-col flex-1">

        {/* Material chip */}
        <span className="text-[10px] tracking-widest uppercase text-[#8a7055] font-medium mb-1.5">
          {material}
        </span>

        <h3 className="font-bold text-[#2c2416] text-base md:text-lg leading-tight mb-0.5 break-words">
          {title}
        </h3>
        <p className="text-xs text-[#8a7055] leading-snug mb-4 flex-1 break-words">
          {subtitle}
        </p>

        {/* Price row — consultar */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs tracking-widest uppercase text-[#8a7055] font-medium">
            Precio a consultar
          </span>

          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${stock ? " bg-[#4b5744]" : "bg-[#c0392b]"}`} />
            <span className={`text-xs font-medium ${stock ? "text-[#5a7a4a]" : "text-[#c0392b]"}`}>
              {stock ? "Disponible" : "Agotado"}
            </span>
          </div>
        </div>

        {/* CTA — WhatsApp contact */}
        <button
          onClick={() => contactarProducto(title)}
          className="
            w-full py-2.5 rounded-xl text-sm font-semibold tracking-wide whitespace-normal
            transition-all duration-300 flex items-center justify-center gap-2
            bg-[#2c2416] text-[#e8dcc8]
            hover:bg-[#3d3020] cursor-pointer
            hover:-translate-y-0.5
            shadow-sm hover:shadow-lg hover:shadow-[#2c2416]/15
          "
        >
          <MessageCircle className="w-4 h-4" />
          Consultar por WhatsApp
        </button>
      </div>
    </article>
  )
}

// ─── Empty state ───────────────────────────────────────────────────
const EmptyState = ({ onReset }: { onReset: () => void }) => (
  <div className="col-span-full flex flex-col items-center justify-center py-24 gap-4 text-center">
    <Leaf className="text-[#c8a96e] w-12 h-12 opacity-30" />
    <p className="text-[#5c4a30] font-medium">No hay productos en esta categoría.</p>
    <button
      onClick={onReset}
      className="text-sm text-[#5a7a4a] underline underline-offset-4 cursor-pointer hover:text-[#4a6a3a] transition-colors"
    >
      Ver todos los productos
    </button>
  </div>
)
// ─── Page ──────────────────────────────────────────────────────────
const Home = () => {
  const cart     = useContext(ShopCartContext)
  const navigate = useNavigate()

  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [onlyStock,      setOnlyStock]      = useState(false)
  const [filtersOpen,    setFiltersOpen]    = useState(false)
  const [previewImage,   setPreviewImage]   = useState<{ src: string; title: string } | null>(null)

  if (!cart) return null

  const filtered = useMemo(() => {
    return productos.filter(p => {
      if (activeCategory !== "all" && p.category !== activeCategory) return false
      if (onlyStock && !p.stock) return false
      return true
    })
  }, [activeCategory, onlyStock])

  return (
    <div className="min-h-screen bg-[#f5f0e8]">

      {/* ── Sticky header ── */}
      <header className="sticky top-0 z-40 bg-[#f5f0e8]/95 backdrop-blur-md border-b border-[#e0d5c5]">
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-12 md:h-16 flex items-center justify-between gap-4">

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-[#5c4a30] hover:text-[#2c2416] transition-colors cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium hidden sm:block">Inicio</span>
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Leaf className="text-[#5a7a4a] w-5 h-5" />
            <span className="text-base sm:text-lg md:text-xl font-bold text-[#2c2416] tracking-tight">CLOROFILA</span>
          </button>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => navigate("/taller")}
              className="hidden md:flex items-center gap-1.5 text-xs text-[#8a7055] hover:text-[#5a7a4a] transition-colors cursor-pointer tracking-wide"
            >
              <Leaf className="w-3.5 h-3.5" />
              El Taller
            </button>
            {/* Mobile filter toggle */}
            <button
              onClick={() => setFiltersOpen(v => !v)}
              className="md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#e0d5c5] text-[#5c4a30] text-xs font-medium cursor-pointer hover:border-[#8a7055] transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filtros
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero banner ── */}
      <div className="relative bg-[#2c2416] overflow-hidden">
        {/* Subtle texture */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, #c8a96e 0, #c8a96e 1px, transparent 0, transparent 50%)",
            backgroundSize: "12px 12px",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.35em] uppercase text-[#8a7055] mb-2">Colección 2026</p>
            <h1 className="text-2xl md:text-5xl font-bold text-[#e8dcc8] leading-tight break-words">
                  Nuestra Tienda
                </h1>
          </div>
          <p className="text-sm md:text-base text-[#a89070] font-light max-w-full md:max-w-xs leading-relaxed break-words">
            Lámparas y objetos de madera trabajados a mano.<br className="hidden md:block" />
            Cada pieza, única.
          </p>
        </div>
      </div>

      {/* ── Filters bar ── */}
        <div className={`
        bg-[#ede8dc] border-b border-[#e0d5c5]
        transition-all duration-300
        ${filtersOpen ? "block" : "hidden md:block"}
      `}>
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-2 md:py-4 flex items-center gap-2 md:gap-3 overflow-x-auto">

          {/* Category filters */}
          <div className="flex gap-2 flex-1 whitespace-nowrap">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                activeCategory === "all"
                  ? "bg-[#2c2416] text-[#e8dcc8] shadow-sm"
                  : "bg-white text-[#5c4a30] border border-[#e0d5c5] hover:border-[#8a7055]"
              }`}
            >
              Todos ({productos.length})
            </button>

            {categories.map(cat => {
              const count = productos.filter(p => p.category === cat).length
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                    activeCategory === cat
                      ? "bg-[#2c2416] text-[#e8dcc8] shadow-sm"
                      : "bg-white text-[#5c4a30] border border-[#e0d5c5] hover:border-[#8a7055]"
                  }`}
                >
                  {categoryLabels[cat]} ({count})
                </button>
              )
            })}
          </div>

          {/* Stock toggle */}
          <button
            onClick={() => setOnlyStock(v => !v)}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer shrink-0 ${
              onlyStock
                ? " bg-[#4b5744] text-white shadow-sm"
                : "bg-white text-[#5c4a30] border border-[#e0d5c5] hover:border-[#8a7055]"
            }`}
          >
            {onlyStock && <X className="w-3 h-3" />}
            Solo disponibles
          </button>
        </div>
      </div>

      {/* ── Results count ── */}
      <div className="max-w-6xl mx-auto px-5 md:px-8 pt-6 pb-2">
        <p className="text-xs text-[#8a7055] tracking-wide">
          {filtered.length} {filtered.length === 1 ? "producto" : "productos"}
          {activeCategory !== "all" && ` en ${categoryLabels[activeCategory]}`}
        </p>
      </div>

      {/* ── Product grid ── */}
      <main className="max-w-6xl mx-auto px-5 md:px-8 py-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {filtered.length === 0 ? (
            <EmptyState onReset={() => { setActiveCategory("all"); setOnlyStock(false) }} />
          ) : (
            filtered.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onPreviewImage={setPreviewImage}
              />
            ))
          )}
        </div>
      </main>

      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative w-full max-w-[min(1100px,calc(100%-2rem))] max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPreviewImage(null)}
              className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/90 text-[#2c2416] hover:bg-white shadow-lg"
            >
              <X className="w-4 h-4" />
            </button>
            <img
              src={previewImage.src}
              alt={previewImage.title}
              className="w-full max-h-[80vh] object-contain rounded-[1.5rem] mx-auto"
            />
            <p className="mt-3 text-sm text-white text-center">{previewImage.title}</p>
          </div>
        </div>
      )}

      {/* ── Footer ── */}
      <footer className="border-t border-[#e0d5c5] bg-[#2c2416]">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Leaf className="text-[#5a7a4a] w-4 h-4" />
            <span className="text-sm font-bold text-[#e8dcc8] tracking-tight">CLOROFILA</span>
          </div>
          <p className="text-xs text-[#5c4a30] tracking-widest uppercase text-center">
            Taller Artesanal · Hecho a mano · Argentina
          </p>
          <a
            href="https://wa.me/5491135209713"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#8a7055] hover:text-[#c8a96e] transition-colors tracking-wide"
          >
            Consultas por WhatsApp →
          </a>
        </div>
      </footer>

      {/* Floating cart */}
      {/* CartShop temporarily hidden while shopping cart is disabled */}
    </div>
  )
}

export default Home
