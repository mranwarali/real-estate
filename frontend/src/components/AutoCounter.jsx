import React, { useEffect, useState } from "react";

const AutoCounter = ({ targetNumber, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const target = parseInt(targetNumber, 10);
    if (isNaN(target) || target <= 0) {
      setCount(targetNumber);
      return;
    }

    let start = 0;
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out curve
      const current = Math.floor(progress * target);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setCount(target);
      }
    };

    const animId = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animId);
  }, [targetNumber, duration]);

  return <span>{count.toLocaleString()}</span>;
};

export default AutoCounter;
