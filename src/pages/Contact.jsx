import { useState } from "react";
import contentData from "../content.json";

const { temple } = contentData;
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Facebook } from "lucide-react";

export default function Contact() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#2D1B4E] to-[#4A2D7A] py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
            <p className="text-white/60 text-lg">We'd love to hear from you</p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-6 max-w-2xl">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-50">
            <MapPin className="w-6 h-6 text-[#D4760A] mb-3" />
            <h3 className="font-semibold text-[#2D1B4E] mb-1">Address</h3>
            <p className="text-gray-500 text-sm">{temple.address}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-50">
            <Phone className="w-6 h-6 text-[#D4760A] mb-3" />
            <h3 className="font-semibold text-[#2D1B4E] mb-1">Phone</h3>
            {temple.phones.map((p, i) => <p key={i} className="text-gray-500 text-sm">{p}</p>)}
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-50">
            <Clock className="w-6 h-6 text-[#D4760A] mb-3" />
            <h3 className="font-semibold text-[#2D1B4E] mb-1">Hours of Operation</h3>
            <p className="text-gray-500 text-sm">Weekdays: {temple.hours.weekdays}</p>
            <p className="text-gray-500 text-sm">Weekends: {temple.hours.weekends}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-50">
            <Facebook className="w-6 h-6 text-[#D4760A] mb-3" />
            <h3 className="font-semibold text-[#2D1B4E] mb-1">Follow Us</h3>
            <a
              href={temple.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D4760A] text-sm hover:underline"
            >
              Facebook Page — Watch Live
            </a>
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-[#2D1B4E] mb-6">Find Us</h2>
        <div className="rounded-2xl overflow-hidden shadow-md border border-orange-50">
          <iframe
            title="Hindu Temple of Metropolitan Washington"
            src={temple.mapsEmbed}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="mt-4 text-center">
          <a
            href={temple.mapsDirections}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4760A] to-[#E89530] text-white px-6 py-3 rounded-full font-semibold shadow hover:shadow-lg transition-all"
          >
            <MapPin className="w-4 h-4" /> Get Directions
          </a>
        </div>
      </section>
    </div>
  );
}