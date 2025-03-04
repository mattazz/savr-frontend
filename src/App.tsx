import "./App.css";
import { CustomNav, HomeMatt, ShopMatt, Login, Register } from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AccountVerificationPage from "./pages/AccountVerification";
import RedirectIfLoggedIn from "./utils/redirector";
import { ProfilePage } from "./pages/ProfilePage";
import AuthenticatedRoute from "./utils/authchecker";
import TrackProductPage from "./pages/TrackProductPage";

function App() {
  return (
    <Router>
      <CustomNav />
      <Routes>
        <Route path="/" element={<HomeMatt />} />
        <Route path="/shop" element={<ShopMatt />} />
        <Route path="/track" element={<TrackProductPage />} />
        <Route
          path="/profile"
          element={
            <AuthenticatedRoute>
              <ProfilePage />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectIfLoggedIn>
              <Login />
            </RedirectIfLoggedIn>
          }
        />
        <Route
          path="/register"
          element={
            <RedirectIfLoggedIn>
              <Register />
            </RedirectIfLoggedIn>
          }
        />
        <Route
          path="/accountverification"
          element={<AccountVerificationPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
