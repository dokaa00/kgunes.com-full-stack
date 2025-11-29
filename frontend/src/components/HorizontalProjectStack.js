import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioCategories } from '../data/portfolioData';
import { ArrowRight, X } from 'lucide-react';

const HorizontalProjectStack = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [focusedCategory, setFocusedCategory] = useState(null);

  const handleCardClick = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
      setFocusedCategory(null);
    } else {
      setExpandedIndex(index);
    }
  };

  const handleFocusMode = (category) => {
    setFocusedCategory(category);
  };

  const closeFocusMode = () => {
    setFocusedCategory(null);
  };

  return (
    <section className="relative min-h-screen bg-[#050505] py-32 px-6 overflow-hidden">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-7xl mb-20"
      >
        <h2 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
          Selected Works
        </h2>
        <p className="text-xl text-white/50 max-w-2xl">
          A curated collection of projects spanning design, technology, and innovation
        </p>
      </motion.div>

      {/* Horizontal Accordion Container */}
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row gap-4 md:gap-2 min-h-[600px] md:h-[700px]">
          <AnimatePresence mode="sync">
            {portfolioCategories.map((category, index) => {
              const isExpanded = expandedIndex === index;
              const isHovered = hoveredIndex === index;
              const totalCards = portfolioCategories.length;

              // Calculate flex basis for horizontal layout (desktop only)
              const getFlexBasis = () => {
                if (expandedIndex !== null) {
                  if (isExpanded) {
                    return '60%'; // Expanded card takes more space
                  } else {
                    return `${40 / (totalCards - 1)}%`; // Other cards share remaining space
                  }
                } else {
                  return `${100 / totalCards}%`; // Equal distribution when none expanded
                }
              };

              return (
                <motion.div
                  key={category.id}
                  className={`relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 ${
                    isExpanded ? 'md:min-w-[400px] min-h-[400px] md:min-h-0' : 'md:min-w-[80px] min-h-[120px] md:min-h-0'
                  }`}
                  style={{
                    flexBasis: getFlexBasis(),
                  }}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    flexBasis: getFlexBasis(),
                  }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.05,
                    ease: [0.6, 0.05, 0.01, 0.9],
                  }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  onClick={() => handleCardClick(index)}
                  whileHover={expandedIndex === null ? {
                    scale: 1.02,
                    zIndex: 10,
                  } : {}}
                >
                  {/* Background with gradient */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: isExpanded
                        ? `linear-gradient(135deg, ${category.color}20 0%, ${category.color}05 50%, transparent 100%)`
                        : `linear-gradient(135deg, ${category.color}30 0%, transparent 100%)`,
                    }}
                  />

                  {/* Background Image */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      opacity: isExpanded ? 0.4 : 0.2,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <img
                      src={category.image}
                      alt={category.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                  </motion.div>

                  {/* Content Overlay */}
                  <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-8">
                    {/* Top Section - Category Info */}
                    <motion.div
                      animate={{
                        opacity: isExpanded ? 1 : 0.7,
                      }}
                    >
                      <div className="mb-4">
                        <motion.div
                          className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-sm mb-3"
                          animate={{
                            backgroundColor: isHovered || isExpanded
                              ? `${category.color}40`
                              : 'rgba(255,255,255,0.1)',
                          }}
                        >
                          <span className="text-xs font-medium text-white/80">
                            {category.projectCount} Proje
                          </span>
                        </motion.div>
                      </div>

                      <motion.h3
                        className="text-2xl md:text-4xl font-bold text-white mb-2 tracking-tight"
                        animate={{
                          fontSize: isExpanded ? '2.5rem' : '1.5rem',
                        }}
                        transition={{ duration: 0.4 }}
                      >
                        {category.title}
                      </motion.h3>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <p className="text-sm md:text-base text-white/60 mb-4">
                              {category.subtitle}
                            </p>
                            <p className="text-sm md:text-base text-white/70 mb-6 leading-relaxed">
                              {category.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Bottom Section - Action Button */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          <motion.button
                            className="flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-black w-fit"
                            whileHover={{ scale: 1.05, gap: '0.75rem' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleFocusMode(category);
                            }}
                          >
                            View Projects
                            <ArrowRight className="h-5 w-5" />
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Tags - Only show when expanded */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                          className="flex flex-wrap gap-2 mt-4"
                        >
                          {category.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60"
                            >
                              {tag}
                            </span>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Accent Border */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1"
                    style={{ backgroundColor: category.color }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isHovered || isExpanded ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Glow Effect */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at center, ${category.color}20 0%, transparent 70%)`,
                    }}
                    animate={{
                      opacity: isHovered || isExpanded ? 1 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Focus Mode Modal */}
      <AnimatePresence>
        {focusedCategory && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              onClick={closeFocusMode}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="fixed inset-4 md:inset-20 z-50 bg-[#050505] rounded-3xl border border-white/10 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background: `linear-gradient(135deg, ${focusedCategory.color}30 0%, transparent 100%)`,
                }}
              />
              <div className="relative z-10 h-full flex flex-col p-8 md:p-12">
                <button
                  onClick={closeFocusMode}
                  className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>

                <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto">
                  <div
                    className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm mb-6 w-fit"
                    style={{ backgroundColor: `${focusedCategory.color}30` }}
                  >
                    <span className="text-sm font-medium text-white/80">
                      {focusedCategory.projectCount} Proje
                    </span>
                  </div>

                  <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                    {focusedCategory.title}
                  </h2>
                  <p className="text-xl text-white/60 mb-4">
                    {focusedCategory.subtitle}
                  </p>
                  <p className="text-lg text-white/70 mb-8 leading-relaxed">
                    {focusedCategory.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {focusedCategory.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 p-8 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-white/50 text-center">
                      Project gallery and details will be displayed here
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Instruction Text */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mt-20 text-center"
      >
        <p className="text-sm font-light tracking-widest text-white/30">
          HOVER TO EXPAND • CLICK TO VIEW DETAILS
        </p>
      </motion.div>
    </section>
  );
};

export default HorizontalProjectStack;

