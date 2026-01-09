import { create } from "zustand";

// --- Types ---
interface ProductFormData {
  sku: string;
  category: string;
  name: string;
  price: string;
  stock: string;
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

  // Actions (Setters & Logic)
  setField: (field: keyof ProductFormData, value: string) => void;
  setPrice: (price: number) => void; // Khusus untuk klik saran AI
  setImage: (file: File) => void;
  removeImage: () => void;
  generateRandomSku: () => void;
  fetchAiSuggestions: () => void;
  resetForm: () => void;

  // Async Action (API Call)
  submitProduct: () => Promise<boolean>; // Return true jika sukses
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

  // 2. Actions
  setField: (field, value) =>
    set((state) => ({
      formData: { ...state.formData, [field]: value },
    })),

  setPrice: (price) =>
    set((state) => ({
      formData: { ...state.formData, price: price.toString() },
    })),

  setImage: (file) => {
    // Bersihkan preview lama jika ada (opsional, untuk memory management)
    const oldPreview = get().imagePreview;
    if (oldPreview) URL.revokeObjectURL(oldPreview);

    set({
      imageFile: file,
      imagePreview: URL.createObjectURL(file),
    });
  },

  removeImage: () => {
    const oldPreview = get().imagePreview;
    if (oldPreview) URL.revokeObjectURL(oldPreview);

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
    });
  },

  // 3. Logic: AI Suggestion
  fetchAiSuggestions: () => {
    const { formData } = get();
    if (!formData.name) return alert("Isi nama produk dulu.");

    set({ isAiLoading: true });

    // Simulasi AI Request
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

  // 4. Logic: Submit to API
  submitProduct: async () => {
    const { formData, imageFile } = get();

    // Validasi Basic
    if (!formData.name || !formData.price || !formData.category) {
      alert("Mohon lengkapi Nama, Harga, dan Kategori.");
      return false;
    }

    set({ isSubmitting: true });

    try {
      const payload = new FormData();
      payload.append("sku", formData.sku);
      payload.append("category", formData.category);
      payload.append("name", formData.name);
      payload.append("price", formData.price);
      payload.append("stock", formData.stock);

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

      return true; // Sukses
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Terjadi kesalahan sistem");
      }
      return false; // Gagal
    } finally {
      set({ isSubmitting: false });
    }
  },
}));
