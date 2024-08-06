import NotesPage from "../../../pages/NotesPage";
import ToastContainer from "../../Toast/ToastContainer";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

const RootLayout = () => {
    return (
        <main id='app' className='app'>
            <ToastContainer />
            <ProtectedRoute>
                <NotesPage />
            </ProtectedRoute>
        </main>
    );
};

export default RootLayout;
