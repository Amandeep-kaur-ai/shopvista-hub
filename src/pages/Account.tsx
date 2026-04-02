import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { User, MapPin, CreditCard, Bell, ShieldCheck, Package } from "lucide-react";

export default function AccountPage() {
  return (
    <Layout>
      <div className="container py-6 max-w-4xl">
        <h1 className="text-2xl font-bold text-foreground mb-6">Your Account</h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: Package, title: "Your Orders", desc: "Track, return, or buy things again", link: "/orders" },
            { icon: ShieldCheck, title: "Login & Security", desc: "Edit login, name, and mobile number", link: "#" },
            { icon: MapPin, title: "Your Addresses", desc: "Edit addresses for orders", link: "#" },
            { icon: CreditCard, title: "Payment Options", desc: "Edit or add payment methods", link: "#" },
            { icon: Bell, title: "Notifications", desc: "Manage your notification preferences", link: "#" },
            { icon: User, title: "Profile", desc: "Edit your profile information", link: "#" },
          ].map(item => (
            <Link
              key={item.title}
              to={item.link}
              className="flex gap-4 bg-card border border-border rounded-lg p-5 hover:border-primary hover:shadow-md transition-all group"
            >
              <item.icon className="h-10 w-10 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
              <div>
                <h3 className="font-semibold text-card-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-0.5">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
