import { navMenu } from "@/lib/nav-menu";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <div className="flex gap-4 items-center text-sm">
      {navMenu.map((item, i) => (
        <Link to={item.href} key={i}>
          {item.label}
        </Link>
      ))}
    </div>
  );
}
