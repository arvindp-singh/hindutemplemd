import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import contentData from "../content.json";

const { temple, home } = contentData;
import {
  Calendar,
  Heart,
  Image,
  Phone,
  ArrowRight,
  Star,
  Users,
  Clock,
  Facebook,
} from "lucide-react";
import { motion } from "framer-motion";

const QUICK_LINKS = [
  {
    label: "Events",
    page: "Events",
    icon: Calendar,
    desc: "View upcoming celebrations",
  },
  {
    label: "Gallery",
    page: "Gallery",
    icon: Image,
    desc: "Explore temple photos",
  },
  { label: "Donate", page: "Donate", icon: Heart, desc: "Support the temple" },
  { label: "Contact", page: "Contact", icon: Phone, desc: "Get in touch" },
];

export default function Home() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  // Use featured-tagged events if any, otherwise fall back to next 3 upcoming
  const featuredEvents = contentData.events.filter((e) => e.highlighted);
  const upcomingEvents = contentData.events
    .filter((event) => {
      const [year, month, day] = event.date.split("-");
      const eventDate = new Date(year, month - 1, day);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate >= today;
    })
    .slice(0, 3);
  const events = featuredEvents.length > 0 ? featuredEvents : upcomingEvents;

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#2D1B4E] via-[#4A2D7A] to-[#2D1B4E] text-white min-h-[80vh] flex items-center">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-[#D4760A] rounded-full blur-[128px]" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#E89530] rounded-full blur-[128px]" />
        </div>
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "url('/images/temple.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 py-20 md:py-32 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
              <Star className="w-4 h-4 text-[#F0D68A]" />
              <span className="text-sm text-white/80">{home.heroTagline}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              The Hindu Temple of
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#E89530] to-[#F0D68A]">
                Metropolitan Washington
              </span>
            </h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-lg mb-8">
              {home.heroSubtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to={createPageUrl("Events")}
                className="bg-gradient-to-r from-[#D4760A] to-[#E89530] text-white px-7 py-3.5 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] flex items-center gap-2"
              >
                Upcoming Events <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://www.facebook.com/TheHinduTempleMD"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-sm text-white px-7 py-3.5 rounded-full font-semibold hover:bg-white/20 transition-all border border-white/20 flex items-center gap-2"
              >
                <Facebook className="w-4 h-4" />
                Watch Live
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#D4760A]/30 to-transparent rounded-3xl blur-2xl" />
              <img
                src="/images/temple.jpg"
                alt="Hindu Temple of Metropolitan Washington"
                className="w-full h-[450px] object-cover rounded-3xl shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Shanti Mantra */}
      <section className="bg-gradient-to-r from-[#D4760A] to-[#E89530] py-16 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-white/90 text-5xl mb-6">"</div>
          <p className="text-white text-lg md:text-xl font-light italic leading-relaxed">
            {home.shantMantra}
          </p>
          <p className="text-white/80 mt-4 font-semibold">— Shanti Mantra</p>
        </div>
      </section>

      {/* Highlighted Events */}
      {featuredEvents.length > 0 && (
        <section className="bg-[#FFFBF5] py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="inline-flex items-center gap-1.5 text-[#D4760A] font-semibold text-sm uppercase tracking-wider">
                  <Star className="w-4 h-4 fill-[#D4760A]" /> Highlighted Events
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-[#2D1B4E] mt-1">
                  Don't Miss These
                </h2>
              </div>
              <Link
                to={createPageUrl("Events")}
                className="text-sm text-[#D4760A] font-semibold hover:underline flex items-center gap-1"
              >
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredEvents.map((event) => {
                const [year, month, day] = event.date.split("-");
                const d = new Date(year, month - 1, day);
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative bg-gradient-to-br from-[#2D1B4E] to-[#4A2D7A] rounded-2xl overflow-hidden shadow-lg text-white"
                  >
                    <div className="absolute top-3 right-3 bg-[#D4760A] text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3 fill-white" /> Featured
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-white/10 rounded-xl px-4 py-3 text-center">
                          <div className="text-[#F0D68A] text-xs font-semibold uppercase">
                            {d.toLocaleDateString("en-US", { month: "short" })}
                          </div>
                          <div className="text-2xl font-bold">
                            {d.getDate()}
                          </div>
                          <div className="text-white/50 text-xs">
                            {event.day_of_week ||
                              d.toLocaleDateString("en-US", {
                                weekday: "short",
                              })}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg leading-snug">
                            {event.title}
                          </h3>
                          {event.time && (
                            <p className="text-[#E89530] text-sm mt-1 flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" /> {event.time}
                            </p>
                          )}
                        </div>
                      </div>
                      {event.description && (
                        <p className="text-white/65 text-sm leading-relaxed line-clamp-2">
                          {event.description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Quick Links */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {QUICK_LINKS.map((link, i) => (
            <motion.div
              key={link.page}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={createPageUrl(link.page)}
                className="group block bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-orange-50 hover:border-[#D4760A]/20"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D4760A]/10 to-[#E89530]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <link.icon className="w-6 h-6 text-[#D4760A]" />
                </div>
                <h3 className="font-semibold text-[#2D1B4E] text-lg mb-1">
                  {link.label}
                </h3>
                <p className="text-sm text-gray-500">{link.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Preview */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[#D4760A] font-semibold text-sm uppercase tracking-wider">
              About the Temple
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D1B4E] mt-2 mb-6">
              A Sacred Place for the Community
            </h2>
            {home.aboutText.map((p, i) => (
              <p
                key={i}
                className={`text-gray-600 leading-relaxed ${i < home.aboutText.length - 1 ? "mb-4" : "mb-6"}`}
              >
                {p}
              </p>
            ))}
            <Link
              to={createPageUrl("About")}
              className="inline-flex items-center gap-2 text-[#D4760A] font-semibold hover:gap-3 transition-all"
            >
              Read Our Full Story <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-[#2D1B4E] to-[#4A2D7A] rounded-2xl p-6 text-white">
              <Users className="w-8 h-8 text-[#E89530] mb-3" />
              <div className="text-3xl font-bold">35+</div>
              <div className="text-white/60 text-sm">Years of Service</div>
            </div>
            <div className="bg-gradient-to-br from-[#D4760A] to-[#E89530] rounded-2xl p-6 text-white">
              <Heart className="w-8 h-8 text-white/80 mb-3" />
              <div className="text-3xl font-bold">1000+</div>
              <div className="text-white/80 text-sm">Community Members</div>
            </div>
            <div className="bg-gradient-to-br from-[#D4760A] to-[#E89530] rounded-2xl p-6 text-white">
              <Calendar className="w-8 h-8 text-white/80 mb-3" />
              <div className="text-3xl font-bold">100+</div>
              <div className="text-white/80 text-sm">Annual Events</div>
            </div>
            <div className="bg-gradient-to-br from-[#2D1B4E] to-[#4A2D7A] rounded-2xl p-6 text-white">
              <Clock className="w-8 h-8 text-[#E89530] mb-3" />
              <div className="text-3xl font-bold">Daily</div>
              <div className="text-white/60 text-sm">
                Morning & Evening Aarti
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#2D1B4E] via-[#4A2D7A] to-[#2D1B4E] py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Support Our Temple
          </h2>
          <p className="text-white/70 text-lg mb-8">{home.ctaText}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to={createPageUrl("Donate")}
              className="bg-gradient-to-r from-[#D4760A] to-[#E89530] text-white px-8 py-3.5 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
            >
              Make a Donation
            </Link>
          </div>
        </div>
      </section>
      {/* WhatsApp Join */}
      <section className="bg-[#FFFBF5] py-12">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366]/10 mb-4">
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-[#25D366]">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#2D1B4E] mb-2">
            Join Our WhatsApp Community
          </h2>
          <p className="text-gray-500 mb-6">
            Stay up to date with temple announcements, events, and community
            news.
          </p>
          <a
            href={temple.whatsappGroup}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-3.5 rounded-full font-semibold shadow-md hover:shadow-lg hover:bg-[#20BD5C] transition-all"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Join WhatsApp Group
          </a>
        </div>
      </section>
    </div>
  );
}
