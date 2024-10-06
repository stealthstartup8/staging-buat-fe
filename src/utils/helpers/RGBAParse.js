export const RGBAtoString = ({ r = 0, g = 0, b = 0, a = 1 }) => {
	return `rgba(${r},${g},${b},${a})`;
};

export const stringToRGBA = (string) => {
	// format is "rgba(xxx,xxx,xxx,xxx)" *DONT USE SPACES, rgba(xxx, xxx, xxx, xxx) is unreadable by tailwind
	// Parsing transformation
	// 1. rgba(xxx,xxx,xxx,xxx) (initial)
	// 2. (xxx,xxx,xxx,xxx)
	// 3. xxx,xxx,xxx,xxx)
	// 4. xxx,xxx,xxx,xxx
	// 5. [xxx,xxx,xxx,xxx] (array of string)
	// 6. [xxx,xxx,xxx,xxx] (array of number)
	const parsedStringAsArray = string.slice(4).slice(1).slice(0, -1).split(",").map(Number);
	return {
		r: parsedStringAsArray[0],
		g: parsedStringAsArray[1],
		b: parsedStringAsArray[2],
		a: parsedStringAsArray[3],
	};
};

// test
const temp = JSON.stringify(stringToRGBA("rgba(123.3,12.32,52.123,0.54123)"));
console.log(temp);
console.log(RGBAtoString(stringToRGBA("rgba(123.3,12.32,52.123,0.54123)")));
