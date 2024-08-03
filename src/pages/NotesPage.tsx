import { useEffect } from "react";
import NoteCard from "../components/NoteCard";
import { Note } from "../types/types";
import { AddNote } from "../firebase/actions";
import { useProjectContext } from "../context";
import LoaderSpinner from "../components/Loader/LoaderSpinner";
import Controls from "../components/Controls/Controls";

const NotesPage = () => {
    const { notes, loading } = useProjectContext();
    // useEffect(() => {
    //     async function addData() {
    //         await AddNote();
    //     }
    //     addData();
    // }, []);

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
