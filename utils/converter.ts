export const readAsDataURL = (blob: Blob): Promise<FileReader> =>
  new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.readAsDataURL(blob);
    fr.onload = () => resolve(fr);
    fr.onerror = (err) => reject(err);
  });
