'use client'
import { useState } from "react";
import Alert from "./Alert";

type AlertType = "success" | "error" | "info";

export function useAlert() {
  const [alertData, setAlertData] = useState<{
    visible: boolean;
    message: string;
    type: AlertType;
  }>({
    visible: false,
    message: "",
    type: "info",
  });

  function showAlert(type: AlertType, message: string, duration = 3000) {
    setAlertData({ visible: true, type, message });

    setTimeout(() => {
      setAlertData({ visible: false, message: "", type: "info" });
    }, duration);
  }

  const AlertComponent = alertData.visible ? (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <Alert
        type={alertData.type}
        message={alertData.message}
        onClose={() =>
          setAlertData({ visible: false, message: "", type: "info" })
        }
      />
    </div>
  ) : null;

  return { showAlert, AlertComponent };
}
