export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  stock: number;
  price: number;
}

export interface InventoryResponse {
  data: InventoryItem[];
  message?: string;
}
