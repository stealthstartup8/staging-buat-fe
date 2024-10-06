import axios from "axios";

export const usePassword = () => {
	const handleVerify = async (
		email,
		secretPin,
		setToken,
		setLoading,
		setOpen,
		setVerified,
		setEmail,
		setSecretPin,
		setErrorMessages
	) => {
		setLoading(true);
		try {
			const res = await axios.post(
				process.env.NEXT_PUBLIC_API_KEY + "/auth/verify-data",
				{
					email: email,
					secretPin: secretPin,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			setToken(res.data.token);
			setLoading(false);
			setOpen(false);
			setVerified(true);
			setEmail("");
			setSecretPin("");
		} catch (error) {
			setErrorMessages(error.response.data.message);
			setLoading(false);
		}
	};

	const onChangePassword = (
		e,
		setNewPassword,
		setValidateMessage,
		validateMessage,
		setOpenConfirmPassword
	) => {
		const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
		const numberRegex = /\d/;
		const capitalLetterRegex = /[A-Z]/;

		setNewPassword(e.target.value);

		if (!specialCharacterRegex.test(e.target.value) || !numberRegex.test(e.target.value)) {
			setValidateMessage({
				...validateMessage,
				password: "Password must contain special character and number",
			});
			setOpenConfirmPassword(false);
		} else if (e.target.value.length < 8) {
			setValidateMessage({
				...validateMessage,
				password: "Password must contain at least 8 characters",
			});
			setOpenConfirmPassword(false);
		} else if (!capitalLetterRegex.test(e.target.value)) {
			setValidateMessage({
				...validateMessage,
				password: "Password must contain at least 1 capital letter",
			});
			setOpenConfirmPassword(false);
		} else {
			setValidateMessage({
				...validateMessage,
				password: "",
			});
			setOpenConfirmPassword(true);
		}
	};

	const onChangeConfirmPassword = (
		e,
		setConfirmPassword,
		setValidateMessage,
		validateMessage,
		newPassword
	) => {
		setConfirmPassword(e.target.value);
		if (e.target.value != newPassword) {
			setValidateMessage({
				...validateMessage,
				confirmPassword: "Password does not match",
			});
		} else {
			setValidateMessage({
				...validateMessage,
				confirmPassword: "",
			});
		}
	};

	const handleResetPassword = async (
		token,
		newPassword,
		confirmPassword,
		setLoading,
		setOpen,
		setSuccess,
		setConfirmPassword,
		setNewPassword,
		setToken
	) => {
		setLoading(true);
		try {
			await axios.put(
				process.env.NEXT_PUBLIC_API_KEY + "/auth/reset-password",
				{
					token: token,
					password: newPassword,
					repassword: confirmPassword,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			setLoading(false);
			setOpen(false);
			setSuccess(true);
			setConfirmPassword("");
			setNewPassword("");
			setToken("");
		} catch (error) {
			console.log(error);
		}
	};

	return {
		handleVerify,
		onChangePassword,
		onChangeConfirmPassword,
		handleResetPassword,
	};
};
