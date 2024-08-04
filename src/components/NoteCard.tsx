import { FC, useEffect, useRef, useState } from "react";
import { Note } from "../types/types";
import { autoGrow, setActiveCard, setNewOffset } from "../utils/utils";
import { UpdateNote } from "../firebase/actions";
import Spinner from "../icons/Spinner";
import DeleteButton from "./DeleteButton";
import { useProjectContext } from "../context";

interface NoteCardTypes {
    note: Note;
}

const NoteCard: FC<NoteCardTypes> = ({ note }) => {
    const [position, setPosition] = useState(note.position);
    const [text, setText] = useState<string>(note.note);
    const [saving, setSaving] = useState<boolean>(false);

    // context
    const { setSelectedNote } = useProjectContext();

    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const cardRef = useRef<HTMLDivElement | null>(null);
    const keyUpTimer = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        autoGrow(textAreaRef);
    }, []);

    // draggable card position logic
    let mouseStartPos = { x: 0, y: 0 };

    const mouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const element = e.target as HTMLDivElement;
        if (element.className === "card-header") {
            setSelectedNote(note.noteId);

            if (cardRef.current) {
                setActiveCard(cardRef.current);
            }
            mouseStartPos.x = e.clientX;
            mouseStartPos.y = e.clientY;

            document.addEventListener("mousemove", mouseMove);
            document.addEventListener("mouseup", mouseUp);
        }
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
                position: newPosition,
            });
        }
    };

    // Debouncing logic
    const handleKeyUp = async () => {
        setSaving(true);

        if (keyUpTimer.current) {
            clearTimeout(keyUpTimer.current);
        }

        keyUpTimer.current = setTimeout(async () => {
            await UpdateNote(note.noteId, { note: text }).then(() =>
                setSaving(false)
            );
        }, 2000);
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
                <DeleteButton noteId={note.noteId} />
                {saving && (
                    <div className='card-saving'>
                        <Spinner color={note.colors.colorText} />
                        <span style={{ color: note.colors.colorText }}>
                            Saving...
                        </span>
                    </div>
                )}
            </div>
            <div className='card-body'>
                <textarea
                    ref={textAreaRef}
                    style={{
                        color: note.colors.colorText,
                    }}
                    defaultValue={note.note}
                    onInput={() => {
                        autoGrow(textAreaRef);
                    }}
                    onFocus={() => {
                        cardRef.current && setActiveCard(cardRef.current);
                        setSelectedNote(note.noteId);
                    }}
                    onChange={(e) => {
                        setText(e.target.value);
                    }}
                    onKeyUp={handleKeyUp}
                ></textarea>
            </div>
        </div>
    );
};

export default NoteCard;
