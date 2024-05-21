import { axiosGet } from "@/utils/axios";

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
  data: SlackticonListItemType[];
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

  const data = res.data;

  return data;
};

interface SlackticonDetailResponseType {
  id: number;
  userId: number;
  title: string;
  description: null;
  imageUrl: string;
  isPublic: number;
  createdDate: string;
  updatedDate: string;
  tags: string[];
  likeCount: number;
}
export const getSlackticonDetail = async (
  id: string
): Promise<SlackticonDetailResponseType> => {
  const res = await axiosGet(`/v1/api/user-emoticon/${id}`);

  const data = res.data;

  return data;
};
