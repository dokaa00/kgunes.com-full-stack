import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Folder, ArrowLeft, X, ExternalLink, Tag } from 'lucide-react';

// --- 1. PARÇA: DETAY MODALI (Pop-up) ---
const ProjectDetailModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
    >
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        layoutId={`card-${project.id}`}
        className="relative w-full max-w-6xl bg-[#0a0a0a] rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors backdrop-blur-md border border-white/10"
        >
          <X size={24} />
        </button>

        <div className="w-full md:w-3/5 h-[40vh] md:h-auto relative bg-gray-900">
           <motion.img
            layoutId={`image-${project.id}`} 
            src={project.tempImage}
            alt="Detail"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#0a0a0a]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="w-full md:w-2/5 p-8 md:p-12 flex flex-col overflow-y-auto"
        >
          <div className="mb-8">
            <motion.h2 className="text-4xl md:text-5xl font-bold text-white mb-3 leading-tight font-handwriting">
              {project.title}
            </motion.h2>
            <p className="text-white/40 text-sm uppercase tracking-widest font-semibold border-b border-white/10 pb-4 inline-block">
              {project.category} Koleksiyonu
            </p>
          </div>

          <div className="prose prose-invert prose-lg text-white/70 mb-8 leading-relaxed">
            <p>
              Bu çalışma, <strong>{project.color}</strong> estetiğini modern tasarım ilkeleriyle birleştiriyor. 
              Kullanıcı deneyimini ön planda tutarak oluşturulan bu projede, minimalist dokunuşlar ve güçlü tipografi kullanıldı.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-10">
            {['Photoshop', 'Illustrator', 'Design'].map((tag, i) => (
              <span key={i} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/60 flex items-center gap-1">
                <Tag size={12} /> {tag}
              </span>
            ))}
          </div>

          <div className="mt-auto pt-6 border-t border-white/10">
            <button className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
              Proje Detayı <ExternalLink size={18} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// --- 2. PARÇA: GALERİ SAYFASI ---
