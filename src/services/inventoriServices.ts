import axiosClient from "@/lib/axiosClient";
import { InventoryItem, ApiResponse } from "@/types/inventory";
import { AxiosError } from "axios";

export const inventoryService = {
  // --- READ (Get All) ---
  getAll: async (): Promise<InventoryItem[]> => {
    try {
      const response = await axiosClient.get<ApiResponse<InventoryItem[]>>(
        "/Products"
      );
      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(
          error.response?.data?.message || "Gagal mengambil data inventory"
        );
      }
      throw error;
    }
  },

  // --- READ (Get One) ---
  getById: async (id: string): Promise<InventoryItem> => {
    try {
      const response = await axiosClient.get<ApiResponse<InventoryItem>>(
        `/Products/${id}`
      );
      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(
          error.response?.data?.message || "Gagal mengambil detail produk"
        );
      }
      throw error;
    }
  },

  // --- CREATE ---
  create: async (formData: FormData): Promise<boolean> => {
    try {
      const response = await axiosClient.post<ApiResponse<InventoryItem>>(
        "/product/add-product",
        formData
      );
      return response.status === 200 || response.status === 201;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(
          error.response?.data?.message || "Gagal menambah produk"
        );
      }
      throw error;
    }
  },

  // --- UPDATE (Edit) ---
  // Kita pakai FormData juga karena edit produk mungkin mengubah gambar
  update: async (formData: FormData): Promise<boolean> => {
    try {
      // Pastikan backend Anda mendukung method PUT untuk update
      // Jika backend Anda pakai POST untuk update, ganti .put menjadi .post
      const response = await axiosClient.put<ApiResponse<InventoryItem>>(
        "/product/update-product",
        formData
      );

      return response.status === 200;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(
          error.response?.data?.message || "Gagal memperbarui produk"
        );
      }
      throw error;
    }
  },

  // --- DELETE (Hapus) ---
  delete: async (id: string): Promise<boolean> => {
    try {
      // Menggunakan query param ?id=... sesuai endpoint backend teman Anda
      const response = await axiosClient.delete<ApiResponse<null>>(
        `/product/delete-product?id=${id}`
      );

      return response.status === 200;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(
          error.response?.data?.message || "Gagal menghapus produk"
        );
      }
      throw error;
    }
  },
};
