import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
const CommerceSection = ({ handleOnDrag, templateCommerce, user_token, websiteid }) => {
	const commerce_data = useSelector((state) => state.eCommerceSlice.commerce_data);
	return (
		<div className="mt-4 text-[14px]">
			<p>
				<b>Note : </b> Select by drag and drop.
			</p>
			<br />
			<Link
				href="/e-commerce/create"
				target="_blank"
				className="text-center block w-full px-6 py-2 bg-[#ffffff] hover:bg-[#082691] border-2 hover:border-[#082691] border-[#082691] text-[#082691] hover:text-[#ffffff] rounded-md mb-4 "
			>
				Add new product
			</Link>
			{templateCommerce.map((data, index) => (
				<div className="mt-4" key={index}>
					<Image
						src={`${process.env.NEXT_PUBLIC_API_KEY}/template/template-image/${data.image}`}
						width={10000}
						height={20}
						alt={data.name_template ? data.name_template : "Commerce"}
						className={`rounded-md ${
							commerce_data.length > 0 ? "" : "opacity-50 cursor-not-allowed"
						}`}
						id={data.id}
						draggable={commerce_data.length > 0 ? true : false}
						onDragStart={handleOnDrag}
					/>
				</div>
			))}
		</div>
	);
};

export default CommerceSection;
