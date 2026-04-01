export const Advertise = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
      <h1 className="text-3xl font-bold mb-4">Advertise With Us</h1>
      <p className="text-gray-700 mb-6">
        Reach a highly engaged audience across East Africa and the broader African market. The Dash Africa offers premium advertising slots, sponsored content, and partnership opportunities designed to amplify your brand.
      </p>
      <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-6">
        <li>Sponsored articles and featured stories</li>
        <li>Newsletter and email sponsorship</li>
        <li>Homepage and category takeovers</li>
        <li>Custom campaign planning with audience targeting</li>
      </ul>
      <a
        href="mailto:buzinirogroup@gmail.com?subject=Advertise%20with%20The%20Dash%20Africa"
        className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-700 transition"
      >
        Contact Sales
      </a>
    </div>
  );
};