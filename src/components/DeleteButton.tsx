import { FC } from "react";
import Trash from "../icons/Trash";
import { DeleteNote } from "../firebase/actions";

interface DeleteButtonTypes {
    noteId: string;
}

const DeleteButton: FC<DeleteButtonTypes> = ({ noteId }) => {
    const handleDelete = async (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        e.stopPropagation();
        await DeleteNote(noteId);
    };

    return (
        <div onClick={(e) => handleDelete(e)}>
            <Trash size='24' />
        </div>
    );
};

export default DeleteButton;
