import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, count } = useCart();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Looks like you haven't added any items yet.</p>
          <Button asChild>
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const tax = total * 0.08;
  const grandTotal = total + tax;

  return (
    <Layout>
      <div className="container py-6">
        <h1 className="text-2xl font-bold text-foreground mb-6">Shopping Cart ({count} items)</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-4 bg-card border border-border rounded-lg p-4 animate-fade-in">
                <Link to={`/product/${product.id}`} className="w-24 h-24 flex-shrink-0 rounded overflow-hidden bg-secondary/50">
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover" loading="lazy" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${product.id}`} className="text-sm font-medium text-card-foreground hover:text-primary line-clamp-2">
                    {product.title}
                  </Link>
                  <p className="text-xs text-muted-foreground mt-0.5">{product.brand}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-bold text-card-foreground">${product.price.toFixed(2)}</span>
                    <span className="text-xs text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center border border-border rounded">
                      <button onClick={() => updateQuantity(product.id, quantity - 1)} className="p-1 hover:bg-secondary transition-colors">
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="px-3 text-sm font-medium border-x border-border">{quantity}</span>
                      <button onClick={() => updateQuantity(product.id, quantity + 1)} className="p-1 hover:bg-secondary transition-colors">
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(product.id)}
                      className="text-destructive text-xs flex items-center gap-1 hover:underline"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="bg-card border border-border rounded-lg p-5 h-fit sticky top-32">
            <h2 className="text-lg font-bold text-card-foreground mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal ({count} items)</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className="text-success font-medium">FREE</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between text-foreground font-bold text-base">
                <span>Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>
            <Button className="w-full mt-4" asChild>
              <Link to="/checkout">Proceed to Checkout</Link>
            </Button>
            <Link to="/products" className="block text-center text-sm text-primary mt-3 hover:underline">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
