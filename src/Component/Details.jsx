import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  ShoppingCart,
  Heart,
  Search,
  Phone,
  Mail,
  Globe,
  Menu,
  X,
  Sparkles,
  Palette,
  Brush,
  Camera,
  ChevronLeft,
  ChevronRight,
  X as CloseIcon,
} from "lucide-react";

// --------------------
// Banner slides
// --------------------
const slides = [
  {
    id: 1,
    title: "Luxury Wedding Invitations",
    subtitle: "Celebrate love with elegance",
    image: "https://source.unsplash.com/1600x600/?wedding,invitation",
    color: "from-pink-500/40 to-purple-600/40",
  },
  {
    id: 2,
    title: "Creative Logo Design",
    subtitle: "Build your brand identity",
    image: "https://source.unsplash.com/1600x600/?logo,design",
    color: "from-blue-500/40 to-cyan-600/40",
  },
  {
    id: 3,
    title: "Premium Visiting Cards",
    subtitle: "First impressions that last",
    image: "https://source.unsplash.com/1600x600/?business,card",
    color: "from-amber-500/40 to-orange-600/40",
  },
  {
    id: 4,
    title: "Stylish Brochures",
    subtitle: "Tell your story with design",
    image: "https://source.unsplash.com/1600x600/?brochure,design",
    color: "from-emerald-500/40 to-teal-600/40",
  },
];

// --------------------
// Services data
// --------------------
const services = [
  {
    id: 1,
    name: "Luxury Wedding Invitations",
    description: "Elegant, premium wedding invites with unique designs.",
    price: "$299",
    image: "https://source.unsplash.com/400x300/?wedding,invitation",
    category: "Wedding",
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    id: 2,
    name: "Visiting Cards",
    description: "Professional business cards for every need.",
    price: "$49",
    image: "https://source.unsplash.com/400x300/?visiting,card",
    category: "Visiting",
    icon: <Brush className="w-6 h-6" />,
  },
  {
    id: 3,
    name: "Custom Logo Design",
    description: "Modern and minimal logos tailored to your brand.",
    price: "$199",
    image: "https://source.unsplash.com/400x300/?logo,design",
    category: "Logo",
    icon: <Palette className="w-6 h-6" />,
  },
  {
    id: 4,
    name: "Creative Brochures",
    description: "Engaging brochures that speak your brand's story.",
    price: "$99",
    image: "https://source.unsplash.com/400x300/?brochure,design",
    category: "Brochure",
    icon: <Camera className="w-6 h-6" />,
  },
];

// --------------------
// Portfolio Gallery Images
// --------------------
const portfolioImages = [
  {
    id: 1,
    src: "https://source.unsplash.com/600x600/?wedding,invitation",
    category: "Wedding",
    title: "Elegant Floral Invitation",
  },
  {
    id: 2,
    src: "https://source.unsplash.com/600x600/?logo,design",
    category: "Logo",
    title: "Modern Brand Identity",
  },
  {
    id: 3,
    src: "https://source.unsplash.com/600x600/?business,card",
    category: "Visiting",
    title: "Minimal Business Card",
  },
  {
    id: 4,
    src: "https://source.unsplash.com/600x600/?brochure,design",
    category: "Brochure",
    title: "Corporate Brochure",
  },
  {
    id: 5,
    src: "https://source.unsplash.com/600x600/?stationery,design",
    category: "Stationery",
    title: "Brand Stationery Set",
  },
  {
    id: 6,
    src: "https://source.unsplash.com/600x600/?packaging,design",
    category: "Packaging",
    title: "Product Packaging",
  },
  {
    id: 7,
    src: "https://source.unsplash.com/600x600/?poster,design",
    category: "Poster",
    title: "Event Poster",
  },
  {
    id: 8,
    src: "https://source.unsplash.com/600x600/?book,cover",
    category: "Book",
    title: "Book Cover Design",
  },
];

// Floating particles background component
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-30"
          initial={{
            x: Math.random() * 1000,
            y: Math.random() * 1000,
          }}
          animate={{
            x: Math.random() * 1000,
            y: Math.random() * 1000,
          }}
          transition={{
            duration: 20 + Math.random() * 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );
};

