import React, { createContext } from "react";
import { ContextType } from "../types/types";
import { useNotes } from "../hooks";

export const Context = createContext<ContextType>({
    notes: null,
    setNotes: () => {},
    loading: false,
    setLoading: () => {},
});

export const AppContext: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { notes, setNotes, loading, setLoading } = useNotes("ak");

    return (
        <Context.Provider
            value={{
                notes,
                setNotes,
                loading,
                setLoading,
            }}
        >
            {children}
        </Context.Provider>
    );
};
