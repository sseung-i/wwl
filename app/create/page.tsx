import dynamic from "next/dynamic";

const CreatePage = () => {
  const DynamicComponent = dynamic(
    () => import("@/components/common/AddingImageList"),
    {
      ssr: false,
      loading: () => <p>로딩중...</p>,
    }
  );

  return (
    <main>
      <section>
        <h3>이미지 선택 (최대 7개)</h3>
        <DynamicComponent />
      </section>
    </main>
  );
};

export default CreatePage;
