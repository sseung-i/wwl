'use client'

import S from "./styles.module.scss"
import E from "../../effect.module.scss"
import useGifCreateStore from "@/store/gif/create";
import { TimerIcon } from "@/public/assets/icon";

const EffectInfo = () => {
    const { time } = useGifCreateStore(state=>state.effect)
    const setEffect = useGifCreateStore(state=>state.setEffect)



    return (
        <ul className={E.effects}>
            <li className={E.effectWrap}>
                <h4 className={E.effectName}><TimerIcon /></h4>
                <div className={E.inputWrap}>
                    <input type="range" step={100} min={100} max={3000} value={time} onChange={(e) => setEffect("time", Number(e.currentTarget.value))}/> <span>{time / 1000}s</span>
                </div>
            </li>
        </ul>
    );
}
 
export default EffectInfo;