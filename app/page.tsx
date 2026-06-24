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
    text: "I've bought furniture from a dozen places online. Nothing compares to the quality of the walnut table. Solid, beautiful, and the finish is flawless.",
    product: "Walnut Side Table",
    avatar: "https://i.scdn.co/image/ab67616d00001e0269e7e306e623b22f1aad772d",
  },
  {
    id: "t3",
    name: "Sofia Reyes",
    location: "Austin, TX",
    rating: 5,
    text: "Lumière has completely changed how I think about decorating. Every piece feels intentional. The linen blanket is my most-used item in the house.",
    product: "Linen Throw Blanket",
    avatar: "https://www.bmi.com/images/news/2023/_770/Latin-Spotlight-Sofia-Reyes.jpg",
  },
];

const valueProps = [
  {
    icon: Truck,
    title: "Free Shipping Over $150",
    description: "Complimentary delivery on all orders above $150. Express options available at checkout.",
  },
  {
    icon: RefreshCw,
    title: "30-Day Returns",
    description: "Not in love with your purchase? Return it within 30 days for a full refund, no questions asked.",
  },
  {
    icon: Shield,
    title: "Lifetime Guarantee",
    description: "Every piece is backed by our craftsmanship guarantee. We stand behind what we sell.",
  },
  {
    icon: Heart,
    title: "Ethically Sourced",
    description: "We partner only with makers who pay fair wages and use sustainable materials.",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const badgeColors: Record<string, string> = {
  "Best Seller": "bg-amber-100 text-amber-800",
  New: "bg-indigo-100 text-indigo-700",
  Sale: "bg-rose-100 text-rose-700",
};

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${
              i < Math.floor(rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-slate-200 text-slate-200"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-slate-500">
        {rating.toFixed(1)} ({count})
      </span>
    </div>
  );
}

const cardHover: Variants = {
  rest: { y: 0, boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px -4px rgba(0,0,0,0.08)" },
  hover: { y: -6, boxShadow: "0 4px 8px rgba(0,0,0,0.06), 0 20px 40px -12px rgba(0,0,0,0.16)" },
};

function ProductCard({ product }: { product: Product }) {
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.div
      variants={scaleIn}
      initial="rest"
      whileHover="hover"
      animate="rest"
      custom={cardHover}
      className="group bg-white rounded-2xl overflow-hidden border border-black/5 cursor-pointer"
      style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px -4px rgba(0,0,0,0.08)" }}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-slate-50 aspect-[4/3]">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80";
          }}
        />
        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${
              badgeColors[product.badge] ?? "bg-slate-100 text-slate-700"
            }`}
          >
            {product.badge}
          </span>
        )}
        <button
          onClick={() => setWished((w) => !w)}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 active:scale-95"
        >
          <Heart
            className={`w-4 h-4 transition-colors duration-200 ${
              wished ? "fill-rose-500 text-rose-500" : "text-slate-400"
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs font-medium text-indigo-600 uppercase tracking-wider mb-1">
          {product.category}
        </p>
        <h3 className="text-sm font-semibold text-slate-900 mb-1 leading-snug">
          {product.name}
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">
          {product.description}
        </p>
        <StarRating rating={product.rating} count={product.reviewCount} />

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-slate-900">
              ${product.price}
            </span>
            {product.originalPrice != null && (
              <span className="text-sm text-slate-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <motion.button
            onClick={handleAdd}
            whileTap={{ scale: 0.93 }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
              added
                ? "bg-emerald-500 text-white"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" /> Added
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" /> Add
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center bg-slate-50 overflow-hidden">
        {/* Subtle radial glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 60% 50%, rgba(99,102,241,0.08) 0%, transparent 70%)",
          }}
        />
        {/* Faint grid texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: copy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold tracking-wide mb-6"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {APP_TAGLINE}
            </motion.span>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.05] text-balance mb-6"
            >
              Objects worth
              <br />
              <span className="text-indigo-600">living with.</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-slate-600 leading-relaxed max-w-md mb-8 text-pretty"
            >
              {APP_NAME} brings together the world's finest independent makers.
              Every piece is chosen for its craft, its story, and its ability to
              make a home feel more like itself.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-3"
            >
              <Link
                href="#products"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#products")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 active:scale-95 transition-all duration-200 shadow-[0_2px_8px_rgba(99,102,241,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              >
                Shop the Collection
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#about")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              >
                Our Story
              </Link>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-6 mt-10 pt-8 border-t border-slate-200 w-full"
            >
              {[
                { value: "4,200+", label: "Happy customers" },
                { value: "180+", label: "Curated pieces" },
                { value: "4.9", label: "Average rating" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-slate-900 tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: hero image mosaic */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            className="relative hidden lg:grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden aspect-[3/4] shadow-[0_4px_24px_-8px_rgba(0,0,0,0.18)]">
                <img
                  src="https://thearcshop.com/cdn/shop/products/the-arc-vintage-56_530x@2x.jpg?v=1617828077"
                  alt="Arc Ceramic Vase"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600&q=80";
                  }}
                />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-square shadow-[0_4px_24px_-8px_rgba(0,0,0,0.18)]">
                <img
                  src="http://casaamarosa.com/cdn/shop/files/3f6048d6-ac65-4c50-bc1f-1e7cb07563f8.webp?v=1739945721&width=2048"
                  alt="Smoked Glass Carafe"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80";
                  }}
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="rounded-2xl overflow-hidden aspect-square shadow-[0_4px_24px_-8px_rgba(0,0,0,0.18)]">
                <img
                  src="https://marketbymodernnest.com/cdn/shop/products/EnglishCountry_209_1024x.jpg?v=1678316361"
                  alt="Brass Desk Lamp"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80";
                  }}
                />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-[3/4] shadow-[0_4px_24px_-8px_rgba(0,0,0,0.18)]">
                <img
                  src="https://www.linenme.com/sites/default/files/products/08917.jpg"
                  alt="Linen Throw Blanket"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80";
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Value Props ──────────────────────────────────────────────────── */}
      <section className="bg-white border-y border-slate-100">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {valueProps.map((vp) => (
            <motion.div
              key={vp.title}
              variants={fadeInUp}
              className="flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                <vp.icon className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-1">
                  {vp.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {vp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Featured Products ────────────────────────────────────────────── */}
      <section id="products" className="bg-slate-50 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
          >
            <div>
              <motion.p
                variants={fadeInUp}
                className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-2"
              >
                Handpicked for you
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="text-4xl font-bold tracking-tight text-slate-900 text-balance"
              >
                Featured Pieces
              </motion.h2>
            </div>
            <motion.div variants={fadeInUp}>
              <Link
                href="#products"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors duration-200 group"
              >
                View all
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Collections ──────────────────────────────────────────────────── */}
      <section id="collections" className="bg-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-12"
          >
            <motion.p
              variants={fadeInUp}
              className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-2"
            >
              Shop by room
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-bold tracking-tight text-slate-900 text-balance"
            >
              Curated Collections
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {collections.map((col, i) => (
              <motion.div
                key={col.id}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={`relative rounded-2xl overflow-hidden cursor-pointer group ${
                  i === 0 ? "md:row-span-2 md:col-span-1" : ""
                }`}
                style={{
                  boxShadow:
                    "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px -8px rgba(0,0,0,0.12)",
                }}
              >
                <div
                  className={`relative overflow-hidden ${
                    i === 0 ? "aspect-[3/4]" : "aspect-[4/3]"
                  }`}
                >
                  <img
                    src={col.image}
                    alt={col.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      const fallbacks = [
                        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
                        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
                        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80",
                      ];
                      (e.currentTarget as HTMLImageElement).src =
                        fallbacks[i] ?? fallbacks[0];
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-xs font-medium text-white/70 mb-1">
                      {col.count} pieces
                    </p>
                    <h3 className="text-xl font-bold text-white leading-tight mb-3">
                      {col.title}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white group-hover:gap-2.5 transition-all duration-200">
                      Explore
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── About / Brand Story ──────────────────────────────────────────── */}
      <section id="about" className="bg-slate-900 py-24 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image side */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-[0_8px_48px_-12px_rgba(0,0,0,0.5)]">
                <img
                  src="https://artisansaloeuvre.com/wp-content/uploads/2022/01/mf-9004-1024x734.jpg"
                  alt="Artisan at work in their studio"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80";
                  }}
                />
              </div>
              {/* Floating stat card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-5 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.25)]"
              >
                <p className="text-3xl font-bold text-slate-900">60+</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Independent makers
                </p>
                <p className="text-xs text-slate-400">across 18 countries</p>
              </motion.div>
            </motion.div>

            {/* Copy side */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <motion.p
                variants={fadeInUp}
                className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4"
              >
                Our story
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="text-4xl font-bold tracking-tight text-white text-balance mb-6"
              >
                Made by hands that care about what they make.
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-slate-400 leading-relaxed mb-4 text-pretty"
              >
                {APP_NAME} started with a simple frustration: beautiful,
                well-made objects were hard to find in one place. We spent two
                years traveling to studios, workshops, and small factories to
                find the makers who still do things the slow way.
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="text-slate-400 leading-relaxed mb-8 text-pretty"
              >
                Today we work with over 60 independent artisans across 18
                countries. Every product on Lumière has been held, tested, and
                approved by our team before it reaches your home.
              </motion.p>

              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-2 gap-4 mb-8"
              >
                {[
                  "Vetted by our team in person",
                  "Fair-trade partnerships",
                  "Sustainable packaging",
                  "Carbon-neutral shipping",
                ].map((item) => (
                  <motion.div
                    key={item}
                    variants={fadeInUp}
                    className="flex items-center gap-2.5"
                  >
                    <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-indigo-400" />
                    </div>
                    <span className="text-sm text-slate-300">{item}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Link
                  href="#products"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .querySelector("#products")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 active:scale-95 transition-all duration-200 shadow-[0_2px_8px_rgba(99,102,241,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                >
                  Shop the Collection
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <motion.p
              variants={fadeInUp}
              className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-2"
            >
              Customer love
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-bold tracking-tight text-slate-900 text-balance"
            >
              What our customers say
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.id}
                variants={scaleIn}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="bg-white rounded-2xl p-6 border border-black/5"
                style={{
                  boxShadow:
                    "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px -8px rgba(0,0,0,0.10)",
                }}
              >
                <div className="flex items-center gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed mb-5 text-pretty">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-9 h-9 rounded-full overflow-hidden bg-indigo-100 shrink-0">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display =
                          "none";
                      }}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {t.name}
                    </p>
                    <p className="text-xs text-slate-500">{t.location}</p>
                  </div>
                  <span className="ml-auto text-xs text-indigo-600 font-medium bg-indigo-50 px-2 py-0.5 rounded-full">
                    {t.product}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────────── */}
      <section className="bg-indigo-600 py-20 md:py-24 relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(255,255,255,0.08) 0%, transparent 70%)",
          }}
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-4xl sm:text-5xl font-bold tracking-tight text-white text-balance mb-4"
          >
            Your home deserves better.
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-indigo-200 text-lg leading-relaxed mb-8 text-pretty"
          >
            Join over 4,200 customers who have discovered the difference that
            thoughtfully made objects bring to everyday life.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              href="#products"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#products")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-indigo-50 active:scale-95 transition-all duration-200 shadow-[0_2px_12px_rgba(0,0,0,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-600"
            >
              Shop Now
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#collections"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#collections")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-indigo-700/50 text-white font-semibold rounded-xl border border-white/20 hover:bg-indigo-700/70 active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-600"
            >
              Browse Collections
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}