import CryptoJS from "crypto-js";

export const encrypt = <TData = unknown>(
  data: TData,
  secretKey = process.env.REACT_APP_APP_SECRET_KEY,
  secretIV = process.env.REACT_APP_APP_SECRET_IV
): string | undefined => {
  try {
    if (!secretIV || !secretKey) return;
    const key = CryptoJS.enc.Hex.parse(secretKey);
    const iv = CryptoJS.enc.Hex.parse(secretIV);
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
      iv: iv,
    }).toString();
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encrypted));
  } catch (_) {
    return;
  }
};

export const decrypt = <TResult = unknown>(
  data: string,
  secretKey = process.env.REACT_APP_APP_SECRET_KEY,
  secretIV = process.env.REACT_APP_APP_SECRET_IV
): TResult | undefined => {
  try {
    if (!secretIV || !secretKey) return;
    const key = CryptoJS.enc.Hex.parse(secretKey);
    const iv = CryptoJS.enc.Hex.parse(secretIV);
    const decrypted = CryptoJS.enc.Base64.parse(data).toString(
      CryptoJS.enc.Utf8
    );
    return JSON.parse(
      CryptoJS.AES.decrypt(decrypted, key, { iv: iv }).toString(
        CryptoJS.enc.Utf8
      )
    );
  } catch (_) {
    return;
  }
};
