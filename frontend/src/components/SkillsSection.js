import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';

const SkillsSection = () => {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const overlayRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current || !overlayRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    overlayRef.current.style.clipPath = `circle(150px at ${x}px ${y}px)`;
  };

  const handleMouseLeave = () => {
    if (overlayRef.current) {
      overlayRef.current.style.clipPath = 'circle(0px at 50% 50%)';
    }
  };

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-bold text-white text-center mb-16">{t('skills.title')}</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Sol Taraf - Açıklama */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="max-w-md">
              <h3 className="text-2xl md:text-5xl font-bold text-white mb-4">
                {t('skills.photoshopTitle')}
              </h3>
              <p className="text-white/60 text-md">
                {t('skills.photoshopDesc')}
              </p>
            </div>
          </div>

          {/* Sağ Taraf - Slider */}
          <div className="relative w-full w-3/4">
            <div
              ref={containerRef}
              className="relative w-full overflow-hidden rounded-lg shadow-2xl cursor-none"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src="/images/sosyalmedya/kasım_sf.png"
                alt="After"
                className="w-full h-auto object-contain"
              />
              <img
                ref={overlayRef}
                src="/images/sosyalmedya/kasım_sf_pre.png"
                alt="Before"
                className="absolute inset-0 w-full h-full object-contain transition-[clip-path] duration-100 ease-out"
                style={{ clipPath: 'circle(0px at 50% 50%)' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
