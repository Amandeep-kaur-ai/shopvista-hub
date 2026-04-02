import { Link } from "react-router-dom";

const footerLinks = {
  "Get to Know Us": ["About Us", "Careers", "Press Releases", "ShopWave Science"],
  "Connect with Us": ["Facebook", "Twitter", "Instagram"],
  "Make Money with Us": ["Sell on ShopWave", "Become an Affiliate", "Advertise Your Products"],
  "Let Us Help You": ["Your Account", "Returns Centre", "Shipping Rates", "Help"],
};

export function Footer() {
  return (
    <footer className="nav-bg mt-auto">
      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-full py-3 text-sm text-nav-foreground/80 hover:text-nav-foreground nav-secondary-bg transition-colors"
      >
        Back to top
      </button>

      {/* Links grid */}
      <div className="container py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-nav-foreground mb-3">{title}</h3>
              <ul className="space-y-1.5">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-xs text-nav-foreground/60 hover:text-nav-foreground transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-nav-secondary py-6">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/" className="text-lg font-bold text-primary">
            Shop<span className="text-nav-foreground">Wave</span>
          </Link>
          <p className="text-xs text-nav-foreground/50">
            © 2026 ShopWave. All rights reserved. For demo purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}
