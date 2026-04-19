import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Package, ChevronRight } from "lucide-react";

const mockOrders = [
  {
    id: "SW-A8F3K2",
    date: "March 28, 2026",
    total: 129.98,
    status: "Delivered",
    items: [
      { name: "Wireless Noise-Cancelling Headphones", qty: 1, price: 79.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop" },
      { name: "Portable Bluetooth Speaker", qty: 1, price: 49.99, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=80&h=80&fit=crop" },
    ],
  },
  {
    id: "SW-B7G9M1",
    date: "March 15, 2026",
    total: 299.99,
    status: "Shipped",
    items: [
      { name: "Smart Watch Ultra Series 5", qty: 1, price: 299.99, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop" },
    ],
  },
  {
    id: "SW-C2D5N8",
    date: "February 20, 2026",
    total: 89.99,
    status: "Delivered",
    items: [
      { name: "Running Shoes - Ultra Boost", qty: 1, price: 89.99, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&h=80&fit=crop" },
    ],
  },
];

const statusColor: Record<string, string> = {
  Delivered: "text-success",
  Shipped: "text-primary",
  Processing: "text-warning",
};

export default function OrdersPage() {
  return (
    <Layout>
      <div className="container py-6 max-w-4xl">
        <h1 className="text-2xl font-bold text-foreground mb-6">Your Orders</h1>

        <div className="space-y-4">
          {mockOrders.map(order => (
            <div key={order.id} className="bg-card border border-border rounded-lg overflow-hidden animate-fade-in">
              {/* Order header */}
              <div className="flex flex-wrap items-center justify-between gap-2 bg-secondary/50 px-5 py-3 text-sm">
                <div className="flex gap-6">
                  <div>
                    <span className="text-xs text-muted-foreground block">ORDER PLACED</span>
                    <span className="text-card-foreground">{order.date}</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">TOTAL</span>
                    <span className="text-card-foreground font-medium">₹{order.total.toFixed(2)}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-muted-foreground">ORDER # {order.id}</span>
                  <div className={`text-sm font-medium ${statusColor[order.status] || "text-foreground"}`}>
                    {order.status}
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="px-5 py-4 space-y-3">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover bg-secondary/50" loading="lazy" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-card-foreground line-clamp-1">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.qty} • ₹{item.price.toFixed(2)}</p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/products">Buy Again</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
