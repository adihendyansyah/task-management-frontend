"use client";

import { X } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";

interface DialogProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  actions?: {
    label: string;
    onClick: () => void;
    variant?: "default" | "destructive" | "outline";
    className?: string;
  }[];
}

export default function Dialog({
  isOpen,
  title,
  children,
  onClose,
  actions,
}: DialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-6">{children}</div>

        {actions && actions.length > 0 && (
          <div className="flex gap-3 p-6 border-t border-gray-200 justify-end">
            <Button variant="outline" onClick={onClose} className="cursor-pointer">
              Batal
            </Button>
            {actions.map((action, idx) => (
              <Button
                key={idx}
                variant={action.variant || "default"}
                onClick={action.onClick}
                className={action.className}
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
