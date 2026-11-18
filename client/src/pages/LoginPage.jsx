import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FormField from "../components/common/FormField";
import useAuth from "../hooks/useAuth";
import { validateLoginForm } from "../utils/validators";
import { getSavedEmails, saveEmail } from "../utils/savedEmails";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from?.pathname || "/";

  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [savedEmails] = useState(getSavedEmails);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Người dùng gõ lại thì xóa lỗi của ô đó
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateLoginForm(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      setSubmitting(true);
      setServerError("");
      await login(values.email.trim(), values.password);
      saveEmail(values.email);
      navigate(redirectTo, { replace: true });
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
        Đăng nhập
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
          label="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="ban@example.com"
          autoComplete="email"
          list="saved-emails"
        />
        <datalist id="saved-emails">
          {savedEmails.map((item) => (
            <option key={item} value={item} />
          ))}
        </datalist>

        <FormField
          label="Mật khẩu"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          autoComplete="current-password"
        />

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>

        <p className="text-center text-sm text-stone-600">
          Chưa có tài khoản?{" "}
          <Link
            to="/register"
            className="font-medium text-green-700 hover:underline"
          >
            Đăng ký
          </Link>
        </p>
      </form>
    </section>
  );
}
