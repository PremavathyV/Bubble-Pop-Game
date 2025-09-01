import React from 'react';
import { Trophy, Zap, Target } from 'lucide-react';

interface GameStatsProps {
  score: number;
  combo: number;
  level: number;
  lives: number;
}

const GameStats: React.FC<GameStatsProps> = ({ score, combo, level, lives }) => {
  return (
    <div className="fixed top-4 left-4 right-4 z-10">
      <div className="flex justify-between items-center">
        <div className="bg-white/20 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/30">
          <div className="flex items-center gap-2 text-white">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="text-xl font-bold tabular-nums">
              {score.toLocaleString()}
            </span>
          </div>
        </div>
        
        <div className="flex gap-3">
          {combo > 1 && (
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 backdrop-blur-md rounded-2xl px-4 py-2 border border-white/30 animate-pulse">
              <div className="flex items-center gap-2 text-white">
                <Zap className="w-4 h-4" />
                <span className="font-bold">x{combo}</span>
              </div>
            </div>
          )}
          
          <div className="bg-white/20 backdrop-blur-md rounded-2xl px-4 py-2 border border-white/30">
            <div className="flex items-center gap-2 text-white">
              <Target className="w-4 h-4 text-green-400" />
              <span className="font-semibold">Level {level}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white/20 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/30">
          <div className="flex gap-1">
            {Array.from({ length: 3 }, (_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i < lives 
                    ? 'bg-gradient-to-r from-red-400 to-pink-400 shadow-lg' 
                    : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameStats;