import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
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
          className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
            language === lng.code
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

// Main Hero Section Component
const MainHero = ({ language, onLanguageChange }) => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#050505] flex flex-col items-center justify-center px-6 py-20">
      {/* Subtle Glow Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Language Toggle - Top Right */}
      <div className="absolute top-8 right-8 z-20">
        <LanguageToggle language={language} onLanguageChange={onLanguageChange} />
      </div>

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="max-w-4xl text-center z-10 relative"
      >
        {/* Massive Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-8 font-bold tracking-tighter"
        >
          <div className="text-7xl md:text-[10rem] lg:text-[12rem] leading-none text-white">
            Kaan Güneş
          </div>
        </motion.h1>

        {/* Bio Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-white/70 md:text-xl mb-12"
        >
          {t('hero.bio')}
        </motion.p>

        {/* Contact Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          onClick={() => {
            document.getElementById('contact-section')?.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255,255,255,0.2)' }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold hover:bg-white/20 transition-all shadow-xl"
        >
          {t('nav.contact')}
        </motion.button>
      </motion.div>
    </section>
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

  return (
    <BrowserRouter>
      <div className="relative bg-[#050505] min-h-screen">
        <AnimatePresence mode="wait">
          {loading ? (
            <IntroScreen key="intro" onComplete={() => setLoading(false)} />
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
                  element={
                    <div className="relative bg-[#050505]">
                      {/* Main Hero Section */}
                      <MainHero language={language} onLanguageChange={setLanguage} />

                      {/* 3D Diagonal Fanned Card Stack */}
                      <div className="pt-20 pb-32">
                        <CardStack3D />
                      </div>

                      <div className="skills-section">
                        <SkillsSection />
                      </div>

                      {/* Contact Section */}
                      <div id="contact-section">
                        <ContactSection />
                      </div>

                      {/* Footer */}
                      <footer className="border-t border-white/5 bg-[#050505] py-16 px-6">
                        <div className="mx-auto max-w-7xl text-center">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-4"
                          >
                            <p className="text-white/40 text-sm tracking-wider">
                              Tasarlanan her proje, bir hikaye anlatır.
                            </p>
                            <p className="text-white/20 text-xs">
                              Made with passion ❤️ by Kaan Güneş
                            </p>
                          </motion.div>
                        </div>
                      </footer>
                    </div>
                  }
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
