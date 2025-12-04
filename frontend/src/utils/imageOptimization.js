/**
 * Image Optimization Utilities
 * - Lazy loading with Intersection Observer
 * - Progressive image loading
 * - Image preloading strategy
 * - Cache management
 */

// Image cache management
class ImageCache {
  constructor() {
    this.cache = new Map();
    this.preloadQueue = new Set();
    this.loadingQueue = new Set();
  }

  // Cache bir resmin yüklendiğini kaydet
  set(url, loaded = true) {
    this.cache.set(url, {
      loaded,
      timestamp: Date.now()
    });
  }

  // Cache'den kontrol et
  has(url) {
    return this.cache.has(url);
  }

  // Cache'den al
  get(url) {
    return this.cache.get(url);
  }

  // Preload queue'ya ekle
  addToPreloadQueue(url) {
    this.preloadQueue.add(url);
  }

  // Preload queue'dan çıkar
  removeFromPreloadQueue(url) {
    this.preloadQueue.delete(url);
  }

  // Loading queue'ya ekle
  addToLoadingQueue(url) {
    this.loadingQueue.add(url);
  }

  // Loading queue'dan çıkar
  removeFromLoadingQueue(url) {
    this.loadingQueue.delete(url);
  }

  // Queue'da mı?
  isInQueue(url) {
    return this.loadingQueue.has(url) || this.preloadQueue.has(url);
  }

  // Cache'i temizle (eski resimleri sil)
  cleanup(maxAge = 30 * 60 * 1000) { // 30 dakika default
    const now = Date.now();
    for (const [url, data] of this.cache.entries()) {
      if (now - data.timestamp > maxAge) {
        this.cache.delete(url);
      }
    }
  }

  // Tüm cache'i temizle
  clear() {
    this.cache.clear();
    this.preloadQueue.clear();
    this.loadingQueue.clear();
  }
}

// Global image cache instance
export const imageCache = new ImageCache();

// Cache temizleme interval (her 10 dakikada bir)
if (typeof window !== 'undefined') {
  setInterval(() => {
    imageCache.cleanup();
  }, 3 * 60 * 1000);
}

/**
 * Resmi preload et
 * @param {string} url - Resim URL'i
 * @param {number} priority - Öncelik (düşük sayı = yüksek öncelik)
 * @returns {Promise<void>}
 */
export const preloadImage = (url, priority = 5) => {
  return new Promise((resolve, reject) => {
    // Cache'de varsa direkt resolve et
    if (imageCache.has(url) && imageCache.get(url).loaded) {
      resolve();
      return;
    }

    // Zaten yükleniyorsa bekle
    if (imageCache.isInQueue(url)) {
      const checkInterval = setInterval(() => {
        if (imageCache.has(url) && imageCache.get(url).loaded) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);
      return;
    }

    // Queue'ya ekle
    imageCache.addToPreloadQueue(url);

    const img = new Image();
    
    img.onload = () => {
      imageCache.set(url, true);
      imageCache.removeFromPreloadQueue(url);
      resolve();
    };

    img.onerror = () => {
      imageCache.removeFromPreloadQueue(url);
      reject(new Error(`Failed to load image: ${url}`));
    };

    // Priority'ye göre fetch priority ayarla
    if (priority <= 2) {
      img.fetchPriority = 'high';
    } else if (priority <= 4) {
      img.fetchPriority = 'auto';
    } else {
      img.fetchPriority = 'low';
    }

    img.src = url;
  });
};

/**
 * Birden fazla resmi batch olarak preload et
 * @param {string[]} urls - Resim URL'leri
 * @param {number} batchSize - Aynı anda kaç resim yükleneceği
 * @param {number} basePriority - Temel öncelik
 * @returns {Promise<void>}
 */
export const preloadImages = async (urls, batchSize = 3, basePriority = 5) => {
  const batches = [];
  
  for (let i = 0; i < urls.length; i += batchSize) {
    batches.push(urls.slice(i, i + batchSize));
  }

  for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
    const batch = batches[batchIndex];
    const priority = basePriority + batchIndex;
    
    await Promise.allSettled(
      batch.map(url => preloadImage(url, priority))
    );
  }
};

