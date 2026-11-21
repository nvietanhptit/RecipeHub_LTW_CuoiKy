import Recipe from "../models/Recipe.js";
import ApiError from "../utils/ApiError.js";

export const getRecipes = async ({ page = 1, limit = 10 }) => {
  const pageNumber = Number(page) || 1;
  const limitNumber = Number(limit) || 10;
  const skip = (pageNumber - 1) * limitNumber;

  const filter = { status: "approved" };

  const [recipes, total] = await Promise.all([
    Recipe.find(filter)
      .select(
        "name image category cookTime difficulty ratingAverage ratingCount createdAt",
      )
      .populate("category", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber),
    Recipe.countDocuments(filter),
  ]);

  return {
    recipes,
    pagination: {
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPages: Math.ceil(total / limitNumber),
    },
  };
};

export const getRecipeById = async (id) => {
  const recipe = await Recipe.findOne({ _id: id, status: "approved" })
    .populate("category", "name")
    .populate("author", "name");

  if (!recipe) {
    throw new ApiError(404, "Không tìm thấy công thức");
  }

  return recipe;
};

export const getPendingRecipes = async () => {
  return Recipe.find({ status: "pending" })
    .select("name image category cookTime difficulty author createdAt")
    .populate("category", "name")
    .populate("author", "name email")
    .sort({ createdAt: 1 });
};

export const approveRecipe = async (id) => {
  const recipe = await Recipe.findById(id);
  if (!recipe) {
    throw new ApiError(404, "Không tìm thấy công thức");
  }
  if (recipe.status === "approved") {
    throw new ApiError(409, "Công thức đã được duyệt");
  }

  recipe.status = "approved";
  await recipe.save();
  return recipe;
};

export const rejectRecipe = async (id) => {
  const recipe = await Recipe.findById(id);
  if (!recipe) {
    throw new ApiError(404, "Không tìm thấy công thức");
  }

  await recipe.deleteOne();
};
