import { body, param } from "express-validator";

export const categoryRules = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Tên loại món phải từ 2 đến 50 ký tự"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Mô tả tối đa 200 ký tự"),
];

export const idParamRule = [
  param("id").isMongoId().withMessage("ID không hợp lệ"),
];
