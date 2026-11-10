import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import Signup from "./pages/auth/Signup";
import SignupConfirmation from "./pages/auth/SignupConfirmation";
import Login from "./pages/auth/Login";
import VerifyEmail from "./pages/auth/VerifyEmail";
import ForgetPassword from "./pages/auth/ForgetPassword";
import { Toaster } from "react-hot-toast";
import ResetPassword from "./pages/auth/ResetPassword";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import Contact from "./pages/contact/Contact";
import Header from "./components/Header/Header";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import Settings from "./pages/settings/Settings";
import GeneralSettings from "./pages/settings/GeneralSettings";
import UpdateProfile from "./pages/UpdateProfile";
import ChangePassword from "./pages/auth/ChangePassword";
import PostProperty from "./pages/properties/PostProperty";
import About from "./pages/about";
import Services from "./pages/Services";
import Faqs from "./pages/Faqs";
import PropertiesPage from "./pages/properties/PropertiesPage";
import PropertyDetails from "./pages/properties/PropertyDetails";
import BackToTop from "./components/BackToTop";
import Blogs from "./pages/blog/Blogs";
import BlogPost from "./pages/blog/BlogPost";

function App() {
  const [loading, setLoading] = useState(true);
  // const isLoggedIn = useState((state) => state.auth);
  const routes = [
    // Pages Routes
    { path: "/", element: <Home /> },
    { path: "/contact", element: <Contact /> },
    { path: "/post-property", element: <PostProperty /> },
    {
      path: "/settings",
      element: <Settings />,
      children: [
        { index: true, element: <GeneralSettings /> },
        { path: "general-settings", element: <GeneralSettings /> },
        { path: "profile", element: <UpdateProfile /> },
        { path: "change-password", element: <ChangePassword /> },
      ],
    },
    { path: "/*", element: <NotFound /> },
    { path: "/about-us", element: <About /> },
    { path: "/services", element: <Services /> },
    { path: "/faqs", element: <Faqs /> },
    { path: "/blogs", element: <Blogs /> },
    { path: "/blog/:id", element: <BlogPost /> },
    // { path: "/properties/:id", element: <PropertyDetails /> },
    // { path: "/properties/:category", element: <PropertiesPage /> },

    { path: "/properties", element: <PropertiesPage /> },
    { path: "/property/:id", element: <PropertyDetails /> },
    { path: "/properties/category/:category", element: <PropertiesPage /> },

    // Auth Routes
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/signup-confirmation", element: <SignupConfirmation /> },
    { path: "/verify-email/:token", element: <VerifyEmail /> },
    { path: "/forget-password", element: <ForgetPassword /> },
    { path: "/reset-password/:token", element: <ResetPassword /> },
  ];

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <>
      <ToastContainer />
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <Header />
        <Routes>
          {routes.map((route, i) => (
            <Route key={i} path={route.path} element={route.element}>
              {route.children &&
                route.children.map((child, j) => (
                  <Route
                    key={j}
                    index={child.index}
                    path={child.path}
                    element={child.element}
                  />
                ))}
            </Route>
          ))}
        </Routes>
        <Footer />
        <BackToTop />
      </BrowserRouter>
    </>
  );
}

export default App;
