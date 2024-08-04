import { useEffect } from "react";

interface ToastType {
    id: string;
    message: string;
    type: string;
    duration: number;
    onClose: (id: string) => void;
}

const Toast: React.FC<ToastType> = ({
    id,
    message,
    type,
    duration,
    onClose,
}): JSX.Element => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(id);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div className={`toast-body toast-${type}`}>
            <span className='toast-msg'>{message}</span>
        </div>
    );
};

export default Toast;
