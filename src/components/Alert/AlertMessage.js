import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AlertMessage() {
    return (
        <ToastContainer
            autoClose={5000}
            pauseOnHover={false}
            pauseOnFocusLoss={false}
        />
    );
}