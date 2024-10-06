import React from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";

const Modal = ({ open, handleOpen, children, size }) => {
	return (
		<>
			<Dialog open={open} handler={handleOpen} size={size}>
				{children}
			</Dialog>
		</>
	);
};
//
const Header = ({ children, className }) => {
	return <DialogHeader className={className}>{children}</DialogHeader>;
};

const Body = ({ children, className }) => {
	return <DialogBody className={className}>{children}</DialogBody>;
};

const Footer = ({ children }) => {
	return <DialogFooter>{children}</DialogFooter>;
};

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
