import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import StackedCards from '../components/StackedCards';

const Portfolio = () => {
  return (
    <div className="relative bg-black">
      {/* Hero Section */}
      <Hero />

      {/* Transition Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative h-32 bg-gradient-to-b from-black to-black"
      />

      {/* Stacked Cards Portfolio */}
      <StackedCards />

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black py-12 px-6">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-white/30">
            © 2024 All Rights Reserved
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-sm text-white/30 hover:text-white/60 transition-colors">
              Instagram
            </a>
            <a href="#" className="text-sm text-white/30 hover:text-white/60 transition-colors">
              LinkedIn
            </a>
            <a href="#" className="text-sm text-white/30 hover:text-white/60 transition-colors">
              Behance
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;