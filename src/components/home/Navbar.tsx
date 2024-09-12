import { Link } from "react-router-dom";

const navMenu = [
  { href: "", label: "Our story" },
  { href: "", label: "Membership" },
  { href: "", label: "White" },
];

export function Navbar() {
  return (
    <div className="flex gap-6 items-center text-sm">
      {navMenu.map((item, i) => (
        <Link to={item.href} key={i}>
          {item.label}
        </Link>
      ))}
    </div>
  );
}
