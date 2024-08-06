import React, { createContext, useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { AddToastType, ToastContextType, ToastType } from "../types/types";

const defaultContextValue: ToastContextType = {
    toasts: [],
    addToast: () => {},
    removeToast: () => {},
};

export const ToastContext =
    createContext<ToastContextType>(defaultContextValue);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [toasts, setToasts] = useState<ToastType[]>([]);

    const addToast: AddToastType = useCallback(
        (message, duration = 3000, type = "info") => {
            const id = uuidv4();
            setToasts((prevToasts: ToastType[]) => [
                ...prevToasts,
                { id, message, duration, type },
            ]);
        },
        []
    );

    const removeToast = useCallback((id: string) => {
        setToasts((prevToasts) =>
            prevToasts.filter((toast) => toast.id !== id)
        );
    }, []);

    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
            {children}
        </ToastContext.Provider>
    );
};
