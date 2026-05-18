/** Shared motion tokens — Apple / Vapi-style easing */
export const easeOut = [0.16, 1, 0.3, 1] as const;
export const easeInOut = [0.65, 0, 0.35, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: easeOut } },
};

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: easeOut } },
};
