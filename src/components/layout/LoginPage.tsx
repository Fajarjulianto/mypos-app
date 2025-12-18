import React from "react";
import { Button } from "@/components/common/ui/button";
import { Input } from "@/components/common/ui/input";
import { Label } from "@/components/common/ui/label";
import { Checkbox } from "@/components/common/ui/checkbox";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async ({ post }: { post: string }) => {
    const res = await post("/login", { email, password });

    const token = "abc-124-456-token-jwt";
    const dummyUser = {
      id: 1,
      name: "admin MYPOS",
      email: "admin@mypos.com",
      role: "admin",
    };
    login(token, dummyUser);
  };

  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-[1.3fr_1fr] overflow-hidden font-sans">
      {/* --- SISI KIRI (VISUAL / BLUE) --- 
          Lebih lebar sesuai request
      */}
      <div className="hidden lg:flex flex-col justify-between bg-primary text-primary-foreground p-12 relative overflow-hidden">
        {/* 1. Header Logo */}
        <div className="flex items-center gap-3 z-10">
          <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            {/* Icon Logo Placeholder */}
            <div className="h-0 w-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-10 border-b-white transform rotate-90 ml-1"></div>
          </div>
        </div>

        {/* 2. Hero Text */}
        <div className="z-10 mt-20 mb-auto max-w-lg">
          <h1 className="text-5xl font-bold mb-6 leading-[1.15] tracking-tight">
            Designed for full Business Support
          </h1>
          <p className="text-primary-foreground/80 text-lg leading-relaxed mb-8">
            View all the analytics and grow your business from anywhere!
          </p>

          {/* Pagination dots */}
          <div className="flex gap-2">
            <div className="h-1.5 w-8 bg-white rounded-full" />
            <div className="h-1.5 w-1.5 bg-white/40 rounded-full" />
            <div className="h-1.5 w-1.5 bg-white/40 rounded-full" />
          </div>
        </div>

        {/* 3. Dashboard Mockup Image (CSS Only implementation) */}
        {/* Saya posisikan absolute di bawah agar terpotong seperti di foto referensi */}
        <div className="absolute -bottom-[15%] -right-[10%] w-[90%] aspect-video bg-[#1a1a1a] rounded-tl-2xl border-t-4 border-l-4 border-white/10 shadow-2xl p-4 overflow-hidden">
          {/* Mockup Header */}
          <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="h-2 w-40 bg-white/20 rounded-full mx-auto"></div>
          </div>

          {/* Mockup Body Content */}
          <div className="flex gap-6 h-full">
            {/* Sidebar Mockup */}
            <div className="w-1/4 space-y-3">
              <div className="h-8 w-full bg-white/10 rounded mb-6"></div>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-4 w-3/4 bg-white/5 rounded"></div>
              ))}
            </div>
            {/* Chart Mockup */}
            <div className="flex-1">
              <div className="h-8 w-1/3 bg-white/10 rounded mb-8"></div>
              <div className="flex items-end gap-4 h-32 pb-4 border-b border-white/10">
                <div className="w-full bg-primary/60 h-[40%] rounded-t-sm"></div>
                <div className="w-full bg-primary/60 h-[70%] rounded-t-sm"></div>
                <div className="w-full bg-primary/60 h-[50%] rounded-t-sm"></div>
                <div className="w-full bg-primary/80 h-[90%] rounded-t-sm relative shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
                <div className="w-full bg-primary/60 h-[60%] rounded-t-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- SISI KANAN (FORM LOGIN) --- 
          Menggunakan flex center agar form berada di tengah container kanan
      */}
      <div className="flex items-center justify-center bg-white p-8">
        {/* CONTAINER FORM: Dibatasi max-w-[420px] agar tidak lebar merata kanan kiri */}
        <div className="w-full max-w-105 space-y-7">
          {/* Header Form */}
          <div className="space-y-1.5">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">
              Log in
            </h1>
            {/* Opsional: Subtext jika butuh */}
          </div>

          {/* Form Inputs */}
          <div className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-600 font-medium">
                Email address
              </Label>
              <div className="relative group">
                <Mail className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                <Input
                  id="email"
                  placeholder="your@email.com"
                  type="email"
                  className="pl-11 h-12 bg-slate-50 border-slate-200 focus-visible:ring-primary focus-visible:ring-2 rounded-xl"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-600 font-medium">
                Password
              </Label>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                <Input
                  id="password"
                  placeholder="••••••••••••"
                  type={showPassword ? "text" : "password"}
                  className="pl-11 pr-11 h-12 bg-slate-50 border-slate-200 focus-visible:ring-primary focus-visible:ring-2 rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember & Links */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  className="data-[state=checked]:bg-primary border-slate-300 rounded"
                />
                <Label
                  htmlFor="remember"
                  className="text-sm font-medium text-slate-500 cursor-pointer"
                >
                  Remember password
                </Label>
              </div>
            </div>

            {/* Main Action Button */}
            <Button
              onClick={handleLogin}
              className="w-full h-12 text-base font-semibold rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all"
            >
              Sign In
            </Button>

            {/* Register Link */}
            <div className="text-sm text-slate-500 mt-4">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-semibold text-primary hover:underline"
              >
                Sign up
              </Link>
            </div>
          </div>

          {/* Divider "OR" */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-slate-400 font-medium tracking-wider">
                Or
              </span>
            </div>
          </div>

          {/* Google Button (Custom Dark/Light Style) */}
          <Button
            variant="outline"
            className="w-full h-12 rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 font-medium flex gap-3 relative"
          >
            {/* Google Icon SVG */}
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Log in with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
