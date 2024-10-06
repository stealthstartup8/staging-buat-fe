import React, { Fragment } from "react";
import {
	Navbar,
	Collapse,
	Typography,
	IconButton,
	List,
	ListItem,
	Menu,
	MenuHandler,
	MenuList,
	MenuItem,
} from "@material-tailwind/react";
import { ChevronDownIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useFontSize } from "@/utils/constants/FontSize";
import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import { Button } from "@/components/Elements/InnerTemplate";
import { useSelector } from "react-redux";

function NavListMenu({ name, index, navigation_menu, fontStyle, navigation_style }) {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

	const renderItems = navigation_menu.item[index].sub_navigation.map((item, key) => (
		<a href={item.link} key={key}>
			<MenuItem className="flex items-center gap-3 rounded-md hover:bg-black hover:bg-opacity-20">
				<div>
					<Typography style={fontStyle} variant="p" className="flex items-center">
						{item.subnav_name}
					</Typography>
				</div>
			</MenuItem>
		</a>
	));

	return (
		<React.Fragment>
			<Menu
				open={isMenuOpen}
				handler={setIsMenuOpen}
				offset={{ mainAxis: 20 }}
				placement="bottom"
				allowHover={true}
			>
				<MenuHandler>
					<Typography as="div" variant="small" className="font-medium">
						<ListItem
							style={fontStyle}
							className={`${
								isMenuOpen == true ? "bg-black bg-opacity-20" : ""
							} hover:bg-black hover:bg-opacity-20 active:bg-black active:bg-opacity-20 flex items-center gap-2 py-2 pr-4`}
							selected={isMenuOpen || isMobileMenuOpen}
							onClick={() => setIsMobileMenuOpen((cur) => !cur)}
						>
							{name}
							<ChevronDownIcon
								strokeWidth={2.5}
								className={`hidden h-3 w-3 transition-transform lg:block ${
									isMenuOpen ? "rotate-180" : ""
								}`}
							/>
							<ChevronDownIcon
								strokeWidth={2.5}
								className={`block h-3 w-3 transition-transform lg:hidden ${
									isMobileMenuOpen ? "rotate-180" : ""
								}`}
							/>
						</ListItem>
					</Typography>
				</MenuHandler>

				<MenuList className={`hidden max-w-screen-xl rounded-xl lg:block border-0 shadow-none p-0`}>
					<ul
						style={{
							backgroundColor: `${navigation_style.item.background_color}`,
						}}
						className="gap-x-2 outline-none outline-0"
					>
						<div className="p-2">{renderItems}</div>
					</ul>
				</MenuList>
			</Menu>

			<div
				style={{
					backgroundColor: navigation_style.item.background_color,
				}}
				className="block lg:hidden"
			>
				<Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
			</div>
		</React.Fragment>
	);
}

