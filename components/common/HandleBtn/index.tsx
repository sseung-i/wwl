import { PropsWithChildren } from "react";
import S from "./styles.module.scss";

interface Props extends PropsWithChildren {
  onClick: () => void;
}
const HandleBtn = ({ children, onClick }: Props) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    onClick();
  };
  return (
    <button className={S.handleBtn} onClick={(e) => handleClick(e)}>
      {children}
    </button>
  );
};

export default HandleBtn;
