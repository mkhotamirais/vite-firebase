import { navMenu } from "@/lib/nav-menu";
import { Link } from "react-router-dom";
import AuthBtn from "./AuthBtn";
import { ModeToggle } from "../theme/ModeToggle";
import { useLocation } from "react-router-dom";

export default function DesktopNav() {
  const { pathname } = useLocation();
  const path1 = pathname.split("/")[1];

  return (
    <div className="hidden md:flex gap-4">
      <div className="flex gap-4 items-center text-sm">
        {navMenu.map((item, i) => (
          <Link
            to={item.href}
            key={i}
            className={`${
              path1 === item.href.split("/")[1] ? "text-primary" : ""
            } text-sm hover:text-primary transition`}
          >
            {item.label}
          </Link>
        ))}
      </div>
      <AuthBtn />
      <ModeToggle />
    </div>
  );
}
