import { PropsWithChildren } from "react";
import S from "./styles.module.scss";
import { Center } from "..";

interface Props extends PropsWithChildren{
  padding?: string
}

const PageWrapper = ({ padding = "30px 20px", children }: Props) => {
  return (
    <Center>
      <div style={{padding}} className={S.wrapper}>
      {children}
      </div>
    </Center>
  );
};

export default PageWrapper;
