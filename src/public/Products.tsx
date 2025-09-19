import React, { useState } from "react";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Pseudo product data
  const products = [
    {
      name: "Wireless Bluetooth Headphones",
      price: 89.99,
      originalPrice: 119.99,
      category: "electronics",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop&crop=center",
      badge: "Sale",
      description: "Premium sound quality with noise cancellation",
    },
    {
      name: "Organic Cotton T-Shirt",
      price: 24.99,
      category: "clothing",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop&crop=center",
      badge: "Eco-Friendly",
      description: "Soft, sustainable cotton blend",
    },
    {
      name: "Smart Fitness Watch",
      price: 199.99,
      category: "electronics",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop&crop=center",
      badge: "Bestseller",
      description: "Track your health and fitness goals",
    },
    {
      name: "Artisan Coffee Beans",
      price: 16.99,
      category: "food",
      image:
        "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop&crop=center",
      badge: "Premium",
      description: "Single origin, freshly roasted",
    },
    {
      name: "Minimalist Backpack",
      price: 79.99,
      originalPrice: 99.99,
      category: "accessories",
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop&crop=center",
      badge: "Sale",
      description: "Durable, water-resistant design",
    },
    {
      name: "Skincare Serum Set",
      price: 45.99,
      category: "beauty",
      image:
        "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=300&h=300&fit=crop&crop=center",
      badge: "New",
      description: "Vitamin C and hyaluronic acid blend",
    },
    {
      name: "Gaming Mechanical Keyboard",
      price: 129.99,
      category: "electronics",
      image:
        "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=300&fit=crop&crop=center",
      description: "RGB backlit with tactile switches",
    },
    {
      name: "Yoga Mat Pro",
      price: 34.99,
      category: "fitness",
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop&crop=center",
      badge: "Eco-Friendly",
      description: "Non-slip, extra thick cushioning",
    },
  ];

  const categories = [
    { value: "all", label: "All Products" },
    { value: "electronics", label: "Electronics" },
    { value: "clothing", label: "Clothing" },
    { value: "beauty", label: "Beauty" },
    { value: "food", label: "Food & Drinks" },
    { value: "accessories", label: "Accessories" },
    { value: "fitness", label: "Fitness" },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getBadgeColor = (badge) => {
    switch (badge) {
      case "Sale":
        return "bg-red-500";
      case "New":
        return "bg-green-500";
      case "Bestseller":
        return "bg-blue-500";
      case "Premium":
        return "bg-purple-500";
      case "Eco-Friendly":
        return "bg-emerald-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Product Catalog
          </h1>

          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              {/* <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" /> */}
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              {/* <Filter className="text-gray-400 w-5 h-5" /> */}
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Badge */}
                {product.badge && (
                  <span
                    className={`absolute top-3 left-3 px-2 py-1 text-xs font-semibold text-white rounded-full ${getBadgeColor(
                      product.badge
                    )}`}
                  >
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                  {/* <ShoppingCart className="w-4 h-4" /> */}
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              {/* <Search className="w-16 h-16 mx-auto" /> */}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Products;
