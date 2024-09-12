import { Link } from "react-router-dom";
import { Container } from "../Wrapper";
import { Navbar } from "./Navbar";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

export default function Header() {
  const [scroll50, setScroll50] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScroll50(true);
      } else {
        setScroll50(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header className={`${scroll50 ? "bg-white" : "bg-orange-400"} sticky top-0 h-16 transition duration-500`}>
      <Container>
        <div className="flex items-center justify-between h-full">
          <Link to="/">Logo</Link>
          <div className="flex gap-8">
            <Navbar />
            <div className="">
              <Link to="/sign-in">Sign In</Link>
              <Button asChild className={`${scroll50 ? "bg-green-400" : "bg-slate-900"} rounded-full`}>
                <Link to="/sign-in">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
