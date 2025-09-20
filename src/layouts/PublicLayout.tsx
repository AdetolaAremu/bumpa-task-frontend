import { Route, Routes, useLocation } from "react-router-dom";
import Products from "../public/Products";
import Navbar from "../components/Navbar";
import Cart from "../public/Cart";
import LoginPage from "../public/Login";
import PaymentConfirmation from "../public/PaymentConfirmation";

const PublicLayout = () => {
  // const location = useLocation();
  // const validRoutes = ["/", "/all-urls", "/statistics", "/documentation"];

  // const isShortCodePage =
  //   !validRoutes.includes(location.pathname) && location.pathname.length === 7;

  return (
    <div className="bg-blue-50 min-h-screen flex flex-col">
      <Navbar />
      {/* <div> - {isShortCodePage}</div> */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/payment-confirmation"
              element={<PaymentConfirmation />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default PublicLayout;
