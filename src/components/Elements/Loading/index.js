const LoadingAnimation = ({ children }) => {
	return (
		<div className=" w-[100vw] h-[100vh] fixed z-20 mt-[-75px] ml-[-60px]">
			<div className="fixed bottom-0 right-0 mb-4 mr-8 z-40 text-center">
				<div>
					<div
						className="mr-2 inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] text-info motion-reduce:animate-[spin_1.5s_linear_infinite]"
						role="status"
					>
						<span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
							Loading...
						</span>
					</div>
					{children}
				</div>
			</div>
		</div>
	);
};

export default LoadingAnimation;
