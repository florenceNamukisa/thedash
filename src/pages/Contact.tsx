import { Mail, Phone, MapPin, CheckCircle2, AlertTriangle, MessageCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";

import { useState } from "react";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  company: string;
};

export const Contact = () => {
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    company: ""
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = () => {
    const nextErrors: Partial<FormState> = {};
    if (!form.firstName.trim()) nextErrors.firstName = "First name is required.";
    if (!form.lastName.trim()) nextErrors.lastName = "Last name is required.";
    if (!form.email.trim()) nextErrors.email = "Email is required.";
    if (form.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!form.message.trim()) nextErrors.message = "Message is required.";
    if (form.message.trim().length > 0 && form.message.trim().length < 10) {
      nextErrors.message = "Message must be at least 10 characters.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSuccess(false);
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          company: form.company.trim()
        })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data?.ok) {
        throw new Error(data?.error || "Failed to send");
      }
      setIsSuccess(true);
      setForm({ firstName: "", lastName: "", email: "", message: "", company: "" });
    } catch {
      setSubmitError("We could not send your message right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-black mb-4 text-gray-900">Get in Touch</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Have a question or want to work together? We'd love to hear from you. 
          Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Information - Left Side */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Email</h3>
                  <p className="text-gray-600 mt-1">buzinirogroup@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Phone</h3>
                  <a
                    href="tel:+256793192760"
                    className="text-gray-600 mt-1 hover:text-orange-600 inline-flex items-center gap-2"
                  >
                    +256 793 192760
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#25D366] rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.964-.94 1.054-.174.099-.348.148-.609.099-.298-.074-.631-.198-1.00-.396-.358-.196-.599-.397-.824-.676l-1.422 1.174c.054.018.198.054.298.099.099.046.198.099.297.149.099.074.198.148.297.248.174.124.297.272.397.397.099.124.149.272.149.495 0 .074-.025.124-.05.174l-.446 1.488c.297.447.619.99.924 1.398.447.597.892 1.24 1.292 1.723l1.32 1.054c.497.398.997.497 1.397.497.099 0 .198-.025.297-.074.297-.149.595-.397.892-.596.297-.198.595-.397.892-.596.099-.074.198-.124.297-.198.099-.049.149-.124.198-.198.049-.074.074-.198.049-.297-.074-.297-.149-.595-.223-.794-.149-.297-.347-.595-.595-.892-.198-.248-.396-.496-.595-.744-.198-.248-.397-.496-.595-.744-.173-.223-.372-.37-.595-.521l-.745-.596c.124-.298.198-.595.273-.892.149-.595.347-1.192.595-1.793-.124-.074-.198-.149-.297-.174-.297-.074-.595-.149-.892-.149-.074 0-.149 0-.223.025-.074.025-.149.074-.223.149-.074.074-.148.148-.198.223-.049.074-.074.173-.049.272l.397 1.174Z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">WhatsApp</h3>
                  <a
                    href="https://wa.me/256793192760"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#25D366] font-bold mt-1 inline-flex items-center gap-2 hover:underline"
                  >
                    Chat with us
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Physical Address</h3>
                  <p className="text-gray-600 mt-1">
                    PO Box 103503 Kampala GPO<br />
                    Mutungo Hill, Ring Road<br />
                    Plot 628, Ssetongo Close
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="font-bold text-gray-900 mb-3">Business Hours</h3>
              <div className="space-y-2 text-gray-600">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form - Right Side (Larger) */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Send us a message</h2>
            <form className="space-y-6" onSubmit={onSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName" className="text-gray-700 font-medium">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="Florence"
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    className="mt-2"
                  />
                  {errors.firstName && <p className="text-xs text-red-600 mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-gray-700 font-medium">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Namukisa"
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    className="mt-2"
                  />
                  {errors.lastName && <p className="text-xs text-red-600 mt-1">{errors.lastName}</p>}
                </div>
              </div>
              <div>
                <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="florence1@gmail.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-2"
                />
                {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
              </div>
              <div>
                <Label htmlFor="message" className="text-gray-700 font-medium">Message</Label>
                <Textarea
                  id="message"
                  placeholder="How can we help?"
                  className="h-40 mt-2"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                {errors.message && <p className="text-xs text-red-600 mt-1">{errors.message}</p>}
              </div>

              <div className="hidden">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                />
              </div>

              {isSuccess && (
                <div className="flex items-center gap-2 text-green-700 text-sm bg-green-50 p-4 rounded-lg">
                  <CheckCircle2 className="w-5 h-5" />
                  Message sent successfully.
                </div>
              )}
              {submitError && (
                <div className="flex items-center gap-2 text-red-700 text-sm bg-red-50 p-4 rounded-lg">
                  <AlertTriangle className="w-5 h-5" />
                  {submitError}
                </div>
              )}

              <Button
                className="w-full bg-orange-500 hover:bg-orange-600 py-6 text-lg font-bold"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
