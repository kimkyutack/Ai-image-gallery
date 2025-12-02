import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, model, size } = body;
    // numImages는 추후 여러 이미지 생성 기능 구현 시 사용

    if (!prompt) {
      return NextResponse.json(
        { error: "프롬프트가 필요합니다." },
        { status: 400 }
      );
    }

    // Hugging Face Inference API 사용
    // 환경 변수에서 API 키 가져오기
    const apiKey = process.env.HUGGINGFACE_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "API 키가 설정되지 않았습니다." },
        { status: 500 }
      );
    }

    // Stable Diffusion 모델 사용
    const modelId =
      model === "stable-diffusion"
        ? "stabilityai/stable-diffusion-2-1"
        : "runwayml/stable-diffusion-v1-5";

    // 이미지 크기 파싱
    const [width, height] = size.split("x").map(Number);

    // Hugging Face API 호출
    const response = await fetch(
      `https://api-inference.huggingface.co/models/${modelId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            width,
            height,
            num_inference_steps: 50,
            guidance_scale: 7.5,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `API 오류: ${errorText}` },
        { status: response.status }
      );
    }

    // 이미지 데이터를 base64로 변환
    const imageBlob = await response.blob();
    const arrayBuffer = await imageBlob.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const imageUrl = `data:image/png;base64,${base64}`;

    // 생성된 이미지 정보 반환
    const generatedImage = {
      id: `img-${Date.now()}`,
      url: imageUrl,
      prompt,
      createdAt: new Date().toISOString(),
      model: modelId,
      width,
      height,
    };

    return NextResponse.json({
      images: [generatedImage],
      success: true,
    });
  } catch (error) {
    console.error("이미지 생성 오류:", error);
    return NextResponse.json(
      { error: "이미지 생성 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
