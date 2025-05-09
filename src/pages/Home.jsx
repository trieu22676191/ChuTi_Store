import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../Css/Home/Home.css';
import '../Css/Home/ProductSlider.css';
import FlashDeals from "../components/Home/FlashDeals";
import Products from "../components/Home/Products";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [topTotal, setTopTotal] = useState([]);
  const [topSold, setTopSold] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentSearchPage, setCurrentSearchPage] = useState(0);
  const productsPerPage = 5;

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        // Top bán chạy theo totalCount
        const topByTotal = [...data]
          .filter(item => item.totalCount > 500)
          .sort((a, b) => b.totalCount - a.totalCount);
        setTopTotal(topByTotal);
        // Top tìm kiếm theo soldCount
        const topBySold = [...data]
          .filter(item => item.soldCount > 200)
          .sort((a, b) => b.soldCount - a.soldCount)
        setTopSold(topBySold);
      });
  }, []);

  const services = [
    { icon: "/img/Quang Cao/ChamSocDa.png", text: "Chăm Sóc Da" ,category:"skincare"},
    { icon: "/img/Quang Cao/Kem.png", text: "Kem Body", category:"moisturizer" },
    { icon: "/img/Quang Cao/MatNa.png", text: "Mặt Nạ", category:"mask" },
    { icon: "/img/Quang Cao/NuocHoa.png", text: "Nước Hoa", category:"mist" },
    { icon: "/img/Quang Cao/Serum.png", text: "SeRum", category:"serum" },
    { icon: "/img/Quang Cao/SonMoi.png", text: "Son Môi", category:"lipcare" },
    { icon: "/img/Quang Cao/SuaTam.png", text: "Sữa Tắm", category:"cleanser"},
    { icon: "/img/Quang Cao/TrangDiem.png", text: "Trang Điểm" ,category:"toner" },
  ];

  const formatPrice = (price) =>
    price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(Math.ceil(topTotal.length / productsPerPage) - 1, prev + 1));
  };

  const currentProducts = topTotal.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  );

  const handlePrevSearchPage = () => {
    setCurrentSearchPage(prev => Math.max(0, prev - 1));
  };

  const handleNextSearchPage = () => {
    setCurrentSearchPage(prev => Math.min(Math.ceil(topSold.length / productsPerPage) - 1, prev + 1));
  };

  const currentSearchProducts = topSold.slice(
    currentSearchPage * productsPerPage,
    (currentSearchPage + 1) * productsPerPage
  );

  return (
    <Container fluid className="px-4">
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

      <div className="carousel-wrapper">
        <Carousel
          prevIcon={<span className="carousel-prev-icon">‹</span>}
          nextIcon={<span className="carousel-next-icon">›</span>}
        >
          <Carousel.Item>
            <Link
              to={{
                pathname: "/chi-tiet-hot-deal/1",
              }}
              state={{
                block: {
                  title: "Làm đẹp công nghệ cao",
                  img: "/img/Quang Cao/anh quang cao 1.jpg",
                },
              }}
            >
              <img
                className="d-block w-100 carousel-image"
                src="/img/Quang Cao/anh quang cao 1.jpg"
                alt="First slide"
              />
            </Link>
          </Carousel.Item>
          <Carousel.Item>
            <Link
              to={{
                pathname: "/chi-tiet-hot-deal/2",
              }}
              state={{
                block: {
                  title: "Trải nghiệm triệt lông Diode Laser",
                  img: "/img/Quang Cao/anh quang cao 2.jpg",
                },
              }}
            >
              <img
                className="d-block w-100 carousel-image"
                src="/img/Quang Cao/anh quang cao 2.jpg"
                alt="Second slide"
              />
            </Link>
          </Carousel.Item>
          <Carousel.Item>
            <Link
              to={{
                pathname: "/chi-tiet-hot-deal/3",
              }}
              state={{
                block: {
                  title: "Deal sốc chỉ từ 2K",
                  img: "/img/Quang Cao/anh quang cao 3.jpg",
                },
              }}
            >
              <img
                className="d-block w-100 carousel-image"
                src="/img/Quang Cao/anh quang cao 3.jpg"
                alt="Third slide"
              />
            </Link>
          </Carousel.Item>
        </Carousel>
      </div>
      <h4 style={{ color: "rgb(25, 135, 84)", fontWeight: "bold", fontSize: "20px", marginTop: "20px", marginLeft: "75px" }}>
        Danh mục
      </h4>
      <div className="service-container">
        <ul className="service-list">
          {services.map((service, index) => (
            <li key={index} className="service-item">
              <Link
                to={{
                  pathname: "/chitietdanhmuc",
                }}
                state={{
                  category: service.category, // Truyền danh mục
                  name: service.text,         // Truyền tên danh mục
                }}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img src={service.icon} alt={service.text} className="service-icon" />
                <p className="service-text">{service.text}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <FlashDeals />

      {/* Top bán chạy */}
      <h2 style={{ color: '#198754', marginTop: 40, fontSize: 20, fontWeight: "bold", marginLeft: 75 }}>Top bán chạy</h2>
      <div className="product-slider-container">
        <div style={{display: "flex",justifyContent: "center", marginLeft:50}} className="product-list">
          {currentProducts.map((sp) => (
            <Link to={`/product/${sp.id}`} key={sp.id} className="product-card">
              <img src={sp.image} alt={sp.name} />
              <h4>{sp.name}</h4>
              <p>{formatPrice(sp.price)}</p>
              <p>Đã bán: {sp.totalCount}</p>
            </Link>
          ))}
        </div>
        <button
          className="slider-nav-button prev"
          onClick={handlePrevPage}
          disabled={currentPage === 0}
        >
          ‹
        </button>
        <button
          className="slider-nav-button next"
          onClick={handleNextPage}
          disabled={currentPage >= Math.ceil(topTotal.length / productsPerPage) - 1}
        >
          ›
        </button>
      </div>

      {/* Top tìm kiếm */}
      <h2 style={{ color: '#198754', marginTop: 40, fontSize: 20, fontWeight: "bold", marginLeft: 75 }}>Top tìm kiếm</h2>
      <div className="product-slider-container">
        <div style={{display: "flex",justifyContent: "center", marginLeft:50}} className="product-list">
          {currentSearchProducts.map((sp) => (
            <Link to={`/product/${sp.id}`} key={sp.id} className="product-card">
              <img src={sp.image} alt={sp.name} />
              <h4>{sp.name}</h4>
              <p>{formatPrice(sp.price)}</p>
              <p>Đã bán: {sp.soldCount}</p>
            </Link>
          ))}
        </div>
        <button
          className="slider-nav-button prev"
          onClick={handlePrevSearchPage}
          disabled={currentSearchPage === 0}
        >
          ‹
        </button>
        <button
          className="slider-nav-button next"
          onClick={handleNextSearchPage}
          disabled={currentSearchPage >= Math.ceil(topSold.length / productsPerPage) - 1}
        >
          ›
        </button>
      </div>

      <Products />

      <div className="service-support">
        <div className="service-item">
          <Link to="/huongdandathang" style={{ textDecoration: "none", color: "inherit" }}>
            <img src="/img/Quang Cao/Thanhtoan.png" alt="Thanh toán khi nhận hàng" />
            <div className="service-text">
              <h5>Thanh toán khi nhận hàng</h5>
            </div>
          </Link>
        </div>

        <div className="service-item">
          <Link to="/giaonhanh" style={{ textDecoration: "none", color: "inherit" }}>
            <img src="/img/Quang Cao/FreeShip.png" alt="Giao nhanh miễn phí 2H" />
            <div className="service-text">
              <h5>Giao nhanh miễn phí 24H</h5>
            </div>
            </Link>
        </div>

        <div className="service-item">
        <Link to="/chinhsachdoitra" style={{ textDecoration: "none", color: "inherit" }}>
          <img src="/img/Quang Cao/TraHang.png" alt="30 ngày đổi trả miễn phí" />
          <div className="service-text">
            <h5>30 ngày đổi trả miễn phí</h5>
          </div>
          </Link>
        </div>

        <div className="service-item">
        <Link to="/gioi-thieu" style={{ textDecoration: "none", color: "inherit" }}>
          <img src="/img/Quang Cao/UyTin.png" alt="Thương hiệu uy tín toàn cầu" />
          <div className="service-text">
            <h5>Thương hiệu uy tín toàn cầu</h5>
          </div>
          </Link>
        </div>

        <div className="service-item">
          <img src="/img/Quang Cao/HotLine.png" alt="Hotline CSKH" />
          <div className="service-text">
            <h5>HOTLINE CSKH</h5>
            <h5>1800 6324</h5>
          </div>
        </div>

        <div className="service-item">
          <img src="/img/Quang Cao/Location.png" alt="Tìm chi nhánh" />
          <div className="service-text">
            <h5>TÌM CHI NHÁNH</h5>
            <h5>Hệ thống ChuTi</h5>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Home;
