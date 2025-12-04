import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useMotionValue, useSpring, useTransform, useVelocity } from 'framer-motion';

const SkillsSection = ({ setCursorVariant }) => {
  const { t } = useTranslation();
  const containerRef = useRef(null);

  // Mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);



  // Base radius - matched to global cursor (approx 60px radius)
  const baseRadius = 60;

  // Simple reveal radius
  const rx = useMotionValue(baseRadius);
  const ry = useMotionValue(baseRadius);

  // Reveal radius (for entering/leaving)
  const revealScale = useMotionValue(0);
  const revealScaleSpring = useSpring(revealScale, { damping: 30, stiffness: 200 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseX.set(x);
    mouseY.set(y);
    revealScale.set(1);
  };

  const handleMouseEnter = () => {
    if (setCursorVariant) setCursorVariant('skills');
    revealScale.set(1);
  };

  const handleMouseLeave = () => {
    if (setCursorVariant) setCursorVariant('default');
    revealScale.set(0);
  };

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">


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
            {/* SVG ClipPath Definition */}
            <svg className="absolute w-0 h-0">
              <defs>
                <clipPath id="teardrop-clip">
                  <motion.ellipse
                    cx={mouseX}
                    cy={mouseY}
                    rx={rx}
                    ry={ry}
                    style={{
                      scale: revealScaleSpring
                    }}
                  />
                </clipPath>
              </defs>
            </svg>

            <div
              ref={containerRef}
              className="relative w-full overflow-hidden rounded-lg shadow-2xl cursor-none"
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Background Image (After) */}
              <img
                src="/images/sosyalmedya/kasım_sf.webp"
                alt="After"
                className="w-full h-auto object-contain"
              />

              {/* Foreground Image (Before) - Revealed by ClipPath */}
              <motion.div
                className="absolute inset-0 w-full h-full"
                style={{
                  clipPath: 'url(#teardrop-clip)',
                }}
              >
                <img
                  src="/images/sosyalmedya/kasım_sf_pre.webp"
                  alt="Before"
                  className="w-full h-full object-contain pointer-events-none"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
