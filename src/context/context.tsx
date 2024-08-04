import React, { createContext, useState } from "react";
import { ContextType } from "../types/types";
import { useNotes } from "../hooks";

export const Context = createContext<ContextType>({
    notes: null,
    setNotes: () => {},
    loading: false,
    setLoading: () => {},
    selectedNote: null,
    setSelectedNote: () => {},
});

export const AppContext: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [selectedNote, setSelectedNote] = useState<string | null>(null);
    const { notes, setNotes, loading, setLoading } = useNotes("ak");

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
