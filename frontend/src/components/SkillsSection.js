import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useMotionValue, useSpring, useTransform, useVelocity } from 'framer-motion';

const SkillsSection = () => {
  const { t } = useTranslation();
  const containerRef = useRef(null);

  // Mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for the cursor center
  const springConfig = { damping: 28, stiffness: 400, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Velocity for deformation
  const velocityX = useVelocity(springX);
  const velocityY = useVelocity(springY);

  // Calculate speed and angle
  const speed = useTransform([velocityX, velocityY], ([vx, vy]) => Math.sqrt(vx * vx + vy * vy));
  const angle = useTransform([velocityX, velocityY], ([vx, vy]) => {
    if (vx === 0 && vy === 0) return 0;
    return (Math.atan2(vy, vx) * 180) / Math.PI;
  });

  // Base radius
  const baseRadius = 150;

  // Stretch factor based on speed
  // rx increases (stretch), ry decreases (squash)
  const stretch = useTransform(speed, [0, 2000], [0, 50]);
  const rx = useTransform(stretch, s => baseRadius + s);
  const ry = useTransform(stretch, s => baseRadius - s * 0.5); // Squash less than stretch to keep visibility

  // Smooth the deformation
  const smoothRx = useSpring(rx, { damping: 20, stiffness: 200 });
  const smoothRy = useSpring(ry, { damping: 20, stiffness: 200 });
  const smoothAngle = useSpring(angle, { damping: 20, stiffness: 200 });

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

  const handleMouseLeave = () => {
    revealScale.set(0);
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
            {/* SVG ClipPath Definition */}
            <svg className="absolute w-0 h-0">
              <defs>
                <clipPath id="teardrop-clip">
                  <motion.ellipse
                    cx={mouseX}
                    cy={mouseY}
                    rx={smoothRx}
                    ry={smoothRy}
                    style={{
                      transformOrigin: useTransform(() => `${mouseX.get()}px ${mouseY.get()}px`), // Rotate around current mouse position
                      rotate: smoothAngle,
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
              onMouseLeave={handleMouseLeave}
            >
              {/* Background Image (After) */}
              <img
                src="/images/sosyalmedya/kasım_sf.png"
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
                  src="/images/sosyalmedya/kasım_sf_pre.png"
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
