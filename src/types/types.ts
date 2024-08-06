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

// Toast Types
export interface ToastType {
    id: string;
    message: string;
    duration: number;
    type: string;
}

export type AddToastType = (
    message: string,
    duration?: number,
    type?: string
) => void;

export interface ToastContextType {
    toasts: ToastType[];
    addToast: AddToastType;
    removeToast: (id: string) => void;
}

// User Types

export interface UserType {
    userId: string;
    username: string;
    email: string;
    profileImg: string;
    created: FieldValue;
}

export interface UserContextType {
    user: UserType | null;
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
}
