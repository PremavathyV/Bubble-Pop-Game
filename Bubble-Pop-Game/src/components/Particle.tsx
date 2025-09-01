import React, { useEffect, useState } from 'react';

interface ParticleProps {
  id: string;
  x: number;
  y: number;
  color: string;
  onComplete: (id: string) => void;
}

const Particle: React.FC<ParticleProps> = ({ id, x, y, color, onComplete }) => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    size: number;
  }>>([]);

  useEffect(() => {
    // Create initial particles
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: 0,
      y: 0,
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 0.5) * 8,
      life: 1,
      size: Math.random() * 8 + 4,
    }));
    setParticles(newParticles);

    const interval = setInterval(() => {
      setParticles(prev => {
        const updated = prev.map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vy: p.vy + 0.3, // gravity
          life: p.life - 0.02,
          size: p.size * 0.98,
        })).filter(p => p.life > 0);

        if (updated.length === 0) {
          onComplete(id);
        }
        return updated;
      });
    }, 16);

    return () => clearInterval(interval);
  }, [id, onComplete]);

  return (
    <div className="absolute pointer-events-none" style={{ left: x, top: y }}>
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            background: color,
            opacity: particle.life,
            boxShadow: `0 0 ${particle.size}px ${color}`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  );
};

export default Particle;