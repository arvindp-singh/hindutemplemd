import contentData from "../content.json";
import { useState } from "react";
import { Calendar, Clock, MapPin, Printer, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Events() {
  const allEvents = contentData.events;
  const [activeTab, setActiveTab] = useState("current");

  // Get today's date at midnight for accurate comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Current month events
  const currentMonthEvents = allEvents.filter(event => {
    const [year, month, day] = event.date.split('-');
    const eventDate = new Date(year, month - 1, day);
    return eventDate >= today && eventDate.getFullYear() === today.getFullYear() && 
           eventDate.getMonth() === today.getMonth();
  });

  // Future month events (after current month)
  const futureEvents = allEvents.filter(event => {
    const [year, month, day] = event.date.split('-');
    const eventDate = new Date(year, month - 1, day);
    return eventDate >= today && (eventDate.getFullYear() > today.getFullYear() ||
           (eventDate.getFullYear() === today.getFullYear() && eventDate.getMonth() > today.getMonth()));
  });

  // Group events by month
  const groupByMonth = (events) => {
    return events.reduce((acc, event) => {
      const [year, month, day] = event.date.split('-');
      const d = new Date(year, month - 1, day);
      const monthYear = d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }
      acc[monthYear].push(event);
      return acc;
    }, {});
  };

  const events = activeTab === "current" ? currentMonthEvents : futureEvents;
  const eventsByMonth = groupByMonth(events);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#2D1B4E] to-[#4A2D7A] py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Events</h1>
            <p className="text-white/60 text-lg">Join us for celebrations, pujas, and community gatherings</p>
          </motion.div>
        </div>
      </section>

      {/* Temple Hours */}
      <section className="bg-gradient-to-r from-[#D4760A] to-[#E89530] py-6">
        <div className="max-w-5xl mx-auto px-6 flex flex-wrap justify-center gap-6 text-white text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span><strong>Weekdays:</strong> 8 AM – 1 PM & 5 – 8 PM</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span><strong>Weekends:</strong> 8 AM – 8 PM</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>10001 Riggs Road, Adelphi, MD 20783</span>
          </div>
        </div>
      </section>

      {/* Regular Weekly Events */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-8">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-orange-50 text-center shadow-sm">
            <div className="text-[#D4760A] font-bold mb-1">Daily</div>
            <p className="text-sm text-gray-600">Morning Aarti @ 8 AM</p>
            <p className="text-sm text-gray-600">Evening Aarti @ 8 PM</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-orange-50 text-center shadow-sm">
            <div className="text-[#D4760A] font-bold mb-1">Every Tuesday</div>
            <p className="text-sm text-gray-600">7 – 7:30 PM</p>
            <p className="text-sm text-gray-600">Hanuman Ji Prayers & Aarti</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-orange-50 text-center shadow-sm">
            <div className="text-[#D4760A] font-bold mb-1">Every Thursday</div>
            <p className="text-sm text-gray-600">7 – 8 PM</p>
            <p className="text-sm text-gray-600">Sai Baba Bhajans & Aarti</p>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h2 className="text-2xl font-bold text-[#2D1B4E]">
            {activeTab === "current" ? "Current Events" : "Upcoming Events"}
          </h2>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={activeTab === "current" ? "default" : "outline"}
              onClick={() => setActiveTab("current")}
              className={activeTab === "current" ? "bg-[#D4760A] hover:bg-[#E89530]" : ""}
            >
              Current ({currentMonthEvents.length})
            </Button>
            <Button
              variant={activeTab === "upcoming" ? "default" : "outline"}
              onClick={() => setActiveTab("upcoming")}
              className={activeTab === "upcoming" ? "bg-[#D4760A] hover:bg-[#E89530]" : ""}
            >
              Upcoming ({futureEvents.length})
            </Button>
          </div>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-orange-50">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-400">No {activeTab === "current" ? "current" : "upcoming"} events at this time.</p>
          </div>
        ) : (
          <div className="space-y-10">
            {Object.entries(eventsByMonth).map(([month, monthEvents], monthIndex) => (
              <div key={month}>
                <h3 className="text-xl font-bold text-[#D4760A] mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {month}
                </h3>
                <div className="space-y-4">
                  {monthEvents.map((event, i) => {
                    const [year, month, day] = event.date.split('-');
                    const d = new Date(year, month - 1, day);
                    return (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: (monthIndex * 0.1) + (i * 0.05) }}
                        className="bg-white rounded-2xl overflow-hidden border border-orange-50 hover:shadow-md transition-all flex"
                      >
                        <div className="bg-gradient-to-b from-[#2D1B4E] to-[#4A2D7A] w-24 md:w-28 flex-shrink-0 flex flex-col items-center justify-center p-4 text-white">
                          <span className="text-[#F0D68A] text-xs font-medium uppercase">
                            {d.toLocaleDateString("en-US", { month: "short" })}
                          </span>
                          <span className="text-2xl md:text-3xl font-bold">{d.getDate()}</span>
                          <span className="text-white/50 text-xs">
                            {event.day_of_week || d.toLocaleDateString("en-US", { weekday: "short" })}
                          </span>
                        </div>
                        <div className="p-5 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-[#2D1B4E] text-lg">{event.title}</h3>
                          </div>
                          {event.time && (
                            <p className="text-[#D4760A] text-sm font-medium mt-1 flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" /> {event.time}
                            </p>
                          )}
                          {event.description && (
                            <p className="text-gray-500 text-sm mt-2 leading-relaxed">{event.description}</p>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* WhatsApp Join */}
      <section className="max-w-4xl mx-auto px-6 pb-8">
        <div className="bg-[#25D366]/10 border border-[#25D366]/20 rounded-3xl p-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366]/20 mb-4">
            <svg viewBox="0 0 24 24" className="w-7 h-7 fill-[#25D366]"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </div>
          <h2 className="text-xl font-bold text-[#2D1B4E] mb-2">Never Miss an Event</h2>
          <p className="text-gray-500 mb-5 text-sm">Join our WhatsApp group for instant event reminders and announcements.</p>
          <a
            href="https://chat.whatsapp.com/REPLACE_WITH_GROUP_LINK"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white px-7 py-3 rounded-full font-semibold shadow-md hover:shadow-lg hover:bg-[#20BD5C] transition-all text-sm"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Join WhatsApp Group
          </a>
        </div>
      </section>

      {/* Sponsor CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="bg-gradient-to-br from-[#2D1B4E] to-[#4A2D7A] rounded-3xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">In-Person & Remote Sponsors Welcome</h2>
          <p className="text-white/70 mb-6">
            Contact Pandit Pitamber Dutt Sharma, Shri Ram Pandey, or Manager Harbans Sharma
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:3014452165" className="bg-white/10 rounded-full px-6 py-2.5 text-sm hover:bg-white/20 transition-colors">
              (301) 445-2165
            </a>
            <a href="tel:3014341000" className="bg-white/10 rounded-full px-6 py-2.5 text-sm hover:bg-white/20 transition-colors">
              (301) 434-1000
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}