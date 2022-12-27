export type ImagesCount = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type ImageSize = "256x256" | "512x512" | "1024x1024";
export interface ImageGenerationRequestBody {
	prompt: string;
	n: ImagesCount;
	size: ImageSize;
}
