import { Link } from "react-router-dom";
import { Navbar } from "./Navbar";
import { ModeToggle } from "../theme/ModeToggle";
import AuthBtn from "./AuthBtn";

export default function Header() {
  return (
    <header className={`sticky top-0 h-16 transition duration-500 border-b`}>
      <div className="container flex items-center justify-between h-full">
        <Link to="/" className="font-bold text-xl">
          LOGO
        </Link>
        <div className="flex gap-6">
          <Navbar />
          <AuthBtn />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
