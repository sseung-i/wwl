import Link from "next/link";
import S from "./styles.module.scss"
import { Center } from "@/components/layout";

const CreatePage = () => {
  
  return (
    <Center>
      <div className={S.typeList}>
        <div className={`${S.type} ${S.simple}`}>
          <h2>Simple</h2>
          <p>한장의 이미지로 빠르게</p>
        </div>
        <Link href="/create/multi" className={`${S.type} ${S.multi}`}>
          <h2>Multi</h2>
          <p>여러장의 이미지로</p>
        </Link>
      </div>
      </Center>
  );
};

export default CreatePage;
