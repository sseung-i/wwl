import { PropsWithChildren } from "react";
import S from "./styles.module.scss";

const PageWrapper = ({ children }: PropsWithChildren) => {
  return (
    <main className={S.wrapper}>
      {children}
    </main>
  );
};

export default PageWrapper;
