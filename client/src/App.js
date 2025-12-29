import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Admin/Login";
import Dashboard from "./Admin/Dashboard";
import Leads from "./Admin/Leads";
import ServiceList from "./Admin/services/serviceList";
import Settings from "./Admin/Settings";
import AdminLayout from "./Admin/AdminLayout";
import ProtectedRoute from "./utils/ProtectedRoute";
import Home from "./pages/home";
import Layout from "./Components/layout/layout";
import ServiceHub from "./pages/services/servicehub";
import SingleService from "./pages/services/singleServices";
import PortfolioList from "./Admin/portfolio/portfolioList";
import PortfolioHub from "./pages/portfolio/porfolioHub";
import SinglePortfolio from "./pages/portfolio/singleportfolio";
import Process from "./pages/process/Process";
import About from "./pages/about";
import Contact from "./pages/contact";
import Terms from "./pages/terms";
import Privacy from "./pages/privacy";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC PAGES (with Header & Footer) */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServiceHub />} />
          <Route path="/services/:slug" element={<SingleService />} />
          <Route path="/portfolio" element={<PortfolioHub />} />
          <Route path="/portfolio/:slug" element={<SinglePortfolio />} />
          <Route path="/process" element={<Process />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />

        </Route>

        {/* LOGIN (no Header/Footer) */}
        <Route path="/login" element={<Login />} />

        {/* ADMIN ROUTES (protected parent layout, no Header/Footer) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="leads" element={<Leads />} />
          <Route path="services" element={<ServiceList />} />
          <Route path="portfolio" element={<PortfolioList />} />
          <Route path="settings" element={<Settings />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;


