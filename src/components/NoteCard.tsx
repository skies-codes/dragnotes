import { FC, useEffect, useRef } from "react";
import { Note } from "../types/types";
import Trash from "../icons/Trash";

interface NoteCardTypes {
    note: Note;
}

const NoteCard: FC<NoteCardTypes> = ({ note }) => {
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        autoGrow(textAreaRef);
    }, []);

    function autoGrow(
        textAreaRef: React.MutableRefObject<HTMLTextAreaElement | null>
    ) {
        const { current } = textAreaRef;
        if (current) {
            current.style.height = "auto";
            current.style.height = current.scrollHeight + "px";
        }
    }

    return (
        <div
            className='card'
            style={{
                backgroundColor: note.colors.colorBody,
                left: `${note.position.x}px`,
                top: `${note.position.y}px`,
            }}
        >
            <div
                className='card-header'
                style={{ backgroundColor: note.colors.colorHeader }}
            >
                <Trash size='24' />
            </div>
            <div className='card-body'>
                <textarea
                    ref={textAreaRef}
                    style={{ color: note.colors.colorText }}
                    defaultValue={note.note}
                    onInput={() => {
                        autoGrow(textAreaRef);
                    }}
                ></textarea>
            </div>
        </div>
    );
};

export default NoteCard;
