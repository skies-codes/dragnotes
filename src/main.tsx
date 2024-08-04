import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AppContext } from "./context/context.tsx";
import { ToastProvider } from "./context/ToastContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <ToastProvider>
        <AppContext>
            <App />
        </AppContext>
    </ToastProvider>
);
