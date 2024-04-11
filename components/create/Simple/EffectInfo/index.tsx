import S from "./styles.module.scss"
import E from "../../effect.module.scss"
import useGifCreateStore from "@/store/gif/create";
import { TimerIcon } from "@/public/assets/icon";

const EffectInfo = () => {
    const { rotate, scale, step, time } = useGifCreateStore(state=>state.effect)
    const setEffect = useGifCreateStore(state=>state.setEffect)

    return ( 
        <ul className={E.effects}>
            <li className={E.effectWrap}>
                <h4 className={E.effectName}><TimerIcon /></h4>
                <div className={E.inputWrap}>
                    <input type="range" step={100} min={100} max={3000} value={time} onChange={(e) => setEffect("time", Number(e.currentTarget.value))}/> <span>{time / 1000}s</span>
                </div>
            </li>
            <li className={E.effectWrap}>
                <h4 className={E.effectName}>step :</h4>
                <div className={E.inputWrap}>
                    <input type="range" step={1} min={2} max={10} value={step} onChange={(e) => setEffect("step", Number(e.currentTarget.value))}/> <span>{step}</span>
                </div>
            </li>
            <li className={E.effectWrap}>
                <h4 className={E.effectName}>scale :</h4>
                <div className={E.inputWrap}>
                    <input type="range" step={0.1} min={1} max={2.5} value={scale} onChange={(e) => setEffect("scale", Number(e.currentTarget.value))}/> <span>x{scale}</span>
                </div>
            </li>
            <li className={E.effectWrap}>
                <h4 className={E.effectName}>rotate :</h4>
                <div className={E.inputWrap}>
                    <label htmlFor="rotate_x" className={`${E.radioInput} ${rotate === null ? E.active : ""}`}>NONE <input id="rotate_x" name="rotate" type="radio" onChange={(e) => setEffect("rotate", null)} /></label>
                    <label htmlFor="rotate_l" className={`${E.radioInput} ${rotate === "L" ? E.active : ""}`}>L <input id="rotate_l" name="rotate" type="radio" onChange={(e) => setEffect("rotate", "L")} /></label>
                    <label htmlFor="rotate_r" className={`${E.radioInput} ${rotate === "R" ? E.active : ""}`}>R <input id="rotate_r" name="rotate" type="radio" onChange={(e) => setEffect("rotate", "R")} /></label>
                </div>
            </li>
        </ul>
     );
}
 
export default EffectInfo;