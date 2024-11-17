import React, { useState } from 'react';
import { Bell, Menu, Search, ShoppingCart, User } from 'lucide-react';

const Marketplace = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Sample categories and featured products
  const categories = [
    "Electronics", "Clothing", "Furniture", "Crafts", "Sports", "Books", "Home"
  ];
  
  const featuredProducts = [
    {
      id: 1,
      name: "Vintage Camera",
      price: 299.99,
      description: "Professional vintage camera in excellent condition",
      seller: "PhotoPro",
      category: "Electronics"
    },
    {
      id: 2,
      name: "Handmade Pottery",
      price: 45.00,
      description: "Beautiful handcrafted ceramic vase",
      seller: "CraftMaster",
      category: "Crafts"
    },
    {
      id: 3,
      name: "Modern Desk Chair",
      price: 199.99,
      description: "Ergonomic office chair with lumbar support",
      seller: "FurnitureHub",
      category: "Furniture"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Left side */}
            <div className="flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="ml-4 font-bold text-xl text-purple-600">
                Palace of Goods
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-4 hidden md:flex items-center">
              <div className="w-full relative">
                <input
                  type="text"
                  placeholder="Search for items..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Bell className="h-6 w-6" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <ShoppingCart className="h-6 w-6" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <User className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {categories.map((category) => (
              <button
                key={category}
                className="p-4 text-center bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="p-4">
                  <div className="w-full h-48 bg-gray-200 rounded-lg mb-4">
                    <img
                      src={`/api/placeholder/400/300`}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="mb-2">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.category}</p>
                  </div>
                  <p className="text-gray-700 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-purple-600">
                      π {product.price}
                    </span>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200">
                      Buy Now
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Seller: {product.seller}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setIsMenuOpen(false)}>
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg" onClick={e => e.stopPropagation()}>
            <div className="p-4">
              <h2 className="text-xl font-bold text-purple-600 mb-4">Menu</h2>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category}>
                    <button className="w-full text-left p-2 hover:bg-purple-50 rounded">
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
