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
            <div className={S.btnWrap}>
                <HandleBtn onClick={reset}>초기화</HandleBtn>
                <HandleBtn onClick={handleCreateGif}>Gif 만들기</HandleBtn>
            </div>
            {resultGif &&
                <Section title="미리보기">
                    <Image src={resultGif} alt="result" width={300} height={300} />
                    <div className={S.btnWrap}>
                        <HandleBtn onClick={handleDownload}>등록하기</HandleBtn>
                        <HandleBtn onClick={reset}>초기화</HandleBtn>
                    </div>
                </Section>
                
            }
        </>
    );
}
 
export default Apply;