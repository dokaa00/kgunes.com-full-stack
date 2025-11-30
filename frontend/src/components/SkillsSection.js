import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

 
const SkillsSection = () => {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const [divider, setDivider] = useState(50);
  const [dragging, setDragging] = useState(false);

  const clamp = (v) => Math.max(0, Math.min(100, v));

  const onPointerDown = (e) => {
    e.preventDefault();
    setDragging(true);
    document.body.style.userSelect = 'none';
  };

  const onPointerMove = (e) => {
    if (!dragging || !containerRef.current) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setDivider(clamp(x));
  };

  const onPointerUp = () => {
    if (dragging) {
      setDragging(false);
      document.body.style.userSelect = '';
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    window.addEventListener('touchmove', onPointerMove, { passive: false });
    window.addEventListener('touchend', onPointerUp);
    return () => {
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
    };
  }, [dragging]);

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#050505] via-[#0a0a0f] to-[#050505] py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold text-white text-center mb-16">{t('skills.title')}</h2>
        
        <div className="relative w-full max-w-2xl mx-auto mb-16">
          <div 
            ref={containerRef}
            className="relative w-full h-[40rem] overflow-hidden rounded-lg shadow-2xl cursor-col-resize"
            onMouseMove={onPointerMove}
            onTouchStart={(e) => { setDragging(true); onPointerMove(e); }}
            onTouchEnd={onPointerUp}
          >
            <img 
              src="/images/kasim_sf.png" 
              alt="After" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <img 
              src="/images/kasim_sf_pre.png" 
              alt="Before" 
              className="absolute inset-0 w-full h-full object-cover"
              style={{ clipPath: `inset(0 ${100 - divider}% 0 0)` }}
            />
            
            <div
              role="slider"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(divider)}
              className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-col-resize z-10 transition-transform"
              style={{ left: `${divider}%`, transform: 'translateX(-50%)' }}
              onMouseDown={onPointerDown}
              onTouchStart={(e) => { onPointerDown(e); }}
            >
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-gray-800 rounded-full"></div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between mt-4 text-white text-sm">
            <span>Before</span>
            <span>After</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
