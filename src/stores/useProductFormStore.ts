import { create } from "zustand";

// --- Types ---
interface ProductFormData {
  sku: string;
  category: string;
  name: string;
  price: string;
  stock: string;
}

export interface Product {
  id: string;
  sku: string;
  category: string;
  name: string;
  price: number;
  stock: number;
  imageUrl?: string;
}

interface AiSuggestion {
  label: string;
  price: number;
  reason: string;
}

interface ProductFormState {
  // State Variables
  formData: ProductFormData;
  imageFile: File | null;
  imagePreview: string | null;
  isSubmitting: boolean;
  isAiLoading: boolean;
  aiSuggestions: AiSuggestion[] | null;
  editingId: string | null;

  // Actions (Setters & Logic)
  setField: (field: keyof ProductFormData, value: string) => void;
  setPrice: (price: number) => void;
  setImage: (file: File) => void;
  removeImage: () => void;
  generateRandomSku: () => void;
  fetchAiSuggestions: () => void;

  // Logic CRUD
  resetForm: () => void;
  prepareEdit: (product: Product) => void;
  submitProduct: () => Promise<boolean>; // POST
  updateProduct: () => Promise<boolean>; // PUT
  deleteProduct: (id: string) => Promise<boolean>; // DELETE
}

// --- Initial State ---
const INITIAL_FORM: ProductFormData = {
  sku: "",
  category: "",
  name: "",
  price: "",
  stock: "",
};

export const useProductFormStore = create<ProductFormState>((set, get) => ({
  // 1. Initial State
  formData: INITIAL_FORM,
  imageFile: null,
  imagePreview: null,
  isSubmitting: false,
  isAiLoading: false,
  aiSuggestions: null,
  editingId: null,

  // 2. Basic Setters
  setField: (field, value) =>
    set((state) => ({
      formData: { ...state.formData, [field]: value },
    })),

  setPrice: (price) =>
    set((state) => ({
      formData: { ...state.formData, price: price.toString() },
    })),

  setImage: (file) => {
    // Bersihkan preview lama jika berupa blob URL
    const oldPreview = get().imagePreview;
    if (oldPreview && oldPreview.startsWith("blob:")) {
      URL.revokeObjectURL(oldPreview);
    }

    set({
      imageFile: file,
      imagePreview: URL.createObjectURL(file),
    });
  },

  removeImage: () => {
    const oldPreview = get().imagePreview;
    if (oldPreview && oldPreview.startsWith("blob:")) {
      URL.revokeObjectURL(oldPreview);
    }

    set({ imageFile: null, imagePreview: null });
  },

  generateRandomSku: () => {
    const randomSku = "SKU-" + Math.floor(100000 + Math.random() * 900000);
    get().setField("sku", randomSku);
  },

  resetForm: () => {
    set({
      formData: INITIAL_FORM,
      imageFile: null,
      imagePreview: null,
      isSubmitting: false,
      isAiLoading: false,
      aiSuggestions: null,
      editingId: null, // Penting: Reset ID agar kembali ke mode Add
    });
  },

  // 3. Logic: AI Suggestion
  fetchAiSuggestions: () => {
    const { formData } = get();
    if (!formData.name) return alert("Isi nama produk dulu.");

    set({ isAiLoading: true });

    setTimeout(() => {
      set({
        isAiLoading: false,
        aiSuggestions: [
          { label: "Kompetitif", price: 15000, reason: "Margin tipis" },
          { label: "Standar", price: 25000, reason: "Pasar rata-rata" },
          { label: "Premium", price: 45000, reason: "Brand eksklusif" },
        ],
      });
    }, 1000);
  },

  // 4. Logic: Prepare Edit (Isi form dengan data lama)
  prepareEdit: (product: Product) => {
    set({
      editingId: product.id,
      formData: {
        sku: product.sku,
        category: product.category,
        name: product.name,
        price: product.price.toString(),
        stock: product.stock.toString(),
      },
      // Gunakan URL dari DB jika ada, imageFile null karena user belum upload baru
      imagePreview: product.imageUrl || null,
      imageFile: null,
    });
  },

  // 5. Logic: ADD Product (POST)
  submitProduct: async () => {
    const { formData, imageFile } = get();

    if (!formData.name || !formData.price || !formData.category) {
      alert("Mohon lengkapi Nama, Harga, dan Kategori.");
      return false;
    }

    set({ isSubmitting: true });

    try {
      const payload = new FormData();
      // Loop untuk append semua field text
      (Object.keys(formData) as (keyof ProductFormData)[]).forEach((key) => {
        payload.append(key, formData[key]);
      });

      if (imageFile) {
        payload.append("image", imageFile);
      }

      const response = await fetch("/api/product/add-product", {
        method: "POST",
        body: payload,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal menambahkan produk");
      }

      return true;
    } catch (error) {
      if (error instanceof Error) alert(error.message);
      else alert("Terjadi kesalahan sistem");
      return false;
    } finally {
      set({ isSubmitting: false });
    }
  },

  // 6. Logic: UPDATE Product (PUT)
  updateProduct: async () => {
    const { formData, imageFile, editingId } = get();

    if (!editingId) return false;
    if (!formData.name || !formData.price) {
      alert("Mohon lengkapi data wajib.");
      return false;
    }

    set({ isSubmitting: true });

    try {
      const payload = new FormData();
      // Wajib kirim ID untuk update
      payload.append("id", editingId);

      (Object.keys(formData) as (keyof ProductFormData)[]).forEach((key) => {
        payload.append(key, formData[key]);
      });

      // Hanya kirim gambar jika user upload file baru
      if (imageFile) {
        payload.append("image", imageFile);
      }

      const response = await fetch("/api/product/update-product", {
        method: "PUT",
        body: payload,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal update produk");
      }

      return true;
    } catch (error) {
      if (error instanceof Error) alert(error.message);
      else alert("Terjadi kesalahan sistem");
      return false;
    } finally {
      set({ isSubmitting: false });
    }
  },

  // 7. Logic: DELETE Product (DELETE)
  deleteProduct: async (id: string) => {
    set({ isSubmitting: true });

    try {
      // Mengirim ID via Query Param (sesuaikan jika backend butuh di body)
      const response = await fetch(`/api/product/delete-product?id=${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal menghapus produk");
      }

      return true;
    } catch (error) {
      if (error instanceof Error) alert(error.message);
      else alert("Terjadi kesalahan sistem");
      return false;
    } finally {
      set({ isSubmitting: false });
    }
  },
}));
