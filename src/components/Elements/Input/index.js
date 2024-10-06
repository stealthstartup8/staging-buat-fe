import Label from "./label";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Button from "../Button";
import { cn } from "@/utils/helpers/ClassName";

const Input = ({
	type,
	name,
	placeholder,
	value,
	onChange,
	className,
	id,
	label,
	checked,
	onKeyDown,
	style,
	onClick,
	required,
	disabled,
	readOnly,
}) => {
	const [showPassword, setShowPassword] = useState(false);

	function generateRandomWord(length) {
		const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		let result = "";
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * characters.length));
		}
		return result;
	}

	const randomId = generateRandomWord(10);

	return (
		<>
			<Label>{label}</Label>
			<div
				className={cn(
					type == "password" || type == "checkbox" ? "relative" : "w-[100%]",
					type == "checkbox" ? "container-check mr-1" : null
				)}
			>
				<input
					id={id || randomId}
					type={type == "password" ? (showPassword ? "text" : "password") : type}
					name={name}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					className={className}
					checked={checked}
					onKeyDown={onKeyDown}
					style={style}
					onClick={onClick}
					required={required}
					disabled={disabled}
					readOnly={readOnly}
				/>
				{type == "checkbox" && (
					<label className="switch" htmlFor={id || randomId}>
						<span className="slider"></span>
					</label>
				)}
				{type == "password" && (
					<Button className="absolute top-0 right-[15px] mt-[12px]">
						{showPassword == false ? (
							<EyeSlashIcon
								onClick={() => setShowPassword(true)}
								className="w-5 h-5 cursor-pointer hover:text-[#082691]"
							/>
						) : (
							<EyeIcon
								onClick={() => setShowPassword(false)}
								className="w-5 h-5 cursor-pointer hover:text-[#082691]"
							/>
						)}
					</Button>
				)}
			</div>
		</>
	);
};

export default Input;
