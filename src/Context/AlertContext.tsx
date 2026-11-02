"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { AlertState } from "../../types/global";

// Alert Types
type AlertType = "success" | "error" | "info" | "warning";

interface AlertContextProps {
  showAlert: (type: AlertType, message: string, duration?: number) => void;
}

// Context
const AlertContext = createContext<AlertContextProps | undefined>(undefined);

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const [alert, setAlert] = useState<AlertState>({
    visible: false,
    message: "",
    type: "info",
    progress: 100,
  });

  const showAlert = (type: AlertType, message: string, duration = 4000) => {
    setAlert({ visible: true, type, message, progress: 100 });

    let interval: NodeJS.Timeout;
    const step = 100 / (duration / 50);

    interval = setInterval(() => {
      setAlert((prev) => {
        if (prev.progress <= 0) {
          clearInterval(interval);
          return { ...prev, visible: false };
        }
        return { ...prev, progress: prev.progress - step };
      });
    }, 50);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert.visible && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[100] animate-in slide-in-from-top-8 duration-500">
          <Alert
            type={alert.type}
            message={alert.message}
            progress={alert.progress}
            onClose={() =>
              setAlert({
                visible: false,
                message: "",
                type: "info",
                progress: 0,
              })
            }
          />
        </div>
      )}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

// Alert Component
interface AlertProps {
  type: AlertType;
  message: string;
  progress: number;
  onClose: () => void;
}

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
      case "warning":
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
    <div className={`relative w-96 max-w-sm rounded-[var(--r-card)] border-[3px] border-[var(--ink)] bg-[var(--paper)] shadow-[var(--sh-card)] ${config.bg}`}>
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