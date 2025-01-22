import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Unavailble from "./pages/unavailble/Unavailble";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<Unavailble />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
