import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate("/login");
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data());
        }
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-blue-900 to-indigo-900 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome{userData?.username ? `, ${userData.username}` : ""} 👋
        </h1>
        <p className="text-gray-300 mb-3">
          {userData?.email ? `📧 Email: ${userData.email}` : "Email not found"}
        </p>
        <p className="text-gray-300 mb-6">
          {userData?.role ? `🛡️ Role: ${userData.role}` : "Role not assigned"}
        </p>
        <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-6 rounded">
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-800">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          {[
            {
              title: "Live Collaboration",
              desc: "Work together in real time with your team.",
              icon: "💬",
            },
            {
              title: "Analytics Insights",
              desc: "Track performance with built-in analytics.",
              icon: "📊",
            },
            {
              title: "Secure Deployment",
              desc: "Built-in CI/CD tools for hassle-free launches.",
              icon: "🔐",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-700 p-6 rounded-xl hover:shadow-lg transition"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-indigo-800 to-gray-900">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          {[
            { label: "Projects Deployed", value: "2,450+" },
            { label: "Active Users", value: "18,000+" },
            { label: "Integrations", value: "150+" },
          ].map((stat, i) => (
            <div key={i}>
              <h2 className="text-3xl md:text-4xl font-bold text-yellow-400">
                {stat.value}
              </h2>
              <p className="text-gray-300 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-gray-800 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Explore More?</h2>
        <p className="text-gray-400 mb-6">
          Join thousands of developers already using our dashboard.
        </p>
        <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded">
          Go to Dashboard
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 text-center text-gray-400 text-sm border-t border-gray-700">
        &copy; {new Date().getFullYear()} YourProject. All rights reserved.
      </footer>
    </div>
  );
}


