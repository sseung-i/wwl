import HandleBtn from "@/components/common/HandleBtn";
import { ImageList } from "@/components/create";
import PageWrapper from "@/components/layout/PageWrapper";
import { handleCreateGif } from "@/utils/gif";

const CreatePage = () => {
  return (
    <PageWrapper>
      <ImageList />
      <HandleBtn onClick={handleCreateGif}>gif로 만들기</HandleBtn>
    </PageWrapper>
  );
};

export default CreatePage;
