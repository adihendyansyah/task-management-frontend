"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ListTodo, Lock, User, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Card } from "../../../components/ui/card";
import Alert from "../../../components/ui/alert";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
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

    if (formData.password !== formData.confirmPassword) {
      setAlert({
        isOpen: true,
        type: "error",
        title: "Password Tidak Cocok",
        message: "Pastikan password dan konfirmasi password sama.",
        actionLabel: "",
        onAction: null,
      });
      return;
    }

    // Cek apakah user sudah pernah register
    const existingUser = localStorage.getItem("registeredUser");
    if (existingUser) {
      setAlert({
        isOpen: true,
        type: "error",
        title: "Akun Sudah Terdaftar",
        message: "Silakan login dengan akun yang sudah ada.",
        actionLabel: "Masuk",
        onAction: () => router.push("/login"),
      });
      return;
    }

    // Simpan data register
    localStorage.setItem(
      "registeredUser",
      JSON.stringify({
        username: formData.username,
        password: formData.password,
      })
    );

    setAlert({
      isOpen: true,
      type: "success",
      title: "Registrasi Berhasil!",
      message: "Silakan login dengan akun yang baru dibuat.",
      actionLabel: "Masuk",
      onAction: () => router.push("/login"),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
        {/* Left Side */}
        <div className="hidden md:block space-y-6">
          <div className="flex items-center gap-2">
            <ListTodo className="w-10 h-10 md:w-12 md:h-12 text-blue-600" />
            <span className="text-2xl md:text-3xl font-bold text-gray-900">
              TugasKu
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Mulai kelola tugas Anda dengan lebih baik
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Bergabung dengan ribuan pengguna yang sudah merasakan produktivitas
            maksimal
          </p>
        </div>

        {/* Right Side */}
        <Card className="p-6 sm:p-8 shadow-xl w-full relative">
          <Link
            href="/"
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Kembali"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div className="mb-1">
            {/* Mobile header */}
            <div className="md:hidden mb-6 flex items-center gap-2">
              <ListTodo className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">TugasKu</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Buat Akun
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Mulai perjalanan produktivitas Anda
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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
                  placeholder="Minimal 8 karakter"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm sm:text-base">
                Konfirmasi Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2 w-5 h-5 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type="password"
                  className="pl-10 w-full text-sm sm:text-base"
                  placeholder="Ulangi password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
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
              Daftar Sekarang
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </Button>
          </form>

          <p className="mt-6 text-center text-xs sm:text-sm text-gray-600">
            Sudah punya akun?{" "}
            <Link
              href="/login"
              className="text-blue-600 hover:underline font-semibold"
            >
              Masuk di sini
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
