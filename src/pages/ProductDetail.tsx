import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ProductCard, StarRating } from "@/components/ProductCard";
import { products } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Truck, RotateCcw, Check } from "lucide-react";
import { toast } from "sonner";

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <Link to="/products" className="text-primary mt-4 inline-block hover:underline">Browse products</Link>
        </div>
      </Layout>
    );
  }

  const discount = Math.round((1 - product.price / product.originalPrice) * 100);
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`Added ${quantity}x "${product.title}" to cart`);
  };

  return (
    <Layout>
      <div className="container py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to={`/products?category=${product.category}`} className="hover:text-primary capitalize">{product.category}</Link>
          <span>/</span>
          <span className="text-foreground line-clamp-1">{product.title}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Images */}
          <div className="space-y-3">
            <div className="aspect-square bg-card border border-border rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 cursor-zoom-in"
              />
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4">
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">{product.title}</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Brand: <span className="text-primary font-medium">{product.brand}</span></span>
            </div>

            <StarRating rating={product.rating} reviews={product.reviews} />

            <div className="border-t border-b border-border py-4 space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-sm text-muted-foreground">-{discount}%</span>
                <span className="text-2xl font-bold text-foreground">₹{product.price.toFixed(2)}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                M.R.P.: <span className="line-through">₹{product.originalPrice.toFixed(2)}</span>
              </p>
              {product.badge && (
                <span className="inline-block bg-deal text-deal-foreground text-xs font-bold px-2 py-0.5 rounded mt-1">{product.badge}</span>
              )}
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 py-3">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Truck className="h-4 w-4 text-primary" /> Free Delivery
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <RotateCcw className="h-4 w-4 text-primary" /> 7-Day Returns
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-primary" /> Secure Payment
              </div>
            </div>

            {/* Quantity & Cart */}
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-border rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-foreground hover:bg-secondary transition-colors"
                >-</button>
                <span className="px-4 py-2 border-x border-border text-sm font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-foreground hover:bg-secondary transition-colors"
                >+</button>
              </div>
              {product.inStock && (
                <span className="flex items-center gap-1 text-sm text-success font-medium">
                  <Check className="h-4 w-4" /> In Stock
                </span>
              )}
            </div>

            <div className="flex gap-3">
              <Button className="flex-1" onClick={handleAddToCart}>
                Add to Cart
              </Button>
              <Button variant="outline" className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground" asChild>
                <Link to="/cart">Buy Now</Link>
              </Button>
            </div>

            {/* Specs */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-foreground mb-2">Specifications</h3>
              <div className="bg-secondary/50 rounded-lg overflow-hidden">
                {Object.entries(product.specs).map(([key, value], i) => (
                  <div key={key} className={`flex text-sm ${i > 0 ? "border-t border-border" : ""}`}>
                    <span className="w-1/3 px-3 py-2 font-medium text-muted-foreground bg-secondary">{key}</span>
                    <span className="flex-1 px-3 py-2 text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold text-foreground mb-4">Related Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}
