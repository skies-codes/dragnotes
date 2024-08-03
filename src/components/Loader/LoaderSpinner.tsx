import React from "react";
import Spinner from "../../icons/Spinner";
import "./LoaderSpinner.css";

interface LoaderSpinnerType {
    msg: string;
}

const LoaderSpinner: React.FC<LoaderSpinnerType> = ({ msg }) => {
    return (
        <section className='loader-spinner'>
            <Spinner />
            <span>{msg}</span>
        </section>
    );
};

export default LoaderSpinner;
