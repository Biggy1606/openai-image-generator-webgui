import { useEffect, useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import { ImagesCount, ImageSize } from "./services/OpenaiRequests";
import { SingleImageUrl } from "./services/OpenaiResponses";
import { OpenaiService } from "./services/OpenaiService";
import "./styles/app.css";

const GenerateImagesCountOptions = (): Array<JSX.Element> => {
	const countOptions: Array<JSX.Element> = [];
	for (let index = 1; index < 11; index++) {
		countOptions.push(<option value={index}>{index}</option>);
	}
	return countOptions;
};

export function App() {
	const [imagesCount, setImagesCount] = useState<ImagesCount>(4);
	const [imageSize, setImageSize] = useState<ImageSize>("256x256");
	const [prompt, setPrompt] = useState<string>("");
	const [images, setImages] = useState<Array<SingleImageUrl>>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const handleSubmit = () => {
		console.log("Submit button clicked");
		setIsLoading(true);
		OpenaiService.requestImageGeneration({
			n: imagesCount,
			size: imageSize,
			prompt: prompt,
		})
			.then((response) => {
				setImages(response.data);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};
	const handleImagesCountChange = (
		event: JSX.TargetedEvent<HTMLSelectElement>
	) => {
		const target = event.target as HTMLSelectElement;
		setImagesCount(parseInt(target.value) as ImagesCount);
	};
	const handleImageSizeChange = (
		event: JSX.TargetedEvent<HTMLSelectElement>
	) => {
		const target = event.target as HTMLSelectElement;
		setImageSize(target.value as ImageSize);
	};
	const handlePromptChange = (event: JSX.TargetedEvent<HTMLInputElement>) => {
		const target = event.target as HTMLInputElement;
		setPrompt(target.value);
	};
	const handleImageClick = (url: string) => {
		window.open(url, "_blank");
	};
	return (
		<>
			<div id={"flex-container"}>
				<input
					id='image-prompt'
					class={"flex-wide"}
					type='text'
					name='prompt'
					alt={"Prompt for image generation"}
					placeholder='Prompt'
					value={prompt}
					onChange={handlePromptChange}
				/>
				<select
					id='image-count'
					class={"flex-narrow"}
					name='images-count'
					alt={"Number of images to generate"}
					value={imagesCount}
					onChange={handleImagesCountChange}>
					{GenerateImagesCountOptions()}
				</select>
				<select
					id='image-size'
					class={"flex-narrow"}
					name='image-size'
					alt={"Size of images to generate"}
					value={imageSize}
					onChange={handleImageSizeChange}>
					<option value={"256x256"}>256x256</option>
					<option value={"512x512"}>512x512</option>
					<option value={"1024x1024"}>1024x1024</option>
				</select>
				<button
					class={"flex-narrow"}
					name='submit'
					alt={"Submit button"}
					onClick={handleSubmit}
					disabled={isLoading}>
					Submit
				</button>
			</div>
			<div class={"block"}>
				{images.map((image) => (
					<img
						width={256}
						height={256}
						onClick={() => handleImageClick(image.url)}
						src={image.url}
					/>
				))}
			</div>
		</>
	);
}
