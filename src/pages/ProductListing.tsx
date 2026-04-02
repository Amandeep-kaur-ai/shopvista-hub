import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProductListingPage() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "";
  const searchQuery = searchParams.get("q") || "";
  const [sortBy, setSortBy] = useState("popularity");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];
    if (categoryParam) result = result.filter(p => p.category === categoryParam);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (minRating > 0) result = result.filter(p => p.rating >= minRating);

    switch (sortBy) {
      case "price-low": result.sort((a, b) => a.price - b.price); break;
      case "price-high": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "newest": result.sort((a, b) => b.id - a.id); break;
      default: result.sort((a, b) => b.reviews - a.reviews);
    }
    return result;
  }, [categoryParam, searchQuery, sortBy, priceRange, minRating]);

  const activeCat = categories.find(c => c.slug === categoryParam);

  return (
    <Layout>
      <div className="container py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <span className="text-foreground font-medium">{activeCat?.name || "All Products"}</span>
        </nav>

        <div className="flex gap-6">
          {/* Desktop sidebar filters */}
          <aside className={`w-60 flex-shrink-0 hidden lg:block`}>
            <FilterPanel
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              minRating={minRating}
              setMinRating={setMinRating}
              categoryParam={categoryParam}
            />
          </aside>

          {/* Main content */}
          <div className="flex-1">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="h-4 w-4 mr-1" /> Filters
                </Button>
                <p className="text-sm text-muted-foreground">{filtered.length} results</p>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-border rounded-md px-3 py-1.5 bg-card text-card-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value="popularity">Sort: Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Avg. Rating</option>
                <option value="newest">Newest First</option>
              </select>
            </div>

            {/* Mobile filters */}
            {showFilters && (
              <div className="lg:hidden mb-4 p-4 bg-card border border-border rounded-lg animate-fade-in">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-sm">Filters</span>
                  <button onClick={() => setShowFilters(false)}><X className="h-4 w-4" /></button>
                </div>
                <FilterPanel
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  minRating={minRating}
                  setMinRating={setMinRating}
                  categoryParam={categoryParam}
                />
              </div>
            )}

            {/* Product grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20 text-muted-foreground">
                <p className="text-lg font-medium">No products found</p>
                <p className="text-sm mt-1">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

function FilterPanel({
  priceRange, setPriceRange, minRating, setMinRating, categoryParam
}: {
  priceRange: [number, number];
  setPriceRange: (v: [number, number]) => void;
  minRating: number;
  setMinRating: (v: number) => void;
  categoryParam: string;
}) {
  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-2">Category</h3>
        <div className="space-y-1">
          <Link
            to="/products"
            className={`block text-sm py-1 px-2 rounded ${!categoryParam ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground"}`}
          >
            All Categories
          </Link>
          {categories.map(cat => (
            <Link
              key={cat.slug}
              to={`/products?category=${cat.slug}`}
              className={`block text-sm py-1 px-2 rounded ${categoryParam === cat.slug ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground"}`}
            >
              {cat.icon} {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-2">Price Range</h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
            className="w-20 text-sm border border-border rounded px-2 py-1 bg-card text-card-foreground"
            placeholder="Min"
          />
          <span className="text-muted-foreground">–</span>
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
            className="w-20 text-sm border border-border rounded px-2 py-1 bg-card text-card-foreground"
            placeholder="Max"
          />
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-2">Min Rating</h3>
        <div className="space-y-1">
          {[4, 3, 2, 1].map(r => (
            <button
              key={r}
              onClick={() => setMinRating(minRating === r ? 0 : r)}
              className={`flex items-center gap-1 text-sm py-1 px-2 rounded w-full text-left ${minRating === r ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"}`}
            >
              {"★".repeat(r)}{"☆".repeat(5 - r)} & up
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
