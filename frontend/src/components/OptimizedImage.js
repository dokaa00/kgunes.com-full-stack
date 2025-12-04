import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { imageCache, preloadImage, createPlaceholder } from '../utils/imageOptimization';
import { encodeImagePath } from '../utils/imageUtils';

/**
 * Optimized Image Component
 * - Lazy loading ile viewport'a girince yükler
 * - Placeholder gösterir
 * - Progressive loading (blur-up effect)
 * - Cache management
 * - Error handling
 */

const OptimizedImage = ({
  src,
  alt = '',
  className = '',
  style = {},
  loading = 'lazy', // 'lazy' | 'eager'
  priority = 5, // 1-10 arası, düşük = yüksek öncelik
  placeholder = true,
  placeholderColor = '#1a1a1a',
  onLoad,
  onError,
  aspectRatio,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(loading === 'eager');
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  const encodedSrc = src ? encodeImagePath(src) : null;

  // Intersection Observer ile lazy loading
  useEffect(() => {
    if (loading === 'eager') {
      setIsInView(true);
      return;
    }

    if (!imgRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            // Görünür olunca observer'ı kaldır
            if (observerRef.current && imgRef.current) {
              observerRef.current.unobserve(imgRef.current);
            }
          }
        });
      },
      {
        rootMargin: '100px', // 100px önden yüklemeye başla
        threshold: 0.01
      }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      if (observerRef.current && imgRef.current) {
        observerRef.current.unobserve(imgRef.current);
      }
    };
  }, [loading]);

  // Resmi yükle
  useEffect(() => {
    if (!encodedSrc || !isInView) return;

    // Cache'de varsa direkt yükle
    if (imageCache.has(encodedSrc) && imageCache.get(encodedSrc).loaded) {
      setImageSrc(encodedSrc);
      setIsLoaded(true);
      if (onLoad) onLoad();
      return;
    }

    // Zaten yükleniyorsa bekle
    if (imageCache.isInQueue(encodedSrc)) {
      const checkInterval = setInterval(() => {
        if (imageCache.has(encodedSrc) && imageCache.get(encodedSrc).loaded) {
          clearInterval(checkInterval);
          setImageSrc(encodedSrc);
          setIsLoaded(true);
          if (onLoad) onLoad();
        }
      }, 100);
      return () => clearInterval(checkInterval);
    }

    // Resmi preload et
    preloadImage(encodedSrc, priority)
      .then(() => {
        setImageSrc(encodedSrc);
        setIsLoaded(true);
        if (onLoad) onLoad();
      })
      .catch((error) => {
        console.error('Image loading error:', error);
        setHasError(true);
        if (onError) onError(error);
      });
  }, [encodedSrc, isInView, priority, onLoad, onError]);

  // Placeholder SVG
  const placeholderSrc = createPlaceholder(
    aspectRatio ? 400 : undefined,
    aspectRatio ? 400 / aspectRatio : undefined,
    placeholderColor
  );

  // Error state
  if (hasError) {
    return (
      <div
        ref={imgRef}
        className={`flex items-center justify-center bg-gray-900 ${className}`}
        style={style}
      >
        <div className="text-white/40 text-center p-4">
          <svg
            className="w-12 h-12 mx-auto mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-sm">Failed to load image</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`} style={style}>
      <AnimatePresence mode="wait">
        {/* Placeholder */}
        {placeholder && !isLoaded && (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
          >
            <img
              src={placeholderSrc}
              alt=""
              className="w-full h-full object-cover"
              style={{ filter: 'blur(20px)', transform: 'scale(1.1)' }}
            />
            {/* Loading spinner */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
            </div>
          </motion.div>
        )}

        {/* Actual Image */}
        {imageSrc && (
          <motion.img
            key="image"
            src={imageSrc}
            alt={alt}
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{
              opacity: isLoaded ? 1 : 0,
              filter: isLoaded ? 'none' : 'blur(10px)'
            }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1]
            }}
            className={className}
            style={{ ...style, backgroundColor: 'transparent' }}
            onLoad={() => {
              setIsLoaded(true);
              if (onLoad) onLoad();
            }}
            onError={(e) => {
              setHasError(true);
              if (onError) onError(e);
            }}
            {...props}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default OptimizedImage;
