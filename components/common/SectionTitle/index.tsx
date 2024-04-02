import { PropsWithChildren } from "react";
import S from "./styles.module.scss";

interface Props extends PropsWithChildren {}

const SectionTitle = ({ children }: Props) => {
  return <h3 className={S.sectionTitle}>{children}</h3>;
};

export default SectionTitle;
