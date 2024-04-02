import useGifCreateStore from "@/store/gif/create";
import workerStr from "./gifWorker";
import GIF from "gif.js.optimized";

export const handleCreateGif = async () => {
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

  const imageList = useGifCreateStore.getState().imageList;

  imageList.forEach(({ ref, src }) => {
    if (ref) {
      const ctx = ref.getContext("2d", { willReadFrequently: true });
      if (ctx) {
        // 캔버스 컨텍스트를 직접 프레임으로 추가합니다.
        gif.addFrame(ctx, { delay: 100, copy: true });
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
