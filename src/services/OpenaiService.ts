import axios from "axios";
import { ImageGenerationRequestBody } from "./OpenaiRequests";
import { ImageGenerationResponse } from "./OpenaiResponses";

const CREATE_IMAGE_URL = "https://api.openai.com/v1/images/generations";

export const OpenaiService = {
	requestImageGeneration: (
		data: ImageGenerationRequestBody
	): Promise<ImageGenerationResponse> => {
		return axios
			.post(CREATE_IMAGE_URL, data, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${
						import.meta.env.VITE_OPENAI_API_KEY
					}`,
				},
			})
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				console.error(error);
			});
	},
};
