import Vapi from '@vapi-ai/web';

export class VapiService {
  private vapi: Vapi | null = null;
  public isCallActive = false;
  private static instance: VapiService;
  private retryCount = 0;
  private maxRetries = 3;
  private retryDelay = 1000;
  private lastCallTime = 0;
  private minCallInterval = 500;
  private connectionPromise: Promise<void> | null = null;

  private constructor() {
    // Lazy init
  }

  static getInstance(): VapiService {
    if (!VapiService.instance) {
      VapiService.instance = new VapiService();
    }
    return VapiService.instance;
  }

  // Expose event listeners to the UI
  // Fixed: Cast event to 'any' to satisfy TypeScript constraints on VapiEvents
  on(event: string, callback: (data: any) => void) {
    if (!this.vapi) {
      this.initializeVapi().then(() => {
        this.vapi?.on(event as any, callback);
      });
    } else {
      this.vapi.on(event as any, callback);
    }
  }

  // Remove event listeners
  // Fixed: Cast vapi to 'any' because the 'off' method might be missing from the type definition
  off(event: string, callback: (data: any) => void) {
    if (this.vapi) {
      (this.vapi as any).off(event, callback);
    }
  }

  private async initializeVapi() {
    if (this.vapi) return;

    const apiKey = import.meta.env.VITE_VAPI_PUBLIC_KEY;
    if (!apiKey) throw new Error('VAPI API key is required');

    this.vapi = new Vapi(apiKey);

    this.vapi.on('call-start', () => {
      this.isCallActive = true;
      this.retryCount = 0;
    });

    this.vapi.on('call-end', () => {
      this.isCallActive = false;
    });

    this.vapi.on('error', async (error: any) => {
      console.error('VAPI Error:', error);
      if (this.retryCount < this.maxRetries) {
        this.retryCount++;
        await this.retryConnection();
      } else {
        await this.cleanup();
      }
    });
  }

  private async retryConnection() {
    await new Promise(resolve => setTimeout(resolve, this.retryDelay * this.retryCount));
    try {
      await this.cleanup();
      await this.start();
    } catch (error) {
      console.error('Retry failed:', error);
    }
  }

  private async ensureConnection() {
    if (!this.connectionPromise) {
      this.connectionPromise = this.initializeVapi();
    }
    return this.connectionPromise;
  }

  async start() {
    const now = Date.now();
    if (now - this.lastCallTime < this.minCallInterval) {
      await new Promise(resolve => setTimeout(resolve, this.minCallInterval));
    }
    this.lastCallTime = now;

    if (this.isCallActive) await this.cleanup();

    try {
      await this.ensureConnection();
      const assistantId = import.meta.env.VITE_VAPI_ASSISTANT_ID;
      if (!assistantId) throw new Error('Assistant ID is required');

      if (!this.vapi) throw new Error('VAPI not initialized');
      await this.vapi.start(assistantId);
      this.isCallActive = true;
      return true;
    } catch (error) {
      console.error('Failed to start call:', error);
      this.isCallActive = false;
      throw error;
    }
  }

  async close() {
    try {
      if (this.isCallActive && this.vapi) {
        this.vapi.stop();
        this.isCallActive = false;
      }
    } catch (error) {
      console.error('Error stopping call:', error);
      this.isCallActive = false;
    } finally {
      this.connectionPromise = null;
      this.retryCount = 0;
    }
  }

  private async cleanup() {
    await this.close();
  }

  isActive(): boolean {
    return this.isCallActive;
  }

  toggleMute(mute: boolean) {
    if(this.vapi) this.vapi.setMuted(mute);
  }
}

export const vapiService = VapiService.getInstance();