declare module 'use-sound' {
  interface HookOptions {
    volume?: number;
    playbackRate?: number;
    interrupt?: boolean;
    soundEnabled?: boolean;
    sprite?: Record<string, [number, number]>;
    onload?: () => void;
    onend?: () => void;
    onplay?: () => void;
    onpause?: () => void;
    onstop?: () => void;
  }

  interface PlayFunction {
    (options?: HookOptions): void;
    stop: () => void;
    pause: () => void;
    duration: number | null;
    sound: Howl | null;
  }

  export default function useSound(
    url: string,
    options?: HookOptions
  ): [PlayFunction, { sound: Howl | null; stop: () => void; pause: () => void }];
} 