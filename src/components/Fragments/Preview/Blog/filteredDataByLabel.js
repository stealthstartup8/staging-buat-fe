/**
 * Filters the blog data based on the label ID and blog ID.
 *
 * @param {Array} blogData - The array of blog objects to be filtered.
 * @param {Object} valueComponent - The component object containing blog details for filtering.
 * @param {string} labelId - The label ID to filter the blog data.
 * @returns {Array} - The filtered array of blog objects.
 */

export default function filteredDataByLabel(blogData, valueComponent, labelId = "") {
	const labelIds = new Set(
		valueComponent.blog_detail
			.filter((item) => item.id_blog === "" || blogData.some((blog) => blog.id === item.id_blog))
			.map((item) => item.id_label)
	);

	const hasAllBlogs = valueComponent.blog_detail.some((item) => item.id_blog === "");

	return blogData.filter((blog) => {
		const blogLabelIds = blog.labels.map((label) => label.labelId);

		const isLabelMatch = labelId
			? blogLabelIds.includes(labelId)
			: blogLabelIds.some((id) => labelIds.has(id));

		if (hasAllBlogs) {
			return isLabelMatch;
		}

		const isBlogMatch = valueComponent.blog_detail.some((item) => item.id_blog === blog.id);

		return isLabelMatch && isBlogMatch;
	});
}
