import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function NewsletterSignup() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    setLoading(false);
    setDone(true);
    toast.success("You're subscribed! Thank you.");
  };

  if (done) {
    return (
      <div className="flex flex-col items-center gap-3 py-6">
        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
          <Check className="w-7 h-7 text-green-600" />
        </div>
        <p className="text-[#2D1B4E] font-semibold text-lg">You're subscribed!</p>
        <p className="text-gray-500 text-sm">We'll keep you updated on events and news.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
      <Input
        placeholder="Your name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
        className="h-12"
      />
      <Input
        type="email"
        placeholder="Your email address"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
        className="h-12"
      />
      <Button
        type="submit"
        disabled={loading}
        className="h-12 px-6 bg-gradient-to-r from-[#D4760A] to-[#E89530] text-white shrink-0 hover:opacity-90"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Subscribe"}
      </Button>
    </form>
  );
}