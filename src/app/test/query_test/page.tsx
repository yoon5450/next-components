"use client";

import { useGetBookDetail } from "@/hook/useBookFetching";

function Page() {
  const { data, isLoading, error } = useGetBookDetail("9788936433598");

  console.log(data);
  return <div>Pa</div>;
}

export default Page;

/*
📊 종합 평가
현재 구조는 프로젝트 적용에 적절하지만, 위의 개선사항들을 적용하면 더욱 견고한 구조가 될 것입니다.
✅ 구조적 분리: 잘 구현됨
✅ Provider 연동: 정상 작동
⚠️ 타입 안정성: 개선 필요 - 리턴 타입 지정
⚠️ 에러 처리: 강화 필요 - 단순한 에러 검증
⚠️ 환경 설정: 검증 추가 - 환경 변수 검증 추가
*/
