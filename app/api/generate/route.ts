import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, size } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: "프롬프트가 필요합니다." },
        { status: 400 }
      );
    }

    const [width, height] = size.split("x").map(Number);

    const useMock =
      process.env.USE_MOCK_API === "true" || !process.env.REPLICATE_API_TOKEN;

    let imageUrl: string;
    let modelName: string = "mock";

    if (useMock) {
      console.log("Mock 모드: 플레이스홀더 이미지 생성");

      const svg = `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#f3f4f6"/>
          <text x="50%" y="50%" font-family="Arial" font-size="24" fill="#6b7280" text-anchor="middle" dominant-baseline="middle">
            ${prompt.substring(0, 30)}...
          </text>
        </svg>
      `.trim();

      const svgBuffer = Buffer.from(svg);
      const base64Svg = svgBuffer.toString("base64");
      imageUrl = `data:image/svg+xml;base64,${base64Svg}`;
    } else {
      const replicate = new Replicate({
        auth: process.env.REPLICATE_API_TOKEN,
      });

      modelName = "black-forest-labs/flux-schnell";

      console.log("이미지 생성 시작:", { prompt, width, height });

      const output = await replicate.run(modelName as `${string}/${string}`, {
        input: {
          prompt: prompt,
          width: width,
          height: height,
          output_format: "png",
          output_quality: 90,
        },
      });

      console.log("이미지 생성 완료");

      imageUrl = Array.isArray(output) ? output[0] : output;
    }

    if (!imageUrl) {
      return NextResponse.json(
        { error: "이미지 URL을 가져올 수 없습니다." },
        { status: 500 }
      );
    }

    let base64ImageUrl: string;

    if (useMock || imageUrl.startsWith("data:")) {
      base64ImageUrl = imageUrl;
    } else {
      const imageResponse = await fetch(imageUrl);
      const imageBlob = await imageResponse.blob();
      const arrayBuffer = await imageBlob.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString("base64");
      base64ImageUrl = `data:image/png;base64,${base64}`;
    }

    const generatedImage = {
      id: `img-${Date.now()}`,
      url: base64ImageUrl,
      prompt,
      createdAt: new Date().toISOString(),
      model: modelName,
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
      {
        error:
          error instanceof Error
            ? error.message
            : "이미지 생성 중 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}
