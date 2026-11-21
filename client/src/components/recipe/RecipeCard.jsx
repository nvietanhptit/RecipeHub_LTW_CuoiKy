import { Link } from "react-router-dom";
import { Clock, Star } from "lucide-react";
import { DIFFICULTY_LABELS } from "../../utils/constants";

export default function RecipeCard({ recipe }) {
  return (
    <Link
      to={`/recipes/${recipe._id}`}
      className="group block overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="aspect-video w-full overflow-hidden bg-stone-100">
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-stone-400">
            Chưa có ảnh
          </div>
        )}
      </div>

      <div className="space-y-2 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-green-700">
          {recipe.category?.name}
        </p>
        <h3 className="line-clamp-1 font-semibold text-stone-800">
          {recipe.name}
        </h3>

        <div className="flex items-center justify-between text-sm text-stone-500">
          <span className="flex items-center gap-1">
            <Clock size={14} aria-hidden="true" />
            {recipe.cookTime} phút
          </span>
          <span>{DIFFICULTY_LABELS[recipe.difficulty]}</span>
          <span className="flex items-center gap-1">
            <Star
              size={14}
              className="fill-yellow-400 text-yellow-400"
              aria-hidden="true"
            />
            {recipe.ratingAverage.toFixed(1)} ({recipe.ratingCount})
          </span>
        </div>
      </div>
    </Link>
  );
}
