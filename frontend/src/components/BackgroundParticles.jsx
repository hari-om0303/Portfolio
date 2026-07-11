import React from 'react';
import { motion } from 'framer-motion';

const BackgroundParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Glow Blob 1 - Cyan */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full bg-accent-primary/10 blur-[80px] md:blur-[120px] dark:bg-accent-primary/5"
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -50, 40, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Glow Blob 2 - Purple */}
      <motion.div
        className="absolute top-1/2 right-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-accent-secondary/10 blur-[80px] md:blur-[120px] dark:bg-accent-secondary/5"
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 50, -40, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Glow Blob 3 - Emerald */}
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-[250px] md:w-[400px] h-[250px] md:h-[400px] rounded-full bg-emerald-500/10 blur-[80px] md:blur-[100px] dark:bg-emerald-500/5"
        animate={{
          x: [0, 30, -50, 0],
          y: [0, 40, -30, 0],
          scale: [1, 1.15, 0.85, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};

export default BackgroundParticles;
