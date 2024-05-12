import { PropsWithChildren } from "react";
import S from "./styles.module.scss";

interface Props extends PropsWithChildren {
  bg?: boolean;
}
const Center = ({ children, bg }: Props) => {
  return (
    <main className={`${S.centerContainer} ${bg ? S.hasBg : ""}`}>
      {children}
    </main>
  );
};

export default Center;
