import { FieldValue } from "firebase/firestore";

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
