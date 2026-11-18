import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ChefHat, LogOut, Menu, X } from "lucide-react";
import useAuth from "../../hooks/useAuth";

const navLinkClass = ({ isActive }) =>
  `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? "bg-green-100 text-green-800"
      : "text-stone-600 hover:bg-stone-100 hover:text-green-700"
  }`;

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/");
  };
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-green-700"
        >
          <ChefHat aria-hidden="true" />
          RecipeHub
        </Link>

        <button
          type="button"
          className="rounded-md p-2 text-stone-700 hover:bg-stone-100 md:hidden"
          aria-label="Mở hoặc đóng menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>

        <nav
          aria-label="Điều hướng chính"
          className={`${open ? "flex" : "hidden"} absolute left-0 top-full w-full flex-col gap-1 border-b border-stone-200 bg-white p-4 md:static md:flex md:w-auto md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0`}
        >
          <NavLink to="/" end className={navLinkClass} onClick={closeMenu}>
            Trang chủ
          </NavLink>
          <NavLink to="/recipes" className={navLinkClass} onClick={closeMenu}>
            Khám phá
          </NavLink>
          {!loading && !user && (
            <>
              <NavLink to="/login" className={navLinkClass} onClick={closeMenu}>
                Đăng nhập
              </NavLink>
              <Link
                to="/register"
                onClick={closeMenu}
                className="rounded-md bg-green-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-green-700"
              >
                Đăng ký
              </Link>
            </>
          )}

          {!loading && user && (
            <>
              {user.role === "admin" && (
                <NavLink
                  to="/admin"
                  className={navLinkClass}
                  onClick={closeMenu}
                >
                  Quản trị
                </NavLink>
              )}
              <span className="max-w-40 truncate px-3 py-2 text-sm font-medium text-stone-700">
                Xin chào, {user.name}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-red-600"
              >
                <LogOut size={16} aria-hidden="true" />
                Đăng xuất
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
