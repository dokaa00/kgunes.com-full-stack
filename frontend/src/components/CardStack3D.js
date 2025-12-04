import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Folder, ArrowLeft, X, Calendar, Tag } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioCategories } from '../data/portfolioData';
import { encodeImagePath } from '../utils/imageUtils';
import OptimizedImage from './OptimizedImage';
import { preloadImages, preloadVisibleImages } from '../utils/imageOptimization';

gsap.registerPlugin(ScrollTrigger);

// --- 1. PROJE DETAY MODALI ---
const ProjectDetail = ({ project, category, onBack }) => {
  const { t } = useTranslation();
  const [vectorImageLayout, setVectorImageLayout] = useState({ isHorizontal: false, aspectRatio: 1 });
  const [mannequinImageLayout, setMannequinImageLayout] = useState({ isHorizontal: false, aspectRatio: 1 });

  // Vector görselin boyutlarını kontrol et
  useEffect(() => {
    if (project.vectorImage) {
      const img = new Image();
      img.src = encodeImagePath(project.vectorImage);
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        setVectorImageLayout({
          isHorizontal: aspectRatio > 1.2,
          aspectRatio
        });
      };
    }
  }, [project.vectorImage]);

  // Mannequin görselin boyutlarını kontrol et
  useEffect(() => {
    if (project.mannequinImage) {
      const img = new Image();
      img.src = encodeImagePath(project.mannequinImage);
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        setMannequinImageLayout({
          isHorizontal: aspectRatio > 1.2,
          aspectRatio
        });
      };
    }
  }, [project.mannequinImage]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] bg-[#050505] overflow-y-auto"
    >
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/10 p-6 flex justify-between items-center">
        <button
          onClick={onBack}
          className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white"
        >
          <ArrowLeft size={24} />
        </button>
        <button
          onClick={onBack}
          className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white"
        >
          <X size={24} />
        </button>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6 md:p-12">
        {/* Project Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            {project.name || project.title}
          </h1>
          <div className="flex items-center gap-6 text-white/60 mb-6">
            <div className="flex items-center gap-2">
              <Tag size={18} />
              <span>{category.title}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{project.date || '2024'}</span>
            </div>
          </div>
        </motion.div>

        {/* Images Grid - Hoodie: Alt alta, Diğerleri: Yan yana */}
        {project.mannequinImage && project.vectorImage ? (
          project.category === 'hoodie' ? (
            // Hoodie: Vektörel üstte küçük, gerçek görsel altta büyük
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8 max-w-5xl mx-auto space-y-6"
            >
              {/* Vector Image - Küçük */}
              <div className="rounded-[32px] overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/5 shadow-2xl relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-30"></div>
                <OptimizedImage
                  src={project.vectorImage}
                  alt={`${project.name} - Vector`}
                  loading="eager"
                  priority={1}
                  className="w-full h-auto object-contain z-10 p-8"
                />
                <div className="absolute bottom-0 left-0 right-0 py-3 text-center bg-gradient-to-t from-black/50 to-transparent z-20">
                  <p className="text-white/90 text-sm font-medium tracking-wide">{t('project.vectorDesign')}</p>
                </div>
              </div>

              {/* Mannequin Image - Büyük */}
              <div className="rounded-[32px] overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/5 shadow-2xl relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-30"></div>
                <OptimizedImage
                  src={project.mannequinImage}
                  alt={`${project.name} - Mannequin`}
                  loading="eager"
                  priority={1}
                  className="w-full h-auto object-contain z-10 p-4"
                />
                <div className="absolute bottom-0 left-0 right-0 py-3 text-center bg-gradient-to-t from-black/50 to-transparent z-20">
                  <p className="text-white/90 text-sm font-medium tracking-wide">{t('project.mannequinView')}</p>
                </div>
              </div>
            </motion.div>
          ) : (
            // Forma ve T-Shirt: Yan yana
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8 flex justify-center"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl items-start">
                {/* Vector Image */}
                <div className="rounded-[32px] overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/5 shadow-2xl relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-30"></div>
                  <OptimizedImage
                    src={project.vectorImage}
                    alt={`${project.name} - Vector`}
                    loading="eager"
                    priority={1}
                    className="w-full h-auto object-contain z-10 p-8"
                  />
                  <div className="absolute bottom-0 left-0 right-0 py-3 text-center bg-gradient-to-t from-black/50 to-transparent z-20">
                    <p className="text-white/90 text-sm font-medium tracking-wide">{t('project.vectorDesign')}</p>
                  </div>
                </div>

                {/* Mannequin Image */}
                <div className="rounded-[32px] overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/5 shadow-2xl relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-30"></div>
                  <OptimizedImage
                    src={project.mannequinImage}
                    alt={`${project.name} - Mannequin`}
                    loading="eager"
                    priority={1}
                    className="w-full h-auto object-contain z-10 p-4"
                  />
                  <div className="absolute bottom-0 left-0 right-0 py-3 text-center bg-gradient-to-t from-black/50 to-transparent z-20">
                    <p className="text-white/90 text-sm font-medium tracking-wide">{t('project.mannequinView')}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        ) : (
          /* Single Hero Image for all other items */
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 rounded-[32px] overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/5 shadow-2xl relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-30"></div>
            <OptimizedImage
              src={project.mannequinImage || project.image || project.tempImage}
              alt={project.name || project.title}
              loading="eager"
              priority={1}
              className="w-full h-auto object-contain relative z-10"
            />
          </motion.div>
        )}

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <div className="prose prose-invert max-w-none">
            <p className="text-xl text-white/80 leading-relaxed mb-6 font-light">
              {project.description || t('project.defaultDescription', { category: category.title, project: project.title })}
            </p>

            {project.details && (
              <div className="text-white/70 space-y-4">
                {project.details.map((detail, i) => (
                  <p key={i} className="text-lg leading-relaxed font-light">
                    {detail}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Tags */}
          {project.tags && (
            <div className="flex flex-wrap gap-3 pt-6">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-light"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {/* Additional Images */}
        {project.additionalImages && project.additionalImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {project.additionalImages.map((img, i) => (
              <div key={i} className="rounded-2xl overflow-hidden bg-gray-900">
                <OptimizedImage
                  src={img}
                  alt={`${project.title} - ${i + 1}`}
                  loading="lazy"
                  priority={8}
                  placeholder={true}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

// --- 2. PROJE GALERİSİ BİLEŞENİ (Düzensiz/Masonry Düzen) ---
const ProjectGallery = ({ category, onBack }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const { t } = useTranslation();

  // Gerçek projeleri kullan - eğer varsa
  const projects = category.projects || [];

  // İlk 10 + 5 projeyi preload et
  useEffect(() => {
    if (projects.length > 0) {
      const imagesToPreload = projects.slice(0, 15).map(p =>
        encodeImagePath(p.mannequinImage || p.image)
      );

      // İlk 10'u yüksek öncelikle
      preloadImages(imagesToPreload.slice(0, 10), 3, 1);

      // Sonraki 5'i düşük öncelikle
      if (imagesToPreload.length > 10) {
        setTimeout(() => {
          preloadImages(imagesToPreload.slice(10), 2, 5);
        }, 500);
      }
    }
  }, [projects]);

  return createPortal(
    <>
      <AnimatePresence mode="wait">
        {selectedProject ? (
          <ProjectDetail
            key="detail"
            project={selectedProject}
            category={category}
            onBack={() => setSelectedProject(null)}
          />
        ) : (
          <motion.div
            key="gallery"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] bg-[#050505] overflow-y-auto"
          >
            {/* Üst Bar */}
            <div className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/10 p-6 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <button
                  onClick={onBack}
                  className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white"
                >
                  <ArrowLeft size={24} />
                </button>
                <div>
                  <h2 className="text-3xl font-bold text-white">{category.title}</h2>
                  <p className="text-white/50 text-sm">{t('cards.projectListCount', { count: category.projectCount })}</p>
                </div>
              </div>
            </div>

            {/* Düzensiz (Masonry) Grid */}
            <div className="p-4 md:p-8 max-w-[1920px] mx-auto">
              {/* CSS Columns ile Masonry Yapısı */}
              <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="break-inside-avoid relative group rounded-2xl overflow-hidden bg-gray-900 cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <OptimizedImage
                      src={project.mannequinImage || project.image}
                      alt={project.name}
                      loading={index < 10 ? 'eager' : 'lazy'}
                      priority={index < 10 ? 2 : 7}
                      placeholder={true}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                      style={{ minHeight: '200px' }}
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-medium px-4 py-2 border border-white/30 rounded-full backdrop-blur-sm">
                        {t('cards.exploreProject')}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>,
    document.body
  );
};

// --- 3. ANA BİLEŞEN (CARD STACK) ---

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.3 }
  }
};

const titleCharVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -90 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100
    }
  },
  exit: {
    opacity: 0,
    y: -50,
    rotateX: 90,
    transition: { duration: 0.3 }
  }
};

const PortfolioContainer = ({ setCursorVariant }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isStackHovered, setIsStackHovered] = useState(false);

  useEffect(() => {
    if (setCursorVariant) {
      if (selectedCategory) {
        setCursorVariant('default');
      } else {
        setCursorVariant(isStackHovered ? 'project' : 'default');
      }
    }
  }, [isStackHovered, selectedCategory, setCursorVariant]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [18, -18]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-25, 25]), springConfig);

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsStackHovered(false);
    setHoveredIndex(null);
  };

  // Global mouse tracking
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, [mouseX, mouseY]);

  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  const { t } = useTranslation();
  const titleText = t('cards.title');

  // portfolioData.js'den gelen kategorileri kullan
  const categories = portfolioCategories.map(cat => ({
    id: cat.id,
    title: t(cat.titleKey),
    projectCount: cat.projectCount,
    gradient: cat.color,
    image: cat.image,
    projects: cat.projects
  }));

  // Ana kategori kartlarının ilk 10'unu preload et
  useEffect(() => {
    const cardImages = categories.slice(0, 10).map(cat => encodeImagePath(cat.image));
    preloadImages(cardImages, 3, 1);
  }, []);

  const totalCards = categories.length;
  const cardWidth = isMobile ? 200 : isTablet ? 260 : 340;
  const cardHeight = isMobile ? 280 : isTablet ? 380 : 500;

  const calculatePosition = (index) => {
    const baseSpacing = isMobile
      ? (isStackHovered ? 50 : 35)
      : isTablet
        ? (isStackHovered ? 90 : 60)
        : (isStackHovered ? 140 : 100);

    const hoverOffset = isMobile ? 100 : isTablet ? 150 : 200;

    let offset = 0;
    let dynamicZIndex = totalCards - index;

    if (hoveredIndex !== null) {
      if (index < hoveredIndex) offset = -hoverOffset;
      else if (index > hoveredIndex) offset = hoverOffset;

      if (index === hoveredIndex) dynamicZIndex = 50;
      else if (index < hoveredIndex) dynamicZIndex = index + 1;
      else dynamicZIndex = totalCards - index;
    }

    const totalWidth = (totalCards - 1) * baseSpacing;
    const startX = -totalWidth / 2;
    const xPosition = startX + (index * baseSpacing) + offset;

    return {
      x: xPosition,
      rotateZ: index * 1,
      scale: 1 - (index * 0.04),
      zIndex: dynamicZIndex,
    };
  };

  return (
    <section className="relative min-h-screen py-8 bg-transparent font-sans cursor-none">

      <AnimatePresence mode="wait">

        {selectedCategory ? (
          <ProjectGallery
            key="gallery"
            category={selectedCategory}
            onBack={() => { setIsStackHovered(false); setSelectedCategory(null) }}
          />
        ) : (
          <motion.div
            key="stack"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full h-full min-h-[600px] md:min-h-[800px] lg:min-h-[1000px] flex flex-col justify-center items-center pt-32"
          >
            <div
              className="absolute top-4 md:-top-4 left-0 right-0 text-center z-[60] mb-10 md:mb-20 px-4"
              style={{ perspective: '1000px' }}
            >
              <h2 className="text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] text-white font-aequitas inline-block">
                {titleText.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    variants={titleCharVariants}
                    className="char inline-block"
                    style={{
                      transformStyle: 'preserve-3d',
                      display: char === ' ' ? 'inline' : 'inline-block'
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </h2>
              <div className="mt-2 md:mt-4 overflow-hidden">
                <motion.p
                  variants={itemVariants}
                  className="subtitle text-white/40 text-xs sm:text-sm md:text-lg font-light tracking-widest uppercase"
                >
                  {t('cards.subtitle')}
                </motion.p>
              </div>
            </div>
            <div
              className="relative w-full h-full flex justify-center items-center mt-8 md:mt-16 px-4 cursor-none"
              onMouseEnter={() => setIsStackHovered(true)}
              onMouseLeave={() => setIsStackHovered(false)}
              style={{ perspective: isMobile ? '1000px' : '2000px' }}
            >
              <motion.div
                variants={itemVariants}
                className="relative flex justify-center items-center"
                style={{
                  rotateX: rotateX,
                  rotateY: rotateY,
                  transformStyle: 'preserve-3d',
                  willChange: 'transform', // Force hardware acceleration
                }}
              >
                {categories.map((category, index) => {
                  const pos = calculatePosition(index);
                  const isHovered = hoveredIndex === index;

                  return (
                    <motion.div
                      key={category.id}
                      className="absolute"
                      style={{
                        width: cardWidth,
                        height: cardHeight,
                        zIndex: pos.zIndex,
                        transformStyle: 'preserve-3d',
                        willChange: 'transform', // Force hardware acceleration
                      }}
                      animate={{
                        x: pos.x,
                        y: isHovered ? -10 : 0,
                        rotateY: isHovered ? 0 : -15,
                        rotateZ: isHovered ? 0 : pos.rotateZ,
                        scale: isHovered ? 1.05 : pos.scale,
                        z: isHovered ? 100 : 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 150,
                        damping: 20,
                        mass: 0.8,
                        velocity: 2
                      }}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onClick={() => setSelectedCategory(category)}
                    >
                      <motion.div
                        className={`absolute ${isMobile ? '-top-10' : isTablet ? '-top-14' : '-top-16'} left-0 w-full text-left pointer-events-none`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                          opacity: isHovered ? 1 : 0,
                          y: isHovered ? 0 : 20,
                          scale: isHovered ? 1 : 0.8
                        }}
                      >
                        <h3 className={`${isMobile ? 'text-2xl' : isTablet ? 'text-4xl' : 'text-5xl'} font-normal text-white mb-2 md:mb-3 font-aequitas whitespace-nowrap`} style={{ textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
                          {category.title}
                        </h3>
                      </motion.div>

                      <div className="relative w-full h-full rounded-[24px] overflow-hidden bg-gray-900 border-[1px] border-white/20 shadow-2xl transition-shadow duration-300 group-hover:shadow-[0_30px_60px_-15px_rgba(255,255,255,0.15)] cursor-pointer group">
                        {(category.id === 5 || category.id === 6) ? (
                          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                            <div className="absolute inset-0 backdrop-blur-md bg-black/30" />
                            <span className="relative z-10 text-2xl md:text-4xl font-bold text-white/80 tracking-widest uppercase font-aequitas">
                              {t('cards.comingSoon')}
                            </span>
                          </div>
                        ) : (
                          <>
                            <OptimizedImage
                              src={category.image}
                              alt={category.title}
                              loading="eager"
                              priority={index < 4 ? 1 : 3}
                              placeholder={true}
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-300" />
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                          </>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            <motion.div
              variants={itemVariants}
              className="absolute bottom-4 md:bottom-8 text-white/20 text-xs md:text-sm tracking-widest pointer-events-none"
            >
              {t('cards.bottomExplore')}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PortfolioContainer;