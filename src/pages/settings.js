import Input from "@/components/Elements/Input";
import Button from "@/components/Elements/Button";
import UploadFile from "@/components/Elements/UploadFile";
import Label from "@/components/Elements/Input/label";
import { getSession } from "next-auth/react";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import UpdateConfirmation from "@/components/Fragments/Popup/confirmation";
import { useWebsite } from "@/utils/hooks/useWebsite";
import { MAX_FILE_SIZE } from "@/utils/constants/Constraints";
import Toast from "@/components/Elements/Toast/Toast";
import { ICON_STORAGE_DIR } from "@/utils/constants/Storage";

const Settings = ({ website_detail, sessionData }) => {
	const { handleUpdateWebsite, handleDeleteWebsite } = useWebsite();
	const [confirm, setConfirm] = useState(false);
	const [deleteConfirmation, setDeleteConfirmation] = useState(false);
	const [loading, setLoading] = useState(false);

	const [website, setWebsite] = useState({
		title: website_detail.title,
		desc: website_detail.desc,
		meta: website_detail.meta,
		googleAnalytic: website_detail.googleAnalytic,
		icon: `${process.env.NEXT_PUBLIC_STORAGE_URL}/${website_detail.bucketAccess}/${ICON_STORAGE_DIR}/${website_detail.icon}`,
		iconFile: "",
		access_domain: website_detail.access_domain,
		chatFloating: website_detail.chatFloating,
		urlFloating: website_detail.urlFloating,
		floatingChatIcon:
			website_detail.iconFloating == ""
				? "/assets/whatsapp-icon.png"
				: `${process.env.NEXT_PUBLIC_STORAGE_URL}/${website_detail.bucketAccess}/${ICON_STORAGE_DIR}/${website_detail.iconFloating}`,
		floatingChatIconFile: "",
	});

	function handleChangeIcon({ file, url }) {
		// if (!e.target.files[0]) {
		// 	setOpen(!open);
		// 	return;
		// }
		// if (e.target.files[0]?.size > MAX_FILE_SIZE) {
		// 	Toast({ type: "file-size-too-big" });
		// 	setOpen(!open);
		// 	return false;
		// }
		setWebsite({
			...website,
			iconFile: file,
			icon: url,
		});
	}

	function handleChangeFloatingIcon(e) {
		if (!e.target.files[0]) {
			setOpen(!open);
			return;
		}
		if (e.target.files[0]?.size > MAX_FILE_SIZE) {
			Toast({ type: "file-size-too-big" });
			setOpen(!open);
			return false;
		}
		setWebsite({
			...website,
			floatingChatIconFile: e.target.files[0],
			floatingChatIcon: URL.createObjectURL(e.target.files[0]),
		});
	}

	return (
		<>
			<UpdateConfirmation
				header="Update Settings"
				confirmButton="Update"
				loading={loading}
				open={confirm}
				setOpen={() => {
					setConfirm(false);
				}}
				handlerSubmit={(e) =>
					handleUpdateWebsite(
						e,
						website_detail.id,
						sessionData.user.token,
						website,
						website_detail,
						setLoading
					)
				}
				confirmationMessage="Are you sure you want to update/replace the current Website information?"
			/>

			<UpdateConfirmation
				header="Delete Website"
				confirmButton="Delete"
				open={deleteConfirmation}
				setOpen={() => {
					setDeleteConfirmation(false);
				}}
				loading={loading}
				handlerSubmit={(e) =>
					handleDeleteWebsite(e, website_detail.id, sessionData.user.token, setLoading)
				}
				confirmationMessage="Are you sure you want to delete the current Website?"
			/>

			<div className="container px-4 pt-16 lg:pt-0">
				<div className="items-center z-[-10] lg:flex gap-7 hide-scrollbar">
					<div className="lg:w-7/12 overflow-hidden md:block hidden lg:mb-0 mb-8">
						<Image
							src={"/assets/website-setting-banner.png"}
							className="w-full object-cover max-h-[500px] rounded-[24px]"
							width={500}
							height={500}
							alt=""
						/>
					</div>
					<div className="lg:w-5/12 w-full md:p-0">
						<div className="overflow-auto">
							<div>
								<div className="mb-4">
									<Label>Web-icon & Web Name</Label>
									<div className="flex gap-2 items-center mt-[-10px]">
										<UploadFile
											icon={website.icon}
											accept=".svg,.jpeg,.jpg,.png"
											handleChangeIcon={handleChangeIcon}
										/>
										<div className="w-[100%]">
											<Input
												type="text"
												name="favicon"
												placeholder="Website Title"
												onChange={(e) =>
													setWebsite({ ...website, title: e.target.value })
												}
												value={website.title}
												className="lg:w-[100%] min-w-[100%] px-3 py-2 mb-1 border-2 border-gray-200 rounded-md"
											/>
										</div>
									</div>
								</div>
								<Input
									type="text"
									label="Web Description"
									name="description"
									placeholder="Web Description"
									onChange={(e) => setWebsite({ ...website, desc: e.target.value })}
									value={website.desc}
									className="lg:w-[100%] min-w-[100%] px-3 py-2 border-2 border-gray-200 rounded-md mb-4"
								/>
								<Input
									type="text"
									label="Meta (optional)"
									name="meta"
									placeholder="blog,news,internet"
									onChange={(e) => setWebsite({ ...website, meta: e.target.value })}
									value={website.meta}
									className="mb-[0px] lg:w-[100%] min-w-[100%] px-3 py-2 border-2 border-gray-200 rounded-md mb-4"
								/>
								<p className="text-[12px] mt-1 mb-4 text-[#333]/75">Use ; as a seperator</p>
								<Input
									type="text"
									label="Google analytics - Measurement ID (optional)"
									name="google_analytic"
									placeholder="e.g. G-XXXXXXXXXX or UA-XXXXXXXX-X"
									onChange={(e) =>
										setWebsite({ ...website, googleAnalytic: e.target.value })
									}
									value={website.googleAnalytic}
									className="lg:w-[100%] min-w-[100%] px-3 py-2 border-2 border-gray-200 rounded-md mb-4"
								/>
								<div className="mb-4">
									<div className="flex justify-between items-center mb-1">
										<Label>Floating Chat Icon & Link (optional)</Label>
										<div className="flex gap-1 items-center">
											<p className="text-[14px] text-gray-700">Activation</p>
											<Input
												type="checkbox"
												className="mr-2"
												onChange={(e) =>
													setWebsite({ ...website, chatFloating: e.target.checked })
												}
												checked={website.chatFloating}
											/>
										</div>
									</div>
									<div className="flex gap-2 items-center mt-[-10px]">
										<div className="Upload w-[42px] h-[42px]">
											<div
												htmlFor="file"
												className={`cursor-pointer w-[42px] text-[12px] border border-1 border-[#000000] text-center rounded-md border-dashed`}
												onClick={(e) => {
													e.preventDefault();
													document.getElementById("file-floating").click();
												}}
											>
												<img
													src={website.floatingChatIcon}
													className="w-[42px] h-[42px]"
													draggable="false"
												/>
											</div>
											<input
												type="file"
												className="choose-image-style"
												accept="image/*"
												id="file-floating"
												onChange={(e) => handleChangeFloatingIcon(e)}
											/>
										</div>
										<div className="w-[100%]">
											<Input
												type="text"
												name="favicon"
												placeholder="e.g. https://wa.me/<phonenumber>"
												onChange={(e) =>
													setWebsite({ ...website, urlFloating: e.target.value })
												}
												value={website.urlFloating}
												className="lg:w-[100%] min-w-[100%] px-3 py-2 mb-1 border-2 border-gray-200 rounded-md"
											/>
										</div>
									</div>
								</div>
								<div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
									<div>
										<Button
											type="button"
											onClick={() => setDeleteConfirmation(true)}
											className="lg:w-[100%] min-w-[100%] px-3 py-2 border-2 border-[#F24B4B] text-[#F24B4B] hover:bg-[#F24B4B] hover:text-white rounded-md mb-4"
										>
											Delete Entire Website
										</Button>
									</div>
									<div>
										<Button
											onClick={() => setConfirm(true)}
											type="button"
											className={`lg:w-[100%] min-w-[100%] hover:bg-[#1e43c7] px-3 py-2 border-2 text-white bg-[#082691] border-[#082691] rounded-md mb-4`}
										>
											Save
										</Button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Settings;
export async function getServerSideProps(ctx) {
	const session = await getSession(ctx);
	if (!session) {
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};
	} else {
		const res = await axios.get(process.env.NEXT_PUBLIC_API_KEY + `/website/` + session.user.data.id, {
			headers: {
				Authorization: `Bearer ${session.user.token}`,
			},
		});

		return {
			props: {
				sessionData: session,
				website_detail: res.data.data,
			},
		};
	}
}
