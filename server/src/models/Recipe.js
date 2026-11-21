import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Vui lòng nhập tên nguyên liệu"],
    trim: true,
  },
  quantity: {
    type: String,
    required: [true, "Vui lòng nhập số lượng"],
    trim: true,
  },
  unit: {
    type: String,
    trim: true,
    default: "",
  },
});

const stepSchema = new mongoose.Schema({
  order: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: [true, "Vui lòng nhập nội dung bước"],
    trim: true,
  },
});

const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Vui lòng nhập tên món ăn"],
      trim: true,
      minlength: [3, "Tên món ăn phải có ít nhất 3 ký tự"],
      maxlength: [100, "Tên món ăn tối đa 100 ký tự"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Mô tả tối đa 500 ký tự"],
      default: "",
    },
    image: {
      type: String,
      default: "",
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Vui lòng chọn loại món"],
    },
    cookTime: {
      type: Number,
      required: [true, "Vui lòng nhập thời gian nấu"],
      min: [1, "Thời gian nấu phải lớn hơn 0"],
    },
    difficulty: {
      type: String,
      enum: {
        values: ["easy", "medium", "hard"],
        message: "Độ khó không hợp lệ",
      },
      required: [true, "Vui lòng chọn độ khó"],
    },
    servings: {
      type: Number,
      default: 2,
      min: [1, "Khẩu phần phải lớn hơn 0"],
    },
    ingredients: {
      type: [ingredientSchema],
      validate: {
        validator: (arr) => arr.length > 0,
        message: "Công thức phải có ít nhất 1 nguyên liệu",
      },
    },
    steps: {
      type: [stepSchema],
      validate: {
        validator: (arr) => arr.length > 0,
        message: "Công thức phải có ít nhất 1 bước nấu",
      },
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
    },

    ratingAverage: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

recipeSchema.index({ name: "text" });
recipeSchema.index({ category: 1, status: 1 });
recipeSchema.index({ status: 1, createdAt: -1 });

recipeSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model("Recipe", recipeSchema);
