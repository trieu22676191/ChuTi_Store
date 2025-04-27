import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import { useParams } from "react-router-dom";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
=======
import { useParams, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, Button, Alert } from "react-bootstrap";
import { useCart } from "../context/CartContext";
>>>>>>> ef91ccb (Trieu push: fix Header va xu ly gio hang)

const mockVariants = [
  { name: "V6 PUFFER", img: "/img/San Pham/SP1.jpg" },
  { name: "V6 BLUE DREAM LOVE EDITION", img: "/img/San Pham/SP2.jpg" },
  { name: "V6 BLUE DREAM", img: "/img/San Pham/SP3.jpg" },
  { name: "TÚI QUÀ XINH", img: "/img/San Pham/SP4.jpg" },
  { name: "V6 GREEN", img: "/img/San Pham/SP5.jpg" },
  { name: "V6 GREEN HOLIDAY", img: "/img/San Pham/SP6.jpg" },
  { name: "V6 SIREN", img: "/img/San Pham/SP7.jpg" },
  { name: "V6 SIREN HOLIDAY", img: "/img/San Pham/SP8.jpg" },
];

const mockThumbs = [
  "/img/San Pham/SP1.jpg",
  "/img/San Pham/SP2.jpg",
  "/img/San Pham/SP3.jpg",
  "/img/San Pham/SP4.jpg",
];

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [mainImg, setMainImg] = useState("");
<<<<<<< HEAD

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then(res => res.json())
      .then(data => {
=======
  const [successMsg, setSuccessMsg] = useState("");
  const { cart, setCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
>>>>>>> ef91ccb (Trieu push: fix Header va xu ly gio hang)
        setProduct(data);
        setMainImg(data.image);
      });
  }, [id]);

  const formatPrice = (price) =>
    price?.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  // Sử dụng mockVariants cho cả ảnh phụ và lựa chọn bên phải
<<<<<<< HEAD
  const thumbs = mockVariants.map(v => v.img);
=======
  const thumbs = mockVariants.map((v) => v.img);

  // Thêm vào giỏ hàng
  const handleAddToCart = () => {
    const isLoggedIn = !!localStorage.getItem("loggedInUser");
    if (!isLoggedIn) {
      alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!");
      navigate("/login", { state: { showLogin: true } });
      return;
    }

    const variant = mockVariants[selectedVariant];
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      discount: product.discount,
      image: variant.img,
      variant: variant.name,
      quantity,
    };

    const existingIndex = cart.findIndex(
      (item) => item.id === cartItem.id && item.variant === cartItem.variant
    );
    let newCart = [...cart];
    if (existingIndex !== -1) {
      newCart[existingIndex].quantity += quantity;
    } else {
      newCart.push(cartItem);
    }
    setCart(newCart);
    setSuccessMsg("Đã thêm vào giỏ hàng!");

    // Ẩn thông báo sau 2 giây
    setTimeout(() => setSuccessMsg(""), 2000);
  };
>>>>>>> ef91ccb (Trieu push: fix Header va xu ly gio hang)

  if (!product) return <div>Đang tải...</div>;

  return (
<<<<<<< HEAD
    <Container fluid className="px-4 py-4" style={{display:'flex', justifyContent:'center'}}>
      <div style={{width:'90%', margin:'0 auto'}}>
        {/* Navbar giữ nguyên như Home.jsx */}
=======
    <Container
      fluid
      className="px-4 py-4"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div style={{ width: "90%", margin: "0 auto" }}>
>>>>>>> ef91ccb (Trieu push: fix Header va xu ly gio hang)
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
<<<<<<< HEAD
                "DERMAHAIR"
=======
                "DERMAHAIR",
>>>>>>> ef91ccb (Trieu push: fix Header va xu ly gio hang)
              ].map((item, index) => (
                <Nav.Link key={index} href="#" className="custom-nav-link">
                  {item}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
<<<<<<< HEAD

        <div style={{display: 'flex', gap: 32, marginTop: 32, alignItems: 'flex-start', justifyContent:'center'}}>
          {/* Cột trái: Ảnh sản phẩm và ảnh nhỏ */}
          <div style={{flex: '0 0 420px'}}>
            <div style={{width:'100%', height:420, background:'#fff', borderRadius:8, border:'1px solid #eee', display:'flex', alignItems:'center', justifyContent:'center'}}>
              <img 
                src={mainImg} 
                alt={product.name} 
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  background: '#fff',
                  borderRadius: 8
                }} 
              />
            </div>
            <div style={{display: 'flex', gap: 8, marginTop: 12}}>
