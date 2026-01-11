"use client";
import { useState } from "react";
import Link from "next/link";
import { ListTodo, User, Lock, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Card } from "../../../components/ui/card";
import Alert from "../../../components/ui/alert";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [alert, setAlert] = useState({
    isOpen: false,
    type: "info" as "success" | "error" | "info",
    title: "",
    message: "",
    actionLabel: "",
    onAction: null as (() => void) | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const registeredUser = localStorage.getItem("registeredUser");

    if (!registeredUser) {
      setAlert({
        isOpen: true,
        type: "info",
        title: "Belum Terdaftar",
        message: "Silakan daftar terlebih dahulu untuk membuat akun.",
        actionLabel: "Daftar",
        onAction: () => router.push("/register"),
      });
      return;
    }

    const user = JSON.parse(registeredUser);

    if (
      user.username !== formData.username ||
      user.password !== formData.password
    ) {
      setAlert({
        isOpen: true,
        type: "error",
        title: "Login Gagal",
        message: "Username atau password salah. Silakan coba lagi.",
        actionLabel: "",
        onAction: null,
      });
      return;
    }

    // Login berhasil
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("user", JSON.stringify({ username: user.username }));

    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
        {/* Left Side */}
        <div className="hidden md:block space-y-6">
          <Link href="/" className="flex items-center gap-2">
            <ListTodo className="w-10 h-10 md:w-12 md:h-12 text-blue-600" />
            <span className="text-2xl md:text-3xl font-bold text-gray-900">
              TugasKu
            </span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Selamat datang kembali!
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Masuk untuk melanjutkan mengelola tugas Anda
          </p>
        </div>

        {/* Right Side */}
        <Card className="p-6 sm:p-8 shadow-xl w-full relative">
          <Link
            href="/"
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Kembali"
          >
            <ArrowLeft className="w-5 h-5  text-gray-600" />
          </Link>
          <div className="mb-1 ">
            {/* Mobile header */}
            <div className="md:hidden mb-6 flex items-center gap-2">
              <ListTodo className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">TugasKu</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Masuk
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Masukkan kredensial Anda
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm sm:text-base">
                Username
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-2 w-5 h-5 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  className="pl-10 w-full text-sm sm:text-base"
                  placeholder="Masukkan username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm sm:text-base">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  className="pl-10 w-full text-sm sm:text-base"
                  placeholder="Masukkan password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full text-sm sm:text-base cursor-pointer bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              size="lg"
            >
              Masuk
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </Button>
          </form>

          <p className="mt-6 text-center text-xs sm:text-sm text-gray-600">
            Belum punya akun?{" "}
            <Link
              href="/register"
              className="text-blue-600 hover:underline font-semibold"
            >
              Daftar sekarang
            </Link>
          </p>
        </Card>
      </div>

      <Alert
        isOpen={alert.isOpen}
        type={alert.type}
        title={alert.title}
        message={alert.message}
        actionLabel={alert.actionLabel}
        onAction={alert.onAction || undefined}
        onClose={() => setAlert({ ...alert, isOpen: false })}
      />
    </div>
  );
}
