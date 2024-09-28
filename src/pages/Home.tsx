import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { user } = useAuth();

  return <div className="">Welcome {user?.email}</div>;
}
