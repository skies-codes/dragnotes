import React from "react";
import type { Color } from "../../types/types";
import "./Color.css";
import { useProjectContext, useToastContext } from "../../context";
import { UpdateNote } from "../../firebase/actions";

interface ColorType {
    color: Color;
}

const Color: React.FC<ColorType> = ({ color }) => {
    const { addToast } = useToastContext();
    const { selectedNote } = useProjectContext();

    const changeColor = async () => {
        try {
            selectedNote
                ? await UpdateNote(selectedNote, { colors: color })
                : addToast("Please select a note first!");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div
            onClick={changeColor}
            className='color'
            style={{ backgroundColor: color.colorHeader }}
        ></div>
    );
};

export default Color;
