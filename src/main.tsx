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
import ProductCreate from "./pages/product/ProductCreate.tsx";
import ArticleCreate from "./pages/article/ArticleCreate.tsx";
import ArticleUpdate from "./pages/article/ArticleUpdate.tsx";
import Chat from "./pages/chat/Chat.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorBoundary />}>
      <Route index element={<Home />} />
      <Route element={<RedirectIfLoggedIn />}>
        <Route path="sign-in" element={<Login />} />
        <Route path="sign-up" element={<Register />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="article">
          <Route index element={<Article />} />
          <Route path="create" element={<ArticleCreate />} />
          <Route path="update/:id" element={<ArticleUpdate />} />
        </Route>
        <Route path="gallery" element={<Gallery />} />
        <Route path="product">
          <Route index element={<Product />} />
          <Route path="create" element={<ProductCreate />} />
        </Route>
        <Route path="chat" element={<Chat />} />
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
