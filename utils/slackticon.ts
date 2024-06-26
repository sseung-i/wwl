export const isPassAuth = (pathname: string) => {
  return pathname === "/" || pathname === "/slackticon";
};

// blob -> url : URL.createObjectURL(blob)
export const handleGifDownload = (imgUrl: string, name?: string) => {
  // <a> 태그 생성
  const anchor = document.createElement("a");
  anchor.setAttribute("href", imgUrl);
  anchor.setAttribute("download", name || "new");
  document.body.appendChild(anchor); // <a> 태그를 문서에 추가
  anchor.click(); // <a> 태그를 프로그래밍 방식으로 클릭하여 다운로드 실행
  document.body.removeChild(anchor); // 사용 후 <a> 태그를 문서에서 제거
};
