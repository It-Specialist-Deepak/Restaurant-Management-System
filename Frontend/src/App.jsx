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
import About from "./pages/other/About";
import Career from "./pages/Career";
import ExploreMenu from "./pages/ExploreMenu";
import CreateMenu from "./pages/CreateMenu";
import TableReservation from "./pages//other/TableReservation";
import Menu from "./pages/Menu";
// import Sapport from "./pages/Support2"; // Double-check this spelling
import UserDetails from "./pages/UserDetails";
import Admin from "./pages/Admin/Admin";
import Vacancies from "./pages/Vacancies";
import GetVacancies from "./pages/GetVacancies";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassLink from "./pages/ResetPassLink";
import Catering1 from "./pages/other/Catering1";
import Logout from "./pages/Logout";
import PostFeedback from "./pages/PostFeedback";
import GetFeedback from "./pages/GetFeedback";
import Staff from "./pages/Staff/Staff";
import Notification from "./pages/Notification";
import AcceptedOrder from "./pages/AcceptedOrder";
import UpdateMenu from "./pages/Admin/UpdateMenu";
import Testimonial from "./pages/other/Testimonial";
import SeasonalOffer from "./pages/SeasonalOffer";
import PhotoGallery from "./pages/PhotoGallery";
import LearnMore from "./pages/LearnMore";
import UpcomingEvent from "./pages/UpcomingEvent";
import WorkCulture from "./pages/WorkCulture";
import Support from "./pages/Support2";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = localStorage.getItem("token");
  return isAuthenticated || token ? children : <Navigate to="/login" replace />;
};

const AdminRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = localStorage.getItem("token");
  const userRole = useSelector((state) => state.auth.user?.role) || localStorage.getItem("role");

  if (!isAuthenticated && !token) return <Navigate to="/login" replace />;
  if (userRole !== "admin") return <Navigate to="/" replace />;
  return children;
};
const StaffRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = localStorage.getItem("token");
  const userRole = useSelector((state) => state.auth.user?.role) || localStorage.getItem("role");

  if (!isAuthenticated && !token) return <Navigate to="/login" replace />;
  if (userRole !== "staff" && userRole !== "admin") return <Navigate to="/" replace />;
  return children;
};
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<HomePage />} />
          <Route path="seasonal-offers" element={<SeasonalOffer />} />
          <Route path="gallery" element={<PhotoGallery />} />
          <Route path="learnmore" element={<LearnMore />} />
          <Route path="events" element={<UpcomingEvent />} />
          <Route path="workculture" element={<WorkCulture />} />
          <Route path="sapport" element={<Support />} />
          <Route path="registration" element={<Registration />} />
          <Route path="login" element={<Login />} />
          <Route path="faq" element={<Faqs />} />
          <Route path="about" element={<About />} />
          <Route path="logout" element={<Logout />} />
          <Route path="getfeedback" element={<GetFeedback />} />
          <Route path="postfeedback" element={<PostFeedback />} />
          <Route path="career" element={<Career />} />
          <Route path="catering" element={<Catering1 />} />
          <Route path="exploremenu" element={<ExploreMenu />} />
          <Route path="menu" element={<Menu />} />
          {/* <Route path="sapport" element={<Sapport />} /> */}
          <Route path="getvacancies" element={<GetVacancies />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassLink />} />
         
         <Route path= "testimonials" element={<Testimonial />} />
         <Route path= "about" element={<About />} />

          <Route path="notification" element={<Notification />} />
          {/* Protected Routes */}
          <Route path="cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="tablereservation" element={<ProtectedRoute><TableReservation /></ProtectedRoute>} />
          <Route path="userdetails" element={<ProtectedRoute><UserDetails /></ProtectedRoute>} />
          <Route path="orderdone" element={<ProtectedRoute><OrderDone /></ProtectedRoute>} />
          <Route path="acceptedorder" element={<ProtectedRoute><AcceptedOrder /></ProtectedRoute>} />
         {/* Admin Routes */}
          <Route path="admin" element={<AdminRoute><Admin /></AdminRoute>} />
          <Route path="vacancies" element={<AdminRoute><Vacancies /></AdminRoute>} />
          
      
          {/* Staff Routes */}
          <Route path="createmenu" element={<StaffRoute><CreateMenu /></StaffRoute>} />
          <Route path="staff" element={<StaffRoute><Staff /></StaffRoute>} />
          <Route path="update-menu" element={<StaffRoute><UpdateMenu/></StaffRoute>} />


          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
