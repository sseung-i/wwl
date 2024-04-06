'use client'

import { useEffect, useRef, useState } from "react";
import Modal from "../../../common/Modal";
import Cropper, { ReactCropperElement } from "react-cropper";
import useGifCreateStore from "@/store/gif/create";
import S from "./styles.module.scss"
import { FlipIcon, RotateIcon } from "@/public/assets/icon";



const FILTER_INIT = {
  flipW: false,
  flipH: false,
  rotate: 0
}

interface Props {
  isOpen: number
}
const CropModal = ({isOpen}:Props) => {

    const handleModal = useGifCreateStore((state) => state.handleModal);
    const imageList = useGifCreateStore((state) => state.imageList);
    const changeImageToBlob = useGifCreateStore((state) => state.changeImageToBlob);

    const [filter,setFilter] = useState(FILTER_INIT)

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

    const handleFlip = (type : "flipW" | "flipH") => {
      const copyFilter = {...filter};
      copyFilter[type] = !copyFilter[type];
      const {flipW, flipH} = copyFilter;

      if(flipW && flipH) {
        cropperRef.current?.cropper.scale(-1, -1);
      } else if(flipW) {
        cropperRef.current?.cropper.scale(-1, 1);
      } else if(flipH) {
        cropperRef.current?.cropper.scale(1, -1);
      } else if(!flipW && !flipH) {
        cropperRef.current?.cropper.scale(1);
      }
          

      setFilter(prev => {return ({...prev,[type]: !prev[type]})});

    }

    const handleRotate = (type: "R" | "L") => {
        cropperRef.current?.cropper.rotate(type === "R" ? 15 : -15)
    }

    const handleReset = () => {
      cropperRef.current?.cropper.rotateTo(0)
      cropperRef.current?.cropper.scale(1)
      setFilter(FILTER_INIT)
    }


    return  ( 
    <Modal onClose={handleEditorClose}>
      <div className={S.modalWrap}>
        <div className={S.editModal}>
          <Cropper
            src={imageList[isOpen].src}
            style={{ width: "100%", height: "auto" }}
            ref={cropperRef}
            initialAspectRatio={1/1}
            aspectRatio={1/1}
            viewMode={0}
            autoCropArea={1}
            guides={false}
            highlight={false}
            background={false}
            minContainerWidth={250}
            minContainerHeight={300}
            minCropBoxWidth={100}
            minCropBoxHeight={100}
            minCanvasWidth={50}
            minCanvasHeight={50}
            dragMode="move"
          />
          <div className={S.buttonWrap}>
            <ul className={S.effectWrap}>
              <li className={S.effectGrop}>
                <button onClick={handleReset}><h4>초기화</h4></button>
                </li>
              <li className={S.effectGrop}>
                <h4>반전</h4>
                <button className={filter.flipW ? S.active : ""} onClick={() => handleFlip("flipW")}><FlipIcon className={S.filpW}/></button>
                <button className={filter.flipH ?  S.active : ""} onClick={() => handleFlip("flipH")}><FlipIcon className={S.filpH}/></button>
              </li>
              <li className={S.effectGrop}>
                <h4>회전</h4>
                <button className={""}><RotateIcon className={S.rotateL} onClick={() => handleRotate("L")}/></button>
                <button className={""}><RotateIcon className={S.rotateR} onClick={() => handleRotate("R")}/></button>
              </li>
            </ul>
            <button
              className={S.cropFinishBtn}
              onClick={() => handleSetCroppedImg(isOpen)}
            >
              적용
            </button>

          </div>
        </div>
        </div>
      </Modal> 
      );
}
 
export default CropModal;