import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../Css/FavoriteProducts.css";

const menuItems = [
  { label: "Quản lý tài khoản", path: "/my-account" },
  { label: "Đơn hàng của tôi", path: "/my-order" },
  { label: "Số địa chỉ nhận hàng", path: "/address" },
  { label: "Danh sách yêu thích", path: "/yeu-thich" },
];

function FavoriteProducts() {
  const [favorites, setFavorites] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);

      // Lấy thông tin người dùng từ localStorage
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
      const userName = loggedInUser?.fullName; // Lấy user_name từ thông tin người dùng

      if (!userName) {
        console.error("Không tìm thấy user_name. Vui lòng đăng nhập.");
        setLoading(false);
        return;
      }

      try {
        // Lấy danh sách yêu thích dựa vào user_name
        const res = await axios.get(`http://localhost:3000/likeproduct?user_name=${userName}`);
        setFavorites(res.data);

        if (res.data.length > 0) {
          // Lọc danh sách yêu thích chỉ chứa các mục có user_name = userName
          const userFavorites = res.data.filter(item => item.user_name === userName);

          if (userFavorites.length > 0) {
            // Lấy danh sách ID sản phẩm từ danh sách yêu thích
            const ids = userFavorites.map(item => item.id_SP);

            // Gửi nhiều yêu cầu GET để lấy thông tin từng sản phẩm
            const productPromises = ids.map(id =>
              axios.get(`http://localhost:3000/products/${id}`)
            );

            try {
              const productResponses = await Promise.all(productPromises);
              const products = productResponses.map(res => res.data);

              // Cập nhật danh sách sản phẩm
              setProducts(products);
            } catch (error) {
              console.error("Lỗi khi lấy thông tin sản phẩm:", error);
              setProducts([]);
            }
          } else {
            // Nếu không có sản phẩm yêu thích, đặt danh sách sản phẩm rỗng
            setProducts([]);
          }
        } else {
          // Nếu không có mục yêu thích nào, đặt danh sách sản phẩm rỗng
          setProducts([]);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách yêu thích:", error);
      }

      setLoading(false);
    };

    fetchFavorites();
  }, []);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    setUserData(loggedInUser);
  }, []);

  const handleRemove = async (productId) => {
    const like = favorites.find(item => item.id_SP === productId);
    if (like) {
      try {
        // Xóa sản phẩm khỏi danh sách yêu thích trong db.json
        await axios.delete(`http://localhost:3000/likeproduct/${like.id}`);
        // Cập nhật danh sách yêu thích và sản phẩm
        setFavorites(favorites.filter(item => item.id_SP !== productId));
        setProducts(products.filter(item => item.id !== productId));
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
      }
    }
  };

  const handleProductClick = (productId) => {
    // Chuyển hướng đến trang chi tiết sản phẩm
    navigate(`/product/${productId}`);
  };

  if (loading) return <div>Đang tải...</div>;

  return (
    <div className="favorite-products-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="profile">
          <div className="avatar" />
          <div className="name">Chào {userData?.fullName || userData?.email || "bạn"}</div>
          <div className="edit">Chỉnh sửa tài khoản</div>
        </div>
        <div>
          {menuItems.map(item => (
            <div
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`menu-item ${location.pathname === item.path ? "active" : ""}`}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
      {/* Main Content */}
      <div className="main-content">
        <h2>Danh sách yêu thích</h2>
        {products.length === 0 ? (
          <div style={{ textAlign: "center", marginTop: 100 }}>
            <div style={{ fontSize: 100, color: "#ccc" }}>😐</div>
            <p>
              Hãy <span style={{ color: "orange" }}>❤️</span> sản phẩm bạn yêu thích khi mua sắm để xem lại thuận tiện nhất
            </p>
            <button
              onClick={() => navigate("/")}
              style={{
                background: "#388e3c",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "10px 28px",
                fontSize: 16,
                fontWeight: "bold",
                cursor: "pointer",
                marginTop: 24,
                transition: "background 0.2s"
              }}
              onMouseOver={e => (e.target.style.background = "#2e7031")}
              onMouseOut={e => (e.target.style.background = "#388e3c")}
            >
              Tiếp tục mua sắm
            </button>
          </div>
        ) : (
          <div className="product-list">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <img
                  src={product.image}
                  alt={product.name}
                  onClick={() => handleProductClick(product.id)} // Chuyển đến trang chi tiết sản phẩm
                  style={{ cursor: "pointer" }}
                />
                <h4>{product.name}</h4>
                <p>Giá: {product.price.toLocaleString()}đ</p>
                <button onClick={() => handleRemove(product.id)}>Xóa khỏi yêu thích</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FavoriteProducts;
