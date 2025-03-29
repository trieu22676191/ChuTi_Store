import React, { useState } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { checkLogin } from "../data/Account";
import Repass from "./Repass";
import { useNavigate } from "react-router-dom";

const Login = ({
  show,
  handleClose,
  handleShowSignup,
  onLoginSuccess,
  onForgotPassword,
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });
  const [error, setError] = useState({
    emailOrPhone: "",
    password: "",
    general: "",
  });
  const [success, setSuccess] = useState("");
  const [showRepass, setShowRepass] = useState(false);

  const validateIdentifier = (value) => {
    // Kiểm tra email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Kiểm tra số điện thoại (bắt đầu bằng 0, có 10 số)
    const phoneRegex = /^0\d{9}$/;

    if (!value) {
      return "Vui lòng nhập email hoặc số điện thoại";
    }
    if (!emailRegex.test(value) && !phoneRegex.test(value)) {
      return "Email hoặc số điện thoại không hợp lệ";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Xóa thông báo lỗi khi người dùng bắt đầu nhập
    setError({
      ...error,
      [name]: "",
      general: "",
    });
    setSuccess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    try {
      const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
      const account = accounts.find(
        (acc) =>
          (acc.email === formData.emailOrPhone ||
            acc.phone === formData.emailOrPhone) &&
          acc.password === formData.password
      );

      if (account) {
        // Kiểm tra và thêm các trường ngày tháng năm nếu chưa có
        const updatedAccount = {
          ...account,
          birthDay: account.birthDay || "",
          birthMonth: account.birthMonth || "",
          birthYear: account.birthYear || "",
          fullName: account.fullName || "",
          gender: account.gender || "",
          marketing: account.marketing || false,
          avatar: account.avatar || null,
        };

        // Cập nhật lại account trong mảng accounts
        const updatedAccounts = accounts.map((acc) => {
          if (acc.email === account.email || acc.phone === account.phone) {
            return updatedAccount;
          }
          return acc;
        });

        // Lưu lại vào localStorage
        localStorage.setItem("accounts", JSON.stringify(updatedAccounts));
        localStorage.setItem("loggedInUser", JSON.stringify(updatedAccount));

        // Gọi callback để cập nhật header
        onLoginSuccess && onLoginSuccess(updatedAccount);
        handleClose();
      } else {
        setError("Email/Số điện thoại hoặc mật khẩu không đúng");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      setError("Có lỗi xảy ra khi đăng nhập");
    }
  };

  const handleSwitchToSignup = () => {
    handleClose();
    handleShowSignup();
  };

  const handleShowRepass = (e) => {
    e.preventDefault();
    handleClose();
    setShowRepass(true);
  };

  const handleCloseRepass = () => {
    setShowRepass(false);
    handleClose();
  };

  const handleForgotClick = (e) => {
    e.preventDefault();
    onForgotPassword();
  };

  return (
    <>
      <Modal show={show && !showRepass} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Đăng nhập</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error.general && (
            <Alert variant="danger" className="mb-3">
              {error.general}
            </Alert>
          )}
          {success && (
            <Alert variant="success" className="mb-3">
              {success}
            </Alert>
          )}

          <div className="d-flex gap-2 mb-4">
            <Button
              variant="primary"
              className="w-50 d-flex align-items-center justify-content-center gap-2"
            >
              <FaFacebook />
              Facebook
            </Button>
            <Button
              variant="danger"
              className="w-50 d-flex align-items-center justify-content-center gap-2"
            >
              <FaGoogle />
              Google +
            </Button>
          </div>

          <div className="text-center mb-4">
            <span>Hoặc đăng nhập với Tài khoản của bạn</span>
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              {error.emailOrPhone && (
                <Form.Text className="text-danger mb-1 d-block">
                  {error.emailOrPhone}
                </Form.Text>
              )}
              <Form.Control
                type="text"
                placeholder="Email hoặc số điện thoại"
                name="emailOrPhone"
                value={formData.emailOrPhone}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              {error.password && (
                <Form.Text className="text-danger mb-1 d-block">
                  {error.password}
                </Form.Text>
              )}
              <Form.Control
                type="password"
                placeholder="Mật khẩu"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <Form.Check type="checkbox" label="Nhớ mật khẩu" />
              <a
                href="#"
                className="text-decoration-none text-success"
                onClick={handleShowRepass}
              >
                Quên mật khẩu
              </a>
            </div>

            <Button variant="success" type="submit" className="w-100 py-2 mb-3">
              Đăng nhập
            </Button>

            <div className="text-center">
              <span>Bạn chưa có tài khoản? </span>
              <a
                href="#"
                className="text-decoration-none text-success"
                onClick={handleSwitchToSignup}
              >
                ĐĂNG KÝ NGAY
              </a>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <Repass show={showRepass} handleClose={handleCloseRepass} />
    </>
  );
};

export default Login;
