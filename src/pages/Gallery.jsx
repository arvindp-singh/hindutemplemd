import { useState } from "react";
import { Image } from "lucide-react";
import contentData from "../content.json";
import { motion } from "framer-motion";
import LightboxModal from "@/components/gallery/LightboxModal";

const CATEGORIES = ["All", "Deity Photos"];

export default function Gallery() {
  const [images] = useState(contentData.galleryImages || []);
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const filtered = activeCategory === "All" ? images : images.filter((i) => i.category === activeCategory);

  const handleNav = (dir) => {
    setLightboxIdx((prev) => {
      const next = prev + dir;
      if (next < 0) return filtered.length - 1;
      if (next >= filtered.length) return 0;
      return next;
    });
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#2D1B4E] to-[#4A2D7A] py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Gallery</h1>
            <p className="text-white/60 text-lg">Moments from our temple and community</p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-6xl mx-auto px-6 pt-12">
        <div className="flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-[#D4760A] text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-orange-50 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-orange-50">
            <Image className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-400">No images in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="group cursor-pointer overflow-hidden rounded-xl aspect-square bg-gray-100 relative"
                onClick={() => setLightboxIdx(i)}
              >
                <img
                  src={img.image_url}
                  alt={img.alt_text || img.title || "Gallery image"}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {img.title && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-sm font-semibold text-center">{img.title}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {lightboxIdx !== null && (
        <LightboxModal
          images={filtered}
          currentIndex={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onNav={handleNav}
        />
      )}
    </div>
  );
}