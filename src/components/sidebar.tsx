"use client";

import { ListTodo, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "./ui/button";

interface SidebarProps {
  user: any;
  onLogout: () => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export default function Sidebar({
  user,
  onLogout,
  activeTab = "dashboard",
  onTabChange,
}: SidebarProps) {
  const getInitials = (username: string) => {
    const parts = username.split(" ");
    if (parts.length > 1) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return username.substring(0, 2).toUpperCase();
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-2">
          <ListTodo className="w-8 h-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">TaskFlow</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-6 space-y-2">
        <button
          onClick={() => onTabChange?.("dashboard")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            activeTab === "dashboard"
              ? "bg-blue-50 text-blue-600"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Dashboard</span>
        </button>
      </nav>

      {/* Profile & Logout Section */}
      <div className="p-6 border-t border-gray-200 flex-shrink-0 space-y-4">
        {/* Profile */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            {getInitials(user?.username || "User")}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {user?.username || "User"}
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <Button
          onClick={onLogout}
          variant="outline"
          className="w-full justify-center gap-2 cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
