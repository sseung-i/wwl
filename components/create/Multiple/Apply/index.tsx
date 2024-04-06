'use client'

import HandleBtn from "@/components/common/HandleBtn";
import useGifCreateStore from "@/store/gif/create";
import { handleCreateGif } from "@/utils/gif";
import S from "./styles.module.scss"

const Apply = () => {
    
    const resultGif = useGifCreateStore(state => state.resultGif);
    const reset = useGifCreateStore(state => state.reset);
    console.log("apply::",resultGif)



    return ( 
            <div className={S.btnWrap}>
                <HandleBtn style={resultGif ? "LINE" : "FILL"} onClick={handleCreateGif}>gif 미리보기 생성</HandleBtn>
                <HandleBtn style="LINE" onClick={reset}>초기화</HandleBtn>
            </div>
    );
}
 
export default Apply;