import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AppContext } from "./context/context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <AppContext>
        <App />
    </AppContext>
);
