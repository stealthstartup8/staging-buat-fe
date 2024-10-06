import { useState, Fragment } from "react";
import { MapPinIcon, BanknotesIcon } from "@heroicons/react/24/outline";
import { useStyleManagement } from "@/utils/hooks/useStyleManagement";
import { useSelector } from "react-redux";
import { sanitizeHTML } from "@/utils/helpers/HTMLParse";
import Image from "next/image";
import SectionWrapper from "@/components/Elements/Wrapper/SectionWrapper";
import { Button, Label } from "@/components/Elements/InnerTemplate";
import Headline from "@/components/Elements/InnerTemplate/Headline";
import Tagline from "@/components/Elements/InnerTemplate/Tagline";
const PreviewCareer2 = ({
	section,
	value_component,
	idComponent,
	button_slices,
	font_slices,
	sectionComponentHero,
	editable,
	websiteid,
	user_token,
	label_slices,
}) => {
	const [activeFilter, setActiveFilter] = useState([]);

	const { onClickInnerComponent } = useStyleManagement();

	const career_data = useSelector((state) => state.jobVacancySlice.career_data);

	const handleFilterButton = (keyword) => {
		if (keyword == activeFilter) setActiveFilter("");
		else setActiveFilter(keyword);
	};

	return (
		<SectionWrapper
			section={section}
			className="z-20 relative w-screen min-h-[100vh] h-[calc(100vh + 10vh)] bg-[image:var(--image-url)] bg-no-repeat bg-cover bg-center py-10 md:py-20"
		>
			{section.background_type == "video" && (
				<video
					src={section.background_image}
					autoPlay
					loop
					muted
					className="w-[100%] h-[100%] object-cover bgVideo z-[0]"
				></video>
			)}
			{value_component.components.map((item, index) => (
				<div
					key={index}
					className="flex flex-col w-screen h-[100%] relative bg-no-repeat bg-cover bg-center"
				>
					<div className="p-2">
						<div className="container mx-auto mb-4">
							<Headline
								font_slices={font_slices}
								section={section}
								title={value_component.components[index].title}
								idComponent={idComponent}
								sectionComponentHero={sectionComponentHero}
								editable={editable}
								className="mb-[-5px]"
							/>
							<Tagline
								font_slices={font_slices}
								section={section}
								tagline={value_component.components[index].tagline}
								className={` mt-2`}
								idComponent={idComponent}
								sectionComponentHero={sectionComponentHero}
								editable={editable}
							/>
						</div>
						<div
							style={{
								justifyContent: font_slices?.label?.align,
							}}
							className="flex gap-4 w-[100%] justify-center mb-2 px-2 md:px-4"
						>
							<div className="flex gap-4">
								{value_component.category_detail.categories?.map((category, index) => (
									<div
										key={index}
										className={`${
											activeFilter.includes(category.id) ? "opacity-100" : "opacity-75"
										}`}
									>
										<Label
											label_slices={label_slices}
											item={{
												label: category.name,
											}}
											font_slices={font_slices}
											onClickInnerComponent={(e) => {
												e.stopPropagation();
												onClickInnerComponent(e, 2, "careerLabel", "", section);
												handleFilterButton(category.id);
											}}
											section={section}
											idComponent={idComponent}
											sectionComponentHero={sectionComponentHero}
										/>
									</div>
								))}
							</div>
						</div>
						<div className="w-11/12 md:w-[80%] mx-auto">
							<ul className="grid gap-10 md:grid-cols-3 grid-cols-1">
								{career_data
									?.filter((item) => {
										if (activeFilter.length === 0) {
											return value_component?.category_detail?.categories?.some(
												(category) => item.categories.id === category.id
											);
										} else {
											return item.categories.id === activeFilter;
										}
									})
									.filter((item) => item.status)
									.map((item, index) => (
										<Fragment key={index}>
											<JobCard
												name={item.name}
												location={item.location}
												salary={item.salary}
												desc={item.desc}
												button_slices={button_slices}
												font_slices={font_slices}
												onClickInnerComponent={onClickInnerComponent}
												editable={editable}
												section={section}
												buttonName={item.buttonName}
												onClickCard={(e) => {
													e.stopPropagation();
													onClickInnerComponent(e, 2, "careerLabel", "", section);
												}}
												onClickButton={(e) => {
													e.stopPropagation();
													onClickInnerComponent(e, 2, "button", "", section);
												}}
											/>
										</Fragment>
									))}
							</ul>
						</div>
					</div>
				</div>
			))}
		</SectionWrapper>
	);
};

export default PreviewCareer2;

const JobCard = ({
	name,
	location,
	salary,
	desc,
	onClickCard,
	buttonName,
	button_slices,
	font_slices,
	onClickInnerComponent,
	editable,
	section,
}) => {
	return (
		<li className="flex flex-col gap-5" onClick={onClickCard}>
			<div className="flex justify-between">
				<div>
					<h3 className="text-2xl font-bold">{name}</h3>
					<div className="flex gap-2">
						<MapPinIcon className="size-5" />
						<span>{location}</span>
					</div>
					<div className="flex gap-2">
						<BanknotesIcon className="size-5" />
						<span>{salary}</span>
					</div>
				</div>
				<div>
					<Button
						button_slices={{
							...button_slices,
							name: buttonName,
						}}
						font_slices={font_slices}
						onClickInnerComponent={onClickInnerComponent}
						editable={editable}
						section={section}
					/>
				</div>
			</div>
			<p
				dangerouslySetInnerHTML={{
					__html: sanitizeHTML(desc),
				}}
			></p>
		</li>
	);
};

const CategoryButton = ({ name, active, onClick, color, stroke, shape, font_slices, fontSize, icon }) => {
	return (
		<button
			style={{
				opacity: active ? "1" : "0.3",
				backgroundColor: color,
				borderColor: stroke,
				display: "flex",
				justifyContent: font_slices?.label?.align == "center" ? "center" : "space-between",
				alignItems: "center",
				gap: "0.5rem",
				flexDirection: font_slices?.label?.align == "right" ? "row-reverse" : "row",
			}}
			className=" p-2    rounded-md border-2 flex  items-center "
			onClick={onClick}
		>
			<p
				style={{
					color: font_slices?.label?.color,
					fontFamily: font_slices?.label?.font_style,
					fontWeight: font_slices?.label.bold == true ? "700" : "normal",
					textDecoration: font_slices?.label?.text_decoration,
					fontStyle: font_slices?.label?.italic == true ? "italic" : "",
					fontSize: fontSize,
					textAlign: font_slices?.label?.align,
				}}
			>
				{name}
			</p>
			{icon == "" ? (
				<></>
			) : (
				<div className="h-4 w-4  ">
					<Image
						src={icon}
						alt=""
						width={0}
						height={0}
						sizes="100vw"
						style={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
							objectPosition: "center",
						}}
					/>
				</div>
			)}
		</button>
	);
};
