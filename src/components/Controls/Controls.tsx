import AddButton from "./AddButton/AddButton";
import colors from "../../assets/colors.json";
import "./Controls.css";
import Color from "../Color/Color";

const Controls = () => {
    return (
        <div id='controls'>
            <AddButton />
            {colors.map((color) => (
                <Color key={color.id} color={color} />
            ))}
        </div>
    );
};

export default Controls;
