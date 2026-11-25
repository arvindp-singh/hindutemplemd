import { useState } from "react";
import { Users, FileText, Download } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import contentData from "../content.json";

const { financialStatements2026: FINANCIAL_STATEMENTS_2026, timeline, history, mission, vision } = contentData.about;

export default function About() {
  const trustees = contentData.trustees || [];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#2D1B4E] to-[#4A2D7A] py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About the Temple</h1>
            <p className="text-white/60 text-lg">Our history, mission, and the people who serve</p>
          </motion.div>
        </div>
      </section>

      {/* History */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            <span className="text-[#D4760A] font-semibold text-sm uppercase tracking-wider">Our Story</span>
            <h2 className="text-3xl font-bold text-[#2D1B4E] mt-2 mb-6">Temple History</h2>
            <div className="prose prose-gray max-w-none">
            {history.map((p, i) => (
              <p key={i} className="text-gray-600 leading-relaxed mb-4">{p}</p>
            ))}
            </div>
          </div>
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-gradient-to-br from-[#D4760A] to-[#E89530] rounded-2xl p-6 text-white">
              <h3 className="font-bold text-xl mb-2">Our Mission</h3>
              <p className="text-white/90 text-sm leading-relaxed">{mission}</p>
            </div>
            <div className="bg-gradient-to-br from-[#2D1B4E] to-[#4A2D7A] rounded-2xl p-6 text-white">
              <h3 className="font-bold text-xl mb-2">Our Vision</h3>
              <p className="text-white/80 text-sm leading-relaxed">{vision}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-[#D4760A] font-semibold text-sm uppercase tracking-wider">Milestones</span>
            <h2 className="text-3xl font-bold text-[#2D1B4E] mt-2">Our Journey</h2>
          </div>
          <div className="space-y-0">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex gap-6 items-start py-6 border-l-2 border-[#D4760A]/20 pl-8 relative"
              >
                <div className="absolute left-[-9px] top-6 w-4 h-4 rounded-full bg-[#D4760A] border-4 border-[#FFFBF5]" />
                <div>
                  <span className="text-[#D4760A] font-bold text-lg">{item.year}</span>
                  <p className="text-gray-600 mt-1">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trustees */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span className="text-[#D4760A] font-semibold text-sm uppercase tracking-wider">Leadership</span>
          <h2 className="text-3xl font-bold text-[#2D1B4E] mt-2">Board of Trustees</h2>
        </div>
        {trustees.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trustees.map((t) => (
              <div key={t.id} className="bg-white rounded-2xl p-6 shadow-sm border border-orange-50 text-center hover:shadow-md transition-all">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#D4760A]/10 to-[#E89530]/10 flex items-center justify-center">
                  {t.photo_url ? (
                    <img src={t.photo_url} alt={t.name} className="w-20 h-20 rounded-full object-cover" />
                  ) : (
                    <Users className="w-8 h-8 text-[#D4760A]" />
                  )}
                </div>
                <h3 className="font-semibold text-[#2D1B4E] text-lg">{t.name}</h3>
                {t.role && <p className="text-[#D4760A] text-sm font-medium mt-1">{t.role}</p>}
                {t.phone && <p className="text-gray-500 text-sm mt-2">{t.phone}</p>}
                {t.bio && <p className="text-gray-500 text-sm mt-2 leading-relaxed">{t.bio}</p>}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 py-12 bg-white rounded-2xl border border-orange-50">
            <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>Trustee information will be updated soon.</p>
          </div>
        )}
      </section>

      {/* Financial Statements */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-[#D4760A] font-semibold text-sm uppercase tracking-wider">Transparency</span>
            <h2 className="text-3xl font-bold text-[#2D1B4E] mt-2">Monthly Financial Statements</h2>
            <p className="text-gray-500 mt-2">We believe in complete transparency with our community.</p>
          </div>

          {/* 2026 Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-[#2D1B4E] mb-6">2026</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {FINANCIAL_STATEMENTS_2026.map((fs) => (
                <div
                  key={fs.month}
                  className="bg-[#FFFBF5] rounded-xl p-5 border border-orange-50 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#D4760A]/10 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-[#D4760A]" />
                    </div>
                    <div>
                      <div className="font-semibold text-[#2D1B4E]">{fs.month}</div>
                      <div className="text-gray-400 text-xs">Monthly report</div>
                    </div>
                  </div>
                  {fs.url === "#" ? (
                    <Button
                      disabled
                      className="w-full bg-gray-300 cursor-not-allowed"
                      size="sm"
                    >
                      Coming Soon
                    </Button>
                  ) : (
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-[#D4760A] to-[#E89530] hover:from-[#E89530] hover:to-[#D4760A]"
                      size="sm"
                    >
                      <a href={fs.url} target="_blank" rel="noopener noreferrer" download>
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </a>
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}