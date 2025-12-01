import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Folder, ArrowLeft, X, Calendar, Tag } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioCategories } from '../data/portfolioData';
import { encodeImagePath } from '../utils/imageUtils';

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
      className="fixed inset-0 z-[60] bg-[#050505] overflow-y-auto"
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
              <div className="rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-2xl relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50"></div>
                <img
                  src={encodeImagePath(project.vectorImage)}
                  alt={`${project.name} - Vector`}
                  loading="eager"
                  className="w-full h-auto object-contain z-10 p-8"
                />
                <div className="absolute bottom-0 left-0 right-0 py-3 text-center bg-gradient-to-t from-black/50 to-transparent z-20">
                  <p className="text-white/90 text-sm font-medium tracking-wide">{t('project.vectorDesign')}</p>
                </div>
              </div>

              {/* Mannequin Image - Büyük */}
              <div className="rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-2xl relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50"></div>
                <img
                  src={encodeImagePath(project.mannequinImage)}
                  alt={`${project.name} - Mannequin`}
                  loading="eager"
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
                <div className="rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-2xl relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50"></div>
                  <img
                    src={encodeImagePath(project.vectorImage)}
                    alt={`${project.name} - Vector`}
                    loading="eager"
                    className="w-full h-auto object-contain z-10 p-8"
                  />
                  <div className="absolute bottom-0 left-0 right-0 py-3 text-center bg-gradient-to-t from-black/50 to-transparent z-20">
                    <p className="text-white/90 text-sm font-medium tracking-wide">{t('project.vectorDesign')}</p>
                  </div>
                </div>

                {/* Mannequin Image */}
                <div className="rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-2xl relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50"></div>
                  <img
                    src={encodeImagePath(project.mannequinImage)}
                    alt={`${project.name} - Mannequin`}
                    loading="eager"
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
            className="mb-8 rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-2xl relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50"></div>
            <img
              src={encodeImagePath(project.mannequinImage || project.image || project.tempImage)}
              alt={project.name || project.title}
              loading="eager"
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
            <p className="text-xl text-white/80 leading-relaxed mb-6">
              {project.description || t('project.defaultDescription', { category: category.title, project: project.title })}
            </p>
            
            {project.details && (
              <div className="text-white/70 space-y-4">
                {project.details.map((detail, i) => (
                  <p key={i} className="text-lg leading-relaxed">
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
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm"
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
                <img
                  src={img}
                  alt={`${project.title} - ${i + 1}`}
                  loading="lazy"
                  className="w-full h-auto object-cover"
                  style={{ backgroundColor: '#1a1a1a' }}
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

  return (
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
            className="fixed inset-0 z-50 bg-[#050505] overflow-y-auto"
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
                    <img 
                      src={encodeImagePath(project.mannequinImage || project.image)} 
                      alt={project.name}
                      loading="lazy"
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                      style={{ minHeight: '200px', backgroundColor: '#1a1a1a' }}
                      onLoad={(e) => e.target.style.backgroundColor = 'transparent'}
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
    </>
  );
};


// --- 2. ANA BİLEŞEN (CARD STACK) ---
const PortfolioContainer = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isStackHovered, setIsStackHovered] = useState(false);
  
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const bottomTextRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const chars = titleRef.current?.querySelectorAll('.char');
    
      if (chars && chars.length > 0) {
        gsap.set(chars, {
          opacity: 0,
          filter: 'blur(30px)',
          scale: 1.3,
          y: 20,
        });

        gsap.to(chars, {
          opacity: 1,
          filter: 'blur(0px)',
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: {
            each: 0.05,
            from: "center",
          },
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });
      }

      const subtitle = titleRef.current?.querySelector('.subtitle');
      if (subtitle) {
        gsap.fromTo(subtitle,
          {
            opacity: 0,
            filter: 'blur(20px)',
            y: 20,
          },
          {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            duration: 0.6,
            delay: 0.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      gsap.fromTo(cardsContainerRef.current,
        {
          y: 150,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(bottomTextRef.current,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 40%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, [selectedCategory]);

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
    <section ref={sectionRef} className="relative min-h-screen py-8 bg-transparent font-sans">
      
      <AnimatePresence mode="wait">
        
        {selectedCategory ? (
          <ProjectGallery 
            key="gallery" 
            category={selectedCategory} 
            onBack={() => setSelectedCategory(null)} 
          />
        ) : (
          <motion.div
             key="stack"
             className="relative w-full h-full min-h-[600px] md:min-h-[800px] lg:min-h-[1000px] flex flex-col justify-center items-center pt-32"
             exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
             transition={{ duration: 0.5 }}
          >
              <div
                ref={titleRef}
                className="absolute top-4 md:-top-4 left-0 right-0 text-center z-10 mb-10 md:mb-20 px-4"
                style={{ perspective: '1000px' }}
              >
                <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold text-white font-handwriting inline-block">
                  {titleText.split('').map((char, i) => (
                    <span 
                      key={i} 
                      className="char inline-block"
                      style={{ 
                        transformStyle: 'preserve-3d',
                        display: char === ' ' ? 'inline' : 'inline-block'
                      }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </h2>
                <div className="mt-2 md:mt-4 overflow-hidden">
                  <p className="subtitle text-white/40 text-xs sm:text-sm md:text-lg tracking-widest uppercase">{t('cards.subtitle')}</p>
                </div>
              </div>
              <div 
                ref={cardsContainerRef}
                className="relative w-full h-full flex justify-center items-center mt-8 md:mt-16 px-4"
                onMouseEnter={() => setIsStackHovered(true)}
                onMouseLeave={() => setIsStackHovered(false)}
                style={{ perspective: isMobile ? '1000px' : '2000px' }} 
              >
                <motion.div
                    className="relative flex justify-center items-center"
                    style={{
                        rotateX: rotateX,
                        rotateY: rotateY,
                        transformStyle: 'preserve-3d',
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
                        }}
                        animate={{
                            x: pos.x,
                            y: isHovered ? -30 : 0, 
                            rotateY: isHovered ? 0 : -15,
                            rotateZ: isHovered ? 0 : pos.rotateZ,
                            scale: isHovered ? 1.08 : pos.scale,
                            z: isHovered ? 120 : 0, 
                        }}
                        transition={{ 
                            type: "spring", 
                            stiffness: 150, 
                            damping: 20,
                            mass: 0.8,
                            velocity: 2
                        }}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onClick={() => setSelectedCategory(category)} // ARTIK STATE'i GÜNCELLİYORUZ
                        >
                            <motion.div
                                className={`absolute ${isMobile ? '-top-20' : isTablet ? '-top-24' : '-top-32'} left-0 w-full text-left pointer-events-none`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ 
                                    opacity: isHovered ? 1 : 0, 
                                    y: isHovered ? 0 : 20,
                                    scale: isHovered ? 1 : 0.8
                                }}
                            >
                                <h3 className={`${isMobile ? 'text-xl' : isTablet ? 'text-3xl' : 'text-4xl'} font-bold text-white mb-2 md:mb-3 font-handwriting whitespace-nowrap`} style={{ textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
                                    {category.title}
                                </h3>
                                <div className="flex items-center gap-2 md:gap-3 text-white/70">
                                    <Folder size={isMobile ? 16 : 24} />
                                    <span className={`${isMobile ? 'text-sm' : 'text-xl'}`}>{t('cards.worksCount', { count: category.projectCount })}</span>
                                </div>
                            </motion.div>

                            <div className="relative w-full h-full rounded-[40px] overflow-hidden bg-gray-900 border-[1px] border-white/20 shadow-2xl cursor-pointer group">
                                <img 
                                  src={encodeImagePath(category.image)} 
                                  alt={category.title} 
                                  loading="eager"
                                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                  style={{ backgroundColor: '#1a1a1a' }}
                                  onLoad={(e) => e.target.classList.add('loaded')}
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-300" />
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            </div>
                        </motion.div>
                    );
                    })}
                </motion.div>
              </div>

              <div ref={bottomTextRef} className="absolute bottom-4 md:bottom-8 text-white/20 text-xs md:text-sm tracking-widest pointer-events-none">
                {t('cards.bottomExplore')}
              </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PortfolioContainer;