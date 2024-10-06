export function splitFileName(fileName) {
	// Get the extention with a regular expression
	const ext = /(?:\.([^.]+))?$/.exec(fileName);
	// If there is no extension, return the filename with no extension
	if (ext[1] === undefined) return [fileName, ""];
	// Get the file name without extention
	const name = fileName.slice(0, -ext[0].length);
	// Return an array with name and extension
	return [name, ext[1]];
}

export const createImage = (url) =>
	new Promise((resolve, reject) => {
		const image = new Image();
		image.addEventListener("load", () => resolve(image));
		image.addEventListener("error", (error) => reject(error));
		image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
		image.src = url;
	});

export function getRadianAngle(degreeValue) {
	return (degreeValue * Math.PI) / 180;
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
export function rotateSize(width, height, rotation) {
	const rotRad = getRadianAngle(rotation);

	return {
		width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
		height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
	};
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 */
/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 */
export async function getCroppedImg(
	imageFile,
	pixelCrop,
	rotation = 0,
	flip = { horizontal: false, vertical: false }
) {
	const image = await createImage(URL.createObjectURL(imageFile));
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");

	if (!ctx) {
		return null;
	}

	const rotRad = getRadianAngle(rotation);

	// calculate bounding box of the rotated image
	const { width: bBoxWidth, height: bBoxHeight } = rotateSize(image.width, image.height, rotation);

	// set canvas size to match the bounding box
	canvas.width = bBoxWidth;
	canvas.height = bBoxHeight;

	// translate canvas context to a central location to allow rotating and flipping around the center
	ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
	ctx.rotate(rotRad);
	ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
	ctx.translate(-image.width / 2, -image.height / 2);

	// draw rotated image
	ctx.drawImage(image, 0, 0);

	const croppedCanvas = document.createElement("canvas");

	const croppedCtx = croppedCanvas.getContext("2d");

	if (!croppedCtx) {
		return null;
	}

	// Set the size of the cropped canvas
	croppedCanvas.width = pixelCrop.width;
	croppedCanvas.height = pixelCrop.height;

	// Draw the cropped image onto the new canvas
	croppedCtx.drawImage(
		canvas,
		pixelCrop.x,
		pixelCrop.y,
		pixelCrop.width,
		pixelCrop.height,
		0,
		0,
		pixelCrop.width,
		pixelCrop.height
	);

	// As Base64 string
	// return croppedCanvas.toDataURL('image/jpeg');

	// As a blob
	return new Promise((resolve, reject) => {
		croppedCanvas.toBlob(
			(blob) => {
				if (!blob) {
					return reject(new Error("Canvas is empty"));
				}
				blob.name = "cropped.png"; // Set the file name
				const file = new File([blob], imageFile.name, { type: blob.type });
				const url = URL.createObjectURL(file);
				resolve({ file, url });
			},
			imageFile.type,
			0.8
		);
	});
}

export async function getRotatedImage(imageFile, rotation = 0) {
	const image = await createImage(URL.createObjectURL(imageFile));
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");

	const orientationChanged = rotation === 90 || rotation === -90 || rotation === 270 || rotation === -270;
	if (orientationChanged) {
		canvas.width = image.height;
		canvas.height = image.width;
	} else {
		canvas.width = image.width;
		canvas.height = image.height;
	}

	ctx.translate(canvas.width / 2, canvas.height / 2);
	ctx.rotate((rotation * Math.PI) / 180);
	ctx.drawImage(image, -image.width / 2, -image.height / 2);

	return new Promise((resolve) => {
		canvas.toBlob(
			(file) => {
				resolve(URL.createObjectURL(file));
			},
			imageFile.type,
			0.8
		);
	});
}
