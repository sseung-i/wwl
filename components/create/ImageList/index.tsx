import Section from "@/components/common/Section";
import dynamic from "next/dynamic";

const ImageList = () => {
  const DynamicImgList = dynamic(
    () => import("@/components/common/AddingImageList"),
    {
      ssr: false,
      loading: () => <p>로딩중...</p>,
    }
  );

  return (
    <Section title="이미지 선택 (최대 7개)">
      <DynamicImgList />
    </Section>
  );
};

export default ImageList;
