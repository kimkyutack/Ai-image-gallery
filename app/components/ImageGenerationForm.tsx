"use client";

import { useState } from "react";

interface ImageGenerationFormProps {
  onSubmit: (data: {
    prompt: string;
    model: string;
    size: string;
    numImages: number;
  }) => void;
  isLoading?: boolean;
}

export default function ImageGenerationForm({
  onSubmit,
  isLoading = false,
}: ImageGenerationFormProps) {
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("dall-e-3");
  const [size, setSize] = useState("1024x1024");
  const [numImages, setNumImages] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    onSubmit({ prompt, model, size, numImages });
  };

  return (
    <div className="w-full">
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            이미지 생성
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            원하는 이미지를 설명하는 프롬프트를 입력하세요
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 프롬프트 입력 */}
          <div>
            <label
              htmlFor="prompt"
              className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              프롬프트
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="예: 고양이가 우주를 여행하는 모습, 사이버펑크 스타일, 고해상도"
              rows={4}
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-blue-400"
              disabled={isLoading}
            />
            <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400">
              {prompt.length} / 1000자
            </p>
          </div>

          {/* 옵션 그리드 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* 모델 선택 */}
            <div>
              <label
                htmlFor="model"
                className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                모델
              </label>
              <select
                id="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-blue-400"
                disabled={isLoading}
              >
                <option value="dall-e-3">DALL-E 3</option>
                <option value="dall-e-2">DALL-E 2</option>
                <option value="stable-diffusion">Stable Diffusion</option>
                <option value="midjourney">Midjourney</option>
              </select>
            </div>

            {/* 크기 선택 */}
            <div>
              <label
                htmlFor="size"
                className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                크기
              </label>
              <select
                id="size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-blue-400"
                disabled={isLoading}
              >
                <option value="1024x1024">1024 × 1024</option>
                <option value="512x512">512 × 512</option>
                <option value="256x256">256 × 256</option>
              </select>
            </div>

            {/* 이미지 개수 */}
            <div>
              <label
                htmlFor="numImages"
                className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                생성 개수
              </label>
              <select
                id="numImages"
                value={numImages}
                onChange={(e) => setNumImages(Number(e.target.value))}
                className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-blue-400"
                disabled={isLoading}
              >
                <option value={1}>1개</option>
                <option value={2}>2개</option>
                <option value={4}>4개</option>
              </select>
            </div>
          </div>

          {/* 생성 버튼 */}
          <button
            type="submit"
            disabled={!prompt.trim() || isLoading}
            className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3.5 font-semibold text-white shadow-lg transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:from-blue-600 disabled:hover:to-purple-600 disabled:hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="h-5 w-5 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                생성 중...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                이미지 생성하기
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

