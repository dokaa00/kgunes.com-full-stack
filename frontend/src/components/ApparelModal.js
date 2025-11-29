import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import { encodeImagePath } from '../utils/imageUtils';

const ApparelModal = ({ isOpen, onClose, project }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative max-w-6xl w-full max-h-[90vh] bg-gradient-to-br from-zinc-900 to-black rounded-2xl border border-white/10 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Content */}
            <div className="grid md:grid-cols-2 gap-8 p-8">
              {/* Mannequin Image */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="relative rounded-xl overflow-hidden bg-white/5 aspect-square flex items-center justify-center"
              >
                <img
                  src={encodeImagePath(project.mannequinImage)}
                  alt={`${project.name} - Mannequin`}
                  className="max-w-full max-h-full object-contain p-4"
                />
                <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full">
                  <span className="text-xs text-white/70">Manken Görseli</span>
                </div>
              </motion.div>

              {/* Vector Image */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative rounded-xl overflow-hidden bg-white/5 aspect-square flex items-center justify-center"
              >
                <img
                  src={encodeImagePath(project.vectorImage)}
                  alt={`${project.name} - Vector`}
                  className="max-w-full max-h-full object-contain p-4"
                />
                <div className="absolute bottom-4 left-4 px-3 py-1 bg-gradient-to-r from-orange-500/80 to-red-500/80 backdrop-blur-sm rounded-full">
                  <span className="text-xs text-white font-medium flex items-center gap-1">
                    <ZoomIn className="w-3 h-3" />
                    Vektörel Tasarım
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Project Info */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="border-t border-white/10 p-6 bg-gradient-to-t from-black/50 to-transparent"
            >
              <h3 className="text-2xl font-bold text-white mb-2">{project.name}</h3>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-xs font-medium border border-orange-500/30">
                  {project.category}
                </span>
                <span className="px-3 py-1 bg-white/5 text-white/50 rounded-full text-xs">
                  Kıyafet Tasarımı
                </span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ApparelModal;
