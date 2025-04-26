import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Repass from "./components/Repass";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ChinhSach from "./pages/ChinhSach";
import MyAccount from "./pages/MyAccount";
import Cart from "./components/Cart";
import PrivateRoute from "./context/PrivateRoute";
import GioiThieu from "./pages/GioiThieu";
import LienHe from "./pages/LienHe";
import DieuKhoan from "./pages/DieuKhoan";
import ProductDetail from "./pages/ProductDetail";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRepass, setShowRepass] = useState(false);

  const handleShowRepass = () => {
    setShowLogin(false);
    setShowRepass(true);
  };

  const handleCloseRepass = () => {
    setShowRepass(false);
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chinh-sach" element={<ChinhSach />} />
            <Route path="/my-account" element={<MyAccount />} />
            <Route path="/gioi-thieu" element={<GioiThieu />} />
            <Route path="/lien-he" element={<LienHe />} />
            <Route path="/dieu-khoan" element={<DieuKhoan />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </main>
        <Login
          show={showLogin}
          handleClose={() => setShowLogin(false)}
          onForgotPassword={handleShowRepass}
        />
        <Repass show={showRepass} handleClose={handleCloseRepass} />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
