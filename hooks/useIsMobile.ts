import { useState, useEffect } from "react";

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check for mobile devices based on screen resolution
    const isMobileScreenSize =
      window.innerWidth <= 768 && window.innerHeight <= 1024;

    // Check for mobile devices based on touch support
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    // Check for mobile devices based on user agent string
    const isMobileUserAgent =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    const isMobile = isMobileScreenSize && isTouchDevice && isMobileUserAgent;

    setIsMobile(isMobile);
  }, []);

  return isMobile;
};
