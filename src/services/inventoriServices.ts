import axiosClient from "@/lib/axiosClient";
import { InventoryItem, ApiResponse } from "@/types/inventory";
import { AxiosError } from "axios";

export const inventoryService = {
  getAll: async (): Promise<InventoryItem[]> => {
    try {
      const response = await axiosClient.get<ApiResponse<InventoryItem[]>>(
        "/Products"
      );

      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(
          error.response?.data?.message || "Gagal mengambil data"
        );
      }
      throw error;
    }
  },

  getById: async (id: string): Promise<InventoryItem> => {
    try {
      const response = await axiosClient.get<ApiResponse<InventoryItem>>(
        `/Products/${id}`
      );
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  create: async (formData: FormData): Promise<boolean> => {
    try {
      const response = await axiosClient.post<ApiResponse<InventoryItem>>(
        "/product/add-product",
        formData
      );
      return response.status === 200 || response.status === 201;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response?.data?.message);
      throw error;
    }
  },
};
