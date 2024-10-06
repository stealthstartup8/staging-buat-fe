const CamelCaseConverter = (str) => {
	return str
		.toLowerCase()
		.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
			if (index === 0) {
				return match.toLowerCase();
			}
			return match.toUpperCase();
		})
		.replace(/\s+/g, "");
};

export default CamelCaseConverter;
