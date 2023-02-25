import { useEffect, useState } from "react";

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const isMobile =
      window.innerWidth <= 768 &&
      window.innerHeight <= 1024 &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0) &&
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    setIsMobile(isMobile);
  }, []);

  return isMobile;
};