import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Globe, Heart, ArrowUp, MessageCircle, Sparkles, Shield, Award, Clock } from 'lucide-react';

export default function Footer() {
  const [currentYear] = useState(new Date().getFullYear());
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-24 relative bg-white text-black backdrop-blur-xl rounded-t-[60px] overflow-hidden border-t border-purple-500/30">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          initial={{ x: "-100%", y: "-100%" }}
          animate={{ x: "100%", y: "100%" }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ x: "100%", y: "100%" }}
          animate={{ x: "-100%", y: "-100%" }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 right-0 w-80 h-80 bg-pink-600/15 rounded-full blur-3xl"
        />
        
        {/* Geometric patterns */}
        <div className="absolute top-10 left-10 w-20 h-20 border border-purple-400/10 rounded-lg rotate-45"></div>
        <div className="absolute bottom-20 right-16 w-16 h-16 border border-pink-400/10 rounded-full"></div>
        <div className="absolute top-1/3 right-1/4 w-12 h-12 border border-indigo-400/10 rotate-12"></div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 p-8 bg-gray-900/40 backdrop-blur-md rounded-2xl border border-purple-500/20 text-center"
        >
          <div className="flex justify-center mb-4">
            <Sparkles className="w-8 h-8 text-purple-400" />
          </div>
          <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-black">
            Stay Inspired
          </h3>
          <p className="mb-6 max-w-2xl mx-auto text-blue-100">
            Join our creative community and receive exclusive design insights, tips, and early access to new templates.
          </p>
          
          {subscribed ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white"
            >
              <Award className="w-5 h-5" />
              Thank you for subscribing!
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 px-6 py-3 bg-gray-800/50 border border-purple-500/30 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-gray-500"
                required
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Subscribe
              </motion.button>
            </form>
          )}
        </motion.div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4 text-black flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-black" />
              Creato.in
            </h4>
            <p className="mb-4 text-black">
              Transforming ideas into stunning visual experiences. Premium design solutions for your creative needs.
            </p>
            <div className="flex gap-4">
              {['Facebook', 'Instagram', 'Twitter', 'LinkedIn'].map((social, idx) => (
                <motion.a
                  key={idx}
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800/50 flex items-center justify-center border border-purple-500/20 hover:bg-purple-500/20 transition-colors"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4 text-black">Design Categories</h4>
            <ul className="space-y-3">
              {['Wedding', 'Visiting', 'Logo', 'Brochure', 'Business', 'Social', 'Portfolio'].map((item, idx) => (
                <li key={idx}>
                  <a href="#" className="text-black hover:text-blue-400 transition-colors flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                    {item} Designs
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4 text-black">Support</h4>
            <ul className="space-y-3">
              {['Help Center', 'Privacy Policy', 'Terms of Service', 'FAQs', 'Contact Us'].map((item, idx) => (
                <li key={idx}>
                  <a href="#" className="text-black hover:text-blue-400 transition-colors flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4 text-black">Get In Touch</h4>
            <div className="space-y-4">
              <motion.a
                href="tel:+911234567890"
                className="flex items-center gap-3 text-black hover:text-blue-500 transition-colors group"
                whileHover={{ x: 5 }}
              >
                <div className="p-2 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                  <Phone className="w-5 h-5 text-black" />
                </div>
                +91 123 456 7890
              </motion.a>
              
              <motion.a
                href="mailto:info@creato.in"
                className="flex items-center gap-3 text-black hover:text-blue-400 transition-colors group"
                whileHover={{ x: 5 }}
              >
                <div className="p-2 bg-pink-500/10 rounded-lg group-hover:bg-pink-500/20 transition-colors">
                  <Mail className="w-5 h-5 text-black" />
                </div>
                info@creato.in
              </motion.a>
              
              <motion.a
                href="https://www.creato.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-black hover:text-black transition-colors group"
                whileHover={{ x: 5 }}
              >
                <div className="p-2 bg-indigo-500/10 rounded-lg group-hover:bg-indigo-500/20 transition-colors">
                  <Globe className="w-5 h-5 text-blue-500" />
                </div>
                www.creato.in
              </motion.a>

              <div className="flex items-center gap-3 text-black group pt-2">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p>Mon - Fri: 9AM - 6PM</p>
                  <p className="text-sm text-blue-500">Weekends: 10AM - 4PM</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-purple-500/20 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="flex items-center gap-2 text-sm">
            <span>Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-pink-400 fill-current" />
            </motion.div>
            <span>by <span className="text-blue-900">Poeage Technology</span> © {currentYear}</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-purple-400" />
              <span>Secure Payment</span>
            </div>
            <div className="hidden md:block">|</div>
            <span>All rights reserved</span>
          </div>
          
          <motion.button
            onClick={scrollToTop}
            className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-500/30 hover:border-purple-500/50 transition-colors flex items-center gap-2"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp className="w-4 h-4 text-black" />
            <span className="text-sm">Back to Top</span>
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
}