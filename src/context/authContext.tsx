import { createContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/router";
import {
  User,
  AuthContextType,
  LoginPayload,
  RegisterPayload,
} from "@/types/auth";
import { authService } from "@/services/authServices";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  // 1. Cek Login saat Aplikasi pertama kali dimuat (Refresh)
  useEffect(() => {
    const initAuth = () => {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  // 2. Fungsi Login
  const login = async (payload: LoginPayload) => {
    try {
      const data = await authService.login(payload);

      // Simpan sesi
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      localStorage.setItem("user", JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);

      router.push("/dashboard");
    } catch (error) {
      throw error;
    }
  };

  const register = async (payload: RegisterPayload) => {
    try {
      const data = await authService.register(payload);

      // Simpan sesi (langsung login setelah daftar)
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      localStorage.setItem("user", JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);

      router.push("/dashboard");
    } catch (error) {
      throw error;
    }
  };

  // 3. Fungsi Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);

    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
