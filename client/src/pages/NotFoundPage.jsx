import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="py-16 text-center">
      <p className="text-6xl font-bold text-green-600">404</p>
      <h1 className="mt-4 text-2xl font-semibold">Không tìm thấy trang</h1>
      <p className="mt-2 text-stone-600">
        Đường dẫn bạn truy cập không tồn tại.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-md bg-green-600 px-5 py-2 font-medium text-white hover:bg-green-700"
      ></Link>
    </div>
  );
}
