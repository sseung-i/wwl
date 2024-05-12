import { produce } from "immer";
import { create } from "zustand";

type ImageListItem = { ref: HTMLCanvasElement | null; src: string };
export type State = {
  isOpen: number | null;
  imageFile: File | null;
  imageList: ImageListItem[];
  resultGif: Blob | null;
  effect: {
    rotate: null | "R" | "L";
    scale: number;
    step: number;
    time: number;
  };
};

type Action = {
  addImage: (file: File) => void;
  addImages: (files: File[]) => void;
  deleteImage: (index: number) => void;
  changeImageToBlob: (blobImage: Blob, listIndex: number) => void;
  changeImageListOrder: (type: "PREV" | "NEXT", targetIndex: number) => void;
  addRefToImageList: (canvas: HTMLCanvasElement, listIndex: number) => void;
  copyImageList: (targetItem: ImageListItem) => void;
  setEffect: (
    type: keyof State["effect"],
    value: State["effect"][keyof State["effect"]]
  ) => void;
  setResultGif: (resultGif: State["resultGif"]) => void;
  handleModal: (isOpen: State["isOpen"]) => void;
  reset: () => void;
};

export const initValue = {
  isOpen: null,
  imageFile: null,
  imageList: [],
  resultGif: null,
  effect: {
    rotate: null,
    scale: 1,
    step: 4,
    time: 1000,
  },
};

const useGifCreateStore = create<State & Action>((set, get) => ({
  ...initValue,
  addImage: (file) => set({ imageFile: file }),
  addImages: (files) =>
    set((state) => ({
      imageList: [
        ...state.imageList,
        ...files.map((file) => {
          return { ref: null, src: URL.createObjectURL(file) };
        }),
      ],
    })),
  deleteImage: (index) =>
    set(({ imageList }) => {
      return {
        imageList:
          imageList.length === 1
            ? []
            : [
                ...imageList.slice(0, index),
                ...imageList.slice(index + 1, imageList.length),
              ],
      };
    }),
  changeImageToBlob: (blobImage, listIndex) =>
    set(({ imageList }) => {
      const setItem = {
        ...imageList[listIndex],
        src: URL.createObjectURL(blobImage),
      };

      return {
        imageList: [
          ...imageList.slice(0, listIndex),
          setItem,
          ...imageList.slice(listIndex + 1, imageList.length),
        ],
      };
    }),
  changeImageListOrder: (type, targetIndex) => {
    const imageList = [...get().imageList];
    if (
      (type === "PREV" && targetIndex === 0) ||
      (type === "NEXT" && targetIndex === imageList.length - 1)
    ) {
      return;
    }

    // 'PREV' 타입의 경우, 현재 이미지와 이전 이미지의 위치를 바꿈
    if (type === "PREV") {
      [imageList[targetIndex], imageList[targetIndex - 1]] = [
        imageList[targetIndex - 1],
        imageList[targetIndex],
      ];
    }
    // 'NEXT' 타입의 경우, 현재 이미지와 다음 이미지의 위치를 바꿈
    else if (type === "NEXT") {
      [imageList[targetIndex], imageList[targetIndex + 1]] = [
        imageList[targetIndex + 1],
        imageList[targetIndex],
      ];
    }

    set({ imageList });
  },
  addRefToImageList: (canvas, listIndex) => {
    set(
      produce(({ imageList }) => {
        imageList[listIndex].ref = canvas;
      })
    );
  },
  copyImageList: (targetItem) =>
    set(({ imageList }) => ({ imageList: [...imageList, targetItem] })),
  setEffect: (type, value) =>
    set(({ effect }) => ({ effect: { ...effect, [type]: value } })),
  setResultGif: (resultGif) => set({ resultGif }),
  handleModal: (isOpen) => set({ isOpen }),
  reset: () => set({ ...initValue }),
}));

export default useGifCreateStore;
