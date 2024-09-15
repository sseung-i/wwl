"use client";

import { Section } from "@/components/layout";
import useGifCreateStore from "@/store/gif/create";
import Image from "next/image";
import S from "./styles.module.scss";
import Form from "./Form";
import { useEffect, useState } from "react";

const Register = () => {
  const [mount, setMount] = useState(false);
  const resultGif = useGifCreateStore((state) => state.resultGif);
  const reset = useGifCreateStore((state) => state.reset);

  useEffect(() => {
    console.log("이펙트 안 ::", mount);
    if (!!mount) {
      return () => {
        console.log("여기 되면 안되");
        reset();
      };
    } else {
      console.log("flase");
      setMount(true);
    }
  }, [mount]);

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
