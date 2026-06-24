"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ShoppingBag, Star, ArrowRight, Check, Truck, RefreshCw, Shield, Heart, ChevronRight, Sparkles } from 'lucide-react';
import { APP_NAME, APP_TAGLINE, type Product } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Inline mock data ────────────────────────────────────────────────────────

const products: Product[] = [
  {
    id: "1",
    name: "Arc Ceramic Vase",
    category: "Home Decor",
    price: 89,
    originalPrice: 120,
    rating: 4.9,
    reviewCount: 214,
    image: "https://thearcshop.com/cdn/shop/products/the-arc-vintage-56_530x@2x.jpg?v=1617828077",
    badge: "Best Seller",
    description:
      "Hand-thrown stoneware with a matte glaze finish. Each piece is unique, shaped by the artist's hand.",
  },
  {
    id: "2",
    name: "Linen Throw Blanket",
    category: "Textiles",
    price: 135,
    rating: 4.8,
    reviewCount: 189,
    image: "https://www.linenme.com/sites/default/files/products/08917.jpg",
    badge: "New",
    description:
      "Woven from 100% European flax linen. Naturally temperature-regulating and gets softer with every wash.",
  },
  {
    id: "3",
    name: "Walnut Side Table",
    category: "Furniture",
    price: 349,
    originalPrice: 420,
    rating: 4.7,
    reviewCount: 97,
    image: "https://assets.rjimgs.com/rjimgs/ab/images/dp/wcm/202608/0002/bilquist-side-table-2-o.jpg",
    badge: "Sale",
    description:
      "Solid American black walnut with hand-rubbed oil finish. Mortise-and-tenon joinery built to last generations.",
  },
  {
    id: "4",
    name: "Brass Desk Lamp",
    category: "Lighting",
    price: 195,
    rating: 4.9,
    reviewCount: 312,
    image: "https://marketbymodernnest.com/cdn/shop/products/EnglishCountry_209_1024x.jpg?v=1678316361",
    description:
      "Articulated arm with a spun brass shade. Warm 2700K LED included. Weighted cast-iron base.",
  },
  {
    id: "5",
    name: "Merino Wool Cushion",
    category: "Textiles",
    price: 78,
    originalPrice: 95,
    rating: 4.6,
    reviewCount: 143,
    image: "https://cb2.scene7.com/is/image/CB2/AdleyChcGyMrnWlPllwCvr20SHF25?$web_pdp_main_carousel_med$",
    badge: "Sale",
    description:
      "Filled with ethically sourced merino wool. Cover is removable and machine washable.",
  },
  {
    id: "6",
    name: "Smoked Glass Carafe",
    category: "Kitchen",
    price: 64,
    rating: 4.8,
    reviewCount: 256,
    image: "http://casaamarosa.com/cdn/shop/files/3f6048d6-ac65-4c50-bc1f-1e7cb07563f8.webp?v=1739945721&width=2048",
    badge: "New",
    description:
      "Mouth-blown borosilicate glass with a hand-cut stopper. Holds 1.2 liters. Dishwasher safe.",
  },
];

const collections = [
  {
    id: "c1",
    title: "The Living Room Edit",
    count: 42,
    image: "https://thepageedit.com/wp-content/uploads/2021/03/27DBF60E-002A-4DE6-A28B-80FCB6780E95-scaled.jpg",
    accent: "bg-amber-50",
  },
  {
    id: "c2",
    title: "Kitchen Essentials",
    count: 31,
    image: "https://thepageedit.com/wp-content/uploads/2021/03/27DBF60E-002A-4DE6-A28B-80FCB6780E95-scaled.jpg",
    accent: "bg-indigo-50",
  },
  {
    id: "c3",
    title: "Bedroom Sanctuary",
    count: 28,
    image: "https://cdn.loveandlemons.com/wp-content/uploads/opengraph/2013/12/kitchengiftguide.jpg",
    accent: "bg-rose-50",
  },
];

const testimonials = [
  {
    id: "t1",
    name: "Mara Jensen",
    location: "Portland, OR",
    rating: 5,
    text: "The ceramic vase arrived beautifully packaged and looks even better in person. The craftsmanship is exceptional — you can feel the care that went into making it.",
    product: "Arc Ceramic Vase",
    avatar: "https://www.ageist.com/wp-content/uploads/2024/05/IMG_5448-683x1024.jpg",
  },
  {
    id: "t2",
    name: "Theo Nakamura",
    location: "Brooklyn, NY",
    rating: 5,
    text: "I've been searching for a linen blanket that actually feels luxurious without being fussy. This is it. The weight is perfect and it photographs beautifully.",
    product: "Linen Throw Blanket",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
  },
  {
    id: "t3",
    name: "Sofia Reyes",
    location: "Austin, TX",
    rating: 5,
    text: "The walnut side table is a work of art. Solid, beautifully finished, and the joinery is immaculate. Worth every penny and then some.",
    product: "Walnut Side Table",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
  },
];

const categories = ["All", "Home Decor", "Textiles", "Furniture", "Lighting", "Kitchen"];

