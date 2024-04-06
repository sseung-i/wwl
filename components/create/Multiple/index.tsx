import dynamic from "next/dynamic";
import { Section } from "@/components/layout";
import AddingImageList from "./AddingImageList";
import EffectInfo from "./EffectInfo";
import CropModal from "./CropModal";
import ResultGif from "./ResultGif";

const Multiple = () => {
    const DynamicApply = dynamic(() => import("@/components/create/Multiple/Apply"),{
        ssr: false
      })
    return (
    <>
        <Section title="이미지 선택 (최대 9개)">
            <AddingImageList />
        </Section>
        <Section title="GIF 설정">
            <EffectInfo />
        </Section>
        <DynamicApply />
        <ResultGif />

    </>
    );
}
 
export default Multiple;