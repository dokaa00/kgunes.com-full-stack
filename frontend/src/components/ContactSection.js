import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Mail, MapPin, Send, Linkedin, Instagram } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const { t } = useTranslation();
  const titleRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      mouseX.set(x * 20);
      mouseY.set(y * 20);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const springConfig = { damping: 20, stiffness: 100 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // GSAP animasyon - başlık karakterleri için (CardStack3D ile tamamen aynı)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const chars = titleRef.current?.querySelectorAll('.char');
      if (!chars || chars.length === 0) return;

      gsap.set(chars, { 
        opacity: 0, 
        y: 100, 
        rotateX: -90,
        filter: 'blur(10px)'
      });

      gsap.to(chars, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        stagger: {
          each: 0.05,
          from: "center",
        },
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Email gönderimi için mailto link oluştur
    const subject = encodeURIComponent(`İletişim: ${formData.name}`);
    const body = encodeURIComponent(
      `İsim: ${formData.name}\nEmail: ${formData.email}\n\nMesaj:\n${formData.message}`
    );
    
    window.location.href = `mailto:kaangunes2009@gmail.com?subject=${subject}&body=${body}`;
    
    // Form'u temizle
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#050505] via-[#0a0a0f] to-[#050505] py-32 px-6 overflow-hidden">
      {/* Animated Background Blobs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        style={{ x, y }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        style={{ x: useTransform(x, (value) => -value), y: useTransform(y, (value) => -value) }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl"
        style={{ x: useTransform(x, (value) => value * 0.5), y: useTransform(y, (value) => value * 0.5) }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div
          ref={titleRef}
          className="text-center mb-20"
          style={{ perspective: '1000px' }}
        >
          <h2 className="text-6xl md:text-8xl font-extrabold text-white mb-6 tracking-tight inline-block">
            {'İletişime Geç'.split('').map((char, i) => (
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
          <motion.p 
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl text-white/60 max-w-2xl mx-auto"
          >
            Bir proje fikriniz mi var? Birlikte harika şeyler yaratalım.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Info - Liquid Glass Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl border border-white/20 p-10">
              {/* Glossy overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-40" />
              
              {/* Animated shimmer */}
              <motion.div
                className="absolute inset-0 opacity-0"
                animate={{
                  background: [
                    'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
                    'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
                  ],
                  backgroundPosition: ['-200% 0', '200% 0'],
                  opacity: [0, 0.5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Content */}
              <div className="relative z-10 space-y-8">
                <h3 className="text-3xl font-bold text-white mb-8">İletişim Bilgileri</h3>
                
                <motion.a
                  href="mailto:kaangunes2009@gmail.com"
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 group-hover:bg-white/20 transition-colors">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">Email</p>
                    <p className="text-white font-medium">kaangunes2009@gmail.com</p>
                  </div>
                </motion.a>

                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 group-hover:bg-white/20 transition-colors">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">Konum</p>
                    <p className="text-white font-medium">İstanbul, Türkiye</p>
                  </div>
                </motion.div>

                {/* Social Links */}
                <div className="pt-8 border-t border-white/10">
                  <p className="text-white/50 text-sm mb-4">Sosyal Medya</p>
                  <div className="grid grid-cols-2 gap-3">
                    <motion.a
                      href="https://www.linkedin.com/in/kaan-gunes/"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors group"
                    >
                      <Linkedin className="text-white flex-shrink-0" size={20} />
                      <span className="text-white font-medium text-sm">LinkedIn</span>
                    </motion.a>
                    <motion.a
                      href="https://instagram.com/kgunes30"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors group"
                    >
                      <Instagram className="text-white flex-shrink-0" size={20} />
                      <span className="text-white font-medium text-sm">Instagram</span>
                    </motion.a>
                  </div>
                </div>
              </div>

              {/* Edge glow */}
              <div className="absolute inset-0 rounded-3xl shadow-[inset_0_0_30px_rgba(255,255,255,0.1)] pointer-events-none" />
            </div>
          </motion.div>

          {/* Contact Form - Liquid Glass Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl border border-white/20 p-10">
              {/* Glossy overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-40" />
              
              {/* Content */}
              <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                <h3 className="text-3xl font-bold text-white mb-8">Mesaj Gönder</h3>

                <div className="space-y-2">
                  <label className="text-white/70 text-sm font-medium">İsim</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/20 text-white placeholder-white/30 focus:bg-white/10 focus:border-white/40 focus:outline-none transition-all"
                    placeholder="Adınız Soyadınız"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-white/70 text-sm font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/20 text-white placeholder-white/30 focus:bg-white/10 focus:border-white/40 focus:outline-none transition-all"
                    placeholder="ornek@email.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-white/70 text-sm font-medium">Mesaj</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/20 text-white placeholder-white/30 focus:bg-white/10 focus:border-white/40 focus:outline-none transition-all resize-none"
                    placeholder="Mesajınızı buraya yazın..."
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(255,255,255,0.2)' }}
                  whileTap={{ scale: 0.98 }}
                  onHoverStart={() => setIsHovered(true)}
                  onHoverEnd={() => setIsHovered(false)}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold flex items-center justify-center gap-3 hover:from-white/30 hover:to-white/20 transition-all relative overflow-hidden"
                >
                  {/* Button shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: isHovered ? ['0%', '200%'] : '0%',
                    }}
                    transition={{
                      duration: 0.6,
                      ease: "easeInOut",
                      repeat: isHovered ? Infinity : 0,
                    }}
                  />
                  <span className="relative z-10">Gönder</span>
                  <Send className="relative z-10" size={20} />
                </motion.button>
              </form>

              {/* Edge glow */}
              <div className="absolute inset-0 rounded-3xl shadow-[inset_0_0_30px_rgba(255,255,255,0.1)] pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
