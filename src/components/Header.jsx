import React from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Container,
  Button,
} from "react-bootstrap";
import {
  FaUser,
  FaStore,
  FaPhone,
  FaShoppingCart,
  FaSearch,
} from "react-icons/fa";
import logo from "../img/logo.png";

const Header = () => {
  return (
    <Navbar bg="success" variant="dark" expand="lg" className="py-3">
      <Container>
        {/* Logo */}
        <Navbar.Brand href="#" className="d-flex align-items-center">
          <img
            src={logo}
            alt="Logo"
            width="50"
            height="50"
            className="d-inline-block align-top"
          />
          <div className="ms-2">
            <span className="fw-bold fs-4">CHUTI</span>
            <div className="text-white" style={{ fontSize: "14px" }}>
              Chất lượng - Uy tín
            </div>
          </div>
        </Navbar.Brand>

        {/* Toggle Button */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse
          id="basic-navbar-nav"
          className="d-flex flex-row justify-content-between align-items-center"
        >
          {/* Thanh tìm kiếm */}
          <Form
            className="d-flex mx-auto position-relative"
            style={{ width: "40%" }}
          >
            <FormControl
              type="search"
              placeholder="Tìm sản phẩm, thương hiệu bạn mong muốn..."
              aria-label="Search"
              className="pe-5"
              style={{
                padding: "10px",
                borderRadius: "20px",
                border: "1px solid #ccc",
                fontSize: "14px",
              }}
            />
            <Button
              variant="light"
              className="position-absolute top-50 end-0 translate-middle-y me-2 border-0 bg-transparent"
              style={{ zIndex: 10 }}
            >
              <FaSearch className="text-secondary" />
            </Button>
          </Form>

          {/* Các icon điều hướng */}
          <Nav className="d-flex align-items-center gap-4 flex-row">
            <Nav.Link
              href="#login"
              className="text-white d-flex align-items-center gap-2 text-nowrap"
            >
              <div
                className="border border-light rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: "40px",
                  height: "40px",
                }}
              >
                <FaUser size={20} />
              </div>
              <span>Đăng nhập / Đăng ký</span>
            </Nav.Link>
            <Nav.Link
              href="#store"
              className="text-white d-flex align-items-center gap-2 text-nowrap"
            >
              <div
                className="border border-light rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: "40px",
                  height: "40px",
                }}
              >
                <FaStore size={20} />
              </div>
              <span>Hệ thống cửa hàng</span>
            </Nav.Link>
            <Nav.Link
              href="#support"
              className="text-white d-flex align-items-center gap-2 text-nowrap"
            >
              <div
                className="border border-light rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: "40px",
                  height: "40px",
                }}
              >
                <FaPhone size={20} />
              </div>
              <span>Hỗ trợ khách hàng</span>
            </Nav.Link>
            <Nav.Link
              href="#cart"
              className="text-white d-flex align-items-center gap-2 text-nowrap position-relative"
            >
              <div
                className="border border-light rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: "40px",
                  height: "40px",
                }}
              >
                <FaShoppingCart size={20} />
              </div>
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: "12px" }}
              >
                0
              </span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
