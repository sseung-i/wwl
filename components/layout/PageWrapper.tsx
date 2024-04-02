import { PropsWithChildren } from "react";
import S from "./styles.module.scss";
import Header from "../common/Header";

const PageWrapper = ({ children }: PropsWithChildren) => {
  return (
    <main className={S.wrapper}>
      <Header />
      {children}
    </main>
  );
};

export default PageWrapper;
