import { AddNote } from "../../../firebase/actions";
import Plus from "../../../icons/Plus";

const AddButton = () => {
    const addNote = async () => {
        await AddNote("ak");
    };

    return (
        <button id='add-btn' onClick={addNote}>
            <Plus />
        </button>
    );
};

export default AddButton;
