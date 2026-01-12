'use client'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import React, { JSX } from "react";

type AlertType = "success" | "error" | "info";

interface AlertProps {
  type?: AlertType;
  message: string;
  onClose: () => void;
  progress?: number;
}

const iconMap: Record<AlertType, JSX.Element> = {
  success: <CheckCircle className="text-green-600 w-6 h-6" />,
  error: <AlertCircle className="text-red-600 w-6 h-6" />,
  info: <Info className="text-blue-600 w-6 h-6" />,
};

const styleMap: Record<AlertType, string> = {
  success: "bg-green-100 text-green-900 border border-green-300",
  error: "bg-red-100 text-red-900 border border-red-300",
  info: "bg-blue-100 text-blue-900 border border-blue-300",
};

const barColorMap: Record<AlertType, string> = {
  success: "bg-green-600",
  error: "bg-red-600",
  info: "bg-blue-600",
};

const Alert = ({ type, message, progress, onClose }: AlertProps) => {
  const getAlertConfig = () => {
    switch (type) {
      case "success":
        return {
          bg: "bg-green-50 border-green-200",
          text: "text-green-800",
          icon: <CheckCircle className="w-5 h-5 text-green-600" />,
          progress: "bg-green-500",
        };
      case "error":
        return {
          bg: "bg-red-50 border-red-200",
          text: "text-red-800",
          icon: <AlertCircle className="w-5 h-5 text-red-600" />,
          progress: "bg-red-500",
        };
      case "error":
        return {
          bg: "bg-amber-50 border-amber-200",
          text: "text-amber-800",
          icon: <AlertTriangle className="w-5 h-5 text-amber-600" />,
          progress: "bg-amber-500",
        };
      case "info":
      default:
        return {
          bg: "bg-blue-50 border-blue-200",
          text: "text-blue-800",
          icon: <Info className="w-5 h-5 text-blue-600" />,
          progress: "bg-blue-500",
        };
    }
  };

  const config = getAlertConfig();

  return (
    <div className={`relative w-96 max-w-sm rounded-xl border shadow-lg backdrop-blur-sm ${config.bg}`}>
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 rounded-t-xl">
        <div
          className={`h-full rounded-t-xl transition-all duration-300 ${config.progress}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Alert Content */}
      <div className="p-4 flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">{config.icon}</div>
        
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium ${config.text}`}>{message}</p>
        </div>

        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 hover:bg-black/5 rounded-md transition-colors"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default Alert;