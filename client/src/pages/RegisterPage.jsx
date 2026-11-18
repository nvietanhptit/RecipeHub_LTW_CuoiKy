import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormField from "../components/common/FormField";
import useAuth from "../hooks/useAuth";
import { validateRegisterForm } from "../utils/validators";
import { saveEmail } from "../utils/savedEmails";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateRegisterForm(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      setSubmitting(true);
      setServerError("");
      await register({
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password,
      });
      saveEmail(values.email);
      navigate("/", { replace: true });
    } catch (err) {
      setServerError(
        err.response?.data?.message ||
          "Không kết nối được máy chủ, vui lòng thử lại",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-md px-4 py-12">
      <h1 className="mb-6 text-center text-2xl font-bold text-stone-800">
        Đăng ký
      </h1>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="space-y-4 rounded-lg border border-stone-200 bg-white p-6 shadow-sm"
      >
        {serverError && (
          <p
            role="alert"
            className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700"
          >
            {serverError}
          </p>
        )}

        <FormField
          label="Họ tên"
          name="name"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Nguyễn Văn A"
          autoComplete="name"
        />

        <FormField
          label="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="ban@example.com"
          autoComplete="email"
        />

        <FormField
          label="Mật khẩu"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          autoComplete="new-password"
        />

        <FormField
          label="Nhập lại mật khẩu"
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          autoComplete="new-password"
        />

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Đang tạo tài khoản..." : "Đăng ký"}
        </button>

        <p className="text-center text-sm text-stone-600">
          Đã có tài khoản?{" "}
          <Link
            to="/login"
            className="font-medium text-green-700 hover:underline"
          >
            Đăng nhập
          </Link>
        </p>
      </form>
    </section>
  );
}