/**
 * Lazy loading için Intersection Observer hook'u
 * @param {Function} callback - Görünür olduğunda çağrılacak fonksiyon
 * @param {Object} options - Intersection Observer options
 * @returns {Function} - Ref callback
 */
export const useLazyLoad = (callback, options = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: '50px', // 50px önden yüklemeye başla
    threshold: 0.01,
    ...options
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, defaultOptions);

  return (element) => {
    if (element) {
      observer.observe(element);
    }
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  };
};

/**
 * Progressive image loading için blur-up effect
 * Önce düşük kaliteli, sonra yüksek kaliteli resim yükle
 */
export const createProgressiveImage = (lowQualitySrc, highQualitySrc) => {
  return {
    lowQuality: lowQualitySrc,
    highQuality: highQualitySrc,
    loaded: false
  };
};

/**
 * Resim boyutlarını al (cache'lenmiş)
 * @param {string} url - Resim URL'i
 * @returns {Promise<{width: number, height: number, aspectRatio: number}>}
 */
const dimensionsCache = new Map();

export const getImageDimensions = (url) => {
  return new Promise((resolve, reject) => {
    // Cache'de varsa direkt dön
    if (dimensionsCache.has(url)) {
      resolve(dimensionsCache.get(url));
      return;
    }

    const img = new Image();
    
    img.onload = () => {
      const dimensions = {
        width: img.width,
        height: img.height,
        aspectRatio: img.width / img.height
      };
      
      dimensionsCache.set(url, dimensions);
      resolve(dimensions);
    };

    img.onerror = () => {
      reject(new Error(`Failed to get dimensions for: ${url}`));
    };

    img.src = url;
  });
};

/**
 * Placeholder SVG oluştur (blur effect için)
 * @param {number} width - Genişlik
 * @param {number} height - Yükseklik
 * @param {string} color - Arkaplan rengi
 * @returns {string} - Data URL
 */
export const createPlaceholder = (width = 400, height = 300, color = '#1a1a1a') => {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${adjustBrightness(color, 20)};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)"/>
      <circle cx="50%" cy="50%" r="30" fill="rgba(255,255,255,0.1)"/>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

/**
 * Renk parlaklığını ayarla
 * @param {string} color - Hex renk kodu
 * @param {number} percent - Yüzde değişim
 * @returns {string} - Yeni hex renk kodu
 */
function adjustBrightness(color, percent) {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  
  return '#' + (
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  ).toString(16).slice(1);
}

/**
 * Görünür alandaki resimleri preload et
 * @param {Array} items - Resim bilgilerini içeren array
 * @param {number} visibleCount - Görünür eleman sayısı
 * @param {number} preloadCount - Ek preload edilecek sayı
 */
export const preloadVisibleImages = (items, visibleCount = 10, preloadCount = 5) => {
  const totalToPreload = visibleCount + preloadCount;
  const imagesToPreload = items.slice(0, totalToPreload);
  
  // İlk 10'u yüksek öncelikle yükle
  const highPriorityUrls = imagesToPreload.slice(0, visibleCount).map(item => item.image || item.mannequinImage);
  preloadImages(highPriorityUrls, 3, 1);
  
  // Sonrakileri düşük öncelikle yükle
  if (imagesToPreload.length > visibleCount) {
    const lowPriorityUrls = imagesToPreload.slice(visibleCount).map(item => item.image || item.mannequinImage);
    preloadImages(lowPriorityUrls, 2, 5);
  }
};

export default {
  imageCache,
  preloadImage,
  preloadImages,
  useLazyLoad,
  createProgressiveImage,
  getImageDimensions,
  createPlaceholder,
  preloadVisibleImages
};
