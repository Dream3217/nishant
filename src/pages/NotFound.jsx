// src/pages/NotFound.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-10 text-center"
      >
        <h1 className="text-6xl font-bold text-indigo-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <img
          src="https://octodex.github.com/images/constructocat2.jpg"
          alt="Octocat 404"
          className="mx-auto w-48 mb-6 rounded-md shadow-md"
        />

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded transition"
          >
            ← Go Home
          </Link>
          <Link
            to="/contact"
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded transition"
          >
            Contact Support
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
