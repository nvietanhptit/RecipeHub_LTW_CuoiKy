import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import axiosInstance from "../../api/axiosInstance";
import { DIFFICULTY_LABELS } from "../../utils/constants";

export default function AdminRecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    let ignore = false;

    const fetchPending = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await axiosInstance.get("/recipes/pending");
        if (!ignore) setRecipes(res.data.recipes);
      } catch (err) {
        if (!ignore) {
          setError(err.response?.data?.message || "Không tải được danh sách");
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchPending();

    return () => {
      ignore = true;
    };
  }, []);

  const handleApprove = async (id) => {
    try {
      setActionError("");
      setProcessingId(id);
      await axiosInstance.patch(`/recipes/${id}/approve`);
      setRecipes((prev) => prev.filter((recipe) => recipe._id !== id));
    } catch (err) {
      setActionError(
        err.response?.data?.message || "Không duyệt được công thức",
      );
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id) => {
    const confirmed = window.confirm(
      "Từ chối sẽ XÓA VĨNH VIỄN công thức này. Bạn chắc chắn?",
    );
    if (!confirmed) return;

    try {
      setActionError("");
      setProcessingId(id);
      await axiosInstance.delete(`/recipes/${id}/reject`);
      setRecipes((prev) => prev.filter((recipe) => recipe._id !== id));
    } catch (err) {
      setActionError(
        err.response?.data?.message || "Không từ chối được công thức",
      );
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold text-stone-800">
        Công thức chờ duyệt
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

      {!loading && !error && recipes.length === 0 && (
        <p className="text-center text-stone-500">
          Không có công thức nào chờ duyệt
        </p>
      )}

      {!loading && !error && recipes.length > 0 && (
        <ul className="space-y-3">
          {recipes.map((recipe) => (
            <li
              key={recipe._id}
              className="flex flex-col gap-3 rounded-lg border border-stone-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold text-stone-800">{recipe.name}</p>
                <p className="text-sm text-stone-500">
                  {recipe.category?.name} · {recipe.cookTime} phút ·{" "}
                  {DIFFICULTY_LABELS[recipe.difficulty]}
                </p>
                <p className="text-sm text-stone-500">
                  Người đăng: {recipe.author?.name} ({recipe.author?.email})
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={processingId === recipe._id}
                  onClick={() => handleApprove(recipe._id)}
                  className="flex items-center gap-1 rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Check size={16} aria-hidden="true" />
                  Duyệt
                </button>
                <button
                  type="button"
                  disabled={processingId === recipe._id}
                  onClick={() => handleReject(recipe._id)}
                  className="flex items-center gap-1 rounded-md border border-red-300 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <X size={16} aria-hidden="true" />
                  Từ chối
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
