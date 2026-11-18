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

const NAME_MIN_LENGTH = 2;
const PASSWORD_MIN_LENGTH = 6;

export const validateRegisterForm = ({
  name,
  email,
  password,
  confirmPassword,
}) => {
  const errors = {};

  if (!name.trim()) {
    errors.name = "Vui lòng nhập họ tên";
  } else if (name.trim().length < NAME_MIN_LENGTH) {
    errors.name = `Họ tên tối thiểu ${NAME_MIN_LENGTH} ký tự`;
  }

  if (!email.trim()) {
    errors.email = "Vui lòng nhập email";
  } else if (!EMAIL_REGEX.test(email.trim())) {
    errors.email = "Email không đúng định dạng";
  }

  if (!password) {
    errors.password = "Vui lòng nhập mật khẩu";
  } else if (password.length < PASSWORD_MIN_LENGTH) {
    errors.password = `Mật khẩu tối thiểu ${PASSWORD_MIN_LENGTH} ký tự`;
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Vui lòng nhập lại mật khẩu";
  } else if (confirmPassword !== password) {
    errors.confirmPassword = "Mật khẩu nhập lại không khớp";
  }

  return errors;
};
