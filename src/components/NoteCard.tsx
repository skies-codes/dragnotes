import { FC, useEffect, useRef, useState } from "react";
import { Note } from "../types/types";
import Trash from "../icons/Trash";
import {
    autoGrow,
    bodyParser,
    setActiveCard,
    setNewOffset,
} from "../utils/utils";
import { UpdateNote } from "../firebase/actions";

interface NoteCardTypes {
    note: Note;
}

const NoteCard: FC<NoteCardTypes> = ({ note }) => {
    const [position, setPosition] = useState(note.position);
    const [text, setText] = useState<string>(note.note);

    console.log(text);
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const cardRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        autoGrow(textAreaRef);
    }, []);

    // draggable card position logic
    let mouseStartPos = { x: 0, y: 0 };

    const mouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (cardRef.current) {
            setActiveCard(cardRef.current);
        }
        mouseStartPos.x = e.clientX;
        mouseStartPos.y = e.clientY;

        document.addEventListener("mousemove", mouseMove);
        document.addEventListener("mouseup", mouseUp);
    };

    const mouseMove = (e: MouseEvent) => {
        let mouseMoveDir = {
            x: mouseStartPos.x - e.clientX,
            y: mouseStartPos.y - e.clientY,
        };

        mouseStartPos.x = e.clientX;
        mouseStartPos.y = e.clientY;

        if (cardRef.current) {
            const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
            setPosition(newPosition);
        }
    };

    const mouseUp = async () => {
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseUp);
        if (cardRef.current) {
            const newPosition = setNewOffset(cardRef.current);
            await UpdateNote(note.noteId, {
                note: text,
                position: newPosition,
            });
        }
    };

    return (
        <div
            ref={cardRef}
            className='card'
            style={{
                backgroundColor: note.colors.colorBody,
                left: `${position.x}px`,
                top: `${position.y}px`,
            }}
        >
            <div
                className='card-header'
                style={{ backgroundColor: note.colors.colorHeader }}
                onMouseDown={(e) => mouseDown(e)}
            >
                <Trash size='24' />
            </div>
            <div className='card-body'>
                <textarea
                    ref={textAreaRef}
                    style={{
                        color: note.colors.colorText,
                    }}
                    defaultValue={bodyParser(note.note)}
                    onInput={() => {
                        autoGrow(textAreaRef);
                    }}
                    onFocus={() =>
                        cardRef.current && setActiveCard(cardRef.current)
                    }
                    onChange={(e) => {
                        setText(e.target.value);
                    }}
                ></textarea>
            </div>
        </div>
    );
};

export default NoteCard;
