import { useEffect, useState } from "react";
import { Note } from "../types/types";
import { GetNotes } from "../firebase/actions";

export const useNotes = (userId: string) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        const fetchNotes = async () => {
            const data = await GetNotes(userId);
            console.log("new fetch!");
            if (data) {
                setNotes(data);
                localStorage.setItem("notes", JSON.stringify(data));
            }
        };

        const AllNotes = localStorage.getItem("notes");

        if (AllNotes) {
            setNotes(JSON.parse(AllNotes));
        } else {
            fetchNotes();
        }
    }, [userId]);

    return { notes, setNotes, loading, setLoading };
};
