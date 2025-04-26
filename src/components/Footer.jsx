import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaRegCalendar,
} from "react-icons/fa";
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
              <Link
                to="/dieu-khoan"
                className="text-white text-decoration-none"
                style={{ ":hover": { textDecoration: "underline !important" } }}
              >
                Điều khoản sử dụng
              </Link>
              <Link
                to="/chinh-sach"
                className="text-white text-decoration-none"
              >
                Chính sách bảo mật
              </Link>

              <Link
                to="/lien-he"
                className="text-white text-decoration-none hover-underline"
              >
                Liên hệ
              </Link>

              <Link
                to="/gioi-thieu"
                className="text-white text-decoration-none hover-underline"
              >
                Giới thiệu về ChuTi
              </Link>
            </div>
          </Col>

          {/* Cột hệ thống cửa hàng */}
          <Col md={4}>
            <h5 className="text-white fw-bold mb-4">Cửa hàng của chúng tôi</h5>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.8582379826526!2d106.68427047485774!3d10.822158889329419!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174deb3ef536f31%3A0x8b7bb8b7c956157b!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2hp4buHcCBUUC5IQ00!5e0!3m2!1svi!2s!4v1745588756824!5m2!1svi!2s"
              width="100%"
              height="200"
              style={{ border: 0, borderRadius: "8px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
