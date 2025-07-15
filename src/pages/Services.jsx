import { FaCode, FaMobileAlt, FaCloud, FaLock, FaRocket, FaChartLine } from "react-icons/fa";

export default function Services() {
  const services = [
    {
      title: "Web Development",
      icon: <FaCode size={28} className="text-indigo-500" />,
      desc: "Build fast, modern, responsive websites using the latest tech stack (React, Next.js, Tailwind, etc).",
    },
    {
      title: "Mobile App Development",
      icon: <FaMobileAlt size={28} className="text-green-500" />,
      desc: "Cross-platform mobile apps with native performance using Flutter or React Native.",
    },
    {
      title: "Cloud Deployment",
      icon: <FaCloud size={28} className="text-blue-400" />,
      desc: "Scale your apps globally with AWS, GCP, and containerized solutions like Docker & Kubernetes.",
    },
    {
      title: "Cybersecurity",
      icon: <FaLock size={28} className="text-red-500" />,
      desc: "Keep your business safe with audits, penetration testing, and vulnerability scans.",
    },
    {
      title: "Product Launch",
      icon: <FaRocket size={28} className="text-yellow-500" />,
      desc: "From MVP to full-scale product — get launch-ready with CI/CD, analytics, and branding.",
    },
    {
      title: "Data Analytics",
      icon: <FaChartLine size={28} className="text-purple-500" />,
      desc: "Understand user behavior, forecast trends, and make data-driven decisions with ease.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-800 via-blue-900 to-gray-900 py-20 text-white text-center">
        <h1 className="text-4xl font-bold mb-4">Our Services</h1>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg">
          We offer a full spectrum of development, design, and cloud solutions tailored to your needs.
        </p>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-gray-100 p-3 rounded-full">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{service.title}</h3>
              </div>
              <p className="text-gray-600 text-sm">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-indigo-900 text-white text-center py-16">
        <h2 className="text-3xl font-semibold mb-4">Ready to start your next big idea?</h2>
        <p className="mb-6 text-gray-300">Let’s bring your vision to life. Talk to our expert team today.</p>
        <a
          href="/contact"
          className="inline-block bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold px-6 py-3 rounded-lg transition"
        >
          Contact Us
        </a>
      </section>
    </div>
  );
}
