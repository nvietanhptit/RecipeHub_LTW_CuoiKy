import Category from "../models/Category.js";
import ApiError from "../utils/ApiError.js";

export const getCategories = async () => {
  return Category.find().sort({ name: 1 }).collation({ locale: "vi" });
};

export const createCategory = async ({ name, description }) => {
  return Category.create({ name, description });
};

export const updateCategory = async (id, { name, description }) => {
  const category = await Category.findById(id);
  if (!category) {
    throw new ApiError(404, "Không tìm thấy loại món");
  }

  category.name = name;
  category.description = description ?? "";
  await category.save();
  return category;
};

export const deleteCategory = async (id) => {
  const category = await Category.findById(id);
  if (!category) {
    throw new ApiError(404, "Không tìm thấy loại món");
  }

  await category.deleteOne();
};
