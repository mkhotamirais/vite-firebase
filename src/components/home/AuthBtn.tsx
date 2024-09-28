import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";

export default function AuthBtn() {
  const { user: isAuth, setUser } = useAuth();
  // const isAuth = auth?.currentUser;

  return (
    <div className="flex items-center gap-4">
      {isAuth && (
        <Button
          onClick={() => {
            setUser(null);
            signOut(auth);
          }}
        >
          Logout
        </Button>
      )}

      {!isAuth && (
        <div className="flex gap-2">
          <Button asChild variant={"link"}>
            <Link to="/sign-in">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/sign-up">Register</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
