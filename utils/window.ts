import { WINDOW_TEMP_CONTENT } from "#constants/window";
import { getRandomNumberInRange } from "#utils/randomizer";
import "client-only";

export const downloadBlob = (blob: Blob, filename?: string | null) => {
  const a = document.createElement("a");
  a.href = window.URL.createObjectURL(blob);
  a.download = filename ?? getRandomNumberInRange(1, 999999999).toString();
  a.click();
  a.remove();
  window.URL.revokeObjectURL(a.href);
};

// use it in potentially large axios requests before sending request in setTimeout() with delay to block interface
export const activateLoadingOverlay = () => {
  const elem = document.createElement("div");
  elem.id = "loading-overlay";
  elem.classList.add("loading-overlay");
  document.body.appendChild(elem);
};
// use it in potentially large axios requests after getting response and after clearTimeout() to unblock interface
export const deactivateLoadingOverlay = () => {
  const elem = document.getElementById("loading-overlay");
  if (elem) elem.remove();
};

export const createLoadingWindow = (target: string = "_blank") => {
  const loadingWindow = window.open("", target);
  if (loadingWindow)
    loadingWindow.document.body.innerHTML = WINDOW_TEMP_CONTENT;

  return loadingWindow;
};

export const isScrollable = (element: HTMLElement | null) => {
  if (!element) return false;
  const hasScrollableContent =
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth;

  const isOverflowHidden =
    window.getComputedStyle(element).overflow.indexOf("hidden") !== -1;

  const isOverflowYHidden =
    window.getComputedStyle(element).overflowY.indexOf("hidden") !== -1;

  const isOverflowXHidden =
    window.getComputedStyle(element).overflowX.indexOf("hidden") !== -1;

  return (
    hasScrollableContent &&
    (!isOverflowHidden || !isOverflowYHidden || !isOverflowXHidden)
  );
};

export const getScrollableParent = (
  element: HTMLElement | null
): HTMLElement | null => {
  return !element
    ? null
    : element === document.body
    ? document.body
    : isScrollable(element)
    ? element
    : getScrollableParent(element.parentElement);
};

export const getBrowserName = () => {
  // Порядок важен, также возможно ложное срабатывание для браузеров не включённых в список
  if (navigator.userAgent.includes("Firefox")) {
    // "Mozilla/5.0 (X11; Linux i686; rv:104.0) Gecko/20100101 Firefox/104.0"
    return "Mozilla Firefox";
  } else if (navigator.userAgent.includes("SamsungBrowser")) {
    // "Mozilla/5.0 (Linux; Android 9; SAMSUNG SM-G955F Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/9.4 Chrome/67.0.3396.87 Mobile Safari/537.36"
    return "Samsung Internet";
  } else if (
    navigator.userAgent.includes("Opera") ||
    navigator.userAgent.includes("OPR")
  ) {
    // "Mozilla/5.0 (Macintosh; Intel Mac OS X 12_5_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36 OPR/90.0.4480.54"
    return "Opera";
  } else if (navigator.userAgent.includes("YaBrowser")) {
    // Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 YaBrowser/24.1.0.0 Safari/537.36
    return "YaBrowser";
  } else if (navigator.userAgent.includes("Edge")) {
    // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
    return "Microsoft Edge (Legacy)";
  } else if (navigator.userAgent.includes("Edg")) {
    // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36 Edg/104.0.1293.70"
    return "Microsoft Edge (Chromium)";
  } else if (navigator.userAgent.includes("Chrome")) {
    // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36"
    return "Google Chrome or Chromium";
  } else if (navigator.userAgent.includes("Safari")) {
    // "Mozilla/5.0 (iPhone; CPU iPhone OS 15_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6 Mobile/15E148 Safari/604.1"
    return "Apple Safari";
  } else {
    return "";
  }
};

export const isMobile = () =>
  /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(
    navigator.userAgent
  );
