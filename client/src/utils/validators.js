const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateLoginForm = ({ email, password }) => {
  const errors = {};

  if (!email.trim()) {
    errors.email = "Vui lòng nhập email";
  } else if (!EMAIL_REGEX.test(email.trim())) {
    errors.email = "Email không đúng định dạng";
  }

  if (!password) {
    errors.password = "Vui lòng nhập mật khẩu";
  }

  return errors;
};
