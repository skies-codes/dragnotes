import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where,
} from "firebase/firestore";
import { db } from "./firebase";
import { Note } from "../types/types";
import colors from "../assets/colors.json";
import { v4 as uuidv4 } from "uuid";

// This is a comment gamers

export const AddNote = async (userId: string, note?: string) => {
    try {
        let noteId = uuidv4();
        const data = {
            noteId: noteId,
            userId: userId,
            note: note ? note : "",
            colors: colors[0],
            position: { x: 10, y: 10 },
            created: serverTimestamp(),
        };
        const docRef = doc(db, "notes", noteId);
        await setDoc(docRef, data);
        console.log("Created a new note.");
    } catch (error) {
        console.error("Error adding project: ", error);
        throw new Error(`Error updating Note ${error}`);
    }
};

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
        console.log("note updated");
    } catch (error) {
        console.error("Error while updating document: ", error);
        throw new Error(`Error updating Note ${error}`);
    }
};

export const DeleteNote = async (noteId: string) => {
    try {
        const docRef = doc(db, "notes", noteId);
        await deleteDoc(docRef);
        console.log("Document successfully deleted!");
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
};
