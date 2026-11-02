'use client'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import React, { JSX } from "react";

type AlertType = "success" | "error" | "info";

interface AlertProps {
  type?: AlertType;
  message: string;
  onClose: () => void;
  progress?: number;
}

const iconMap: Record<AlertType, JSX.Element> = {
  success: <CheckCircle className="h-6 w-6 text-[var(--ink)]" />,
  error: <AlertCircle className="h-6 w-6 text-[var(--ink)]" />,
  info: <Info className="h-6 w-6 text-[var(--ink)]" />,
};

const styleMap: Record<AlertType, string> = {
  success: "alert-toast--success",
  error: "alert-toast--error",
  info: "alert-toast--info",
};

const barColorMap: Record<AlertType, string> = {
  success: "alert-toast__progress--success",
  error: "alert-toast__progress--error",
  info: "alert-toast__progress--info",
};

const Alert = ({ type, message, progress, onClose }: AlertProps) => {
  const alertType = type || "info";

  return (
    <div className={`alert-toast ${styleMap[alertType]}`}>
      <div className="alert-toast__progress-track">
        <div
          className={`alert-toast__progress ${barColorMap[alertType]}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="alert-toast__content">
        <div className="alert-toast__icon">{iconMap[alertType]}</div>
        
        <div className="alert-toast__body">
          <p className="alert-toast__message">{message}</p>
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