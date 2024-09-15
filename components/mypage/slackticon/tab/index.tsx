"use client";

import { useEffect, useState } from "react";
import S from "./styles.module.scss";
import { usePathname, useRouter } from "next/navigation";

export type TabType = "MY" | "BOX";
interface Params {
  nowTab: TabType;
}
const MySlackticonTab = ({ nowTab }: Params) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleTab = (tab: "MY" | "BOX") => {
    router.replace(`${pathname}?tab=${tab}`);
  };

  return (
    <div className={S.tabContainer}>
      <button
        className={`${S.tab} ${nowTab === "MY" ? S.active : ""}`}
        onClick={() => handleTab("MY")}
      >
        내 슬랙티콘
      </button>
      <button
        className={`${S.tab} ${nowTab === "BOX" ? S.active : ""}`}
        onClick={() => handleTab("BOX")}
      >
        담은 리스트
      </button>
    </div>
  );
};

export default MySlackticonTab;
