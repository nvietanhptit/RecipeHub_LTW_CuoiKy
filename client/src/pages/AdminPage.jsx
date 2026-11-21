import { Link } from "react-router-dom";
import { ClipboardList, Users } from "lucide-react";

export default function AdminPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-bold text-stone-800">Khu quản trị</h1>
      <p className="mt-2 text-stone-600">Chọn mục bạn muốn quản lý.</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link
          to="/admin/recipes"
          className="flex items-center gap-3 rounded-lg border border-stone-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
        >
          <ClipboardList className="text-green-700" aria-hidden="true" />
          <div>
            <p className="font-medium text-stone-800">Duyệt công thức</p>
            <p className="text-sm text-stone-500">
              Xem và xử lý công thức chờ duyệt
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-3 rounded-lg border border-dashed border-stone-300 p-4 text-stone-400">
          <Users aria-hidden="true" />
          <div>
            <p className="font-medium">
              {" "}
              <Link
                to="/admin/users"
                className="flex items-center gap-3 rounded-lg border border-stone-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <Users className="text-green-700" aria-hidden="true" />
                <div>
                  <p className="font-medium text-stone-800">
                    Quản lý tài khoản
                  </p>
                  <p className="text-sm text-stone-500">
                    Khóa hoặc mở khóa người dùng
                  </p>
                </div>
              </Link>
            </p>
            <p className="text-sm">Sẽ làm ở bước sau</p>
          </div>
        </div>
      </div>
    </section>
  );
}
