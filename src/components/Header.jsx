import React, { useState, useEffect, useRef } from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Container,
  Button,
  Dropdown,
  Image,
} from "react-bootstrap";
import {
  FaUser,
  FaStore,
  FaPhone,
  FaSearch,
  FaSignOutAlt,
  FaHeart,
  FaMapMarkerAlt,
  FaClipboardList,
  FaShoppingCart,
} from "react-icons/fa";
import Login from "./Login";
import Signup from "./Signup";
import Address from "./Address";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { cartCount } = useCart();

  const handleShowLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowSignup = () => setShowSignup(true);
  const handleCloseSignup = () => setShowSignup(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(loggedInUser));
    }
  }, []);

  const handleLoginSuccess = (account) => {
    setIsLoggedIn(true);
    setUserData(account);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setIsLoggedIn(false);
    setUserData(null);
    navigate("/");
  };

  const handleAccountClick = () => {
    if (!userData) {
      handleShowLogin();
      return;
    }
    navigate("/my-account");
  };

  // Thêm vào sau các handle functions khác
  const handleOrderClick = () => {
    navigate("/my-order");
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Kích thước file không được vượt quá 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const newAvatar = e.target.result;

        const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
        const updatedAccounts = accounts.map((acc) => {
          if (acc.email === userData.email || acc.phone === userData.phone) {
            return { ...acc, avatar: newAvatar };
          }
          return acc;
        });

        localStorage.setItem("accounts", JSON.stringify(updatedAccounts));
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ ...userData, avatar: newAvatar })
        );

        setUserData((prev) => ({ ...prev, avatar: newAvatar }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCartClick = () => {
    navigate("/cart"); // Điều hướng đến trang giỏ hàng
  };

  // Thêm hàm xử lý chuyển trang address
  const handleAddressClick = () => {
    navigate("/address");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search?q=${encodeURIComponent(keyword.trim())}`);
      setKeyword("");
    }
  };

  return (
    <>
      <Navbar bg="success" variant="dark" expand="lg" className="py-2">
        <Container>
          <Navbar.Brand
            as={Link}
            to="/"
            className="d-flex align-items-center ps-0"
            style={{ width: "12%" }}
          >
            <img
              src="/img/logo.png"
              alt="Logo"
              width="45"
              height="45"
              className="d-inline-block align-top rounded-circle"
              style={{
                border: "2px solid white",
                padding: "2px",
              }}
            />
            <div className="ms-2">
              <span className="fw-bold" style={{ fontSize: "20px" }}>
                CHUTI
              </span>
              <div className="text-white" style={{ fontSize: "12px" }}>
                Chất lượng - Uy tín
              </div>
            </div>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Form
              className="d-flex position-relative mx-4"
              style={{ width: "60%" }}
              onSubmit={handleSearch}
            >
              <FormControl
                type="search"
                placeholder="Tìm sản phẩm, thương hiệu bạn mong muốn..."
                aria-label="Search"
                className="w-100"
                style={{
                  height: "42px",
                  borderRadius: "25px",
                  border: "none",
                  paddingLeft: "20px",
                  paddingRight: "50px",
                  fontSize: "14px",
                  boxShadow: "none",
                }}
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Button
                variant="light"
                className="position-absolute top-50 end-0 translate-middle-y me-3 border-0 bg-transparent"
                style={{ zIndex: 10 }}
                type="submit"
              >
                <FaSearch className="text-secondary" size={18} />
              </Button>
            </Form>

            <Nav className="d-flex align-items-center gap-3">
              {isLoggedIn ? (
                <Dropdown>
                  <Dropdown.Toggle
                    variant="success"
                    id="dropdown-basic"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "8px 16px",
                      height: "40px", // Cố định chiều cao
                    }}
                  >
                    <div
                      style={{
                        width: "24px",
                        height: "24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {isLoggedIn && userData?.avatar ? (
                        <Image
                          src={userData.avatar}
                          roundedCircle
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <FaUser size={16} />
                      )}
                    </div>
                    <span
                      style={{
                        lineHeight: "24px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {isLoggedIn
                        ? `${userData?.fullName || "bạn"}`
                        : "Tài khoản"}
                    </span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <div className="px-3 py-2 text-center">
                      <div
                        style={{
                          width: "80px",
                          height: "80px",
                          margin: "0 auto",
                          position: "relative",
                          cursor: "pointer",
                        }}
                        onClick={() => fileInputRef.current.click()}
                      >
                        {userData?.avatar ? (
                          <Image
                            src={userData.avatar}
                            roundedCircle
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <div
                            className="bg-light rounded-circle d-flex align-items-center justify-content-center"
                            style={{ width: "100%", height: "100%" }}
                          >
                            <FaUser size={40} />
                          </div>
                        )}
                      </div>
                      <small className="text-muted d-block mt-2">
                        Nhấp để thay đổi ảnh
                      </small>
                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={handleFileSelect}
                      />
                    </div>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleAccountClick}>
                      <FaUser className="me-2" />
                      Tài khoản của bạn
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleOrderClick}>
                      <FaClipboardList className="me-2" />
                      Quản lý đơn hàng
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <FaHeart className="me-2" />
                      Sản phẩm yêu thích
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleAddressClick}>
                      {" "}
                      {/* Thay đổi ở đây */}
                      <FaMapMarkerAlt className="me-2" />
                      Địa chỉ giao hàng
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>
                      <FaSignOutAlt className="me-2" />
                      Thoát
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Nav.Link
                  onClick={handleShowLogin}
                  className="text-white d-flex align-items-center gap-2 text-nowrap"
                >
                  <div
                    className="border border-light rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: "35px", height: "35px" }}
                  >
                    <FaUser size={16} />
                  </div>
                  <span style={{ fontSize: "14px" }}>Đăng nhập / Đăng ký</span>
                </Nav.Link>
              )}
              <Nav.Link
                as={Link}
                to="/brand"
                className="text-white d-flex align-items-center gap-2 text-nowrap"
              >
                <div
                  className="border border-light rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: "35px", height: "35px" }}
                >
                  <FaStore size={16} />
                </div>
                <span style={{ fontSize: "14px" }}>Thương hiệu</span>
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/support"
                className="text-white d-flex align-items-center gap-2 text-nowrap"
              >
                <div
                  className="border border-light rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: "35px", height: "35px" }}
                >
                  <FaPhone size={16} />
                </div>
                <span style={{ fontSize: "14px" }}>Hỗ trợ khách hàng</span>
              </Nav.Link>
              <Nav.Link
                onClick={handleCartClick}
                className="text-white d-flex align-items-center gap-2 text-nowrap position-relative"
              >
                <div className="cart-icon position-relative">
                  <div
                    className="border border-light rounded-circle d-flex align-items-center justify-content-center position-relative"
                    style={{ width: "35px", height: "35px" }}
                  >
                    <FaShoppingCart size={18} />
                    {isLoggedIn && cartCount > 0 && (
                      <span
                        className="position-absolute bg-warning text-dark rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                          width: "20px",
                          height: "20px",
                          top: "-8px",
                          right: "-8px",
                          fontSize: "13px",
                          fontWeight: "bold",
                          border: "2px solid #218c5a",
                          boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                        }}
                      >
                        {cartCount}
                      </span>
                    )}
                  </div>
                </div>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Login
        show={showLogin}
        handleClose={handleCloseLogin}
        handleShowSignup={() => {
          handleCloseLogin();
          handleShowSignup();
        }}
        onLoginSuccess={handleLoginSuccess}
      />

      <Signup
        show={showSignup}
        handleClose={handleCloseSignup}
        handleShowLogin={() => {
          handleCloseSignup();
          handleShowLogin();
        }}
      />
    </>
  );
};

export default Header;
