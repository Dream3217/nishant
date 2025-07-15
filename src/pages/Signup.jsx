import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase"; // ✅ import Firestore
import {
  auth,
  provider,
  signInWithPopup,
} from "../firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export { db };
export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    country: "India",
    updates: false,
    phone: "",
    otp: "",
  });

  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);

  useEffect(() => {
    if (!window.recaptchaVerifier && auth) {
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
            callback: () => {
              console.log("✅ Recaptcha verified");
            },
            "expired-callback": () => {
              console.warn("⚠️ Recaptcha expired");
            },
          },
          auth
        );

        window.recaptchaVerifier.render().then((widgetId) => {
          console.log("🔄 reCAPTCHA initialized with ID:", widgetId);
        });
      } catch (err) {
        console.error("❌ RecaptchaVerifier error:", err);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  const { email, password, username, country } = form;

  if (!email || !password || !username) {
    setError("All fields are required.");
  } else {
    setError("");
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCred.user;
      console.log("✅ Email signup:", user);

      // ✅ Save user to Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        username: username,
        country: country,
        role: "user", // default role
        createdAt: new Date()
      });

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  }
};


  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("✅ Google Sign-up:", result.user);
      navigate("/dashboard");
    } catch (err) {
      console.error("❌ Google Sign-up Error:", err);
      setError("Google sign-in failed.");
    }
  };

  const sendOTP = async () => {
    const { phone } = form;
    if (!/^\d{10}$/.test(phone)) return setError("Please enter a valid 10-digit phone number.");

    try {
      const appVerifier = window.recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(auth, "+91" + phone, appVerifier);
      setConfirmationResult(confirmation);
      setOtpSent(true);
      setError("");
      console.log("📲 OTP sent to", phone);
    } catch (err) {
      console.error("❌ OTP Error:", err);
      setError("Failed to send OTP: " + err.message);
    }
  };

  const verifyOTP = async () => {
    try {
      const result = await confirmationResult.confirm(form.otp);
      console.log("✅ Phone signup:", result.user);
      setError("");
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-6xl bg-white dark:bg-gray-800 rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden">
        <div className="w-full md:w-1/2 bg-black text-white px-8 py-12 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-4">Create your free account</h2>
            <p className="text-sm text-gray-300">Explore features with Email, Google, or Phone.</p>
            <Link to="#" className="text-sm mt-4 inline-block text-blue-400 hover:underline">
              See what’s included ▼
            </Link>
          </div>
          <img src="https://octodex.github.com/images/daftpunktocat-thomas.gif" alt="Octocat" className="w-40 mt-10" />
        </div>

        <div className="w-full md:w-1/2 p-10">
          <div className="text-right text-sm mb-4">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">Sign in →</Link>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Sign up to MyProject</h2>

          {error && <p className="text-red-500 bg-red-50 dark:bg-red-900 p-2 text-sm rounded">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="email" name="email" placeholder="Email" className="w-full px-4 py-3 rounded border dark:bg-gray-700 dark:text-white" value={form.email} onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" className="w-full px-4 py-3 rounded border dark:bg-gray-700 dark:text-white" value={form.password} onChange={handleChange} />
            <input type="text" name="username" placeholder="Username" className="w-full px-4 py-3 rounded border dark:bg-gray-700 dark:text-white" value={form.username} onChange={handleChange} />
            <select name="country" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 dark:text-white" value={form.country} onChange={handleChange}>
              <option value="India">India</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              {/* Add other countries if needed */}
            </select>

            <div className="flex gap-2">
              <input type="tel" name="phone" placeholder="Phone (10-digit)" className="flex-1 px-4 py-3 rounded border dark:bg-gray-700 dark:text-white" value={form.phone} onChange={handleChange} />
              <button type="button" onClick={sendOTP} className="bg-blue-600 hover:bg-blue-500 text-white px-4 rounded">Send OTP</button>
            </div>

            {otpSent && (
              <div className="flex gap-2">
                <input type="text" name="otp" placeholder="Enter OTP" className="flex-1 px-4 py-3 rounded border dark:bg-gray-700 dark:text-white" value={form.otp} onChange={handleChange} />
                <button type="button" onClick={verifyOTP} className="bg-green-600 hover:bg-green-500 text-white px-4 rounded">Verify OTP</button>
              </div>
            )}

            <label className="flex items-center text-sm text-gray-700 dark:text-gray-300">
              <input type="checkbox" name="updates" checked={form.updates} onChange={handleChange} className="accent-blue-600 mr-2" />
              Receive product updates
            </label>

            <button type="submit" className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded transition">Sign up with Email</button>

            <button type="button" onClick={handleGoogleSignup} className="w-full flex items-center justify-center gap-2 border py-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sign up with Google</span>
            </button>

            <p className="text-xs text-gray-500 text-center mt-3">
              By creating an account, you agree to the{' '}
              <Link to="#" className="text-blue-600 hover:underline">Terms</Link> and{' '}
              <Link to="#" className="text-blue-600 hover:underline">Privacy</Link>.
            </p>
          </form>

          <div id="recaptcha-container" />
        </div>
      </div>
    </div>
  );
}
