import { useState } from "react";
import { BookOpen, Calendar, User, ArrowRight } from "lucide-react";
import contentData from "../content.json";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Sandesh() {
  const posts = contentData.sandesh || [];
  const loading = false;
  const [selectedPost, setSelectedPost] = useState(null);

  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
    const d = new Date(year, month - 1, day);
    return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

  if (selectedPost) {
    return (
      <div>
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#2D1B4E] to-[#4A2D7A] py-20 md:py-28">
          <div className="max-w-4xl mx-auto px-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedPost(null)}
              className="text-white/80 hover:text-white hover:bg-white/10 mb-6"
            >
              ← Back to All Posts
            </Button>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{selectedPost.title}</h1>
              <div className="flex flex-wrap gap-4 text-white/60 text-sm">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {selectedPost.author} {selectedPost.author_title && `(${selectedPost.author_title})`}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(selectedPost.publish_date)}
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          {selectedPost.image_url && (
            <img
              src={selectedPost.image_url}
              alt={selectedPost.title}
              className="w-full h-96 object-cover rounded-2xl mb-8 shadow-lg"
            />
          )}
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {selectedPost.content}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#2D1B4E] to-[#4A2D7A] py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <BookOpen className="w-4 h-4 text-[#F0D68A]" />
              <span className="text-sm text-white/80">Temple Newsletter & Insights</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Sandesh</h1>
            <p className="text-white/60 text-lg">
              Messages, teachings, and updates from our priests and temple community
            </p>
            <p className="text-white/40 text-sm mt-4 italic">
              This page is maintained by Pandit Ji — sharing his blogs, spiritual thoughts, and divine guidance for our community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        {loading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-4 border-[#D4760A]/30 border-t-[#D4760A] rounded-full animate-spin mx-auto" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-orange-50">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-400">No posts published yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-orange-50 hover:shadow-lg transition-all group cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                {post.image_url && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(post.publish_date)}
                  </div>
                  <h3 className="font-bold text-[#2D1B4E] text-lg mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                  )}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#D4760A] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}