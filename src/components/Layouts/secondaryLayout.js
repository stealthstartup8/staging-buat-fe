import Navbar from "../Fragments/navbar";

const SecondaryLayout = ({ children }) => {
	return (
		<div className="min-h-[100vh] bg-[#F5F5F5] overflow-hidden">
			<Navbar />
			<div>{children}</div>
		</div>
	);
};

export default SecondaryLayout;
