import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";

export default function Admin() {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch logged-in user
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) setCurrentUser(u);
    });
    return () => unsub();
  }, []);

  // Fetch all users from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snapshot = await getDocs(collection(db, "users"));
        const usersList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const changeRole = async (id, currentRole) => {
    const newRole = currentRole === "user" ? "admin" : "user";

    if (currentUser?.uid === id) {
      setMessage("⚠️ You can't change your own role.");
      return;
    }

    try {
      await updateDoc(doc(db, "users", id), { role: newRole });
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
      );
      setMessage(`✅ Role updated to ${newRole} successfully.`);
    } catch (err) {
      console.error("Failed to change role:", err);
      setMessage("❌ Failed to update role.");
    }

    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">👑 Admin Panel</h1>
        <p className="text-gray-400 mb-4">
          Logged in as: <span className="font-semibold">{currentUser?.email}</span>
        </p>

        {message && (
          <div className="mb-6 text-sm text-yellow-400 font-medium">
            {message}
          </div>
        )}

        {loading ? (
          <div className="text-white">Loading users...</div>
        ) : (
          <div className="overflow-x-auto bg-gray-800 rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-4 text-left">User Management</h2>
            <table className="min-w-full text-sm table-auto text-left">
              <thead className="bg-gray-700 text-gray-300">
                <tr>
                  <th className="p-2">Username</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Role</th>
                  <th className="p-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr
                    key={u.id}
                    className={`border-b border-gray-600 hover:bg-gray-700 ${
                      currentUser?.uid === u.id ? "bg-gray-800 font-bold text-blue-400" : ""
                    }`}
                  >
                    <td className="p-2">{u.username || "N/A"}</td>
                    <td className="p-2">{u.email}</td>
                    <td className="p-2 capitalize">{u.role}</td>
                    <td className="p-2 text-center">
                      {currentUser?.uid === u.id ? (
                        <span className="text-xs text-gray-400">Your account</span>
                      ) : (
                        <button
                          onClick={() => changeRole(u.id, u.role)}
                          className="bg-yellow-500 text-black font-semibold py-1 px-3 rounded hover:bg-yellow-400"
                        >
                          Make {u.role === "user" ? "Admin" : "User"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Link
          to="/dashboard"
          className="inline-block mt-10 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-6 rounded"
        >
          🔙 Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
