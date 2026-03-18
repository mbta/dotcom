import { ViewHook } from "phoenix_live_view";

function isMobileBrowser(): boolean {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function getViewCount(): number {
  try {
    return Number.parseInt(
      window.localStorage.getItem("mbtaGoCTAViewCount") || "0",
      10
    );
  } catch (_e) {
    // If session and local storage aren't available, use a fallback
    return 0;
  }
}

function writeViewCount(value: number): void {
  try {
    window.localStorage.setItem("mbtaGoCTAViewCount", String(value));
  } catch (_e) {
    // If session and local storage aren't available, do nothing
  }
}

function maybeShowAndRecord(el: HTMLElement): void {
  if (!isMobileBrowser()) return;

  const viewCount = getViewCount() + 1;
  if (viewCount > 3) return;

  el.classList.remove("hidden");
  writeViewCount(viewCount);
}

const MBTAGoCTABanner: Partial<ViewHook> = {
  mounted() {
    if (this.el) maybeShowAndRecord(this.el);
  }
};

export default MBTAGoCTABanner;
