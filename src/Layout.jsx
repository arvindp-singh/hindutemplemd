import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useState } from "react";

import contentData from "./content.json";
// testing
const { temple } = contentData;
import {
  Menu,
  X,
  Phone,
  MapPin,
  Clock,
  Facebook,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NAV_ITEMS = [
  { label: "Home", page: "Home" },
  { label: "Events", page: "Events" },
  {
    label: "Services",
    submenu: [
      { label: "Services", page: "Services" },
      { label: "Hall Rental", page: "HallRental" },
    ],
  },
  {
    label: "About Us",
    submenu: [
      { label: "About", page: "About" },
      { label: "Priests", page: "Priests" },
      { label: "Gallery", page: "Gallery" },
      { label: "Membership", page: "Membership" },
    ],
  },
  { label: "Contact", page: "Contact" },
  { label: "Sandesh", page: "Sandesh" },
];

export default function Layout({ children, currentPageName }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedSubmenu, setExpandedSubmenu] = useState(null);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBF5]">
      {/* Top Bar */}
      <div className="bg-[#2D1B4E] text-white/80 text-xs py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3 h-3" />
              {temple.phones.join(" | ")}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3" />
              {temple.address}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              Weekdays: {temple.hours.weekdays} | Weekends:{" "}
              {temple.hours.weekends}
            </span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-orange-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-20">
          <Link
            to={createPageUrl("Home")}
            className="flex items-center gap-3 shrink-0"
          >
            <img
              src={temple.logo}
              alt="Temple Logo"
              className="w-10 h-10 md:w-12 md:h-12 object-contain"
            />
            <div className="hidden sm:block">
              <div className="text-[#2D1B4E] font-semibold text-sm md:text-base leading-tight">
                The Hindu Temple of
              </div>
              <div className="text-[#D4760A] font-bold text-xs md:text-sm leading-tight">
                Metropolitan Washington
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              if (item.submenu) {
                const isActive = item.submenu.some(
                  (sub) => sub.page === currentPageName,
                );
                return (
                  <DropdownMenu key={item.label}>
                    <DropdownMenuTrigger
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1 ${
                        isActive
                          ? "text-[#D4760A] bg-orange-50"
                          : "text-[#2D1B4E]/70 hover:text-[#D4760A] hover:bg-orange-50/50"
                      }`}
                    >
                      {item.label}
                      <ChevronDown className="w-3.5 h-3.5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {item.submenu.map((subItem) => (
                        <DropdownMenuItem key={subItem.page} asChild>
                          <Link
                            to={createPageUrl(subItem.page)}
                            className="cursor-pointer"
                          >
                            {subItem.label}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }
              return (
                <Link
                  key={item.page}
                  to={createPageUrl(item.page)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentPageName === item.page
                      ? "text-[#D4760A] bg-orange-50"
                      : "text-[#2D1B4E]/70 hover:text-[#D4760A] hover:bg-orange-50/50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Desktop donate button */}
            <a
              href="https://www.paypal.com/donate/?hosted_button_id=EUSFSDDAVT38A"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-block bg-gradient-to-r from-[#D4760A] to-[#E89530] text-white px-5 py-2.5 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
            >
              Donate with PayPal
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-[#2D1B4E] hover:bg-orange-50 rounded-lg"
            >
              {mobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-orange-100 shadow-lg">
            <nav className="flex flex-col p-4 gap-1">
              {NAV_ITEMS.map((item) => {
                if (item.submenu) {
                  const isExpanded = expandedSubmenu === item.label;
                  return (
                    <div key={item.label}>
                      <button
                        onClick={() =>
                          setExpandedSubmenu(isExpanded ? null : item.label)
                        }
                        className="w-full px-4 py-3 rounded-xl text-sm font-medium transition-all text-[#2D1B4E]/70 hover:text-[#D4760A] hover:bg-orange-50 flex items-center justify-between"
                      >
                        {item.label}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isExpanded && (
                        <div className="flex flex-col gap-1 mt-1 pl-2">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.page}
                              to={createPageUrl(subItem.page)}
                              onClick={() => setMobileOpen(false)}
                              className={`px-4 py-3 pl-8 rounded-xl text-sm font-medium transition-all ${
                                currentPageName === subItem.page
                                  ? "text-[#D4760A] bg-orange-50"
                                  : "text-[#2D1B4E]/70 hover:text-[#D4760A] hover:bg-orange-50"
                              }`}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.page}
                    to={createPageUrl(item.page)}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      currentPageName === item.page
                        ? "text-[#D4760A] bg-orange-50"
                        : "text-[#2D1B4E]/70 hover:text-[#D4760A] hover:bg-orange-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              {/* Mobile donate button */}
              <a
                href="https://www.paypal.com/donate/?hosted_button_id=EUSFSDDAVT38A"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block text-center px-4 py-3 rounded-xl bg-gradient-to-r from-[#D4760A] to-[#E89530] text-white font-semibold shadow-lg transition-all"
              >
                Donate
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Page Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-[#2D1B4E] text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Temple Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/699b15bdfc2323e15c43afad/6774a69de_logo.png"
                  alt="Temple Logo"
                  className="w-10 h-10 object-contain"
                />
                <div>
                  <div className="font-semibold text-sm">
                    The Hindu Temple of
                  </div>
                  <div className="text-[#E89530] font-bold text-sm">
                    Metropolitan Washington
                  </div>
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                The first Hindu temple in the DMV area. Serving the community
                since 1988 with Vedic traditions and Sanatana Dharma ideals.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-[#E89530] mb-4">Quick Links</h4>
              <div className="flex flex-col gap-2">
                <Link
                  to={createPageUrl("Home")}
                  className="text-white/60 hover:text-[#E89530] text-sm transition-colors"
                >
                  Home
                </Link>
                <Link
                  to={createPageUrl("About")}
                  className="text-white/60 hover:text-[#E89530] text-sm transition-colors"
                >
                  About
                </Link>
                <Link
                  to={createPageUrl("Services")}
                  className="text-white/60 hover:text-[#E89530] text-sm transition-colors"
                >
                  Services
                </Link>
                <Link
                  to={createPageUrl("Events")}
                  className="text-white/60 hover:text-[#E89530] text-sm transition-colors"
                >
                  Events
                </Link>
                <Link
                  to={createPageUrl("Contact")}
                  className="text-white/60 hover:text-[#E89530] text-sm transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>

            {/* Service Hours */}
            <div>
              <h4 className="font-semibold text-[#E89530] mb-4">
                Service Hours
              </h4>
              <div className="text-white/60 text-sm space-y-2">
                <p>
                  <span className="text-white/80">Weekdays:</span> 8 AM – 1 PM &
                  5 PM – 8 PM
                </p>
                <p>
                  <span className="text-white/80">Weekends:</span> 8 AM – 8 PM
                </p>
                <p className="pt-2">
                  <span className="text-white/80">Morning Aarti:</span> 8 AM
                </p>
                <p>
                  <span className="text-white/80">Evening Aarti:</span> 8 PM
                </p>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-[#E89530] mb-4">Contact Us</h4>
              <div className="text-white/60 text-sm space-y-3">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                  10001 Riggs Road, Adelphi, MD 20783
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 shrink-0" />
                  (301) 445-2165 | (301) 434-1000
                </p>
                <a
                  href="https://www.facebook.com/TheHinduTempleMD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#E89530] transition-colors"
                >
                  <Facebook className="w-4 h-4 shrink-0" />
                  Follow us on Facebook
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} The Hindu Temple of Metropolitan
              Washington. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link
                to={createPageUrl("Donate")}
                className="text-[#E89530] hover:text-[#F0D68A] text-sm font-medium transition-colors"
              >
                Support the Temple
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
