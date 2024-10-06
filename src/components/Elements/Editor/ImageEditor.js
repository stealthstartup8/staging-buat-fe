import { useState, useEffect } from "react";
import Cropper from "react-easy-crop";
import Select from "react-select";
import { getCroppedImg } from "@/utils/helpers/cropperHelpers";
import { Button } from "@material-tailwind/react";
import zoomIn from "@assets/icons/zoom-in.svg";
import zoomOut from "@assets/icons/zoom-out.svg";
import rotateLeft from "@assets/icons/rotate-left.svg";
import rotateRight from "@assets/icons/rotate-right.svg";
import Image from "next/image";
import Portal from "@/components/Portals/Portal";


/**
 * @prop {File} image - The image to be editted.
 * @prop {Function} onDoneEditting - Called when user done editting, takes the image file object and the image url.
 * @prop {string} isOpen - Indicator if the editor is openning.
 */
const ImageEditor = ({ image, onDoneEditting, isOpen}) => {
	const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [rotation, setRotation] = useState(0);
	const [ratio, setRatio] = useState({ label: "4:3", value: 4 / 3 });
	const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
	const [zoom, setZoom] = useState(1);
	const onCropComplete = (croppedArea, croppedAreaPixels) => {
		setCroppedAreaPixels(croppedAreaPixels);
	};
	useEffect(() => {
		if (imageDimensions.width !== 0 && imageDimensions.height !== 0) {
			setRatio({ label: "Original", value: imageDimensions.width / imageDimensions.height });
		}
	}, [imageDimensions]);

	const handleApplyEdit = async () => {
		try {
			const croppedImage = await getCroppedImg(image, croppedAreaPixels, rotation);
			onDoneEditting(croppedImage);
		} catch (e) {
			console.error(e);
		}
	};
	const resetCroppedImage = () => {
		setRotation(0);
		setZoom(1);
		setCrop({ x: 0, y: 0 });
		setRatio({ label: "Original", value: imageDimensions.width / imageDimensions.height });
	};
	return (
		<Portal wrapperID="cropper-modal" isOpen={isOpen}>
			<div className="  top-0 w-screen h-screen bg-black bg-opacity-70 flex justify-center items-center z-[9999] fixed">
				<div className="bg-white p-10">
					<div className="aspect-[4/3] w-[30rem] relative">
						<Cropper
							image={URL.createObjectURL(image)}
							restrictPosition
							crop={crop}
							rotation={rotation}
							zoom={zoom}
							aspect={ratio.value}
							onCropChange={setCrop}
							onCropComplete={onCropComplete}
							onZoomChange={setZoom}
							onRotationChange={setRotation}
							objectFit="contain"
							onMediaLoaded={(mediaSize) => {
								setImageDimensions({ width: mediaSize.width, height: mediaSize.height });
							}}
						/>
						<div className="flex gap-2 absolute bottom-5 right-5 bg-black bg-opacity-20 text-white rounded-xl p-2 text-opacity-50 hover:bg-opacity-100 hover:text-opacity-100">
							<p>{(zoom * 100).toFixed(1)}%</p>
							<p>{rotation}°</p>
						</div>
					</div>
					<div className="w-[30rem] relative flex justify-between place-items-center py-2">
						<div className="flex gap-2">
							<Select
								menuPlacement="top"
								className="basic-single my-auto"
								classNamePrefix="select"
								isRtl={false}
								isSearchable
								name="color"
								options={[
									{
										label: "Original",
										value: imageDimensions?.width / imageDimensions?.height,
									},
									{ label: "1:1", value: 1 / 1 },
									{ label: "4:3", value: 4 / 3 },
									{ label: "16:9", value: 16 / 9 },
									{ label: "3:4", value: 3 / 4 },
									{ label: "9:16", value: 9 / 16 },
									{ label: "2:3", value: 2 / 3 },
									{ label: "3:2", value: 3 / 2 },
									{ label: "1:2", value: 1 / 2 },
									{ label: "2:1", value: 2 / 1 },
									{ label: "3:1", value: 3 / 1 },
									{ label: "1:3", value: 1 / 3 },
									{ label: "4:1", value: 4 / 1 },
									{ label: "1:4", value: 1 / 4 },
									{ label: "5:4", value: 5 / 4 },
									{ label: "4:5", value: 4 / 5 },
									{ label: "5:3", value: 5 / 3 },
									{ label: "3:5", value: 3 / 5 },
									{ label: "5:2", value: 5 / 2 },
									{ label: "2:5", value: 2 / 5 },
									{ label: "5:1", value: 5 / 1 },
									{ label: "1:5", value: 1 / 5 },
									{ label: "6:5", value: 6 / 5 },
									{ label: "5:6", value: 5 / 6 },
								]}
								onChange={(value) => {
									setRatio(value);
								}}
								value={ratio}
								classNames={["w-full"]}
							/>
							<Button onClick={resetCroppedImage} variant="outlined" className="text-[#082691]">
								reset
							</Button>
						</div>
						<div className="flex gap-2 items-center">
							<Button
								className="p-3"
								color="white"
								onClick={() => setZoom(zoom + 0.1)}
								disabled={zoom === 3}
							>
								{/* <Icon width={20} height={20} icon={"fa6-solid:magnifying-glass-plus"} /> */}
								<Image src={zoomOut} alt="" className="min-w-3 min-h-3" />
							</Button>
							<Button
								className="p-3"
								color="white"
								variant="outlined"
								onClick={() => setZoom(zoom - 0.1)}
								disabled={zoom === 1}
							>
								{/* <Icon width={20} height={20} icon={"fa6-solid:magnifying-glass-minus"} /> */}
								<Image src={zoomIn} alt="" className="min-w-3 min-h-3" />
							</Button>
							<Button
								className="p-3"
								variant="outlined"
								color="white"
								onClick={() => setRotation((rotation - 90) % 360)}
							>
								{/* <Icon icon={"fa6-solid:rotate-left"} width={20} height={20} /> */}
								<Image src={rotateLeft} alt="" className="min-w-3 min-h-3" />
							</Button>
							<Button
								className="p-3"
								color="white"
								onClick={() => setRotation((rotation + 90) % 360)}
							>
								{/* <Icon icon={"fa6-solid:rotate-right"} width={20} height={20} /> */}
								<Image src={rotateRight} alt="" className="min-w-3 min-h-3" />
							</Button>
						</div>
					</div>
					<Button onClick={handleApplyEdit} variant="filled" className="w-full">
						apply
					</Button>
				</div>
			</div>
		</Portal>
	);
};

export default ImageEditor;
