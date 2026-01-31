import { useState } from "react";
import { CheckCircle2, Zap, Shield, Crown, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

export const Subscription = () => {
  const [plan, setPlan] = useState<"monthly" | "yearly">("monthly");
  const [email, setEmail] = useState("");

  const benefits = [
    { icon: Zap, text: "Ad-free browsing experience" },
    { icon: Shield, text: "Exclusive investigative reports" },
    { icon: Crown, text: "Access to premium video content" },
    { icon: CheckCircle2, text: "Daily newsletter digest" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Header */}
      <div className="bg-black text-white py-16 mb-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
            Unlock the <span className="text-orange-500">Full Story</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join thousands of readers who support independent African journalism. Get unlimited access to premium content.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        
        {/* Benefits List */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-900">Why Subscribe?</h2>
          <div className="space-y-6">
            {benefits.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{item.text}</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Experience TheDashAfrica without interruptions and get deeper insights into the stories that matter.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 sticky top-24">
          <div className="flex justify-center mb-8 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setPlan("monthly")}
              className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${
                plan === "monthly" ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setPlan("yearly")}
              className={`flex-1 py-2 text-sm font-bold rounded-md transition-all relative ${
                plan === "yearly" ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Yearly
              <span className="absolute -top-3 -right-2 bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                SAVE 20%
              </span>
            </button>
          </div>

          <div className="text-center mb-8">
            <div className="text-5xl font-black text-gray-900 mb-2">
              ${plan === "monthly" ? "4.99" : "47.90"}
              <span className="text-lg font-normal text-gray-500">/{plan === "monthly" ? "mo" : "yr"}</span>
            </div>
            <p className="text-gray-500 text-sm">Billed {plan === "monthly" ? "monthly" : "annually"}. Cancel anytime.</p>
          </div>

          <form className="space-y-4 mb-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <Input 
                type="email" 
                placeholder="you@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
              />
            </div>
            <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white h-12 text-lg font-bold shadow-lg shadow-orange-600/30">
              Start Your Trial <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </form>

          <div className="text-center">
            <p className="text-xs text-gray-400">
              By subscribing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};