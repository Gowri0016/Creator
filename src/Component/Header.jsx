import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Search, Menu, X, User, Sparkles } from 'lucide-react';

export default function Header() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cart] = useState([]);
  const [wishlist] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const categories = ['All', 'Wedding', 'Visiting', 'Logo', 'Brochure', 'Business', 'Social'];

  // Toggle login state
  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <>
      <motion.header 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-center p-6 md:p-8 mb-4 sticky top-0 z-40 bg-gray-900/95 backdrop-blur-lg border-b border-gray-800"
      >
        <div className="flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: 15 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Sparkles className="w-7 h-7 text-purple-400" />
          </motion.div>
          <motion.h1
            className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 tracking-tight"
            whileHover={{ scale: 1.05 }}
          >
            Creato.in
          </motion.h1>
        </div>

        <div className="hidden md:flex gap-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`relative px-3 py-2 font-medium transition-all ${selectedCategory === cat ? 'text-purple-300' : 'text-gray-400 hover:text-white'}`}
            >
              {cat}
              {selectedCategory === cat && (
                <motion.div 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-400" 
                  layoutId="category-underline"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="flex gap-4 items-center">
          {/* Search bar with toggle for mobile */}
          <AnimatePresence>
            {showSearch && (
              <motion.div 
                className="md:hidden absolute top-full left-0 right-0 p-4 bg-gray-900 border-b border-gray-800"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search designs..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-gray-800/80 backdrop-blur-md px-4 py-2 rounded-full border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
                  />
                  <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="hidden md:flex gap-4 items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search designs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-gray-800/80 backdrop-blur-md px-4 py-2 rounded-full border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 w-48 transition-all duration-300 focus:w-56"
              />
              <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>

            <motion.button 
              className="relative p-2 rounded-full bg-gray-800/80 backdrop-blur-md cursor-pointer group"
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.9 }}
              onClick={toggleLogin}
            >
              <User className="w-5 h-5 text-purple-300 group-hover:text-white transition-colors" />
              {isLoggedIn && (
                <motion.span 
                  className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  ✓
                </motion.span>
              )}
            </motion.button>

            <motion.div 
              className="relative p-2 rounded-full bg-gray-800/80 backdrop-blur-md cursor-pointer group"
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.9 }}
            >
              <ShoppingCart className="w-5 h-5 text-purple-300 group-hover:text-white transition-colors" />
              {cart.length > 0 && (
                <motion.span 
                  className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  {cart.length}
                </motion.span>
              )}
            </motion.div>

            <motion.div 
              className="relative p-2 rounded-full bg-gray-800/80 backdrop-blur-md cursor-pointer group"
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.9 }}
            >
              <Heart className="w-5 h-5 text-purple-300 group-hover:text-white transition-colors" />
              {wishlist.length > 0 && (
                <motion.span 
                  className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  {wishlist.length}
                </motion.span>
              )}
            </motion.div>
          </div>

          {/* Mobile buttons */}
          <div className="flex md:hidden gap-3">
            <motion.button 
              className="p-2 rounded-full bg-gray-800/80"
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowSearch(!showSearch)}
            >
              <Search className="w-5 h-5 text-purple-300" />
            </motion.button>
            
            <motion.button 
              className="p-2 rounded-full bg-gray-800/80"
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5 text-purple-300" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 w-72 bg-gray-900 z-50 p-6 shadow-2xl md:hidden border-l border-gray-800"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                Menu
              </h2>
              <button 
                className="p-2 rounded-full bg-gray-800/80"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="w-5 h-5 text-purple-300" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Categories</h3>
                {categories.map(cat => (
                  <motion.button 
                    key={cat}
                    onClick={() => { setSelectedCategory(cat); setMobileMenuOpen(false); }}
                    className={`block w-full text-left px-4 py-3 rounded-xl transition-all ${selectedCategory === cat ? 'bg-purple-900/50 text-purple-300' : 'text-gray-400 hover:text-white hover:bg-gray-800/50'}`}
                    whileHover={{ x: 5 }}
                  >
                    {cat}
                  </motion.button>
                ))}
              </div>

              <div className="pt-6 border-t border-gray-800 space-y-4">
                <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Account</h3>
                <button 
                  onClick={() => { toggleLogin(); setMobileMenuOpen(false); }}
                  className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all"
                >
                  <User className="w-5 h-5" />
                  {isLoggedIn ? 'Logout' : 'Login'}
                </button>
                
                <button className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
                  <ShoppingCart className="w-5 h-5" />
                  Cart {cart.length > 0 && `(${cart.length})`}
                </button>
                
                <button className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
                  <Heart className="w-5 h-5" />
                  Wishlist {wishlist.length > 0 && `(${wishlist.length})`}
                </button>
              </div>
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-center text-gray-500 text-sm">Creato.in © {new Date().getFullYear()}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}