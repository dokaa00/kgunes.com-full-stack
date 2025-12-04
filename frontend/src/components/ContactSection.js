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
    <section className="relative min-h-screen bg-transparent px-6 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto relative w-full">

        {/* Unified Sticky Container */}
        <div className="relative w-full flex flex-col justify-center items-center py-10 mt-20 md:mt-32">
          <motion.div
            className="w-full max-w-6xl flex flex-col items-center gap-8"
            style={{
              perspective: '1000px',
              rotateX: y,
              rotateY: x,
              transformStyle: "preserve-3d"
            }}
          >
            {/* Title Section */}
            <div className="text-center" style={{ transform: "translateZ(40px)" }}>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight inline-block">
                {Array.from(t('contact.title')).map((char, i) => (
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
                className="text-lg text-white/60 max-w-2xl mx-auto"
                style={{ transform: "translateZ(20px)" }}
              >
                {t('contact.subtitle')}
              </motion.p>
            </div>

            {/* Cards Container - Grouped together */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full grid md:grid-cols-2 gap-8 items-start"
              style={{ transform: "translateZ(20px)" }}
            >
              {/* Contact Info - Liquid Glass Card */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl border border-white/10 p-8 transform-gpu transition-transform duration-200 h-full">
                {/* Glossy overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-30" />

                {/* Content */}
                <div className="relative z-10 space-y-6">
                  <h3 className="text-2xl font-bold text-white mb-6">{t('contact.infoTitle')}</h3>

                  <motion.a
                    href="mailto:kaangunes2009@gmail.com"
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 group-hover:bg-white/20 transition-colors">
                      <Mail className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="text-white/50 text-xs">{t('contact.email')}</p>
                      <p className="text-white font-medium text-sm">kaangunes2009@gmail.com</p>
                    </div>
                  </motion.a>

                  <motion.div
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 group-hover:bg-white/20 transition-colors">
                      <MapPin className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="text-white/50 text-xs">{t('contact.location')}</p>
                      <p className="text-white font-medium text-sm">{t('contact.locationValue')}</p>
                    </div>
                  </motion.div>

                  {/* Social Links */}
                  <div className="pt-6 border-t border-white/10">
                    <p className="text-white/50 text-xs mb-3">{t('contact.social')}</p>
                    <div className="grid grid-cols-2 gap-3">
                      <motion.a
                        href="https://www.linkedin.com/in/kaan-gunes/"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-colors group"
                      >
                        <Linkedin className="text-white flex-shrink-0" size={18} />
                        <span className="text-white font-medium text-xs">LinkedIn</span>
                      </motion.a>
                      <motion.a
                        href="https://instagram.com/kgunes30"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-colors group"
                      >
                        <Instagram className="text-white flex-shrink-0" size={18} />
                        <span className="text-white font-medium text-xs">Instagram</span>
                      </motion.a>
                    </div>
                  </div>
                </div>

                {/* Edge glow */}
                <div className="absolute inset-0 rounded-3xl shadow-[inset_0_0_30px_rgba(255,255,255,0.1)] pointer-events-none" />
              </div>

              {/* Contact Form - Liquid Glass Card */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl border border-white/10 p-8 transform-gpu transition-transform duration-200">
                {/* Glossy overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-30" />

                {/* Content */}
                <form onSubmit={handleSubmit} className="relative z-10 space-y-4">
                  <h3 className="text-2xl font-bold text-white mb-6">{t('contact.formTitle')}</h3>

                  <div className="space-y-1">
                    <label className="text-white/70 text-xs font-medium">{t('contact.formName')}</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder-white/30 focus:bg-white/10 focus:border-white/40 focus:outline-none transition-all text-sm"
                      placeholder={t('contact.formNamePlaceholder')}
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-white/70 text-xs font-medium">{t('contact.formEmail')}</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder-white/30 focus:bg-white/10 focus:border-white/40 focus:outline-none transition-all text-sm"
                      placeholder={t('contact.formEmailPlaceholder')}
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-white/70 text-xs font-medium">{t('contact.formMessage')}</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-3 py-2 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder-white/30 focus:bg-white/10 focus:border-white/40 focus:outline-none transition-all resize-none text-sm"
                      placeholder={t('contact.formMessagePlaceholder')}
                      required
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(255,255,255,0.2)' }}
                    whileTap={{ scale: 0.98 }}
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold flex items-center justify-center gap-3 hover:from-white/30 hover:to-white/20 transition-all relative overflow-hidden text-sm"
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
                    <span className="relative z-10">{t('contact.sendButton')}</span>
                    <Send className="relative z-10" size={18} />
                  </motion.button>
                </form>

                {/* Edge glow */}
                <div className="absolute inset-0 rounded-3xl shadow-[inset_0_0_30px_rgba(255,255,255,0.1)] pointer-events-none" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
