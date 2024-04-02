'use client'

import useGifCreateStore, { State } from "@/store/gif/create";
import S from "./styles.module.scss"

const EffectInfo = () => {
    const {rotate} = useGifCreateStore(state=>state.effect)
    const setEffect = useGifCreateStore(state=>state.setEffect)


    const handleRotateEffect = (type: State["effect"]["rotate"]) => {
        setEffect("rotate",type)
    }
    return (
    <ul className={S.effects}>
        <li className={S.effectWrap}>
            <h4 className={S.effectName}>rotate</h4>
            <div className={S.inputWrap}>
                <button className={rotate === null ? S.active : ""} onClick={() => handleRotateEffect(null)}>없음</button>
                <button className={rotate === "R" ? S.active : ""} onClick={() => handleRotateEffect("R")}>시계</button>
                <button className={rotate === "L" ? S.active : ""} onClick={() => handleRotateEffect("L")}>반시계</button>
            </div>
        </li>
        <li className={S.effectWrap}>
            <h4 className={S.effectName}>scale</h4>
            <div className={S.inputWrap}>
                <input type="range" /> <span>x1.0</span>
            </div>
        </li>
    </ul>
    );
}
 
export default EffectInfo;