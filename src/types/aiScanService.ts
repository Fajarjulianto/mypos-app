export interface ApiScanResponseItem {
  name: string;
  minimumPrice: number;
  standardPrice: number;
  maximumPrice: number;
}

export interface ScannedItem {
  id: number;
  name: string;
  qty: number;
  price: number;
  confidence?: number;
  isNew?: boolean;
}

export const scanImageService = async (
  file: File
): Promise<ApiScanResponseItem[]> => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch("http://localhost:3000/api/Scan/image-scan", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Scan failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("AI Scan Error:", error);
    throw error;
  }
};
