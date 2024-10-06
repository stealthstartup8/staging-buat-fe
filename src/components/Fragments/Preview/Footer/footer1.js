import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useFontSize } from "@/utils/constants/FontSize";
const PreviewFooter1 = ({
	footer_company,
	footer_navigation,
	footer_information,
	footer_social,
	footer_font,
}) => {
	const { setSelectComponent } = useStyleManagement();
	const { getFooterHeadlineFontSize, getFooterTaglineFontSize } = useFontSize();
	return (
		<div
			style={{
				backgroundImage: `url(${footer_company.item.background_images})`,
				backgroundColor: `${footer_company.item.background_color}`,
				fontFamily: footer_font.item.font_style,
				color: footer_font.item.color,
				textDecoration: footer_font.item.text_decoration,
				fontStyle: footer_font.item.italic == true ? "italic" : "",
				fontWeight: footer_font.item.bold == true ? "700" : "normal",
			}}
			className="py-4 bg-no-repeat bg-cover bg-center w-[100vw]"
		>
			<footer className="w-screen p-4 container mx-auto">
				<div className="flex w-full mb-10 flex-wrap">
					<div className="w-12/12 lg:w-8/12">
						<div className="grid grid-cols-2 gap-8 lg:gap-2 lg:grid-cols-3">
							{footer_navigation.item.map((item, index) => (
								<div
									key={index}
									className="mb-8"
									onClick={(e) => {
										e.stopPropagation();
										setSelectComponent("footer-navigation");
									}}
								>
									<h1
										className=" mb-3  font-bold"
										style={{
											fontSize: getFooterHeadlineFontSize(footer_font.item.font_size),
										}}
									>
										{item.navigation_name}
									</h1>
									<ul
										style={{
											fontSize: getFooterTaglineFontSize(footer_font.item.font_size),
										}}
										className="list-none"
									>
										{footer_navigation.item[index].sub_navigation.map((item, index) => (
											<li className="mb-1" key={index}>
												<a href={item.link}>{item.subnav_name}</a>
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					</div>
					<div className="lg:w-4/12">
						<h1
							className=" font-bold text-[24px] mb-7"
							style={{
								fontSize: getFooterHeadlineFontSize(footer_font.item.font_size),
							}}
						>
							{footer_information.item.title}
						</h1>
						<span
							className="mb-4 w-10/12 "
							style={{
								fontSize: getFooterTaglineFontSize(footer_font.item.font_size),
							}}
						>
							{footer_information.item.about}
						</span>
						{footer_information.item.information.map((item, index) => (
							<div
								key={index}
								className="flex items-center w-full mb-2 gap-4 "
								onClick={(e) => {
									e.stopPropagation();
									setSelectComponent("footer-information");
								}}
								style={{
									fontSize: getFooterTaglineFontSize(footer_font.item.font_size),
								}}
							>
								{item.information_type == "email" ? (
									<EnvelopeIcon className="h-6 w-6" />
								) : item.information_type == "phone" ? (
									<PhoneIcon className="h-6 w-6" />
								) : item.information_type == "address" ? (
									<MapPinIcon className="h-6 w-6" />
								) : (
									""
								)}
								<span className=" w-10/12">{item.information}</span>
							</div>
						))}
					</div>
				</div>
				<div
					style={{
						border: `0.75px solid ${footer_font.item.color}`,
						opacity: "0.75",
					}}
					className="border mb-4"
				></div>
				<div className="flex items-center mb-2">
					<div className="w-11/12">
						<div className="flex gap-10">
							{footer_social.item.map((item, index) => (
								<div
									key={index}
									className="flex items-center gap-2"
									onClick={(e) => {
										e.stopPropagation();
										setSelectComponent("footer-social");
									}}
								>
									{item.icon && <img src={item.icon} alt="icon" width={35} height={20} />}
									<span
										style={{
											fontSize: getFooterTaglineFontSize(footer_font.item.font_size),
										}}
									>
										{item.social_name}
									</span>
								</div>
							))}
						</div>
					</div>
					<div
						className="w-1/12 aspect-[3/1] bg-[image:var(--image-url)] bg-no-repeat bg-cover bg-center"
						onClick={(e) => {
							e.stopPropagation();
							setSelectComponent("footer-information");
						}}
						style={{
							"--image-url": `url("${footer_information.item.logo}")`,
						}}
					></div>
				</div>
				<div className="mt-4">
					<h1
						style={{
							fontSize: getFooterTaglineFontSize(footer_font.item.font_size),
						}}
					>
						{footer_information.item.footer_note}
					</h1>
				</div>
			</footer>
		</div>
	);
};

export default PreviewFooter1;
