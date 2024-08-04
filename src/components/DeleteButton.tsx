import { FC } from "react";
import Trash from "../icons/Trash";
import { DeleteNote } from "../firebase/actions";
import { useToastContext } from "../context";

interface DeleteButtonTypes {
    noteId: string;
}

const DeleteButton: FC<DeleteButtonTypes> = ({ noteId }) => {
    const { addToast } = useToastContext();

    const handleDelete = async (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        try {
            e.stopPropagation();
            await DeleteNote(noteId);
            addToast("Note deleted", 3000, "success");
        } catch (error) {
            addToast("Failed to delete the note.", 3000, "error");
        }
    };

    return (
        <div onClick={(e) => handleDelete(e)}>
            <Trash size='24' />
        </div>
    );
};

export default DeleteButton;
