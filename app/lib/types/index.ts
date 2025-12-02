// 이미지 생성 관련 타입
export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  createdAt: string;
  model?: string;
  width?: number;
  height?: number;
}

// 이미지 생성 요청 타입
export interface ImageGenerationRequest {
  prompt: string;
  model?: string;
  width?: number;
  height?: number;
  numImages?: number;
}

// 이미지 생성 응답 타입
export interface ImageGenerationResponse {
  images: GeneratedImage[];
  success: boolean;
  message?: string;
}

