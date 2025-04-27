import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage khi khởi tạo
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  // Hàm cập nhật cart và localStorage
  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  // Tổng số lượng sản phẩm
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      const existingItem = newCart.find(
        (item) => item.id === product.id && item.variant === product.variant
      );

      if (existingItem) {
        // Nếu sản phẩm đã tồn tại, tăng số lượng
        existingItem.quantity += product.quantity || 1;
      } else {
        // Nếu sản phẩm chưa có, thêm mới
        newCart.push({
          ...product,
          quantity: product.quantity || 1,
        });
      }

      // Lưu vào localStorage
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart: updateCart,
        cartCount,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
