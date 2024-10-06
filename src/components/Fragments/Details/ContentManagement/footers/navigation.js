import Button from "@/components/Elements/Button";
import { ArrowUpCircleIcon, ArrowDownCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import Input from "@/components/Elements/Input";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
	addFooterMenuNavigation,
	addFooterSubMenuNavigation,
	changeNavName,
	changeSubNavLink,
	changeSubNavName,
	deleteNav,
	deleteAllNav,
	deleteSubNav,
} from "@store/footer/navigationSlice";
import { Fragment, useState } from "react";
import axios from "axios";

const NavigationFooterSection = ({ user_token }) => {
	const navigation_menu = useSelector((state) => state.persistedReducer.navigationFooterSlice);
	const navigation_nav = useSelector((state) => state.persistedReducer.navigationMenuSlice);

	const [selectLabel, setSelectLabel] = useState(0);
	const [checkedMenu, setCheckedMenu] = useState(false);

	const dispatch = useDispatch();

	const addNavigation = () => {
		dispatch(
			addFooterMenuNavigation({
				id: null,
				navigation_name: "",
				orderIndex: navigation_menu.item.length,
				sub_navigation: [],
			})
		);
		setSelectLabel(navigation_menu.item.length);
	};

	const onChangeNavName = (index, navigation_name) => {
		dispatch(
			changeNavName({
				index: index,
				navigation_name: navigation_name,
			})
		);
	};

	const addSubNavigation = () => {
		dispatch(
			addFooterSubMenuNavigation({
				id: null,
				orderIndex: navigation_menu.item[selectLabel].sub_navigation.length,
				subnav_name: "",
				link: "",
				index: selectLabel,
			})
		);
	};

	const onChangeSubNavName = (subnav_name, index_nav, index_subnav) => {
		dispatch(
			changeSubNavName({
				index_nav: index_nav,
				index_subnav: index_subnav,
				subnav_name: subnav_name,
			})
		);
	};

	const onChangeSubNavLink = (link, index_nav, index_subnav) => {
		dispatch(
			changeSubNavLink({
				index_nav: index_nav,
				index_subnav: index_subnav,
				link: link,
			})
		);
	};

	const handleDeleteNavigation = () => {
		if (navigation_menu.item[selectLabel].id != null) {
			const deleteNav = axios.delete(
				process.env.NEXT_PUBLIC_API_KEY +
					"/label-footer-component/" +
					navigation_menu.item[selectLabel].id,
				{
					headers: {
						Authorization: `Bearer ${user_token}`,
					},
				}
			);
		}
		setCheckedMenu(navigation_menu.item.length == 1 ? false : true);
		dispatch(deleteNav(selectLabel));
		setSelectLabel(selectLabel == 0 ? 0 : selectLabel - 1);
	};

	const handleDeleteSubNavigation = (index_nav, index_subnav) => {
		if (navigation_menu.item[selectLabel].sub_navigation[index_subnav].id != null) {
			const deleteSubNav = axios.delete(
				process.env.NEXT_PUBLIC_API_KEY +
					"/list-nav-footer-component/" +
					navigation_menu.item[selectLabel].sub_navigation[index_subnav].id,
				{
					headers: {
						Authorization: `Bearer ${user_token}`,
					},
				}
			);
		}
		dispatch(
			deleteSubNav({
				index_nav: index_nav,
				index_subnav: index_subnav,
			})
		);
	};

	const handleCheckboxChange = (e) => {
		const isChecked = e.target.checked;
		setCheckedMenu(isChecked);

		if (isChecked) {
			navigation_nav.item.forEach((item, index) => {
				dispatch(
					addFooterMenuNavigation({
						navigation_name: item.navigation_name,
						orderIndex: navigation_menu.item.length,
						sub_navigation: item.sub_navigation.map((subNavItem) => {
							const { id, ...rest } = subNavItem;
							return { ...rest };
						}),
					})
				);
			});
			setSelectLabel(navigation_menu.item.length);
		} else {
			dispatch(deleteAllNav());
		}
	};

	return (
		<div className="overflow-y-auto content-scrollbar mt-4 pr-1 ">
			<h2 className="mb-2">
				<b>Content Label</b>
			</h2>
			<div className="flex flex-nowrap gap-2 overflow-auto pb-4">
				{navigation_menu.item.map((item, index) => (
					<Fragment key={index}>
						<Button
							onClick={(e) => setSelectLabel(index)}
							className={`text-[14px] flex gap-1 border rounded-md px-2 py-2 border-[#082691] ${
								selectLabel == index ? "bg-[#082691] text-white" : "bg-white text-[#082691]"
							}`}
						>
							{index + 1}
						</Button>
					</Fragment>
				))}
			</div>
			{navigation_nav.item.length > 0 && (
				<div className="flex items-center text-xs p-2">
					<Input
						type={"checkbox"}
						checked={checkedMenu}
						className="mr-1"
						onChange={handleCheckboxChange}
					/>
					<span>Copy from navigation menu</span>
				</div>
			)}
			{navigation_menu.item.length > 0 ? (
				<div className="bg-[#F5F5F5] rounded-md p-2 text-sm leading-tight">
					<div className="p-2">
						<h2 className="mb-2 ">Navigation Name</h2>
						<Input
							placeholder="Input New or Select"
							value={navigation_menu.item[selectLabel]?.navigation_name}
							className="w-[100%]  border-2 rounded-md py-2 px-2 border-[#C8CDD0] text-[#082691] bg-white"
							onChange={(e) => onChangeNavName(selectLabel, e.target.value)}
						/>
					</div>
					{navigation_menu.item[selectLabel]?.sub_navigation.length > 0
						? navigation_menu.item[selectLabel]?.sub_navigation.map((item, index) => (
								<div className="subnav flex pt-2 gap-1" key={index}>
									<div className="mt-[1px]">
										<p className="font-bold">{index + 1}.</p>
										{/* <ArrowUpCircleIcon className="h-6 w-6 mb-4" />
												<ArrowDownCircleIcon className="h-6 w-6" /> */}
									</div>
									<div className="flex flex-col gap-2">
										<div className="px-2">
											<div className="w-[100%]">
												<div className="flex justify-between">
													<h2 className="">Sub Navigation</h2>
													<div>
														<TrashIcon
															className="h-5 w-5 mt-[1px] text-[#FF0000] cursor-pointer hover:text-[#BA1818]"
															onClick={(e) =>
																handleDeleteSubNavigation(selectLabel, index)
															}
														/>
													</div>
												</div>
												<Input
													onChange={(e) =>
														onChangeSubNavName(e.target.value, selectLabel, index)
													}
													value={item.subnav_name}
													placeholder="Input New or Select"
													className="w-[100%]  border-2 rounded-md py-2 px-2 border-[#C8CDD0] text-[#082691] bg-white"
												/>
											</div>
										</div>
										<div className="px-2 ">
											<h2 className="mb-2 ">Link (add https:// or http://)</h2>
											<Input
												onChange={(e) =>
													onChangeSubNavLink(e.target.value, selectLabel, index)
												}
												value={item.link}
												placeholder="https://"
												className="w-[100%]  border-2 rounded-md py-2 px-2 border-[#C8CDD0] text-[#082691] bg-white"
											/>
										</div>
									</div>
								</div>
						  ))
						: ""}
					<div className="p-2">
						<Button
							onClick={addSubNavigation}
							className="w-[100%] text-center text-[14px] border rounded-md px-2 py-2 border-[#082691] text-[#082691] bg-white hover:bg-[#082691] hover:text-white"
						>
							Add Sub Nav
						</Button>
					</div>
				</div>
			) : (
				""
			)}
			<Button
				onClick={addNavigation}
				className="mt-4 w-[100%] text-center text-[14px] border  rounded-md px-2 py-2 border-[#082691] text-[#082691] bg-white hover:bg-[#082691] hover:text-white"
			>
				Add Navigation
			</Button>
			{navigation_menu.item.length > 0 && (
				<Button
					onClick={handleDeleteNavigation}
					className="mt-4 w-[100%] text-center text-[14px] border  rounded-md px-2 py-2 border-[#F11010] text-[#F11010] bg-white hover:bg-[#F11010] hover:text-white"
				>
					Delete Navigation
				</Button>
			)}
		</div>
	);
};

export default NavigationFooterSection;