const perks = [
  { icon: Truck, title: "Free Shipping", desc: "On all orders over $75" },
  { icon: RefreshCw, title: "Easy Returns", desc: "30-day hassle-free returns" },
  { icon: Shield, title: "Secure Checkout", desc: "256-bit SSL encryption" },
  { icon: Check, title: "Quality Guarantee", desc: "Curated for lasting quality" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${
            size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"
          } ${
            star <= Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "fill-slate-200 text-slate-200"
          }`}
        />
      ))}
    </div>
  );
}

function BadgePill({ label }: { label: string }) {
  const colorMap: Record<string, string> = {
    "Best Seller": "bg-amber-100 text-amber-800",
    New: "bg-emerald-100 text-emerald-800",
    Sale: "bg-rose-100 text-rose-800",
  };
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold tracking-wide ${
        colorMap[label] ?? "bg-slate-100 text-slate-700"
      }`}
    >
      {label}
    </span>
  );
}

function ProductCard({
  product,
  onAddToCart,
  onQuickView,
}: {
  product: Product;
  onAddToCart: (p: Product) => void;
  onQuickView: (p: Product) => void;
}) {
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.div
      variants={scaleIn}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-stone-100 aspect-[4/3]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "https://placehold.co/400x300/f1f5f9/94a3b8?text=Image";
          }}
        />
        {/* Overlay actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        <button
          onClick={() => setWishlisted((w) => !w)}
          aria-label="Wishlist"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:scale-110 active:scale-95"
        >
          <Heart
            className={`w-4 h-4 ${
              wishlisted ? "fill-rose-500 text-rose-500" : "text-slate-500"
            }`}
          />
        </button>
        <button
          onClick={() => onQuickView(product)}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-white/95 backdrop-blur-sm text-slate-800 text-xs font-semibold rounded-full shadow-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200 whitespace-nowrap"
        >
          Quick View
        </button>
        {product.badge && (
          <div className="absolute top-3 left-3">
            <BadgePill label={product.badge} />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">
          {product.category}
        </p>
        <h3 className="text-sm font-semibold text-slate-900 mb-1 leading-snug">
          {product.name}
        </h3>
        <div className="flex items-center gap-1.5 mb-3">
          <StarRating rating={product.rating} />
          <span className="text-xs text-slate-400">({product.reviewCount})</span>
        </div>
        <div className="flex items-center gap-2 mb-4 mt-auto">
          <span className="text-base font-bold text-slate-900">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-slate-400 line-through">${product.originalPrice}</span>
          )}
        </div>
        <button
          onClick={handleAdd}
          className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
            added
              ? "bg-emerald-500 text-white"
              : "bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95"
          }`}
        >
          {added ? (
            <><Check className="w-4 h-4" /> Added!</>
          ) : (
            <><ShoppingBag className="w-4 h-4" /> Add to Cart</>
          )}
        </button>
      </div>
    </motion.div>
  );
}

function QuickViewModal({
  product,
  onClose,
  onAddToCart,
}: {
  product: Product;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
}) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 16 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-video bg-stone-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "https://placehold.co/600x400/f1f5f9/94a3b8?text=Image";
            }}
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm hover:bg-white transition-colors"
            aria-label="Close"
          >
            <span className="text-slate-600 text-lg leading-none">&times;</span>
          </button>
          {product.badge && (
            <div className="absolute top-3 left-3">
              <BadgePill label={product.badge} />
            </div>
          )}
        </div>
        <div className="p-6">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">
            {product.category}
          </p>
          <h2 className="text-xl font-bold text-slate-900 mb-2">{product.name}</h2>
          <div className="flex items-center gap-2 mb-3">
            <StarRating rating={product.rating} size="md" />
            <span className="text-sm text-slate-500">{product.rating} · {product.reviewCount} reviews</span>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">{product.description}</p>
          <div className="flex items-center gap-3 mb-5">
            <span className="text-2xl font-bold text-slate-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-base text-slate-400 line-through">${product.originalPrice}</span>
            )}
          </div>
          <button
            onClick={handleAdd}
            className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
              added
                ? "bg-emerald-500 text-white"
                : "bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95"
            }`}
          >
            {added ? (
              <><Check className="w-4 h-4" /> Added to Cart!</>
            ) : (
              <><ShoppingBag className="w-4 h-4" /> Add to Cart</>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cartCount, setCartCount] = useState(0);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const handleAddToCart = (p: Product) => {
    setCartCount((c) => c + 1);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <>
      {/* ── Promo Banner ── */}
      <div className="bg-indigo-600 text-white text-center py-2.5 px-4 text-sm font-medium">
        <span>✨ Free shipping on orders over $75 — </span>
        <a href="#products" className="underline underline-offset-2 hover:text-indigo-200 transition-colors">
          Shop now
        </a>
      </div>

      {/* ── Hero ── */}
      <section className="relative min-h-[92vh] flex items-center bg-gradient-to-br from-stone-50 via-white to-indigo-50 overflow-hidden pt-16">
        {/* Decorative blobs */}
        <div className="absolute top-1/4 right-0 w-[480px] h-[480px] bg-indigo-100/60 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[320px] h-[320px] bg-amber-100/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-700 text-xs font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              New arrivals for 2025
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.05] tracking-tight mb-6"
            >
              Objects worth
              <span className="block text-indigo-600">living with.</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-slate-500 leading-relaxed mb-8 max-w-md"
            >
              Thoughtfully designed pieces for modern homes. Each product is curated for quality, beauty, and lasting value.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
              <a
                href="#products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 active:scale-95 transition-all duration-200 shadow-sm shadow-indigo-200"
              >
                Shop the Collection
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#collections"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 active:scale-95 transition-all duration-200"
              >
                Browse Collections
              </a>
            </motion.div>

            {/* Social proof */}
            <motion.div variants={fadeInUp} className="flex items-center gap-4 mt-10">
              <div className="flex -space-x-2">
                {[
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Loved by 12,000+ customers</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — hero image grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="hidden lg:grid grid-cols-2 gap-4"
          >
            {products.slice(0, 4).map((p, i) => (
              <motion.div
                key={p.id}
                variants={scaleIn}
                className={`rounded-2xl overflow-hidden bg-stone-100 ${
                  i === 0 ? "row-span-2 aspect-[3/4]" : "aspect-square"
                }`}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "https://placehold.co/400x400/f1f5f9/94a3b8?text=Image";
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Perks Bar ── */}
      <section className="bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {perks.map((perk) => (
              <div key={perk.title} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                  <perk.icon className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{perk.title}</p>
                  <p className="text-xs text-slate-500">{perk.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Products ── */}
      <section id="products" className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <motion.p variants={fadeInUp} className="text-indigo-600 text-sm font-semibold uppercase tracking-widest mb-2">
              Our Products
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Curated with care
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-500 max-w-xl mx-auto">
              Every item in our collection is selected for its quality, design, and the story behind it.
            </motion.p>
          </motion.div>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </motion.div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              <p className="text-lg">No products in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Collections ── */}
      <section id="collections" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <motion.p variants={fadeInUp} className="text-indigo-600 text-sm font-semibold uppercase tracking-widest mb-2">
              Collections
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-slate-900">
              Shop by room
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {collections.map((col) => (
              <motion.a
                key={col.id}
                href="#products"
                variants={scaleIn}
                className={`group relative rounded-2xl overflow-hidden aspect-[4/3] ${col.accent} flex items-end p-6 cursor-pointer`}
              >
                <img
                  src={col.image}
                  alt={col.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="relative">
                  <p className="text-xs text-white/70 font-medium mb-1">{col.count} products</p>
                  <h3 className="text-lg font-bold text-white">{col.title}</h3>
                  <div className="flex items-center gap-1 text-white/80 text-sm mt-1 group-hover:gap-2 transition-all">
                    Shop now <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Sale Banner ── */}
      <section className="bg-indigo-600 py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.p variants={fadeInUp} className="text-indigo-200 text-sm font-semibold uppercase tracking-widest mb-3">
              Limited Time
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Up to 30% off select items
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-indigo-200 mb-8">
              Our seasonal sale ends soon. Don't miss out on these curated pieces at exceptional prices.
            </motion.p>
            <motion.a
              variants={fadeInUp}
              href="#products"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-indigo-50 active:scale-95 transition-all duration-200 shadow-sm"
            >
              Shop the Sale
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <motion.p variants={fadeInUp} className="text-indigo-600 text-sm font-semibold uppercase tracking-widest mb-2">
              Reviews
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-slate-900">
              What our customers say
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.id}
                variants={fadeInUp}
                className="bg-white rounded-2xl p-6 shadow-sm flex flex-col"
              >
                <StarRating rating={t.rating} />
                <p className={`mt-4 leading-relaxed flex-1 ${
                  t.name === "Mara Jensen"
                    ? "text-lg text-indigo-600"
                    : "text-sm text-slate-600"
                }`}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 mt-5 pt-5 border-t border-slate-100">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover bg-stone-100"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://placehold.co/40x40/f1f5f9/94a3b8?text=" + t.name[0];
                    }}
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.location} · {t.product}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center mx-auto mb-5">
              <Sparkles className="w-6 h-6 text-indigo-600" />
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
              Stay in the loop
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-500 mb-8">
              New arrivals, design stories, and exclusive offers — delivered to your inbox.
            </motion.p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-50 text-emerald-700 font-semibold rounded-xl border border-emerald-200"
              >
                <Check className="w-5 h-5" />
                You're subscribed!
              </motion.div>
            ) : (
              <motion.form
                variants={fadeInUp}
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 active:scale-95 transition-all duration-200 text-sm whitespace-nowrap"
                >
                  Subscribe
                </button>
              </motion.form>
            )}

            <motion.p variants={fadeInUp} className="text-xs text-slate-400 mt-4">
              No spam, ever. Unsubscribe at any time.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Quick View Modal ── */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </>
  );
}
