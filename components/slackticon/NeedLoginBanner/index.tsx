import LinkBtn from "@/components/common/LinkBtn";
import S from "./styles.module.scss";
import { cookies } from "next/headers";

const Banner = () => {
  const accessToken = cookies().get("accessToken")?.value;

  return (
    <div className={S.bannerContainer}>
      <h2>
        슬랙티콘을
        <br />
        만들고 공유해보세요!
      </h2>
      <LinkBtn arrow name="Login" href="/login" className={S.LinkBtn} />
    </div>
  );
};

export default Banner;
