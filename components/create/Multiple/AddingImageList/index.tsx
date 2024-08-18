"use client";

import S from "./styles.module.scss";
import "cropperjs/dist/cropper.css";
import "swiper/css";

import useGifCreateStore from "@/store/gif/create";
import { Swiper, SwiperSlide } from "swiper/react";
import CropModal from "../CropModal";
import {
  CopyIcon,
  DeleteIcon,
  LeftIcon,
  RightIcon,
} from "@/public/assets/icon";
import { Modal } from "@/components/common/Modal";

const AddingImageList = () => {
  const {
    isOpen,
    imageList,
    addImages,
    deleteImage,
    changeImageListOrder,
    addRefToImageList,
    copyImageList,
    handleModal,
  } = useGifCreateStore((state) => state);

  /** 이미지 핸들러 */
  const handleAddImgFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const filesArray = Array.from(files);

    addImages(filesArray);

    e.target.value = "";
  };

  const handleDeleteImg = (index: number) => {
    Modal.confirm({
      title: `${index + 1}번째 이미지를 삭제하시겠습니까?`,
      onConfirm() {
        deleteImage(index);
      },
    });
  };

  const setImageInCanvas = (
    canvas: HTMLCanvasElement | null,
    index: number,
    imgSrc: string
  ) => {
    if (!canvas) return;

    addRefToImageList(canvas, index);

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const image = new Image();
    image.src = imgSrc;

    if (ctx) {
      image.onload = function () {
        const fixedSize = 300;
        ctx.canvas.width = fixedSize; // 캔버스 너비를 300px로 설정
        ctx.canvas.height = fixedSize; // 캔버스 높이를 새로운 높이로 설정
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        const imgW = image.naturalWidth;
        const imgH = image.naturalHeight;

        let dx = 0;
        let dy = 0;
        let dw = fixedSize;
        let dh = fixedSize;

        if (imgW > imgH) {
          const scaleFactor = fixedSize / imgW; // 원본 너비 대비 300px로 조정하는 비율 계산
          dh = imgH * scaleFactor; // 비율을 사용하여 새로운 높이 계산

          dy = fixedSize < dh ? (dh - fixedSize) / 2 : (fixedSize - dh) / 2;
        } else if (imgW < imgH) {
          const scaleFactor = fixedSize / imgH; // 원본 높이 대비 300px로 조정하는 비율 계산
          dw = imgW * scaleFactor; // 비율을 사용하여 새로운 높이 계산

          dx = fixedSize < dw ? (dw - fixedSize) / 2 : (fixedSize - dw) / 2;
        }
        ctx.drawImage(image, dx, dy, dw, dh);
      };
    }
  };

  return (
    <>
      <Swiper slidesPerView={"auto"} spaceBetween={10} className={S.imgList}>
        {imageList.map(({ ref, src }, index) => {
          return (
            <SwiperSlide className={S.customSlide} key={index}>
              <div className={S.imgContainer}>
                <div
                  className={`${S.squareBox} ${S.imgWrap}`}
                  onClick={() => handleModal(index)}
                >
                  <span className={S.order}>{index + 1}</span>
                  <canvas
                    width={300}
                    height={300}
                    ref={(node) => setImageInCanvas(node, index, src)}
                  />
                </div>
                <div className={S.infoWrap}>
                  <button
                    disabled={index < 1}
                    onClick={() => changeImageListOrder("PREV", index)}
                  >
                    <LeftIcon />
                  </button>
                  <div className={S.infoCenter}>
                    <button
                      onClick={() => {
                        const canvas = document.createElement("canvas");
                        canvas.width = 300; // 너비 설정
                        canvas.height = 300; // 높이 설정
                        const targetItem = { ref: canvas, src };
                        copyImageList(targetItem);
                      }}
                    >
                      <CopyIcon />
                    </button>
                    <button onClick={() => handleDeleteImg(index)}>
                      <DeleteIcon />
                    </button>
                  </div>
                  <button
                    disabled={5 < index}
                    onClick={() => changeImageListOrder("NEXT", index)}
                  >
                    <RightIcon />
                  </button>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
        {imageList.length <= 7 && (
          <SwiperSlide className={S.customSlide}>
            <label
              htmlFor="addImgInput"
              className={`${S.squareBox} ${S.addBtn}`}
            >
              +
              <input
                id="addImgInput"
                className={S.fileInput}
                type="file"
                onChange={handleAddImgFile}
                multiple
                accept="image/*"
              />
            </label>
          </SwiperSlide>
        )}
      </Swiper>

      {isOpen !== null && <CropModal isOpen={isOpen} />}

      {/* {resultImg && (
        <>
          <NextImage src={resultImg} alt="result" width={300} height={300} />
          <button disabled={!resultImg} onClick={handleDownload}>
            저장
          </button>
        </>
      )} */}
    </>
  );
};

export default AddingImageList;
