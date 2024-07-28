import { SlackticonListItemType } from "@/service/slackticon";
import S from "./styles.module.scss";
import Link from "next/link";
import { Modal } from "@/components/common/Modal";
import { redirect, useRouter } from "next/navigation";
import { clientCookies } from "@/utils/cookie";
import { useSession } from "next-auth/react";

interface Props {
  slackticonList: SlackticonListItemType[];
  gridNum: 2 | 3;
}

const ListView = ({ slackticonList, gridNum }: Props) => {
  const router = useRouter();
  const session = useSession().data;

  const handleRouting = async (slackticonId: number) => {
    if (!!session) {
      router.push(`/slackticon/${slackticonId}`);
    } else {
      Modal.confirm({
        title: "로그인이 필요합니다.",
        content: "지금 로그인 하시겠습니까?",
        onConfirm: () => {
          router.push("/login");
        },
      });
    }
  };
  return (
    <ul className={`${S.list} ${S[`grid-${gridNum}`]}`}>
      {slackticonList.map((slackticon) => {
        return (
          <li key={slackticon.id} className={S.gifItem}>
            <button onClick={() => handleRouting(slackticon.id)}>
              <div className={S.gifWrap}>
                <img
                  src={slackticon.imageUrl}
                  alt={`${slackticon.title} 이미지`}
                />
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default ListView;
