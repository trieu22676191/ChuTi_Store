import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaFacebook,
  FaGoogle,
} from "react-icons/fa";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const MyAccount = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [userData, setUserData] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const fileInputRef = useRef(null);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [newPhone, setNewPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Kích thước file không được vượt quá 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target.result);
        setUserData((prev) => ({
          ...prev,
          avatar: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    console.log("Đang load dữ liệu từ localStorage...");

    try {
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
      console.log("Thông tin đăng nhập:", loggedInUser);

      if (!loggedInUser) {
        console.log("Chưa đăng nhập");
        navigate("/");
        return;
      }

      const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
      const userAccount = accounts.find(
        (acc) =>
          acc.email === loggedInUser.email || acc.phone === loggedInUser.phone
      );

      if (userAccount) {
        console.log("Tìm thấy tài khoản:", userAccount);

        setUserData({
          email: userAccount.email || "",
          fullName: userAccount.fullName || "",
          gender: userAccount.gender || "",
          phone: userAccount.phone || "",
          birthDay: userAccount.birthDay || "",
          birthMonth: userAccount.birthMonth || "",
          birthYear: userAccount.birthYear || "",
          marketing: userAccount.marketing || false,
          avatar: userAccount.avatar || null,
        });

        // Set avatar riêng
        if (userAccount.avatar) {
          console.log("Đã tìm thấy avatar");
          setAvatar(userAccount.avatar);
        }
      }
    } catch (error) {
      console.error("Lỗi khi load dữ liệu:", error);
      navigate("/");
    }
  }, [navigate]);

  if (!userData) {
    return (
      <Container className="py-4">
        <div>Đang tải...</div>
      </Container>
    );
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("Đang cập nhật dữ liệu...");

    try {
      // Lấy danh sách accounts hiện tại
      const accounts = JSON.parse(localStorage.getItem("accounts")) || [];

      // Tạo object chứa tất cả dữ liệu cần cập nhật
      const updatedUserData = {
        ...userData,
        avatar: avatar, // Thêm avatar vào dữ liệu cập nhật
        email: userData.email,
        fullName: userData.fullName,
        gender: userData.gender,
        phone: userData.phone,
        birthDay: userData.birthDay,
        birthMonth: userData.birthMonth,
        birthYear: userData.birthYear,
        marketing: userData.marketing,
      };

      console.log("Dữ liệu cập nhật:", updatedUserData);

      // Cập nhật trong mảng accounts
      const updatedAccounts = accounts.map((acc) => {
        if (acc.email === userData.email || acc.phone === userData.phone) {
          return { ...acc, ...updatedUserData };
        }
        return acc;
      });

      // Lưu lại vào localStorage
      localStorage.setItem("accounts", JSON.stringify(updatedAccounts));
      localStorage.setItem("loggedInUser", JSON.stringify(updatedUserData));

      console.log("Đã cập nhật thành công");

      // Hiển thị thông báo thành công
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
      alert("Có lỗi xảy ra khi cập nhật thông tin!");
    }
  };

  // Thêm hàm xử lý khi có thay đổi trong form
  const handleInputChange = (field, value) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Thêm hàm xử lý cập nhật số điện thoại
  const handlePhoneUpdate = () => {
    // Validate số điện thoại
    if (!/^[0-9]{10}$/.test(newPhone)) {
      setPhoneError("Số điện thoại phải có 10 chữ số");
      return;
    }

    try {
      const accounts = JSON.parse(localStorage.getItem("accounts")) || [];

      // Kiểm tra xem số điện thoại mới đã tồn tại chưa
      const phoneExists = accounts.some((acc) => acc.phone === newPhone);
      if (phoneExists) {
        setPhoneError("Số điện thoại này đã được sử dụng");
        return;
      }

      // Cập nhật số điện thoại mới
      const updatedAccounts = accounts.map((acc) => {
        if (acc.email === userData.email || acc.phone === userData.phone) {
          return { ...acc, phone: newPhone };
        }
        return acc;
      });

      // Cập nhật localStorage
      localStorage.setItem("accounts", JSON.stringify(updatedAccounts));
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ ...userData, phone: newPhone })
      );

      // Cập nhật state
      setUserData((prev) => ({ ...prev, phone: newPhone }));
      setIsEditingPhone(false);
      setPhoneError("");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Lỗi khi cập nhật số điện thoại:", error);
      setPhoneError("Có lỗi xảy ra khi cập nhật số điện thoại");
    }
  };

  console.log("Current userData state:", userData);

  return (
    <>
      {/* Thêm Navbar ở đây */}
      <Navbar expand="lg" className="custom-navbar">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link
              href="/"
              className="custom-nav-link"
              onClick={(event) => {
                window.scrollTo({ top: 0, behavior: "smooth" }); // Cuộn lên đầu trang
              }}
            >
              TRANG CHỦ
            </Nav.Link>
            <Nav.Link href="/chutideals" className="custom-nav-link">CHUTI DEALS</Nav.Link>
            <Nav.Link href="/HotDeal" className="custom-nav-link">HOT DEALS</Nav.Link>
            <Nav.Link href="/brand" className="custom-nav-link">THƯƠNG HIỆU</Nav.Link>
            <Nav.Link href="/new-products" className="custom-nav-link">HÀNG MỚI VỀ</Nav.Link>
            <Nav.Link href="/banchay" className="custom-nav-link">BÁN CHẠY</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Nội dung chính */}
      <Container className="py-4">
        {showSuccess && (
          <div className="alert alert-success">
            Cập nhật thông tin thành công!
          </div>
        )}

        <div className="bg-white p-4 rounded shadow-sm">
          <h4 className="mb-4">Thông tin tài khoản</h4>

          <div className="mb-4">
            <div className="d-flex align-items-center mb-3">
              <div
                className="avatar-container me-3"
                style={{
                  cursor: "pointer",
                  position: "relative",
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  backgroundColor: "#f8f9fa",
                }}
                onClick={handleAvatarClick}
              >
                {avatar ? (
                  <img
                    src={avatar}
                    alt="Avatar"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <FaUser
                    size={50}
                    className="text-secondary"
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                )}

                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleFileSelect}
                />
              </div>
              <div>
                <p className="text-muted mb-0">Nhấp vào để tải ảnh lên</p>
                <small className="text-muted">Kích thước tối đa: 5MB</small>
              </div>
            </div>

            <Form onSubmit={handleUpdate}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  value={userData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  placeholder="Họ và tên"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  value={userData.email}
                  disabled
                  className="bg-light"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  value={userData.phone}
                  disabled
                  className="bg-light"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <div className="d-flex">
                  <Form.Check
                    type="radio"
                    label="Nam"
                    name="gender"
                    checked={userData.gender === "Nam"}
                    onChange={(e) => handleInputChange("gender", e.target.value)}
                    className="me-3"
                  />
                  <Form.Check
                    type="radio"
                    label="Nữ"
                    name="gender"
                    checked={userData.gender === "Nữ"}
                    onChange={(e) => handleInputChange("gender", e.target.value)}
                    className="me-3"
                  />
                  <Form.Check
                    type="radio"
                    label="Không xác định"
                    name="gender"
                    checked={userData.gender === "Không xác định"}
                    onChange={(e) => handleInputChange("gender", e.target.value)}
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Ngày sinh (Không bắt buộc)</Form.Label>
                <Row>
                  <Col>
                    <Form.Select
                      value={userData.birthDay}
                      onChange={(e) =>
                        handleInputChange("birthDay", e.target.value)
                      }
                    >
                      <option value="">Ngày</option>
                      {[...Array(31)].map((_, i) => {
                        const day = (i + 1).toString();
                        return (
                          <option key={day} value={day}>
                            {day}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Col>
                  <Col>
                    <Form.Select
                      value={userData.birthMonth}
                      onChange={(e) =>
                        handleInputChange("birthMonth", e.target.value)
                      }
                    >
                      <option value="">Tháng</option>
                      {[...Array(12)].map((_, i) => {
                        const month = (i + 1).toString();
                        return (
                          <option key={month} value={month}>
                            {month}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Col>
                  <Col>
                    <Form.Select
                      value={userData.birthYear}
                      onChange={(e) =>
                        handleInputChange("birthYear", e.target.value)
                      }
                    >
                      <option value="">Năm</option>
                      {[...Array(100)].map((_, i) => {
                        const year = (new Date().getFullYear() - i).toString();
                        return (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Col>
                </Row>
              </Form.Group>

              <Button variant="success" type="submit" className="w-100">
                Cập nhật
              </Button>
            </Form>
          </div>

          <hr />

          <div className="mb-4">
            <h5>Số điện thoại và Email</h5>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div>
                <FaPhone className="me-2" />
                <span>Số điện thoại</span>
                {isEditingPhone ? (
                  <div className="mt-2">
                    <Form.Control
                      type="text"
                      value={newPhone}
                      onChange={(e) => {
                        setNewPhone(e.target.value);
                        setPhoneError("");
                      }}
                      placeholder="Nhập số điện thoại mới"
                      className="mb-2"
                    />
                    {phoneError && (
                      <div className="text-danger small">{phoneError}</div>
                    )}
                    <div className="mt-2">
                      <Button
                        variant="success"
                        size="sm"
                        onClick={handlePhoneUpdate}
                        className="me-2"
                      >
                        Lưu
                      </Button>
                      <Button
                        variant="light"
                        size="sm"
                        onClick={() => {
                          setIsEditingPhone(false);
                          setPhoneError("");
                          setNewPhone(userData.phone);
                        }}
                      >
                        Hủy
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted mb-0">{userData.phone}</p>
                )}
              </div>
              {!isEditingPhone && (
                <Button
                  variant="light"
                  onClick={() => {
                    setIsEditingPhone(true);
                    setNewPhone(userData.phone);
                  }}
                >
                  Cập nhật
                </Button>
              )}
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <div>
                <FaEnvelope className="me-2" />
                <span>Email</span>
                <p className="text-muted mb-0">{userData.email}</p>
              </div>
            </div>
          </div>

          <hr />

          <div className="mb-4">
            <h5>Bảo mật</h5>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <FaLock className="me-2" />
                <span>Đổi mật khẩu</span>
              </div>
              <Button variant="light">Cập nhật</Button>
            </div>
          </div>

          <hr />

          <div>
            <h5>Liên kết mạng xã hội</h5>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div>
                <FaFacebook className="me-2 text-primary" />
                <span>Facebook</span>
              </div>
              <Button variant="light">Cập nhật</Button>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <FaGoogle className="me-2 text-danger" />
                <span>Google</span>
              </div>
              <Button variant="light">Cập nhật</Button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default MyAccount;
