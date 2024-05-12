"use client";

import { PropsWithChildren } from "react";
import S from "./styles.module.scss";

interface Props extends PropsWithChildren {
  style?: "FILL" | "LINE";
  idDisabled?: boolean;
  onClick: () => void;
}
const HandleBtn = ({
  style = "FILL",
  idDisabled,
  children,
  onClick,
}: Props) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    onClick();
  };
  return (
    <button
      className={`${S.btn} ${idDisabled ? S.disabled : S[style]}`}
      onClick={(e) => handleClick(e)}
    >
      {children}
    </button>
  );
};

export default HandleBtn;
