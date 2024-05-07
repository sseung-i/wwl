'use client'

import { Section } from "@/components/layout";
import SectionTitle from "@/components/layout/Section/SectionTitle";
import useGifCreateStore from "@/store/gif/create";
import Image from "next/image";
import S from "./styles.module.scss"
import HandleBtn from "@/components/common/HandleBtn";
import { axiosPost } from "@/utils/axios";
import { useState } from "react";

const Register = () => {
    const [content,setContent] = useState({
        title: "",
        description: "",
        isPublic: true,
    })
    const resultGif = useGifCreateStore(state => state.resultGif);

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("gifImage", resultGif);
    
        try {
          const fileRes = await axiosPost(
            "/v1/api/file",
            {
              file: formData,
              userId: 1234,
            },
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
    
          const imageId = fileRes.data.id;

          const res = await axiosPost("/v1/api/user-emoticon",
            {
                userId: 1234,
                imageId,
                isPublic: content.isPublic,
                title:content.title,
                description:content.description,
            }
          )
          console.log("---res ::", res);
    
        } catch (err) {

            console.error("[ERROR]",err)
        }
    
    
    
      };
      
    return ( <>
        <Section title="이미지 등록">
            <Image
                className={S.resultImg}
                src={resultGif}
                alt="result"
                width={300}
                height={300}
                />
        </Section>
        <Section title="제목">
            <input className={S.title} placeholder="제목을 입력해주세요 (최대 20자)" />
        </Section>
        <Section title="설명">
            <textarea className={S.description} placeholder="설명을 입력해주세요"/>
        </Section>
        <HandleBtn onClick={handleUpload}>등록</HandleBtn>
    </> );
}
 
export default Register;