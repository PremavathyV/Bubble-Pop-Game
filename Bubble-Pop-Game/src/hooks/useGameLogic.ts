import { useState, useEffect, useCallback } from 'react';

interface Bubble {
  id: string;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
}

interface Particle {
  id: string;
  x: number;
  y: number;
  color: string;
}

const colors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
];

export const useGameLogic = () => {
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isGameRunning, setIsGameRunning] = useState(true);
  const [spawnRate, setSpawnRate] = useState(2000);

  const createBubble = useCallback(() => {
    const bubble: Bubble = {
      id: `bubble-${Date.now()}-${Math.random()}`,
      x: Math.random() * (window.innerWidth - 100) + 50,
      y: -50,
      size: Math.random() * 40 + 60,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 2 + 1 + (level * 0.5),
    };
    return bubble;
  }, [level]);

  const popBubble = useCallback((bubbleId: string, x: number, y: number) => {
    setBubbles(prev => {
      const bubble = prev.find(b => b.id === bubbleId);
      if (bubble) {
        // Create particles
        setParticles(prevParticles => [...prevParticles, {
          id: `particle-${Date.now()}`,
          x,
          y,
          color: bubble.color,
        }]);

        // Update score and combo
        setCombo(prevCombo => {
          const newCombo = prevCombo + 1;
          setScore(prevScore => prevScore + (50 * newCombo));
          return newCombo;
        });
      }
      return prev.filter(b => b.id !== bubbleId);
    });
  }, []);

  const missBubble = useCallback((bubbleId: string) => {
    setBubbles(prev => prev.filter(b => b.id !== bubbleId));
    setCombo(0);
    setLives(prev => {
      const newLives = prev - 1;
      if (newLives <= 0) {
        setIsGameRunning(false);
      }
      return newLives;
    });
  }, []);

  const removeParticle = useCallback((particleId: string) => {
    setParticles(prev => prev.filter(p => p.id !== particleId));
  }, []);

  const resetGame = useCallback(() => {
    setScore(0);
    setCombo(0);
    setLevel(1);
    setLives(3);
    setBubbles([]);
    setParticles([]);
    setIsGameRunning(true);
    setSpawnRate(2000);
  }, []);

  // Spawn bubbles
  useEffect(() => {
    if (!isGameRunning) return;

    const interval = setInterval(() => {
      setBubbles(prev => [...prev, createBubble()]);
    }, spawnRate);

    return () => clearInterval(interval);
  }, [isGameRunning, spawnRate, createBubble]);

  // Level progression
  useEffect(() => {
    const newLevel = Math.floor(score / 1000) + 1;
    if (newLevel !== level) {
      setLevel(newLevel);
      setSpawnRate(prev => Math.max(prev - 100, 500));
    }
  }, [score, level]);

  // Reset combo after inactivity
  useEffect(() => {
    if (combo === 0) return;

    const timeout = setTimeout(() => {
      setCombo(0);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [combo]);

  return {
    score,
    combo,
    level,
    lives,
    bubbles,
    particles,
    isGameRunning,
    popBubble,
    missBubble,
    removeParticle,
    resetGame,
  };
};