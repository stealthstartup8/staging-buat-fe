import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useFontSize } from "@/utils/constants/FontSize";
const PreviewFooter3 = ({
	footer_company,
	footer_navigation,
	footer_information,
	footer_social,
	footer_font,
}) => {
	const { setSelectComponent } = useStyleManagement();
	const { getFooterHeadlineFontSize, getHeadlineFontSize, getFooterTaglineFontSize } = useFontSize();
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
			className="py-8 bg-no-repeat bg-cover bg-center w-[100vw]"
		>
			<footer className="w-screen px-7 md:px-14 container mx-auto flex flex-col gap-5 md:gap-10">
				<div className="flex justify-between flex-col md:flex-row gap-5 h-max">
					<div className="w-52 aspect-[16/6]">
						{footer_information.item.logo != "" && footer_information.item.logo != undefined && (
							<img
								src={footer_information.item.logo}
								alt="logo"
								className="object-cover w-full"
							/>
						)}
					</div>
					<div className="md:order-first md:space-y-3">
						<h1
							className="font-bold text-xl"
							style={{
								fontSize: getFooterHeadlineFontSize(footer_font.item.font_size),
							}}
						>
							{footer_information.item.title}
						</h1>
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
				<div className="flex flex-col md:flex-row gap-5 justify-between w-full">
					<div
						className="space-y-4 "
						style={{
							fontSize: getFooterTaglineFontSize(footer_font.item.font_size),
						}}
					>
						<div className="flex gap-3">
							{footer_social?.item[0]?.icon != "" &&
								footer_social?.item[0]?.icon != undefined && (
									<img
										src={footer_social?.item[0]?.icon}
										alt="icon"
										className="size-6 object-cover"
									/>
								)}
							<span className="font-medium">{footer_social?.item[0]?.social_type}</span>
						</div>
						<p
							style={{
								fontSize: getHeadlineFontSize(footer_font.item.font_size),
							}}
						>
							{footer_social?.item[0]?.social_name}
						</p>
					</div>
					<div
						className="space-y-4 [&>p]:text-xl  md:[&>p]:text-7xl"
						style={{
							fontSize: getFooterTaglineFontSize(footer_font.item.font_size),
						}}
					>
						<div className="flex gap-3">
							{footer_social?.item[1]?.icon != "" &&
								footer_social?.item[1]?.icon != undefined && (
									<img
										src={footer_social?.item[1]?.icon}
										alt="icon"
										className="size-6 object-cover"
									/>
								)}
							<span className="font-medium">{footer_social?.item[1]?.social_type}</span>
						</div>
						<p>{footer_social?.item[1]?.social_name}</p>
					</div>
				</div>

				<hr className="border border-[#ffff] mt-4"></hr>
				<div className="flex justify-between flex-col md:flex-row gap-5 text-opacity-50">
					<div className="w-3/4 gap-y-8 flex flex-col">
						<div className="flex md:flex-row flex-col gap-3">
							{footer_navigation.item.map((item, index) => (
								<div>
									<h1
										className=" mb-3 font-bold"
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
												<a href={item.link} className="hover:underline">
													{item.subnav_name}
												</a>
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
						<div
							className="md:flex md:order-first grid grid-cols-2 gap-10"
							style={{
								fontSize: getFooterTaglineFontSize(footer_font.item.font_size),
							}}
						>
							{footer_social.item.slice(2).map((item, index) => (
								<div
									key={index}
									className="flex items-center gap-3"
									onClick={(e) => {
										e.stopPropagation();
										setSelectComponent("footer-social");
									}}
								>
									{item.icon && (
										<img
											src={item.icon}
											alt="icon"
											width={35}
											height={20}
											className="object-cover size-9"
										/>
									)}
									<span>{item.social_name}</span>
								</div>
							))}
						</div>
					</div>
					<div
						className="grow md:self-end"
						style={{
							fontSize: getFooterTaglineFontSize(footer_font.item.font_size),
						}}
					>
						<span>
							<span className="font-bold">{footer_information.item.footer_note}</span>
						</span>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default PreviewFooter3;
