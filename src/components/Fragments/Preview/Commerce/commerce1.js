import { useSelector } from "react-redux";
import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import { useState, Fragment } from "react";
import Image from "next/image";
import ProductModal from "./ProductModal";
import SectionWrapper from "@/components/Elements/Wrapper/SectionWrapper";
import { Label } from "@/components/Elements/InnerTemplate";
const PreviewCommerce1 = ({
	section,
	value_component,
	idComponent,
	button_slices,
	font_slices,
	sectionComponentHero,
	editable,
	websiteid,
	user_token,
	domain_name,
	website,
	label_slices,
}) => {
	const { onClickInnerComponent } = useStyleManagement();
	const commerce_data = useSelector((state) => state.eCommerceSlice.commerce_data);

	const [activeFilter, setActiveFilter] = useState("");

	const handleFilterButton = (keyword) => {
		if (keyword == activeFilter) setActiveFilter("");
		else setActiveFilter(keyword);
	};

	return (
		<SectionWrapper
			section={section}
			className="p-4 z-20 bg-[image:var(--image-url)] bg-no-repeat bg-cover bg-center flex flex-col lg:justify-center md:w-screen min-h-screen py-20 relative "
		>
			<div className="w-full flex flex-nowrap overflow-x-auto gap-4 lg:justify-center mb-10">
				{value_component?.category_detail.categories?.map((category, index) => (
					<div
						key={index}
						className={`${activeFilter.includes(category.id) ? "opacity-100" : "opacity-75"}`}
					>
						<Label
							label_slices={label_slices}
							item={{
								label: category.name,
							}}
							font_slices={font_slices}
							onClickInnerComponent={(e) => {
								e.stopPropagation();
								onClickInnerComponent(e, 2, "commerce-category", "", section);
								handleFilterButton(category.id);
							}}
							section={section}
							idComponent={idComponent}
							sectionComponentHero={sectionComponentHero}
						/>
					</div>
				))}
			</div>

			<div className="flex flex-nowrap md:flex-wrap w-[90vw] md:column-4 md:w-fit overflow-x-auto md:overflow-x-visible gap-x-2 gap-y-4 mx-auto justify-center">
				{(activeFilter.length === 0
					? // If no filter is active, only display products that have at least one category in the category list
					  commerce_data?.filter((item) => {
							return value_component?.category_detail?.categories?.some((category) =>
								item.categories.some((c) => c.category.id === category.id)
							);
					  })
					: // If a filter is active, only display products that match the active category
					  commerce_data?.filter((item) => {
							return item.categories.some((c) => c.category.id === activeFilter);
					  })
				)
					// Only display active products
					?.filter((item) => item.status)
					?.map((product, index) => (
						<Fragment key={index}>
							<ProductCard
								name={product.name}
								categories={product.categories}
								price={product.price}
								discountedPrice={product.discount}
								buttonText={product.buttonName}
								bucketAccess={website.bucketAccess}
								modalProps={{
									domain: domain_name,
									buttonItem: product.buttonItem,
									...value_component?.modal_detail,
								}}
								image={`${
									process.env.NEXT_PUBLIC_APP_ENV === "dev"
										? `${process.env.NEXT_PUBLIC_API_KEY}/assets/${domain_name}/assets/commerce-item/${product.image}`
										: `${process.env.NEXT_PUBLIC_STORAGE_URL}/${website.bucketAccess}/commerce-assets/${product.image}`
								}`}
								color={value_component?.card_detail.color}
								stroke={value_component?.card_detail.stroke}
								textColor={value_component?.card_detail.textColor}
								section={section}
								font_slices={font_slices}
								editable={editable}
							/>
						</Fragment>
					))}
			</div>
		</SectionWrapper>
	);
};

export default PreviewCommerce1;

const ProductCard = ({
	name,
	categories,
	price,
	discountedPrice,
	image,
	modalProps,
	showStroke,
	color,
	stroke,
	section,
	bucketAccess,
	font_slices,
	textColor,
	editable,
}) => {
	const [openModal, setOpenModal] = useState(false);
	const { onClickInnerComponent } = useStyleManagement();
	return (
		<>
			<div
				className="aspect-[3/4] w-96 md:w-60 px-4 py-6 space-y-2 cursor-pointer"
				onClick={(e) => {
					e.stopPropagation();
					setOpenModal(true);
					onClickInnerComponent(e, 2, "commerce-shop-modal", "", section);
				}}
				style={{
					backgroundColor: color,
					borderColor: stroke,
					borderWidth: "1px",
				}}
			>
				<div className="aspect-square w-full">
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
				<h1
					style={{
						color: textColor,
					}}
					className="font-bold text-xl"
				>
					{name}
					
				</h1>
				<p
					className="text-sm"
					style={{
						color: textColor,
						opacity: 0.75,
					}}
				>
					{categories?.map(
						(category, index) =>
							category.category.name + (index != categories.length - 1 ? ", " : "")
					)}
				</p>
				<hr className="bg-[#DBDBDB]" />
				{discountedPrice == "" ? (
					<div className="flex gap-2">
						<p
							style={{
								color: font_slices?.tagline?.color,
								fontFamily: font_slices?.tagline?.font_style,
								fontWeight: font_slices?.tagline?.bold == true ? "700" : "normal",
								fontStyle: font_slices?.tagline?.italic == true ? "italic" : "",
							}}
						>
							{price}
						</p>
					</div>
				) : (
					<div className="flex gap-2">
						<p
							style={{
								color: font_slices?.headline?.color,
								fontFamily: font_slices?.headline?.font_style,
								fontWeight: font_slices?.headline?.bold == true ? "700" : "normal",
								fontStyle: font_slices?.headline?.italic == true ? "italic" : "",
							}}
							className="line-through"
						>
							{price}
						</p>
						<p
							style={{
								color: font_slices?.tagline?.color,
								fontFamily: font_slices?.tagline?.font_style,
								fontWeight: font_slices?.tagline?.bold == true ? "700" : "normal",
								fontStyle: font_slices?.tagline?.italic == true ? "italic" : "",
							}}
						>
							{discountedPrice}
						</p>
					</div>
				)}
				<hr className="bg-[#DBDBDB]" />
			</div>
			<ProductModal
				isOpen={openModal}
				editable={editable}
				setOpen={setOpenModal}
				onClose={() => setOpenModal(false)}
				bucketAccess={bucketAccess}
				{...{
					...modalProps,
					title: name,
					background: color, // temporarily set to card color
					thumbnail_image: image, //temporarily set to card image
					textColor: textColor,
				}}
			/>
		</>
	);
};
