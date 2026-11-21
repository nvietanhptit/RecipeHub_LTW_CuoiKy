import { useState } from "react";
import useFetch from "../hooks/useFetch";
import RecipeCard from "../components/recipe/RecipeCard";
import Pagination from "../components/common/Pagination";

const PAGE_SIZE = 8;

export default function RecipesPage() {
  const [page, setPage] = useState(1);

  const { data, loading, error } = useFetch(
    `/recipes?page=${page}&limit=${PAGE_SIZE}`,
  );

  const handlePageChange = (nextPage) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold text-stone-800">
        Khám phá công thức
      </h1>

      {loading && (
        <p className="text-center text-stone-500">Đang tải công thức...</p>
      )}

      {!loading && error && (
        <p role="alert" className="text-center text-red-600">
          {error}
        </p>
      )}

      {!loading && !error && data?.recipes.length === 0 && (
        <p className="text-center text-stone-500">Chưa có công thức nào</p>
      )}

      {!loading && !error && data?.recipes.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {data.recipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>

          <Pagination
            page={data.pagination.page}
            totalPages={data.pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </section>
  );
}
