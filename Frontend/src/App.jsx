import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import Service from "./pages/Service";
import ExploreMenu from "./pages/ExploreMenu";
import { useContext } from "react";
import { ContextData } from "./context/UserContext";

function App() {
  const UserData = useContext(ContextData);

  console.log(UserData);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/done" element={<OrderDone />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Career />} />
          <Route path="/services" element={<Service />} />
          <Route path="/exploremenu" element={<ExploreMenu />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
