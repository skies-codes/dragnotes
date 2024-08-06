import React, { createContext, useEffect, useState } from "react";
import { UserContextType, UserType } from "../types/types";

const defaultUserContextValue: UserContextType = {
    user: null,
    setUser: () => {},
};

export const UserContext = createContext<UserContextType>(
    defaultUserContextValue
);

export const UserContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [user, setUser] = useState<UserType | null>(null);

    useEffect(() => {
        const userData = localStorage.getItem("userSession");

        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
