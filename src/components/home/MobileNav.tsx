import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "./Header";
import { Menu } from "lucide-react";
import { navMenu } from "@/lib/nav-menu";
import { Link, useLocation } from "react-router-dom";
import { ModeToggle } from "../theme/ModeToggle";
import AuthBtn from "./AuthBtn";

export default function MobileNav() {
  const { pathname } = useLocation();
  const path1 = pathname.split("/")[1];

  return (
    <div className="flex md:hidden">
      <Sheet>
        <SheetTrigger>
          <Menu className="text-primary size-7" />
        </SheetTrigger>
        <SheetContent className="border-none bg-primary/20">
          <SheetHeader>
            <SheetTitle>
              <Logo />
            </SheetTitle>
            <SheetDescription className="hidden">
              This action cannot be undone. This will permanently delete your account and remove your data from our
              servers.
            </SheetDescription>

            <div className="flex justify-between">
              <ModeToggle />
              <AuthBtn />
            </div>
            <div className="flex flex-col pt-6">
              {navMenu.map((item, i) => (
                <SheetClose key={i} asChild>
                  <Link
                    to={item.href}
                    key={i}
                    className={`${
                      path1 === item.href.split("/")[1] ? "text-primary" : ""
                    } block py-3 text-sm hover:text-primary transition`}
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              ))}
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
