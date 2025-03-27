export default function Header() {
    return (
      <div className="bg-blue-800 text-white p-4 flex justify-between items-center">
        <div className="text-lg font-bold">HASAKI.VN</div>
        <div className="flex gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">Tài khoản</button>
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">Hệ thống cửa hàng</button>
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">Hỗ trợ khách hàng</button>
        </div>
      </div>
    )
  }
  