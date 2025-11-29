import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Folder, ArrowLeft, X, Calendar, Tag } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- 1. PROJE DETAY MODALI ---
const ProjectDetail = ({ project, category, onBack }) => {
  const { t } = useTranslation();
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
      <div className="max-w-6xl mx-auto p-6 md:p-12">
        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 rounded-3xl overflow-hidden"
        >
          <img
            src={project.tempImage}
            alt={project.title}
            className="w-full h-auto object-cover"
          />
        </motion.div>

        {/* Project Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              {project.title}
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
          </div>

          {/* Description */}
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
              <div key={i} className="rounded-2xl overflow-hidden">
                <img
                  src={img}
                  alt={`${project.title} - ${i + 1}`}
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
  // Proje sayısı kadar sahte veri oluşturuyoruz
  // Düzensiz görünüm için her karta rastgele yükseklik (aspect ratio) atıyoruz
  const [selectedProject, setSelectedProject] = useState(null);

  const { t } = useTranslation();

  const projects = Array.from({ length: category.projectCount }).map((_, i) => ({
    id: i,
    title: `${category.title} ${i + 1}`,
    height: Math.floor(Math.random() * (400 - 200 + 1) + 200), // 200px ile 400px arası rastgele yükseklik
    image: `https://source.unsplash.com/random/600x${Math.floor(Math.random() * (800 - 400 + 1) + 400)}?${category.title}&sig=${i}`,
    // Unsplash source artık bazen çalışmıyor, placeholder kullanalım:
    tempImage: `https://picsum.photos/seed/${category.title}${i}/400/${Math.floor(Math.random() * (600 - 300) + 300)}`,
    description: t('project.defaultDescription', { category: category.title, project: `${category.title} ${i + 1}` }),
    date: `2024`,
    tags: ['Design', 'Creativity', 'Innovation'],
    details: [
      `Bu ${category.title} projesi, müşteri ihtiyaçlarını karşılamak için özenle tasarlanmıştır.`,
      `Proje sürecinde modern tasarım araçları ve metodolojileri kullanılmıştır.`,
      `Sonuç olarak, hem görsel hem de fonksiyonel açıdan başarılı bir çalışma ortaya çıkmıştır.`
    ],
    additionalImages: [
      `https://picsum.photos/seed/${category.title}${i}-1/800/600`,
      `https://picsum.photos/seed/${category.title}${i}-2/800/600`
    ]
  }));

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
                      src={project.tempImage} 
                      alt="Project"
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

  const categories = [ // KAAN NOT
    { id: 1, title: 'Sosyal Medya', projectCount: 25, gradient: 'from-purple-600 via-indigo-600 to-purple-800', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=1200&fit=crop' },
    { id: 2, title: 'Giyim', projectCount: 8, gradient: 'from-orange-600 via-red-600 to-orange-800', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=1200&fit=crop' },
    { id: 3, title: 'Logolar', projectCount: 9, gradient: 'from-blue-500 via-cyan-500 to-blue-700', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=1200&fit=crop' },
    { id: 4, title: 'Afişler', projectCount: 7, gradient: 'from-pink-500 via-rose-500 to-pink-700', image: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=800&h=1200&fit=crop' },
    { id: 5, title: 'IoT', projectCount: 2, gradient: 'from-emerald-500 via-teal-500 to-emerald-700', image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=1200&fit=crop' },
    { id: 6, title: 'AI', projectCount: 15, gradient: 'from-amber-500 via-orange-500 to-amber-700', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=1200&fit=crop' },
  ];

  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    const handleGlobalMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleGlobalMouseMove);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [mouseX, mouseY]);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

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

  const { t } = useTranslation();
  const titleText = t('cards.title');

  return (
    <section ref={sectionRef} className="relative min-h-screen py-8 bg-[#050505] overflow-hidden font-sans">
      
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

                            <div className={`relative w-full h-full ${isMobile ? 'rounded-[20px]' : isTablet ? 'rounded-[30px]' : 'rounded-[40px]'} overflow-hidden bg-gray-900 border-[1px] border-white/20 shadow-2xl cursor-pointer group`}>
                                <img 
                                    src={category.image} 
                                    alt={category.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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