import { LoginPayload, RegisterPayload, AuthContextType } from "@/types/auth";
import axiosClient from "@/lib/axiosClient";

export const authService = {
  async login(payload: LoginPayload): Promise<AuthContextType> {
    const response = await axiosClient.post("/Auth/login", payload);
    return response.data;
  },

  async register(payload: RegisterPayload): Promise<AuthContextType> {
    const response = await axiosClient.post("/Auth/register", payload);
    return response.data;
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};
