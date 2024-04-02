import dynamic from "next/dynamic";
import HandleBtn from "@/components/common/HandleBtn";
import { Section, PageWrapper } from "@/components/layout";
import { AddingImageList, EffectInfo } from "@/components/create";

const CreatePage = () => {

  const DynamicApply = dynamic(() => import("@/components/create/Apply"),{
    ssr: false
  })
  
  
  return (
    <PageWrapper>
      <Section title="이미지 선택 (최대 7개)">
        <AddingImageList />
      </Section>
      <Section title="이미지 효과">
        <EffectInfo />
      </Section>
      <DynamicApply />
    </PageWrapper>
  );
};

export default CreatePage;
