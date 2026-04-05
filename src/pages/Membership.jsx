import { Download, FileText, Heart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import contentData from "../content.json";

const ICON_MAP = { FileText, Users, Heart };
const ICON_ORDER = [FileText, Users, Heart];

export default function Membership() {
  const { quote, quoteAuthor, programDescription, memberRecognition, taxDeductible, coordinators, forms: membershipForms, submissionSteps } = contentData.membership;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/30 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#2D1B4E] to-[#4A2D7A] text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Dollar-A-Day Membership
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-4">"{quote}"</p>
          <p className="text-lg text-[#E89530] font-semibold">— {quoteAuthor}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Program Overview */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-[#2D1B4E] mb-6">About the Program</h2>
          <p className="text-gray-700 leading-relaxed mb-6">{programDescription}</p>
          <div className="bg-orange-50 border-l-4 border-[#D4760A] p-6 rounded-r-lg mb-6">
            <p className="text-[#2D1B4E] font-semibold mb-2">Member Recognition</p>
            <p className="text-gray-700">{memberRecognition}</p>
          </div>
          <p className="text-sm text-gray-600 italic">{taxDeductible}</p>
        </div>

        {/* Coordinators */}
        <div className="bg-gradient-to-r from-orange-50 to-purple-50 rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-[#2D1B4E] mb-6">Program Coordinators</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {coordinators.map((c, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                <p className="font-semibold text-[#2D1B4E] mb-2">{c.name}</p>
                <p className="text-gray-700"><a href={`mailto:${c.email}`} className="text-[#D4760A] hover:underline">{c.email}</a></p>
                <p className="text-gray-700">Phone: {c.phone}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Downloadable Forms */}
        <div>
          <h2 className="text-3xl font-bold text-[#2D1B4E] mb-8 text-center">
            Download Membership Forms
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {membershipForms.map((form, index) => {
              const Icon = ICON_ORDER[index] || FileText;
              return (
                <Card key={index} className="hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-[#D4760A] to-[#E89530] rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg text-[#2D1B4E]">{form.title}</CardTitle>
                    <CardDescription className="text-sm">{form.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full bg-gradient-to-r from-[#D4760A] to-[#E89530] hover:from-[#E89530] hover:to-[#D4760A]">
                      <a href={form.url} target="_blank" rel="noopener noreferrer" download>
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

        {/* Instructions */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-[#2D1B4E] mb-6">How to Submit Your Form</h3>
          <div className="space-y-4">
            {submissionSteps.map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-8 h-8 bg-[#D4760A] text-white rounded-full flex items-center justify-center shrink-0 font-bold">{i + 1}</div>
                <div>
                  <p className="font-semibold text-[#2D1B4E] mb-1">{step.title}</p>
                  <p className="text-gray-700">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Thank You Message */}
        <div className="mt-12 text-center">
          <p className="text-xl text-[#2D1B4E] font-semibold mb-2">
            Your generosity is always appreciated.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Thank you in advance for your ongoing support.
          </p>
          <p className="text-gray-600">
            For any questions, please contact the coordinators listed above.
          </p>
        </div>
        </div> {/* Downloadable Forms */}
      </div> {/* max-w-7xl */}
    </div>
  );
}