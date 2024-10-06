import DOMPurify from "dompurify";
export function sanitizeHTML(content) {
	const doc = new DOMParser().parseFromString(content, "text/html");

	const images = doc.querySelectorAll("img");
	images.forEach((img) => {
		const placeholder = doc.createTextNode(" [image] ");
		img.parentNode.replaceChild(placeholder, img);
	});

	const iframes = doc.querySelectorAll("iframe");
	iframes.forEach((iframe) => {
		const placeholder = doc.createTextNode(" [iframe/video] ");
		iframe.parentNode.replaceChild(placeholder, iframe);
	});
	const sanitizedData = DOMPurify.sanitize(doc.body.innerHTML);
	return sanitizedData;
}
