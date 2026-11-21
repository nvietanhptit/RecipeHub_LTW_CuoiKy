import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(url));
  const [error, setError] = useState("");

  useEffect(() => {
    if (!url) {
      setLoading(false);
      return;
    }

    let ignore = false;
    setLoading(true);
    setError("");

    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(url);
        if (!ignore) setData(res.data);
      } catch (err) {
        if (!ignore) {
          setError(err.response?.data?.message || "Không tải được dữ liệu");
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
