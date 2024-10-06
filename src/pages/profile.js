import Button from "@/components/Elements/Button";
import Input from "@/components/Elements/Input";
import UpdatePassword from "@/components/Fragments/Popup/Profile/updatePassword";
import UpdatePin from "@/components/Fragments/Popup/Profile/updatePin";
import UpdateConfirmation from "@/components/Fragments/Popup/confirmation";
import { useProfile } from "@/utils/hooks/useProfile";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { Alert } from "@material-tailwind/react";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

const Profile = ({ user_data, token }) => {
	const [name, setName] = useState(user_data.name);
	const [email, setEmail] = useState(user_data.email);
	const [isSuccess, setIsSuccess] = useState(false);
	const [isFailed, setIsFailed] = useState(false);
	const [message, setMessage] = useState("");
	const [openUpdatePin, setOpenUpdatePin] = useState(false);
	const [openUpdatePassword, setOpenUpdatePassword] = useState(false);
	const [confirm, setConfirm] = useState({
		name: false,
		email: false,
	});

	const { handleUpdateName, handleUpdateEmail } = useProfile();

	return (
		<>
			{confirm.name == true && (
				<UpdateConfirmation
					open={confirm.name}
					setOpen={() => {
						setConfirm({
							...confirm,
							name: false,
						});
					}}
					confirmButton="Update"
					header="Update Settings"
					handlerSubmit={(e) => handleUpdateName(e, user_data.id, name, token)}
					confirmationMessage="Are you sure you want to update/replace the current Admin information?"
				/>
			)}

			{confirm.email == true && (
				<UpdateConfirmation
					header="Update Settings"
					confirmButton="Update"
					open={confirm.email}
					setOpen={() => {
						setConfirm({
							...confirm,
							email: false,
						});
					}}
					handlerSubmit={(e) => handleUpdateEmail(e, user_data.id, email, token)}
					confirmationMessage="Are you sure you want to update/replace the current Admin information?"
				/>
			)}

			<UpdatePin open={openUpdatePin} setOpen={setOpenUpdatePin} user_id={user_data.id} token={token} />
			<UpdatePassword
				open={openUpdatePassword}
				setOpen={setOpenUpdatePassword}
				user_id={user_data.id}
				token={token}
			/>

			{isSuccess == true && (
				<Alert
					onClose={() => setIsSuccess(false)}
					className="items-center fixed z-40 top-5 right-0 w-[400px] rounded-none border-l-4 border-[#039c1b] bg-[#2ec946] font-medium text-[#ffffff]"
					icon={<CheckCircleIcon className="text-[#ffffff]" width={40} />}
				>
					Success!<br></br> <i className="text-[12px]">{message}</i>
				</Alert>
			)}
			{isFailed == true && (
				<Alert
					onClose={() => setIsFailed(false)}
					className="items-center fixed z-40 top-5 right-0 w-[400px] rounded-none border-l-4 border-red-800 bg-red-500 font-medium text-[#ffffff]"
					icon={<XCircleIcon className="text-[#ffffff]" width={40} />}
				>
					Failed!<br></br> <i className="text-[12px]">{message}</i>
				</Alert>
			)}
			<div className="container px-4 pt-16 lg:pt-0">
				<div className="lg:flex lg:gap-8 items-center">
					<div className="lg:w-6/12">
						<div className=" items-center min-w-[100%]">
							<label className="text-[13px] text-gray-500">Admin Email</label>
							<div className="flex gap-4">
								<div className="w-[100%]">
									<Input
										type="email"
										name="email"
										placeholder="Enter your name"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className={`lg:w-[100%] min-w-[100%] px-3 py-2 border-2 rounded-md ${
											email == "" ? "border-red-500" : "border-gray-200"
										}`}
										required={true}
									/>
								</div>
								<div>
									<Button
										type="submit"
										onClick={() =>
											setConfirm({
												...confirm,
												email: true,
											})
										}
										disabled={email == user_data.name ? true : false}
										className={`bottom-0 ${
											email == user_data.email
												? "border-gray-500 text-gray-500 cursor-not-allowed"
												: "hover:bg-[#000000] hover:text-white border-[#000000] text-[#000000] "
										} px-3 py-2 border-2 rounded-md mt-2`}
									>
										Change
									</Button>
								</div>
							</div>
						</div>
						<div className=" items-center min-w-[100%] mt-4">
							<label className="text-[13px] text-gray-500">Admin Name</label>
							<div className="flex gap-4">
								<div className="w-[100%]">
									<Input
										type="text"
										name="name"
										placeholder="Enter your name"
										value={name}
										onChange={(e) => setName(e.target.value)}
										className={`lg:w-[100%] min-w-[100%] px-3 py-2 border-2 rounded-md ${
											name == "" ? "border-red-500" : "border-gray-200"
										}`}
										required={true}
									/>
								</div>
								<div>
									<Button
										type="button"
										onClick={() =>
											setConfirm({
												...confirm,
												name: true,
											})
										}
										disabled={name == user_data.name ? true : false}
										className={`bottom-0 ${
											name == user_data.name
												? "border-gray-500 text-gray-500 cursor-not-allowed"
												: "hover:bg-[#000000] hover:text-white border-[#000000] text-[#000000] "
										} px-3 py-2 border-2 rounded-md mt-2`}
									>
										Change
									</Button>
								</div>
							</div>
						</div>
						<div className="mt-6 mb-4">
							<label className="text-[13px] text-gray-500">Secret PIN</label>
							<div className="flex justify-between items-center">
								<div className="w-[100%] flex gap-1 ml-4">
									{Array.from({ length: 10 }).map((_, index) => (
										<div key={index} className="w-3 h-3 bg-black rounded-[100%]"></div>
									))}
								</div>
								<div>
									<Button
										onClick={() => setOpenUpdatePin(true)}
										type="button"
										className={`hover:bg-[#000000] hover:text-white border-[#000000] text-[#000000] ml-4 bottom-0 px-3 py-2 border-2 rounded-md`}
									>
										Change
									</Button>
								</div>
							</div>
						</div>

						<div className="mt-4 mb-4">
							<label className="text-[13px] text-gray-500">Password</label>
							<div className="flex justify-between items-center">
								<div className="w-[100%] flex gap-1 ml-4">
									{Array.from({ length: 10 }).map((_, index) => (
										<div key={index} className="w-3 h-3 bg-black rounded-[100%]"></div>
									))}
								</div>
								<div>
									<Button
										onClick={() => setOpenUpdatePassword(true)}
										type="button"
										className={`hover:bg-[#000000] hover:text-white border-[#000000] text-[#000000] ml-4 bottom-0 px-3 py-2 border-2 rounded-md`}
									>
										Change
									</Button>
								</div>
							</div>
						</div>
					</div>
					<div className="lg:w-6/12">
						<Image
							src="/assets/profile-banner.png"
							width={622}
							height={500}
							className="max-h-[523px]"
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;

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
		return {
			props: {
				user_data: session.user.data,
				token: session.user.token,
			},
		};
	}
}
