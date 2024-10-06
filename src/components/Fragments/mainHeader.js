import {
	GlobeAltIcon,
	ChevronDownIcon,
	ClipboardDocumentListIcon,
	DocumentDuplicateIcon,
	Bars3Icon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

const MainHeader = (props) => {
	const path = usePathname();
	const { domain, title, id, icon, setMobileSidebar, mobileSidebar } = props;
	// const [openMenu, setOpenMenu] = useState(false);

	return (
		<div className="fixed bg-white z-10 -mt-6 pt-6 lg:p-4 bg-white w-[100vw]">
			<div className="bg-[#081D69] block lg:hidden">
				<div className="flex justify-between items-center p-4">
					<Bars3Icon
						className="h-8 w-8 text-white"
						onClick={() => setMobileSidebar(!mobileSidebar)}
					/>
					<div className="bg-gray-400 rounded-lg h-[28px] w-[94px]"></div>
				</div>
			</div>
			<div className="flex justify-between mr-8 mt-4 pb-4 lg:pb-0">
				<h1 className="text-[16px] lg:text-[24px] font-bold lg:ml-[240px] lg:pl-8 pl-4">
					{path == "/"
						? "Website Pages"
						: path == "/posts"
						? "Posts"
						: path == "/form"
						? "Data Forms"
						: path == "/admin"
						? "Admin Management"
						: path == "/settings"
						? "Settings"
						: path == "/domain"
						? "Domain"
						: path == "/profile"
						? "Profile"
						: path == "/job-vacancy"
						? "Job Vacancy"
						: path == "/e-commerce"
						? "E-Commerce"
						: path == "/pricing"
						? "Pricing"
						: ""}
				</h1>
				<div className="hidden lg:block grid justify-items-stretch">
					<div className="justify-self-end relative">
						<div className="flex text-[14px] align-middle items-center">
							{/* <Image
                        className="object-cover mr-2"
                        src={`https://storage.googleapis.com/cms-varnion-assets-client/icon-website/${icon}`}
                        width={30}
                        height={30}
                        /> */}
							<GlobeAltIcon className="h-7 w-7 mt-1 mr-2 text-[#4777FF]" />
							<div>
								<div className="flex gap-6">
									<p className="mb-[-5px]">{title == undefined ? "Your Website" : title}</p>
									{/* <ChevronDownIcon className="h-4 w-4" /> */}
								</div>
								{/* <div className="flex gap-1">
									<p>
										{domain == undefined ? "yourdomain" : domain}.
										{process.env.NEXT_PUBLIC_DOMAIN_URL}
									</p>
									<DocumentDuplicateIcon
										onClick={() => {
											navigator.clipboard.writeText(
												domain + `.` + process.env.NEXT_PUBLIC_DOMAIN_URL
											);
										}}
										className="h-4 w-4 mt-[2px] hover:text-[#C8CDD0] cursor-pointer"
									/>
								</div> */}
							</div>
						</div>
						{/* {openMenu == true && (
                    <div className="absolute bg-white w-full h-[200px] z-20 border border-1 border-[#C8CDD0] rounded-lg p-4 mt-2 shadow-lg text-[12px]">
                        <div className="flex justify-between">
                        <div>
                            <p>{domain == undefined ? "Your Domain Here" : domain}</p>
                            <p>Website ID: {id}</p>
                        </div>
                        <div>
                            <ClipboardDocumentListIcon className="h-6 w-6 hover:text-[#4777FF] mt-2 cursor-pointer" />
                        </div>
                        </div>
                    </div>
                    )} */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MainHeader;
