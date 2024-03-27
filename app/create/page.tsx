import AddingImageList from "@/components/common/AddingImageList";
import S from "./styles.module.scss";

const CreatePage = () => {
  return (
    <main>
      <section>
        <h3>이미지 선택 (최대 7개)</h3>
        <AddingImageList />
      </section>
    </main>
  );
};

export default CreatePage;
