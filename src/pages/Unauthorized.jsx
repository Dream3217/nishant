// src/pages/Unauthorized.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-10 text-center"
      >
        <h1 className="text-4xl font-bold text-red-600 mb-3">401 - Unauthorized</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          You don’t have permission to view this page. Please login or contact an admin.
        </p>

        <img
          src="https://octodex.github.com/images/shoptocat.png"
          alt="Unauthorized Octocat"
          className="mx-auto w-40 mb-6 rounded-md shadow"
        />

        <div className="flex justify-center gap-4">
          <Link
            to="/login"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded transition"
          >
            🔐 Login
          </Link>
          <Link
            to="/"
            className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded transition"
          >
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

