import { FieldValue } from "firebase/firestore";
import React from "react";

export interface Note {
    noteId: string;
    userId: string;
    note: string;
    colors: Color;
    position: { x: number; y: number };
    created: FieldValue;
}

export interface Color {
    id: string;
    colorHeader: string;
    colorBody: string;
    colorText: string;
}

export interface ToastType {
    id: string;
    message: string;
    duration: number;
    type: string;
}

export interface IconTypes {
    size: string;
}

export interface ContextType {
    notes: Note[] | null;
    setNotes: React.Dispatch<React.SetStateAction<Note[] | null>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    selectedNote: string | null;
    setSelectedNote: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface ToastContextType {
    toasts: ToastType[];
    addToast: (message: string, duration?: number, type?: string) => void;
    removeToast: (id: string) => void;
}
