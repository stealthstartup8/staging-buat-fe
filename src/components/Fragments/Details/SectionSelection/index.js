import Button from "@/components/Elements/Button";
import SectionsWebsite from "./sections";
import FooterSection from "./footer";
import MenuSectionPreview from "./menu";
import FAQSection from "./faq";
import CTAsection from "./cta";
import BlogSection from "./blog";
import { useTemplate } from "@/utils/hooks/useTemplate";
import FormSection from "./form";
import CareerSection from "./career";
import PricingSection from "./pricing";
import CommerceSection from "./commerce";
import { Fragment } from "react";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
const PageSectionSelection = ({
	categoryDatas,
	setSelectMenu,
	selectSection,
	setSelectSection,
	templateHero,
	user_token,
	navbar_components,
	templateNavbar,
	selectMenu,
	templateBlog,
	templateForm,
	templateLogo,
	templateCTA,
	templateCareer,
	templatePricing,
	templateCommerce,
	templateFaQs,
	setSelectFooter,
	templateFooter,
	footer_components,
	selectFooter,
	website_detail,
	path,
}) => {
	const { handleOnDrag } = useTemplate();
	const pathURL =
		website_detail.access_domain[1]?.name != undefined &&
		website_detail.access_domain[1]?.statusConnect == true
			? website_detail.access_domain[1].name + path
			: website_detail.access_domain[0].name + "." + process.env.NEXT_PUBLIC_DOMAIN_URL + path;

	return (
		<div className="col-span-1 rounded-md h-[100vh] overflow-auto lg:block hidden">
			<div className="bg-white p-6 min-h-[100vh] pt-[100px] overflow-x-hidden">
				<h1 className="text-lg font-bold">Section Selection</h1>
				<hr className="my-4"></hr>
				<div className="flex">
					<div className="w-10/12 line-clamp-1 text-ellipsis">
						<p className="text-[14px] overflow-x-scroll hide-scrollbar">{pathURL}</p>
					</div>
					<div className="w-2/12 flex justify-end">
						<DocumentDuplicateIcon
							onClick={() => {
								navigator.clipboard.writeText(pathURL);
							}}
							className="h-4 w-4 mt-[2px] hover:text-[#C8CDD0] cursor-pointer"
						/>
					</div>
				</div>
				<div className="grid grid-cols-3 gap-1 mt-4 mb-4">
					{[
						...categoryDatas.data
							.filter((item) => ![7, 8, 12].includes(item.id))
							.slice(2) // Filter out items with index 0 and 1
							.map((item, index) => (
								<Fragment key={"first" + index}>
									<Button
										onClick={(e) => setSelectSection(`${item.name}`)}
										className={`text-[14px] border border-1 rounded-md py-2 border-[#082691] ${
											selectSection == item.name
												? "text-white bg-[#082691]"
												: "text-[#082691] bg-white"
										}`}
									>
										{item.name == "faq's"
											? "FAQ's"
											: item.name == "cta"
											? item.name.toUpperCase()
											: item.name.replace(/\b\w/g, (match) => match.toUpperCase())}
									</Button>
								</Fragment>
							)),
						...categoryDatas.data
							.filter((item) => ![7, 8, 12].includes(item.id))
							.slice(0, 2) // Filter out items with index greater than 1
							.map((item, index) => (
								<Fragment key={"second" + index}>
									<Button
										onClick={(e) => setSelectSection(`${item.name}`)}
										className={`text-[14px] border border-1 rounded-md py-2 border-[#082691] ${
											selectSection == item.name
												? "text-white bg-[#082691]"
												: "text-[#082691] bg-white"
										}`}
									>
										{item.name == "faq's"
											? "FAQ's"
											: item.name == "cta"
											? item.name.toUpperCase()
											: item.name.replace(/\b\w/g, (match) => match.toUpperCase())}
									</Button>
								</Fragment>
							)),
					]}
				</div>
				{selectSection == "hero" ? (
					<SectionsWebsite handleOnDrag={(e) => handleOnDrag(e)} templateHero={templateHero} />
				) : selectSection == "footers" ? (
					<FooterSection
						setSelectFooter={setSelectFooter}
						selectFooter={selectFooter}
						templateFooter={templateFooter}
						footer_components={footer_components}
						user_token={user_token}
					/>
				) : selectSection == "menus" ? (
					<MenuSectionPreview
						setSelectMenu={setSelectMenu}
						selectMenu={selectMenu}
						templateNavbar={templateNavbar}
						navbar_id={navbar_components}
						user_token={user_token}
					/>
				) : selectSection == "faq's" ? (
					<FAQSection handleOnDrag={(e) => handleOnDrag(e)} templateFaQs={templateFaQs} />
				) : selectSection == "cta" ? (
					<CTAsection handleOnDrag={(e) => handleOnDrag(e)} templateCTA={templateCTA} />
				) : selectSection == "career" ? (
					<CareerSection
						handleOnDrag={(e) => handleOnDrag(e)}
						templateCareer={templateCareer}
						user_token={user_token}
						websiteid={website_detail.id}
					/>
				) : selectSection == "pricing" ? (
					<PricingSection
						handleOnDrag={(e) => handleOnDrag(e)}
						templatePricing={templatePricing}
						user_token={user_token}
						websiteid={website_detail.id}
					/>
				) : selectSection == "commerce" ? (
					<CommerceSection
						handleOnDrag={(e) => handleOnDrag(e)}
						templateCommerce={templateCommerce}
						user_token={user_token}
						websiteid={website_detail.id}
					/>
				) : selectSection == "blog" ? (
					<BlogSection
						handleOnDrag={(e) => handleOnDrag(e)}
						templateBlog={templateBlog}
						user_token={user_token}
						websiteid={website_detail.id}
					/>
				) : selectSection == "form" ? (
					<FormSection
						handleOnDrag={(e) => handleOnDrag(e)}
						templateForm={templateForm}
						user_token={user_token}
						websiteid={website_detail.id}
					/>
				) : selectSection == "logo" ? (
					<FormSection
						handleOnDrag={(e) => handleOnDrag(e)}
						templateForm={templateLogo}
						user_token={user_token}
						websiteid={website_detail.id}
					/>
				) : (
					""
				)}
			</div>
		</div>
	);
};

export default PageSectionSelection;
