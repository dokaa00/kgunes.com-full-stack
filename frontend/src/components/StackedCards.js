import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { portfolioCategories } from '../data/portfolioData';
import { ArrowRight, Folder, X } from 'lucide-react';
import ApparelModal from './ApparelModal';
import { encodeImagePath } from '../utils/imageUtils';

const StackedCards = () => {
  const { t } = useTranslation();
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedApparel, setSelectedApparel] = useState(null);
  const [showApparelModal, setShowApparelModal] = useState(false);

  const handleApparelClick = (project) => {
    setSelectedApparel(project);
    setShowApparelModal(true);
  };

  return (
    <section className="relative min-h-screen bg-black py-32 px-6">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-7xl mb-20"
      >
        <h2 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
          {t('portfolio.stacked.headerTitle')}
        </h2>
        <p className="text-xl text-white/50 max-w-2xl">
          {t('portfolio.stacked.headerSubtitle')}
        </p>
      </motion.div>

      {/* 3D Stacked Cards Container */}
      <div className="mx-auto max-w-7xl">
        <div className="relative" style={{ perspective: '2000px' }}>
          <AnimatePresence>
            {portfolioCategories.map((category, index) => {
              const isExpanded = expandedIndex === index;
              const isHovered = hoveredIndex === index;
              const totalCards = portfolioCategories.length;
              
              // Calculate position based on expansion state
              const getCardTransform = () => {
                if (expandedIndex !== null) {
                  // When stack is expanded
                  if (index < expandedIndex) {
                    return `translateY(${index * -120}px) translateX(-100px) rotateY(5deg)`;
                  } else if (index > expandedIndex) {
                    return `translateY(${(index - expandedIndex) * 120}px) translateX(100px) rotateY(-5deg)`;
                  } else {
                    return 'translateY(0) translateX(0) rotateY(0) scale(1.05)';
                  }
                } else {
                  // Default stacked state
                  const offset = (totalCards - index - 1) * 15;
                  const rotateOffset = (totalCards - index - 1) * -2;
                  return `translateY(${offset}px) rotateX(${rotateOffset}deg) scale(${1 - index * 0.02})`;
                }
              };

              return (
                <motion.div
                  key={category.id}
                  className="absolute inset-0 w-full"
                  style={{
                    zIndex: isExpanded ? 100 : totalCards - index,
                    transformStyle: 'preserve-3d',
                  }}
                  initial={{ opacity: 0, y: 100 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transform: getCardTransform(),
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.6, 0.05, 0.01, 0.9],
                  }}
                  whileHover={expandedIndex === null ? {
                    transform: `translateY(${(totalCards - index - 1) * 15 - 10}px) rotateX(${(totalCards - index - 1) * -2}deg) scale(${1 - index * 0.02 + 0.02})`,
                  } : {}}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                >
                  <div
                    className="relative h-[600px] cursor-pointer overflow-hidden rounded-3xl border border-white/10"
                    style={{
                      background: `linear-gradient(135deg, ${category.color}15 0%, transparent 100%)`,
                      backdropFilter: 'blur(20px)',
                    }}
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0 opacity-30">
                      <img
                        src={encodeImagePath(category.image)}
                        alt={category.title}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex h-full flex-col justify-between p-12">
                      {/* Top Section */}
                      <div>
                        <motion.div
                          className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm"
                          animate={{
                            backgroundColor: isHovered ? `${category.color}30` : 'rgba(255,255,255,0.1)',
                          }}
                        >
                          <Folder className="h-4 w-4 text-white/70" />
                          <span className="text-sm font-medium text-white/70">
                            {t('cards.worksCount', { count: category.projectCount })}
                          </span>
                        </motion.div>
                        
                        <h3 className="text-5xl font-bold text-white mb-3 tracking-tight">
                          {t(category.titleKey)}
                        </h3>
                        <p className="text-lg text-white/50 mb-4">
                          {t(category.subtitleKey)}
                        </p>

                        {/* Project Gallery - Shows when expanded */}
                        <AnimatePresence>
                          {isExpanded && category.projects && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.4 }}
                              className="mt-8 overflow-hidden"
                            >
                              <div className="grid grid-cols-3 md:grid-cols-4 gap-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                {category.projects.map((project, idx) => (
                                  <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer bg-white/5 border border-white/10 hover:border-white/30 transition-all"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (category.id === 2) { // Apparel category
                                        handleApparelClick(project);
                                      }
                                    }}
                                  >
                                    <img
                                      src={encodeImagePath(category.id === 2 ? project.mannequinImage : project.image)}
                                      alt={project.name}
                                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                      <div className="absolute bottom-2 left-2 right-2">
                                        <p className="text-xs text-white font-medium truncate">
                                          {project.name}
                                        </p>
                                      </div>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Bottom Section */}
                      <div>
                        <p className="text-white/70 mb-6 text-lg leading-relaxed">
                          {t(category.descriptionKey)}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {category.tagsKeys.map((tagKey, i) => (
                              <span
                                key={i}
                                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60"
                              >
                                {t(tagKey)}
                              </span>
                            ))}
                          </div>
                          
                          <motion.button
                            className="flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-black"
                            whileHover={{ scale: 1.05, gap: '0.75rem' }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {isExpanded ? <X className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
                            {isExpanded ? 'Kapat' : t('portfolio.stacked.viewButton')}
                          </motion.button>
                        </div>
                      </div>
                    </div>

                    {/* Accent Border */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1"
                      style={{ backgroundColor: category.color }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isHovered || isExpanded ? 1 : 0 }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        
        {/* Spacer for stacked cards */}
        <div className="h-[700px]" />
      </div>

      {/* Instruction Text */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mt-20 text-center"
      >
        <p className="text-sm font-light tracking-widest text-white/30">
          {t('portfolio.stacked.hint')}
        </p>
      </motion.div>

      {/* Apparel Modal */}
      <ApparelModal
        isOpen={showApparelModal}
        onClose={() => setShowApparelModal(false)}
        project={selectedApparel}
      />
    </section>
  );
};

export default StackedCards;