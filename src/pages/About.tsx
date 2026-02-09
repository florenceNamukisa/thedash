import { Award, Users, Globe, Target } from "lucide-react";

import { ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";

export const About = ({ onBack }: { onBack?: () => void }) => (
  <div className="max-w-5xl mx-auto py-10 animate-in fade-in duration-500">
    {onBack && (
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-6 pl-0 hover:bg-transparent text-gray-600 hover:text-black"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </Button>
    )}
    {/* Mission */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm md:order-1">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2">
          <Target className="text-orange-500" /> Who We Are
        </h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          theDASH is a media site for business, economy, investment, technology, and finance. We produce and publish high-end online content specifically targeted to the domestic and international community in Africa, the Middle East, and globally.
        </p>
        <p className="text-gray-600 leading-relaxed">
          As a non-conventional publishing media, we take pride in gathering state-of-the-art informative content (text, videos, audio) from executive-focused interviews, experts, and sector intelligence. By working with us, people, organizations, and corporates can deliver their most important messages to a network of global business and economy elites.
        </p>
      </div>
      <div className="md:order-2">
        <div className="relative overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/10">
          <img
            src="public/image.png"
            alt="Executive newsroom"
            className="w-full h-72 md:h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>
      </div>
    </div>

    {/* Values */}
    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: Globe, title: "Regional + Global Lens", desc: "Africa and the Middle East in the context of global capital and growth." },
          { icon: Users, title: "Executive Intelligence", desc: "Decision-grade reporting tailored for investors, founders, and institutions." },
          { icon: Award, title: "Premium Standards", desc: "High-end production across text, video, and audio." },
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
            <item.icon className="w-10 h-10 text-orange-500 mb-4" />
            <h3 className="font-bold text-lg mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);
