import React, { FC, useEffect, useRef, useState } from "react";
import { Note } from "../../types/types";
import { autoGrow, setActiveCard, setNewOffset } from "../../utils/utils";
import { UpdateNote } from "../../firebase/actions";
import Spinner from "../../icons/Spinner";
import DeleteButton from "../DeleteButton";
import { useProjectContext } from "../../context";
import "./NoteCard.css";

interface NoteCardTypes {
    note: Note;
}

const NoteCard: FC<NoteCardTypes> = ({ note }) => {
    const [position, setPosition] = useState(note.position);
    const [text, setText] = useState<string>(note.note);
    const [saving, setSaving] = useState<boolean>(false);

    // context
    const { setSelectedNote } = useProjectContext();

    // Ref
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const cardRef = useRef<HTMLDivElement | null>(null);
    const keyUpTimer = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        autoGrow(textAreaRef);
    }, []);

    // draggable card position logic
    let mouseStartPos = { x: 0, y: 0 };

    const startDrag = (
        e:
            | React.MouseEvent<HTMLDivElement, MouseEvent>
            | React.TouchEvent<HTMLDivElement>
    ) => {
        const element = e.target as HTMLDivElement;

        if (element.className === "card-header") {
            setSelectedNote(note.noteId);

            if (cardRef.current) {
                setActiveCard(cardRef.current);
            }

            const isMouse = e.type === "mousedown";

            if (isMouse) {
                const startX = (e as React.MouseEvent).clientX;
                const startY = (e as React.MouseEvent).clientY;

                mouseStartPos.x = startX;
                mouseStartPos.y = startY;

                document.addEventListener("mousemove", mouseMove);
                document.addEventListener("mouseup", mouseUp);
            } else {
                const startX = (e as React.TouchEvent).changedTouches[0]
                    .clientX;
                const startY = (e as React.TouchEvent).changedTouches[0]
                    .clientY;

                mouseStartPos.x = startX;
                mouseStartPos.y = startY;

                document.addEventListener("touchmove", mouseMove);
                document.addEventListener("touchend", mouseUp);
            }
        }
    };

    const mouseMove = (e: MouseEvent | TouchEvent) => {
        console.log(e.type);
        let mouseMoveDir;
        const isMouse = e.type === "mousemove";
        if (isMouse) {
            const startX = (e as MouseEvent).clientX;
            const startY = (e as MouseEvent).clientY;

            mouseMoveDir = {
                x: mouseStartPos.x - startX,
                y: mouseStartPos.y - startY,
            };

            mouseStartPos.x = startX;
            mouseStartPos.y = startY;
        } else {
            const startX = (e as TouchEvent).changedTouches[0].clientX;
            const startY = (e as TouchEvent).changedTouches[0].clientY;

            mouseMoveDir = {
                x: mouseStartPos.x - startX,
                y: mouseStartPos.y - startY,
            };

            mouseStartPos.x = startX;
            mouseStartPos.y = startY;
        }
        if (cardRef.current) {
            const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
            setPosition(newPosition);
        }
    };

    const mouseUp = async () => {
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseUp);
        document.removeEventListener("touchmove", mouseMove);
        document.removeEventListener("touchend", mouseUp);
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
                onMouseDown={(e) => startDrag(e)}
                onTouchStart={(e) => startDrag(e)}
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
