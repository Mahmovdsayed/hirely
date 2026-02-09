export const applyFilterToFile = async (
  sourceFile: File,
  filter: string,
): Promise<File> => {
  if (filter === "none") return sourceFile;

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }
      ctx.filter = filter;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          const filteredFile = new File([blob], sourceFile.name, {
            type: sourceFile.type,
            lastModified: Date.now(),
          });
          resolve(filteredFile);
        } else {
          reject(new Error("Canvas toBlob failed"));
        }
      }, sourceFile.type);
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(sourceFile);
  });
};
