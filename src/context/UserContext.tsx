import React, { createContext, useState } from "react";
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

    console.log(user);

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
