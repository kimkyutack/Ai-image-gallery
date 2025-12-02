import Header from "./components/Header";
import ImageGenerationForm from "./components/ImageGenerationForm";

export default function Home() {
  const handleImageGenerate = (data: {
    prompt: string;
    model: string;
    size: string;
    numImages: number;
  }) => {
    console.log("이미지 생성 요청:", data);
    // TODO: API 연동
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
              isLoading={false}
            />
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

          {/* 갤러리 영역 - 추후 구현 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div className="flex h-64 items-center justify-center rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                이미지가 여기에 표시됩니다
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
