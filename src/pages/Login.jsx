import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import {
  auth,
  provider,
  signInWithPopup,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "", phone: "", otp: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(auth, form.email, form.password);
      console.log("✅ Logged in:", res.user);
      navigate("/dashboard");
    } catch {
      setError("Invalid email or password.");
    }
  };

 const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("✅ Google login:", user);

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        username: user.displayName || "",
        role: "user",
        createdAt: new Date(),
      });
    }

    navigate("/dashboard");
  } catch (err) {
    console.error("Google login error:", err);
    setError("Google login failed.");
  }
};

  const sendOTP = async () => {
    try {
      if (!/^\d{10}$/.test(form.phone)) {
        throw new Error("Please enter a valid 10-digit phone number.");
      }

      const phoneNumber = "+91" + form.phone;

      if (!window.recaptchaVerifier) {
        console.log("auth object:", auth);
        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
            callback: (response) => {
              console.log("reCAPTCHA verified:", response);
            },
            "expired-callback": () => {
              console.warn("reCAPTCHA expired");
            },
          },
          auth
        );

        await window.recaptchaVerifier.render();
      }

      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
      setConfirmationResult(confirmation);
      setOtpSent(true);
      setError("");
      console.log("📲 OTP sent");
    } catch (err) {
      console.error("OTP Error:", err);
      setError("Failed to send OTP: " + err.message);
    }
  };

  const verifyOTP = async () => {
    try {
      if (!confirmationResult) {
        throw new Error("OTP not requested yet.");
      }

      const result = await confirmationResult.confirm(form.otp);
      console.log("📞 OTP login success:", result.user);
      setError("");
      navigate("/dashboard");
    } catch (err) {
      console.error("OTP Verify Error:", err);
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl bg-white dark:bg-gray-800 shadow-xl rounded-2xl flex flex-col md:flex-row"
      >
        {/* Left Side Illustration */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 items-center justify-center p-8">
          <img
            src="https://undraw.io/illustration/undraw_code_typing_re_p8b9.svg"
            alt="Login Illustration"
            className="w-3/4 drop-shadow-lg"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8">
          <form onSubmit={handleEmailLogin} className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
                Welcome back
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Login with Email, Google, or Phone
              </p>
            </div>

            {error && (
              <p className="text-red-500 text-sm bg-red-50 dark:bg-red-900 p-2 rounded">
                {error}
              </p>
            )}

            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500"
              value={form.email}
              onChange={handleChange}
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500"
                value={form.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-3 text-indigo-600 dark:text-indigo-400"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="flex gap-2">
              <input
                type="tel"
                name="phone"
                placeholder="Phone (10-digit)"
                className="w-full px-4 py-3 border rounded dark:bg-gray-700 dark:text-white"
                value={form.phone}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={sendOTP}
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 rounded"
              >
                Send OTP
              </button>
            </div>

            {otpSent && (
              <div className="flex gap-2">
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  className="w-full px-4 py-3 border rounded dark:bg-gray-700 dark:text-white"
                  value={form.otp}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={verifyOTP}
                  className="bg-green-600 hover:bg-green-500 text-white px-4 rounded"
                >
                  Verify
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded"
            >
              Sign in with Email
            </button>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2 border py-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Sign in with Google
              </span>
            </button>

            <p className="text-sm text-center text-gray-600 dark:text-gray-400">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-indigo-600 hover:underline">
                Sign up
              </Link>
            </p>
          </form>

          {/* Invisible Recaptcha container */}
          <div id="recaptcha-container" />
        </div>
      </motion.div>
    </div>
  );
}

