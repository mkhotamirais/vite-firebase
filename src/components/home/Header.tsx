import { Link } from "react-router-dom";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

export default function Header() {
  return (
    <header className={`sticky top-0 h-16 transition duration-500 border-b`}>
      <div className="container flex items-center justify-between h-full">
        <div>
          <Logo />
        </div>
        <DesktopNav />
        <MobileNav />
      </div>
    </header>
  );
}

export const Logo = () => {
  return (
    <Link to="/" className="font-bold text-xl">
      VITE<span className="text-primary">FIREBASE</span>
    </Link>
  );
};
