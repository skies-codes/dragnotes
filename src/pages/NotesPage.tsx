import { fakeData as notes } from "../assets/fakeData";
import NoteCard from "../components/NoteCard";
import { Note } from "../types/types";

const NotesPage = () => {
  return notes.map((note: Note) => (
      <NoteCard note={note} key={note.noteId} />
  ))
};

export default NotesPage;