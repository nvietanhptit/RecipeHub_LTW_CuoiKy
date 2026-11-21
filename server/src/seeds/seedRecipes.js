import "dotenv/config";
import mongoose from "mongoose";
import User from "../models/User.js";
import Category from "../models/Category.js";
import Recipe from "../models/Recipe.js";

const run = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Đã kết nối MongoDB");

  const author = await User.findOne({ email: "a@gmail.com" });
  if (!author) {
    throw new Error(
      "Không tìm thấy user a@gmail.com, hãy đăng ký tài khoản này trước",
    );
  }

  const mainCourse = await Category.findOne({ name: "Món chính" });
  const soup = await Category.findOne({ name: "Món canh" });
  if (!mainCourse || !soup) {
    throw new Error(
      "Chưa có categories, hãy chạy npm run seed:categories trước",
    );
  }

  await Recipe.deleteMany({});
  console.log("Đã xóa recipes cũ");

  const recipes = [
    {
      name: "Trứng chiên",
      description: "Món ăn đơn giản, nhanh gọn cho bữa cơm hàng ngày",
      category: mainCourse._id,
      cookTime: 10,
      difficulty: "easy",
      servings: 2,
      ingredients: [
        { name: "Trứng gà", quantity: "3", unit: "quả" },
        { name: "Hành lá", quantity: "2", unit: "nhánh" },
        { name: "Muối", quantity: "0.5", unit: "thìa cà phê" },
      ],
      steps: [
        { order: 1, content: "Đập trứng ra bát, thêm muối và hành lá cắt nhỏ" },
        { order: 2, content: "Đánh tan trứng" },
        {
          order: 3,
          content: "Đổ trứng vào chảo dầu nóng, chiên 2 mặt vàng đều",
        },
      ],
      author: author._id,
      status: "approved",
    },
    {
      name: "Canh chua cá lóc",
      description: "Canh chua đặc trưng miền Tây Nam Bộ",
      category: soup._id,
      cookTime: 40,
      difficulty: "medium",
      servings: 4,
      ingredients: [
        { name: "Cá lóc", quantity: "500", unit: "gram" },
        { name: "Me chua", quantity: "50", unit: "gram" },
        { name: "Dứa", quantity: "0.5", unit: "quả" },
        { name: "Cà chua", quantity: "2", unit: "quả" },
        { name: "Giá đỗ", quantity: "100", unit: "gram" },
      ],
      steps: [
        { order: 1, content: "Sơ chế cá, cắt khúc vừa ăn" },
        { order: 2, content: "Nấu nước me chua, cho cà chua, dứa vào đun sôi" },
        { order: 3, content: "Cho cá vào nấu chín, nêm nếm vừa ăn" },
        { order: 4, content: "Thêm giá đỗ, tắt bếp" },
      ],
      author: author._id,
      status: "approved",
    },
    {
      name: "Thịt kho tàu",
      description: "Món kho truyền thống ngày Tết",
      category: mainCourse._id,
      cookTime: 60,
      difficulty: "medium",
      servings: 4,
      ingredients: [
        { name: "Thịt ba chỉ", quantity: "500", unit: "gram" },
        { name: "Trứng vịt", quantity: "4", unit: "quả" },
        { name: "Nước dừa", quantity: "1", unit: "lít" },
        { name: "Nước mắm", quantity: "3", unit: "thìa canh" },
      ],
      steps: [
        { order: 1, content: "Thịt cắt miếng vuông, ướp với nước mắm" },
        { order: 2, content: "Luộc trứng, bóc vỏ" },
        { order: 3, content: "Kho thịt với nước dừa đến khi mềm" },
        { order: 4, content: "Cho trứng vào, kho thêm 15 phút" },
      ],
      author: author._id,
      status: "pending",
    },
  ];

  await Recipe.insertMany(recipes);
  console.log(`Đã thêm ${recipes.length} recipes mẫu`);

  await mongoose.disconnect();
  process.exit(0);
};

run().catch((err) => {
  console.error("Lỗi khi seed:", err);
  process.exit(1);
});
