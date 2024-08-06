import { useContext } from "react";
import { Context } from "./context";
import { ToastContext } from "./ToastContext";
import { UserContext } from "./UserContext";

const useProjectContext = () => useContext(Context);
const useToastContext = () => useContext(ToastContext);
const useUserContext = () => useContext(UserContext);

export { useProjectContext, useToastContext, useUserContext };
