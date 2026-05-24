// ─── Clorofila — Product catalog (source of truth) ────────────────
// Images are imported as static assets (Vite handles hashing + optimization)

import aura             from "../products/aura.png";
import bosque           from "../products/bosque.png";
import brisa            from "../products/brisa.png";
import monte            from "../products/monte.png";
import portabelasWinter from "../products/portabelas_winter.png";
import solanaVintage    from "../products/solana_vintage.png";

export type Product = {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  price: number;
  originalPrice?: number;    // if on sale
  stock: boolean;
  material: string;
  category: "lampara" | "velador" | "deco";
  tag?: "Nuevo" | "Bestseller" | "Edición Limitada" | "Oferta";
  featured: boolean;         // shown in landing section 2
};

export const productos: Product[] = [
  {
    id: 1,
    slug: "aura",
    title: "Aura",
    subtitle: "Lámpara de pie · Madera maciza",
    description:
      "Diseño minimalista con base torneada a mano. La luz difusa crea un halo cálido que transforma cualquier rincón.",
    image: aura,
    price: 24500,
    stock: true,
    material: "Alamo Plateado",
    category: "lampara",
    tag: "Bestseller",
    featured: true,
  },
  {
    id: 2,
    slug: "bosque",
    title: "Bosque",
    subtitle: "Porta Vela reutilizable Conreto & Madera",
    description:
      "Inspirada en la textura del bosque nativo. Cada veta es única, cada pieza irrepetible.",
    image: bosque,
    price: 18900,
    stock: true,
    material: "Paraiso",
    category: "deco",
    tag: "Nuevo",
    featured: true,
  },
  {
    id: 3,
    slug: "brisa",
    title: "Brisa",
    subtitle: "Florero para Graminias · Luz cálida",
    description:
      "Aplique artesanal de pared con difusor de madera. Ideal para dormitorios y espacios de descanso.",
    image: brisa,
    price: 15200,
    stock: true,
    material: "Eucalipto",
    category: "deco",
    tag: undefined,
    featured: true,
  },
  {
    id: 4,
    slug: "monte",
    title: "Monte",
    subtitle: "Lámpara de pie· Minimalista",
    description:
      "Colgante de madera nativa con cable trenzado. Perfecta sobre mesas de comedor o islas de cocina.",
    image: monte,
    price: 21000,
    originalPrice: 26000,
    stock: true,
    material: "Paraiso",
    category: "lampara",
    featured: true,
  },
  {
    id: 5,
    slug: "portabelas-winter",
    title: "Portavelas Winter",
    subtitle: "Objeto decorativo · Colección invierno",
    description:
      "Portavelas tallado a mano en cedro. La colección Winter captura la calidez de los días fríos.",
    image: portabelasWinter,
    price: 8900,
    stock: true,
    material: "Cipres",
    category: "deco",
    tag: "Edición Limitada",
    featured: false,
  },
  {
    id: 6,
    slug: "solana-vintage",
    title: "Solana Vintage",
    subtitle: "Velador · Estilo retro artesanal",
    description:
      "Velador con acabado vintage en roble. Combina lo artesanal con una estética atemporal.",
    image: solanaVintage,
    price: 19800,
    stock: true,
    material: "Alamo Plateado",
    category: "velador",
    tag: undefined,
    featured: false,
  },
];

// Helpers
export const featuredProducts = productos.filter(p => p.featured);
export const getBySlug = (slug: string) => productos.find(p => p.slug === slug);
export const categories = ["lampara", "velador", "deco"] as const;
