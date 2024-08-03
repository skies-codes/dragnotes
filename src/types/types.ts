import { FieldValue } from "firebase/firestore";
import React from "react";

export interface Note {
    noteId: string;
    userId: string;
    note: string;
    colors: {
        id: string;
        colorHeader: string;
        colorBody: string;
        colorText: string;
    };
    position: { x: number; y: number };
    created: FieldValue;
}

export interface IconTypes {
    size: string;
}

export interface ContextType {
    notes: Note[] | null;
    setNotes: React.Dispatch<React.SetStateAction<Note[] | null>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
