import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-center py-8">
      <div className="text-center text-xl">
        Welcome <span className="text-primary font-semibold">{user?.email}</span>
      </div>
    </div>
  );
}
