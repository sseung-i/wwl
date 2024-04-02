import { PropsWithChildren } from "react";
import SectionTitle from "../SectionTitle";
import S from "./styles.module.scss";

interface Props extends PropsWithChildren {
  title: string;
}

const Section = ({ title, children }: Props) => {
  return (
    <section className={S.sectionComponent}>
      <SectionTitle>{title}</SectionTitle>
      {children}
    </section>
  );
};

export default Section;
