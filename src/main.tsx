import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AppContext } from "./context/context.tsx";
import { ToastProvider } from "./context/ToastContext.tsx";
import { UserContextProvider } from "./context/UserContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <UserContextProvider>
        <ToastProvider>
            <AppContext>
                <App />
            </AppContext>
        </ToastProvider>
    </UserContextProvider>
);
