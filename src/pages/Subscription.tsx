import { useState } from "react";
import { CheckCircle2, MailCheck, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

export const Subscription = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const benefits = [
    { icon: CheckCircle2, text: "Free email updates for new articles" },
    { icon: MailCheck, text: "Instant notification when a story is published" },
    { icon: CheckCircle2, text: "Weekly highlights from TheDashAfrica" },
    { icon: CheckCircle2, text: "Unsubscribe anytime" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Header */}
      <div className="bg-black text-white py-16 mb-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
            Get TheDashAfrica <span className="text-orange-500">Email Updates</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Subscribe for free and get notified whenever a new article is published.
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

        {/* Free Subscription Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 sticky top-24">
          {!isSubmitted ? (
            <>
              <h3 className="text-2xl font-black text-gray-900 mb-3">Free Email Alerts</h3>
              <p className="text-gray-600 text-sm mb-6">
                Enter your email and we will send a confirmation. You will receive updates whenever a new article is posted.
              </p>

              <form
                className="space-y-4 mb-6"
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!email.trim()) return;
                  setError(null);
                  setIsSubmitting(true);
                  try {
                    const response = await fetch("/api/subscribe.php", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ email: email.trim() })
                    });
                    const data = await response.json().catch(() => ({}));
                    if (!response.ok || !data?.ok) {
                      throw new Error(data?.error || "Subscription failed");
                    }
                    setIsSubmitted(true);
                  } catch (err) {
                    setError("We could not subscribe you right now. Please try again.");
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
              >
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
                <Button
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white h-12 text-lg font-bold shadow-lg shadow-orange-600/30"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Subscribe Free"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </form>

              {error && (
                <p className="text-xs text-red-600 text-center mb-4">
                  {error}
                </p>
              )}

              <div className="text-center">
                <p className="text-xs text-gray-400">
                  We will never charge you or share your email.
                </p>
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <MailCheck className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">
                Thank you for subscribing to TheDashAfrica blogs.
              </h3>
              <p className="text-gray-600 text-sm">
                We will notify you whenever a new article is uploaded.
              </p>
              <Button
                variant="ghost"
                className="mt-6"
                onClick={() => {
                  setEmail("");
                  setIsSubmitted(false);
                }}
              >
                Add another email
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
