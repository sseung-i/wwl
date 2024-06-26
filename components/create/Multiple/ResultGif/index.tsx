"use client";

import HandleBtn from "@/components/common/HandleBtn";
import useGifCreateStore from "@/store/gif/create";
import Image from "next/image";
import S from "./styles.module.scss";
import { useRouter } from "next/navigation";

const ResultGif = () => {
  const router = useRouter();
  const resultGif = useGifCreateStore((state) => state.resultGif);

  return (
    <>
      {resultGif && (
        <>
          <Image
            className={S.resultImg}
            src={URL.createObjectURL(resultGif)}
            alt="result"
            width={300}
            height={300}
          />
          <HandleBtn onClick={() => router.push("/create/register")}>
            등록하러가기
          </HandleBtn>
        </>
      )}
    </>
  );
};

export default ResultGif;
