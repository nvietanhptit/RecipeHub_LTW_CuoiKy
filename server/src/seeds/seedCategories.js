import "dotenv/config";
import mongoose from "mongoose";
import Category from "../models/Category.js";

const categories = [
  { name: "Món chính", description: "Các món ăn chính trong bữa cơm" },
  { name: "Món canh", description: "Canh, súp các loại" },
  { name: "Món khai vị", description: "Món ăn nhẹ mở đầu bữa ăn" },
  { name: "Món chay", description: "Các món không dùng thịt, cá" },
  { name: "Tráng miệng", description: "Bánh, chè, trái cây tráng miệng" },
  { name: "Đồ uống", description: "Nước ép, sinh tố, trà" },
];

const run = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Đã kết nối MongoDB");

  await Category.deleteMany({});
  console.log("Đã xóa categories cũ");

  await Category.insertMany(categories);
  console.log(`Đã thêm ${categories.length} categories mẫu`);

  await mongoose.disconnect();
  process.exit(0);
};

run().catch((err) => {
  console.error("Lỗi khi seed:", err);
  process.exit(1);
});
