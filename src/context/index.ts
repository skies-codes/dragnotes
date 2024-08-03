// src/context/index.ts
import { useContext } from "react";
import { Context } from "./context";

const useProjectContext = () => useContext(Context);

export { useProjectContext };
