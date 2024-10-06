import { useCallback } from "react";

export const createQueryString = (searchParams) => {
	return useCallback(
		(name, value) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(name, value);

			return params.toString();
		},
		[searchParams]
	);
};
