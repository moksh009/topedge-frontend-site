import React, { useCallback } from 'react';
import { motion, useTransform, useSpring, useMotionValue } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

// ParticleField component intentionally removed. No code remains.        'rgba(244, 114, 182, 0.7)'
     