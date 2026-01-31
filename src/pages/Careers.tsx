import { MapPin, Briefcase } from "lucide-react";

export const Careers = () => {
  const jobs = [
    { title: "Senior Frontend Engineer", location: "Remote", type: "Full-time" },
    { title: "Investigative Journalist", location: "New York, USA", type: "Full-time" },
    { title: "Data Analyst", location: "London, UK", type: "Contract" },
    { title: "Product Designer", location: "Remote", type: "Full-time" },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-4xl font-black mb-4">Join Our Team</h1>
      <p className="text-xl text-gray-600 mb-8">
        Help us build the future of news. We're looking for passionate people who want to make a difference.
      </p>
      
      <div className="space-y-4">
        {jobs.map((job, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-6 hover:border-orange-500 transition-colors group cursor-pointer">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{job.title}</h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" /> {job.type}
                  </span>
                </div>
              </div>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold hover:bg-black hover:text-white hover:border-black transition-all whitespace-nowrap">
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};