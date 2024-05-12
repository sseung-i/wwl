import S from "./styles.module.scss";

interface Props {
  text: string;
}

const Empty = ({ text }: Props) => {
  return (
    <div className={S.emptyContainer}>
      <p>{text}</p>
    </div>
  );
};

export default Empty;
