import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import { ChevronRight } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";
import heroBanner2 from "@/assets/hero-banner-2.jpg";
import { useState, useEffect } from "react";

function HeroBanner() {
  const banners = [heroBanner, heroBanner2];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent(i => (i + 1) % banners.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden bg-nav">
      <img
        src={banners[current]}
        alt="Promotional banner"
        className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover transition-opacity duration-500"
        width={1920}
        height={600}
      />
      {/* Fade gradient at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? "bg-primary" : "bg-card/50"}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function CategorySection() {
  return (
    <section className="container py-8">
      <h2 className="text-xl font-bold text-foreground mb-4">Shop by Category</h2>
      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-3">
        {categories.map(cat => (
          <Link
            key={cat.slug}
            to={`/products?category=${cat.slug}`}
            className="flex flex-col items-center gap-2 p-3 rounded-lg bg-card border border-border hover:border-primary hover:shadow-md transition-all group"
          >
            <span className="text-3xl group-hover:scale-110 transition-transform">{cat.icon}</span>
            <span className="text-xs font-medium text-card-foreground text-center">{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function DealsSection() {
  const deals = products.filter(p => p.badge?.includes("Deal"));

  return (
    <section className="container py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground">Deals of the Day</h2>
        <Link to="/products" className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
          See all <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {deals.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

function RecommendedSection() {
  const recommended = products.filter(p => !p.badge?.includes("Deal")).slice(0, 8);

  return (
    <section className="container py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground">Recommended for You</h2>
        <Link to="/products" className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
          See all <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {recommended.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <Layout>
      <HeroBanner />
      <CategorySection />
      <DealsSection />
      <RecommendedSection />
    </Layout>
  );
}
