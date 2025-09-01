import React, { useEffect, useState } from 'react';

interface BubbleProps {
  id: string;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  onPop: (id: string, x: number, y: number) => void;
  onMiss: (id: string) => void;
}

const Bubble: React.FC<BubbleProps> = ({ id, x, y, size, color, speed, onPop, onMiss }) => {
  const [currentY, setCurrentY] = useState(y);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentY(prev => {
        const newY = prev + speed;
        if (newY > window.innerHeight + 100) {
          onMiss(id);
          return prev;
        }
        return newY;
      });
    }, 16);

    return () => clearInterval(interval);
  }, [id, speed, onMiss]);

  const handlePop = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsVisible(false);
    onPop(id, x, currentY);
  };

  if (!isVisible) return null;

  return (
    <div
      className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 hover:scale-110 animate-pulse"
      style={{
        left: x,
        top: currentY,
        width: size,
        height: size,
      }}
      onClick={handlePop}
    >
      <div
        className="w-full h-full rounded-full shadow-lg border-2 border-white/30 backdrop-blur-sm"
        style={{
          background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), ${color}, ${color}dd)`,
          boxShadow: `0 0 ${size/2}px ${color}66, inset 0 0 ${size/4}px rgba(255,255,255,0.5)`,
          animation: 'float 2s ease-in-out infinite',
        }}
      />
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.05); }
        }
      `}</style>
    </div>
  );
};

export default Bubble;