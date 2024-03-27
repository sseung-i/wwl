"use client";

import {
  ChangeEvent,
  MutableRefObject,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import S from "./styles.module.scss";
import NextImage from "next/image";
import Modal from "../Modal";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import DeleteIcon from "@icon/delete-line.svg";
import { GifEncoder } from "@skyra/gifenc";

// Debounce 함수 구현
function useDebounce(callback: Function, delay: number) {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 콜백이 변경될 때마다 최신 콜백을 참조하도록 합니다.
  useEffect(() => {
    console.log("실행 되어있음 ::");
    callbackRef.current = callback;
  }, [callback]);

  const debouncedFunction = useCallback(
    (...args: any) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(
        () => callbackRef.current(...args), //setCroppedImage(blob)
        delay
      );
    },
    [delay]
  );

  return debouncedFunction;
}

const AddingImageList = () => {
  // // todo : 아예 블롭데이터 이미지로 사용해버리기?
  const [imgList, setImgList] = useState<
    { ref: HTMLCanvasElement | null; src: string }[]
  >([]);
  const [isOpen, setIsOpen] = useState<number | null>(null);

  // const itemsRef = useRef<Map<number, HTMLCanvasElement> | null>(null);

  const cropperRef = useRef<ReactCropperElement>(null);

  console.log("imgList", imgList);

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
        return { ref: null, src: window.URL.createObjectURL(file) };
      }),
    ]);
    e.target.value = "";
  };

  const handleDeleteImg = (index: number) => {
    // 모달로
    if (window.confirm(`${index + 1}번째 이미지를 삭제하시겠습니까?`)) {
      setImgList((prev) => {
        if (prev.length === 1) return [];

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
        setItem.src = window.URL.createObjectURL(blob);

        return [
          ...prev.slice(0, listIndex),
          setItem,
          ...prev.slice(listIndex + 1, prev.length),
        ];
      });
    }

    handleEditorClose();
  };

  const handleChangeOrder = (type: "PREV" | "NEXT") => {};

  const handleCreateGif = async () => {
    // const encoder = new GifEncoder(300, 300);
    // encoder.setRepeat(0).setDelay(500).start();
    // imgList.map(({ ref, src }) => {
    //   const ctx = ref?.getContext("2d");
    //   if (!ctx) return;
    //   encoder.addFrame(ctx);
    // });
    // encoder.finish();
  };

  useEffect(() => {
    // const canvas = canvasRef.current;
    // const ctx = canvas?.getContext("2d");
    // if (!ctx) return;
    // const image = new Image();
    // console.log(":: 찾기 ::", image, isOpen);
    // if (isOpen === null) return;
    // image.src = imgList[isOpen];
    // image.onload = function () {
    //   ctx.drawImage(image, 0, 0, 300, 300);
    // };
  }, [imgList]);

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

    const ctx = canvas.getContext("2d");
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

  return (
    <>
      {isOpen !== null && (
        <Modal onClose={handleEditorClose}>
          <div className={S.editModal}>
            <Cropper
              src={imgList[isOpen].src}
              ref={cropperRef}
              initialAspectRatio={1}
              aspectRatio={1}
              viewMode={1}
              autoCropArea={1}
              guides={false}
            />
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
        {imgList.map(({ src }, index) => {
          return (
            <div className={S.imgContainer} key={index}>
              <div
                className={`${S.squareBox} ${S.imgWrap}`}
                onClick={() => setIsOpen(index)}
              >
                <canvas
                  ref={(node) => setImageInCanvas(node, index, src)}
                ></canvas>
                {/* <NextImage
                  src={window.URL.createObjectURL(imgSrc)}
                  alt=""
                  fill
                /> */}
              </div>
              <div className={S.infoWrap}>
                <button
                  disabled={index < 1}
                  onClick={() => handleChangeOrder("PREV")}
                >{`<`}</button>
                <div className={S.infoCenter}>
                  <span className={S.order}>{index + 1}</span>
                  <button onClick={() => handleDeleteImg(index)}>
                    <DeleteIcon />
                  </button>
                </div>
                <button
                  disabled={5 < index}
                  onClick={() => handleChangeOrder("NEXT")}
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
    </>
  );
};

export default AddingImageList;
