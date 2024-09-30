import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="py-6 border-t">
      <div className="container flex items-center justify-center">
        <small>
          &copy; {new Date().getFullYear()}{" "}
          <Link to="https://tamionweb.vercel.app" className="text-primary hover:underline font-semibold">
            Tamionweb
          </Link>
        </small>
      </div>
    </footer>
  );
}
