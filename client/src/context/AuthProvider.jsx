import { useCallback, useEffect, useMemo, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { TOKEN_KEY } from "../utils/constants";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(() =>
    Boolean(localStorage.getItem(TOKEN_KEY)),
  );

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (!token) return;

    let ignore = false;

    const fetchMe = async () => {
      try {
        const res = await axiosInstance.get("/auth/me");
        if (!ignore) setUser(res.data.user);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem(TOKEN_KEY);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchMe();

    return () => {
      ignore = true;
    };
  }, []);

  const login = useCallback(async (email, password) => {
    const res = await axiosInstance.post("/auth/login", { email, password });
    localStorage.setItem(TOKEN_KEY, res.data.token);
    setUser(res.data.user);
    return res.data.user;
  }, []);

  const register = useCallback(async (formData) => {
    const res = await axiosInstance.post("/auth/register", formData);
    localStorage.setItem(TOKEN_KEY, res.data.token);
    setUser(res.data.user);
    return res.data.user;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, loading, login, register, logout }),
    [user, loading, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