=======
        {successMsg && (
          <Alert
            variant="success"
            style={{
              position: "fixed",
              top: 80,
              right: 40,
              zIndex: 9999,
              minWidth: 250,
              fontWeight: 600,
            }}
          >
            {successMsg}
          </Alert>
        )}
        <div
          style={{
            display: "flex",
            gap: 32,
            marginTop: 32,
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          {/* Cột trái: Ảnh sản phẩm và ảnh nhỏ */}
          <div style={{ flex: "0 0 420px" }}>
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
>>>>>>> ef91ccb (Trieu push: fix Header va xu ly gio hang)
              {thumbs.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt="thumb"
                  style={{
                    width: 60,
                    height: 60,
<<<<<<< HEAD
                    objectFit: 'cover',
                    borderRadius: 4,
                    border: selectedVariant===idx ? '2px solid #e53935' : '1px solid #eee',
                    cursor: 'pointer'
=======
                    objectFit: "cover",
                    borderRadius: 4,
                    border:
                      selectedVariant === idx
                        ? "2px solid #e53935"
                        : "1px solid #eee",
                    cursor: "pointer",
>>>>>>> ef91ccb (Trieu push: fix Header va xu ly gio hang)
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
<<<<<<< HEAD
          <div style={{flex: 1, background: '#fff', borderRadius: 8, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.05)'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8}}>
              <span style={{background:'#e53935', color:'#fff', fontWeight:600, borderRadius:4, padding:'2px 8px', fontSize:13}}>NEW</span>
              <span style={{background:'#198754', color:'#fff', fontWeight:600, borderRadius:4, padding:'2px 8px', fontSize:13}}>BEST</span>
              <span style={{background:'#1976d2', color:'#fff', fontWeight:600, borderRadius:4, padding:'2px 8px', fontSize:13}}>FREESHIP HCM</span>
            </div>
            <h2 style={{fontWeight: 700, fontSize: 22, margin: '8px 0 8px'}}>{product.name}</h2>
            <div style={{display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8}}>
              <span style={{color: '#f59e42', fontWeight: 600}}>★ 4.9</span>
=======
          <div
            style={{
              flex: 1,
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
>>>>>>> ef91ccb (Trieu push: fix Header va xu ly gio hang)
              <span>11 đánh giá</span>
              <span>2 Hỏi đáp</span>
              <span>{product.soldCount?.toLocaleString()} Đã bán</span>
            </div>
<<<<<<< HEAD
            <div style={{fontSize: 28, fontWeight: 700, color: '#e53935', margin: '8px 0'}}>
              15,000₫ - {formatPrice(product.price * (1 - product.discount/100))}
              <span style={{fontSize: 16, color: '#888', textDecoration: 'line-through', marginLeft: 12}}>{formatPrice(product.price)}</span>
              <span style={{fontSize: 16, color: '#e53935', marginLeft: 8}}>-{product.discount}%</span>
              <span style={{background:'#ff9800', color:'#fff', fontWeight:600, borderRadius:4, padding:'2px 8px', fontSize:13, marginLeft:12}}>GIFT</span>
            </div>
            <div style={{display:'flex', gap:8, flexWrap:'wrap', margin:'16px 0'}}>
              {mockVariants.map((v, idx) => (
                <Button
                  key={idx}
                  variant={selectedVariant===idx?"danger":"outline-secondary"}
                  size="sm"
                  style={{fontWeight:600, minWidth:120, marginBottom:8, border:selectedVariant===idx?'2px solid #e53935':''}}
                  onClick={()=>{
=======
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
              {mockVariants.map((v, idx) => (
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
>>>>>>> ef91ccb (Trieu push: fix Header va xu ly gio hang)
                    setSelectedVariant(idx);
                    setMainImg(v.img);
                  }}
                >
                  {v.name}
                </Button>
              ))}
            </div>
<<<<<<< HEAD
            <div style={{marginBottom: 16}}>
              <b>Số lượng:</b>
              <Button variant="outline-secondary" size="sm" style={{marginLeft:8, marginRight:4}} onClick={()=>setQuantity(q=>q>1?q-1:1)}>-</Button>
              <input type="number" min={1} value={quantity} onChange={e => setQuantity(Number(e.target.value))} style={{width: 60, borderRadius: 4, border: '1px solid #ccc', padding: 4, textAlign:'center'}} />
              <Button variant="outline-secondary" size="sm" style={{marginLeft:4}} onClick={()=>setQuantity(q=>q+1)}>+</Button>
            </div>
            <div style={{display:'flex', gap:12, marginBottom:16}}>
              <Button style={{background: '#e53935', border:'none', fontWeight:700, fontSize:16, padding:'12px 24px'}}>
                Mua Ngay Online
              </Button>
              <Button style={{background: '#fff', color:'#e53935', border:'1px solid #e53935', fontWeight:700, fontSize:16, padding:'12px 24px'}}>
                Thêm vào giỏ
              </Button>
              <Button style={{background: '#8d1919', color:'#fff', border:'none', fontWeight:700, fontSize:16, padding:'12px 24px'}}>
                chi nhánh còn hàng
              </Button>
            </div>
            <div style={{marginBottom: 16, color: '#198754', fontWeight: 600}}>
              <span style={{background:'#e3fcec', color:'#198754', padding:'4px 12px', borderRadius: 4, fontWeight: 600}}>
                Miễn phí thanh toán
              </span>
              <div style={{marginTop:8, display:'flex', gap:8}}>
                <img src="/img/payment/vnpay.png" alt="vnpay" style={{height:28}} />
                <img src="/img/payment/shopeepay.png" alt="shopeepay" style={{height:28}} />
                <img src="/img/payment/zalopay.png" alt="zalopay" style={{height:28}} />
                <img src="/img/payment/momo.png" alt="momo" style={{height:28}} />
              </div>
            </div>
            <div style={{background: '#f8f9fa', border: '1px solid #eee', borderRadius: 6, padding: 12, marginBottom: 16}}>
              <b>Quà tặng chỉ áp dụng cho dòng V6 PUFFER</b>
              <div>1 Scrunchies + 1 túi PUFFER màu bất kỳ</div>
              <div style={{color:'#e53935', fontWeight:600, fontSize:13}}>Số lượng có hạn</div>
=======
            <div style={{ marginBottom: 16 }}>
              <b>Số lượng:</b>
              <Button
                variant="outline-secondary"
                size="sm"
                style={{ marginLeft: 8, marginRight: 4 }}
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
            <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
              <Button
                style={{
                  background: "#e53935",
                  border: "none",
                  fontWeight: 700,
                  fontSize: 16,
                  padding: "12px 24px",
                }}
              >
                Mua Ngay Online
              </Button>
              <Button
                style={{
                  background: "#fff",
                  color: "#e53935",
                  border: "1px solid #e53935",
                  fontWeight: 700,
                  fontSize: 16,
                  padding: "12px 24px",
                }}
                onClick={handleAddToCart}
              >
                Thêm vào giỏ
              </Button>
              <Button
                style={{
                  background: "#8d1919",
                  color: "#fff",
                  border: "none",
                  fontWeight: 700,
                  fontSize: 16,
                  padding: "12px 24px",
                }}
              >
                chi nhánh còn hàng
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
              <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                <img
                  src="/img/payment/vnpay.png"
                  alt="vnpay"
                  style={{ height: 28 }}
                />
                <img
                  src="/img/payment/shopeepay.png"
                  alt="shopeepay"
                  style={{ height: 28 }}
                />
                <img
                  src="/img/payment/zalopay.png"
                  alt="zalopay"
                  style={{ height: 28 }}
                />
                <img
                  src="/img/payment/momo.png"
                  alt="momo"
                  style={{ height: 28 }}
                />
              </div>
            </div>
            <div
              style={{
                background: "#f8f9fa",
                border: "1px solid #eee",
                borderRadius: 6,
                padding: 12,
                marginBottom: 16,
              }}
            >
              <b>Quà tặng chỉ áp dụng cho dòng V6 PUFFER</b>
              <div>1 Scrunchies + 1 túi PUFFER màu bất kỳ</div>
              <div style={{ color: "#e53935", fontWeight: 600, fontSize: 13 }}>
                Số lượng có hạn
              </div>
>>>>>>> ef91ccb (Trieu push: fix Header va xu ly gio hang)
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

<<<<<<< HEAD
export default ProductDetail; 
=======
export default ProductDetail;
>>>>>>> ef91ccb (Trieu push: fix Header va xu ly gio hang)
