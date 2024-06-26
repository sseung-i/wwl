"use client";

import { Section } from "@/components/layout";
import S from "./styles.module.scss";
import E from "../effect.module.scss";
import useGifCreateStore from "@/store/gif/create";
import Image from "next/image";
import { useState } from "react";
import EffectInfo from "./EffectInfo";
import HandleBtn from "@/components/common/HandleBtn";
import { handleSingleCreateGif } from "@/utils/gif";
import dynamic from "next/dynamic";
import ResultGif from "../Multiple/ResultGif";

const DynamicApply = dynamic(
  () => import("@/components/create/Multiple/Apply"),
  {
    ssr: false,
  }
);
const Simple = () => {
  const { imageFile, addImage } = useGifCreateStore((state) => state);

  /** 이미지 핸들러 */
  const handleAddImgFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    addImage(files[0]);

    e.target.value = "";
  };

  return (
    <>
      <Section title="적용할 이미지 선택">
        <input
          id="addImgInput"
          className={S.fileInput}
          type="file"
          onChange={handleAddImgFile}
          multiple
          accept="image/*"
        />
        <label htmlFor="addImgInput" className={`${S.squareBox} ${S.addBtn}`}>
          {!imageFile ? (
            <span>이미지를 선택해주세요.</span>
          ) : (
            <Image src={URL.createObjectURL(imageFile)} alt="image" fill />
          )}
        </label>
      </Section>
      {!!imageFile && (
        <>
          <Section title="효과 선택">
            <EffectInfo />
          </Section>
          <Section>
            <DynamicApply type="SINGLE" />
          </Section>
          {/* <ResultGif /> */}
        </>
      )}
    </>
  );
};

export default Simple;