function NavList({ navigation_menu, navigation_font, navigation_style, navigation_button, editable }) {
	const { onClickNavbarComponent } = useStyleManagement();
	const { getNavbarFontSize } = useFontSize();

	return (
		<List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1 gap-2 min-w-0 items-center">
			{navigation_menu.item.map((item, index) => (
				<Fragment key={index}>
					{item.isButton == false && (
						<>
							{item.sub_navigation.length == 0 ? (
								<Typography
									as="a"
									href="#"
									target="_blank"
									variant="small"
									color="blue-gray"
									className="font-medium"
								>
									<ListItem
										className={`hover:bg-black hover:bg-opacity-20 active:bg-black active:bg-opacity-20 flex items-center gap-2 py-2 pr-4`}
										style={{
											fontSize: getNavbarFontSize(navigation_font.item.font_size),
											color: navigation_font.item.color,
											textDecoration: navigation_font.item.text_decoration,
											fontFamily: navigation_font.item.font_style,
											fontWeight: navigation_font.item.bold == true ? "700" : "normal",
											fontStyle: navigation_font.item.italic == true ? "italic" : "",
										}}
									>
										{item.navigation_name}
									</ListItem>
								</Typography>
							) : (
								<NavListMenu
									name={item.navigation_name}
									index={index}
									navigation_menu={navigation_menu}
									navigation_style={navigation_style}
									fontStyle={{
										fontSize: getNavbarFontSize(navigation_font.item.font_size),
										color: navigation_font.item.color,
										textDecoration: navigation_font.item.text_decoration,
										fontFamily: navigation_font.item.font_style,
										fontWeight: navigation_font.item.bold == true ? "700" : "normal",
										fontStyle: navigation_font.item.italic == true ? "italic" : "",
									}}
								/>
							)}
						</>
					)}
				</Fragment>
			))}

			{navigation_menu.item.map((item, index) => (
				<Fragment key={index}>
					{item.isButton == true && (
						<Button
							button_slices={{
								text_color: navigation_font.item.color,
								stroke_color: navigation_button.item.stroke_button_color,
								button_color: navigation_button.item.button_color,
								button_shape: item.id_shape,
								name: item.navigation_name,
							}}
							font_slices={{
								button: navigation_font.item,
							}}
							onClickInnerComponent={
								editable == true
									? (e) => {
											e.stopPropagation();
											onClickNavbarComponent("navbar-button");
										}
									: () => window.open(button_slices?.link, "_blank")
							}
							editable={editable}
						/>
					)}
				</Fragment>
			))}
		</List>
	);
}

const PreviewNavbar3 = ({
	navigation_menu,
	navigation_style,
	navigation_font,
	navigation_button,
	editable,
	show_navbar,
}) => {
	const [openNav, setOpenNav] = React.useState(false);
	const { onClickNavbarComponent } = useStyleManagement();
	const sectionSlice = useSelector((state) => state.persistedReducer.sectionSlices);

	React.useEffect(() => {
		window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
	}, []);

	return (
		<div
			className="fixed w-[100vw] z-30"
			style={{ backgroundColor: sectionSlice.item[0].background_color }}
		>
			{(!editable || show_navbar) && (
				<Navbar
					style={{
						backgroundColor: navigation_style.item.background_color,
						boxShadow: "none",
					}}
					className="backdrop-blur-none w-[100%] max-w-[100vw] px-4 py-2 rounded-none border-none"
				>
					<div className="container mx-auto flex items-center lg:justify-center justify-between text-blue-gray-900 w-[100%]">
						<div>
							<div
								onClick={
									editable == true
										? (e) => {
												e.stopPropagation();
												onClickNavbarComponent("navbar-logo");
											}
										: () => {}
								}
								className="flex items-center gap-2 cursor-pointer lg:justify-center lg:mb-2"
							>
								{navigation_style.item.logo_image != "" && (
									<img
										src={navigation_style.item.logo_image}
										className="h-8 mr-4 cursor-pointer lg:ml-4"
									/>
								)}
							</div>
							<div className="hidden lg:block">
								<NavList
									navigation_menu={navigation_menu}
									navigation_font={navigation_font}
									navigation_style={navigation_style}
									navigation_button={navigation_button}
									editable={editable}
								/>
							</div>
						</div>

						<IconButton
							variant="text"
							color="blue-gray"
							className="lg:hidden"
							onClick={() => setOpenNav(!openNav)}
						>
							{openNav ? (
								<XMarkIcon
									className="h-6 w-6"
									style={{
										color: navigation_font.item.color,
									}}
									strokeWidth={2}
								/>
							) : (
								<Bars3Icon
									className="h-6 w-6"
									style={{
										color: navigation_font.item.color,
									}}
									strokeWidth={2}
								/>
							)}
						</IconButton>
					</div>
					<Collapse open={openNav}>
						<NavList
							navigation_menu={navigation_menu}
							navigation_font={navigation_font}
							navigation_style={navigation_style}
							navigation_button={navigation_button}
							editable={editable}
						/>
					</Collapse>
				</Navbar>
			)}
		</div>
	);
};

export default PreviewNavbar3;
