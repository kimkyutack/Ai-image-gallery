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
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "이미지 생성에 실패했습니다.");
      }

      return response.json();
    },
    onSuccess: (data) => {
      // 성공 시 이미지 목록 캐시에 추가
      queryClient.setQueryData<GeneratedImage[]>(
        ["images"],
        (oldImages = []) => {
          const newImages = [...data.images, ...oldImages];
          // 로컬 스토리지에도 저장
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

