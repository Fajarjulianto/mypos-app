import { LoginPayload, RegisterPayload, AuthContextType } from "@/types/auth"; // Sesuaikan path

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export const authService = {
  async login(payload: LoginPayload): Promise<AuthContextType> {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");
    return data;
  },

  async register(payload: RegisterPayload): Promise<AuthContextType> {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Registration failed");
    return data;
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};
