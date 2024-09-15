import HandleBtn from "@/components/common/HandleBtn";
import { axiosPost } from "@/utils/axios";
import { useEffect, useState } from "react";
import S from "./styles.module.scss";
import { Modal } from "@/components/common/Modal";
import { useRouter } from "next/navigation";
import { CheckRoundIcon, DeleteRoundIcon } from "@/public/assets/icon";
import { Section } from "@/components/layout";
import Toast from "@/components/common/Toast";
import { registSlackticonPost, uploadFile } from "@/service/slackticon";
import getQueryClient from "@/utils/getQueryClient";
import useGifCreateStore from "@/store/gif/create";

interface ContentType {
  title: string;
  description: string;
  tag: string[];
  isPublic: boolean;
}

interface Props {
  gifBlob: Blob;
}
const Form = ({ gifBlob }: Props) => {
  const queryClient = getQueryClient();
  const router = useRouter();
  const [content, setContent] = useState<ContentType>({
    title: "",
    description: "",
    tag: [] as string[],
    isPublic: true,
  });

  const [tag, setTag] = useState("");

  const submitDisabled =
    !gifBlob || !content.title || !content.description || !content.tag.length;

  const handleUpload = () => {
    const handleValidation = (content: ContentType) => {
      if (!content.title) {
        return "제목을 입력해주세요.";
      }

      if (!content.description) {
        return "설명을 입력해주세요.";
      }

      if (content.tag.length < 3) {
        return "태그 3개 이상부터 등록 가능합니다.";
      }

      return;
    };

    const hasMsg = handleValidation(content);

    if (!!hasMsg) {
      Toast().fire({
        title: hasMsg,
      });

      return;
    }

    Modal.confirm({
      title: "등록하시겠습니까?",
      content: `게시글 공개여부를 [${
        content.isPublic ? "공개" : "비공개"
      }]로 선택하셨습니다.`,
      onConfirm: async () => {
        const fileRes = await uploadFile(gifBlob);
        const imageId = fileRes.id;

        const registBody = {
          imageId,
          isPublic: content.isPublic,
          title: content.title,
          description: content.description,
          tags: content.tag,
        };

        const res = await registSlackticonPost(registBody);

        if (res) {
          queryClient.invalidateQueries({ queryKey: ["/emoticon"] });
          Modal.alert({
            title: "등록 완료",
            content: "저등록된 슬랙티콘은\n마이페이지에서 확인 가능합니다.",
            onConfirm: () => {
              router.push("/mypage");
            },
          });
        }
      },
    });
  };

  const handleAddTag = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (tag.trim()) {
      setContent((prev) => ({ ...prev, tag: [...prev.tag, tag] }));
      setTag("");
    }
  };

  const handleDeleteTag = (index: number) => {
    const currTagList = content.tag;
    const setTagList = [
      ...currTagList.slice(0, index),
      ...currTagList.slice(index + 1, currTagList.length),
    ];
    setContent((prev) => ({ ...prev, tag: setTagList }));
  };

  const handleIsPublic = (isPublic: boolean) => {
    setContent((prev) => ({ ...prev, isPublic }));
  };

  return (
    <>
      <Section title="제목">
        <input
          className={S.title}
          placeholder="제목을 입력해주세요 (최대 20자)"
          value={content.title}
          onChange={(e) => {
            if (e.currentTarget?.value.length < 20) {
              setContent((prev) => ({ ...prev, title: e.target.value }));
            }
          }}
        />
      </Section>
      <Section title="설명">
        <textarea
          className={S.description}
          placeholder="설명을 입력해주세요"
          onChange={(e) =>
            setContent((prev) => ({ ...prev, description: e.target.value }))
          }
        />
      </Section>
      <Section title="태그">
        <p>(필수 3개이상, 최대10개)</p>
        <form className={S.tagInput} onSubmit={handleAddTag}>
          <input
            placeholder="태그 입력"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
          <button type="submit">추가</button>
        </form>
        {!!content.tag.length && (
          <ul className={S.tagList}>
            {content.tag.map((tag, index) => {
              return (
                <li key={index} className={S.tag}>
                  {tag}
                  <button
                    className={S.deleteTag}
                    onClick={(e) => {
                      e.preventDefault();
                      handleDeleteTag(index);
                    }}
                  >
                    <DeleteRoundIcon />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </Section>
      <Section title="공개여부" direction="ROW">
        <div className={S.publicWrap}>
          <button
            className={`${S.btnWrap} ${content.isPublic ? S.active : ""}`}
            onClick={() => handleIsPublic(true)}
          >
            <CheckRoundIcon />
            공개
          </button>
          <button
            className={`${S.btnWrap} ${!content.isPublic ? S.active : ""}`}
            onClick={() => handleIsPublic(false)}
          >
            <CheckRoundIcon />
            비공개
          </button>
        </div>
      </Section>
      <HandleBtn idDisabled={submitDisabled} onClick={handleUpload}>
        등록
      </HandleBtn>
    </>
  );
};

export default Form;
