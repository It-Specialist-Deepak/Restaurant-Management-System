import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DashboardLayout from "./layout/DashboardLayout";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import OrderDone from "./pages/OrderDone";
import Faqs from "./pages/Faqs";
import About from "./pages/About";
import Career from "./pages/Career";
import Services from "./pages/Services";
import ExploreMenu from "./pages/ExploreMenu";
import CreateMenu from "./pages/CreateMenu";

// 🔹 Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          
          {/* 🔒 Protect Cart Page */}
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />

          <Route path="/done" element={<OrderDone />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Career />} />
          <Route path="/services" element={<Services />} />
          <Route path="/exploremenu" element={<ExploreMenu />} />
          <Route path="/createmenu" element={<CreateMenu />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
