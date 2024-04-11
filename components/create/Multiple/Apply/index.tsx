'use client'

import HandleBtn from "@/components/common/HandleBtn";
import useGifCreateStore from "@/store/gif/create";
import { handleMultiCreateGif } from "@/utils/gif";
import E from "../../effect.module.scss"

const Apply = () => {
    
    const resultGif = useGifCreateStore(state => state.resultGif);
    const reset = useGifCreateStore(state => state.reset);
    console.log("apply::",resultGif)



    return ( 
            <div className={E.btnWrap}>
                <HandleBtn style={resultGif ? "LINE" : "FILL"} onClick={handleMultiCreateGif}>gif 미리보기 생성</HandleBtn>
                <HandleBtn style="LINE" onClick={reset}>초기화</HandleBtn>
            </div>
    );
}
 
export default Apply;