export default function CreativeStudio() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 0.3, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1, 1, 0.95, 0.9]);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredServices = services.filter(
    (s) =>
      (selectedCategory === "All" || s.category === selectedCategory) &&
      s.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    );
  };

  const addToCart = (service) => {
    if (!cart.find((c) => c.id === service.id)) {
      setCart([...cart, service]);
      
      // Create floating animation effect
      const floatingItem = document.createElement('div');
      floatingItem.className = 'fixed w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center z-50';
      floatingItem.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>';
      
      // Get position of the clicked button
      const buttonRect = document.getElementById(`add-to-cart-${service.id}`).getBoundingClientRect();
      const cartRect = document.getElementById('cart-icon').getBoundingClientRect();
      
      floatingItem.style.left = `${buttonRect.left + buttonRect.width/2 - 24}px`;
      floatingItem.style.top = `${buttonRect.top}px`;
      document.body.appendChild(floatingItem);
      
      // Animate to cart
      setTimeout(() => {
        floatingItem.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
        floatingItem.style.left = `${cartRect.left + cartRect.width/2 - 24}px`;
        floatingItem.style.top = `${cartRect.top}px`;
        floatingItem.style.transform = 'scale(0.5)';
        floatingItem.style.opacity = '0.5';
        
        // Remove after animation
        setTimeout(() => {
          document.body.removeChild(floatingItem);
        }, 800);
      }, 50);
    }
  };

  const openLightbox = (image) => {
    setSelectedImage(image);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setTimeout(() => setSelectedImage(null), 300);
  };

  const navigateImage = (direction) => {
    if (!selectedImage) return;
    
    const currentIndex = portfolioImages.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % portfolioImages.length;
    } else {
      newIndex = (currentIndex - 1 + portfolioImages.length) % portfolioImages.length;
    }
    
    setSelectedImage(portfolioImages[newIndex]);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white overflow-hidden">
      <FloatingParticles />
      
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-center p-6 md:p-8 mb-4 sticky top-0 z-40 bg-gray-900/80 backdrop-blur-md"
      >
        <motion.h1
          className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 tracking-tight"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          Creato.in
        </motion.h1>
        
        <div className="hidden md:flex gap-8">
          {['All', 'Wedding', 'Visiting', 'Logo', 'Brochure'].map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`relative px-2 py-1 font-medium transition-all ${
                selectedCategory === category 
                  ? 'text-purple-300' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {category}
              {selectedCategory === category && (
                <motion.div 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-400"
                  layoutId="category-underline"
                />
              )}
            </button>
          ))}
        </div>
        
        <div className="flex gap-6 items-center">
          <div className="relative hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search designs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-gray-800/50 backdrop-blur-md px-4 py-2 rounded-full border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 w-48"
              />
              <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>
          </div>
          
          <div className="flex gap-4">
            <motion.div 
              id="cart-icon"
              className="relative p-2 rounded-full bg-gray-800/50 backdrop-blur-md cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ShoppingCart className="w-5 h-5 text-purple-300" />
              {cart.length > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {cart.length}
                </motion.span>
              )}
            </motion.div>
            
            <motion.div 
              className="relative p-2 rounded-full bg-gray-800/50 backdrop-blur-md cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className="w-5 h-5 text-purple-300" />
              {wishlist.length > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {wishlist.length}
                </motion.span>
              )}
            </motion.div>
          </div>
          
          <motion.button 
            className="md:hidden p-2 rounded-full bg-gray-800/50"
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 w-64 bg-gray-900 z-50 p-6 shadow-2xl md:hidden"
          >
            <button 
              className="absolute top-4 right-4 p-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="mt-12 space-y-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search designs..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-gray-800/50 backdrop-blur-md px-4 py-2 rounded-full border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
                />
                <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
              </div>
              
              <div className="space-y-4">
                {['All', 'Wedding', 'Visiting', 'Logo', 'Brochure'].map(category => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 rounded-lg ${
                      selectedCategory === category 
                        ? 'bg-purple-900/50 text-purple-300' 
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Banner */}
      <motion.div 
        style={{ opacity, scale }}
        className="relative w-full h-[70vh] overflow-hidden rounded-2xl mx-auto max-w-6xl mb-12 shadow-2xl"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[currentSlide].id}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <div className={`absolute inset-0 bg-gradient-to-b ${slides[currentSlide].color} via-transparent`} />
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover mix-blend-overlay"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
              <motion.h2
                key={`title-${slides[currentSlide].id}`}
                initial={{ y: 40, opacity: 0, rotate: -2 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
                className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg"
              >
                {slides[currentSlide].title}
              </motion.h2>
              <motion.p
                key={`subtitle-${slides[currentSlide].id}`}
                initial={{ y: 40, opacity: 0, rotate: 1 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
                className="mt-4 text-lg md:text-2xl font-light text-gray-200 drop-shadow"
              >
                {slides[currentSlide].subtitle}
              </motion.p>
              <motion.button
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 rounded-full font-semibold shadow-lg"
              >
                Explore Collection
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSlide(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </motion.div>

      {/* Services */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-6xl mx-auto px-4 mb-16"
      >
        <AnimatePresence mode="popLayout">
          {filteredServices.map((service) => (
            <motion.div
              key={service.id}
              layout
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.4, type: "spring" }}
              whileHover={{ y: -8, rotateY: 5 }}
              className="bg-gray-800/30 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden relative group border border-gray-700/50"
            >
              <div className="relative overflow-hidden">
                <motion.img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-52 object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-70" />
                <div className="absolute top-3 left-3 bg-gray-900/70 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2">
                  {service.icon}
                  <span className="text-sm font-medium">{service.category}</span>
                </div>
                <button
                  onClick={() => toggleWishlist(service.id)}
                  className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors duration-300 ${
                    wishlist.includes(service.id)
                      ? "bg-pink-500/80 text-white"
                      : "bg-gray-900/70 text-gray-300 hover:bg-pink-500/50"
                  }`}
                >
                  <Heart className="w-4 h-4" fill={wishlist.includes(service.id) ? "currentColor" : "none"} />
                </button>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-xl mb-1">{service.name}</h3>
                <p className="text-gray-400 text-sm mb-2">{service.description}</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-purple-300 font-bold text-lg">{service.price}</span>
                  <motion.button
                    id={`add-to-cart-${service.id}`}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => addToCart(service)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Portfolio Gallery Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="max-w-6xl mx-auto px-4 mb-16"
      >
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Our Creative Portfolio
          </motion.h2>
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore our collection of stunning designs that showcase our creativity and attention to detail.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {portfolioImages.map((image, index) => (
            <motion.div
              key={image.id}
              className="relative group cursor-pointer overflow-hidden rounded-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => openLightbox(image)}
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div>
                  <h3 className="text-white font-semibold text-sm">{image.title}</h3>
                  <p className="text-gray-300 text-xs">{image.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-4xl w-full max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 text-white p-2 z-10"
              >
                <CloseIcon className="w-8 h-8" />
              </button>
              
              <button
                onClick={() => navigateImage('prev')}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={() => navigateImage('next')}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <img
                  src={selectedImage.src.replace('600x600', '1000x1000')}
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
                <div className="p-4 text-center">
                  <h3 className="text-xl font-bold text-white">{selectedImage.title}</h3>
                  <p className="text-gray-400">{selectedImage.category}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact */}
      <motion.footer
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-16 text-center text-gray-400 py-8 bg-gray-900/50 backdrop-blur-md"
      >
        <p className="flex justify-center gap-6 items-center flex-wrap mb-4">
          <motion.a 
            href="tel:+15551234567" 
            className="flex items-center gap-2 hover:text-purple-300 transition-colors"
            whileHover={{ y: -2 }}
          >
            <Phone className="w-5 h-5" /> +1 555 123 4567
          </motion.a>
          <motion.a 
            href="mailto:studio@creativestudio.com" 
            className="flex items-center gap-2 hover:text-purple-300 transition-colors"
            whileHover={{ y: -2 }}
          >
            <Mail className="w-5 h-5" /> studio@creativestudio.com
          </motion.a>
          <motion.a 
            href="https://www.creativestudio.com" 
            className="flex items-center gap-2 hover:text-purple-300 transition-colors"
            whileHover={{ y: -2 }}
          >
            <Globe className="w-5 h-5" /> www.creativestudio.com
          </motion.a>
        </p>
        <p className="text-sm">© {new Date().getFullYear()} Creato.in. All rights reserved.</p>
      </motion.footer>
    </div>
  );
}