import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { addAccount } from "../data/Account";

const Signup = ({ show, handleClose, handleShowLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    fullName: "",
    gender: "",
    birthDate: {
      day: "",
      month: "",
      year: "",
    },
    agreements: {
      terms: false,
      privacy: false,
    },
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isValid = validateForm();
    setIsFormValid(isValid);
  }, [formData]);

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate email
    const emailRegex = /^[^\s@]+@gmail\.com$/;
    if (!formData.email) {
      newErrors.email = "Email không được trống";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
      isValid = false;
    }

    // Validate phone
    const phoneRegex = /^(03|08|09)\d{8}$/;
    if (!formData.phone) {
      newErrors.phone = "Số điện thoại không được trống";
      isValid = false;
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
      isValid = false;
    }

    // Validate password
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{6,32}$/;
    if (!formData.password) {
      newErrors.password = "Mật khẩu không được trống";
      isValid = false;
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = "Mật khẩu không hợp lệ";
      isValid = false;
    }

    // Validate fullName
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Họ tên không được trống";
      isValid = false;
    }

    // Validate gender
    if (!formData.gender) {
      newErrors.gender = "Giới tính không được trống";
      isValid = false;
    }

    // Validate birthDate
    const { day, month, year } = formData.birthDate;
    if (!day || !month || !year) {
      newErrors.birthDate = "Ngày tháng năm sinh không được trống";
      isValid = false;
    } else {
      const birthDate = new Date(year, month - 1, day);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 18) {
        newErrors.birthDate = "Bạn phải đủ 18 tuổi";
        isValid = false;
      }
    }

    // Validate agreements
    const { terms, privacy } = formData.agreements;
    if (!terms || !privacy) {
      newErrors.agreements = "Vui lòng đồng ý với tất cả điều khoản";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes("agreements.")) {
      // Xử lý checkbox agreements
      const agreementName = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        agreements: {
          ...prev.agreements,
          [agreementName]: checked,
        },
      }));
    } else if (name.includes("birthDate.")) {
      // Xử lý ngày tháng năm
      const datePart = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        birthDate: {
          ...prev.birthDate,
          [datePart]: value,
        },
      }));
    } else {
      // Xử lý các trường input thông thường
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAccount = {
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      fullName: formData.fullName,
      gender: formData.gender,
      // Lưu trực tiếp ngày tháng năm
      birthDay: formData.birthDate.day,
      birthMonth: formData.birthDate.month,
      birthYear: formData.birthDate.year,
      agreements: formData.agreements,
    };

    // Lưu vào accounts
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    accounts.push(newAccount);
    localStorage.setItem("accounts", JSON.stringify(accounts));

    // Hiển thị thông báo thành công
    alert("Đăng ký thành công!");

    // Reset form và đóng modal
    setFormData({
      email: "",
      phone: "",
      password: "",
      fullName: "",
      gender: "",
      birthDate: {
        day: "",
        month: "",
        year: "",
      },
      agreements: {
        terms: false,
        privacy: false,
      },
    });
    handleClose();
  };

  // Thêm hàm xử lý chuyển đổi modal
  const switchToLogin = (e) => {
    e.preventDefault();
    handleClose(); // Đóng modal signup
    handleShowLogin(); // Mở modal login
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Đăng ký tài khoản</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            {errors.email && (
              <Form.Text className="text-danger d-block mb-1">
                {errors.email}
              </Form.Text>
            )}
            <Form.Control
              type="email"
              placeholder="Nhập email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            {errors.phone && (
              <Form.Text className="text-danger d-block mb-1">
                {errors.phone}
              </Form.Text>
            )}
            <Form.Control
              type="text"
              placeholder="Nhập số điện thoại"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              isInvalid={!!errors.phone}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            {errors.password && (
              <Form.Text className="text-danger d-block mb-1">
                {errors.password}
              </Form.Text>
            )}
            <Form.Control
              type="password"
              placeholder="Nhập mật khẩu từ 6-32 ký tự"
              name="password"
              value={formData.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            {errors.fullName && (
              <Form.Text className="text-danger d-block mb-1">
                {errors.fullName}
              </Form.Text>
            )}
            <Form.Control
              type="text"
              placeholder="Họ tên"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              isInvalid={!!errors.fullName}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            {errors.gender && (
              <Form.Text className="text-danger d-block mb-1">
                {errors.gender}
              </Form.Text>
            )}
            <div className="d-flex gap-3">
              <Form.Check
                type="radio"
                name="gender"
                label="Không xác định"
                value="Không xác định"
                checked={formData.gender === "Không xác định"}
                onChange={handleChange}
              />
              <Form.Check
                type="radio"
                name="gender"
                label="Nam"
                value="Nam"
                checked={formData.gender === "Nam"}
                onChange={handleChange}
              />
              <Form.Check
                type="radio"
                name="gender"
                label="Nữ"
                value="Nữ"
                checked={formData.gender === "Nữ"}
                onChange={handleChange}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            {errors.birthDate && (
              <Form.Text className="text-danger d-block mb-1">
                {errors.birthDate}
              </Form.Text>
            )}
            <div className="d-flex justify-content-center align-items-center gap-2">
              <Form.Select
                style={{ width: "30%" }}
                name="birthDate.day"
                value={formData.birthDate.day}
                onChange={handleChange}
              >
                <option value="">Ngày</option>
                {[...Array(31)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </Form.Select>

              <Form.Select
                style={{ width: "30%" }}
                name="birthDate.month"
                value={formData.birthDate.month}
                onChange={handleChange}
              >
                <option value="">Tháng</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Tháng {i + 1}
                  </option>
                ))}
              </Form.Select>

              <Form.Select
                style={{ width: "30%" }}
                name="birthDate.year"
                value={formData.birthDate.year}
                onChange={handleChange}
              >
                <option value="">Năm</option>
                {[...Array(100)].map((_, i) => {
                  const year = new Date().getFullYear() - i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </Form.Select>
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            {errors.agreements && (
              <Form.Text className="text-danger d-block mb-1">
                {errors.agreements}
              </Form.Text>
            )}
            <Form.Check
              type="checkbox"
              name="agreements.terms"
              checked={formData.agreements.terms}
              onChange={handleChange}
              label="Tôi đã đọc và đồng ý với điều khoản"
            />
            <Form.Check
              type="checkbox"
              name="agreements.privacy"
              checked={formData.agreements.privacy}
              onChange={handleChange}
              label="Đồng ý với chính sách bảo mật"
            />
          </Form.Group>

          <Button
            variant="success"
            type="submit"
            className="w-100 py-2 mb-3"
            disabled={!isFormValid}
          >
            Đăng ký
          </Button>

          <div className="text-center mb-3">
            <span>Bạn đã có tài khoản? </span>
            <a
              href="#"
              className="text-decoration-none text-success"
              onClick={switchToLogin}
            >
              ĐĂNG NHẬP NGAY
            </a>
          </div>

          <div className="text-center mb-2">
            <span>Hoặc đăng nhập với</span>
          </div>

          <div className="d-flex gap-2">
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
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Signup;
