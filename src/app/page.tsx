"use client";

import { ListTodo } from "lucide-react";
import { Button } from "../components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-white via-blue-50 to-white overflow-hidden flex flex-col">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ListTodo className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">TugasKu</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-blue-50 via-purple-50 to-pink-50"></div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div
          className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="space-y-6">
              <h1 className="text-6xl md:text-7xl font-bold text-gray-900 leading-tight">
                Kelola Tugas Anda Dengan{" "}
                <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Lebih Efisien
                </span>
              </h1>
              <p className="text-xl text-gray-600">
                Platform untuk membantu Anda mengelola tugas harian dengan mudah
                dan terorganisir. Tambahkan, pantau, dan selesaikan tugas dalam
                satu dashboard yang simpel, cepat, dan responsif untuk
                meningkatkan produktivitas Anda.
              </p>
              <div className="flex gap-4 justify-center pt-4">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="px-8 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg cursor-pointer"
                  >
                    Daftar Sekarang
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 shadow-lg cursor-pointer"
                  >
                    Masuk
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
