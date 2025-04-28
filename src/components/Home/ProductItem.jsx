import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductItem = ({ product }) => {
  return (
    <Col xs={6} sm={4} md={3} lg={2} className="mb-3">
      <Link to={`/product/${product.id}`} className="product-link" onClick={() => window.scrollTo(0, 0)}>
        <Card className="product-card">
          <div className="product-image-container">
            <Card.Img variant="top" src={product.image} className="product-image card-img-top" />
            {product.discount > 0 && (
              <span className="discount-badge">-{product.discount}%</span>
            )}
          </div>
          <Card.Body>
            <div className="brand-name">{product.brand}</div>
            <Card.Title className="product-name">{product.name}</Card.Title>
            <div className="price-section">
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
            <div className="product-meta">
              <div className="rating">
                {[...Array(4)].map((_, i) => <i key={i} className="fas fa-star star-icon"></i>)}
                <i className="fas fa-star-half-alt star-icon"></i>
              </div>
              <div className="sales">Đã bán: {product.soldCount}</div>
            </div>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
};

export default ProductItem;