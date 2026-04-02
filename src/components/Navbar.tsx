import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Search, MapPin, ShoppingCart, User, Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/hooks/useCart";
import { categories } from "@/data/products";

export function Navbar() {
  const { count } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50">
      {/* Main nav */}
      <div className="nav-bg">
        <div className="container flex items-center gap-4 py-2">
          {/* Mobile menu toggle */}
          <button
            className="lg:hidden text-nav-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0 text-xl font-bold text-primary">
            Shop<span className="text-nav-foreground">Wave</span>
          </Link>

          {/* Location */}
          <button className="hidden md:flex items-center gap-1 text-xs text-nav-foreground/70 hover:text-nav-foreground transition-colors">
            <MapPin className="h-4 w-4" />
            <div className="text-left">
              <div className="text-[10px] leading-tight">Deliver to</div>
              <div className="font-semibold text-sm leading-tight">New York 10001</div>
            </div>
          </button>

          {/* Search */}
          <div className="flex-1 hidden sm:flex">
            <div className="flex w-full rounded-md overflow-hidden">
              <select className="bg-secondary text-secondary-foreground text-xs px-2 border-r border-border focus:outline-none">
                <option>All</option>
                {categories.map(c => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Search products, brands and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 text-sm bg-card text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="bg-primary text-primary-foreground px-4 hover:opacity-90 transition-opacity" aria-label="Search">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              to="/account"
              className="hidden sm:flex flex-col items-start text-xs text-nav-foreground/70 hover:text-nav-foreground transition-colors"
            >
              <span className="text-[10px]">Hello, Sign in</span>
              <span className="font-semibold text-sm flex items-center gap-0.5">
                Account <ChevronDown className="h-3 w-3" />
              </span>
            </Link>

            <Link
              to="/orders"
              className="hidden md:flex flex-col items-start text-xs text-nav-foreground/70 hover:text-nav-foreground transition-colors"
            >
              <span className="text-[10px]">Returns</span>
              <span className="font-semibold text-sm">& Orders</span>
            </Link>

            <Link to="/cart" className="flex items-center gap-1 text-nav-foreground hover:text-primary transition-colors relative">
              <ShoppingCart className="h-6 w-6" />
              {count > 0 && (
                <span className="absolute -top-1 -right-2 bg-primary text-primary-foreground text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {count}
                </span>
              )}
              <span className="hidden sm:inline text-sm font-semibold ml-1">Cart</span>
            </Link>
          </div>
        </div>

        {/* Mobile search */}
        <div className="sm:hidden px-4 pb-2">
          <div className="flex rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 px-3 py-2 text-sm bg-card text-card-foreground focus:outline-none"
            />
            <button className="bg-primary text-primary-foreground px-3">
              <Search className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Sub nav */}
      <div className="nav-secondary-bg">
        <div className="container">
          <nav className="flex items-center gap-1 overflow-x-auto py-1.5 text-sm text-nav-foreground/90 scrollbar-hide">
            {categories.map(cat => (
              <Link
                key={cat.slug}
                to={`/products?category=${cat.slug}`}
                className="whitespace-nowrap px-3 py-1 rounded hover:bg-nav/50 transition-colors text-xs font-medium"
              >
                {cat.name}
              </Link>
            ))}
            <Link to="/products" className="whitespace-nowrap px-3 py-1 rounded hover:bg-nav/50 transition-colors text-xs font-medium text-primary">
              Today's Deals
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden nav-bg border-t border-nav-secondary animate-slide-in">
          <nav className="container py-4 flex flex-col gap-2">
            <Link to="/account" className="flex items-center gap-2 text-nav-foreground py-2 text-sm" onClick={() => setMobileMenuOpen(false)}>
              <User className="h-4 w-4" /> Account
            </Link>
            <Link to="/orders" className="text-nav-foreground py-2 text-sm" onClick={() => setMobileMenuOpen(false)}>
              Orders
            </Link>
            <div className="border-t border-nav-secondary pt-2 mt-2">
              <p className="text-xs text-nav-foreground/60 mb-2">Shop by Category</p>
              {categories.map(cat => (
                <Link
                  key={cat.slug}
                  to={`/products?category=${cat.slug}`}
                  className="block py-1.5 text-sm text-nav-foreground/80 hover:text-nav-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {cat.icon} {cat.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
