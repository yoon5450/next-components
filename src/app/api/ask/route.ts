import { NextRequest, NextResponse } from "next/server";

interface AskRequest {
  snippet: string;
}

interface AskResponse {
  success: boolean;
  answer?: string;
  error?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse<AskResponse>> {
  try {
    const body: AskRequest = await request.json();
    const { snippet } = body;

    // 입력 검증
    if (!snippet || typeof snippet !== "string" || snippet.trim().length < 3) {
      return NextResponse.json(
        { success: false, error: "유효한 텍스트를 선택해주세요." },
        { status: 400 }
      );
    }

    // 실제 AI API 호출 (예시 - OpenAI, Claude 등)
    // 여기서는 모의 응답을 반환
    const mockResponse = await processAIRequest(snippet);

    return NextResponse.json({
      success: true,
      answer: mockResponse,
    });
  } catch (error) {
    console.error("API 오류:", error);
    return NextResponse.json(
      { success: false, error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

// 실제 AI API 호출 함수 (예시)
async function processAIRequest(snippet: string): Promise<string> {
  // 실제 구현에서는 여기서 OpenAI, Claude, 또는 다른 AI API를 호출
  // 예시: OpenAI API 호출
  /*
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "선택된 텍스트에 대해 간단하고 도움이 되는 설명을 제공해주세요."
        },
        {
          role: "user",
          content: `다음 텍스트에 대해 설명해주세요: "${snippet}"`
        }
      ],
      max_tokens: 200,
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  return data.choices[0]?.message?.content || "응답을 생성할 수 없습니다.";
  */

  // 모의 응답 (개발용)
  await new Promise(resolve => setTimeout(resolve, 1000)); // 1초 지연 시뮬레이션
  
  return `"${snippet}"에 대한 AI 분석 결과입니다. 이는 개발 환경에서의 모의 응답이며, 실제 AI API를 연동하면 더 정확한 답변을 제공할 수 있습니다.`;
}
