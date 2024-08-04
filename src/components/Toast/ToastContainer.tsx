import { useToastContext } from "../../context";
import Toast from "./Toast";
import "./Toast.css";

const ToastContainer = () => {
    const { toasts, removeToast } = useToastContext();

    return (
        <div className='toast-container'>
            {toasts.length > 0 &&
                toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        id={toast.id}
                        type={toast.type}
                        message={toast.message}
                        duration={toast.duration}
                        onClose={(id) => removeToast(id)}
                    />
                ))}
        </div>
    );
};

export default ToastContainer;
