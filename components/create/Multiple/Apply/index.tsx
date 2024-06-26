"use client";

import HandleBtn from "@/components/common/HandleBtn";
import useGifCreateStore from "@/store/gif/create";
import { handleMultiCreateGif, handleSingleCreateGif } from "@/utils/gif";
import E from "../../effect.module.scss";
import { useRouter } from "next/navigation";

interface Props {
  type: "MULTI" | "SINGLE";
}
const Apply = ({ type }: Props) => {
  const router = useRouter();
  const resultGif = useGifCreateStore((state) => state.resultGif);
  const reset = useGifCreateStore((state) => state.reset);
  console.log("apply::", resultGif);

  return (
    <div className={E.btnWrap}>
      <HandleBtn
        style={resultGif ? "LINE" : "FILL"}
        onClick={() =>
          type === "MULTI"
            ? handleMultiCreateGif({
                handler: () => router.push("/create/register"),
              })
            : handleSingleCreateGif({
                handler: () => router.push("/create/register"),
              })
        }
      >
        gif 미리보기 생성
      </HandleBtn>
      <HandleBtn style="LINE" onClick={reset}>
        초기화
      </HandleBtn>
    </div>
  );
};

export default Apply;
