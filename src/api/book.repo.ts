
// 여기서의 fetch는 next의 fetch가 아닌 window 빌트인 fetch
// axios를 사용하기 원한다면 변경도 가능함.
export const bookRepo = {
  getBook: async (isbn13: string) => {
    const res = await fetch(`/api/library?isbn13=${isbn13}`);
    if (!res.ok) throw new Error("failed");
    return res.json();
  },
}

export default bookRepo