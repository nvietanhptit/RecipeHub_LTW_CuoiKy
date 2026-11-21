import { useEffect, useState } from "react";
import { Lock, Unlock } from "lucide-react";
import axiosInstance from "../../api/axiosInstance";
import useAuth from "../../hooks/useAuth";

const ROLE_LABELS = {
  user: "Thành viên",
  admin: "Admin",
};

export default function AdminUsersPage() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    let ignore = false;

    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await axiosInstance.get("/admin/users");
        if (!ignore) setUsers(res.data.users);
      } catch (err) {
        if (!ignore) {
          setError(err.response?.data?.message || "Không tải được danh sách");
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchUsers();

    return () => {
      ignore = true;
    };
  }, []);

  const toggleLock = async (targetUser) => {
    const action = targetUser.isActive ? "lock" : "unlock";

    try {
      setActionError("");
      setProcessingId(targetUser._id);
      const res = await axiosInstance.patch(
        `/admin/users/${targetUser._id}/${action}`,
      );
      setUsers((prev) =>
        prev.map((u) => (u._id === targetUser._id ? res.data.user : u)),
      );
    } catch (err) {
      setActionError(
        err.response?.data?.message || "Không cập nhật được tài khoản",
      );
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold text-stone-800">
        Quản lý tài khoản
      </h1>

      {loading && <p className="text-center text-stone-500">Đang tải...</p>}

      {!loading && error && (
        <p role="alert" className="text-center text-red-600">
          {error}
        </p>
      )}

      {actionError && (
        <p
          role="alert"
          className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {actionError}
        </p>
      )}

      {!loading && !error && (
        <div className="overflow-x-auto rounded-lg border border-stone-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-stone-200 bg-stone-50 text-stone-600">
              <tr>
                <th className="px-4 py-3">Họ tên</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Vai trò</th>
                <th className="px-4 py-3">Trạng thái</th>
                <th className="px-4 py-3">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const isSelf =
                  u._id === currentUser.id || u._id === currentUser._id;

                return (
                  <tr
                    key={u._id}
                    className="border-b border-stone-100 last:border-0"
                  >
                    <td className="px-4 py-3">{u.name}</td>
                    <td className="px-4 py-3">{u.email}</td>
                    <td className="px-4 py-3">{ROLE_LABELS[u.role]}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          u.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {u.isActive ? "Hoạt động" : "Đã khóa"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {isSelf ? (
                        <span className="text-xs text-stone-400">
                          Tài khoản của bạn
                        </span>
                      ) : (
                        <button
                          type="button"
                          disabled={processingId === u._id}
                          onClick={() => toggleLock(u)}
                          className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium disabled:cursor-not-allowed disabled:opacity-60 ${
                            u.isActive
                              ? "border border-red-300 text-red-600 hover:bg-red-50"
                              : "bg-green-600 text-white hover:bg-green-700"
                          }`}
                        >
                          {u.isActive ? (
                            <>
                              <Lock size={14} aria-hidden="true" />
                              Khóa
                            </>
                          ) : (
                            <>
                              <Unlock size={14} aria-hidden="true" />
                              Mở khóa
                            </>
                          )}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
