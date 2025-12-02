import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  ImageGenerationRequest,
  ImageGenerationResponse,
  GeneratedImage,
} from "../lib/types";

export function useImageGeneration() {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ImageGenerationResponse,
    Error,
    ImageGenerationRequest
  >({
    mutationFn: async (data: ImageGenerationRequest) => {
      try {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          let errorMessage = "이미지 생성에 실패했습니다.";
          try {
            const error = await response.json();
            errorMessage = error.error || errorMessage;
          } catch (e) {
            errorMessage = `서버 오류 (${response.status}): ${response.statusText}`;
          }
          throw new Error(errorMessage);
        }

        return response.json();
      } catch (error) {
        if (error instanceof TypeError && error.message === "Failed to fetch") {
          throw new Error(
            "네트워크 오류가 발생했습니다. 서버가 응답하지 않거나 연결할 수 없습니다."
          );
        }
        throw error;
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData<GeneratedImage[]>(
        ["images"],
        (oldImages = []) => {
          const newImages = [...data.images, ...oldImages];
          if (typeof window !== "undefined") {
            localStorage.setItem("generatedImages", JSON.stringify(newImages));
          }
          return newImages;
        }
      );
    },
  });

  return mutation;
}
