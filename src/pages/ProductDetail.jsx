import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Nav, Navbar, Button } from "react-bootstrap";

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

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setMainImg(data.image);
      });
  }, [id]);

  const formatPrice = (price) =>
    price?.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  // Sử dụng mockVariants cho cả ảnh phụ và lựa chọn bên phải
  const thumbs = mockVariants.map(v => v.img);

  if (!product) return <div>Đang tải...</div>;

  return (
    <Container fluid className="px-4 py-4" style={{display:'flex', justifyContent:'center'}}>
      <div style={{width:'90%', margin:'0 auto'}}>
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
                "DERMAHAIR"
              ].map((item, index) => (
                <Nav.Link key={index} href="#" className="custom-nav-link">
                  {item}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Navbar>

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
              {thumbs.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt="thumb"
                  style={{
                    width: 60,
                    height: 60,
                    objectFit: 'cover',
                    borderRadius: 4,
                    border: selectedVariant===idx ? '2px solid #e53935' : '1px solid #eee',
                    cursor: 'pointer'
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
          <div style={{flex: 1, background: '#fff', borderRadius: 8, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.05)'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8}}>
              <span style={{background:'#e53935', color:'#fff', fontWeight:600, borderRadius:4, padding:'2px 8px', fontSize:13}}>NEW</span>
              <span style={{background:'#198754', color:'#fff', fontWeight:600, borderRadius:4, padding:'2px 8px', fontSize:13}}>BEST</span>
              <span style={{background:'#1976d2', color:'#fff', fontWeight:600, borderRadius:4, padding:'2px 8px', fontSize:13}}>FREESHIP HCM</span>
            </div>
            <h2 style={{fontWeight: 700, fontSize: 22, margin: '8px 0 8px'}}>{product.name}</h2>
            <div style={{display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8}}>
              <span style={{color: '#f59e42', fontWeight: 600}}>★ 4.9</span>
              <span>11 đánh giá</span>
              <span>2 Hỏi đáp</span>
              <span>{product.soldCount?.toLocaleString()} Đã bán</span>
            </div>
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
                    setSelectedVariant(idx);
                    setMainImg(v.img);
                  }}
                >
                  {v.name}
                </Button>
              ))}
            </div>
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
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductDetail; 