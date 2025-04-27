import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { useCheckAddToCart } from "../context/CheckAddToCart";
import { useCart } from "../context/CartContext";

const mockThumbs = [
  "/img/San Pham/SP1.jpg",
  "/img/San Pham/SP2.jpg",
  "/img/San Pham/SP3.jpg",
  "/img/San Pham/SP4.jpg",
];

const tabList = [
  { label: "Mô tả", key: "mota" },
  { label: "Thông số", key: "thongso" },
  { label: "Thành phần", key: "thanhphan" },
  { label: "Cách dùng", key: "cachdung" },
  { label: "Đánh giá", key: "danhgia" },
  { label: "Hỏi đáp", key: "hoidap" },
];

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [mainImg, setMainImg] = useState("");
  const [activeTab, setActiveTab] = useState("mota");
  const [activeMenu, setActiveMenu] = useState("mota");
  const sectionIds = [
    "mota",
    "thongso",
    "thanhphan",
    "cachdung",
    "danhgia",
    "hoidap",
  ];
  const sectionRefs = useRef({});
  const [commentCount, setCommentCount] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState({});
  const [reviewStats, setReviewStats] = useState({
    avg: 0,
    total: 0,
    stars: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  });
  const { handleAddToCart } = useCheckAddToCart();
  const { addToCart } = useCart();

  const tabContent = {
    mota: product && (
      <div>
        <b>{product.name}</b> là sản phẩm chống nắng da mặt đến từ thương hiệu{" "}
        <span style={{ color: "#1976d2" }}>{product.brand}</span> - Nhật Bản.
        Sản phẩm với công nghệ Smooth Protect Air giúp phân tán bột chống tia UV
        thành bột nano có kích thước siêu nhỏ, nhờ đó, kết cấu trở nên mỏng nhẹ
        hơn, giảm tối đa tình trạng bết dính gây bí da, bảo vệ toàn diện làn da
        nhạy cảm.
        <br />
        <br />
        <b>{product.name}</b> hiện đã có mặt tại{" "}
        <span style={{ color: "#388e3c" }}>ChuTi</span> với 6 phân loại màu:{" "}
        <b>{product.types.join(", ")}</b>
        <br />
        <br />
        <b>Loại da phù hợp:</b>
        <ul>
          <li>
            Sản phẩm phù hợp với mọi loại da, đặc biệt là da nhạy cảm và trẻ em
            từ 6 tháng tuổi.
          </li>
          <li>Dùng được cho mặt và toàn thân.</li>
        </ul>
        <b>Giải pháp cho tình trạng da:</b>
        <ul>
          <li>Da nhạy cảm và trẻ em</li>
          <li>
            Thích hợp sử dụng hàng ngày và trong các hoạt động ngoài trời.
          </li>
        </ul>
        <b>Ưu thế nổi bật:</b>
        <ul>
          <li>
            {product.name} phiên bản mới với bao bì giấy thân thiện hơn với môi
            trường.
          </li>
          <li>
            Chiết xuất hoa anh đào Yoshino, rễ hoa mẫu đơn, lá thảo dược
            Ashitaba: giúp dưỡng sáng, dưỡng ẩm và mang lại làn da tươi trẻ.
          </li>
          <li>
            Công thức không chứa cồn/màu/mùi/paraben/dầu khoáng dịu lành cho da
            nhạy cảm.
          </li>
          <li>
            Bổ sung Công Nghệ Smooth Protect Air cho các vi phân tử chống nắng
            kích thước nano cho kết cấu thật mỏng nhẹ, giảm tối đa tình trạng
            bết dính, hạn chế áp lực lên làn da nhạy cảm nhưng vẫn đảm bảo khả
            năng chống nắng tối ưu và bảo vệ khỏi ô nhiễm thật ưu việt.
          </li>
          <li>
            An toàn cho cả bé từ 6 tháng tuổi. Có thể làm sạch với xà phòng mà
            không cần dùng tẩy trang.
          </li>
        </ul>
        <b style={{ fontWeight: 700, marginBottom: 12 }}>Bảo quản:</b>
        <ul style={{ marginBottom: 28 }}>
          <li>
            Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp hoặc nơi
            có nhiệt độ cao / ẩm ướt.
          </li>
          <li>Tránh xa tầm tay trẻ em.</li>
          <li>Đậy nắp kín sau khi sử dụng.</li>
        </ul>
      </div>
    ),
    thongso: product && (
      <div>
        <table
          style={{
            width: "100%",
            background: "#fff",
            borderCollapse: "collapse",
            marginBottom: 24,
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          }}
        >
          <tbody>
            <tr style={{ borderBottom: "1px solid #eee" }}>
              <td
                style={{
                  padding: "10px 16px",
                  fontWeight: 600,
                  background: "#fafbfc",
                }}
              >
                Barcode
              </td>
              <td style={{ padding: "10px 16px" }}>
                {product.barcode || "Đang cập nhật"}
              </td>
            </tr>
            <tr style={{ borderBottom: "1px solid #eee" }}>
              <td
                style={{
                  padding: "10px 16px",
                  fontWeight: 600,
                  background: "#fafbfc",
                }}
              >
                Thương Hiệu
              </td>
              <td style={{ padding: "10px 16px" }}>
                {product.brand || "Đang cập nhật"}
              </td>
            </tr>
            <tr style={{ borderBottom: "1px solid #eee" }}>
              <td
                style={{
                  padding: "10px 16px",
                  fontWeight: 600,
                  background: "#fafbfc",
                }}
              >
                Xuất xứ thương hiệu
              </td>
              <td style={{ padding: "10px 16px" }}>
                {product.origin || "Đang cập nhật"}
              </td>
            </tr>
            <tr style={{ borderBottom: "1px solid #eee" }}>
              <td
                style={{
                  padding: "10px 16px",
                  fontWeight: 600,
                  background: "#fafbfc",
                }}
              >
                Nơi sản xuất
              </td>
              <td style={{ padding: "10px 16px" }}>
                {product.madeIn || "Đang cập nhật"}
              </td>
            </tr>
            <tr style={{ borderBottom: "1px solid #eee" }}>
              <td
                style={{
                  padding: "10px 16px",
                  fontWeight: 600,
                  background: "#fafbfc",
                }}
              >
                Loại da
              </td>
              <td style={{ padding: "10px 16px" }}>
                {product.skinType || "Đang cập nhật"}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "10px 16px",
                  fontWeight: 600,
                  background: "#fafbfc",
                }}
              >
                Đặc tính
              </td>
              <td style={{ padding: "10px 16px" }}>
                {product.feature || "Đang cập nhật"}
              </td>
            </tr>
          </tbody>
        </table>
        <div
          style={{
            background: "#e6faf3",
            border: "1px solid #b2dfdb",
            borderRadius: 8,
            padding: 16,
            color: "#222",
            marginBottom: 16,
          }}
        >
          <b style={{ color: "#198754" }}>
            Làm sao để phân biệt hàng có trộn hay không?
          </b>
          <ul style={{ marginTop: 8 }}>
            <li>
              Hàng trộn sẽ không thể <b>xuất hoá đơn đỏ (VAT) 100%</b> được do
              có hàng không nguồn gốc trong đó.
            </li>
            <li>
              Tại ChuTi, 100% hàng bán ra sẽ được <b>xuất hoá đơn đỏ</b> cho dù
              khách hàng có lấy hay không. Nếu có nhu cầu lấy hoá đơn đỏ, quý
              khách vui lòng lấy trước 22h cùng ngày. Sau 22h, hệ thống sẽ tự
              động xuất hết hoá đơn cho những hàng hoá mà khách hàng không đăng
              ký lấy hoá đơn.
            </li>
            <li>
              Do <b>xuất được hoá đơn đỏ 100%</b> nên đảm bảo 100% hàng tại
              ChuTi là hàng chính hãng có nguồn gốc rõ ràng.
            </li>
          </ul>
        </div>
      </div>
    ),
    thanhphan: (
      <div>
        <div style={{ marginBottom: 16 }}>
          <b>Thành phần chính:</b>
          <ul>
            <li>
              <b>
                Chiết xuất hoa anh đào Yoshino, rễ hoa mẫu đơn, lá thảo dược
                Ahitaba:
              </b>{" "}
              giúp dưỡng sáng, dưỡng ẩm và mang lại làn da tươi trẻ.
            </li>
          </ul>
        </div>
        <div>
          <b>Thành phần chi tiết:</b>
          <div style={{ marginTop: 8, lineHeight: 1.7 }}>
            Water (Aqua), Dimethicone, Diisopropyl Sebacate, Butylene Glycol,
            Caprylyl Methicone, Cetyl Ethylhexanoate, Titanium Dioxide,
            Pentaerythrityl Tetraethylhexanoate, Triethylhexanoin, Diethylhexyl
            Succinate, Zinc Oxide, Dipropylene Glycol, Silica, Glycerin, Peg-9
            Polydimethylsiloxyethyl Dimethicone, Diethylamino Hydroxybenzoyl
            Hexyl Benzoate, Bis-Butyldimethicone Polyglyceryl-3, Dextrin
            Palmitate, Trimethylsiloxysilicate, Bis-Ethylhexyloxyphenol
            Methoxyphenyl Triazine, Peg/Ppg-14/7 Dimethyl Ether, Sodium
            Chloride, Thiotaurine, Paeonia Albiflora Root Extract, Dipotassium
            Glycyrrhizate, Angelica Keiskei Leaf/Stem Extract, Sodium Acetylated
            Hyaluronate, Peg-10 Dimethicone, Aluminum Hydroxide, Disteardimonium
            Hectorite, Ethylhexyl Triazone, Peg-12 Dimethicone, Stearic Acid,
            Hydrogen Dimethicone, Beheneth-20, Sodium Citrate, Citric Acid,
            Sodium Metaphosphate, Sodium Metabisulfite, Prunus Yedoensis Leaf
            Extract, Barium Sulfate, Carbomer,
            TrifluoropropylMethyl/Trimethylsiloxysilicate, Tocopherol,
            Phenoxyethanol, Benzoic Acid, &lt;M107410-711&gt;
          </div>
        </div>
      </div>
    ),
    cachdung: (
      <div>
        <ul style={{ marginBottom: 20 }}>
          <li>Lắc đều trước khi sử dụng.</li>
          <li>
            Dùng sau bước dưỡng da buổi sáng, lấy một lượng vừa đủ ra tay và dàn
            đều lên toàn bộ khuôn mặt và vùng da cần được bảo vệ. Để đạt hiệu
            quả cao nhất, nên thoa lại sau khi tiếp xúc nhiều với nước hoặc lau
            bằng khăn lau.
          </li>
          <li>Lượng sử dụng: 2mg/1cm2 da.</li>
          <li>
            Thích hợp sử dụng hàng ngày và trong các hoạt động ngoài trời.
          </li>
          <li>Có thể dùng làm lớp lót trang điểm bảo vệ da.</li>
          <li>Thích hợp sử dụng cho mặt & toàn thân.</li>
          <li>Dễ dàng làm sạch với sữa rửa mặt.</li>
        </ul>
        <b>Lưu ý:</b>
        <ul>
          <li>
            Tránh tiếp xúc với mắt. Nếu có, rửa ngay bằng nước lạnh hoặc nước
            ấm.
          </li>
          <li>
            Không sử dụng cho vùng da bị tổn thương như trầy xước, sưng tấy và
            chàm.
          </li>
          <li>
            Ngưng sử dụng khi có biểu hiện kích ứng và tham khảo ý kiến bác sĩ
            da liễu.
          </li>
        </ul>
      </div>
    ),
    danhgia: (
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 32,
            marginBottom: 24,
          }}
        >
          <div style={{ minWidth: 160, textAlign: "center" }}>
            <div
              style={{
                fontSize: 48,
                fontWeight: 700,
                color: "#e53935",
                lineHeight: 1,
              }}
            >
              {reviewStats.avg}
            </div>
            <div
              style={{
                color: "#f59e42",
                fontSize: 22,
                fontWeight: 700,
                margin: "4px 0",
              }}
            >
              ★
            </div>
            <div style={{ fontSize: 16, color: "#222" }}>
              {reviewStats.total} nhận xét
            </div>
          </div>
          <div style={{ flex: 1 }}>
            {[5, 4, 3, 2, 1].map((star) => (
              <div
                key={star}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 2,
                }}
              >
                <span style={{ width: 32 }}>{star} sao</span>
                <div
                  style={{
                    flex: 1,
                    height: 8,
                    background: "#eee",
                    borderRadius: 4,
                    overflow: "hidden",
                    margin: "0 8px",
                  }}
                >
                  <div
                    style={{
                      width: reviewStats.total
                        ? (reviewStats.stars[star] / reviewStats.total) * 100 +
                          "%"
                        : 0,
                      height: "100%",
                      background: "#e53935",
                    }}
                  ></div>
                </div>
                <span style={{ color: "#888", fontSize: 13 }}>
                  {star === 5
                    ? "Rất hài lòng"
                    : star === 4
                    ? "Hài lòng"
                    : star === 3
                    ? "Bình thường"
                    : star === 2
                    ? "Không hài lòng"
                    : "Rất tệ"}
                </span>
                <span style={{ marginLeft: 8, color: "#222", fontWeight: 600 }}>
                  {reviewStats.stars[star]}
                </span>
              </div>
            ))}
          </div>
          <div style={{ minWidth: 220, textAlign: "center" }}>
            <div style={{ marginBottom: 8, color: "#888" }}>
              Chia sẻ nhận xét của bạn về sản phẩm này
            </div>
            <button
              style={{
                background: "#ff9800",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                fontWeight: 700,
                fontSize: 16,
                padding: "10px 28px",
                cursor: "pointer",
              }}
            >
              Viết Bình luận
            </button>
          </div>
        </div>
        <div
          style={{
            background: "#f6f6f6",
            borderRadius: 6,
            padding: "10px 16px",
            fontWeight: 600,
            marginBottom: 12,
          }}
        >
          {reviewStats.total} bình luận cho sản phẩm này
        </div>
        <div>
          {reviews.length === 0 && (
            <i>Chưa có đánh giá nào cho sản phẩm này.</i>
          )}
          {reviews.map((c, idx) => (
            <div
              key={idx}
              style={{ borderBottom: "1px solid #eee", padding: "12px 0" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 4,
                }}
              >
                <span style={{ color: "#f59e42", fontWeight: 700 }}>
                  {"★".repeat(c.rating)}
                  {"☆".repeat(5 - c.rating)}
                </span>
                <span style={{ fontWeight: 700, color: "#198754" }}>
                  {users[c.id_User]?.name || "Người dùng"}
                </span>
                <span style={{ color: "#888", fontSize: 13, marginLeft: 8 }}>
                  {c.date}
                </span>
              </div>
              <div style={{ fontSize: 16 }}>{c.content}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    hoidap: (
      <div>
        <i>Chưa có câu hỏi nào cho sản phẩm này.</i>
      </div>
    ),
  };

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setMainImg(data.image);
      });
    // Fetch comments count
    fetch(`http://localhost:3000/comments?id_SP=${id}`)
      .then((res) => res.json())
      .then(async (data) => {
        setReviews(data);
        // Lấy thông tin user cho từng đánh giá
        const userIds = [...new Set(data.map((c) => c.id_User))];
        const userFetches = await Promise.all(
          userIds.map((uid) =>
            fetch(`http://localhost:3000/users/${uid}`).then((r) => r.json())
          )
        );
        const userMap = {};
        userIds.forEach((uid, idx) => (userMap[uid] = userFetches[idx]));
        setUsers(userMap);
        // Tính toán thống kê
        let total = data.length;
        let sum = 0;
        let stars = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        data.forEach((c) => {
          sum += c.rating;
          stars[c.rating] = (stars[c.rating] || 0) + 1;
        });
        setReviewStats({
          avg: total ? (sum / total).toFixed(1) : 0,
          total,
          stars,
        });
      });
    // Fetch questions count
    fetch(`http://localhost:3000/questions?id_SP=${id}`)
      .then((res) => res.json())
      .then((data) => setQuestionCount(data.length));
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120; // offset để nhìn rõ tiêu đề
      let current = "mota";
      for (let id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPosition) {
          current = id;
        }
      }
      setActiveMenu(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuClick = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
    setActiveMenu(id);
  };

  const formatPrice = (price) =>
    price?.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  // Sử dụng mockVariants cho cả ảnh phụ và lựa chọn bên phải
  const thumbs = (product?.types || []).map(
    (type, idx) => `/img/San Pham/SP${product.id || 1}.jpg`
  );

  if (!product) return <div>Đang tải...</div>;

  const onAddToCart = () => {
    const productToAdd = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      variant: product.types?.[selectedVariant],
      discount: product.discount,
      quantity: quantity,
    };
    handleAddToCart(addToCart, productToAdd);
  };

  return (
    <Container
      fluid
      className="px-4 py-4"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div style={{ width: "90%", margin: "0 auto" }}>
        {/* Navbar giữ nguyên như Home.jsx */}
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
                "DERMAHAIR",
              ].map((item, index) => (
                <Nav.Link key={index} href="#" className="custom-nav-link">
                  {item}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div
          style={{
            display: "flex",
            gap: 32,
            marginTop: 32,
            alignItems: "flex-start",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {/* Cột trái: Ảnh sản phẩm và ảnh nhỏ */}
          <div style={{ flex: "0 0 38%", maxWidth: "38%" }}>
            <div
              style={{
                width: "100%",
                height: 420,
                background: "#fff",
                borderRadius: 8,
                border: "1px solid #eee",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={mainImg}
                alt={product.name}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  background: "#fff",
                  borderRadius: 8,
                }}
              />
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              {thumbs.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt="thumb"
                  style={{
                    width: 60,
                    height: 60,
                    objectFit: "cover",
                    borderRadius: 4,
                    border:
                      selectedVariant === idx
                        ? "2px solid #e53935"
                        : "1px solid #eee",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setMainImg(img);
                    setSelectedVariant(idx);
                  }}
                />
              ))}
            </div>
          </div>
          {/* Cột phải: Thông tin sản phẩm */}
          <div
            style={{
              flex: "1 1 62%",
              maxWidth: "62%",
              background: "#fff",
              borderRadius: 8,
              padding: 24,
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  background: "#e53935",
                  color: "#fff",
                  fontWeight: 600,
                  borderRadius: 4,
                  padding: "2px 8px",
                  fontSize: 13,
                }}
              >
                NEW
              </span>
              <span
                style={{
                  background: "#198754",
                  color: "#fff",
                  fontWeight: 600,
                  borderRadius: 4,
                  padding: "2px 8px",
                  fontSize: 13,
                }}
              >
                BEST
              </span>
              <span
                style={{
                  background: "#1976d2",
                  color: "#fff",
                  fontWeight: 600,
                  borderRadius: 4,
                  padding: "2px 8px",
                  fontSize: 13,
                }}
              >
                FREESHIP HCM
              </span>
            </div>
            <h2 style={{ fontWeight: 700, fontSize: 22, margin: "8px 0 8px" }}>
              {product.name}
            </h2>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginBottom: 8,
              }}
            >
              <span style={{ color: "#f59e42", fontWeight: 600 }}>★ 4.9</span>
              <span>{commentCount} đánh giá</span>
              <span>{questionCount} Hỏi đáp</span>
              <span>{product.soldCount?.toLocaleString()} Đã bán</span>
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: "#e53935",
                margin: "8px 0",
              }}
            >
              15,000₫ -{" "}
              {formatPrice(product.price * (1 - product.discount / 100))}
              <span
                style={{
                  fontSize: 16,
                  color: "#888",
                  textDecoration: "line-through",
                  marginLeft: 12,
                }}
              >
                {formatPrice(product.price)}
              </span>
              <span style={{ fontSize: 16, color: "#e53935", marginLeft: 8 }}>
                -{product.discount}%
              </span>
              <span
                style={{
                  background: "#ff9800",
                  color: "#fff",
                  fontWeight: 600,
                  borderRadius: 4,
                  padding: "2px 8px",
                  fontSize: 13,
                  marginLeft: 12,
                }}
              >
                GIFT
              </span>
            </div>
            <div
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
                margin: "16px 0",
              }}
            >
              {(product?.types || []).map((type, idx) => (
                <Button
                  key={idx}
                  variant={
                    selectedVariant === idx ? "danger" : "outline-secondary"
                  }
                  size="sm"
                  style={{
                    fontWeight: 600,
                    minWidth: 120,
                    marginBottom: 8,
                    border: selectedVariant === idx ? "2px solid #e53935" : "",
                  }}
                  onClick={() => {
                    setSelectedVariant(idx);
                    setMainImg(`/img/San Pham/SP${product.id || 1}.jpg`);
                  }}
                >
                  {type}
                </Button>
              ))}
            </div>
            <div
              style={{
                marginBottom: 16,
                display: "flex",
                alignItems: "center",
              }}
            >
              <b>Số lượng:</b>
              <div
                style={{ display: "flex", alignItems: "center", marginLeft: 8 }}
              >
                <Button
                  variant="outline-secondary"
                  size="sm"
                  style={{ marginRight: 4 }}
                  onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
                >
                  -
                </Button>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  style={{
                    width: 60,
                    borderRadius: 4,
                    border: "1px solid #ccc",
                    padding: 4,
                    textAlign: "center",
                  }}
                />
                <Button
                  variant="outline-secondary"
                  size="sm"
                  style={{ marginLeft: 4 }}
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </Button>
              </div>
              <Button
                className="add-to-favorite-btn"
                style={{
                  background: "transparent",
                  color: "#e53935",
                  border: "2px solid #e53935",
                  fontWeight: 700,
                  fontSize: 16,
                  padding: "12px 24px",
                  marginLeft: 54,
                  width: "240px",
                  transition: "all 0.2s ease-in-out",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "#e53935";
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.querySelector("img").style.filter =
                    "brightness(0) invert(1)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#e53935";
                  e.currentTarget.querySelector("img").style.filter = "none";
                }}
              >
                <img
                  src="/img/ChiTietSanPham/heart.png"
                  alt="heart"
                  style={{
                    width: 20,
                    height: 20,
                    marginRight: 8,
                    transition: "all 0.2s ease-in-out",
                  }}
                />
                Thêm vào yêu thích
              </Button>
            </div>
            <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
              <Button
                style={{
                  background: "#e53935",
                  border: "none",
                  fontWeight: 700,
                  fontSize: 16,
                  padding: "12px 24px",
                  width: "240px",
                }}
              >
                Mua Ngay Online
              </Button>
              <Button
                className="add-to-cart-btn"
                onClick={onAddToCart}
                style={{
                  background: "transparent",
                  color: "#e53935",
                  border: "2px solid #e53935",
                  fontWeight: 700,
                  fontSize: 16,
                  padding: "12px 24px",
                  width: "240px",
                  transition: "all 0.2s ease-in-out",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "#e53935";
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.querySelector("img").style.filter =
                    "brightness(0) invert(1)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#e53935";
                  e.currentTarget.querySelector("img").style.filter = "none";
                }}
              >
                <img
                  src="/img/ChiTietSanPham/add-to-cart.png"
                  alt="cart"
                  style={{
                    width: 20,
                    height: 20,
                    marginRight: 8,
                    transition: "all 0.2s ease-in-out",
                  }}
                />
                Thêm vào giỏ hàng
              </Button>
            </div>
            <div
              style={{ marginBottom: 16, color: "#198754", fontWeight: 600 }}
            >
              <span
                style={{
                  background: "#e3fcec",
                  color: "#198754",
                  padding: "4px 12px",
                  borderRadius: 4,
                  fontWeight: 600,
                }}
              >
                Miễn phí thanh toán
              </span>
              <div
                style={{
                  marginTop: 8,
                  display: "flex",
                  gap: 8,
                  marginLeft: 12,
                }}
              >
                <img
                  src="/img/ChiTietSanPham/vnpay.jpg"
                  alt="vnpay"
                  style={{ height: 28 }}
                />
                <img
                  src="/img/ChiTietSanPham/shopeePay.webp"
                  alt="shopeepay"
                  style={{ height: 28 }}
                />
                <img
                  src="/img/ChiTietSanPham/zalopay.webp"
                  alt="zalopay"
                  style={{ height: 28 }}
                />
                <img
                  src="/img/ChiTietSanPham/momo.webp"
                  alt="momo"
                  style={{ height: 28 }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Menu điều hướng các mục chi tiết */}
        {(() => {
          const menuTabs = [
            { key: "mota", label: "Mô tả" },
            { key: "thongso", label: "Thông số" },
            { key: "thanhphan", label: "Thành phần" },
            { key: "cachdung", label: "Cách dùng" },
            { key: "danhgia", label: "Đánh giá" },
            { key: "hoidap", label: "Hỏi đáp" },
          ];
          return (
            <div
              style={{
                display: "flex",
                gap: 32,
                justifyContent: "center",
                margin: "40px 0 24px 0",
                background: "#fff",
                borderRadius: 8,
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                padding: "16px 0",
                position: "sticky",
                top: 0,
                zIndex: 10,
              }}
            >
              {menuTabs.map((tab) => (
                <span
                  key={tab.key}
                  style={{
                    cursor: "pointer",
                    color: activeMenu === tab.key ? "#198754" : "#222",
                    fontWeight: 600,
                    fontSize: 17,
                    borderBottom:
                      activeMenu === tab.key ? "2.5px solid #198754" : "none",
                    paddingBottom: 4,
                    transition: "all 0.2s",
                  }}
                  onClick={() => handleMenuClick(tab.key)}
                >
                  {tab.label}
                </span>
              ))}
            </div>
          );
        })()}
        {/* Các phần nội dung chi tiết có id tương ứng */}
        <div
          style={{
            margin: "32px auto 0 auto",
            background: "#fff",
            borderRadius: 8,
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            padding: "32px 40px",
          }}
        >
          <div id="mota" style={{ marginBottom: 32 }}>
            <h3
              style={{
                color: "#198754",
                fontWeight: 700,
                fontSize: 22,
                marginBottom: 16,
              }}
            >
              Mô tả
            </h3>
            {tabContent.mota}
          </div>
          <div id="thongso" style={{ marginBottom: 32 }}>
            <h3
              style={{
                color: "#198754",
                fontWeight: 700,
                fontSize: 22,
                marginBottom: 16,
              }}
            >
              Thông số
            </h3>
            {tabContent.thongso}
          </div>
          <div id="thanhphan" style={{ marginBottom: 32 }}>
            <h3
              style={{
                color: "#198754",
                fontWeight: 700,
                fontSize: 22,
                marginBottom: 16,
              }}
            >
              Thành phần
            </h3>
            {tabContent.thanhphan}
          </div>
          <div id="cachdung" style={{ marginBottom: 32 }}>
            <h3
              style={{
                color: "#198754",
                fontWeight: 700,
                fontSize: 22,
                marginBottom: 16,
              }}
            >
              Cách dùng
            </h3>
            {tabContent.cachdung}
          </div>
          <div id="danhgia" style={{ marginBottom: 32 }}>
            <h3
              style={{
                color: "#198754",
                fontWeight: 700,
                fontSize: 22,
                marginBottom: 16,
              }}
            >
              Đánh giá
            </h3>
            {tabContent.danhgia}
          </div>
          <div id="hoidap">
            <h3
              style={{
                color: "#198754",
                fontWeight: 700,
                fontSize: 22,
                marginBottom: 16,
              }}
            >
              Hỏi đáp
            </h3>
            {tabContent.hoidap}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductDetail;
