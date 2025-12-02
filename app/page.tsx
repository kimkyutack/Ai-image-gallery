"use client";

import { useState } from "react";
import Header from "./components/Header";
import ImageGenerationForm from "./components/ImageGenerationForm";
import { useImageGeneration } from "./hooks/useImageGeneration";
import { useImages } from "./hooks/useImages";

export default function Home() {
  const [error, setError] = useState<string | null>(null);
  const imageGeneration = useImageGeneration();
  const { data: images = [], isLoading: isLoadingImages } = useImages();

  const handleImageGenerate = async (data: {
    prompt: string;
    model: string;
    size: string;
    numImages: number;
  }) => {
    setError(null);
    try {
      await imageGeneration.mutateAsync(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "이미지 생성에 실패했습니다."
      );
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* 이미지 생성 폼 */}
          <div className="mb-12">
            <ImageGenerationForm
              onSubmit={handleImageGenerate}
              isLoading={imageGeneration.isPending}
            />
            {error && (
              <div className="mt-4 rounded-lg bg-red-50 border border-red-200 p-4 dark:bg-red-900/20 dark:border-red-800">
                <p className="text-sm text-red-800 dark:text-red-200">
                  {error}
                </p>
              </div>
            )}
          </div>

          {/* 갤러리 영역 */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
              이미지 갤러리
            </h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              AI로 생성된 이미지들을 확인해보세요
            </p>
          </div>

          {/* 갤러리 영역 */}
          {isLoadingImages ? (
            <div className="flex h-64 items-center justify-center">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                로딩 중...
              </p>
            </div>
          ) : images.length === 0 ? (
            <div className="flex h-64 items-center justify-center rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                생성된 이미지가 없습니다. 위에서 이미지를 생성해보세요!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="group relative overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div className="aspect-square w-full overflow-hidden">
                    <img
                      src={image.url}
                      alt={image.prompt}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="line-clamp-2 text-sm text-white">
                        {image.prompt}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
