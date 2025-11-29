import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { heroContent } from '../data/portfolioData';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const { t } = useTranslation();
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Image with Zoom Animation */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: [0.6, 0.05, 0.01, 0.9] }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroContent.backgroundImage})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="max-w-6xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mb-8 inline-block"
          >
            <div className="rounded-full border border-white/20 bg-white/5 px-6 py-2 backdrop-blur-sm">
              <span className="text-sm font-light tracking-wider text-white/80">
                {t('portfolio.hero.badge')}
              </span>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1, ease: [0.6, 0.05, 0.01, 0.9] }}
            className="mb-6 font-bold tracking-tighter"
          >
            <div className="text-8xl md:text-[12rem] lg:text-[14rem] leading-none text-white">
              {t(heroContent.titleKey)}
            </div>
            <div className="text-8xl md:text-[12rem] lg:text-[14rem] leading-none text-white/10">
              {t(heroContent.subtitleKey)}
            </div>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-white/70 md:text-xl"
          >
            {t(heroContent.descriptionKey)}
          </motion.p>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-xs font-light tracking-widest text-white/50">
                {t('portfolio.hero.scroll')}
              </span>
              <ArrowDown className="h-5 w-5 text-white/50" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;