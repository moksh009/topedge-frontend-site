declare module '@vapi-ai/web' {
  export interface VapiCall {
    mute(isMuted: boolean): void;
    stop(): void;
    on(event: 'transcript', callback: (message: { text: string }) => void): void;
    on(event: 'error', callback: (error: Error) => void): void;
    on(event: 'end', callback: () => void): void;
  }

  export interface VapiMessage {
    text?: string;
    role?: string;
    content?: string;
    [key: string]: any;
  }

  export interface VapiError extends Error {
    code?: string;
    details?: any;
  }

  export interface VapiEvents {
    'call-start': () => void;
    'call-end': () => void;
    'speech-start': () => void;
    'speech-end': () => void;
    'error': (error: VapiError) => void;
    'message': (message: VapiMessage) => void;
    'volume-level': (level: number) => void;
  }

  export default class Vapi {
    constructor(apiKey: string);
    start(assistantId: string): Promise<VapiCall>;
    stop(): void;
    on<T extends keyof VapiEvents>(event: T, callback: VapiEvents[T]): void;
    send(message: { type: string; message: { role: string; content: string } }): void;
    isMuted(): boolean;
    setMuted(muted: boolean): void;
    say(message: string, endCallAfterSpoken?: boolean): void;
  }
} 