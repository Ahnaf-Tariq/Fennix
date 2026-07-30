const SPLASH_EXIT_EVENT = "fennix:splash-exit";
const SPLASH_COMPLETE_EVENT = "fennix:splash-complete";

declare global {
  interface Window {
    __fennixSplashDone?: boolean;
    __fennixSplashExiting?: boolean;
  }
}

export function resetSplashLifecycle() {
  if (typeof window === "undefined") return;
  window.__fennixSplashDone = false;
  window.__fennixSplashExiting = false;
}

export function markSplashExiting() {
  if (typeof window === "undefined") return;
  window.__fennixSplashExiting = true;
  window.dispatchEvent(new CustomEvent(SPLASH_EXIT_EVENT));
}

export function markSplashComplete() {
  if (typeof window === "undefined") return;
  window.__fennixSplashDone = true;
  window.__fennixSplashExiting = true;
  window.dispatchEvent(new CustomEvent(SPLASH_COMPLETE_EVENT));
}

export function onSplashExit(callback: () => void) {
  if (typeof window === "undefined") return () => undefined;

  if (window.__fennixSplashExiting || window.__fennixSplashDone) {
    callback();
    return () => undefined;
  }

  window.addEventListener(SPLASH_EXIT_EVENT, callback);
  return () => window.removeEventListener(SPLASH_EXIT_EVENT, callback);
}

export function onSplashComplete(callback: () => void) {
  if (typeof window === "undefined") return () => undefined;

  if (window.__fennixSplashDone) {
    callback();
    return () => undefined;
  }

  window.addEventListener(SPLASH_COMPLETE_EVENT, callback);
  return () => window.removeEventListener(SPLASH_COMPLETE_EVENT, callback);
}
