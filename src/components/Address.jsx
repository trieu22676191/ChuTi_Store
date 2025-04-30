import React, { useState, useEffect } from "react";
import { Container, Button, Modal, Form, Row, Col } from "react-bootstrap";
import addressData from "../data/address.json";

const Address = () => {
  // States
  const [addresses, setAddresses] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  // Modal handlers
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Xử lý khi chọn thành phố
  const handleCityChange = (e) => {
    const cityCode = e.target.value;
    setSelectedCity(cityCode);

    const selectedCityData = addressData.find((city) => city.Code === cityCode);
    if (selectedCityData) {
      setDistricts(selectedCityData.District);
    } else {
      setDistricts([]);
    }
    setSelectedDistrict("");
    setWards([]);
  };

  // Xử lý khi chọn quận/huyện
  const handleDistrictChange = (e) => {
    const districtCode = e.target.value;
    setSelectedDistrict(districtCode);

    const selectedCityData = addressData.find(
      (city) => city.Code === selectedCity
    );
    if (selectedCityData) {
      const selectedDistrictData = selectedCityData.District.find(
        (district) => district.Code === districtCode
      );
      if (selectedDistrictData) {
        setWards(selectedDistrictData.Ward);
      } else {
        setWards([]);
      }
    }
  };

  // Thêm useEffect để load dữ liệu từ localStorage khi component mount
  useEffect(() => {
    const savedAddresses = localStorage.getItem("addresses");
    if (savedAddresses) {
      setAddresses(JSON.parse(savedAddresses));
    }
  }, []);

  // Sửa lại handleSubmit để lưu vào localStorage
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const cityData = addressData.find(
      (city) => city.Code === formData.get("city")
    );
    const districtData = cityData?.District.find(
      (district) => district.Code === formData.get("district")
    );
    const wardData = districtData?.Ward.find(
      (ward) => ward.Code === formData.get("ward")
    );

    const newAddress = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      city: cityData?.FullName || "",
      district: districtData?.FullName || "",
      ward: wardData?.FullName || "",
      isDefault: addresses.length === 0,
    };

    const updatedAddresses = [...addresses, newAddress];
    setAddresses(updatedAddresses);

    // Lưu vào localStorage
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));

    handleClose();
  };

  // Thêm hàm xóa địa chỉ
  const handleDelete = (index) => {
    const updatedAddresses = addresses.filter((_, idx) => idx !== index);
    setAddresses(updatedAddresses);
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">Sổ địa chỉ</h2>

      {/* Add new address section */}
      <div className="mb-4">
        <p className="mb-2">Bạn muốn giao hàng đến địa chỉ khác?</p>
        <Button
          variant="success"
          onClick={handleShow}
          style={{ backgroundColor: "#198754", border: "none" }}
        >
          Thêm địa chỉ mới
        </Button>
      </div>

      {/* Address list */}
      <div className="address-list">
        {addresses.map((address, index) => (
          <div
            key={index}
            className="address-item p-3 mb-3"
            style={{
              border: "1px solid #dee2e6",
              borderRadius: "8px",
              backgroundColor: "#fff",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <div className="d-flex justify-content-between mb-2">
              <div>
                <strong>{address.name}</strong>
                {address.isDefault && (
                  <span className="ms-2 badge bg-success">Mặc định</span>
                )}
              </div>
              <div>
                <Button variant="link" className="text-success p-0 me-3">
                  Sửa
                </Button>
                <Button
                  variant="link"
                  className="text-danger p-0"
                  onClick={() => handleDelete(index)}
                >
                  Xóa
                </Button>
              </div>
            </div>
            <div className="text-secondary mb-1">{address.phone}</div>
            <div className="mb-1">{address.address}</div>
            <div className="text-secondary">
              {`${address.ward}, ${address.district}, ${address.city}`}
            </div>
          </div>
        ))}
      </div>

      {/* Add address modal */}
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Thêm địa chỉ mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Tên:</Form.Label>
              <Form.Control type="text" name="name" required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control type="tel" name="phone" required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tỉnh/Thành phố</Form.Label>
              <Form.Select
                name="city"
                required
                value={selectedCity}
                onChange={handleCityChange}
              >
                <option value="">Vui lòng chọn tỉnh/thành phố</option>
                {addressData.map((city) => (
                  <option key={city.Code} value={city.Code}>
                    {city.FullName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quận/Huyện</Form.Label>
              <Form.Select
                name="district"
                required
                value={selectedDistrict}
                onChange={handleDistrictChange}
                disabled={!selectedCity}
              >
                <option value="">Vui lòng chọn quận/huyện</option>
                {districts.map((district) => (
                  <option key={district.Code} value={district.Code}>
                    {district.FullName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phường/Xã</Form.Label>
              <Form.Select name="ward" required disabled={!selectedDistrict}>
                <option value="">Vui lòng chọn phường/xã</option>
                {wards.map((ward) => (
                  <option key={ward.Code} value={ward.Code}>
                    {ward.FullName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Địa chỉ nhận hàng</Form.Label>
              <Form.Control
                type="text"
                name="address"
                required
                placeholder="Số nhà + tên đường"
              />
            </Form.Group>

            <div className="mt-4">
              <small className="text-muted">
                ChuTi sẽ liên hệ số điện thoại này để giao hàng đến bạn và kiểm
                tra tình trạng đơn hàng, đổi trả hàng khi cần.
              </small>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-3">
              <Button variant="secondary" onClick={handleClose}>
                Hủy
              </Button>
              <Button variant="success" type="submit">
                Cập nhật
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Address;
