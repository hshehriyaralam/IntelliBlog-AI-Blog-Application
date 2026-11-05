"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, ReactNode } from "react";
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
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const showAlert = useCallback((type: AlertType, message: string, duration = 4000) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setAlert({ visible: true, type, message, progress: 100 });

    const step = 100 / (duration / 50);

    intervalRef.current = setInterval(() => {
      setAlert((prev) => {
        if (prev.progress <= 0) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          intervalRef.current = null;
          return { ...prev, visible: false };
        }
        return { ...prev, progress: prev.progress - step };
      });
    }, 50);
  }, []);

  const closeAlert = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    setAlert({ visible: false, message: "", type: "info", progress: 0 });
  }, []);

  const contextValue = useMemo(() => ({ showAlert }), [showAlert]);

  useEffect(() => () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
      {alert.visible && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[100] animate-in slide-in-from-top-8 duration-500">
          <Alert
            type={alert.type}
            message={alert.message}
            progress={alert.progress}
            onClose={closeAlert}
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
          bg: "alert-toast--success",
          text: "alert-toast__message",
          icon: <CheckCircle className="h-6 w-6 text-[var(--ink)]" />,
          progress: "alert-toast__progress--success",
        };
      case "error":
        return {
          bg: "alert-toast--error",
          text: "alert-toast__message",
          icon: <AlertCircle className="h-6 w-6 text-[var(--ink)]" />,
          progress: "alert-toast__progress--error",
        };
      case "warning":
        return {
          bg: "alert-toast--warning",
          text: "alert-toast__message",
          icon: <AlertTriangle className="h-6 w-6 text-[var(--ink)]" />,
          progress: "alert-toast__progress--warning",
        };
      case "info":
      default:
        return {
          bg: "alert-toast--info",
          text: "alert-toast__message",
          icon: <Info className="h-6 w-6 text-[var(--ink)]" />,
          progress: "alert-toast__progress--info",
        };
    }
  };

  const config = getAlertConfig();

  return (
    <div className={`alert-toast ${config.bg}`}>
      {/* Progress Bar */}
      <div className="alert-toast__progress-track">
        <div
          className={`alert-toast__progress ${config.progress}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Alert Content */}
      <div className="alert-toast__content">
        <div className="alert-toast__icon">{config.icon}</div>
        
        <div className="alert-toast__body">
          <p className={config.text}>{message}</p>
        </div>

        <button
          onClick={onClose}
          aria-label="Close alert"
          className="alert-toast__close"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Alert;