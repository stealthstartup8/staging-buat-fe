import { BACKGROUND_STORAGE_DIR, ICON_STORAGE_DIR } from "@/utils/constants/Storage";
import axios from "axios";

export async function SaveBodyData(BodyDatas) {
	const bodySlice = BodyDatas.body_slice;
	const buttonSlice = BodyDatas.button_slice;
	const labelSlice = BodyDatas.label_slice;
	const fontSlice = BodyDatas.font_slice;
	const user_token = BodyDatas.user_token;
	const user_id = BodyDatas.user_id;
	const page_id = BodyDatas.page_id;
	const getSectionApi = BodyDatas.section_slice;
	const website_id = BodyDatas.website_detail.id;
	const domain_name = BodyDatas.website_detail.access_domain[0].name;
	const bucketAccess = BodyDatas.website_detail.bucketAccess;

	for (let i = 0; i < getSectionApi.item.length; i++) {
		if (getSectionApi.item[i]?.id == null) {
			const category_id = getSectionApi.item[i].id_category;
			const template_id = getSectionApi.item[i].id_template;
			const order_index = getSectionApi.item[i].order_index;
			const background_color = getSectionApi.item[i].background_color;
			const background_image = getSectionApi.item[i].background_file;
			const type_background = getSectionApi.item[i].background_type;

			const postSection = await axios.post(
				process.env.NEXT_PUBLIC_API_KEY + `/section`,
				{
					orderIndex: order_index,
					backgroundColor: background_color,
					backgroundImage: background_image,
					idCategory: category_id,
					idTemplate: template_id,
					type: type_background,
					idPage: page_id,
					idWebsite: website_id,
				},
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Bearer ${user_token}`,
					},
				}
			);
		} else {
			const putSection = await axios.put(
				process.env.NEXT_PUBLIC_API_KEY + `/section/` + getSectionApi.item[i].id,
				{
					orderIndex: getSectionApi.item[i].order_index,
					backgroundColor: getSectionApi.item[i].background_color,
				},
				{
					headers: {
						Authorization: `Bearer ${user_token}`,
						id: user_id,
					},
				}
			);
		}
	}

	const getSection = await axios.get(process.env.NEXT_PUBLIC_API_KEY + `/section/` + page_id, {
		headers: {
			Authorization: `Bearer ${user_token}`,
		},
	});

	for (let i = 0; i < getSection.data.data.length; i++) {
		if (getSectionApi.item[i]?.id != null) {
			if (
				`${process.env.NEXT_PUBLIC_STORAGE_URL}/${bucketAccess}/${BACKGROUND_STORAGE_DIR}/${getSection.data.data[i].backgroundImage}` !=
				getSectionApi.item[i].background_image
			) {
				const putBackground = await axios.put(
					process.env.NEXT_PUBLIC_API_KEY +
						`/section/update-background-section/` +
						getSection.data.data[i].id,
					{
						background: getSectionApi.item[i].background_file,
						type: getSectionApi.item[i].background_type,
						idWebsite: website_id,
					},
					{
						headers: {
							"Content-Type": "multipart/form-data",
							Authorization: `Bearer ${user_token}`,
						},
					}
				);
			}
		}
	}

	for (let i = 0; i < getSection.data.data.length; i++) {
		var buttonItem = [];
		for (let f = 0; f < bodySlice.item[i]?.components.length; f++) {
			var buttonItem = [];
			if (bodySlice.item[i]?.components[f].id == null) {
				const postButton = await axios.post(
					process.env.NEXT_PUBLIC_API_KEY + `/button-component`,
					{
						idShape: parseInt(buttonSlice.item[i].button_shape),
						name: buttonSlice.item[i].name,
						fontType:
							fontSlice.item[i].button.font_style == ""
								? "inherit"
								: fontSlice.item[i].button.font_style,
						bold: fontSlice.item[i].button.bold,
						fontSize: fontSlice.item[i].button.font_size,
						italic: fontSlice.item[i].button.italic,
						textDecoration: fontSlice.item[i].button.text_decoration,
						textColor: buttonSlice.item[i].text_color || fontSlice.item[i].button.color,
						background: buttonSlice.item[i].button_color,
						strokeColor: buttonSlice.item[i].stroke_color,
						showIcon: buttonSlice.item[i].show_icon,
						icon: buttonSlice.item[i].icon_file,
						url: buttonSlice.item[i].link,
						idWebsite: website_id,
					},
					{
						headers: {
							"Content-Type": "multipart/form-data",
							Authorization: `Bearer ${user_token}`,
						},
					}
				);

				buttonItem.push(postButton.data.data.id);

				const postSectionComponent = await axios.post(
					process.env.NEXT_PUBLIC_API_KEY + `/section-component`,
					{
						thumbnail: bodySlice.item[i]?.components[f].background_file,
						isButton: String(bodySlice.item[i]?.components[f].show_button),
						idSection: getSection.data.data[i].id,
						type:
							bodySlice.item[i]?.components[f].background_type == undefined
								? ""
								: bodySlice.item[i]?.components[f].background_type,
						idWebsite: website_id,
						buttonItem: buttonItem,
					},
					{
						headers: {
							"Content-Type": "multipart/form-data",
							Authorization: `Bearer ${user_token}`,
						},
					}
				);

				const postLabel = await axios.post(
					process.env.NEXT_PUBLIC_API_KEY + `/label-component`,
					{
						idShape: parseInt(labelSlice.item[i].shape),
						name: bodySlice.item[i]?.components[f].label,
						background: labelSlice.item[i].background_color,
						strokeColor: labelSlice.item[i].stroke_color,
						icon: labelSlice.item[i].icon_file,
						showIcon: labelSlice.item[i].show_icon,
						fontType:
							fontSlice.item[i].label.font_style == ""
								? "inherit"
								: fontSlice.item[i].label.font_style,
						bold: fontSlice.item[i].label.bold,
						fontSize: fontSlice.item[i].label.font_size,
						italic: fontSlice.item[i].label.italic,
						textDecoration: fontSlice.item[i].label.text_decoration,
						textAlign: fontSlice.item[i].label.align,
						// prioritize text color from fontslice if template category is 7 (blog detail)
						textColor:
							bodySlice.item[i]?.id_category === 7
								? fontSlice.item[i].label.color
								: labelSlice.item[i].text_color || fontSlice.item[i].label.color,
						idSectionComponent: postSectionComponent.data.data.id,
						idWebsite: website_id,
					},
					{
						headers: {
							"Content-Type": "multipart/form-data",
							Authorization: `Bearer ${user_token}`,
						},
					}
				);

				const postTitle = await axios.post(
					process.env.NEXT_PUBLIC_API_KEY + `/title`,
					{
						name: bodySlice.item[i]?.components[f].title,
						fontType:
							fontSlice.item[i].headline.font_style == ""
								? "inherit"
								: fontSlice.item[i].headline.font_style,
						bold: fontSlice.item[i].headline.bold,
						fontSize: fontSlice.item[i].headline.font_size,
						italic: fontSlice.item[i].headline.italic,
						textDecoration: fontSlice.item[i].headline.text_decoration,
						textAlign: fontSlice.item[i].headline.align,
						textColor: fontSlice.item[i].headline.color,
						idSectionComponent: postSectionComponent.data.data.id,
					},
					{
						headers: {
							Authorization: `Bearer ${user_token}`,
						},
					}
				);

				const postTagline = await axios.post(
					process.env.NEXT_PUBLIC_API_KEY + `/desc-component`,
					{
						name: bodySlice.item[i]?.components[f].tagline,
						fontType:
							fontSlice.item[i].tagline.font_style == ""
								? "inherit"
								: fontSlice.item[i].tagline.font_style,
						bold: fontSlice.item[i].tagline.bold,
						fontSize: fontSlice.item[i].tagline.font_size,
						italic: fontSlice.item[i].tagline.italic,
						textDecoration: fontSlice.item[i].tagline.text_decoration,
						textAlign: fontSlice.item[i].tagline.align,
						textColor: fontSlice.item[i].tagline.color,
						idSectionComponent: postSectionComponent.data.data.id,
					},
					{
						headers: {
							Authorization: `Bearer ${user_token}`,
							userid: user_id,
						},
					}
				);
			} else {
				const putButton = await axios.put(
					process.env.NEXT_PUBLIC_API_KEY +
						`/button-component/` +
						bodySlice.item[i]?.components[f].button_item[0],
					{
						idShape: parseInt(buttonSlice.item[i].button_shape),
						name: buttonSlice.item[i].name,
						fontType:
							fontSlice.item[i].button.font_style == ""
								? "inherit"
								: fontSlice.item[i].button.font_style,
						bold: fontSlice.item[i].button.bold,
						fontSize: fontSlice.item[i].button.font_size,
						italic: fontSlice.item[i].button.italic,
						textDecoration: fontSlice.item[i].button.text_decoration,
						textColor: buttonSlice.item[i].text_color || fontSlice.item[i].button.color,
						background: buttonSlice.item[i].button_color,
						strokeColor: buttonSlice.item[i].stroke_color,
						showIcon: buttonSlice.item[i].show_icon,
						url: buttonSlice.item[i].link,
					},
					{
						headers: {
							Authorization: `Bearer ${user_token}`,
						},
					}
				);

				buttonItem.push(putButton.data.data.id);

				if (
					`${process.env.NEXT_PUBLIC_STORAGE_URL}/${bucketAccess}/${ICON_STORAGE_DIR}/${putButton.data.data.icon}` !=
					buttonSlice.item[i].icon
				) {
					const putIcon = await axios.put(
						process.env.NEXT_PUBLIC_API_KEY +
							`/button-component/update-icon/` +
							bodySlice.item[i]?.components[f].button_item[0],
						{
							icon: buttonSlice.item[i].icon_file,
							idWebsite: website_id,
						},
						{
							headers: {
								"Content-Type": "multipart/form-data",
								Authorization: `Bearer ${user_token}`,
							},
						}
					);
				}

				const putSectionComponent = await axios.put(
					process.env.NEXT_PUBLIC_API_KEY +
						`/section-component/` +
						bodySlice.item[i]?.components[f].id,
					{
						isButton: bodySlice.item[i]?.components[f].show_button,
						buttonItem: buttonItem,
					},
					{
						headers: {
							Authorization: `Bearer ${user_token}`,
						},
					}
				);

				const putLabel = await axios.put(
					process.env.NEXT_PUBLIC_API_KEY +
						`/label-component/` +
						bodySlice.item[i]?.components[f].id_label,
					{
						idShape: parseInt(labelSlice.item[i].shape),
						name: bodySlice.item[i]?.components[f].label,
						background: labelSlice.item[i].background_color,
						strokeColor: labelSlice.item[i].stroke_color,
						showIcon: labelSlice.item[i].show_icon,
						fontType:
							fontSlice.item[i].label.font_style == ""
								? "inherit"
								: fontSlice.item[i].label.font_style,
						bold: fontSlice.item[i].label.bold,
						fontSize: fontSlice.item[i].label.font_size,
						italic: fontSlice.item[i].label.italic,
						textDecoration: fontSlice.item[i].label.text_decoration,
						textAlign: fontSlice.item[i].label.align,
						// prioritize text color from fontslice if template category is 7 (blog detail)
						textColor:
							bodySlice.item[i]?.id_category === 7
								? fontSlice.item[i].label.color
								: labelSlice.item[i].text_color || fontSlice.item[i].label.color,
					},
					{
						headers: {
							Authorization: `Bearer ${user_token}`,
						},
					}
				);

				if (
					`${process.env.NEXT_PUBLIC_STORAGE_URL}/${bucketAccess}/${ICON_STORAGE_DIR}/${putLabel.data.data.icon}` !=
					labelSlice.item[i].icon
				) {
					const putIcon = await axios.put(
						process.env.NEXT_PUBLIC_API_KEY +
							`/label-component/update-icon/` +
							bodySlice.item[i]?.components[f].id_label,
						{
							icon: labelSlice.item[i].icon_file,
							idWebsite: website_id,
						},
						{
							headers: {
								"Content-Type": "multipart/form-data",
								Authorization: `Bearer ${user_token}`,
							},
						}
					);
				}

				const putTitle = await axios.put(
					process.env.NEXT_PUBLIC_API_KEY + `/title/` + bodySlice.item[i]?.components[f].id_title,
					{
						name: bodySlice.item[i]?.components[f].title,
						fontType:
							fontSlice.item[i].headline.font_style == ""
								? "inherit"
								: fontSlice.item[i].headline.font_style,
						bold: fontSlice.item[i].headline.bold,
						fontSize: fontSlice.item[i].headline.font_size,
						italic: fontSlice.item[i].headline.italic,
						textDecoration: fontSlice.item[i].headline.text_decoration,
						textAlign: fontSlice.item[i].headline.align,
						textColor: fontSlice.item[i].headline.color,
					},
					{
						headers: {
							Authorization: `Bearer ${user_token}`,
						},
					}
				);

				const putTagline = await axios.put(
					process.env.NEXT_PUBLIC_API_KEY +
						`/desc-component/` +
						bodySlice.item[i]?.components[f].id_tagline,
					{
						name: bodySlice.item[i]?.components[f].tagline,
						fontType:
							fontSlice.item[i].tagline.font_style == ""
								? "inherit"
								: fontSlice.item[i].tagline.font_style,
						bold: fontSlice.item[i].tagline.bold,
						fontSize: fontSlice.item[i].tagline.font_size,
						italic: fontSlice.item[i].tagline.italic,
						textDecoration: fontSlice.item[i].tagline.text_decoration,
						textAlign: fontSlice.item[i].tagline.align,
						textColor: fontSlice.item[i].tagline.color,
					},
					{
						headers: {
							Authorization: `Bearer ${user_token}`,
						},
					}
				);
			}
		}

		const getSectionComponent = await axios.get(
			process.env.NEXT_PUBLIC_API_KEY + `/section-component/` + getSection.data.data[i].id,
			{
				headers: {
					Authorization: `Bearer ${user_token}`,
				},
			}
		);

		for (let f = 0; f < bodySlice.item[i]?.components.length; f++) {
			if (bodySlice.item[i]?.components[f].id != null) {
				if (
					`${process.env.NEXT_PUBLIC_STORAGE_URL}/${bucketAccess}/${BACKGROUND_STORAGE_DIR}/${getSectionComponent.data.data?.[f]?.thumbnail}` !=
					bodySlice.item[i]?.components[f].background_image
				) {
					const putSectionComponentBg = await axios.put(
						process.env.NEXT_PUBLIC_API_KEY +
							`/section-component/update-thumbnail/` +
							bodySlice.item[i]?.components[f].id,
						{
							thumbnail:
								bodySlice.item[i]?.components[f].background_file == undefined
									? ""
									: bodySlice.item[i]?.components[f].background_file,
							type: bodySlice.item[i]?.components[f].background_type,
							idWebsite: website_id,
						},
						{
							headers: {
								"Content-Type": "multipart/form-data",
								Authorization: `Bearer ${user_token}`,
							},
						}
					);
				}
			}
		}

		/* ==== optional section component ==== */
		if (bodySlice.item[i]?.id_category == 4) {
			for (let q = 0; q < bodySlice.item[i]?.faq.length; q++) {
				if (bodySlice.item[i]?.faq[q].id == null) {
					const postFaq = await axios.post(
						process.env.NEXT_PUBLIC_API_KEY + `/faq-component`,
						{
							question: bodySlice.item[i]?.faq[q].question,
							answer: bodySlice.item[i]?.faq[q].answer,
							idSectionComponent: getSectionComponent.data.data[0].id,
						},
						{
							headers: {
								Authorization: `Bearer ${user_token}`,
							},
						}
					);
				} else {
					const putfaq = await axios.put(
						process.env.NEXT_PUBLIC_API_KEY + `/faq-component/` + bodySlice.item[i]?.faq[q].id,
						{
							question: bodySlice.item[i]?.faq[q].question,
							answer: bodySlice.item[i]?.faq[q].answer,
						},
						{
							headers: {
								Authorization: `Bearer ${user_token}`,
							},
						}
					);
				}
			}
		}

		if (bodySlice.item[i]?.id_category == 6) {
			for (let q = 0; q < bodySlice.item[i]?.blog_detail.length; q++) {
				if (bodySlice.item[i]?.blog_detail[q].id == null) {
					const postSectionBlog = await axios.post(
						process.env.NEXT_PUBLIC_API_KEY + `/section-blog`,
						{
							idBlog: bodySlice.item[i]?.blog_detail[q].id_blog,
							idLabel: bodySlice.item[i]?.blog_detail[q].id_label,
							idComponent: getSectionComponent.data.data[0].id,
						},
						{
							headers: {
								Authorization: `Bearer ${user_token}`,
							},
						}
					);
				} else {
					const putSectionBlog = await axios.put(
						process.env.NEXT_PUBLIC_API_KEY +
							`/section-blog/` +
							bodySlice.item[i]?.blog_detail[q].id,
						{
							idBlog: bodySlice.item[i]?.blog_detail[q].id_blog,
							idLabel: bodySlice.item[i]?.blog_detail[q].id_label,
						},
						{
							headers: {
								Authorization: `Bearer ${user_token}`,
							},
						}
					);
				}
			}
		}

		if (
			bodySlice.item[i]?.form_detail?.id_category != "" &&
			bodySlice.item[i]?.form_detail?.id_category != null &&
			bodySlice.item[i]?.form_detail?.id_category != undefined
		) {
			if (bodySlice.item[i]?.id_category == 9) {
				if (bodySlice.item[i]?.form_detail.id == null) {
					const postSectionForm = await axios.post(
						process.env.NEXT_PUBLIC_API_KEY + `/section-form`,
						{
							idSectionComponent: getSectionComponent.data.data[0].id,
							idCategoryForm: bodySlice.item[i]?.form_detail.id_category,
						},
						{
							headers: {
								Authorization: `Bearer ${user_token}`,
							},
						}
					);
				} else {
					const putSectionForm = await axios.put(
						process.env.NEXT_PUBLIC_API_KEY +
							`/section-form/${bodySlice.item[i]?.form_detail.id}`,
						{
							idCategoryForm: bodySlice.item[i]?.form_detail.id_category,
						},
						{
							headers: {
								Authorization: `Bearer ${user_token}`,
							},
						}
					);
				}
			}
		}

		if (bodySlice.item[i]?.id_category == 10) {
			for (let q = 0; q < bodySlice.item[i]?.logo_section.length; q++) {
				if (bodySlice.item[i]?.logo_section[q].id == null) {
					const postLogoSection = await axios.post(
						process.env.NEXT_PUBLIC_API_KEY + `/section-logo`,
						{
							name: bodySlice.item[i]?.logo_section[q].name,
							idSectionComponent: getSectionComponent.data.data[0].id,
							idWebsite: website_id,
							logo: bodySlice.item[i]?.logo_section[q].logo_file,
							orderIndex: bodySlice.item[i]?.logo_section[q].order_index,
						},
						{
							headers: {
								"Content-Type": "multipart/form-data",
								Authorization: `Bearer ${user_token}`,
							},
						}
					);
				} else {
					const putLogoSection = await axios.put(
						process.env.NEXT_PUBLIC_API_KEY +
							`/section-logo/` +
							bodySlice.item[i]?.logo_section[q].id,
						{
							name: bodySlice.item[i]?.logo_section[q].name,
						},
						{
							headers: {
								Authorization: `Bearer ${user_token}`,
							},
						}
					);

					if (
						`${process.env.NEXT_PUBLIC_STORAGE_URL}/${bucketAccess}/${BACKGROUND_STORAGE_DIR}/${putLogoSection.data.data.image}` !=
						bodySlice.item[i]?.logo_section[q].logo_image
					) {
						const putLogo = await axios.put(
							process.env.NEXT_PUBLIC_API_KEY +
								`/section-logo/update-logo/` +
								bodySlice.item[i]?.logo_section[q].id,
							{
								logo: bodySlice.item[i]?.logo_section[q].logo_file,
							},
							{
								headers: {
									"Content-Type": "multipart/form-data",
									Authorization: `Bearer ${user_token}`,
								},
							}
						);
					}
				}
			}
		}

		if (bodySlice.item[i]?.id_category == 11) {
			for (let q = 0; q < bodySlice.item[i]?.category_detail.categories.length; q++) {
				if (bodySlice.item[i]?.category_detail?.categories[q]?.id_section == null) {
					const postSectionCareer = await axios.post(
						process.env.NEXT_PUBLIC_API_KEY + `/section-career`,
						{
							idCategory: bodySlice.item[i]?.category_detail?.categories[q]?.id,
							idSectionComponent: getSectionComponent.data.data[0].id,
						},
						{
							headers: {
								Authorization: `Bearer ${user_token}`,
							},
						}
					);
				}
			}
		}

		if (bodySlice.item[i]?.id_category == 12) {
			for (let q = 0; q < bodySlice.item[i]?.category_detail.categories.length; q++) {
				if (bodySlice.item[i]?.category_detail?.categories[q]?.id_section == null) {
					const postSectionCareer = await axios.post(
						process.env.NEXT_PUBLIC_API_KEY + `/section-price`,
						{
							idCategory: bodySlice.item[i]?.category_detail?.categories[q]?.id,
							idSectionComponent: getSectionComponent.data.data[0].id,
						},
						{
							headers: {
								Authorization: `Bearer ${user_token}`,
							},
						}
					);
				}
			}
		}

		if (bodySlice.item[i]?.id_category == 13) {
			for (let q = 0; q < bodySlice.item[i]?.category_detail.categories.length; q++) {
				if (bodySlice.item[i]?.category_detail?.categories[q]?.id_section == null) {
					const postSectionCareer = await axios.post(
						process.env.NEXT_PUBLIC_API_KEY + `/section-commerce`,
						{
							idCategory: bodySlice.item[i]?.category_detail?.categories[q]?.id,
							idComponent: getSectionComponent.data.data[0].id,
						},
						{
							headers: {
								Authorization: `Bearer ${user_token}`,
							},
						}
					);
				}
			}

			if (bodySlice.item[i]?.card_detail?.id == null) {
				const postCardStyle = await axios.post(
					process.env.NEXT_PUBLIC_API_KEY + `/card-component`,
					{
						idSectionComponent: getSectionComponent.data.data[0].id,
						backgroundColor: bodySlice.item[i]?.card_detail?.color,
						textColor: bodySlice.item[i]?.card_detail?.textColor,
						strokeColor: bodySlice.item[i]?.card_detail?.stroke,
					},
					{
						headers: {
							Authorization: `Bearer ${user_token}`,
						},
					}
				);
			} else {
				const putCardStyle = await axios.put(
					process.env.NEXT_PUBLIC_API_KEY + `/card-component/` + bodySlice.item[i]?.card_detail?.id,
					{
						backgroundColor: bodySlice.item[i]?.card_detail?.color,
						textColor: bodySlice.item[i]?.card_detail?.textColor,
						strokeColor: bodySlice.item[i]?.card_detail?.stroke,
					},
					{
						headers: {
							Authorization: `Bearer ${user_token}`,
						},
					}
				);
			}
		}

		/* ==== end optional section component ==== */
	}
}
