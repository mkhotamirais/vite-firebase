import { Outlet } from "react-router-dom";
import Header from "./components/home/Header";
import Footer from "./components/home/Footer";
import { Toaster } from "sonner";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Toaster richColors />
      <Header />
      <main className="grow container">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
