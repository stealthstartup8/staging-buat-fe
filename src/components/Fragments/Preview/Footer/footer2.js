import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useFontSize } from "@/utils/constants/FontSize";

const PreviewFooter2 = ({
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
			<footer className="w-screen px-7 md:px-14 container mx-auto">
				<div className="flex flex-col md:flex-row gap-8 md:gap-16 md:items-center p-5 md:p-10 justify-start">
					<div className="flex flex-col gap-8">
						<div className="w-60 aspect-video">
							{footer_information.item.logo != "" && (
								<img
									src={footer_information.item.logo}
									alt="logo"
									className="object-cover w-full"
								/>
							)}
						</div>
						<div className="grid md:grid-cols-1 grid-cols-2 gap-2">
							{footer_social.item.map((item, index) => (
								<ul
									key={index}
									style={{
										fontSize: getFooterTaglineFontSize(footer_font.item.font_size),
									}}
									className="list-none"
								>
									<li className="flex items-center gap-2">
										{item.icon && (
											<img src={item.icon} alt="icon" width={35} height={20} />
										)}
										<p>{item.social_name}</p>
									</li>
								</ul>
							))}
						</div>
						<div className="flex flex-col gap-3">
							<p
								className="text-lg font-bold"
								style={{
									fontSize: getFooterHeadlineFontSize(footer_font.item.font_size),
								}}
							>
								{footer_information.item.title}
							</p>
							<div className="space-y-2">
								<p
									className="font-medium"
									style={{
										fontSize: getFooterTaglineFontSize(footer_font.item.font_size),
									}}
								>
									{footer_information.item.about}
								</p>
								{footer_information.item.information.map((item, index) => (
									<div
										key={index}
										className="flex items-center w-full mb-2 gap-4"
										onClick={(e) => {
											e.stopPropagation();
											setSelectComponent("footer-information");
										}}
										style={{
											fontSize: getFooterTaglineFontSize(footer_font.item.font_size),
										}}
									>
										<div className="relative overflow-clip size-6 *:absolute *:object-cover *:w-full *:h-full">
											{item.information_type == "email" ? (
												<EnvelopeIcon />
											) : item.information_type == "phone" ? (
												<PhoneIcon />
											) : item.information_type == "address" ? (
												<MapPinIcon />
											) : (
												""
											)}
										</div>
										<span className=" w-10/12">{item.information}</span>
									</div>
								))}
							</div>
						</div>
					</div>
					<div className="grid grid-cols-2 md:grid-cols-3 gap-x-20 md:gap-x-40 gap-y-5">
						{footer_navigation.item.map((item, index) => (
							<div
								onClick={(e) => {
									e.stopPropagation();
									setSelectComponent("footer-navigation");
								}}
								key={index}
							>
								<h1
									className=" mb-3 text-[24px] font-bold"
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
				<hr className="border border-[#ffff] mt-4"></hr>
				<div
					className="mx-auto w-fit"
					style={{
						fontSize: getFooterTaglineFontSize(footer_font.item.font_size),
					}}
				>
					<span>
						<span className="font-bold">{footer_information.item.footer_note}</span>
					</span>
				</div>
			</footer>
		</div>
	);
};

export default PreviewFooter2;
