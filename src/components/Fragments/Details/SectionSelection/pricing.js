import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { fetchData } from "@store/pricing";
import { useEffect, useState } from "react";
import axios from "axios";
const PricingSection = ({ handleOnDrag, templatePricing, user_token, websiteid }) => {
	const dispatch = useDispatch();
	const pricing_data = useSelector((state) => state.pricingSlice.pricing_datas);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const loadData = async () => {
			setLoading(true);
			dispatch(fetchData({ website_id: websiteid, token: user_token }));
			setLoading(false);
		};
		loadData();
	}, [dispatch]);
	return (
		<div className="mt-4 text-[14px]">
			<p>
				<b>Note : </b> Select by drag and drop.
			</p>
			<br />
			<Link
				href="/pricing/create"
				className="text-center block w-full px-6 py-2 bg-[#ffffff] hover:bg-[#082691] border-2 hover:border-[#082691] border-[#082691] text-[#082691] hover:text-[#ffffff] rounded-md mb-4 "
			>
				{"Add new package"}
			</Link>
			{loading ? (
				<p className="mx-auto">Loading...</p>
			) : (
				templatePricing?.map((data, index) => (
					<div className="mt-4" key={index}>
						<Image
							src={`${process.env.NEXT_PUBLIC_API_KEY}/template/template-image/${data.image}`}
							width={10000}
							height={20}
							alt={data.name_template ? data.name_template : "Pricing"}
							className={`rounded-md ${
								pricing_data?.length > 0 ? "" : "opacity-50 cursor-not-allowed"
							}`}
							id={data.id}
							draggable={pricing_data?.length > 0}
							onDragStart={handleOnDrag}
						/>
					</div>
				))
			)}
		</div>
	);
};

export default PricingSection;
