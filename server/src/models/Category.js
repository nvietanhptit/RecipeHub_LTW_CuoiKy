import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Vui lòng nhập tên loại món"],
      trim: true,
      minlength: [2, "Tên loại món phải có ít nhất 2 ký tự"],
      maxlength: [50, "Tên loại món tối đa 50 ký tự"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [200, "Mô tả tối đa 200 ký tự"],
      default: "",
    },
  },
  { timestamps: true },
);

categorySchema.index(
  { name: 1 },
  { unique: true, collation: { locale: "vi", strength: 2 } },
);

categorySchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model("Category", categorySchema);
