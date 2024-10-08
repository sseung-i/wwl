"use client";

import { DeleteRoundIcon, SearchIcon } from "@/public/assets/icon";
import S from "./styles.module.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Section } from "@/components/layout";
import { useQuery } from "@tanstack/react-query";
import { getRecommandedTags } from "@/service/slackticon";

const Search = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag") || "";
  const title = searchParams.get("title") || "";
  const [word, setWord] = useState("");

  const { data } = useQuery({
    queryKey: ["/emoticon/tag"],
    queryFn: () => getRecommandedTags(),
  });

  const handleSearch = (type: "title" | "tag", word: string) => {
    router.push(`${pathname}${word ? `?${type}=${word}` : ""}`);
  };

  const handleResetWord = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setWord("");
  };

  useEffect(() => {
    setWord(title);
  }, [tag, title]);

  return (
    <section className={S.searchContainer}>
      <div className={S.searchWrap}>
        <div className={S.inputContainer}>
          <form
            className={S.inputWrap}
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch("title", word);
            }}
          >
            <SearchIcon />
            <input
              value={word}
              onChange={(e) => setWord(e.target.value)}
              placeholder="검색어를 입력하세요"
            />
          </form>
          {!!word && (
            <button className={S.resetBtn} onClick={handleResetWord}>
              <DeleteRoundIcon />
            </button>
          )}
        </div>
      </div>
      <Section title="추천 태그">
        <ul className={S.tagList}>
          {data?.recommandedTags.map(({ tagId, tagName }) => {
            return (
              <li
                key={tagId}
                className={S.tag}
                onClick={() => handleSearch("tag", tagName)}
              >
                {tagName}
              </li>
            );
          })}
        </ul>
      </Section>
    </section>
  );
};

export default Search;
