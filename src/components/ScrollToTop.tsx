"use client";

import { useEffect } from "react";

/**
 * Prevents the browser from auto-scrolling to a hash target (e.g. #contact)
 * on page reload. Without this, reloading while a hash is in the URL causes
 * the page to jump/scroll to that section instead of starting at the top.
 */
export default function ScrollToTop() {
  useEffect(() => {
    // Disable the browser's automatic scroll restoration on back/forward/reload
    window.history.scrollRestoration = "manual";

    // Scroll to top instantly (overrides CSS scroll-behavior: smooth)
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    // Remove the hash from the URL so future reloads start at the top
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  return null;
}
