import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Circle } from 'lucide-react';
import CardStack3D from './components/CardStack3D';
import ContactSection from './components/ContactSection';
import SkillsSection from './components/SkillsSection';
import './App.css';

// Signature Animation Component (Placeholder SVG)
const SignatureAnimation = () => {
  return (
    <motion.svg
      width="400"
      height="150"
      viewBox="0 0 400 150"
      className="w-full max-w-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Signature path - placeholder for "Kaan Güneş" signature */}
      <motion.path
        d="M 20 80 Q 50 40, 80 60 T 140 50 T 200 60 T 260 55 T 320 65 T 380 70"
        fill="none"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          pathLength: { duration: 2.5, ease: "easeInOut" },
          opacity: { duration: 0.5 }
        }}
      />
      {/* Additional flourish strokes */}
      <motion.path
        d="M 100 80 Q 120 50, 140 70"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          pathLength: { duration: 1, delay: 2, ease: "easeInOut" },
          opacity: { duration: 0.3, delay: 2 }
        }}
      />
      <motion.path
        d="M 250 60 Q 270 30, 290 50"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          pathLength: { duration: 1, delay: 2.5, ease: "easeInOut" },
          opacity: { duration: 0.3, delay: 2.5 }
        }}
      />
    </motion.svg>
  );
};

