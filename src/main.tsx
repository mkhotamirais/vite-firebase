import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import ErrorBoundary from "./pages/ErrorBoundary.tsx";
import Login from "./pages/auth/Login.tsx";
import Register from "./pages/auth/Register.tsx";
import { ThemeProvider } from "./components/theme/ThemeProvider.tsx";
import RedirectIfLoggedIn from "./components/redirects/RedirectIfLoggedIn.tsx";
import ProtectedRoute from "./components/redirects/ProtectedRoute.tsx";
import Article from "./pages/article/Article.tsx";
import Gallery from "./pages/gallery/Gallery.tsx";
import Product from "./pages/product/Product.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorBoundary />}>
      <Route index element={<Home />} />
      <Route element={<RedirectIfLoggedIn />}>
        <Route path="sign-in" element={<Login />} />
        <Route path="sign-up" element={<Register />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="article" element={<Article />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="product" element={<Product />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
