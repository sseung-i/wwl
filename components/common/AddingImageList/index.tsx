"use client";

import { ChangeEvent, useRef, useState } from "react";
import S from "./styles.module.scss";
import NextImage from "next/image";
import Modal from "../Modal";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import DeleteIcon from "@icon/delete-line.svg";
import workerStr from "@/utils/gifWorker";
import GIF from "gif.js.optimized";

const AddingImageList = () => {
  // // todo : 아예 블롭데이터 이미지로 사용해버리기?
  const [imgList, setImgList] = useState<
    { ref: HTMLCanvasElement | null; src: string }[]
  >([]);
  const [resultImg, setResultImg] = useState<string>("");
  const [isOpen, setIsOpen] = useState<number | null>(null);

  const cropperRef = useRef<ReactCropperElement>(null);

  function dataURLtoBlob(dataURL: string) {
    const arr = dataURL.split(",");
    const matches = arr[0].match(/:(.*?);/);
    const mime = matches && matches.length >= 2 ? matches[1] : null;

    // MIME 타입이 없을 때 크롭 리셋
    if (!mime) {
      const cropperInstance = cropperRef.current?.cropper;
      if (!cropperInstance) return;

      cropperInstance.reset();
      return;
    }

    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  /** 이미지 핸들러 */
  const handleAddImgFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const filesArray = Array.from(files);

    setImgList((prev) => [
      ...prev,
      ...filesArray.map((file) => {
        return { ref: null, src: URL.createObjectURL(file) };
      }),
    ]);
    e.target.value = "";
  };

  const handleDeleteImg = (index: number) => {
    // 모달로
    if (window.confirm(`${index + 1}번째 이미지를 삭제하시겠습니까?`)) {
      setImgList((prev) => {
        if (prev.length === 1) return [];

        URL.revokeObjectURL(prev[index + 1].src);
        return [...prev.slice(0, index), ...prev.slice(index + 1, prev.length)];
      });
    }
  };

  const handleEditorClose = () => {
    setIsOpen(null);
  };

  // const throttledSetCroppedImage = useDebounce(setCroppedImage, 600);

  // const onCrop = () => {
  //   const cropper = cropperRef.current?.cropper;
  //   if (!cropper) return;

  //   // // Data URL로 크롭된 이미지 가져오기
  //   const croppedDataURL = cropper.getCroppedCanvas().toDataURL();

  //   // //Data URL을 Blob으로 변환
  //   function dataURLtoBlob(dataURL: string) {
  //     const arr = dataURL.split(",");
  //     const matches = arr[0].match(/:(.*?);/);
  //     const mime = matches && matches.length >= 2 ? matches[1] : null;

  //     // MIME 타입이 없을 때 크롭 리셋
  //     if (!mime) {
  //       const cropperInstance = cropperRef.current?.cropper;
  //       if (!cropperInstance) return;

  //       cropperInstance.reset();
  //       return;
  //     }

  //     const bstr = atob(arr[1]);
  //     let n = bstr.length;
  //     const u8arr = new Uint8Array(n);

  //     while (n--) {
  //       u8arr[n] = bstr.charCodeAt(n);
  //     }
  //     return new Blob([u8arr], { type: mime });
  //   }

  //   // // Blob으로 변환
  //   const blob = dataURLtoBlob(croppedDataURL);

  //   if (blob) {
  //     throttledSetCroppedImage(blob);
  //   }
  // };

  const handleSetCroppedImg = (listIndex: number) => {
    const croppedImage = cropperRef.current?.cropper
      .getCroppedCanvas()
      .toDataURL();

    if (!croppedImage) return;

    const blob = croppedImage && dataURLtoBlob(croppedImage);

    if (blob) {
      setImgList((prev) => {
        const setItem = prev[listIndex];
        setItem.src = URL.createObjectURL(blob);

        return [
          ...prev.slice(0, listIndex),
          setItem,
          ...prev.slice(listIndex + 1, prev.length),
        ];
      });
    }

    handleEditorClose();
  };

  const handleChangeOrder = (type: "PREV" | "NEXT", index: number) => {
    // 첫 번째 이미지에서 PREV를 시도하거나, 마지막 이미지에서 NEXT를 시도하는 경우 아무 작업도 하지 않음
    if (
      (type === "PREV" && index === 0) ||
      (type === "NEXT" && index === imgList.length - 1)
    ) {
      return;
    }

    // 새로운 이미지 리스트를 생성하기 위해 현재 이미지 리스트를 복사
    const newImgList = [...imgList];

    // 'PREV' 타입의 경우, 현재 이미지와 이전 이미지의 위치를 바꿈
    if (type === "PREV") {
      [newImgList[index], newImgList[index - 1]] = [
        newImgList[index - 1],
        newImgList[index],
      ];
    }
    // 'NEXT' 타입의 경우, 현재 이미지와 다음 이미지의 위치를 바꿈
    else if (type === "NEXT") {
      [newImgList[index], newImgList[index + 1]] = [
        newImgList[index + 1],
        newImgList[index],
      ];
    }

    // 상태를 업데이트하여 UI에 변경된 순서를 반영
    setImgList(newImgList);
  };

  const handleCreateGif = async () => {
    const workerBlob = new Blob([workerStr], {
      type: "application/javascript",
    });

    const gif = new GIF({
      workers: 2,
      workerScript: URL.createObjectURL(workerBlob),
      quality: 1,
      width: 300,
      height: 300,
    });

    imgList.forEach(({ ref, src }) => {
      if (ref) {
        const ctx = ref.getContext("2d", { willReadFrequently: true });
        if (ctx) {
          // 캔버스 컨텍스트를 직접 프레임으로 추가합니다.
          gif.addFrame(ctx, { delay: 100, copy: true });
        }
      }
      /*
      const imageDateUrl = ref?.toDataURL("image/png"); // 캔버스의 이미지 데이터 URL 생성
      if (!imageDateUrl) return;

      const img = new Image();

      img.width = 300;
      img.height = 300;

      img.onload = () => {
        // 이미지 로드 완료 후에 GIF 프레임 추가
        gif.addFrame(img, { delay: 500, copy: true });
      };

      img.src = imageDateUrl;
      */
    });

    gif.on("finished", (blob: Blob) => {
      const url = URL.createObjectURL(blob);
      console.log("--url ::", url);
      setResultImg(url);
    });

    gif.render(); // GIF 생성 시작
  };

  const setImageInCanvas = (
    canvas: HTMLCanvasElement | null,
    index: number,
    imgSrc: string
  ) => {
    if (!canvas) return;

    setImgList((prev) => {
      prev[index].ref = canvas;
      return prev;
    });

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const image = new Image();
    image.src = imgSrc;

    if (ctx) {
      image.onload = function () {
        const fixedSize = 300;
        ctx.canvas.width = fixedSize; // 캔버스 너비를 300px로 설정
        ctx.canvas.height = fixedSize; // 캔버스 높이를 새로운 높이로 설정
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

  const handleDownload = () => {
    // <a> 태그 생성
    const link = document.createElement("a");
    link.href = resultImg; // 이미지 URL 설정
    link.download = "내가만든거.gif"; // 다운로드될 이미지의 이름 설정
    document.body.appendChild(link); // <a> 태그를 문서에 추가
    link.click(); // <a> 태그를 프로그래밍 방식으로 클릭하여 다운로드 실행
    document.body.removeChild(link); // 사용 후 <a> 태그를 문서에서 제거
  };

  return (
    <>
      {isOpen !== null && (
        <Modal onClose={handleEditorClose}>
          <div className={S.editModal}>
            <Cropper
              src={imgList[isOpen].src}
              style={{ width: "100%" }}
              ref={cropperRef}
              initialAspectRatio={1}
              aspectRatio={1}
              viewMode={1}
              autoCropArea={1}
              guides={false}
              dragMode="none"
            />
            <button
              onClick={() => {
                cropperRef.current?.cropper.scale(-1, -1);
              }}
            >
              가로세로반전
            </button>
            <button
              onClick={() => {
                cropperRef.current?.cropper.scale(-1, 1);
              }}
            >
              가로반전
            </button>
            <button
              onClick={() => {
                cropperRef.current?.cropper.scale(1, -1);
              }}
            >
              세로반전
            </button>
            <button
              onClick={() => {
                cropperRef.current?.cropper.scale(1);
              }}
            >
              되돌리기
            </button>
            <button
              className={S.cropFinishBtn}
              onClick={() => handleSetCroppedImg(isOpen)}
            >
              완료
            </button>
          </div>
        </Modal>
      )}
      <div className={S.imgList}>
        {imgList.map(({ ref, src }, index) => {
          return (
            <div className={S.imgContainer} key={index}>
              <div
                className={`${S.squareBox} ${S.imgWrap}`}
                onClick={() => setIsOpen(index)}
              >
                <canvas
                  width={300}
                  height={300}
                  ref={(node) => setImageInCanvas(node, index, src)}
                ></canvas>
                {/* <NextImage
                  src={URL.createObjectURL(imgSrc)}
                  alt=""
                  fill
                /> */}
              </div>
              <div className={S.infoWrap}>
                <button
                  disabled={index < 1}
                  onClick={() => handleChangeOrder("PREV", index)}
                >{`<`}</button>
                <div className={S.infoCenter}>
                  <span className={S.order}>{index + 1}</span>
                  <button onClick={() => handleDeleteImg(index)}>
                    <DeleteIcon />
                  </button>
                  <button
                    onClick={() => {
                      const canvas = document.createElement("canvas");
                      canvas.width = 300; // 너비 설정
                      canvas.height = 300; // 높이 설정
                      const targetItem = { ref: canvas, src };
                      setImgList((prev) => [...prev, targetItem]);
                    }}
                  >
                    복사
                  </button>
                  {/* <a download="cropped.png" href={src}>
                    다운
                  </a> */}
                </div>
                <button
                  disabled={5 < index}
                  onClick={() => handleChangeOrder("NEXT", index)}
                >{`>`}</button>
              </div>
            </div>
          );
        })}

        {imgList.length <= 7 && (
          <label htmlFor="addImgInput" className={`${S.squareBox} ${S.addBtn}`}>
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
        )}
      </div>
      <button className={S.createBtn} onClick={handleCreateGif}>
        생성
      </button>
      {resultImg && (
        <>
          <NextImage src={resultImg} alt="result" width={300} height={300} />
          <button disabled={!resultImg} onClick={handleDownload}>
            저장
          </button>
        </>
      )}
    </>
  );
};

export default AddingImageList;
