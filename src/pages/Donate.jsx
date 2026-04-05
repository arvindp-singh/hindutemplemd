import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, DollarSign, Calendar, Gift, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import contentData from "../content.json";

const ICON_MAP = { DollarSign, Heart, Calendar, Gift };
const DONATION_PROGRAMS = contentData.donate.programs.map(p => ({ ...p, icon: ICON_MAP[p.icon] }));
const SUGGESTED_AMOUNTS = contentData.donate.suggestedAmounts;

export default function Donate() {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#2D1B4E] to-[#4A2D7A] py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Support Our Temple</h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              This temple was created by the community for the community. Help us continue our mission 
              of serving and preserving Sanatana Dharma.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Donation Programs */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span className="text-[#D4760A] font-semibold text-sm uppercase tracking-wider">Give Back</span>
          <h2 className="text-3xl font-bold text-[#2D1B4E] mt-2">Donation Programs</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {DONATION_PROGRAMS.map((prog, i) => (
            <motion.div
              key={prog.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl p-7 border transition-all hover:shadow-lg ${
                prog.highlight
                  ? "bg-gradient-to-br from-[#D4760A] to-[#E89530] text-white border-transparent"
                  : "bg-white border-orange-50"
              }`}
            >
              <prog.icon className={`w-8 h-8 mb-4 ${prog.highlight ? "text-white/90" : "text-[#D4760A]"}`} />
              <h3 className={`text-xl font-bold mb-2 ${prog.highlight ? "text-white" : "text-[#2D1B4E]"}`}>
                {prog.title}
              </h3>
              <p className={`text-sm leading-relaxed ${prog.highlight ? "text-white/85" : "text-gray-500"}`}>
                {prog.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Suggested Amounts */}
      <section className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[#2D1B4E] mb-2">Make a Donation</h2>
          <p className="text-gray-500 mb-8">Choose a suggested amount or enter a custom amount</p>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-6">
            {SUGGESTED_AMOUNTS.map((amt) => (
              <button
                key={amt}
                onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
                className={`py-3 rounded-xl text-sm font-semibold transition-all ${
                  selectedAmount === amt
                    ? "bg-[#D4760A] text-white shadow-md"
                    : "bg-[#FFFBF5] text-[#2D1B4E] border border-orange-100 hover:border-[#D4760A]"
                }`}
              >
                ${amt}
              </button>
            ))}
          </div>
          <div className="relative max-w-xs mx-auto mb-8">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="number"
              placeholder="Custom Amount"
              value={customAmount}
              onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
              className="h-12 pl-10 text-center"
            />
          </div>

          <div className="bg-gradient-to-br from-[#2D1B4E] to-[#4A2D7A] rounded-2xl p-8 text-white">
            <p className="text-white/70 mb-4">
              To complete your donation, please use the PayPal button below or contact the temple directly.
            </p>
            <a
              href="https://www.paypal.com/donate/?hosted_button_id=EUSFSDDAVT38A"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-[#D4760A] to-[#E89530] text-white px-8 py-3.5 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
            >
              Donate with PayPal
            </a>
            <p className="text-white/40 text-sm mt-4">
              Or mail a check to: 10001 Riggs Road, Adelphi, MD 20783
            </p>
          </div>
        </div>
      </section>

      {/* Mission Message */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-gradient-to-r from-[#D4760A] to-[#E89530] rounded-3xl p-8 md:p-12 text-center text-white">
          <div className="text-4xl mb-4">"</div>
          <p className="text-lg md:text-xl font-light italic leading-relaxed max-w-2xl mx-auto">{contentData.donate.quote}</p>
        </div>
      </section>

      {/* Dollar-A-Day Forms */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-[#D4760A] font-semibold text-sm uppercase tracking-wider">Dollar-A-Day Program</span>
            <h2 className="text-3xl font-bold text-[#2D1B4E] mt-2">Membership Forms</h2>
            <p className="text-gray-500 mt-2">Download and complete the appropriate form to join our Dollar-A-Day membership program.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {contentData.donate.forms.map((form) => (
              <div key={form.title} className="bg-[#FFFBF5] rounded-xl p-5 border border-orange-50 hover:shadow-md transition-all">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#D4760A]/10 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-[#D4760A]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#2D1B4E] text-sm">{form.title}</div>
                    <div className="text-gray-400 text-xs mt-0.5">{form.desc}</div>
                  </div>
                </div>
                <a href={form.url} target="_blank" rel="noopener noreferrer" download
                  className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-gradient-to-r from-[#D4760A] to-[#E89530] text-white text-sm font-semibold hover:shadow-md transition-all">
                  <Download className="w-4 h-4" /> Download PDF
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}