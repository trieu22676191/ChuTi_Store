import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Login from "./components/Login";
import Repass from "./components/Repass";
import Footer from "./components/Footer";
import Home from "./pages/Home";

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
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
        <Home />
      </main>
      <Login
        show={showLogin}
        handleClose={() => setShowLogin(false)}
        onForgotPassword={handleShowRepass}
      />
      <Repass show={showRepass} handleClose={handleCloseRepass} />
      <Footer />
    </div>
  );
}

export default App;
