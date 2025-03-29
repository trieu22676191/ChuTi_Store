import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!loggedInUser) {
    // Nếu chưa đăng nhập, chuyển về trang chủ
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
