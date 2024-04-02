import dynamic from "next/dynamic";
import HandleBtn from "@/components/common/HandleBtn";
import { Section, PageWrapper } from "@/components/layout";
import { handleCreateGif } from "@/utils/gif";
import { AddingImageList, Apply, EffectInfo } from "@/components/create";

const CreatePage = () => {

  
  
  return (
    <PageWrapper>
      <Section title="이미지 선택 (최대 7개)">
        <AddingImageList />
      </Section>
      <Section title="이미지 효과">
        <EffectInfo />
      </Section>
      <Apply />
    </PageWrapper>
  );
};

export default CreatePage;
