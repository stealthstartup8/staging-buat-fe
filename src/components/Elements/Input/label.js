import { cn } from "@/utils/helpers/ClassName";

const Label = ({ children, className }) => {
	return (
		<label className={cn("block text-sm font-medium text-gray-700 mb-2", className)}>{children}</label>
	);
};

export default Label;
