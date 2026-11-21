import * as categoryService from "../services/categoryService.js";

export const getCategories = async (req, res) => {
  const categories = await categoryService.getCategories();
  res.status(200).json({ categories });
};

export const createCategory = async (req, res) => {
  const { name, description } = req.body;
  const category = await categoryService.createCategory({ name, description });
  res.status(201).json({ category });
};

export const updateCategory = async (req, res) => {
  const { name, description } = req.body;
  const category = await categoryService.updateCategory(req.params.id, {
    name,
    description,
  });
  res.status(200).json({ category });
};

export const deleteCategory = async (req, res) => {
  await categoryService.deleteCategory(req.params.id);
  res.status(200).json({ message: "Đã xóa loại món" });
};
