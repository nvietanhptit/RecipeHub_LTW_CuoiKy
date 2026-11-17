export const notFound = (req, res, next) => {
  const error = new Error(`Không tìm thấy đường dẫn: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message;

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
  }

  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue || {})[0];
    message = `Giá trị của "${field}" đã tồn tại`;
  }

  if (err.name === "CastError") {
    statusCode = 400;
    message = "ID không hợp lệ";
  }

  if (err.type === "entity.parse.failed") {
    statusCode = 400;
    message = "Dữ liệu JSON không hợp lệ";
  }

  if (statusCode === 500) {
    console.error(err);
    message = "Lỗi máy chủ nội bộ";
  }

  res.status(statusCode).json({ message });
};
