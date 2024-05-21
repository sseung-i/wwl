import { SlackticonListItemType } from "@/service/slackticon";
import S from "./styles.module.scss";
import Link from "next/link";

interface Props {
  slackticonList: SlackticonListItemType[];
  gridNum: 2 | 3;
}

const ListView = ({ slackticonList, gridNum }: Props) => {
  return (
    <ul className={`${S.list} ${S[`grid-${gridNum}`]}`}>
      {slackticonList.map((slackticon) => {
        return (
          <li key={slackticon.id} className={S.gifItem}>
            <Link href={`/slackticon/${slackticon.id}`}>
              <div className={S.gifWrap}>
                <img
                  src={slackticon.imageUrl}
                  alt={`${slackticon.title} 이미지`}
                />
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default ListView;
