import { useCallback } from "react";

type StorageType = "localStorage" | "cookie";
const storageType: StorageType = "localStorage";

const useStorage = () => {
  const getItem = useCallback((key: string) => {
    if (storageType === "localStorage") {
      return localStorage.getItem(key);
    } else if (storageType === "cookie") {
      const match = document.cookie.match(new RegExp(`(^| )${key}=([^;]+)`));
      return match ? match[2] : null;
    }
  }, []);

  const setItem = useCallback((key: string, value: string) => {
    if (storageType === "localStorage") {
      localStorage.setItem(key, value);
    } else if (storageType === "cookie") {
      document.cookie = `${key}=${value}; path=/; max-age=604800;`;
    }
  }, []);

  const removeItem = useCallback((key: string) => {
    if (storageType === "localStorage") {
      localStorage.removeItem(key);
    } else if (storageType === "cookie") {
      document.cookie = `${key}=; path=/; max-age=0;`;
    }
  }, []);
  const clear = useCallback(() => {
    if (storageType === "localStorage") {
      localStorage.clear();
    } else if (storageType === "cookie") {
      const cookies = document.cookie.split("; ");
      cookies.forEach((cookie) => {
        const key = cookie.split("=")[0];
        document.cookie = `${key}=; path=/; max-age=0;`;
      });
    }
  }, []);

  return { getItem, setItem, removeItem, clear };
};

export default useStorage;
