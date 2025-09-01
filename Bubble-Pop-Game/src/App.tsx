import React, { useEffect, useState } from 'react';
import Bubble from './components/Bubble';
import Particle from './components/Particle';
import GameStats from './components/GameStats';
import GameOver from './components/GameOver';
import { useGameLogic } from './hooks/useGameLogic';
import { Play } from 'lucide-react';

function App() {
  const {
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
  } = useGameLogic();

  const [gameStarted, setGameStarted] = useState(false);
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  const backgrounds = [
    'from-purple-900 via-blue-900 to-indigo-900',
    'from-pink-900 via-purple-900 to-indigo-900',
    'from-blue-900 via-teal-900 to-green-900',
    'from-red-900 via-pink-900 to-purple-900',
    'from-yellow-900 via-orange-900 to-red-900',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex(prev => (prev + 1) % backgrounds.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const startGame = () => {
    setGameStarted(true);
  };

  const handleRestart = () => {
    resetGame();
    setGameStarted(true);
  };

  if (!gameStarted) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${backgrounds[backgroundIndex]} flex items-center justify-center transition-all duration-1000`}>
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-4 animate-pulse">
            Bubble Pop
          </h1>
          <p className="text-xl text-white/80 mb-8">
            Pop the colorful bubbles before they escape!
          </p>
          <button
            onClick={startGame}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-12 rounded-3xl transition-all duration-300 transform hover:scale-110 hover:shadow-2xl flex items-center gap-3 mx-auto text-2xl"
          >
            <Play className="w-8 h-8" />
            Start Game
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${backgrounds[backgroundIndex]} transition-all duration-1000 overflow-hidden relative`}>
      <GameStats score={score} combo={combo} level={level} lives={lives} />
      
      {/* Floating background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/5 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 5}s`,
            }}
          />
        ))}
      </div>

      {/* Bubbles */}
      {bubbles.map(bubble => (
        <Bubble
          key={bubble.id}
          {...bubble}
          onPop={popBubble}
          onMiss={missBubble}
        />
      ))}

      {/* Particles */}
      {particles.map(particle => (
        <Particle
          key={particle.id}
          {...particle}
          onComplete={removeParticle}
        />
      ))}

      {/* Game Over Screen */}
      {!isGameRunning && (
        <GameOver score={score} onRestart={handleRestart} />
      )}

      {/* Combo Display */}
      {combo > 3 && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20">
          <div className="text-6xl font-bold text-white animate-bounce">
            COMBO x{combo}!
          </div>
        </div>
      )}
    </div>
  );
}

export default App;