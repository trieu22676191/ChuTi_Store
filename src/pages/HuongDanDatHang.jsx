import React from "react";
import { Container } from "react-bootstrap";

const HuongDanDatHang = () => {
  return (
    <Container style={{ marginTop: "20px", marginBottom: "20px" }}>
      <h1 style={{ color: "#198754", fontWeight: "bold", textAlign: "center", marginBottom: "30px" }}>
        Hướng Dẫn Đặt Hàng
      </h1>
      <div style={{ lineHeight: "1.8", fontSize: "16px", color: "#333" }}>
        <h3 style={{ color: "#198754", fontWeight: "bold", marginBottom: "15px" }}>Bước 1: Tìm kiếm sản phẩm</h3>
        <p>
          Bạn có thể tìm kiếm sản phẩm bằng cách nhập từ khóa vào thanh tìm kiếm ở đầu trang hoặc duyệt qua các danh mục
          sản phẩm trên menu.
        </p>
        <img
          src="/img/HuongDanDatHang/tim-kiem-san-pham.png"
          alt="Tìm kiếm sản phẩm"
          style={{ width: "100%", borderRadius: "8px", marginBottom: "20px" }}
        />

        <h3 style={{ color: "#198754", fontWeight: "bold", marginBottom: "15px" }}>Bước 2: Thêm sản phẩm vào giỏ hàng</h3>
        <p>
          Khi đã tìm thấy sản phẩm mong muốn, nhấn vào nút <b>"Thêm vào giỏ hàng"</b>. Bạn có thể xem lại giỏ hàng của
          mình bằng cách nhấn vào biểu tượng giỏ hàng ở góc trên bên phải.
        </p>
        <img
          src="/img/HuongDanDatHang/them-vao-gio-hang.png"
          alt="Thêm vào giỏ hàng"
          style={{ width: "100%", borderRadius: "8px", marginBottom: "20px" }}
        />

        <h3 style={{ color: "#198754", fontWeight: "bold", marginBottom: "15px" }}>Bước 3: Kiểm tra giỏ hàng</h3>
        <p>
          Truy cập vào giỏ hàng để kiểm tra lại các sản phẩm bạn đã chọn. Tại đây, bạn có thể thay đổi số lượng hoặc xóa
          sản phẩm nếu cần.
        </p>
        <img
          src="/img/HuongDanDatHang/kiem-tra-gio-hang.png"
          alt="Kiểm tra giỏ hàng"
          style={{ width: "100%", borderRadius: "8px", marginBottom: "20px" }}
        />

        <h3 style={{ color: "#198754", fontWeight: "bold", marginBottom: "15px" }}>Bước 4: Tiến hành thanh toán</h3>
        <p>
          Nhấn vào nút <b>"Thanh toán"</b> để tiến hành đặt hàng. Điền đầy đủ thông tin giao hàng và chọn phương thức
          thanh toán phù hợp.
        </p>
        <img
          src="/img/HuongDanDatHang/thanh-toan.png"
          alt="Thanh toán"
          style={{ width: "100%", borderRadius: "8px", marginBottom: "20px" }}
        />

        <h3 style={{ color: "#198754", fontWeight: "bold", marginBottom: "15px" }}>Bước 5: Xác nhận đơn hàng</h3>
        <p>
          Sau khi hoàn tất thanh toán, hệ thống sẽ gửi email xác nhận đơn hàng đến bạn. Bạn có thể kiểm tra trạng thái
          đơn hàng trong mục <b>"Đơn hàng của tôi"</b>.
        </p>
        <img
          src="/img/HuongDanDatHang/xac-nhan-don-hang.png"
          alt="Xác nhận đơn hàng"
          style={{ width: "100%", borderRadius: "8px", marginBottom: "20px" }}
        />
      </div>
    </Container>
  );
};

export default HuongDanDatHang;