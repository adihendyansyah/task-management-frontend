"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ListTodo,
  Plus,
  Search,
  LogOut,
  CheckCircle2,
  MoreVertical,
  LayoutDashboard,
  TrendingUp,
  Menu,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Checkbox } from "../../components/ui/checkbox";

interface Task {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
}

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push("/login");
    }
  }, [router]);

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Desain UI/UX Dashboard",
      description: "Buat mockup untuk dashboard baru",
      isCompleted: false,
    },
    {
      id: 2,
      title: "Implementasi API Backend",
      description: "Develop REST API untuk fitur task management",
      isCompleted: false,
    },
    {
      id: 3,
      title: "Testing & QA",
      description: "Test semua fitur dan perbaiki bug",
      isCompleted: true,
    },
    {
      id: 4,
      title: "Meeting dengan Client",
      description: "Presentasi progress proyek",
      isCompleted: true,
    },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    router.push("/login");
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: tasks.length + 1,
        title: newTaskTitle,
        description: newTaskDescription,
        isCompleted: false,
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
      setNewTaskDescription("");
    }
  };

  const toggleTaskisCompleted = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleEditTask = (task: Task) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const handleSaveEdit = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, title: editTitle, description: editDescription }
          : task
      )
    );
    setEditingTaskId(null);
    setEditTitle("");
    setEditDescription("");
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditTitle("");
    setEditDescription("");
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const incompleteTasks = filteredTasks.filter((task) => !task.isCompleted);
  const completedTasks = filteredTasks.filter((task) => task.isCompleted);

  const stats = [
    {
      label: "Total Tugas",
      value: tasks.length,
      icon: ListTodo,
      color: "bg-blue-500",
    },
    {
      label: "Belum Selesai",
      value: tasks.filter((t) => !t.isCompleted).length,
      icon: TrendingUp,
      color: "bg-yellow-500",
    },
    {
      label: "Selesai",
      value: tasks.filter((t) => t.isCompleted).length,
      icon: CheckCircle2,
      color: "bg-green-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-gray-200 p-4 md:p-6 hidden md:block">
        <div className="flex items-center gap-2 mb-8">
          <ListTodo className="w-8 h-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">TaskFlow</span>
        </div>

        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab("dashboard")}
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
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Left - Logo (Mobile) */}
            <div className="flex md:hidden items-center gap-2">
              <ListTodo className="w-6 h-6 text-blue-600" />
              <span className="text-lg font-bold text-gray-900">TaskFlow</span>
            </div>

            {/* Right - Hamburger Menu (Mobile) */}
            <div className="md:hidden">
              <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-10 w-10 p-0">
                    <Menu className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Desktop - Logout Button */}
            <div className="hidden md:flex items-center gap-3 ml-auto">
              <Button
                variant="outline"
                onClick={handleLogout}
                className="whitespace-nowrap text-sm md:text-base"
              >
                <LogOut className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {/* Welcome Section */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Selamat datang kembali, {user.username?.split(" ")[0] || "User"}!
              👋
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Berikut adalah ringkasan tugas Anda hari ini
            </p>
          </div>

          {/* Stats Cards */}
          <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-2 mb-6 -mx-4 sm:-mx-0 px-4 sm:px-0">
            {stats.map((stat) => (
              <Card
                key={stat.label}
                className="p-3 sm:p-6 flex-shrink-0 w-[calc(33.333%-0.5rem)] sm:flex-1"
              >
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 ${stat.color} rounded-lg flex items-center justify-center`}
                  >
                    <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>
                <p className="text-lg sm:text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm text-gray-600">{stat.label}</p>
              </Card>
            ))}
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Cari tugas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
          </div>

          {/* Add New Task */}
          <Card className="p-3 sm:p-4 mb-6">
            <div className="space-y-3">
              <Input
                placeholder="Tambah tugas baru..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
                className="w-full text-sm sm:text-base"
              />
              <Input
                placeholder="Deskripsi tugas (opsional)..."
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
                className="w-full text-sm sm:text-base"
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleAddTask}
                  className="gap-2 text-sm sm:text-base"
                >
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Tambah Tugas</span>
                  <span className="sm:hidden">Tambah</span>
                </Button>
              </div>
            </div>
          </Card>

          {/* Tasks Section */}
          {/* Tugas Belum Selesai */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Tugas Belum Selesai
              </h2>
              <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                {incompleteTasks.length}
              </span>
            </div>
            <div className="space-y-3">
              {incompleteTasks.length > 0 ? (
                incompleteTasks.map((task) => (
                  <Card
                    key={task.id}
                    className="p-4 sm:p-5 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <Checkbox
                        checked={task.isCompleted}
                        onCheckedChange={() => toggleTaskisCompleted(task.id)}
                        className="mt-1 flex-shrink-0"
                      />

                      <div className="flex-1 min-w-0 w-full">
                        {editingTaskId === task.id ? (
                          <div className="space-y-3 mb-3">
                            <Input
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              placeholder="Judul tugas"
                              className="w-full text-sm sm:text-base"
                            />
                            <Input
                              value={editDescription}
                              onChange={(e) =>
                                setEditDescription(e.target.value)
                              }
                              placeholder="Deskripsi tugas"
                              className="w-full text-sm sm:text-base"
                            />
                            <div className="flex gap-2 flex-wrap">
                              <Button
                                size="sm"
                                onClick={() => handleSaveEdit(task.id)}
                                className="bg-green-600 hover:bg-green-700 text-xs sm:text-sm"
                              >
                                Simpan
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={handleCancelEdit}
                                className="text-xs sm:text-sm"
                              >
                                Batal
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 mb-2">
                              <h3 className="font-semibold text-gray-900 text-sm sm:text-base break-words">
                                {task.title}
                              </h3>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 flex-shrink-0"
                                  >
                                    <MoreVertical className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={() => handleEditTask(task)}
                                  >
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-red-600"
                                    onClick={() => handleDeleteTask(task.id)}
                                  >
                                    Hapus
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>

                            {task.description && (
                              <p className="text-gray-600 text-xs sm:text-sm mb-3 break-words">
                                {task.description}
                              </p>
                            )}

                            <div className="flex flex-wrap items-center gap-3">
                              {task.isCompleted === false && (
                                <Badge
                                  variant="outline"
                                  className="text-blue-600 border-blue-600 text-xs sm:text-sm"
                                >
                                  Belum Selesai
                                </Badge>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-6 sm:p-8 text-center bg-blue-50">
                  <p className="text-gray-600 text-sm sm:text-base">
                    Tidak ada tugas yang belum selesai. Hebat! 🎉
                  </p>
                </Card>
              )}
            </div>
          </div>

          {/* Tugas Selesai */}
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Tugas Selesai
            </h2>
            <div className="space-y-3">
              {completedTasks.length > 0 ? (
                completedTasks.map((task) => (
                  <Card
                    key={task.id}
                    className="p-4 sm:p-5 hover:shadow-md transition-shadow bg-green-50"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <Checkbox
                        checked={task.isCompleted}
                        onCheckedChange={() => toggleTaskisCompleted(task.id)}
                        className="mt-1 flex-shrink-0"
                      />

                      <div className="flex-1 min-w-0 w-full">
                        {editingTaskId === task.id ? (
                          <div className="space-y-3 mb-3">
                            <Input
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              placeholder="Judul tugas"
                              className="w-full text-sm sm:text-base"
                            />
                            <Input
                              value={editDescription}
                              onChange={(e) =>
                                setEditDescription(e.target.value)
                              }
                              placeholder="Deskripsi tugas"
                              className="w-full text-sm sm:text-base"
                            />
                            <div className="flex gap-2 flex-wrap">
                              <Button
                                size="sm"
                                onClick={() => handleSaveEdit(task.id)}
                                className="bg-green-600 hover:bg-green-700 text-xs sm:text-sm"
                              >
                                Simpan
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={handleCancelEdit}
                                className="text-xs sm:text-sm"
                              >
                                Batal
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 mb-2">
                              <h3 className="font-semibold line-through text-gray-500 text-sm sm:text-base break-words">
                                {task.title}
                              </h3>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 flex-shrink-0"
                                  >
                                    <MoreVertical className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={() => handleEditTask(task)}
                                  >
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-red-600"
                                    onClick={() => handleDeleteTask(task.id)}
                                  >
                                    Hapus
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>

                            {task.description && (
                              <p className="text-gray-600 text-xs sm:text-sm mb-3 break-words">
                                {task.description}
                              </p>
                            )}

                            <div className="flex flex-wrap items-center">
                              <Badge
                                variant="outline"
                                className="text-green-600 border-green-600 text-xs sm:text-sm"
                              >
                                Selesai
                              </Badge>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-6 sm:p-8 text-center">
                  <p className="text-gray-600 text-sm sm:text-base">
                    Belum ada tugas yang selesai
                  </p>
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
