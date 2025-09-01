import React from 'react';
import { RotateCcw, Trophy } from 'lucide-react';

interface GameOverProps {
  score: number;
  onRestart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ score, onRestart }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 border border-white/30 text-center max-w-md mx-4">
        <div className="mb-6">
          <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-2">Game Over!</h2>
          <p className="text-white/80">You've run out of lives</p>
        </div>
        
        <div className="mb-8">
          <div className="text-4xl font-bold text-white mb-2">
            {score.toLocaleString()}
          </div>
          <p className="text-white/60">Final Score</p>
        </div>
        
        <button
          onClick={onRestart}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-2 mx-auto"
        >
          <RotateCcw className="w-5 h-5" />
          Play Again
        </button>
      </div>
    </div>
  );
};

export default GameOver;