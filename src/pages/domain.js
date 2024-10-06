import Button from "@/components/Elements/Button";
import Input from "@/components/Elements/Input";
import Image from "next/image";
import { useState } from "react";
import {
	CheckCircleIcon,
	MagnifyingGlassCircleIcon,
	InformationCircleIcon,
	XCircleIcon,
} from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { getSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";

const Domain = ({ sessionData, website }) => {
	const [customDomain, setCustomDomain] = useState("");
	const router = useRouter();
	const [customDomainExternal, setCustomDomainExternal] = useState("");
	const [domainAvailable, setDomainAvailable] = useState("");
	const [detailDomainStatus, setDetailDomainStatus] = useState(true);
	const [detailDomain, setDetailDomain] = useState({});
	const [domain, setDomain] = useState("");
	const [disabledSSL, setDisabledSSL] = useState(true);
	const [message, setMessage] = useState("");
	const [domainMethod, setDomainMethod] = useState("custom-domain");
	const [statusVerifyTxt, setStatusVerifyTxt] = useState("");
	const [statusVerifyCname, setStatusVerifyCname] = useState("");
	const [statusDomain, setStatusDomain] = useState(false);
	const [inputSubDomain, setInputSubDomain] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		getDetailDomain();
	}, []);

	useEffect(() => {
		if (detailDomain[1]?.status == 1) {
			setStatusDomain(true);
		} else if (detailDomain[1] != undefined) {
			setLoading(true);
			const interval = setInterval(() => {
				IpChecking();
				setLoading(false);
			}, 5000);
			return () => clearInterval(interval);
		}
	}, [customDomainExternal]);

	const getDetailDomain = async (token) => {
		try {
			const res = await axios.get(process.env.NEXT_PUBLIC_API_KEY + `/access-domain/` + website.id, {
				headers: {
					Authorization: `Bearer ${sessionData.user.token}`,
				},
			});
			setDetailDomain(res.data.data);
			setCustomDomain(res.data.data[0]?.name);
			setCustomDomainExternal(res.data.data[1]?.name);
		} catch (error) {
			console.log(error);
		}
	};

	const checkSubDomain = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post(
				process.env.NEXT_PUBLIC_API_KEY + `/access-domain/find-domain`,
				{
					domain: customDomain.replace(" ", "-"),
				},
				{
					headers: {
						Authorization: `Bearer ${sessionData.user.token}`,
					},
				}
			);
			setDomainAvailable(res.data.available);
			setMessage(res.data.message);
			if (res.data.available == true) {
				setDomain(customDomain.replace(" ", "-"));
			} else {
				setDomain("");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const updateSubDomain = async (e) => {
		e.preventDefault();
		try {
			await axios.put(
				process.env.NEXT_PUBLIC_API_KEY +
					`/access-domain/sub-domain/${detailDomain[0].id}/${website.id}`,
				{
					subdomain: customDomain.replace(" ", "-"),
				},
				{
					headers: {
						Authorization: `Bearer ${sessionData.user.token}`,
					},
				}
			);
			router.reload();
		} catch (error) {
			console.log(error);
		}
	};

	const storeDomain = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post(
				process.env.NEXT_PUBLIC_API_KEY + `/custom-domain/add-custom-domain/${website.id}`,
				{
					domain: customDomainExternal,
				},
				{
					headers: {
						Authorization: `Bearer ${sessionData.user.token}`,
					},
				}
			);
			router.reload();
		} catch (error) {
			console.log(error);
		}
	};

	const checkingDomain = () => {
		axios
			.post(
				process.env.NEXT_PUBLIC_API_KEY + `/custom-domain/checking-domain`,
				{
					domain: customDomainExternal,
				},
				{
					headers: {
						Authorization: `Bearer ${sessionData.user.token}`,
					},
				}
			)
			.then((res) => {
				if (res.data.status == false) {
					connectDomain();
				}
				setStatusDomain(res.data.status);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const IpChecking = () => {
		axios
			.post(
				process.env.NEXT_PUBLIC_API_KEY + `/custom-domain/checking-ip`,
				{
					domain: customDomainExternal,
				},
				{
					headers: {
						Authorization: `Bearer ${sessionData.user.token}`,
					},
				}
			)
			.then((res) => {
				if (res.data.status == true) {
					checkingDomain();
				} else {
					setDisabledSSL(true);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const deleteDomain = async (id) => {
		try {
			const res = await axios.delete(
				process.env.NEXT_PUBLIC_API_KEY + `/custom-domain/remove-domain/${customDomainExternal}`,
				{
					headers: {
						Authorization: `Bearer ${sessionData.user.token}`,
					},
				}
			);
			router.reload();
		} catch (error) {
			console.log(error);
		}
	};

	const connectDomain = async () => {
		try {
			const res = await axios.post(
				process.env.NEXT_PUBLIC_API_KEY + `/custom-domain/connect-domain/${website.id}`,
				{
					domain: customDomainExternal,
				},
				{
					headers: {
						Authorization: `Bearer ${sessionData.user.token}`,
					},
				}
			);
		} catch (error) {
			console.log(error);
		}
	};

	const generateSSL = () => {
		axios
			.post(
				process.env.NEXT_PUBLIC_API_KEY +
					`/custom-domain/generate-ssl/${website.directories.name_directory}/${customDomainExternal}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${sessionData.user.token}`,
					},
				}
			)
			.then((res) => {
				console.log(res.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const changeStatusSSL = (value) => {
		axios
			.put(
				process.env.NEXT_PUBLIC_API_KEY + `/custom-domain/change-status-ssl/${customDomainExternal}`,
				{
					status_ssl: value,
				},
				{
					headers: {
						Authorization: `Bearer ${sessionData.user.token}`,
					},
				}
			)
			.then((res) => {
				console.log(res.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleChangeSSL = (value) => {
		if (value == true) {
			generateSSL();
			changeStatusSSL(1);
			router.reload();
		} else {
			connectDomain();
			changeStatusSSL(0);
			router.reload();
		}
	};

	return (
		<>
			<div className="container z-[-10] flex gap-7 px-4 pt-16 lg:pt-0">
				<div className="w-5/12 overflow-hidden md:block hidden">
					<Image
						src={"/assets/domain-banner.png"}
						className="w-full object-cover max-h-[523px] rounded-[24px]"
						width={500}
						height={500}
						alt=""
					/>
				</div>
				<div className="md:w-7/12 w-full md:p-0">
					<div>
						<div>
							<div className="mt-2">
								<div className="flex justify-between">
									<label
										htmlFor="sub-domain"
										className="text-[14px] text-[#616161] mb-2 flex gap-2 items-center"
									>
										<CheckCircleIcon className="w-4 h-4 mt-[1px] text-white bg-[#5ABA47] rounded-[50px]" />
										Sub Domain Active : {detailDomain[0]?.name}.{process.env.NEXT_PUBLIC_DOMAIN_URL}
									</label>
									<div
										onClick={() => setInputSubDomain(!inputSubDomain)}
										className="text-[14px] text-[#616161] underline cursor-pointer"
									>
										Change Domain
									</div>
								</div>
								{inputSubDomain == true && (
									<>
										<p className=" text-[11px] text-[#767676] mt-[-5px] ">
											Input & try to make your sub-domain unique.
										</p>
										<div className="flex mt-2 ">
											<div className="hidden md:inline-block "></div>
											<Input
												type="text"
												name="domain"
												placeholder="www.yourdomain.com"
												value={customDomain.replace(" ", "-")}
												onChange={(e) => {
													setCustomDomain(
														e.target.value
															.replace(/[^a-zA-Z\s-]/g, "")
															.toLowerCase()
													);
													setDomainAvailable();
												}}
												className="w-full px-3 py-2 border-2 border-gray-200 rounded-sm mb-4"
											/>
											{domainAvailable == true ? (
												<Button
													onClick={updateSubDomain}
													className="ml-2 px-3 py-2 bg-[#082691] text-white mb-4 rounded-md hover:bg-[#1e43c7]"
												>
													Save
												</Button>
											) : (
												<Button
													onClick={checkSubDomain}
													className="ml-2 px-3 py-2 bg-[#082691] text-white mb-4 rounded-md hover:bg-[#1e43c7]"
												>
													<MagnifyingGlassCircleIcon className="w-6 h-6" />
												</Button>
											)}
										</div>
										{customDomain != "" &&
											(customDomain == detailDomain[0]?.name ? (
												<p className=" text-[12px] text-[#767676] mt-[-10px] mb-4 flex gap-1">
													<InformationCircleIcon className="w-4 h-4 mt-[1px] text-white bg-[#cad622] rounded-[50px]" />{" "}
													This is Your Curret Domain
												</p>
											) : domainAvailable == true ? (
												<p className=" text-[12px] text-[#767676] mt-[-10px] mb-4 flex gap-1">
													<CheckCircleIcon className="w-4 h-4 mt-[1px] text-white bg-[#5ABA47] rounded-[50px]" />{" "}
													Your {message}
												</p>
											) : domainAvailable == false ? (
												<p className=" text-[12px] text-[#767676] mt-[-10px] mb-4 flex gap-1">
													<XCircleIcon className="w-4 h-4 mt-[1px] text-white bg-[#de1b1b] rounded-[50px]" />{" "}
													Your {message}
												</p>
											) : (
												""
											))}
									</>
								)}
								<hr className="mb-2 mt-2"></hr>
								<label
									htmlFor="custom-domain"
									className="text-[14px] text-[#616161] cursor-pointer"
								>
									Custom Web Domain
								</label>
								<br />
								{domainMethod == "custom-domain" && (
									<>
										<div className="flex mt-2  justify-between">
											{detailDomain[1]?.name != undefined && (
												<div className="mt-2">
													Your Domain :{" "}
													<a
														className="underline hover:text-[#082691]"
														href={`https://${detailDomain[1]?.name}`}
														target="_blank"
													>
														{detailDomain[1]?.name}
													</a>
												</div>
											)}
											{detailDomain[1]?.name == undefined && (
												<Input
													type="text"
													name="custom-domain"
													placeholder="www.yourdomain.com"
													value={customDomainExternal?.replace(" ", "-")}
													onChange={(e) => {
														setCustomDomainExternal(e.target.value.toLowerCase());
														setDomainAvailable();
														setStatusVerifyCname("");
														setStatusVerifyTxt("");
													}}
													className="w-[100%] px-3 py-2 border-2 border-gray-200 rounded-sm mb-4"
												/>
											)}
											{detailDomain[1]?.name == undefined ? (
												<Button
													onClick={storeDomain}
													className="ml-2 px-3 py-2 bg-[#082691] text-white mb-4 rounded-md hover:bg-[#1e43c7]"
												>
													Add
												</Button>
											) : (
												<Button
													onClick={deleteDomain}
													className="ml-2 px-3 py-2 bg-[#F24B4B] text-white mb-4 rounded-md hover:bg-[#db2323]"
												>
													Delete
												</Button>
											)}
										</div>

										{detailDomain[1]?.name != undefined && (
											<>
												<div className="mt-3">
													<ol className="list-decimal ml-4">
														<li className="text-[14px]">
															We need to verify your authority to this domain.{" "}
														</li>
														<ol className="text-black list-disc ml-4">
															<li className="text-[12px]">
																Go to your domain register's website, locate
																your Domain Name System (DNS) settings,
																<br></br>find A Record and add/change the
																following:
															</li>
														</ol>
													</ol>
												</div>
												<div className="w-full mt-4 rounded-md p-3 bg-[#F0F0F0] overflow-x-auto">
													<table className="table-auto w-full">
														<thead>
															<tr className="p-4">
																{statusVerifyTxt != "" &&
																	statusVerifyCname != "" && (
																		<th className="px-6">Status</th>
																	)}
																<th></th>
																<th className="text-[14px] p-2">Type</th>
																<th className="text-[14px] p-2">Name</th>
																<th className="text-[14px] p-2">Value</th>
															</tr>
														</thead>
														<tbody>
															<tr className="p-4">
																<td className="flex justify-center items-center">
																	{loading == true ? (
																		<div
																			className="mt-2 ml-1 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] text-info motion-reduce:animate-[spin_1.5s_linear_infinite]"
																			role="status"
																		>
																			<span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
																				Loading...
																			</span>
																		</div>
																	) : (
																		<>
																			{statusDomain == true ? (
																				<CheckCircleIcon className="w-6 h-6 mt-[1px] text-white bg-[#5ABA47] rounded-[50px]" />
																			) : (
																				<XCircleIcon className="w-6 h-6 mt-[1px] text-white bg-[#de1b1b] rounded-[50px]" />
																			)}
																		</>
																	)}
																</td>

																<td className="text-[14px] p-2 text-center">
																	<span>TXT</span>
																</td>
																<td className="text-[14px] p-2 text-center">
																	_varnion
																</td>
																<td className="text-[14px] p-2 text-center">
																	domain-verify=
																	{customDomainExternal?.replace(" ", "-")},
																	dnvkfnvkfnbvbfjhbv
																</td>
															</tr>
															<tr>
																<td className="flex justify-center items-center">
																	{loading == true ? (
																		<div
																			className="mt-2 ml-1 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] text-info motion-reduce:animate-[spin_1.5s_linear_infinite]"
																			role="status"
																		>
																			<span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
																				Loading...
																			</span>
																		</div>
																	) : (
																		<>
																			{statusDomain == true ? (
																				<CheckCircleIcon className="w-6 h-6 mt-[1px] text-white bg-[#5ABA47] rounded-[50px]" />
																			) : (
																				<XCircleIcon className="w-6 h-6 mt-[1px] text-white bg-[#de1b1b] rounded-[50px]" />
																			)}
																		</>
																	)}
																</td>
																<td className="text-[14px] p-2 text-center">
																	CNAME
																</td>
																<td className="text-[14px] p-2 text-center">
																	{customDomainExternal?.replace(" ", "-")}
																</td>
																<td className="text-[14px] p-2 text-center">
																	custom.
																	{process.env.NEXT_PUBLIC_DOMAIN_URL}
																</td>
															</tr>
															<tr>
																<td className="flex justify-center items-center">
																	{loading == true ? (
																		<div
																			className="mt-2 ml-1 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] text-info motion-reduce:animate-[spin_1.5s_linear_infinite]"
																			role="status"
																		>
																			<span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
																				Loading...
																			</span>
																		</div>
																	) : (
																		<>
																			{statusDomain == true ? (
																				<CheckCircleIcon className="w-6 h-6 mt-[1px] text-white bg-[#5ABA47] rounded-[50px]" />
																			) : (
																				<XCircleIcon className="w-6 h-6 mt-[1px] text-white bg-[#de1b1b] rounded-[50px]" />
																			)}
																		</>
																	)}
																</td>

																<td className="text-[14px] p-2 text-center">
																	CNAME
																</td>
																<td className="text-[14px] p-2 text-center">
																	www
																</td>
																<td className="text-[14px] p-2 text-center">
																	{customDomainExternal?.replace(" ", "-")}{" "}
																</td>
															</tr>
														</tbody>
													</table>
												</div>
												<div className="flex mt-4">
													<span className="text-[14px] font-bold">Tips&nbsp;:</span>
													<span className="ml-4 text-[14px]">
														Depending on your provider, it might take a while for
														the DNS changes <br></br>to take effect and for your
														custom domain to start working.
													</span>
												</div>
												{/* <div className="flex  gap-3 mt-3">
                                                    <div>
                                                        <Input
                                                            type="checkbox"
                                                            onChange={(e) => {
                                                                handleChangeSSL(e.target.checked);
                                                            }}
                                                            className={`${
                                                                disabledSSL == true && "pointer-events-none"
                                                            } border border-white`}
                                                            checked={detailDomain[1]?.status_ssl == 1 && true}
                                                        />
                                                    </div>
                                                    <div>
                                                        {" "}
                                                        <label
                                                            className={`text-[14px] ${
                                                                disabledSSL == true ? "text-[#B4B4B8]" : "text-[black]"
                                                            }`}
                                                        >
                                                            <strong>Enforcing HTTPS</strong> - Please allow up to 24
                                                            hours for this process to complete for yourdomain.com. HTTPS
                                                            offers a crucial layer of encryption, shielding your site
                                                            from unauthorized access and tampering. Once HTTPS
                                                            enforcement is in place, your site will exclusively serve
                                                            content over HTTPS, ensuring heightened security for your
                                                            visitors.
                                                        </label>
                                                    </div>
                                                </div> */}
											</>
										)}
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default Domain;
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
		const website = await axios.get(
			process.env.NEXT_PUBLIC_API_KEY + `/website/` + session.user.data.id,
			{
				headers: {
					Authorization: `Bearer ${session.user.token}`,
				},
			}
		);
		return {
			props: {
				sessionData: session,
				website: website.data.data,
			},
		};
	}
}
