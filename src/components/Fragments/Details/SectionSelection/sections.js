import Image from "next/image";

const SectionsWebsite = ({ handleOnDrag, templateHero }) => {
	return (
		<div className="mt-4 text-[14px]">
			<span>
				<b>Note : </b> Select by drag and drop.
			</span>
			{templateHero.map((data, index) => (
				<div className="mt-4" key={index}>
					<Image
						src={`${process.env.NEXT_PUBLIC_API_KEY}/template/template-image/${data.image}`}
						width={10000}
						height={20}
						alt={data.name_template ? data.name_template : "Hero"}
						className="rounded-md"
						id={data.id}
						draggable
						onDragStart={handleOnDrag}
					/>
				</div>
			))}
		</div>
	);
};

export default SectionsWebsite;
