export interface SingleImageUrl {
	url: string;
}
export interface ImageGenerationResponse {
	created: number;
	data: Array<SingleImageUrl>;
}
