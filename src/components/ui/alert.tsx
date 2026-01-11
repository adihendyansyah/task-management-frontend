"use client";

import { X, AlertCircle, CheckCircle2, Info } from "lucide-react";
import { Button } from "./button";

type AlertType = "success" | "error" | "info";

interface AlertProps {
  isOpen: boolean;
  type: AlertType;
  title: string;
  message: string;
  onClose: () => void;
  actionLabel?: string;
  onAction?: () => void;
}

export default function Alert({
  isOpen,
  type,
  title,
  message,
  onClose,
  actionLabel,
  onAction,
}: AlertProps) {
  if (!isOpen) return null;

  const getConfig = () => {
    switch (type) {
      case "success":
        return {
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          iconColor: "text-green-600",
          Icon: CheckCircle2,
          titleColor: "text-green-900",
          messageColor: "text-green-800",
          buttonColor: "bg-green-600 hover:bg-green-700",
        };
      case "error":
        return {
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          iconColor: "text-red-600",
          Icon: AlertCircle,
          titleColor: "text-red-900",
          messageColor: "text-red-800",
          buttonColor: "bg-red-600 hover:bg-red-700",
        };
      case "info":
      default:
        return {
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          iconColor: "text-blue-600",
          Icon: Info,
          titleColor: "text-blue-900",
          messageColor: "text-blue-800",
          buttonColor: "bg-blue-600 hover:bg-blue-700",
        };
    }
  };

  const config = getConfig();
  const { Icon } = config;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div
        className={`w-full max-w-md shadow-lg border rounded-xl p-6 ${config.bgColor} ${config.borderColor}`}
      >
        <div className="flex items-start gap-4">
          <div className={`flex-shrink-0 mt-0.5`}>
            <Icon className={`w-6 h-6 ${config.iconColor}`} />
          </div>
          <div className="flex-1">
            <h3 className={`font-semibold text-lg ${config.titleColor} mb-1`}>
              {title}
            </h3>
            <p className={`text-sm ${config.messageColor}`}>{message}</p>
          </div>
          <button
            onClick={onClose}
            className={`flex-shrink-0 p-1 hover:bg-white/50 rounded-lg transition-colors`}
          >
            <X className={`w-5 h-5 ${config.iconColor}`} />
          </button>
        </div>

        <div className="flex gap-3 justify-end mt-6">
          <Button variant="outline" onClick={onClose} className="text-sm">
            Tutup
          </Button>
          {actionLabel && onAction && (
            <Button
              onClick={() => {
                onAction();
                onClose();
              }}
              className={`text-sm text-white ${config.buttonColor}`}
            >
              {actionLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
