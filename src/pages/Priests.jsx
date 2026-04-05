import { User, Phone } from "lucide-react";
import { motion } from "framer-motion";
import contentData from "../content.json";

export default function Priests() {
  const priests = contentData.priests;
  const loading = false;

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#2D1B4E] to-[#4A2D7A] py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Priests</h1>
            <p className="text-white/60 text-lg">Dedicated spiritual leaders serving our community</p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-20">
        {loading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-4 border-[#D4760A]/30 border-t-[#D4760A] rounded-full animate-spin mx-auto" />
          </div>
        ) : priests.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-orange-50">
            <User className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-400">Priest information will be updated soon.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {priests.map((priest, i) => (
              <motion.div
                key={priest.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-orange-50 hover:shadow-lg transition-all"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-64 h-64 md:h-auto bg-gradient-to-br from-[#D4760A]/10 to-[#E89530]/10 flex items-center justify-center shrink-0">
                    {priest.photo_url ? (
                      <img src={priest.photo_url} alt={priest.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-20 h-20 text-[#D4760A]/30" />
                    )}
                  </div>
                  <div className="p-8 flex-1">
                    <h2 className="text-2xl font-bold text-[#2D1B4E]">{priest.name}</h2>
                    {priest.role && (
                      <p className="text-[#D4760A] font-semibold mt-1">{priest.role}</p>
                    )}
                    {priest.biography && (
                      <p className="text-gray-600 mt-4 leading-relaxed">{priest.biography}</p>
                    )}
                    {priest.specialties && (
                      <div className="mt-4">
                        <h4 className="text-sm font-semibold text-[#2D1B4E] mb-2">Specialties</h4>
                        <p className="text-gray-500 text-sm">{priest.specialties}</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-12 bg-gradient-to-br from-[#2D1B4E] to-[#4A2D7A] rounded-3xl p-8 text-center text-white">
          <h3 className="text-xl font-bold mb-2">Contact Our Priests</h3>
          <p className="text-white/70 mb-4">For scheduling pujas, ceremonies, or home visits</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:3014452165" className="flex items-center gap-2 bg-white/10 rounded-full px-5 py-2.5 text-sm hover:bg-white/20 transition-colors">
              <Phone className="w-4 h-4" /> (301) 445-2165
            </a>
            <a href="tel:3014341000" className="flex items-center gap-2 bg-white/10 rounded-full px-5 py-2.5 text-sm hover:bg-white/20 transition-colors">
              <Phone className="w-4 h-4" /> (301) 434-1000
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}