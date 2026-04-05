import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home } from "lucide-react";

export default function PageNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center">
        <div className="text-7xl font-bold text-[#D4760A]/20 mb-4">404</div>
        <h1 className="text-2xl font-bold text-[#2D1B4E] mb-2">Page Not Found</h1>
        <p className="text-gray-500 mb-8">The page you're looking for doesn't exist.</p>
        <Link
          to={createPageUrl("Home")}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4760A] to-[#E89530] text-white px-6 py-3 rounded-full font-semibold"
        >
          <Home className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    </div>
  );
}