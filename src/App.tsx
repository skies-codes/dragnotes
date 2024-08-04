import NotesPage from "./pages/NotesPage";
import ToastContainer from "./components/Toast/ToastContainer";

function App() {
    return (
        <main id='app' className='app'>
            <ToastContainer />
            <NotesPage />
        </main>
    );
}

export default App;
