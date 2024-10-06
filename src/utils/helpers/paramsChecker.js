import { useRouter } from "next/router";
import { useEffect } from "react";

const paramsChecker = (defaultParams) => {
	const router = useRouter();
	const { query, pathname } = router;

	useEffect(() => {
		const queryParams = new URLSearchParams(window.location.search);
		let shouldRedirect = false;
		const newQuery = { ...query };

		for (const [param, defaultValue] of Object.entries(defaultParams)) {
			if (!queryParams.has(param)) {
				newQuery[param] = defaultValue;
				shouldRedirect = true;
			}
		}

		if (shouldRedirect) {
			router.replace({
				pathname,
				query: newQuery,
			});
		}
	}, [defaultParams, query, pathname, router]);
};

export default paramsChecker;
