import React from "react";
import { Container, Nav, Navbar, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../Css/Home.css'; // 👈 Import CSS
import FlashDeals from "../components/FlashDeals";
import Products from "../components/Products";

const Home = () => {
  const services = [
    { icon: "/img/Quang Cao/ChamSocDa.png", text: "Chăm Sóc Da" },
    { icon: "/img/Quang Cao/Kem.png", text: "Kem Body" },
    { icon: "/img/Quang Cao/MatNa.png", text: "Mặt Nạ" },
    { icon: "/img/Quang Cao/NuocHoa.png", text: "Nước Hoa" },
    { icon: "/img/Quang Cao/Serum.png", text: "SeRum" },
    { icon: "/img/Quang Cao/SonMoi.png", text: "Son Môi" },
    { icon: "/img/Quang Cao/SuaTam.png", text: "Sữa Tắm" },
    { icon: "/img/Quang Cao/TrangDiem.png", text: "Trang Điểm" }
  ];

  return (
    <Container fluid className="px-4">
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
              "DERMAHAIR"
            ].map((item, index) => (
              <Nav.Link key={index} href="#" className="custom-nav-link">
                {item}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div className="carousel-wrapper">
        <Carousel
          prevIcon={<span className="carousel-prev-icon">‹</span>}
          nextIcon={<span className="carousel-next-icon">›</span>}
        >
          <Carousel.Item>
            <Link to="/promotion1">
              <img
                className="d-block w-100 carousel-image"
                src="/img/Quang Cao/anh quang cao 1.jpg" // 👈 Đưa vào public để không cần import
                alt="First slide"
              />
            </Link>
          </Carousel.Item>
          <Carousel.Item>
            <Link to="/promotion2">
              <img
                className="d-block w-100 carousel-image"
                src="/img/Quang Cao/anh quang cao 2.jpg"
                alt="Second slide"
              />
            </Link>
          </Carousel.Item>
          <Carousel.Item>
            <Link to="/promotion3">
              <img
                className="d-block w-100 carousel-image"
                src="/img/Quang Cao/anh quang cao 3.jpg"
                alt="Third slide"
              />
            </Link>
          </Carousel.Item>
        </Carousel>
      </div>
      <h4 style={{color: "rgb(25, 135, 84)", fontWeight: "bold", fontSize: "20px", marginTop: "20px", marginLeft: "75px"}}>
        Danh mục
      </h4>
      <div className="service-container">
        <ul className="service-list">
        {services.map((service, index) => (
          <li key={index} className="service-item">
            <img src={service.icon} alt={service.text} className="service-icon" />
            <p className="service-text">{service.text}</p>
          </li>
        ))}
      </ul>
      </div>

      <FlashDeals />
      <Products />
    </Container>
  );
};

export default Home;
