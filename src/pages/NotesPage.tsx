import NoteCard from "../components/NoteCard";
import { Note } from "../types/types";
import { useProjectContext } from "../context";
import LoaderSpinner from "../components/Loader/LoaderSpinner";
import Controls from "../components/Controls/Controls";

const NotesPage = () => {
    const { notes, loading } = useProjectContext();

    return loading ? (
        <LoaderSpinner msg='Loading your notes, please wait...' />
    ) : (
        <>
            {notes?.map((note: Note) => (
                <NoteCard note={note} key={note.noteId} />
            ))}
            <Controls />
        </>
    );
};

export default NotesPage;
