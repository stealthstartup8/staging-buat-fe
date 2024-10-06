import { useSelector } from "react-redux";
import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import { Fragment, useState } from "react";
import Image from "next/image";
import ProductModal from "./ProductModal";
import SectionWrapper from "@/components/Elements/Wrapper/SectionWrapper";
import { Label } from "@/components/Elements/InnerTemplate";

const PreviewCommerce3 = ({
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
	const [activeFilter, setActiveFilter] = useState([]);
	const commerce_data = useSelector((state) => state.eCommerceSlice.commerce_data);

	const handleFilterButton = (keyword) => {
		if (keyword == activeFilter) setActiveFilter("");
		else setActiveFilter(keyword);
	};

	return (
		<SectionWrapper
			section={section}
			className="z-20 bg-[image:var(--image-url)] bg-no-repeat bg-cover bg-center flex flex-col lg:justify-center  min-h-screen py-10 md:py-20 relative space-y-10 px-4 md:px-0"
		>
			<div className="md:flex w-full md:px-32 space-y-10 md:space-y-0">
				<div className=" flex md:block w-fit">
					{value_component.category_detail.categories?.map((category, index) => (
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
							{index != value_component.category_detail.categories?.length - 1 && (
								<div className="md:hidden h-full w-[0.5px] bg-[#CCCCCC] mx-4"></div>
							)}
							<hr className="hidden md:block bg-[#CCCCCC]" />
						</div>
					))}
				</div>
				<div className="grid grid-cols-2 md:grid-cols-3 md:w-fit gap-x-4 gap-y-8 mx-auto w-full">
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
									bucketAccess={website.bucketAccess}
									price={product.price}
									discountedPrice={product.discount}
									buttonText={product.buttonName}
									domain={domain_name}
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
									section={section}
									editable={editable}
								/>
							</Fragment>
						))}
				</div>
			</div>
		</SectionWrapper>
	);
};

export default PreviewCommerce3;

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
	domain,
	bucketAccess,
	editable,
}) => {
	const [openModal, setOpenModal] = useState(false);
	const { onClickInnerComponent } = useStyleManagement();
	return (
		<>
			<div
				style={{
					backgroundColor: color,
					borderColor: stroke,
					borderWidth: showStroke ? "1px" : "0px",
				}}
				onClick={(e) => {
					e.stopPropagation();
					setOpenModal(true);
					onClickInnerComponent(e, 2, "commerce-shop-modal", "", section);
				}}
				className="aspect-[3/4] w-full md:w-60 border border-[#DBDBDB] px-4 py-6 space-y-2 cursor-pointer"
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
				<h1>{name}</h1>
				<p className="text-[#939393] text-sm">
					{categories?.map(
						(category, index) =>
							category.category.name + (index != categories.length - 1 ? ", " : "")
					)}
				</p>
				<hr className="bg-[#DBDBDB]" />
				{discountedPrice == "" ? (
					<div className="flex gap-2">
						<p>{price}</p>
					</div>
				) : (
					<div className="flex gap-2">
						<p className="line-through text-[#F24B4B] ">{price}</p>
						<p>{discountedPrice}</p>
					</div>
				)}
				<hr className="bg-[#DBDBDB]" />
			</div>
			{/* {openModal && (
				<div className="w-full h-full absolute top-0 left-0 flex justify-center items-center">
					<div
						className="bg-black bg-opacity-60 w-full h-full absolute top-0 left-0"
						onClick={() => setOpenModal(false)}
					></div> */}
			<ProductModal
				isOpen={openModal}
				setOpen={setOpenModal}
				product={{
					name: name,
					price: price,
					image: image,
				}}
				bucketAccess={bucketAccess}
				onClose={() => setOpenModal(false)}
				{...{
					...modalProps,
					background: color, // temporarily set to card color
					thumbnail_image: image, //temporarily set to card image
				}}
				editable={editable}
			/>
			{/* </div>
			)} */}
		</>
	);
};
