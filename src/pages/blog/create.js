import Button from "@/components/Elements/Button";
import Input from "@/components/Elements/Input";
import Label from "@/components/Elements/Input/label";
import FormContentOne from "@/components/Fragments/Blog/form-contentOne";
import FormContentTwo from "@/components/Fragments/Blog/form-contentTwo";
import { XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useState, useRef } from "react";
import { useEffect } from "react";
import Modal from "@/components/Elements/Modal";
import { MAX_FILE_SIZE } from "@/utils/constants/Constraints";
import Toast from "@/components/Elements/Toast/Toast";
const NewBlog = ({ sessionData, website }) => {
	const [img, setImg] = useState();
	const [inputLabel, setInputLabel] = useState("");
	const [dataLabels, setDataLabels] = useState([]);
	const [labels, setLabels] = useState([]);
	const [datePublish, setDatePublish] = useState("");
	const [content, setContent] = useState("");
	const [title, setTitle] = useState("");
	const [thumbnail, setThumbnail] = useState();
	const [loading, setLoading] = useState(false);
	const [publishConfirmation, setPublishConfirmation] = useState(false);
	const [alert, setAlert] = useState("");

	const [labelListOpen, setLabelListOpen] = useState(false);

	const labelListRef = useRef(null);

	const uploadThumbnail = () => {
		document.getElementById("thumbnail").click();
	};

	const handleChangeFile = (e) => {
		if (!e.target.files[0]) {
			setOpen(!open);
			return;
		}
		if (e.target.files[0]?.size > MAX_FILE_SIZE) {
			Toast({ type: "file-size-too-big" });
			setOpen(!open);
			return false;
		}
		setImg(URL.createObjectURL(e.target.files[0]));
		setThumbnail(e.target.files[0]);
	};

	const handleChangeLabel = (e) => {
		setLabelListOpen(true);
		setInputLabel(e.target.value);
	};

	const handleAddLabel = (e) => {
		if (e.key == "Enter") {
			e.preventDefault();
			const newTag = inputLabel.trim();
			if (newTag && labels.length < 4) {
				setLabels([...labels, inputLabel]);
				setInputLabel("");
			}
		}
	};

	const handleContent = (value) => {
		setContent(value);
	};

	const deleteLabel = (value) => {
		const label = labels.filter((item) => item !== value);
		setLabels(label);
	};

	const handleSubmit = async (e, publishStatus) => {
		e.preventDefault();
		setPublishConfirmation(false);
		setLoading(true);
		try {
			const res = await axios.post(
				process.env.NEXT_PUBLIC_API_KEY + `/blog`,
				{
					title: title,
					thumbnail: thumbnail,
					labelItem: labels,
					content: content,
					publishDate: datePublish,
					publishStatus: publishStatus,
					idWebsite: website.id,
				},
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Bearer ${sessionData.user.token}`,
					},
				}
			);
			window.location.href = "/posts";
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const getLabels = async () => {
			try {
				const res = await axios.get(
					process.env.NEXT_PUBLIC_API_KEY + `/blog/get-label/${website.id}`,
					{
						headers: {
							Authorization: `Bearer ${sessionData.user.token}`,
						},
					}
				);

				setDataLabels(res.data.data.map((item) => item.name));
			} catch (error) {
				console.log(error);
			}
		};
		getLabels();

		const handleClickOutside = (e) => {
			if (labelListRef.current && !labelListRef.current.contains(e.target)) {
				setLabelListOpen(false);
			}
		};

		document.addEventListener("click", handleClickOutside);

		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	let errors = [];

	const handleBeforePublish = (e) => {
		e.preventDefault();
		if (title == "") {
			errors.push("Title is required");
		}
		if (content == "") {
			errors.push("Content is required");
		}
		if (datePublish == "") {
			errors.push("Publish date is required");
		}
		if (labels.length == 0) {
			errors.push("Label is required");
		}
		if (thumbnail == null) {
			errors.push("Thumbnail is required");
		}

		setAlert(errors);

		setPublishConfirmation(true);
	};

	return (
		<>
			<Modal open={publishConfirmation} size="xs">
				<Modal.Header>
					<div className="relative w-[100%] h-[100%] mb-2">
						<div>
							<div className="absolute left-0">
								<p>Publish a Post</p>
							</div>
							<div className="absolute right-0" onClick={() => setPublishConfirmation(false)}>
								<XMarkIcon className="w-5 h-5 mt-1 cursor-pointer hover:text-[#F24B4B]" />
							</div>
						</div>
					</div>
				</Modal.Header>
				<Modal.Body>
					<hr className="mb-2" />
					<p className="text-sm text-black leading-5 mb-6 mt-4">
						Make sure you do one final check to ensure it meets the expectation.
						{alert.length > 0 ? (
							<div className="mt-2">
								{alert.map((item, index) => {
									return (
										<p className="text-[#F24B4B] text-[12px]" key={index}>
											*{item}
										</p>
									);
								})}
							</div>
						) : (
							""
						)}
					</p>
					<div className="flex gap-1">
						<Button
							disabled={loading}
							onClick={() => setPublishConfirmation(false)}
							className=" min-w-[49%] px-3 py-2 border border-1 border-[#000000] text-[#000000] hover:bg-[#000000] hover:text-[#ffffff] rounded-md mb-2 mt-2"
						>
							Back
						</Button>
						<Button
							disabled={alert.length > 0 || loading == true ? true : false}
							onClick={(e) => handleSubmit(e, true)}
							className={`${
								alert.length > 0 || loading == true
									? "bg-[#082691]/70"
									: "bg-[#082691] hover:bg-[#1e43c7]"
							} min-w-[49%] px-3 py-2 text-white rounded-md mb-2 mt-2`}
						>
							Publish
							{loading == true && (
								<div
									className="ml-1 inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] text-info motion-reduce:animate-[spin_1.5s_linear_infinite]"
									role="status"
								>
									<span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
										Loading...
									</span>
								</div>
							)}
						</Button>
					</div>
				</Modal.Body>
			</Modal>

			{/* onSubmit={handleSubmit} */}
			<form method="post" className="container mx-auto mt-16 pb-4">
				<div className="lg:flex justify-end lg:w-[100%] w-[100vw] px-4 mb-4 mr-4">
					<div className="lg:w-4/12 flex gap-2">
						<Button
							disabled={loading}
							onClick={(e) => handleSubmit(e, false)}
							className="mt-4 w-[100%] text-center text-[14px] border border-1 rounded-md px-2 py-2 border-[#082691] text-[#082691] bg-white hover:bg-[#082691] hover:text-white"
						>
							Save as Draft
						</Button>
						<Button
							disabled={loading}
							onClick={(e) => handleBeforePublish(e)}
							className={`mt-4 w-[100%] text-center text-[14px] border border-1 rounded-md px-2 py-2 border-[#082691] text-[#082691] bg-white hover:bg-[#082691] hover:text-white`}
						>
							Publish
						</Button>
					</div>
				</div>
				<div className="flex flex-col-reverse mx-4 lg:mx-0 lg:flex-row ">
					<FormContentOne>
						<FormContentOne.contentLeft
							content={content}
							title={title}
							setTitle={setTitle}
							handleContent={handleContent}
							website={website}
							token={sessionData.user.token}
						/>
					</FormContentOne>
					<FormContentTwo>
						<div className="w-full px-7 py-8 bg-white">
							<div className="mb-7">
								<h1 className="mb-4 font-bold">Content Management</h1>
								<hr></hr>
							</div>
							<div className="bg-[#F5F5F5] p-4 rounded-[8px] mb-4">
								<Label>Status Post</Label>
								<p className="font-bold">Draft</p>
							</div>
							<div className="bg-[#F5F5F5] p-4 rounded-[8px] mb-4">
								<Label>Content Label</Label>
								<div className="relative">
									<Input
										className="w-full border p-2 rounded-[5px]"
										placeholder="Type and Enter to Save"
										name="content"
										type="text"
										value={inputLabel}
										onKeyDown={handleAddLabel}
										onChange={handleChangeLabel}
									/>

									<div
										ref={labelListRef}
										className={`${
											labelListOpen ? "block" : "hidden"
										} transition bg-white mt-1 border border-blue-gray-50 rounded-md shadow-lg shadow-blue-gray-500/10 font-sans text-sm font-normal text-blue-gray-500 overflow-auto focus:outline-none`}
									>
										{dataLabels?.length > 0 &&
											dataLabels
												.filter((item, idx) =>
													item.includes(inputLabel.toLocaleLowerCase())
												)
												.map((item, idx) => (
													<button
														key={idx}
														type={"button"}
														disabled={labels.includes(item)}
														onClick={(e) => {
															e.preventDefault();

															labels.push(item);

															const data = dataLabels.filter(
																(name) => name !== item
															);
															setDataLabels(data);
															setLabelListOpen(false);
															setInputLabel("");
														}}
														className="block w-full pt-[9px] pb-4 px-6 rounded-md text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 focus:bg-blue-gray-50 focus:bg-opacity-80 active:bg-blue-gray-50 active:bg-opacity-80 hover:text-blue-gray-900 focus:text-blue-gray-900 active:text-blue-gray-900 outline-none"
													>
														{item}
													</button>
												))}
									</div>
								</div>
								<div>
									<span className="text-[#F24B4B]  text-[12px]">Max 4 label</span>
									<div className="grid grid-cols-4 mt-1 gap-2">
										{labels.map((item, index) => {
											return (
												<div
													key={index}
													className="w-full flex overflow-hidden items-center px-1 bg-label-data"
												>
													<Button
														className="bg-none mr-1"
														onClick={() => deleteLabel(item)}
													>
														<XCircleIcon className="w-4 h-4 text-[#FF0000]" />
													</Button>
													<span className="text-[13px]">{item}</span>
												</div>
											);
										})}
									</div>
								</div>
							</div>
							<div className="bg-[#F5F5F5] p-4 rounded-[8px] mb-4">
								<Label>Publish Date</Label>
								<Input
									className="w-full border p-2 rounded-[5px]"
									placeholder="Input Date"
									name="content"
									type="datetime-local"
									value={datePublish}
									onChange={(e) => setDatePublish(e.target.value)}
								/>
							</div>

							<div>
								<div className="flex justify-between">
									<Label>Thumbnail</Label>
								</div>
								<div
									className="w-full border-dashed border-2 h-[20vh] flex flex-col justify-center overflow-hidden text-center rounded-[10px] cursor-pointer"
									onClick={() => uploadThumbnail()}
								>
									{img == null && (
										<>
											{" "}
											<h1 className="font-bold text-[#243E87]">Click to browse</h1>
											<span className="text-[#243E87]">PNG, GIF, MP4 (auto play)</span>
										</>
									)}
									{img && (
										<>
											<Image
												src={img}
												className="w-full object-cover"
												width={100}
												height={100}
												alt=" "
											/>
										</>
									)}
								</div>

								<Input
									id="thumbnail"
									type="file"
									className="choose-image-style"
									name="thumbnail"
									onChange={handleChangeFile}
								/>
							</div>
						</div>
					</FormContentTwo>
				</div>
			</form>
		</>
	);
};

export default NewBlog;
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
		const user_id = session.user.data.id;
		const getWebsite = await axios.get(process.env.NEXT_PUBLIC_API_KEY + `/website/` + user_id, {
			headers: {
				Authorization: `Bearer ${session.user.token}`,
			},
		});
		return {
			props: {
				sessionData: session,
				website: getWebsite.data.data,
			},
		};
	}
}
