import S from "./styles.module.scss";

export const LoadingSpinner = () => {
  return <div className={S.loadingSpinner} />;
};

export const LoadingBox = () => {
  return (
    <div className={S.loadingBoxContainer}>
      <LoadingSpinner />
    </div>
  );
};
