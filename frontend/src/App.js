import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Circle } from 'lucide-react';
import CardStack3D from './components/CardStack3D';
import ContactSection from './components/ContactSection';
import SkillsSection from './components/SkillsSection';


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
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [cursorVariant, setCursorVariant] = useState('default');

  // Removed spring physics for instant tracking
  // const springConfig = { damping: 25, stiffness: 700 };
  // const cursorXSpring = useSpring(cursorX, springConfig);
  // const cursorYSpring = useSpring(cursorY, springConfig);





  // Smooth out the deformation


  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  const variants = {
    default: {
      width: 32,
      height: 32,
      backgroundColor: "rgba(255, 255, 255, 0)",
      borderWidth: 2,
      borderColor: "rgba(255, 255, 255, 0.4)",
      mixBlendMode: "difference"
    },
    project: {
      width: 96,
      height: 96,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.2)",
      mixBlendMode: "normal",
      backdropFilter: "blur(4px)"
    },
    skills: {
      width: 120,
      height: 120,
      backgroundColor: "rgba(255, 255, 255, 0)",
      borderWidth: 0,
      borderColor: "rgba(255, 255, 255, 0)",
      mixBlendMode: "normal",
      backdropFilter: "none"
    }
  };

  const { scrollY } = useScroll();

  // Nav animations: Fade out and blur
  const navOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  const navBlur = useTransform(scrollY, [0, 200], ["blur(0px)", "blur(4px)"]);
  const navPointerEvents = useTransform(scrollY, (y) => y > 200 ? 'none' : 'auto');

  // Hero animations: Sticky then scroll up
  // Stays fixed (y=0) until 500px, then moves up
  const heroY = useTransform(scrollY, [0, 500, 1200], [0, 0, -800]);
  const heroOpacity = useTransform(scrollY, [800, 1200], [1, 0]);



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
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        variants={variants}
        animate={cursorVariant}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
      >
        <AnimatePresence>
          {cursorVariant === 'project' && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-white text-[10px] font-medium tracking-widest uppercase text-center px-2 font-sans"
            >
              {t('cards.exploreProject')}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

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
            <div className="text-white/90 font-sans text-sm tracking-wider uppercase">
              {t('nav.portfolio')}
            </div>
            <div className="flex items-center gap-8 md:gap-12">
              <div className="hidden md:flex gap-8 text-white/70 font-sans text-sm">
                <a href="#work" className="hover:text-white transition-colors duration-300">{t('nav.work')}</a>
                <a href="#skills" className="hover:text-white transition-colors duration-300">{t('nav.skills')}</a>
                <a href="#contact" className="hover:text-white transition-colors duration-300">{t('nav.contact')}</a>
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
              <h1 className="font-aequitas text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-normal text-white/95 leading-[1.1] tracking-tight">
                Kaan Güneş
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="font-sans text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed"
              >
                {t('hero.bio')}
              </motion.p>


            </motion.div>
          </div>
        </section>

        {/* Scrollable Content Wrapper */}
        <div className="relative z-10">
          {/* Spacer to allow seeing the fixed hero initially */}
          <div className="h-[150vh]" />

          {/* Featured Work Label */}


          {/* Work Section (CardStack3D) */}
          <section className="pb-32">
            <CardStack3D setCursorVariant={setCursorVariant} />
          </section>

          {/* Skills Section */}
          <section id="skills" className="pb-32">

            <SkillsSection setCursorVariant={setCursorVariant} />
          </section>

          {/* Footer / Contact Section */}
          <section id="contact" className="pb-16">
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
                    <h2 className="font-serif text-4xl md:text-5xl font-light text-white/95 mb-6 leading-tight whitespace-pre-line">
                      {t('footer.title')}
                    </h2>
                    <p className="font-sans font-light text-white/60 leading-relaxed mb-12">
                      {t('footer.description')}
                    </p>

                    <ContactSection />
                  </div>
                </div>

                <div className="mt-24 flex justify-center items-center text-white/40 font-sans text-xs">
                  <p>{t('footer.copyright')}</p>
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
