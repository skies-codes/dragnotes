import NoteCard from "../components/NoteCard";
import { Note } from "../types/types";
import { useProjectContext } from "../context";
import LoaderSpinner from "../components/Loader/LoaderSpinner";
import Controls from "../components/Controls/Controls";
import EmptyNotes from "../icons/EmptyNotes";
import "./NotesPage.css";
import UserProfile from "../components/UserProfile/UserProfile";

const NotesPage = () => {
    const { notes, loading } = useProjectContext();

    return loading ? (
        <LoaderSpinner msg='Loading your notes, please wait...' />
    ) : (
        <>
            {notes.length > 0 ? (
                notes?.map((note: Note) => (
                    <NoteCard note={note} key={note.noteId} />
                ))
            ) : (
                <div className='empty-notes'>
                    <EmptyNotes size='200px' />
                    <p>
                        Every great idea begins with the first note. Write yours
                        today!
                    </p>
                </div>
            )}
            <Controls />
            <UserProfile />
        </>
    );
};

export default NotesPage;
