'use client'

import { useRef } from "react";
import Modal from "../../../common/Modal";
import Cropper, { ReactCropperElement } from "react-cropper";
import useGifCreateStore from "@/store/gif/create";
import S from "./styles.module.scss"


const CropModal = () => {

    const isOpen = useGifCreateStore((state) => state.isOpen);
    const handleModal = useGifCreateStore((state) => state.handleModal);
    const imageList = useGifCreateStore((state) => state.imageList);
    const changeImageToBlob = useGifCreateStore((state) => state.changeImageToBlob);

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

    const handleEditorClose = () => {
        handleModal(null)
      };
    
      const handleSetCroppedImg = (listIndex: number) => {
        const croppedImage = cropperRef.current?.cropper
          .getCroppedCanvas()
          .toDataURL();
    
        if (!croppedImage) return;
    
        const blob = croppedImage && dataURLtoBlob(croppedImage);
    
        if (blob) {
          changeImageToBlob(blob, listIndex);
        }
    
        handleEditorClose();
      };


    return isOpen !== null ? ( 
    <Modal onClose={handleEditorClose}>
        <div className={S.editModal}>
          <Cropper
            src={imageList[isOpen].src}
            style={{ width: "100%" }}
            ref={cropperRef}
            initialAspectRatio={1}
            aspectRatio={1}
            viewMode={1}
            autoCropArea={1}
            guides={false}
            dragMode="none"
          />
          {/* <button
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
          </button> */}
          <button
            className={S.cropFinishBtn}
            onClick={() => handleSetCroppedImg(isOpen)}
          >
            완료
          </button>
        </div>
      </Modal> 
      ) : <></>;
}
 
export default CropModal;