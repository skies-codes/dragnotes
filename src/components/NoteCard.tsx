import { FC, useEffect, useRef, useState } from "react";
import { Note } from "../types/types";
import Trash from "../icons/Trash";
import { setNewOffset } from "../utils/utils";

interface NoteCardTypes {
    note: Note;
}

const NoteCard: FC<NoteCardTypes> = ({ note }) => {
    const [position, setPosition] = useState(note.position);

    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const cardRef = useRef<HTMLDivElement | null>(null);

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

    // draggable card position logic
    let mouseStartPos = { x: 0, y: 0 };

    const mouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        mouseStartPos.x = e.clientX;
        mouseStartPos.y = e.clientY;

        document.addEventListener("mousemove", mouseMove);
        document.addEventListener("mouseup", mouseUp);
    };

    const mouseMove = (e: MouseEvent) => {
        //1 - Calculate move direction
        let mouseMoveDir = {
            x: mouseStartPos.x - e.clientX,
            y: mouseStartPos.y - e.clientY,
        };

        //2 - Update start position for next move.
        mouseStartPos.x = e.clientX;
        mouseStartPos.y = e.clientY;

        //3 - Update card top and left position.
        if (cardRef.current) {
            const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
            setPosition(newPosition);
        }
    };

    const mouseUp = () => {
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseUp);
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
