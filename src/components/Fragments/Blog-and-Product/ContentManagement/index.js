const ContentManagementLayout = ({ children }) => {
	return (
		<div className="col-span-1 rounded-md h-[100vh] overflow-auto lg:block hidden">
			<div className="bg-white p-6 min-h-[100vh] pt-[100px]">
				<h1 className="text-lg font-bold">Blog Detail Management</h1>
				<hr className="my-4"></hr>
				<div className="mt-4">{children}</div>
			</div>
		</div>
	);
};

export default ContentManagementLayout;
