import { PropsWithChildren } from "react";
import SectionTitle from "./SectionTitle";
import S from "./styles.module.scss";

interface Props extends PropsWithChildren {
  title?: string;
  direction?: "ROW" | "COLUMN";
}

const Section = ({ title, direction = "COLUMN", children }: Props) => {
  return (
    <section
      className={`${S.sectionComponent} ${
        direction === "COLUMN" ? S.column : S.row
      }`}
    >
      {title && <SectionTitle>{title}</SectionTitle>}
      {children}
    </section>
  );
};

export default Section;
