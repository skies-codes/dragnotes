import { useContext } from "react";
import { Context } from "./context";
import { ToastContext } from "./ToastContext";

const useProjectContext = () => useContext(Context);
const useToastContext = () => useContext(ToastContext);

export { useProjectContext, useToastContext };
