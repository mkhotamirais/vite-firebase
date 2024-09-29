import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AuthBtn() {
  const { user, setUser } = useAuth();
  const onLogout = () => {
    setUser(null);
    signOut(auth);
  };

  return (
    <div className="flex items-center gap-4">
      {user && (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={user?.photoURL ?? "https://github.com/shadcn.png"} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Account</DropdownMenuItem>
              <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}

      {!user && (
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
