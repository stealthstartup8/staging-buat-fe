const Button = (props) => {
	const { onClick = () => {}, type = "button", children, className, style, disabled, key } = props;
	return (
		<button onClick={onClick} type={type} className={className} style={style} disabled={disabled}>
			{children}
		</button>
	);
};

export default Button;