// Language Toggle Component
const LanguageToggle = ({ language, onLanguageChange }) => {
  const languages = [
    { code: 'tr', label: 'TR' },
    { code: 'en', label: 'EN' },
    { code: 'de', label: 'DE' },
    { code: 'it', label: 'IT' },
  ];

  return (
    <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 backdrop-blur-sm">
      {languages.map((lng) => (
        <button
          key={lng.code}
          onClick={() => onLanguageChange(lng.code)}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${language === lng.code
            ? 'bg-white text-black'
            : 'text-white/60 hover:text-white/80'
            }`}
        >
          {lng.label}
        </button>
      ))}
    </div>
  );
};

// Intro Screen Component
const IntroScreen = ({ onComplete }) => {
  useEffect(() => {
    // Auto-complete after 3.5 seconds (when signature animation finishes)
    const timer = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <div className="flex flex-col items-center justify-center">
        <SignatureAnimation />
      </div>
    </motion.div>
  );
};

// Main App Content with New Genre Design
const MainContent = ({ language, setLanguage }) => {
  const { t } = useTranslation();

  // Custom cursor animation
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Direct motion values for instant follow
  // const springConfig = { damping: 35, stiffness: 400, mass: 0.5 };
  // const cursorXSpring = useSpring(cursorX, springConfig);
  // const cursorYSpring = useSpring(cursorY, springConfig);

  const { scrollY } = useScroll();

  // Nav animations: Fade out and blur
  const navOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  const navBlur = useTransform(scrollY, [0, 200], ["blur(0px)", "blur(4px)"]);
  const navPointerEvents = useTransform(scrollY, (y) => y > 200 ? 'none' : 'auto');

  // Hero animations: Sticky then scroll up
  // Stays fixed (y=0) until 500px, then moves up
  const heroY = useTransform(scrollY, [0, 500, 1200], [0, 0, -800]);
  const heroOpacity = useTransform(scrollY, [800, 1200], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Direct update without delay
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Load Google Fonts & Global Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap');

        * {
          cursor: none !important;
        }

        body {
          overflow-x: hidden;
        }


      `}</style>

      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-white/40 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />

      {/* Main Container */}
      <div className="relative min-h-screen w-full">
        {/* Sticky Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ opacity: navOpacity, filter: navBlur, pointerEvents: navPointerEvents }}
          className="fixed top-0 left-0 right-0 z-50 px-8 md:px-16 py-8"
        >
          <div className="flex justify-between items-center">
            <div className="text-white/90 font-['Inter'] text-sm tracking-wider uppercase">
              Kaan Güneş
            </div>
            <div className="flex items-center gap-8 md:gap-12">
              <div className="hidden md:flex gap-8 text-white/70 font-['Inter'] text-sm">
                <a href="#work" className="hover:text-white transition-colors duration-300">Work</a>
                <a href="#skills" className="hover:text-white transition-colors duration-300">Skills</a>
                <a href="#contact" className="hover:text-white transition-colors duration-300">Contact</a>
              </div>
              <LanguageToggle language={language} onLanguageChange={setLanguage} />
            </div>
          </div>
        </motion.nav>

        {/* Fixed Hero Section */}
        <section className="fixed inset-0 flex items-center justify-center px-8 md:px-16 z-0 pointer-events-none">
          <div className="max-w-7xl w-full text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ y: heroY, opacity: heroOpacity }}
              transition={{ duration: 1, delay: 0.4 }}
              className="space-y-8 flex flex-col items-center"
            >
              <h1 className="font-['Playfair_Display'] text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-light text-white/95 leading-[1.1] tracking-tight">
                Kaan Güneş
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="font-['Inter'] text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed"
              >
                {t('hero.bio')}
              </motion.p>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                whileHover={{ x: 10 }}
                onClick={() => {
                  document.getElementById('work')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
                className="group flex items-center gap-3 mt-12 text-white/90 font-['Inter'] text-sm tracking-wider uppercase pointer-events-auto"
              >
                <span>{t('hero.explore')}</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Scrollable Content Wrapper */}
        <div className="relative z-10">
          {/* Spacer to allow seeing the fixed hero initially */}
          <div className="h-[150vh]" />

          {/* Featured Work Label */}
          <section id="work" className="px-8 md:px-16 pb-12 pt-24 bg-gradient-to-b from-transparent to-black/20 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-7xl w-full mx-auto"
            >
              <div className="flex items-center gap-3 text-white/50 font-['Inter'] text-xs tracking-widest uppercase mb-16">
                <Circle className="w-2 h-2 fill-current" />
                <span>{t('sections.selectedWorks')}</span>
              </div>
            </motion.div>
          </section>

          {/* Work Section (CardStack3D) */}
          <section className="pb-32 bg-black/20 backdrop-blur-sm">
            <CardStack3D />
          </section>

          {/* Skills Section */}
          <section id="skills" className="pb-32 bg-black/20 backdrop-blur-sm">
            <div className="flex items-center gap-3 text-white/50 font-['Inter'] text-xs tracking-widest uppercase mb-16 px-8 md:px-16 max-w-7xl mx-auto">
              <Circle className="w-2 h-2 fill-current" />
              <span>{t('sections.skills')}</span>
            </div>
            <SkillsSection />
          </section>

          {/* Footer / Contact Section */}
          <section id="contact" className="pb-16 bg-black/20 backdrop-blur-sm">
            <div className="max-w-7xl w-full mx-auto px-8 md:px-16">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="border-t border-white/10 pt-16"
              >
                <div className="grid grid-cols-1 gap-12">
                  <div>
                    <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-light text-white/95 mb-6 leading-tight whitespace-pre-line">
                      {t('footer.title')}
                    </h2>
                    <p className="font-['Inter'] text-white/60 leading-relaxed mb-12">
                      {t('footer.description')}
                    </p>

                    <ContactSection />
                  </div>
                </div>

                <div className="mt-24 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-white/40 font-['Inter'] text-xs">
                  <p>{t('footer.copyright')}</p>
                  <div className="flex gap-8">
                    <a href="#" className="hover:text-white/70 transition-colors">Instagram</a>
                    <a href="#" className="hover:text-white/70 transition-colors">Twitter</a>
                    <a href="#" className="hover:text-white/70 transition-colors">LinkedIn</a>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

// Main App Component
function App() {
  const { i18n } = useTranslation();
  const SUPPORTED_LANGUAGES = ['tr', 'en', 'de', 'it'];
  const initialLanguage = SUPPORTED_LANGUAGES.includes(i18n.language)
    ? i18n.language
    : 'tr';
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState(initialLanguage);

  // Update document title
  useEffect(() => {
    document.title = 'Kaan Güneş | Portfolio';
  }, []);

  useEffect(() => {
    i18n.changeLanguage(language);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('language', language);
    }
  }, [language, i18n]);

  const handleIntroComplete = React.useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <BrowserRouter>
      <div className="relative min-h-screen">
        <AnimatePresence>
          {loading ? (
            <IntroScreen key="intro" onComplete={handleIntroComplete} />
          ) : (
            <motion.div
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Routes>
                <Route
                  path="/"
                  element={<MainContent language={language} setLanguage={setLanguage} />}
                />
              </Routes>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </BrowserRouter>
  );
}

export default App;
