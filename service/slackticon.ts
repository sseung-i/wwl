import Toast from "@/components/common/Toast";
import { axiosGet, axiosPost } from "@/utils/axios";

export type SlackticonListItemType = {
  id: number;
  title: string;
  imageUrl: string;
  createdDate: string;
  likeCount: number;
  isLiked: boolean;
};
interface PublicSlackticonListResponseType {
  page: number;
  totalPage: number;
  emoticons: SlackticonListItemType[];
}
interface GetSlackticonListParams {
  sort: string;
  title: string | null;
  tag: string | null;
}
export const getPublicSlackticonList = async (
  page: number = 1,
  params?: GetSlackticonListParams
): Promise<PublicSlackticonListResponseType> => {
  const query = new URLSearchParams();
  query.append("page", page.toString());
  query.append("size", (12).toString());

  if (params) {
    const { sort, title, tag } = params;

    query.append("sort", sort || "like");
    if (title) query.append("title", title);
    if (tag) query.append("tag", tag);
  }

  const res = await axiosGet(`/v1/api/emoticon?${query}`);
  // Suspense 테스트용 시간지연
  // await new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve("v");
  //   }, 3000);
  // });
  const data = res.data;

  return data;
};

interface SlackticonDetailResponseType {
  id: number;
  userId: number;
  userName: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  likeCount: number;
  isLiked: boolean;
  isInBox: boolean;
  isMine: boolean;
  createdDate: string;
  updatedDate: string;
}
export const getSlackticonDetail = async (
  id: string
): Promise<SlackticonDetailResponseType> => {
  const res = await axiosGet(`/v1/api/emoticon/${id}`);

  const data = res.data;

  return data;
};

export const handleEmoticonBox = async (
  emoticonId: number
): Promise<"ADD" | "REMOVE" | undefined> => {
  try {
    const res = await axiosPost(`/v1/api/emoticon/box/${emoticonId}`);

    return res.data;
  } catch (err) {
    return;
  }
};

export const handleEmoticonLike = async (
  emoticonId: number
): Promise<"LIKE" | "UNLIKE" | undefined> => {
  try {
    const res = await axiosPost(`/v1/api/emoticon/like/${emoticonId}`);
    return res.data;
  } catch (err) {
    return;
  }
};

type TagType = { tagId: string; tagName: string };
interface RecommandedTagsResponseType {
  recommandedTags: TagType[];
}
export const getRecommandedTags = async (): Promise<
  RecommandedTagsResponseType | undefined
> => {
  try {
    const res = await axiosGet(`/v1/api/emoticon/tag`);
    return res.data;
  } catch (err) {
    return;
  }
};
