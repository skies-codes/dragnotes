import { useEffect, useState } from "react";
import { Note } from "../types/types";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const useNotes = (userId: string) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [notes, setNotes] = useState<Note[] | null>(null);

    useEffect(() => {
        const q = query(collection(db, "notes"));
        let unsubscribe = onSnapshot(q, (querySnapshot) => {
            const notesArray: Note[] = [];
            querySnapshot.forEach((doc) => {
                notesArray.push(doc.data() as Note);
            });
            setNotes(notesArray);
            localStorage.setItem("notes", JSON.stringify(notesArray));
            setLoading(false);
        });

        return () => unsubscribe();
    }, [userId]);

    return { notes, setNotes, loading, setLoading };
};
