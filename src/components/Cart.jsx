import React from "react";
import { Navbar, Nav } from "react-bootstrap"; // Import các thành phần cần thiết từ react-bootstrap

const Cart = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar expand="lg" className="custom-navbar">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            {[
              "DANH MỤC",
              "CHUTI DEALS",
              "HOT DEALS",
              "THƯƠNG HIỆU",
              "HÀNG MỚI VỀ",
              "BÁN CHẠY",
              "CLINIC & SPA",
              "DERMAHAIR",
            ].map((item, index) => (
              <Nav.Link key={index} href="#" className="custom-nav-link">
                {item}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Nội dung giỏ hàng */}
      <div className="container text-center mt-5">
        <h1>Giỏ hàng</h1>
        <p>Bạn chưa chọn sản phẩm.</p>
        <button
          className="btn btn-success"
          onClick={() => (window.location.href = "/")}
        >
          Tiếp tục mua sắm
        </button>
      </div>
    </div>
  );
};

export default Cart;
