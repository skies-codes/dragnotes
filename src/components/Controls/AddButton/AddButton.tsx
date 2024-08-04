import { useToastContext } from "../../../context";
import { AddNote } from "../../../firebase/actions";
import Plus from "../../../icons/Plus";

const AddButton = () => {
    const { addToast } = useToastContext();
    const addNote = async () => {
        try {
            await AddNote("ak");
            addToast("Created new note.", 3000, "success");
        } catch (error) {
            addToast("Failed to create new note.", 3000, "error");
        }
    };

    return (
        <button id='add-btn' onClick={addNote}>
            <Plus />
        </button>
    );
};

export default AddButton;
