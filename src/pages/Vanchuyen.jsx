import React from "react";
import { Container } from "react-bootstrap";

const Vanchuyen = () => {
  return (
    <Container style={{ marginTop: "20px", marginBottom: "20px" }}>
      <h1 style={{ color: "#198754", fontWeight: "bold", textAlign: "center", marginBottom: "30px" }}>
        Chính Sách Vận Chuyển
      </h1>
      <div style={{ lineHeight: "1.8", fontSize: "16px", color: "#333" }}>
        <h3 style={{ color: "#198754", fontWeight: "bold", marginBottom: "15px" }}>1. Phạm vi giao hàng</h3>
        <p>
          Chúng tôi hỗ trợ giao hàng trên toàn quốc. Dù bạn ở bất kỳ đâu, chúng tôi đều cố gắng giao hàng đến tận tay bạn
          một cách nhanh chóng và an toàn.
        </p>

        <h3 style={{ color: "#198754", fontWeight: "bold", marginBottom: "15px" }}>2. Thời gian giao hàng</h3>
        <p>
          - Khu vực nội thành: Giao hàng trong vòng 24 giờ kể từ khi đơn hàng được xác nhận.<br />
          - Khu vực ngoại thành và các tỉnh thành khác: Giao hàng trong vòng 2-5 ngày làm việc.
        </p>

        <h3 style={{ color: "#198754", fontWeight: "bold", marginBottom: "15px" }}>3. Phí vận chuyển</h3>
        <p>
          - Miễn phí vận chuyển cho đơn hàng từ 500.000đ trở lên.<br />
          - Đối với đơn hàng dưới 500.000đ, phí vận chuyển sẽ được tính dựa trên khoảng cách và trọng lượng của đơn hàng.
        </p>

        <h3 style={{ color: "#198754", fontWeight: "bold", marginBottom: "15px" }}>4. Quy trình giao hàng</h3>
        <p>
          - Sau khi đặt hàng thành công, bạn sẽ nhận được email hoặc tin nhắn xác nhận đơn hàng.<br />
          - Đơn hàng sẽ được xử lý và giao cho đơn vị vận chuyển.<br />
          - Bạn có thể theo dõi trạng thái đơn hàng thông qua mã vận đơn được cung cấp.
        </p>

        <h3 style={{ color: "#198754", fontWeight: "bold", marginBottom: "15px" }}>5. Lưu ý khi nhận hàng</h3>
        <p>
          - Vui lòng kiểm tra kỹ sản phẩm trước khi nhận hàng.<br />
          - Nếu phát hiện sản phẩm bị hư hỏng hoặc không đúng với đơn đặt hàng, bạn có thể từ chối nhận hàng và liên hệ
          với chúng tôi để được hỗ trợ.
        </p>

        <h3 style={{ color: "#198754", fontWeight: "bold", marginBottom: "15px" }}>6. Liên hệ hỗ trợ</h3>
        <p>
          Nếu bạn có bất kỳ thắc mắc nào về chính sách vận chuyển, vui lòng liên hệ với chúng tôi qua:<br />
          - Hotline: <b>1800 6324</b><br />
          - Email: <b>support@chuti.com</b>
        </p>
      </div>
    </Container>
  );
};

export default Vanchuyen;