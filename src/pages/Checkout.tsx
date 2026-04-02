import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Check } from "lucide-react";

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const [step, setStep] = useState<"address" | "payment" | "confirmed">("address");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const tax = total * 0.08;
  const grandTotal = total + tax;

  if (items.length === 0 && step !== "confirmed") {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold">Your cart is empty</h1>
          <Button className="mt-4" asChild><Link to="/products">Shop Now</Link></Button>
        </div>
      </Layout>
    );
  }

  if (step === "confirmed") {
    return (
      <Layout>
        <div className="container py-20 text-center max-w-lg mx-auto animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-success" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-1">Thank you for your purchase.</p>
          <p className="text-sm text-muted-foreground mb-6">Order #SW-{Math.random().toString(36).substr(2, 8).toUpperCase()}</p>
          <div className="flex gap-3 justify-center">
            <Button asChild><Link to="/orders">View Orders</Link></Button>
            <Button variant="outline" asChild><Link to="/">Continue Shopping</Link></Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-6 max-w-4xl">
        <h1 className="text-2xl font-bold text-foreground mb-6">Checkout</h1>

        {/* Steps indicator */}
        <div className="flex items-center gap-2 mb-8">
          {["Address", "Payment"].map((s, i) => {
            const isActive = (i === 0 && step === "address") || (i === 1 && step === "payment");
            const isDone = (i === 0 && step === "payment");
            return (
              <div key={s} className="flex items-center gap-2">
                {i > 0 && <div className={`w-12 h-0.5 ${isDone || isActive ? "bg-primary" : "bg-border"}`} />}
                <div className={`flex items-center gap-1.5 text-sm font-medium ${isActive ? "text-primary" : isDone ? "text-success" : "text-muted-foreground"}`}>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${isActive ? "bg-primary text-primary-foreground" : isDone ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"}`}>
                    {isDone ? "✓" : i + 1}
                  </span>
                  {s}
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {step === "address" && (
              <div className="bg-card border border-border rounded-lg p-5 space-y-4 animate-fade-in">
                <h2 className="text-lg font-semibold text-card-foreground">Shipping Address</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  <input placeholder="First Name" className="border border-border rounded-md px-3 py-2 text-sm bg-card text-card-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
                  <input placeholder="Last Name" className="border border-border rounded-md px-3 py-2 text-sm bg-card text-card-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
                <input placeholder="Address Line 1" className="w-full border border-border rounded-md px-3 py-2 text-sm bg-card text-card-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
                <input placeholder="Address Line 2 (optional)" className="w-full border border-border rounded-md px-3 py-2 text-sm bg-card text-card-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
                <div className="grid sm:grid-cols-3 gap-3">
                  <input placeholder="City" className="border border-border rounded-md px-3 py-2 text-sm bg-card text-card-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
                  <input placeholder="State" className="border border-border rounded-md px-3 py-2 text-sm bg-card text-card-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
                  <input placeholder="ZIP Code" className="border border-border rounded-md px-3 py-2 text-sm bg-card text-card-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
                <input placeholder="Phone Number" className="w-full border border-border rounded-md px-3 py-2 text-sm bg-card text-card-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
                <Button className="w-full" onClick={() => setStep("payment")}>Continue to Payment</Button>
              </div>
            )}

            {step === "payment" && (
              <div className="bg-card border border-border rounded-lg p-5 space-y-4 animate-fade-in">
                <h2 className="text-lg font-semibold text-card-foreground">Payment Method</h2>
                <div className="space-y-2">
                  {[
                    { id: "card", label: "Credit / Debit Card" },
                    { id: "upi", label: "UPI Payment" },
                    { id: "cod", label: "Cash on Delivery" },
                  ].map(m => (
                    <label
                      key={m.id}
                      className={`flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer transition-colors ${paymentMethod === m.id ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/30"}`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={m.id}
                        checked={paymentMethod === m.id}
                        onChange={() => setPaymentMethod(m.id)}
                        className="accent-primary"
                      />
                      <span className="text-sm font-medium text-card-foreground">{m.label}</span>
                    </label>
                  ))}
                </div>

                {paymentMethod === "card" && (
                  <div className="space-y-3 pt-2">
                    <input placeholder="Card Number" className="w-full border border-border rounded-md px-3 py-2 text-sm bg-card text-card-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
                    <div className="grid grid-cols-2 gap-3">
                      <input placeholder="MM/YY" className="border border-border rounded-md px-3 py-2 text-sm bg-card text-card-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
                      <input placeholder="CVV" className="border border-border rounded-md px-3 py-2 text-sm bg-card text-card-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-2">
                  <ShieldCheck className="h-4 w-4 text-success" />
                  Your payment is secure and encrypted
                </div>

                <div className="flex gap-3 pt-2">
                  <Button variant="outline" onClick={() => setStep("address")}>Back</Button>
                  <Button className="flex-1" onClick={() => { clear(); setStep("confirmed"); }}>
                    Place Order — ${grandTotal.toFixed(2)}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="bg-card border border-border rounded-lg p-5 h-fit sticky top-32">
            <h3 className="text-sm font-semibold text-card-foreground mb-3">Order Summary</h3>
            <div className="space-y-2 text-sm">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex justify-between text-muted-foreground">
                  <span className="line-clamp-1 flex-1">{product.title} ×{quantity}</span>
                  <span>${(product.price * quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t border-border pt-2 space-y-1">
                <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Shipping</span><span className="text-success">FREE</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
              </div>
              <div className="border-t border-border pt-2 flex justify-between font-bold text-foreground">
                <span>Total</span><span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
