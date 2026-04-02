import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";

function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map(i => (
          <Star
            key={i}
            className={`h-3.5 w-3.5 ${i <= Math.floor(rating) ? "fill-warning text-warning" : i - 0.5 <= rating ? "fill-warning/50 text-warning" : "text-muted-foreground/30"}`}
          />
        ))}
      </div>
      <span className="text-xs text-muted-foreground">({reviews.toLocaleString()})</span>
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  return (
    <div className="group bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all duration-200 animate-fade-in flex flex-col">
      {/* Image */}
      <Link to={`/product/${product.id}`} className="relative overflow-hidden aspect-square bg-secondary/50">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.badge && (
          <span className="absolute top-2 left-2 bg-deal text-deal-foreground text-[10px] font-bold px-2 py-0.5 rounded">
            {product.badge}
          </span>
        )}
      </Link>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1 gap-1.5">
        <Link to={`/product/${product.id}`} className="text-sm font-medium text-card-foreground line-clamp-2 hover:text-primary transition-colors">
          {product.title}
        </Link>

        <StarRating rating={product.rating} reviews={product.reviews} />

        <div className="flex items-baseline gap-2 mt-auto">
          <span className="text-lg font-bold text-card-foreground">${product.price.toFixed(2)}</span>
          <span className="text-xs text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
          <span className="text-xs font-semibold text-success">{discount}% off</span>
        </div>

        <Button
          size="sm"
          className="mt-2 w-full"
          onClick={(e) => {
            e.preventDefault();
            addItem(product);
          }}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export { StarRating };
