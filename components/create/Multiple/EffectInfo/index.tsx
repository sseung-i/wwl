'use client'

import useGifCreateStore, { State } from "@/store/gif/create";
import S from "./styles.module.scss"

const EffectInfo = () => {
    const { time } = useGifCreateStore(state=>state.effect)
    const setEffect = useGifCreateStore(state=>state.setEffect)



    return (
    <ul className={S.effects}>
        <li className={S.effectWrap}>
            <h4 className={S.effectName}>Time</h4>
            <div className={S.inputWrap}>
                <input className={S.delay} type="range" step={100} min={100} max={3000} value={time} onChange={(e) => setEffect("time", Number(e.currentTarget.value))}/> <span>{time}</span>
            </div>
        </li>
    </ul>
    );
}
 
export default EffectInfo;