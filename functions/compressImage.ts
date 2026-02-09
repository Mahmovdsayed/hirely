export const compressImage = async (
  file: File,
  size: "square" | "banner",
): Promise<File | null> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return reject(new Error("Failed to get canvas context"));

    const img = new Image();
    const objectURL = URL.createObjectURL(file);

    img.onload = () => {
      const maxWidth = size === "square" ? 500 : 1920;
      const maxHeight = size === "square" ? 500 : 1080;
      let { width, height } = img;

      if (width > maxWidth || height > maxHeight) {
        const scale = Math.min(maxWidth / width, maxHeight / height);
        width *= scale;
        height *= scale;
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(objectURL);
          if (blob) {
            const newFileName = file.name.replace(/\.[^/.]+$/, "") + ".webp";
            const newFile = new File([blob], newFileName, {
              type: "image/webp",
              lastModified: Date.now(),
            });
            resolve(newFile);
          } else {
            reject(new Error("Canvas toBlob failed"));
          }
        },
        "image/webp",
        1,
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectURL);
      reject(new Error("Failed to load image"));
    };

    img.src = objectURL;
  });
};
