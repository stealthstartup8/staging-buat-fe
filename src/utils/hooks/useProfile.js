import axios from "axios";
import { useSession } from "next-auth/react";

export const useProfile = () => {
	const { data: session, update } = useSession();

	async function updateSession(value, val_data) {
		if (value == "name") {
			await update({
				...session,
				user: {
					...session?.user,
					data: {
						...session?.user?.data,
						name: val_data,
					},
				},
			});
		} else if (value == "email") {
			await update({
				...session,
				user: {
					...session?.user,
					data: {
						...session?.user?.data,
						email: val_data,
					},
				},
			});
		}
	}

	const handleUpdateName = async (e, user_id, name, token) => {
		e.preventDefault();
		try {
			const res = await axios.put(
				process.env.NEXT_PUBLIC_API_KEY + `/profile/${user_id}`,
				{
					name: name,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			await updateSession("name", name);
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	const handleUpdateEmail = async (e, user_id, email, token) => {
		e.preventDefault();
		try {
			const res = await axios.put(
				process.env.NEXT_PUBLIC_API_KEY + `/profile/update-email/${user_id}`,
				{
					email: email,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			console.log(res);
			await updateSession("email", email);
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	const handleUpdatePin = async (
		e,
		setLoading,
		user_id,
		newPin,
		currentPin,
		token,
		setSuccess,
		setOpen,
		setCurrentPin,
		setNewPin,
		setErrorMessages
	) => {
		e.preventDefault();
		if (newPin.length != 6) {
			setErrorMessages("New pin must be 6 characters long");
			return;
		}
		setLoading(true);
		try {
			await axios.put(
				process.env.NEXT_PUBLIC_API_KEY + `/profile/update-pin/${user_id}`,
				{
					newPin: newPin,
					oldPin: currentPin,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			setSuccess(true);
			setOpen(false);
			setLoading(false);
			setCurrentPin("");
			setNewPin("");
		} catch (error) {
			setErrorMessages(error?.response?.data?.message);
			setLoading(false);
		}
	};

	const handleUpdatePassword = async (
		e,
		newPassword,
		currentPassword,
		setSuccess,
		setOpen,
		setLoading,
		setCurrentPassword,
		setNewPassword,
		setErrorMessages,
		user_id,
		token
	) => {
		setLoading(true);
		e.preventDefault();
		try {
			await axios.put(
				process.env.NEXT_PUBLIC_API_KEY + `/profile/update-password/${user_id}`,
				{
					newPassword: newPassword,
					oldPassword: currentPassword,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			setSuccess(true);
			setOpen(false);
			setLoading(false);
			setCurrentPassword("");
			setNewPassword("");
		} catch (error) {
			console.log(error);
			setErrorMessages(error?.response?.data?.message);
			setLoading(false);
		}
	};

	return {
		handleUpdatePin,
		handleUpdatePassword,
		handleUpdateName,
		handleUpdateEmail,
	};
};