const ProjectGallery = ({ category, onBack }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = Array.from({ length: category.projectCount }).map((_, i) => ({
    id: i,
    title: `${category.title} #${i + 1}`,
    category: category.title,
    color: ['Neon', 'Dark', 'Pastel', 'Retro'][Math.floor(Math.random() * 4)],
    height: Math.floor(Math.random() * (400 - 200 + 1) + 200),
    tempImage: `https://picsum.photos/seed/${category.title}${i}/600/${Math.floor(Math.random() * (800 - 400 + 1) + 400)}`
  }));

  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-[#050505] overflow-y-auto"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="sticky top-0 z-40 bg-[#050505]/90 backdrop-blur-md border-b border-white/10 p-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white border border-white/5">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">{category.title}</h2>
            <p className="text-white/50 text-sm">{category.projectCount} Proje</p>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-8 max-w-[1920px] mx-auto min-h-screen pb-20">
        <div className="columns-1 md:columns-3 xl:columns-4 gap-6 space-y-6">
          {projects.map((project, index) => (
            <motion.div
              layoutId={`card-${project.id}`}
              key={project.id}
              // DİKKAT: Ana karta tıklama
              onClick={() => setSelectedProject(project)}
              className="break-inside-avoid relative group rounded-2xl overflow-hidden bg-gray-900 cursor-pointer mb-6 border border-white/5"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <motion.img 
                layoutId={`image-${project.id}`}
                src={project.tempImage} 
                alt="Project"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* DÜZELTME BURADA: Overlay div'ine de onClick ekledik */}
              <div 
                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                onClick={(e) => {
                    e.stopPropagation(); // Üst üste binmeyi engelle
                    setSelectedProject(project);
                }}
              >
                {/* DÜZELTME BURADA: Butona da onClick ekledik */}
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation(); 
                    setSelectedProject(project);
                  }}
                  className="px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-medium cursor-pointer"
                >
                  Projeyi İncele
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- 3. PARÇA: ANA KARTLAR (CardStack3D) ---
const CardStack3D = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isStackHovered, setIsStackHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 22, stiffness: 100, mass: 0.6 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig); 
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig); 

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };
  
  const handleMouseLeave = () => {
    mouseX.set(0); mouseY.set(0); setIsStackHovered(false); setHoveredIndex(null);
  };

  const categories = [
    { id: 1, title: 'Sosyal Medya', projectCount: 25, gradient: 'from-purple-600 via-indigo-600 to-purple-800', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=1200&fit=crop' },
    { id: 2, title: 'Giyim', projectCount: 8, gradient: 'from-orange-600 via-red-600 to-orange-800', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=1200&fit=crop' },
    { id: 3, title: 'Logolar', projectCount: 9, gradient: 'from-blue-500 via-cyan-500 to-blue-700', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=1200&fit=crop' },
    { id: 4, title: 'Afişler', projectCount: 7, gradient: 'from-pink-500 via-rose-500 to-pink-700', image: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=800&h=1200&fit=crop' },
    { id: 5, title: 'IoT', projectCount: 2, gradient: 'from-emerald-500 via-teal-500 to-emerald-700', image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=1200&fit=crop' },
    { id: 6, title: 'AI Art', projectCount: 15, gradient: 'from-amber-500 via-orange-500 to-amber-700', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=1200&fit=crop' },
  ];

  const totalCards = categories.length;
  const cardWidth = 500; const cardHeight = 750;
  
  const calculatePosition = (index) => {
    const baseSpacing = isStackHovered ? 200 : 140;
    let offset = 0;
    let dynamicZIndex = totalCards - index; 
    if (hoveredIndex !== null) {
        if (index < hoveredIndex) offset = -320; 
        else if (index > hoveredIndex) offset = 320; 
        if (index === hoveredIndex) dynamicZIndex = 50;
        else if (index < hoveredIndex) dynamicZIndex = index + 1; 
        else dynamicZIndex = totalCards - index;
    }
    const totalWidth = (totalCards - 1) * baseSpacing;
    const startX = -totalWidth / 2;
    const xPosition = startX + (index * baseSpacing) + offset;
    return { x: xPosition, rotateZ: index * 1, scale: 1 - (index * 0.04), zIndex: dynamicZIndex };
  };

  return (
    <section className="relative h-screen bg-[#050505] overflow-hidden font-sans">
      <AnimatePresence mode="wait">
        {selectedCategory ? (
          <ProjectGallery key="gallery" category={selectedCategory} onBack={() => setSelectedCategory(null)} />
        ) : (
          <motion.div
             key="stack"
             className="relative w-full h-full flex flex-col justify-center items-center"
             exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
             transition={{ duration: 0.5 }}
          >
              <div 
                className="relative w-full h-full flex justify-center items-center"
                onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onMouseEnter={() => setIsStackHovered(true)}
                style={{ perspective: '2000px' }} 
              >
                <motion.div className="relative flex justify-center items-center" style={{ rotateX: rotateX, rotateY: rotateY, transformStyle: 'preserve-3d' }}>
                    {categories.map((category, index) => {
                    const pos = calculatePosition(index);
                    const isHovered = hoveredIndex === index;
                    return (
                        <motion.div
                        key={category.id} className="absolute"
                        style={{ width: cardWidth, height: cardHeight, zIndex: pos.zIndex, transformStyle: 'preserve-3d' }}
                        animate={{ x: pos.x, y: isHovered ? -30 : 0, rotateY: isHovered ? 0 : -15, rotateZ: isHovered ? 0 : pos.rotateZ, scale: isHovered ? 1.08 : pos.scale, z: isHovered ? 120 : 0 }}
                        transition={{ type: "spring", stiffness: 140, damping: 18, mass: 0.7, velocity: 2 }}
                        onMouseEnter={() => setHoveredIndex(index)} onClick={() => setSelectedCategory(category)}
                        >
                            <motion.div className="absolute -top-32 left-0 w-full text-left pointer-events-none" initial={{ opacity: 0, y: 20 }} animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20, scale: isHovered ? 1 : 0.8 }}>
                                <h3 className="text-6xl font-bold text-white mb-3 font-handwriting" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>{category.title}</h3>
                                <div className="flex items-center gap-3 text-white/70"><Folder size={24} /><span className="text-xl">{category.projectCount} Çalışma</span></div>
                            </motion.div>
                            <div className="relative w-full h-full rounded-[40px] overflow-hidden bg-gray-900 border-[1px] border-white/20 shadow-2xl cursor-pointer group">
                                <img src={category.image} alt={category.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-300" />
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            </div>
                        </motion.div>
                    );
                    })}
                </motion.div>
              </div>
              <div className="absolute bottom-10 text-white/20 text-sm tracking-widest pointer-events-none">GALERİYİ KEŞFET</div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CardStack3D;