'use client';

import { Section } from "@/components/layout";
import S from "./styles.module.scss"
import E from "../effect.module.scss"
import useGifCreateStore from "@/store/gif/create";
import Image from "next/image";
import { useState } from "react";
import EffectInfo from "./EffectInfo";
import HandleBtn from "@/components/common/HandleBtn";
import { handleSingleCreateGif } from "@/utils/gif";

const Simple = () => {

    const [file,setFile] = useState<null|File>(null);

    const { resultGif, addImage, reset } = useGifCreateStore((state) => state);

    /** 이미지 핸들러 */
    const handleAddImgFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;
        setFile(files[0])
        // const filesArray = Array.from(files);

        // addImage(filesArray);

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
                    {!file ?
                        <span>
                            이미지를 선택해주세요.
                        </span>
                        :
                        <Image src={URL.createObjectURL(file)} alt="image" fill/>
                    }
                </label>
            </Section>
            {!!file &&
                <>
                    <Section title="효과 선택">
                        <EffectInfo />
                    </Section>
                    <div className={E.btnWrap}>
                        <HandleBtn style={resultGif ? "LINE" : "FILL"} onClick={() => handleSingleCreateGif()}>gif 미리보기 생성</HandleBtn>
                        <HandleBtn style="LINE" onClick={reset}>초기화</HandleBtn>
                    </div>
                </>
            }
        </>
    );
}
 
export default Simple;