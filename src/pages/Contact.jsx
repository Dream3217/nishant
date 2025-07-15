import { useState } from "react";
import { Mail, Instagram, Send } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = form;
    if (!name || !email || !message) {
      setError("All fields are required.");
      setSuccess("");
    } else {
      setError("");
      setSuccess("Message sent successfully!");
      console.log("Submitted:", form);
      setForm({ name: "", email: "", message: "" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-16 px-4 flex items-center justify-center">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Contact Info */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-6 col-span-1">
          <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400">Contact Us</h2>

          <div className="flex items-start gap-3 text-gray-800 dark:text-gray-200">
            <Mail className="text-blue-500 mt-1" />
            <div>
              <span>Email: </span>
              <a href="mailto:nks983775@gmail.com" className="text-blue-500 hover:underline">
                nks983775@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3 text-gray-800 dark:text-gray-200">
            <Instagram className="text-pink-500 mt-1" />
            <div>
              <span>Instagram: </span>
              <a
                href="https://instagram.com/nishantdabre_07"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:underline"
              >
                @nishantdabre_07
              </a>
            </div>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 pt-2">
            We typically respond within 24 hours.
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-6 col-span-1">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Send us a message</h2>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 rounded border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded flex items-center justify-center gap-2 transition"
            >
              <Send size={18} />
              Send Message
            </button>
          </form>
        </div>

        {/* Right Map + Image */}
        <div className="col-span-1 flex flex-col gap-4 h-full">
          {/* GitHub-style Octocat Image */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg flex items-center justify-center p-4 h-1/2">
            <img
              src="https://octodex.github.com/images/minion.png"
              alt="Octocat"
              className="w-44 h-44 object-contain"
            />
          </div>

          {/* Embedded Google Map */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden h-1/2">
            <iframe
              title="Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.6056017557476!2d72.8777!3d19.076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63e9f73948f%3A0x3a27b6743b77003c!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1654931753000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
