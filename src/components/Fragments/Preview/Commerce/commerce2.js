import { useSelector } from "react-redux";
import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import { Fragment, useState } from "react";
import Image from "next/image";
import ProductModal from "./ProductModal";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import SectionWrapper from "@/components/Elements/Wrapper/SectionWrapper";
import { Label } from "@/components/Elements/InnerTemplate";
const PreviewCommerce2 = ({
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
	const [activeFilter, setActiveFilter] = useState([]);
	const [openModal, setOpenModal] = useState(""); // store the product id that is clicked
	const commerce_data = useSelector((state) => state.eCommerceSlice.commerce_data);
	const { onClickInnerComponent } = useStyleManagement();

	const handleFilterButton = (keyword) => {
		if (keyword == activeFilter) setActiveFilter("");
		else setActiveFilter(keyword);
	};

	return (
		<>
			<SectionWrapper
				section={section}
				className="bg-[image:var(--image-url)] bg-no-repeat bg-cover bg-center flex flex-col lg:justify-center md:w-screen min-h-screen py-10 md:py-20 relative space-y-10"
			>
				{section.background_type == "video" && (
					<video
						src={section.background_image}
						autoPlay
						loop
						muted
						className="w-[100%] h-[100%] object-cover bgVideo z-[0]"
					></video>
				)}
				<div className="pl-8 md:pl-40 space-y-10">
					<div className="w-full flex gap-4 justify-start">
						{value_component.category_detail?.categories?.map((category, index) => (
							<div
								key={index}
								className={`${
									activeFilter.includes(category.id) ? "opacity-100" : "opacity-75"
								}`}
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
					<div className="flex w-full relative ">
						<Swiper
							spaceBetween={5}
							breakpoints={{
								0: {
									slidesPerView: 1.2,
								},
								768: {
									slidesPerView: 4.5,
								},
							}}
						>
							{(activeFilter.length === 0
								? // If no filter is active, only display products that have at least one category in the category list
								  commerce_data?.filter((item) => {
										return value_component?.category_detail?.categories?.some(
											(category) =>
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
										<SwiperSlide>
											<ProductCard
												id={product.id}
												name={product.name}
												categories={product.categories}
												price={product.price}
												discountedPrice={product.discount}
												buttonText={product.buttonName}
												image={`${
													process.env.NEXT_PUBLIC_APP_ENV === "dev"
														? `${process.env.NEXT_PUBLIC_API_KEY}/assets/${domain_name}/assets/commerce-item/${product.image}`
														: `https://${domain_name}.${process.env.NEXT_PUBLIC_DOMAIN_URL}/assets/commerce-item/${product.image}`
												}`}
												color={value_component?.card_detail.color}
												stroke={value_component?.card_detail.stroke}
												onClick={(id) => setOpenModal(id)}
												section={section}
											/>
										</SwiperSlide>
									</Fragment>
								))}
						</Swiper>
					</div>
				</div>
			</SectionWrapper>
			{openModal && (
				<div className="w-full h-full absolute top-0 left-0 flex justify-center items-center  z-10 ">
					<div
						className="bg-black bg-opacity-60 w-full h-full absolute top-0 left-0"
						onClick={() => setOpenModal("")}
					></div>
					{commerce_data
						?.filter((item) => {
							return item.id === openModal;
						})
						.map((product, index) => (
							<Fragment key={index}>
								<ProductModal
									isOpen={openModal}
									product={{
										name: product.name,
										price: product.price,
										image: product.image,
									}}
									onClose={() => setOpenModal("")}
									bucketAccess={website.bucketAccess}
									buttonItem={product.buttonItem}
									{...value_component?.modal_detail}
									background={value_component?.card_detail.color} // temporarily set to the card color
									thumbnail_image={`${
										process.env.NEXT_PUBLIC_APP_ENV === "dev"
											? `${process.env.NEXT_PUBLIC_API_KEY}/assets/${domain_name}/assets/commerce-item/${product.image}`
											: `${process.env.NEXT_PUBLIC_STORAGE_URL}/${website.bucketAccess}/commerce-assets/${product.image}`
									}`}
									editable={editable}
								/>
							</Fragment>
						))}
				</div>
			)}
		</>
	);
};

export default PreviewCommerce2;

const ProductCard = ({
	id,
	name,
	categories,
	price,
	discountedPrice,
	image,
	buttonText,
	showStroke,
	color,
	stroke,
	onClick,
	section,
}) => {
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
					onClick(id);
					// onClickInnerComponent(e, 2, "commerce-shop-modal", "", section);
					onClickInnerComponent(e, 2, "commerce-category", "", section); // temporary, change to the top one when the modal management is ready
				}}
				className="aspect-[3/4] w-96 md:w-60 border border-[#DBDBDB] px-4 py-6 space-y-2 cursor-pointer"
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
		</>
	);
};
