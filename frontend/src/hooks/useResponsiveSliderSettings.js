import { useEffect, useState } from "react";

const getSettingsForWidth = (settings, width) => {
  const breakpoint = settings.responsive
    ?.slice()
    .sort((a, b) => a.breakpoint - b.breakpoint)
    .find((item) => width <= item.breakpoint);

  return {
    ...settings,
    ...breakpoint?.settings,
    responsive: undefined,
  };
};

const useResponsiveSliderSettings = (settings) => {
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window === "undefined" ? Number.POSITIVE_INFINITY : window.innerWidth,
  );

  useEffect(() => {
    const updateViewportWidth = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", updateViewportWidth);
    return () => window.removeEventListener("resize", updateViewportWidth);
  }, []);

  return getSettingsForWidth(settings, viewportWidth);
};

export default useResponsiveSliderSettings;
