import {
    collection,
    doc,
    getDocs,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import { db } from "./firebase";
import { Note } from "../types/types";

export const GetNotes = async (userId: string): Promise<Note[] | null> => {
    try {
        const q = query(collection(db, "notes"), where("userId", "==", userId));

        const response = await getDocs(q);
        if (response.empty) {
            return null;
        } else {
            return response.docs.map((doc) => doc.data()) as Note[];
        }
    } catch (error) {
        throw new Error("Failed to fetch notes in actions.ts");
    }
};

export const UpdateNote = async (
    noteId: string,
    fieldsToUpdate: { [field: string]: any }
) => {
    try {
        const docRef = doc(db, "notes", noteId);
        await updateDoc(docRef, fieldsToUpdate);
        localStorage.removeItem("notes");
    } catch (error) {
        console.error("Error updating document: ", error);
        throw new Error(`Error updating Note ${error}`);
    }
};
