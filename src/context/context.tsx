import React, { createContext, useEffect, useState } from "react";
import { ContextType, Note } from "../types/types";
import { useUserContext } from ".";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const Context = createContext<ContextType>({
    notes: [],
    setNotes: () => {},
    loading: false,
    setLoading: () => {},
    selectedNote: null,
    setSelectedNote: () => {},
});

export const AppContext: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { user } = useUserContext();

    const [selectedNote, setSelectedNote] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        // Loading notes from cached data
        const loadNotesFromCache = () => {
            const cachedNotes = localStorage.getItem("notes");
            if (cachedNotes) {
                setNotes(JSON.parse(cachedNotes));
                setLoading(false);
            }
        };

        loadNotesFromCache();

        if (user) {
            const q = query(
                collection(db, "notes"),
                where("userId", "==", user.userId)
            );
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
        }
    }, [user]);

    return (
        <Context.Provider
            value={{
                notes,
                setNotes,
                loading,
                setLoading,
                selectedNote,
                setSelectedNote,
            }}
        >
            {children}
        </Context.Provider>
    );
};
