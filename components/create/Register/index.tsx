"use client";

import { Section } from "@/components/layout";
import useGifCreateStore from "@/store/gif/create";
import Image from "next/image";
import S from "./styles.module.scss";
import Form from "./Form";
import { useEffect } from "react";

const Register = () => {
  const resultGif = useGifCreateStore((state) => state.resultGif);
  // const reset = useGifCreateStore((state) => state.reset);

  // useEffect(() => {
  //   return () => {
  //     reset();
  //   };
  // }, [reset]);

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
