import React from "react";

const Loader = () => {
  return (
    <>
      <style>
        {`
          .dots-container {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100px;
            width: 100%;
          }

          .dot {
            height: 20px;
            width: 20px;
            margin-right: 10px;
            border-radius: 50%;
            background-color: var(--primaryColor);
            animation: pulse 1.5s infinite ease-in-out;
          }

          .dot:last-child {
            margin-right: 0;
          }

          .dot:nth-child(1) { animation-delay: -0.3s; }
          .dot:nth-child(2) { animation-delay: -0.1s; }
          .dot:nth-child(3) { animation-delay: 0.1s; }
          .dot:nth-child(4) { animation-delay: 0.2s; }
          .dot:nth-child(5) { animation-delay: 0.4s; }

          @keyframes pulse {
            0%, 100% {
              transform: scale(0.5);
              background-color: var(--primaryColor);
              box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
            }
            50% {
              transform: scale(1.2);
              background-color: var(--primaryColor);
              box-shadow: 0 0 0 10px rgba(178, 212, 252, 0);
            //   margin-bottom: 60px;
            }
          }
        `}
      </style>
      <div className="flex items-center justify-center h-screen">
        <div className="dots-container">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    </>
  );
};

export default Loader;
