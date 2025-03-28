import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Container,
  Button,
  Dropdown,
} from "react-bootstrap";
import {
  FaUser,
  FaStore,
  FaPhone,
  FaShoppingCart,
  FaSearch,
  FaSignOutAlt,
  FaHeart,
  FaMapMarkerAlt,
  FaClipboardList,
} from "react-icons/fa";
import logo from "../img/logo.png";
import Login from "./Login";
import Signup from "./Signup";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleShowLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowSignup = () => setShowSignup(true);
  const handleCloseSignup = () => setShowSignup(false);

  const handleLoginSuccess = (user) => {
    setLoggedInUser(user);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <>
      <Navbar bg="success" variant="dark" expand="lg" className="py-2">
        <Container>
          <Navbar.Brand
            href="#"
            className="d-flex align-items-center ps-0"
            style={{ width: "12%" }}
          >
            <img
              src={logo}
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
              />
              <Button
                variant="light"
                className="position-absolute top-50 end-0 translate-middle-y me-3 border-0 bg-transparent"
                style={{ zIndex: 10 }}
              >
                <FaSearch className="text-secondary" size={18} />
              </Button>
            </Form>

            <Nav className="d-flex align-items-center gap-3">
              {loggedInUser ? (
                <Dropdown>
                  <Dropdown.Toggle
                    variant="success"
                    className="d-flex align-items-center gap-2 border-0"
                  >
                    <div
                      className="border border-light rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: "35px", height: "35px" }}
                    >
                      <FaUser size={16} />
                    </div>
                    <span style={{ fontSize: "14px" }}>
                      Chào {loggedInUser.fullName}
                    </span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#">
                      <FaUser className="me-2" />
                      Tài khoản của bạn
                    </Dropdown.Item>
                    <Dropdown.Item href="#">
                      <FaClipboardList className="me-2" />
                      Quản lý đơn hàng
                    </Dropdown.Item>
                    <Dropdown.Item href="#">
                      <FaHeart className="me-2" />
                      Sản phẩm yêu thích
                    </Dropdown.Item>
                    <Dropdown.Item href="#">
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
                href="#store"
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
                href="#support"
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
                href="#cart"
                className="text-white d-flex align-items-center gap-2 text-nowrap position-relative"
              >
                <div
                  className="border border-light rounded-circle d-flex align-items-center justify-content-center position-relative"
                  style={{ width: "35px", height: "35px" }}
                >
                  <FaShoppingCart size={16} />
                  <div
                    className="position-absolute d-flex align-items-center justify-content-center bg-warning text-dark rounded-circle"
                    style={{
                      width: "18px",
                      height: "18px",
                      top: "-6px",
                      right: "-6px",
                      fontSize: "11px",
                      fontWeight: "bold",
                    }}
                  >
                    0
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
        handleShowSignup={handleShowSignup}
        onLoginSuccess={handleLoginSuccess}
      />

      <Signup show={showSignup} handleClose={handleCloseSignup} />
    </>
  );
};

export default Header;
