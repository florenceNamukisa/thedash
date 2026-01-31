import { Award, Users, Globe, Target } from "lucide-react";

export const About = () => (
  <div className="max-w-5xl mx-auto py-8 animate-in fade-in duration-500">
    {/* Hero Image */}
    <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
      <img 
        src="https://picsum.photos/seed/office/1200/600" 
        alt="TheDashAfrica Office" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2">Our Story</h1>
          <p className="text-gray-200 text-lg">Amplifying the African voice since 2024</p>
        </div>
      </div>
    </div>

    {/* Mission */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Target className="text-orange-500" /> Our Mission
        </h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          At TheDashAfrica, we believe that every story matters. Our mission is to deliver accurate, timely, and relevant news that connects Africans across the continent and the diaspora. We strive to be the pulse of the nation, bringing you the stories that shape our world.
        </p>
        <p className="text-gray-600 leading-relaxed">
          We are committed to journalistic integrity, fearless reporting, and celebrating the diverse cultures and innovations that make Africa great.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <img src="https://picsum.photos/seed/team1/400/300" className="rounded-lg shadow-md w-full h-32 object-cover" alt="Team" />
        <img src="https://picsum.photos/seed/team2/400/300" className="rounded-lg shadow-md w-full h-32 object-cover mt-8" alt="Team" />
      </div>
    </div>

    {/* Values */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
      {[
        { icon: Globe, title: "Pan-African Reach", desc: "Reporting from every corner of the continent." },
        { icon: Users, title: "Community First", desc: "News that impacts real people and communities." },
        { icon: Award, title: "Award Winning", desc: "Recognized for excellence in digital journalism." },
      ].map((item, idx) => (
        <div key={idx} className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow">
          <item.icon className="w-10 h-10 text-orange-500 mb-4" />
          <h3 className="font-bold text-lg mb-2">{item.title}</h3>
          <p className="text-gray-600 text-sm">{item.desc}</p>
        </div>
      ))}
    </div>

    {/* Team Section */}
    <div>
      <h2 className="text-2xl font-bold mb-6">Meet the Leadership</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {["CEO", "Editor-in-Chief", "Head of Tech", "Creative Director"].map((role, i) => (
          <div key={i} className="text-center group">
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-3 border-2 border-transparent group-hover:border-orange-500 transition-colors">
              <img src={`https://picsum.photos/seed/person${i}/200/200`} alt={role} className="w-full h-full object-cover" />
            </div>
            <h4 className="font-bold text-gray-900">Alex Johnson</h4>
            <p className="text-orange-600 text-sm font-medium">{role}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);