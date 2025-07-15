import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function UserTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const userList = [];
        querySnapshot.forEach((doc) => {
          userList.push({ id: doc.id, ...doc.data() });
        });
        setUsers(userList);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="overflow-x-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-white">👥 Registered Users</h2>
      <table className="min-w-full text-sm text-left text-white border border-gray-600">
        <thead className="bg-gray-800 text-gray-300">
          <tr>
            <th className="py-2 px-4 border border-gray-600">Username</th>
            <th className="py-2 px-4 border border-gray-600">Email</th>
            <th className="py-2 px-4 border border-gray-600">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="hover:bg-gray-700 transition">
              <td className="py-2 px-4 border border-gray-600">{u.username || "N/A"}</td>
              <td className="py-2 px-4 border border-gray-600">{u.email}</td>
              <td className="py-2 px-4 border border-gray-600 capitalize">{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
