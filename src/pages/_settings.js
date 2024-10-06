import Input from "@/components/Elements/Input";
import Button from "@/components/Elements/Button";
import UploadFile from "@/components/Elements/UploadFile";
import Label from "@/components/Elements/Input/label";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";

const Settings = ({ sessionData }) => {
	const [website, setWebsite] = useState({});
	useEffect(() => {
		getWebsite(sessionData.user.data.id, sessionData.user.token);
	}, []);

	const getWebsite = async (id, token) => {
		try {
			const res = await axios.get(process.env.NEXT_PUBLIC_API_KEY + `/website`, {
				headers: {
					Authorization: `Bearer ${token}`,
					userid: id,
				},
			});
			setWebsite(res.data.data);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<div className="width-sidebar p-4">
				<div className="grid grid-cols-1">
					<form>
						<div className="grid lg:grid-cols-2 gap-2">
							<div>
								<Label>Favicon</Label>
								<div className="flex gap-2">
									<UploadFile accept=".svg,.jpeg,.jpg,.png" />
									<div className="w-[100%]">
										<Input
											type="text"
											name="favicon"
											placeholder="Website Title"
											value={website.web_title}
											className="lg:w-[100%] min-w-[100%] px-3 py-2 border-2 border-gray-200 rounded-sm mb-4"
										/>
									</div>
								</div>
								<Input
									type="text"
									label="Web Description"
									name="description"
									placeholder="Web Description"
									value={website.web_desc}
									className="lg:w-[100%] min-w-[100%] px-3 py-2 border-2 border-gray-200 rounded-sm mb-4"
								/>
								<Input
									type="text"
									label="Meta (optional)"
									name="meta"
									placeholder="blog;news;internet"
									value={website.meta}
									className="mb-[0px] lg:w-[100%] min-w-[100%] px-3 py-2 border-2 border-gray-200 rounded-sm mb-4"
								/>
								<p className="text-[14px] mb-4">Use ; as a seperator</p>
								<Input
									type="text"
									label="Google Analytic (optional)"
									name="google_analytic"
									placeholder="Google Analytic (optional)"
									value={website.google_analytic}
									className="lg:w-[100%] min-w-[100%] px-3 py-2 border-2 border-gray-200 rounded-sm mb-4"
								/>
							</div>
							<div className="mt-2">
								<Input
									type="text"
									label="Custom Web Domain (www)"
									name="domain"
									placeholder="www.yourdomain.com"
									className="lg:w-[100%] min-w-[100%] px-3 py-2 border-2 border-gray-200 rounded-sm mb-4"
									value={website.domain}
								/>
								<div className="ml-1 p-4">
									<p>We need to verify your authority to this domain. </p>
									<div className="flex">
										<span>a.</span>
										<p className="ml-2">
											Go to your domain registrar's website, locate your Domain Name
											System (DNS) settings and enter the following two :
										</p>
									</div>
									<div className="flex ml-4">
										<span>i.</span>
										<p className="ml-2">
											<b>CNAMEs:</b> Name: www,<br></br> <b>Destination</b>:
											ghs.google.com
										</p>
									</div>
									<div className="flex ml-4">
										<span>ii.</span>
										<p className="ml-2">
											<b>Name:</b> cmnrk5cgxsmt, <br></br>
											<b>Destination: </b>
											gv-6jt6wfe2dsy27w.dv.googlehosted.com
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
							<div>
								<Button
									type="submit"
									className="lg:w-[100%] min-w-[100%] px-3 py-2 border-2 border-[#F24B4B] text-[#F24B4B] hover:bg-[#F24B4B] hover:text-white rounded-sm mb-4"
								>
									Delete Entire Website
								</Button>
							</div>
							<div>
								<Button
									type="submit"
									className="lg:w-[100%] min-w-[100%] px-3 py-2 border-2 bg-[#082691] text-white hover:bg-[#1e43c7] rounded-sm mb-4"
								>
									Save
								</Button>
							</div>
						</div>
					</form>
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
	}
	return {
		props: {
			sessionData: session,
		},
	};
}
