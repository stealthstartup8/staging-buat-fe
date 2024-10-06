import {
	Card,
	Typography,
	List,
	ListItem,
	ListItemPrefix,
	AccordionHeader,
	AccordionBody,
	Accordion,
} from "@material-tailwind/react";
import {
	UserIcon,
	Cog6ToothIcon,
	ChevronRightIcon,
	ChevronDownIcon,
	ArrowRightStartOnRectangleIcon,
	UserCircleIcon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut, signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Sidebar = ({ user_data, mobileSidebar, setMobileSidebar }) => {
	const path = usePathname();
	const router = useRouter();

	const { data: session, status } = useSession();
	const [open, setOpen] = useState(path == "/domain" || path == "/settings" ? 1 : 0);
	const [openWebMenu, setOpenWebMenu] = useState(
		path == "/" ||
			path == "/posts" ||
			path == "/form" ||
			path == "/job-vacancy" ||
			path == "/pricing" ||
			path == "/e-commerce"
			? 1
			: 0
	);

	const handleOpen = (value) => {
		setOpen(open === value ? 0 : value);
	};

	const handleOpenWebMenu = (value) => {
		setOpenWebMenu(openWebMenu === value ? 0 : value);
	};

	if (!session && status == "unauthenticated") {
		return signIn();
	}

	useEffect(() => {
		const handleRouteChange = () => {
			setMobileSidebar(false);
		};

		router.events.on("routeChangeComplete", handleRouteChange);
		return () => {
			router.events.off("routeChangeComplete", handleRouteChange);
		};
	}, [router.events]);

	return (
		<>
			{mobileSidebar && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-10"
					onClick={() => setMobileSidebar(false)}
				></div>
			)}
			<Card
				style={{
					"--image-url": `url("/assets/sidebarBG.png")`,
				}}
				className={`${
					mobileSidebar == false && "hidden"
				} z-20 fixed h-full rounded-none lg:rounded-lg lg:relative lg:min-h-[95vh] w-full max-w-[18rem] bg-[image:var(--image-url)] bg-no-repeat bg-cover bg-center shadow-xl shadow-blue-gray-900/5 lg:flex flex-col justify-between`}
			>
				<div>
					<div className="p-4">
						<Typography variant="h5" color="white" className="text-center">
							Varnion
						</Typography>
					</div>
					<div className="bg-[#DADADA] w-full h-[0.5px]"></div>
					<List className="text-white">
						<Accordion
							icon={
								<ChevronDownIcon
									strokeWidth={2.5}
									color="#ffffff"
									className={`mx-auto h-4 w-4 transition-transform  ${
										openWebMenu === 1 ? "rotate-180" : ""
									}`}
								/>
							}
							open={openWebMenu === 1}
						>
							<ListItem className="p-0" selected={openWebMenu === 1}>
								<AccordionHeader
									className="border-b-0 p-3"
									onClick={() => handleOpenWebMenu(1)}
								>
									<ListItemPrefix>
										<Cog6ToothIcon className="h-5 w-5" color="white" />
									</ListItemPrefix>
									<Typography color="white" className="mr-auto font-normal">
										Website Pages
									</Typography>
								</AccordionHeader>
							</ListItem>
							<AccordionBody className="py-1">
								<List className="p-0 text-white">
									<Link href={"/"}>
										<ListItem
											className={`group ${
												path == "/" ? "bg-white bg-opacity-40 text-white" : ""
											}`}
										>
											<ListItemPrefix>
												<ChevronRightIcon
													strokeWidth={3}
													className="h-3 w-5 opacity-0 relative -translate-x-5 transition ease-bezier duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-black"
												/>
											</ListItemPrefix>
											Website
										</ListItem>
									</Link>
									<Link href={"/posts"}>
										<ListItem
											className={`group ${
												path == "/posts" ? "bg-white bg-opacity-40 text-white" : ""
											}`}
										>
											<ListItemPrefix>
												<ChevronRightIcon
													strokeWidth={3}
													className="h-3 w-5 opacity-0 relative -translate-x-5 transition ease-bezier duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-black"
												/>
											</ListItemPrefix>
											Posts
										</ListItem>
									</Link>
									<Link href={"/form"}>
										<ListItem
											className={`group ${
												path == "/form" ? "bg-white bg-opacity-40 text-white" : ""
											}`}
										>
											<ListItemPrefix>
												<ChevronRightIcon
													strokeWidth={3}
													className="h-3 w-5 opacity-0 relative -translate-x-5 transition ease-bezier duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-black"
												/>
											</ListItemPrefix>
											Form
										</ListItem>
									</Link>
									<Link href={"/e-commerce"}>
										<ListItem
											className={`group ${
												path == "/e-commerce"
													? "bg-white bg-opacity-40 text-white"
													: ""
											}`}
										>
											<ListItemPrefix>
												<ChevronRightIcon
													strokeWidth={3}
													className="h-3 w-5 opacity-0 relative -translate-x-5 transition ease-bezier duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-black"
												/>
											</ListItemPrefix>
											E-Commerce
										</ListItem>
									</Link>
									{/* <Link href={"/pricing"}>
										<ListItem
											className={
												path == "/pricing" ? "bg-white bg-opacity-40 text-white" : ""
											}
										>
											<ListItemPrefix>
												<ChevronRightIcon strokeWidth={3} className="h-3 w-5 opacity-0 relative -translate-x-5 transition ease-bezier duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-black" />
											</ListItemPrefix>
											Pricing
										</ListItem>
									</Link> */}
									<Link href={"/job-vacancy"}>
										<ListItem
											className={`${
												path == "/job-vacancy"
													? "bg-white bg-opacity-40 text-white"
													: ""
											} group`}
										>
											<ListItemPrefix>
												<ChevronRightIcon
													strokeWidth={3}
													className="h-3 w-5  opacity-0 relative -translate-x-5 transition ease-bezier duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-black"
												/>
											</ListItemPrefix>
											Job Vacancy
										</ListItem>
									</Link>
								</List>
							</AccordionBody>
						</Accordion>
						<Link href={"/profile"} onClick={() => setOpen(0)}>
							<ListItem className={path == "/profile" ? "bg-white bg-opacity-20" : ""}>
								<ListItemPrefix>
									<UserIcon className="h-5 w-5" />
								</ListItemPrefix>
								Profile
							</ListItem>
						</Link>
						<Accordion
							icon={
								<ChevronDownIcon
									strokeWidth={2.5}
									color="#ffffff"
									className={`mx-auto h-4 w-4 transition-transform  ${
										open === 1 ? "rotate-180" : ""
									}`}
								/>
							}
							open={open === 1}
						>
							<ListItem className="p-0" selected={open === 1}>
								<AccordionHeader className="border-b-0 p-3" onClick={() => handleOpen(1)}>
									<ListItemPrefix>
										<Cog6ToothIcon className="h-5 w-5" color="white" />
									</ListItemPrefix>
									<Typography color="white" className="mr-auto font-normal">
										Settings
									</Typography>
								</AccordionHeader>
							</ListItem>
							<AccordionBody className="py-1">
								<List className="p-0 text-white">
									<Link href={"/settings"}>
										<ListItem
											className={`group ${
												path == "/settings" ? "bg-white text-black" : ""
											}`}
										>
											<ListItemPrefix>
												<ChevronRightIcon
													strokeWidth={3}
													className="h-3 w-5 opacity-0 relative -translate-x-5 transition ease-bezier duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-black"
												/>
											</ListItemPrefix>
											Website Settings
										</ListItem>
									</Link>
									<Link href={"/domain"}>
										<ListItem
											className={`group ${
												path == "/domain" ? "bg-white text-black" : ""
											}`}
										>
											<ListItemPrefix>
												<ChevronRightIcon
													strokeWidth={3}
													className="h-3 w-5 opacity-0 relative -translate-x-5 transition ease-bezier duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-black"
												/>
											</ListItemPrefix>
											Domain
										</ListItem>
									</Link>
								</List>
							</AccordionBody>
						</Accordion>
					</List>
				</div>
				<div className="mb-4 text-white w-full flex flex-col items-center gap-6">
					<div className="bg-[#DADADA] w-full h-[0.5px]"></div>
					<div className="flex items-center justify-between w-full pr-4">
						<div className="flex items-center gap-2 px-2 py-1 rounded-lg">
							<UserCircleIcon className="w-10 h-10" />
							<div>
								<p className="text-[14px]">{user_data?.name}</p>
								<p className="text-[12px] text-[#939393]">{user_data?.role}</p>
							</div>
						</div>
						<div>
							<button
								className="bg-[#ff3333] w-full px-2 py-2 rounded-lg hover:bg-[#e60000]"
								onClick={() => signOut()}
							>
								<ArrowRightStartOnRectangleIcon className="h-5 w-5" />
							</button>
						</div>
					</div>
					{/* <p>Image</p>
        <span className="text-white">aaa</span> */}
				</div>
			</Card>
		</>
	);
};

export default Sidebar;
