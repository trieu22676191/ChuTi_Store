import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaRegCalendar,
} from "react-icons/fa";
import storeImage from "../img/store.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-success text-white py-4">
      <Container>
        <Row>
          {/* Cột thông tin liên hệ */}
          <Col md={4}>
            <h5 className="text-white fw-bold mb-4">Thông tin liên hệ</h5>
            <div className="d-flex flex-column gap-3">
              <div className="d-flex align-items-start gap-2">
                <FaMapMarkerAlt className="mt-1" />
                <span>
                  Số 12 Nguyễn Văn Bảo, Phường 1,
                  <br />
                  Quận Gò Vấp, Thành phố Hồ Chí Minh
                </span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <FaPhone />
                <span>19001208</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <FaEnvelope />
                <span>hotro@chuti.com.vn</span>
              </div>
              <div className="d-flex align-items-start gap-2">
                <div className="d-flex flex-column">
                  <div className="d-flex">
                    <FaClock className="mt-1 me-2" />
                    <div style={{ width: "110px" }}>Thứ 2 - Thứ 7</div>
                    <div>• 8:00 - 17:00</div>
                  </div>
                  <div className="d-flex">
                    <FaClock className="mt-1 me-2" />
                    <div style={{ width: "110px" }}>Chủ nhật</div>
                    <div>• 8:00 - 12:00</div>
                  </div>
                </div>
              </div>
            </div>
          </Col>

          {/* Cột điều khoản và chính sách */}
          <Col md={4}>
            <h5 className="text-white fw-bold mb-4">
              Điều khoản và chính sách
            </h5>
            <div className="d-flex flex-column gap-2">
              <a
                href="#"
                className="text-white text-decoration-none"
                style={{ ":hover": { textDecoration: "underline !important" } }}
              >
                Điều khoản sử dụng
              </a>
              <Link
                to="/chinh-sach"
                className="text-white text-decoration-none"
              >
                Chính sách bảo mật
              </Link>

              <a
                href="#"
                className="text-white text-decoration-none hover-underline"
              >
                Liên hệ
              </a>

              <a
                href="#"
                className="text-white text-decoration-none hover-underline"
              >
                Giới thiệu về ChuTi
              </a>
            </div>
          </Col>

          {/* Cột hệ thống cửa hàng */}
          <Col md={4}>
            <h5 className="text-white fw-bold mb-4">Hệ thống cửa hàng</h5>
            <img
              src={storeImage}
              alt="Hệ thống cửa hàng"
              className="w-100 rounded"
              style={{ maxHeight: "200px", objectFit: "cover" }}
            />
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
