import NoteCard from "../components/NoteCard";
import { useNotes } from "../hooks";
import { Note } from "../types/types";

const NotesPage = () => {
    const { notes } = useNotes("1");

    return notes.map((note: Note) => (
        <NoteCard note={note} key={note.noteId} />
    ));
};

export default NotesPage;
