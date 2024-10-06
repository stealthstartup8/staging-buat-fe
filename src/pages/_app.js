import LoginRegisterLayouts from "@/components/Layouts/loginRegisterLayouts";
import MainLayouts from "@/components/Layouts/mainLayouts";
import SecondaryLayout from "@/components/Layouts/secondaryLayout";
import "@/styles/globals.css";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import { store } from "@store/store";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import LayoutWrapper from "@/components/Layouts/layoutwrapper";

let persistor = persistStore(store);

export default function App({ Component, pageProps: { session, ...pageProps } }) {
	const path = usePathname();
	const router = useRouter();
	const { id } = router.query;

	const isDetailPage = [
		`/pages-detail/${id}`,
		"/blog/create",
		`/blog/detail/${id}`,
		"/job-vacancy/create",
		`/job-vacancy/detail/${id}`,
		"/e-commerce/create",
		`/e-commerce/detail/${id}`,
		"/pricing/create",
		`/pricing/detail/${id}`,
		`/pages-detail/blog-and-product/${id}`,
	].includes(path);

	const mainPage = [
		"/",
		"/posts",
		"/form",
		"/blog",
		"/job-vacancy",
		"/e-commerce",
		"/pricing",
		"/profile",
		"/settings",
		"/domain",
	].includes(path);

	const isLoginRegisterPage = ["/login", "/register"].includes(path);

	return (
		<SessionProvider session={session}>
			<Provider store={store}>
				<PersistGate persistor={persistor} loading={null}>
					{isLoginRegisterPage ? (
						<LoginRegisterLayouts>
							<LayoutWrapper>
								<Component {...pageProps} />
							</LayoutWrapper>
						</LoginRegisterLayouts>
					) : isDetailPage ? (
						<SecondaryLayout>
							<LayoutWrapper>
								<Component {...pageProps} />
							</LayoutWrapper>
						</SecondaryLayout>
					) : mainPage ? (
						<MainLayouts>
							<LayoutWrapper>
								<Component {...pageProps} />
							</LayoutWrapper>
						</MainLayouts>
					) : (
						<Component {...pageProps} />
					)}
				</PersistGate>
			</Provider>
		</SessionProvider>
	);
}
