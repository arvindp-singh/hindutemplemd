import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LightboxModal({ images, currentIndex, onClose, onNav }) {
  const handleKey = useCallback((e) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowLeft") onNav(-1);
    if (e.key === "ArrowRight") onNav(1);
  }, [onClose, onNav]);

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  const img = images[currentIndex];
  if (!img) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
        onClick={onClose}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white p-2 z-10">
          <X className="w-7 h-7" />
        </button>
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); onNav(-1); }}
              className="absolute left-4 text-white/50 hover:text-white p-2 z-10"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onNav(1); }}
              className="absolute right-4 text-white/50 hover:text-white p-2 z-10"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </>
        )}
        <motion.img
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          src={img.image_url}
          alt={img.alt_text || img.title || "Gallery image"}
          className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
          onClick={(e) => e.stopPropagation()}
        />
        {img.title && (
          <div className="absolute bottom-8 text-white text-center">
            <p className="font-medium">{img.title}</p>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}