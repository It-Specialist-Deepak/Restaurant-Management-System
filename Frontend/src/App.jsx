import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Test from "./pages/Test";
import Unavailble from "./pages/Unavailble";
import DashboardLayout from "./layout/DashboardLayout"; // Assuming this is the correct path

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Home />} /> {/* Default nested route */}
          <Route path="test" element={<Test />} /> {/* Default nested route */}
         
        </Route>
        <Route path="*" element={<Unavailble />} />
      </Routes>
    </Router>
  );
};

export default App;
