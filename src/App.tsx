import "./App.css";
import { CustomNav, HomeMatt, ShopMatt, Login, Register } from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AccountVerificationPage from "./pages/AccountVerification";

function App() {
  return (
    <Router>
      <CustomNav />
      <Routes>
        <Route path="/" element={<HomeMatt />} />
        <Route path="/shop" element={<ShopMatt />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/accountverification"
          element={<AccountVerificationPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
