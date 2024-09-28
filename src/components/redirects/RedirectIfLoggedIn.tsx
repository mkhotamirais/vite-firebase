import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuth } from "@/hooks/useAuth";
import LoaderFade from "../LoaderFade";

const RedirectIfLoggedIn = () => {
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useAuth();

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false); // Selesai loading
    });

    return () => unsubscribe();
  }, [auth, setUser]);

  if (loading) return <LoaderFade />;

  return user ? <Navigate to="/" /> : <Outlet />; // Redirect ke dashboard jika sudah login
};

export default RedirectIfLoggedIn;
