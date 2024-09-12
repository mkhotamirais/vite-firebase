import { Outlet } from "react-router-dom";
import Header from "./components/home/Header";
import Footer from "./components/home/Footer";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
