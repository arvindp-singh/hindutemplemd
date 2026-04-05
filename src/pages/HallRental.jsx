import { motion } from "framer-motion";
import { Check } from "lucide-react";
import contentData from "../content.json";

const HALL_IMAGES = contentData.hallRental.images;
const FEATURES = contentData.hallRental.features;

export default function HallRental() {

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#2D1B4E] to-[#4A2D7A] py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Hall Rental</h1>
            <p className="text-white/60 text-lg">Take advantage of our fully operational venue rental services</p>
          </motion.div>
        </div>
      </section>

      {/* Info */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <span className="text-[#D4760A] font-semibold text-sm uppercase tracking-wider">Venue</span>
            <h2 className="text-3xl font-bold text-[#2D1B4E] mt-2 mb-6">
              A Beautiful Space for Your Events
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              The hall is completely functional, with a spacious stage and seating area that can accommodate any event.
              Perfect for weddings, celebrations, community gatherings, and more.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {FEATURES.map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-[#D4760A] shrink-0" />
                  {f}
                </div>
              ))}
            </div>
            <div className="bg-[#FFFBF5] rounded-xl p-5 border border-orange-50">
              <p className="text-sm text-gray-500 mb-2">For reservations, please email:</p>
              <a href="mailto:vippanchopra@yahoo.com" className="text-[#D4760A] font-medium text-sm block">
                vippanchopra@yahoo.com
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {HALL_IMAGES.map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`Hall photo ${i + 1}`}
                className="w-full h-40 object-cover rounded-xl"
              />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}