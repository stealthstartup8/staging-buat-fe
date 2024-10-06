import { toast } from "react-toastify";

// Default configuration for all toasts
const defaultToastOptions = {
	position: "top-right",
	autoClose: 1500,
	hideProgressBar: false,
	closeOnClick: true,
	draggable: true,
	pauseOnHover: false,
};

// message could be a string or an object
const Toast = ({ message, type, promise = null }) => {
	switch (type) {
		case "file-size-too-big":
			return toast.error("File size too large (Max 1MB)", {
				...defaultToastOptions,
				toastId: type,
			});
		case "promise":
			return toast.promise(promise, message, {
				...defaultToastOptions,
				toastId: type,
			});
		case "success":
			return toast.success(
				<div>
					<p>{message}</p>
				</div>,
				{
					...defaultToastOptions,
				}
			);
		case "error":
			return toast.error(
				<div>
					<p>{message}</p>
				</div>,
				{
					...defaultToastOptions,
				}
			);
		case "warning":
			return toast.warning(
				<div>
					<p>{message}</p>
				</div>,
				{
					...defaultToastOptions,
				}
			);
		default:
			return toast.warning(
				<div>
					<p>Toast not defined...</p>
				</div>,
				{
					...defaultToastOptions,
				}
			);
	}
};
export default Toast;
