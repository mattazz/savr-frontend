import "./App.css";
import { CustomNav, ShopMatt, Login, Register, HomeMatt } from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AccountVerificationPage from "./pages/AccountVerification";
import { ProfilePage } from "./pages/ProfilePage";
import AuthenticatedRoute from "./utils/authchecker";
import TrackProductPage from "./pages/TrackProductPage";
import TrackProductRedirect from "./pages/TrackProductRedirect";
import ProductDetailsPage from "./pages/TrackedProductDetail";
import NotFound from "./pages/NotFound";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <Router>
      <Toaster />
      <CustomNav />
      <Routes>
        <Route path="/" element={<HomeMatt />} />
        <Route path="/shop" element={<ShopMatt />} />
        <Route
          path="/track"
          element={
            <AuthenticatedRoute>
              <TrackProductPage />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <AuthenticatedRoute>
              <ProfilePage />
            </AuthenticatedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/accountverification"
          element={<AccountVerificationPage />}
        />
        <Route path="/productdetail" element={<ProductDetailsPage />} />

        {/* NOTE: even though the route below is not wrapped with route protecter, its a protected route. it has its own custom protection logic:)*/}
        <Route path="/saveme/*" element={<TrackProductRedirect />} />

        {/* 404 Route - This should be the last route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
