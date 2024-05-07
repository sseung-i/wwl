"use client";

import HandleBtn from "@/components/common/HandleBtn";
import useGifCreateStore from "@/store/gif/create";
import Image from "next/image";
import S from "./styles.module.scss";
import { useRouter } from "next/navigation";

const ResultGif = () => {
  const router = useRouter();
  const resultGif = useGifCreateStore((state) => state.resultGif);
  const reset = useGifCreateStore((state) => state.reset);

  const handleDownload = () => {
    // <a> 태그 생성
    const link = document.createElement("a");
    link.href = resultGif; // 이미지 URL 설정
    link.download = "내가만든거.gif"; // 다운로드될 이미지의 이름 설정
    document.body.appendChild(link); // <a> 태그를 문서에 추가
    link.click(); // <a> 태그를 프로그래밍 방식으로 클릭하여 다운로드 실행
    document.body.removeChild(link); // 사용 후 <a> 태그를 문서에서 제거
  };

 

  return (
    <>
    { resultGif && (
      <>
        <Image
          className={S.resultImg}
          src={resultGif}
          alt="result"
          width={300}
          height={300}
        />
        <HandleBtn onClick={() => router.push("/create/register")}>등록하러가기</HandleBtn>
      </>
    )}
    </>
  );
};

export default ResultGif;
