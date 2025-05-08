import { useState, useEffect } from "react";
import axios from "axios";

const userId = 1; // Thay bằng userId thực tế

export default function useFavorite() {
  const [favoriteIds, setFavoriteIds] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/likeproduct?userId=${userId}`)
      .then(res => setFavoriteIds(res.data.map(item => item.productId)));
  }, []);

  const addFavorite = async (productId) => {
    await axios.post("http://localhost:3000/likeproduct", { userId, productId });
    setFavoriteIds(prev => [...prev, productId]);
  };

  const removeFavorite = async (productId) => {
    const res = await axios.get(`http://localhost:3000/likeproduct?userId=${userId}&productId=${productId}`);
    if (res.data.length > 0) {
      await axios.delete(`http://localhost:3000/likeproduct/${res.data[0].id}`);
      setFavoriteIds(prev => prev.filter(id => id !== productId));
    }
  };

  return { favoriteIds, addFavorite, removeFavorite };
}
