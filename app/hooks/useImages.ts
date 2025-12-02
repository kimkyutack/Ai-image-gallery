import { useQuery } from "@tanstack/react-query";
import type { GeneratedImage } from "../lib/types";

export function useImages() {
  return useQuery<GeneratedImage[]>({
    queryKey: ["images"],
    queryFn: async () => {
      // 로컬 스토리지에서 이미지 가져오기 (또는 API에서)
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("generatedImages");
        return stored ? JSON.parse(stored) : [];
      }
      return [];
    },
    staleTime: Infinity, // 로컬 스토리지 데이터는 항상 최신으로 간주
  });
}

