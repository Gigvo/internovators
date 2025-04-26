import { useState, useEffect } from "react";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastState {
  open: boolean;
  message: string;
  type: ToastType;
}

export function useToast() {
  const [toast, setToast] = useState<ToastState>({
    open: false,
    message: "",
    type: "info",
  });

  const showToast = (message: string, type: ToastType = "info") => {
    setToast({ open: true, message, type });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    if (toast.open) {
      const timer = setTimeout(() => {
        hideToast();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [toast.open]);

  return {
    toast,
    showToast,
    hideToast,
  };
}
