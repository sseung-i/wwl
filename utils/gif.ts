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
  const imageFile = useGifCreateStore.getState().imageFile;
  const { rotate, scale, step, time } = useGifCreateStore.getState().effect;

  if(!imageFile) return;

  const workerBlob = new Blob([workerStr], {
    type: "application/javascript",
  });

  const gif = new GIF({
    workers: 5,
    workerScript: URL.createObjectURL(workerBlob),
    quality: 1,
    width: 300,
    height: 300,
    background: "#fff",
  });

  const loadImage = (src:string): Promise<HTMLImageElement> => new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

  const imageSrc = URL.createObjectURL(imageFile);

  try {
    const image = await loadImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    if(!ctx) throw new Error("Failed to get canvas context");

    canvas.width = 300;
    canvas.height = 300;

    for (let i = 1; i <= step; i++) {
      ctx.clearRect(0, 0, 300, 300);
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, 300, 300);
      ctx.save();
      ctx.translate(150, 150);
      console.log(step,(360 / step), (360 / step) * (rotate === "L" ? -1 * i : i))
      const radians = ((360 / step) * i * (Math.PI / 180)); // canvas의 rotate는 라디안(radian) 단위 회전
      rotate && ctx.rotate(rotate === "L" ? -radians : radians);
      ctx.scale(1 + (scale - 1) / step * i, 1 + (scale - 1) / step * i);
      ctx.drawImage(image, -150, -150, 300, 300);
      ctx.restore();
      gif.addFrame(ctx, { delay: time / step, copy: true });
    }

    gif.on("finished", (blob:Blob) => {
      const url = URL.createObjectURL(blob);
      console.log("--url ::", url);
      useGifCreateStore.getState().setResultGif(url);
    });

    gif.render();
  } catch (error) {
    console.error('이미지 로딩 실패:', error);
  }

  /*
  if(!imageFile) return;
  
  const canvas = document.createElement('canvas');
  const fixedSize = 300;
  canvas.width = fixedSize;
  canvas.height = fixedSize;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  const image = new Image();
  image.src = URL.createObjectURL(imageFile);

  if(!ctx) return;
  
  image.onload = function () {
    for(let i = 1; i <= step; i++){
      ctx.clearRect(0, 0, fixedSize, fixedSize);
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, fixedSize, fixedSize);
      
      
      
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
      
      rotate && ctx.rotate( ( 360 / step ) * (rotate === "L" ? -1 * i : i) );
      ctx.scale( ( scale / step ) * i, ( scale / step ) * i );
      ctx.drawImage(image, dx, dy, dw, dh);
      ctx.restore();
      gif.addFrame(ctx, { delay: ( time / step ) * i, copy: false });
    }
  }

  
  
  gif.on("finished", (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    console.log("--url ::", url);
    useGifCreateStore.getState().setResultGif(url);
  });

  gif.render(); // GIF 생성 시작

  image.onerror = () => {
    console.error('이미지 로딩 실패');
  };
  */

}