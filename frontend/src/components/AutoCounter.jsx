import React, { useEffect, useState } from "react";

const AutoCounter = ({ targetNumber, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const incrementTime = duration / targetNumber;
    if (count < targetNumber) {
      const timer = setInterval(() => {
        setCount(count + 1);
      }, incrementTime);
      return () => clearInterval(timer);
    }
  }, [count, targetNumber, duration]);
  return <span>{count}</span>;
};

export default AutoCounter;
