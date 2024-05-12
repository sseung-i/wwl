"use client";

import { Section } from "@/components/layout";
import useGifCreateStore from "@/store/gif/create";
import Image from "next/image";
import S from "./styles.module.scss";
import Form from "./Form";

const Register = () => {
  const resultGif = useGifCreateStore((state) => state.resultGif);

  // todo : set state로인해 컴포넌트 재렌더되어 이미지 계속 처음부터 시작됨 -> 이미지/state 분리

  return (
    resultGif && (
      <>
        <Section title="이미지 등록">
          <Image
            className={S.resultImg}
            src={URL.createObjectURL(resultGif)}
            alt="result"
            width={300}
            height={300}
          />
        </Section>
        <Form gifBlob={resultGif} />
      </>
    )
  );
};

export default Register;
