import React from "react";
import { useUserContext } from "../../../context";
import AuthPage from "../../Auth/AuthPage";

interface ProtectedRouteType {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteType> = ({ children }) => {
    const { user } = useUserContext();

    return user ? children : <AuthPage />;
};

export default ProtectedRoute;
