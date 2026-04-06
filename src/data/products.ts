export interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  brand: string;
  description: string;
  specs: Record<string, string>;
  inStock: boolean;
  badge?: string;
}

export const categories = [
  { name: "Electronics", icon: "💻", slug: "electronics" },
  { name: "Fashion", icon: "👗", slug: "fashion" },
  { name: "Home & Kitchen", icon: "🏠", slug: "home" },
  { name: "Books", icon: "📚", slug: "books" },
  { name: "Sports", icon: "⚽", slug: "sports" },
  { name: "Beauty", icon: "💄", slug: "beauty" },
  { name: "Toys", icon: "🧸", slug: "toys" },
  { name: "Grocery", icon: "🛒", slug: "grocery" },
];

export const products: Product[] = [
  {
    id: 1, title: "Wireless Noise-Cancelling Headphones", price: 79.99, originalPrice: 149.99,
    rating: 4.5, reviews: 2341, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    category: "electronics", brand: "SoundMax", description: "Premium wireless headphones with active noise cancellation, 30-hour battery life, and premium comfort padding.",
    specs: { "Battery Life": "30 hours", "Driver Size": "40mm", "Bluetooth": "5.2", "Weight": "250g" }, inStock: true, badge: "Best Seller"
  },
  {
    id: 2, title: "Smart Watch Ultra Series 5", price: 299.99, originalPrice: 399.99,
    rating: 4.7, reviews: 1856, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    category: "electronics", brand: "TechFit", description: "Advanced smartwatch with health monitoring, GPS, and 5-day battery life.",
    specs: { "Display": "1.9\" AMOLED", "Battery": "5 days", "Water Resistance": "50m", "Storage": "32GB" }, inStock: true, badge: "Deal of the Day"
  },
  {
    id: 3, title: "Premium Cotton T-Shirt Pack (3)", price: 29.99, originalPrice: 49.99,
    rating: 4.3, reviews: 5621, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    category: "fashion", brand: "UrbanStyle", description: "Soft premium cotton t-shirts in classic colors.",
    specs: { "Material": "100% Cotton", "Fit": "Regular", "Care": "Machine Wash" }, inStock: true
  },
  {
    id: 4, title: "Portable Bluetooth Speaker", price: 49.99, originalPrice: 79.99,
    rating: 4.4, reviews: 3102, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    category: "electronics", brand: "BassBox", description: "Waterproof portable speaker with 360° sound and 20-hour playtime.",
    specs: { "Power": "20W", "Battery": "20 hours", "Waterproof": "IPX7" }, inStock: true, badge: "Limited Deal"
  },
  {
    id: 5, title: "Stainless Steel Water Bottle 1L", price: 24.99, originalPrice: 34.99,
    rating: 4.6, reviews: 8920, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    category: "home", brand: "HydroKeep", description: "Double-wall vacuum insulated bottle keeps drinks cold 24h or hot 12h.",
    specs: { "Capacity": "1 Liter", "Material": "18/8 Stainless Steel", "Insulation": "24h cold / 12h hot" }, inStock: true
  },
  {
    id: 6, title: "Running Shoes - Ultra Boost", price: 89.99, originalPrice: 129.99,
    rating: 4.5, reviews: 4230, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    category: "sports", brand: "SprintX", description: "Lightweight running shoes with responsive cushioning.",
    specs: { "Weight": "280g", "Drop": "10mm", "Upper": "Engineered Mesh" }, inStock: true, badge: "Best Seller"
  },
  {
    id: 7, title: "Organic Face Moisturizer", price: 19.99, originalPrice: 29.99,
    rating: 4.2, reviews: 1567, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop",
    category: "beauty", brand: "NaturGlow", description: "Hydrating face moisturizer with natural ingredients.",
    specs: { "Size": "50ml", "Skin Type": "All", "Ingredients": "Organic" }, inStock: true
  },
  {
    id: 8, title: "Mechanical Gaming Keyboard", price: 69.99, originalPrice: 99.99,
    rating: 4.6, reviews: 2890, image: "https://images.unsplash.com/photo-1541140532154-b024d1b22e3d?w=400&h=400&fit=crop",
    category: "electronics", brand: "KeyForce", description: "RGB mechanical keyboard with hot-swappable switches.",
    specs: { "Switches": "Mechanical", "Backlight": "RGB", "Connection": "USB-C", "Layout": "Full Size" }, inStock: true, badge: "Deal of the Day"
  },
  {
    id: 9, title: "Bestselling Mystery Novel Collection", price: 34.99, originalPrice: 59.99,
    rating: 4.8, reviews: 6712, image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=400&fit=crop",
    category: "books", brand: "PageTurner", description: "Collection of 5 bestselling mystery novels.",
    specs: { "Pages": "~1500 total", "Format": "Paperback", "Language": "English" }, inStock: true
  },
  {
    id: 10, title: "Wireless Charging Pad 15W", price: 19.99, originalPrice: 39.99,
    rating: 4.3, reviews: 4560, image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop",
    category: "electronics", brand: "ChargePro", description: "Fast wireless charger compatible with all Qi devices.",
    specs: { "Output": "15W", "Input": "USB-C", "Compatibility": "Qi" }, inStock: true, badge: "Limited Deal"
  },
  {
    id: 11, title: "Yoga Mat Premium 6mm", price: 39.99, originalPrice: 59.99,
    rating: 4.7, reviews: 3421, image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop",
    category: "sports", brand: "FlexZone", description: "Non-slip premium yoga mat with carrying strap.",
    specs: { "Thickness": "6mm", "Material": "TPE", "Size": "183x61cm" }, inStock: true
  },
  {
    id: 12, title: "LED Desk Lamp with USB Port", price: 34.99, originalPrice: 49.99,
    rating: 4.4, reviews: 2100, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    category: "home", brand: "BrightSpace", description: "Adjustable LED desk lamp with 5 brightness levels and USB charging port.",
    specs: { "Brightness": "5 levels", "Color Temp": "3000-6000K", "USB": "5V/2A" }, inStock: true
  },
  
];
