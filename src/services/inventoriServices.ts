import { InventoryItem, InventoryResponse } from "@/types/inventory";

const API_URL = "http://localhost:3000/api/Products";

export const inventoryService = {
  getAll: async (): Promise<InventoryItem[]> => {
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          //   "Authorization": `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error(
          `Error ${response.status}: Gagal mengambil data inventory`
        );
      }

      const result: InventoryResponse = await response.json();

      // Asumsi response backend { data: [...] }
      // Jika backend langsung return array [...], ganti jadi return result;
      return result.data;
    } catch (error) {
      console.error("Fetch Inventory Error:", error);
      throw error;
    }
  },
};
