import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { brandImages } from "../data/brandImages";

const Brand = () => {
  const [brands, setBrands] = useState([]);
  const [brandCount, setBrandCount] = useState(0);
  const [activeLetter, setActiveLetter] = useState("ALL"); // Thay đổi giá trị mặc định
  const alphabet = ["ALL", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")]; // Thêm 'ALL' vào đầu mảng

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => {
        const uniqueBrands = [
          ...new Set(data.products.map((product) => product.brand)),
        ].sort();
        setBrands(uniqueBrands);
        setBrandCount(uniqueBrands.length);
      });
  }, []);

  // Sửa lại hàm lọc brands
  const filteredBrands =
    activeLetter === "ALL"
      ? brands
      : brands.filter(
          (brand) => brand.charAt(0).toUpperCase() === activeLetter
        );

  // Tạo object nhóm brands theo chữ cái
  const groupedBrands = brands.reduce((acc, brand) => {
    const firstLetter = brand.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(brand);
    return acc;
  }, {});

  // Sắp xếp các nhóm theo alphabet
  const sortedLetters = Object.keys(groupedBrands).sort();

  const renderBrands = () => {
    if (activeLetter === "ALL") {
      return sortedLetters.map((letter) => (
        <div key={letter} className="mb-5">
          <h3 className="mb-4">{letter}</h3>
          <Row xs={2} md={3} lg={5} className="g-4">
            {groupedBrands[letter].map((brand, idx) => (
              <Col key={idx}>
                <div
                  className="brand-card p-3 text-center"
                  style={{
                    border: "1px solid #eee",
                    borderRadius: "8px",
                    height: "200px",
                  }}
                >
                  <img
                    src={brandImages[brand]}
                    alt={brand}
                    style={{
                      width: "100%",
                      height: "140px",
                      objectFit: "contain",
                      marginBottom: "12px",
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/img/Brand/default.jpg";
                    }}
                  />
                  <div>{brand}</div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      ));
    } else {
      return filteredBrands.length === 0 ? (
        <div className="text-center py-5 text-muted">
          Không có thương hiệu nào bắt đầu bằng "{activeLetter}"
        </div>
      ) : (
        <Row xs={2} md={3} lg={5} className="g-4">
          {filteredBrands.map((brand, idx) => (
            <Col key={idx}>
              <div
                className="brand-card p-3 text-center"
                style={{
                  border: "1px solid #eee",
                  borderRadius: "8px",
                  height: "200px",
                }}
              >
                <img
                  src={brandImages[brand]}
                  alt={brand}
                  style={{
                    width: "100%",
                    height: "140px",
                    objectFit: "contain",
                    marginBottom: "12px",
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/img/Brand/default.jpg";
                  }}
                />
                <div>{brand}</div>
              </div>
            </Col>
          ))}
        </Row>
      );
    }
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">Xem {brandCount} thương hiệu</h2>

      {/* Alphabet filter */}
      <div
        className="mb-4"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          borderBottom: "1px solid #dee2e6",
          paddingBottom: "12px",
        }}
      >
        {alphabet.map((letter) => (
          <span
            key={letter}
            onClick={() => setActiveLetter(letter)}
            className="px-2 py-1"
            style={{
              cursor: "pointer",
              color: activeLetter === letter ? "#fff" : "#198754",
              background: activeLetter === letter ? "#198754" : "transparent",
              borderRadius: "4px",
              transition: "all 0.2s",
              minWidth: letter === "ALL" ? "60px" : "32px", // Thêm width cho nút ALL
              textAlign: "center",
            }}
          >
            {letter === "ALL" ? "Tất cả" : letter}
          </span>
        ))}
      </div>

      {/* Show brands */}
      <div className="mb-5">
        {activeLetter === "ALL" ? null : (
          <h3 className="mb-4">{activeLetter}</h3>
        )}
        {renderBrands()}
      </div>
    </Container>
  );
};

export default Brand;
