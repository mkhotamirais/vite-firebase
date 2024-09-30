import HomeTools from "@/components/home-tools";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-center py-24">
      <div className="text-center flex flex-col space-y-4">
        <h1 className="text-3xl font-semibold">
          Welcome <br /> <span className="text-primary font-bold break-all">{user?.email}</span>
        </h1>
        <p className="pb-6">Vite buildtool with database and storage from firebase and hosted by vercel</p>
        <Button asChild className="self-center" size={"lg"}>
          <Link to="/product">Products</Link>
        </Button>
        <div>
          <HomeTools />
        </div>
      </div>
    </div>
  );
}
