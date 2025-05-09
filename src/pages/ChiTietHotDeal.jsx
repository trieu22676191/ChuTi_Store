import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Css/ChiTietHotDeal.css";

const ChiTietHotDeal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { block } = location.state || {};
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Tất Cả");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [toastMessage, setToastMessage] = useState(""); // State để hiển thị toast

  useEffect(() => {
    // Fetch products and categories from db.json
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => {
        const uniqueCategories = ["Tất Cả", ...new Set(data.map((product) => product.category))];
        setCategories(uniqueCategories);
        setProducts(data);
        setFilteredProducts(data); // Hiển thị tất cả sản phẩm ban đầu
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  if (!block) {
    return <div>Không tìm thấy thông tin chi tiết!</div>;
  }

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (category === "Tất Cả") {
      setFilteredProducts(products); // Hiển thị tất cả sản phẩm
    } else {
      setFilteredProducts(products.filter((product) => product.category === category)); // Lọc sản phẩm theo category
    }
  };

  const handleAddToCart = (product) => {
    // Lấy giỏ hàng hiện tại từ localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Thêm sản phẩm vào giỏ hàng
    const updatedCart = [...cart, product];
    
    // Lưu lại giỏ hàng vào localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    
    // Hiển thị toast
    setToastMessage(`Đã thêm sản phẩm "${product.name}" vào giỏ hàng!`);
    setTimeout(() => setToastMessage(""), 3000); // Tự động tắt toast sau 3 giây
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "#198754" }}>{block.title}</h1>
      <img
        src={block.img}
        alt={block.title}
        style={{ width: "100%", maxHeight: "400px", objectFit: "cover", borderRadius: "8px", marginBottom: "20px" }}
      />

      {/* Toast */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            backgroundColor: "#198754",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "5px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
            zIndex: 1000,
          }}
        >
          {toastMessage}
        </div>
      )}

      {/* Category Bar */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => handleCategoryClick(category)}
            style={{
              padding: "10px 20px",
              margin: "0 5px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              backgroundColor: activeCategory === category ? "#ff6600" : "#fff",
              color: activeCategory === category ? "#fff" : "#333",
              cursor: "pointer",
              fontWeight: activeCategory === category ? "bold" : "normal",
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product List */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            style={{
              width: "200px",
              height: "350px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
              textAlign: "center",
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              cursor: "pointer",
              transition: "transform 0.3s, box-shadow 0.3s", // Hiệu ứng hover
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }}
            />
            <h5 style={{ fontSize: "16px", color: "#333", margin: "10px 0" }}>{product.name}</h5>
            <p style={{ fontSize: "14px", color: "#ff6600", fontWeight: "bold" }}>{product.price} VND</p>
            <button
              onClick={() => handleAddToCart(product)}
              style={{
                padding: "10px 20px",
                backgroundColor: "#198754",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "10px",
                transition: "background-color 0.3s", // Hiệu ứng hover
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#145a32")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#198754")}
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChiTietHotDeal;