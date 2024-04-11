import useGifCreateStore from "@/store/gif/create";
import workerStr from "./gifWorker";
import GIF from "gif.js.optimized";

export const handleMultiCreateGif = async () => {
  const workerBlob = new Blob([workerStr], {
    type: "application/javascript",
  });

  const gif = new GIF({
    workers: 2,
    workerScript: URL.createObjectURL(workerBlob),
    quality: 1,
    width: 300,
    height: 300,
    background: "#fff",

  });

  const imageList = useGifCreateStore.getState().imageList;
  const delay = useGifCreateStore.getState().effect.time / imageList.length;

  imageList.forEach(({ ref, src }) => {
    if (ref) {
      const ctx = ref.getContext("2d", { willReadFrequently: true });
      if (ctx) {
        // 캔버스 컨텍스트를 직접 프레임으로 추가합니다.
        gif.addFrame(ctx, { delay: delay, copy: false });
      }
    }
  });

  gif.on("finished", (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    console.log("--url ::", url);
    useGifCreateStore.getState().setResultGif(url);
  });

  gif.render(); // GIF 생성 시작
};

export const handleSingleCreateGif = async () => {
  //
}