import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { inventoryService } from "@/services/inventoriServices";

// --- 1. HOOK UNTUK MENGAMBIL DATA (READ) ---
export const useProducts = () => {
  return useQuery({
    queryKey: ["products"], // Kunci unik cache
    queryFn: inventoryService.getAll, // Fungsi fetcher
  });
};

// --- 2. HOOK UNTUK TAMBAH DATA (CREATE) ---
export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => inventoryService.create(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      alert("Produk berhasil ditambahkan!");
    },
    onError: (error: Error) => {
      alert(error.message);
    },
  });
};

// --- 3. HOOK UNTUK HAPUS DATA (DELETE) ---
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => inventoryService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      alert("Produk berhasil dihapus!");
    },
  });
};
