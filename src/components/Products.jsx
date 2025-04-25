import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Pagination, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { BsCart3 } from 'react-icons/bs';
import '../Css/Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 18; // 3 hàng x 6 sản phẩm

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  // Tính toán sản phẩm cho trang hiện tại
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Tính tổng số trang
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Xử lý khi click vào số trang
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 1250);
  };

  if (loading) {
    return (
      <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
        <Spinner animation="border" variant="success" />
      </Container>
    );
  }

  return (
    <Container fluid className="products-section">
      <h4 style={{color: "rgb(25, 135, 84)", fontWeight: "bold", fontSize: "20px", marginTop: "20px"}}>
        Danh Sách Sản Phẩm
      </h4>

      {/* Các hàng sản phẩm */}
      <Row className="products-grid">
        {currentProducts.map(product => (
          <Col key={product.id} xs={6} sm={4} md={3} lg={2}>
            <Link to={`/product/${product.id}`} className="product-link">
              <Card className="product-card">
                <div className="product-image-container">
                  <Card.Img variant="top" src={product.image} className="product-image" />
                  {product.discount > 0 && (
                    <span className="discount-badge">-{product.discount}%</span>
                  )}
                </div>
                <Card.Body>
                  <div className="brand-name">{product.brand}</div>
                  <Card.Title className="product-name">{product.name}</Card.Title>
                  <div className="price-container">
                    <span className="current-price">
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                      }).format(product.price * (1 - product.discount / 100))}
                    </span>
                    {product.discount > 0 && (
                      <span className="original-price">
                        {new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND'
                        }).format(product.price)}
                      </span>
                    )}
                  </div>
                  <div className="product-stats">
                    <div className="rating">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star-half-alt"></i>
                    </div>
                    <div className="sold-count">Đã bán: {product.soldCount}</div>
                  </div>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>

      {/* Phân trang */}
      <div className="d-flex justify-content-center mt-4 mb-4">
        <Pagination>
          <Pagination.Prev 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          
          <Pagination.Next 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
    </Container>
  );
};

export default Products;
