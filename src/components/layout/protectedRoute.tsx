import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Jika loading selesai DAN user tidak ada, lempar ke login
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [isLoading, user, router]);

  // Tampilkan Loading Spinner saat sistem sedang mengecek status login
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-2">
          {/* Spinner sederhana dengan Tailwind */}
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-sm text-slate-500 font-medium">Memuat data...</p>
        </div>
      </div>
    );
  }

  // Jika user tidak ada (dan useEffect belum redirect), return null agar halaman aman
  if (!user) {
    return null;
  }

  // Jika user ada, tampilkan halaman aslinya
  return <>{children}</>;
};

export default ProtectedRoute;
