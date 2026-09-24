"use client";

import React from "react";

interface AiLoaderProps {
  text?: string;
  className?: string;
  size?: number;
}

const loaderStyles = `
.ai-loader-wrapper {
  color: #fff;
  -webkit-user-select: none;
  user-select: none;
  background-color: transparent;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  width: 190px;
  height: 190px;
  font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 1.05em;
  font-weight: 500;
  display: flex;
  position: relative;
  letter-spacing: -0.01em;
}

.ai-loader-ring {
  aspect-ratio: 1;
  z-index: 0;
  background-color: transparent;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  animation: 2.2s linear infinite loader-rotate;
  position: absolute;
  top: 0;
  left: 0;
}

@keyframes loader-rotate {
  0% {
    transform: rotate(90deg);
    box-shadow: inset 0 10px 20px #fff, inset 0 20px 30px #ad5fff, inset 0 60px 60px #471eec;
  }
  50% {
    transform: rotate(270deg);
    box-shadow: inset 0 10px 20px #fff, inset 0 20px 10px #d60a47, inset 0 40px 60px #311e80;
  }
  to {
    transform: rotate(450deg);
    box-shadow: inset 0 10px 20px #fff, inset 0 20px 30px #ad5fff, inset 0 60px 60px #471eec;
  }
}

.ai-loader-letter {
  opacity: 0.35;
  z-index: 1;
  border: none;
  border-radius: 50ch;
  animation: 2s infinite loader-letter-anim;
  display: inline-block;
  transform: translateY(0);
}

.ai-loader-space {
  display: inline-block;
  width: 0.35em;
}

@keyframes loader-letter-anim {
  0%, 100% {
    opacity: 0.35;
    transform: translateY(0);
    text-shadow: none;
  }
  20% {
    opacity: 1;
    transform: scale(1.15) translateY(-1px);
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(173, 95, 255, 0.6);
  }
  40% {
    opacity: 0.7;
    transform: translateY(0);
    text-shadow: none;
  }
}
`;

export const AiLoader: React.FC<AiLoaderProps> = ({
  text = "Open Master AI",
  className = "",
  size = 190,
}) => {
  const characters = Array.from(text);

  return (
    <>
      <style>{loaderStyles}</style>
      <div
        className={`ai-loader-wrapper ${className}`}
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        {characters.map((char, index) => {
          if (char === " ") {
            return (
              <span key={`space-${index}`} className="ai-loader-space" />
            );
          }
          return (
            <span
              key={`char-${index}`}
              className="ai-loader-letter"
              style={{
                animationDelay: `${index * 0.08}s`,
              }}
            >
              {char}
            </span>
          );
        })}
        <div className="ai-loader-ring" />
      </div>
    </>
  );
};

export const Component = AiLoader;
export default AiLoader;
