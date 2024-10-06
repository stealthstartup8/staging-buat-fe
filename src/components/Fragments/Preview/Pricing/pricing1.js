import { useDispatch } from "react-redux";
import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import { Fragment, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { fetchData, fetchCategories } from "@store/pricing";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { sanitizeHTML } from "@/utils/helpers/HTMLParse";
import { useFontSize } from "@/utils/constants/FontSize";
import SectionWrapper from "@/components/Elements/Wrapper/SectionWrapper";
import Headline from "@/components/Elements/InnerTemplate/Headline";
import Tagline from "@/components/Elements/InnerTemplate/Tagline";
const PreviewPricing1 = ({
	section,
	value_component,
	idComponent,
	button_slices,
	font_slices,
	sectionComponentHero,
	editable,
	user_token,
	websiteid,
	domain_name,
}) => {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		dispatch(fetchData({ website_id: websiteid, token: user_token }));
		dispatch(fetchCategories({ website_id: websiteid, token: user_token }));
		setIsLoading(false);
	}, []);

	const pricing_data = useSelector((state) => state.pricingSlice.pricing_datas || []);

	const { onClickInnerComponent } = useStyleManagement();
	const [activeFilter, setActiveFilter] = useState([]);
	const { getLabelFontSize } = useFontSize();

	const handleFilterButton = (keyword) => {
		const index = activeFilter.indexOf(keyword);
		let newFilter = activeFilter;
		if (index != -1) {
			newFilter.splice(index, 1);
		} else {
			newFilter.push(keyword);
		}
		setActiveFilter(newFilter);
	};

	return (
		<SectionWrapper
			section={section}
			className="z-20 bg-[image:var(--image-url)] bg-no-repeat bg-cover bg-center flex flex-col lg:justify-center md:w-screen min-h-screen py-10 md:py-20 relative space-y-10 items-center px-4 md:px-20 "
		>
			{value_component?.components.map((item, index) => (
				<Fragment key={index}>
					<div className="container mx-auto mb-4">
						<Headline
							font_slices={font_slices}
							section={section}
							title={item.title}
							idComponent={idComponent}
							sectionComponentHero={sectionComponentHero}
							editable={editable}
							className="mb-[-5px]"
						/>
						<Tagline
							font_slices={font_slices}
							section={section}
							tagline={item.tagline}
							className={` mt-2`}
							idComponent={idComponent}
							sectionComponentHero={sectionComponentHero}
							editable={editable}
						/>
					</div>
				</Fragment>
			))}
			<div className="w-full md:w-[45rem] rounded-md justify-center p-2 border border-[#DADADA]">
				<Swiper
					spaceBetween={5}
					breakpoints={{
						0: {
							slidesPerView: 2.2,
						},
						768: {
							slidesPerView: 4.2,
						},
					}}
				>
					{value_component?.category_detail.categories?.map((category, index) => (
						<Fragment key={index}>
							<SwiperSlide>
								<CategoryButton
									name={category.name}
									active={activeFilter.includes(category.id)}
									onClick={(e) => {
										e.stopPropagation();
										handleFilterButton(category.id);
										onClickInnerComponent(e, 2, "pricing-package", "", section);
									}}
									color={value_component?.category_detail.color}
									stroke={value_component?.category_detail.stroke}
									shape={value_component?.category_detail.shape}
									font_slices={font_slices}
									getLabelFontSize={getLabelFontSize}
									fontSize={getLabelFontSize(font_slices?.label?.font_size)}
									icon={value_component?.category_detail.icon_image}
								/>
							</SwiperSlide>
						</Fragment>
					))}
				</Swiper>
			</div>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<>
					<div className="hidden md:grid md:grid-cols-3 w-fit gap-x-2 gap-y-4 mx-auto">
						{(activeFilter.length === 0
							? // if no filter is active, only display product that has at least one category in the category list
								pricing_data?.filter((product) => {
									return value_component?.category_detail.categories?.some((category) =>
										product.categories?.some((c) => c.category.id === category.id)
									);
								})
							: // if some filter is active, only display product that has at least one category in the active category list
								pricing_data?.filter((product) => {
									return activeFilter.every((filter) =>
										product.categories?.some(
											(category) => category.category.id === filter
										)
									);
								})
						)
							// only display active product
							.filter((product) => {
								return product.status;
							})
							.map((item, index) => {
								{
									return (
										<Fragment key={index}>
											<PackageCard
												name={item.name}
												categories={item.categories}
												price={item.price}
												discountedPrice={item.diskon}
												image={`${
													process.env.NEXT_PUBLIC_APP_ENV === "dev"
														? `${process.env.NEXT_PUBLIC_API_KEY}/assets/${domain_name}/assets/price-item/${item.image}`
														: `https://${domain_name}.${process.env.NEXT_PUBLIC_DOMAIN_URL}/assets/price-item/${item.image}`
												}`}
												desc={item.desc}
												buttonText={item.buttonName}
												key={index}
												onClickCard={(e) => {
													e.stopPropagation();
													onClickInnerComponent(
														e,
														2,
														"pricing-package",
														"",
														section
													);
												}}
												onClickButton={(e) => {
													e.stopPropagation();
													onClickInnerComponent(e, 2, "button", "", section);
												}}
											/>
										</Fragment>
									);
								}
							})}
					</div>
					<div className="md:hidden w-full">
						<Swiper spaceBetween={5} slidesPerView={1.2}>
							{(activeFilter.length === 0
								? pricing_data?.filter((product) => {
										return value_component?.category_detail.categories?.some((category) =>
											product.categories?.some((c) => c.category.id === category.id)
										);
									})
								: pricing_data?.filter((product) => {
										return activeFilter.every((filter) =>
											product.categories?.some(
												(category) => category.category.id === filter
											)
										);
									})
							).map((item, index) => {
								return (
									<Fragment key={index}>
										<SwiperSlide>
											<PackageCard
												name={item.name}
												categories={item.categories}
												price={item.price}
												discountedPrice={item.diskon}
												image={`${
													process.env.NEXT_PUBLIC_APP_ENV === "dev"
														? `${process.env.NEXT_PUBLIC_API_KEY}/assets/${domain_name}/assets/price-item/${item.image}`
														: `https://${domain_name}.${process.env.NEXT_PUBLIC_DOMAIN_URL}/assets/price-item/${item.image}`
												}`}
												desc={item.desc}
												buttonText={item.buttonName}
												key={index}
											/>
										</SwiperSlide>
									</Fragment>
								);
							})}
						</Swiper>
					</div>
				</>
			)}
		</SectionWrapper>
	);
};

export default PreviewPricing1;
const PackageCard = ({
	name,
	image,
	price,
	discountedPrice,
	categories,
	desc,
	buttonText,
	onClickCard,
	onClickButton,
}) => {
	return (
		<div
			className="aspect-[3/4] w-96 md:w-60 border border-[#DBDBDB] px-4 py-6 space-y-2"
			onClick={onClickCard}
		>
			<div className="aspect-video w-full">
				{image ? (
					<Image
						src={image}
						alt=""
						width={0}
						height={0}
						sizes="100vw"
						style={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
							objectPosition: "center",
						}}
					/>
				) : (
					<div className="bg-[#DBDBDB] w-full h-full"></div>
				)}
			</div>
			<p>
				{categories.map(
					(category, index) => category.category.name + (index != categories.length - 1 ? ", " : "")
				)}
			</p>
			<h1>{name}</h1>
			<div className="flex gap-2">
				<p className="line-through text-[#F24B4B] ">{price}</p>
				<p>{discountedPrice}</p>
			</div>
			<hr className="bg-[#DBDBDB]" />
			<div dangerouslySetInnerHTML={{ __html: sanitizeHTML(desc) }} />
			<hr className="bg-[#DBDBDB]" />
			<button
				onClick={onClickButton}
				className="w-full py-3 flex justify-center font-bold bg-black text-white rounded-md"
			>
				{buttonText}
			</button>
		</div>
	);
};

const CategoryButton = ({ name, active, onClick, color, stroke, shape, font_slices, fontSize, icon }) => {
	return (
		<button
			style={{
				opacity: active ? "1" : "0.3",
				backgroundColor: color,
				borderColor: stroke,
				display: "flex",
				justifyContent: font_slices?.label?.align == "center" ? "center" : "space-between",
				gap: font_slices?.label?.align == "center" ? "0.5rem" : "0",
				flexDirection: font_slices?.label?.align == "right" ? "row-reverse" : "row",
			}}
			className="w-full p-2 rounded-md border-2	"
			onClick={onClick}
		>
			<p
				style={{
					color: font_slices?.label?.color,
					fontFamily: font_slices?.label?.font_style,
					fontWeight: font_slices?.label.bold == true ? "700" : "normal",
					textDecoration: font_slices?.label?.text_decoration,
					fontStyle: font_slices?.label?.italic == true ? "italic" : "",
					fontSize: fontSize,
					textAlign: font_slices?.label?.align,
				}}
			>
				{name}
			</p>
			{icon == "" ? (
				<></>
			) : (
				<div className="h-5 w-5 ml-2 mt-[3px]">
					<Image
						src={icon}
						alt=""
						width={0}
						height={0}
						sizes="100vw"
						style={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
							objectPosition: "center",
						}}
					/>
				</div>
			)}
		</button>
	);
};
