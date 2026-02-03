import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";

export const Contact = () => (
  <div className="max-w-4xl mx-auto py-8">
    <h1 className="text-4xl font-black mb-8">Get in Touch</h1>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>
        <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Email</h3>
              <p className="text-gray-600">legacyafrica.uganda@gmail.com</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Phone</h3>
              <p className="text-gray-600">+256 704 597816</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Physical Address</h3>
              <p className="text-gray-600">
                PO Box 103503 Kampala GPO<br />
                Mutungo Hill, Ring Road<br />
                Plot 628, Ssetongo Close
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
        <h2 className="text-xl font-bold mb-6">Send us a message</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="Florence" />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Namukisa" />
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="florence1@gmail.com" />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="How can we help?" className="h-32" />
          </div>
          <Button className="w-full bg-orange-500 hover:bg-orange-600">Send Message</Button>
        </form>
      </div>
    </div>
  </div>
);
