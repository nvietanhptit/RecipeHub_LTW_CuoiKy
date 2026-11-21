import * as recipeService from "../services/recipeService.js";

export const getRecipes = async (req, res) => {
  const { page, limit } = req.query;
  const result = await recipeService.getRecipes({ page, limit });
  res.status(200).json(result);
};

export const getRecipeById = async (req, res) => {
  const recipe = await recipeService.getRecipeById(req.params.id);
  res.status(200).json({ recipe });
};

export const getPendingRecipes = async (req, res) => {
  const recipes = await recipeService.getPendingRecipes();
  res.status(200).json({ recipes });
};

export const approveRecipe = async (req, res) => {
  const recipe = await recipeService.approveRecipe(req.params.id);
  res.status(200).json({ recipe });
};

export const rejectRecipe = async (req, res) => {
  await recipeService.rejectRecipe(req.params.id);
  res.status(200).json({ message: "Đã từ chối và xóa công thức" });
};
