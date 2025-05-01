import React, { useEffect, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [selected, setSelected] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser) {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCart(storedCart);
    }
  }, [loggedInUser]); // Chỉ chạy khi loggedInUser thay đổi

  // Chọn tất cả
  const handleCheckAll = (e) => {
    if (e.target.checked) {
      const allIds = cart.map((item) => item.id);
      setSelected(allIds);
    } else {
      setSelected([]);
    }
  };

  // Xử lý chọn checkbox
  const handleCheck = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Xóa sản phẩm khỏi giỏ
  const handleRemove = (index) => {
    const newCart = [...cart];
    const removedId = newCart[index].id;
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setSelected((prev) => prev.filter((id) => id !== removedId));
  };

  // Xử lý tăng/giảm số lượng
  const handleQuantityChange = (index, delta) => {
    const newCart = [...cart];
    newCart[index].quantity = Math.max(1, newCart[index].quantity + delta);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleProceedToCheckout = () => {
    if (selected.length === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm");
      return;
    }

    const selectedItems = cart
      .filter((item) => selected.includes(item.id))
      .map((item) => ({
        ...item,
        priceAfterDiscount: item.price * (1 - (item.discount || 0) / 100),
      }));

    // Lưu vào localStorage để tránh mất dữ liệu khi chuyển trang
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));

    // Chuyển hướng và gửi dữ liệu
    navigate("/pay", {
      state: { selectedItems },
      replace: true,
    });
  };

  return (
    <>
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
      {!loggedInUser ? (
        <div className="p-4 text-center">
          Vui lòng đăng nhập để xem giỏ hàng.
        </div>
      ) : cart.length === 0 ? (
        <div className="p-4 text-center">Giỏ hàng của bạn đang trống.</div>
      ) : (
        <div className="container py-4">
          <h3 className="mb-4">Giỏ hàng</h3>
          <table className="table align-middle">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selected.length === cart.length && cart.length > 0}
                    onChange={handleCheckAll}
                  />
                </th>
                <th>Ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Loại</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, idx) => (
                <tr key={item.id + (item.variant || "")}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selected.includes(item.id)}
                      onChange={() => handleCheck(item.id)}
                      style={{
                        cursor: "pointer",
                        position: "relative",
                        zIndex: 10,
                      }}
                    />
                  </td>
                  <td>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: 60,
                        height: 60,
                        objectFit: "cover",
                        borderRadius: 8,
                      }}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.variant}</td>
                  <td>
                    {item.discount ? (
                      <span>
                        <span style={{ color: "#e53935", fontWeight: 600 }}>
                          {(
                            item.price *
                            (1 - item.discount / 100)
                          ).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </span>
                        <span
                          style={{
                            textDecoration: "line-through",
                            color: "#888",
                            marginLeft: 8,
                          }}
                        >
                          {item.price.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </span>
                      </span>
                    ) : (
                      item.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-light btn-sm"
                      onClick={() => handleQuantityChange(idx, -1)}
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      className="btn btn-light btn-sm"
                      onClick={() => handleQuantityChange(idx, 1)}
                    >
                      +
                    </button>
                  </td>
                  <td style={{ fontWeight: 600, color: "#e53935" }}>
                    {(
                      item.price *
                      (1 - (item.discount || 0) / 100) *
                      item.quantity
                    ).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemove(idx)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Tổng số lượng và tổng tiền các sản phẩm đã chọn */}
          <div className="d-flex justify-content-end align-items-center mt-4 gap-5">
            <div>
              <b>Tổng số lượng đã chọn:</b>{" "}
              {cart
                .filter((item) => selected.includes(item.id))
                .reduce((sum, item) => sum + item.quantity, 0)}
            </div>
            <div>
              <b>Tổng tiền:</b>{" "}
              <span style={{ color: "#e53935", fontWeight: 600 }}>
                {cart
                  .filter((item) => selected.includes(item.id))
                  .reduce(
                    (sum, item) =>
                      sum +
                      item.quantity *
                        item.price *
                        (1 - (item.discount || 0) / 100),
                    0
                  )
                  .toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
              </span>
            </div>
            <button
              className="btn btn-success"
              disabled={selected.length === 0}
              style={{
                minWidth: "200px",
                backgroundColor: "#198754",
                border: "none",
              }}
              onClick={handleProceedToCheckout}
            >
              Tiến hành đặt hàng
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
