import { useEffect } from "react";

export const Videos = () => {
  useEffect(() => {
    window.location.href = "https://afripods.africa/podcast/48567c00-a02b-11ef-8a6a-2bc586a7a644";
  }, []);

  return (
    <div className="max-w-6xl mx-auto text-center py-20">
      <h1 className="text-3xl md:text-4xl font-black text-gray-900">Redirecting to AfriPods</h1>
      <p className="text-gray-500 mt-4">
        You are being redirected to the podcast page. If it does not happen automatically,
        click the link below.
      </p>
      <a
        href="https://afripods.africa/podcast/48567c00-a02b-11ef-8a6a-2bc586a7a644"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-6 px-5 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow hover:bg-orange-600 transition"
      >
        Go to Podcast on AfriPods
      </a>
    </div>
  );
};
