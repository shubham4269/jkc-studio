import React, { useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import Footer from "../footer/footer";
import Header from "../header/header";
import CTA from "../CTA/CTA";
import AOS from "aos";
import "aos/dist/aos.css";

const Layout = () => {
  const location = useLocation();

  // Routes where Header & Footer should NOT appear
  const hideHeaderFooterRoutes = [
    "/login",
    "/dashboard",
    "/change-password",
  ];

  // Hide on all admin routes
  const isAdminRoute = location.pathname.startsWith("/admin");

  // Final condition
  const hideHeaderFooter =
    hideHeaderFooterRoutes.some((route) =>
      location.pathname.startsWith(route)
    ) || isAdminRoute;

  // 🔹 Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // 🔹 Init AOS (ONE TIME)
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: true,
      offset: 120,
    });
  }, []);

  // 🔹 Refresh AOS on route change (IMPORTANT)
  useEffect(() => {
    AOS.refresh();
  }, [location.pathname]);

  return (
    <>
      {!hideHeaderFooter && <Header />}

      <main>
        <Outlet />
        {!hideHeaderFooter && <CTA />}
      </main>

      {!hideHeaderFooter && <Footer />}
    </>
  );
};

export default Layout;
