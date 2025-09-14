export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <div id="post" className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          텍스트 선택 AI 질문 도구 테스트
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-semibold mb-4">사용법</h2>
          <p className="mb-4">
            아래 텍스트를 마우스로 드래그하여 선택하면 AI 질문 도구가 나타납니다. 
            텍스트를 선택한 후 "AI에게 물어보기" 버튼을 클릭해보세요.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4">샘플 텍스트</h2>
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <p className="mb-4">
              <strong>React</strong>는 사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리입니다. 
              컴포넌트 기반 아키텍처를 사용하여 재사용 가능한 UI 요소를 만들 수 있습니다.
            </p>
            <p className="mb-4">
              <strong>Next.js</strong>는 React 기반의 풀스택 프레임워크로, 서버 사이드 렌더링, 
              정적 사이트 생성, API 라우트 등의 기능을 제공합니다.
            </p>
            <p className="mb-4">
              <strong>TypeScript</strong>는 JavaScript에 정적 타입을 추가한 프로그래밍 언어로, 
              개발 시 오류를 미리 발견하고 코드의 가독성을 높일 수 있습니다.
            </p>
          </div>
          
          <h2 className="text-2xl font-semibold mb-4">기술 스택</h2>
          <ul className="list-disc pl-6 mb-6">
            <li>React 19.1.0</li>
            <li>Next.js 15.5.2</li>
            <li>TypeScript 5</li>
            <li>Tailwind CSS 4</li>
            <li>GSAP 3.13.0</li>
          </ul>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-blue-800">
              💡 <strong>팁:</strong> 이 페이지의 아무 텍스트나 선택해보세요. 
              선택된 텍스트에 대해 AI가 도움을 줄 수 있습니다!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}