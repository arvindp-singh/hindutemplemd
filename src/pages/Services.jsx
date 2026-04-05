import { motion } from "framer-motion";
import contentData from "../content.json";

const SERVICES = contentData.services.sanskar;
const OTHER_SERVICES = contentData.services.other;

export default function Services() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#2D1B4E] to-[#4A2D7A] py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Temple Services</h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Sanskar is a set of sacraments, sacrifices, and ceremonies that mark the many stages of human existence, according to Sanatan Dharma.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sanskar Services */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span className="text-[#D4760A] font-semibold text-sm uppercase tracking-wider">Sanskar</span>
          <h2 className="text-3xl font-bold text-[#2D1B4E] mt-2">Life Ceremonies</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-orange-50 hover:shadow-lg transition-all group"
            >
              <div className="text-3xl mb-4">{s.icon}</div>
              <h3 className="text-xl font-semibold text-[#2D1B4E] mb-2 group-hover:text-[#D4760A] transition-colors">
                {s.name}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Other Services */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-[#D4760A] font-semibold text-sm uppercase tracking-wider">Additional</span>
            <h2 className="text-3xl font-bold text-[#2D1B4E] mt-2">Other Services</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {OTHER_SERVICES.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="bg-[#FFFBF5] rounded-xl p-4 border border-orange-50 hover:border-[#D4760A]/20 transition-colors"
              >
                <h3 className="font-semibold text-[#2D1B4E] text-sm">{s.name}</h3>
                <p className="text-gray-500 text-xs mt-1 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timing Info */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-br from-[#2D1B4E] to-[#4A2D7A] rounded-3xl p-8 md:p-12 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Schedule a Service</h2>
          <p className="text-white/70 mb-6 max-w-xl mx-auto">
            To schedule any temple service or home visit, please contact our priests directly.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="bg-white/10 rounded-xl px-5 py-3">
              <div className="text-[#F0D68A] font-semibold">Pandit Pitamber Dutt Sharma</div>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3">
              <div className="text-[#F0D68A] font-semibold">Shri Ram Pandey</div>
            </div>
          </div>
          <p className="text-white/50 mt-6">
            Call: (301) 445-2165 | (301) 434-1000
          </p>
        </div>
      </section>
    </div>
  );
}