import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function ProtectedRoute({ children, allowedRoles }) {
  const [loading, setLoading] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/login");
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const role = userDoc.data().role || "user";
          if (allowedRoles.includes(role)) {
            setIsAllowed(true);
          } else {
            navigate("/unauthorized"); // You can customize this page
          }
        } else {
          navigate("/login");
        }
      } catch (err) {
        console.error("Error checking role:", err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate, allowedRoles]);

  if (loading) return <div className="p-10 text-center">🔒 Checking access...</div>;

  return isAllowed ? children : null;
}
