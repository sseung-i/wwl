'use client'

import HandleBtn from "@/components/common/HandleBtn";
import useGifCreateStore from "@/store/gif/create";
import { handleCreateGif } from "@/utils/gif";
import Image from "next/image";
import S from "./styles.module.scss"
import { Section } from "@/components/layout";

const Apply = () => {
    
    const resultGif = useGifCreateStore(state => state.resultGif);
    const reset = useGifCreateStore(state => state.reset);
    console.log("apply::",resultGif)

    return ( 
        <>
            <HandleBtn onClick={handleCreateGif}>gif로 만들기</HandleBtn>
            {resultGif &&
                <Section title="미리보기">
                    <Image src={resultGif} alt="result" width={300} height={300} />
                    <div className={S.btnWrap}>
                        <HandleBtn onClick={reset}>초기화</HandleBtn>
                        <HandleBtn onClick={() => {}}>등록하기</HandleBtn>
                    </div>
                </Section>
                
            }
        </>
    );
}
 
export default Apply;