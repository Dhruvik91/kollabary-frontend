import { type Crop } from "react-image-crop";

export default async function getCroppedImg(
  imageElement: HTMLImageElement,
  crop: Crop
): Promise<File> {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context");
  }

  const scaleX = imageElement.naturalWidth / imageElement.width;
  const scaleY = imageElement.naturalHeight / imageElement.height;

  // Scale the crop coordinates to match the image's full-resolution natural size
  const cropWidth = crop.width * scaleX;
  const cropHeight = crop.height * scaleY;
  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  canvas.width = cropWidth;
  canvas.height = cropHeight;

  // Draw the cropped region from the source image onto the canvas
  ctx.drawImage(
    imageElement,
    cropX,
    cropY,
    cropWidth,
    cropHeight,
    0,
    0,
    cropWidth,
    cropHeight
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Canvas is empty"));
        return;
      }
      const file = new File([blob], "profile.jpg", {
        type: "image/jpeg",
      });
      resolve(file);
    }, "image/jpeg", 0.85); // 0.85 quality compression
  });
}
