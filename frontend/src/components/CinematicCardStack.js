import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Folder, ArrowRight } from 'lucide-react';

const CinematicCardStack = () => {
  const [isHovered, setIsHovered] = useState(false);

  const categories = [
    {
      id: 1,
      title: 'Sosyal Medya',
      projectCount: 25,
      gradient: 'from-purple-600 via-indigo-600 to-purple-800',
      color: '#8b5cf6',
    },
    {
      id: 2,
      title: 'Giyim Tasarımları',
      projectCount: 8,
      gradient: 'from-orange-600 via-red-600 to-orange-800',
      color: '#f97316',
    },
    {
      id: 3,
      title: 'Logolar',
      projectCount: 9,
      gradient: 'from-blue-500 via-cyan-500 to-blue-700',
      color: '#06b6d4',
    },
    {
      id: 4,
      title: 'Afiş Tasarımları',
      projectCount: 7,
      gradient: 'from-pink-500 via-rose-500 to-pink-700',
      color: '#ec4899',
    },
    {
      id: 5,
      title: 'IoT Projelerim',
      projectCount: 2,
      gradient: 'from-emerald-500 via-teal-500 to-emerald-700',
      color: '#10b981',
    },
    {
      id: 6,
      title: 'AI Çalışmalarım',
      projectCount: 3,
      gradient: 'from-amber-500 via-orange-500 to-amber-700',
      color: '#f59e0b',
    },
  ];

  const totalCards = categories.length;

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

      {/* 3D Card Stack Container */}
      <div className="mx-auto max-w-7xl">
        <div
          className="relative h-[700px] flex items-center justify-center"
          style={{
            perspective: '2000px',
            perspectiveOrigin: 'center center',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {categories.map((category, index) => {
            // Calculate initial positions (stacked in center)
            const baseRotationY = -45; // Base rotation angle
            const rotationVariation = (index - totalCards / 2) * 3; // Slight variation per card
            const initialRotateY = baseRotationY + rotationVariation;

            // Z-offset: cards recede into background
            const initialZ = -(totalCards - index - 1) * 40; // Negative Z for depth

            // X-offset: slight horizontal spread when stacked
            const initialX = (index - totalCards / 2) * 15;

            // Y-offset: slight vertical offset for depth perception
            const initialY = (index - totalCards / 2) * 8;

            // Hover state calculations
            const hoverX = (index - totalCards / 2) * 180; // Spread horizontally
            const hoverZ = 0; // Bring to front
            const hoverRotateY = 0; // Face forward
            const hoverY = 0; // Align vertically

            return (
              <motion.div
                key={category.id}
                className="absolute w-[320px] h-[480px]"
                style={{
                  transformStyle: 'preserve-3d',
                  originX: 0.5,
                  originY: 0.5,
                  originZ: 0,
                }}
                initial={{
                  x: initialX,
                  y: initialY,
                  z: initialZ,
                  rotateY: initialRotateY,
                  opacity: 0.7,
                }}
                animate={{
                  x: isHovered ? hoverX : initialX,
                  y: isHovered ? hoverY : initialY,
                  z: isHovered ? hoverZ : initialZ,
                  rotateY: isHovered ? hoverRotateY : initialRotateY,
                  opacity: isHovered ? 1 : 0.7,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 100,
                  damping: 18,
                  mass: 0.6,
                  velocity: 1.5,
                  delay: index * 0.02,
                }}
                whileHover={{
                  scale: 1.08,
                  z: 60,
                  transition: {{
                    type: 'spring',
                    stiffness: 250,
                    damping: 20,
                    mass: 0.5,
                  }},
                }}
              >
                {/* Card Container */}
                <div
                  className="relative w-full h-full rounded-3xl overflow-hidden"
                  style={{
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden',
                  }}
                >
                  {/* Glossy Card Surface */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${category.gradient} rounded-3xl`}
                    style={{
                      boxShadow: `
                        0 20px 60px rgba(0, 0, 0, 0.5),
                        0 0 0 1px rgba(255, 255, 255, 0.1),
                        inset 0 1px 0 rgba(255, 255, 255, 0.2),
                        inset 0 -1px 0 rgba(0, 0, 0, 0.3)
                      `,
                    }}
                  />

                  {/* Glossy Overlay */}
                  <div
                    className="absolute inset-0 rounded-3xl pointer-events-none"
                    style={{
                      background: `
                        linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                        linear-gradient(225deg, rgba(255, 255, 255, 0.05) 0%, transparent 50%)
                      `,
                      mixBlendMode: 'overlay',
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-between p-8">
                    {/* Top Section */}
                    <div>
                      <motion.div
                        className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm"
                        animate={{
                          backgroundColor: isHovered
                            ? `rgba(255, 255, 255, 0.2)`
                            : 'rgba(255, 255, 255, 0.1)',
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <Folder className="h-4 w-4 text-white/80" />
                        <span className="text-sm font-medium text-white/80">
                          {category.projectCount} Proje
                        </span>
                      </motion.div>

                      <motion.h3
                        className="text-4xl font-bold text-white mb-4 tracking-tight"
                        animate={{
                          opacity: isHovered ? 1 : 0.9,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {category.title}
                      </motion.h3>
                    </div>

                    {/* Bottom Section */}
                    <motion.div
                      animate={{
                        opacity: isHovered ? 1 : 0.6,
                      }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <motion.button
                        className="flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-black w-fit"
                        whileHover={{ scale: 1.05, gap: '0.75rem' }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                        }}
                      >
                        View Projects
                        <ArrowRight className="h-5 w-5" />
                      </motion.button>
                    </motion.div>
                  </div>

                  {/* Accent Border Glow */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at center, ${category.color}40 0%, transparent 70%)`,
                      opacity: 0,
                    }}
                    animate={{
                      opacity: isHovered ? 0.6 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Edge Highlight */}
                  <div
                    className="absolute inset-0 rounded-3xl pointer-events-none"
                    style={{
                      background: `
                        linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)
                      `,
                      mixBlendMode: 'overlay',
                      opacity: 0.3,
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
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
          HOVER TO REVEAL • CLICK TO EXPLORE
        </p>
      </motion.div>
    </section>
  );
};

export default CinematicCardStack;

