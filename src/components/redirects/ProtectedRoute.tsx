import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuth } from "@/hooks/useAuth";
import LoaderFade from "../LoaderFade";

const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useAuth();

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false); // Selesai loading setelah autentikasi dicek
    });

    return () => unsubscribe();
  }, [auth, setUser]);

  if (loading) return <LoaderFade />;

  return user ? <Outlet /> : <Navigate to="/sign-in" />; // Redirect ke login jika tidak ada user
};

export default ProtectedRoute;
