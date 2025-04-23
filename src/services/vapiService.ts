import Vapi from '@vapi-ai/web';

export class VapiService {
  private vapi: Vapi | null = null;
  private isCallActive = false;
  private static instance: VapiService;
  private retryCount = 0;
  private maxRetries = 3;
  private retryDelay = 1000;
  private lastCallTime = 0;
  private minCallInterval = 500; // Minimum time between calls in ms
  private connectionPromise: Promise<void> | null = null;

  constructor() {
    // Lazy initialization - don't create Vapi instance until needed
  }

  static getInstance(): VapiService {
    if (!VapiService.instance) {
      VapiService.instance = new VapiService();
    }
    return VapiService.instance;
  }

  private async initializeVapi() {
    if (this.vapi) return;

    const apiKey = import.meta.env.VITE_VAPI_PUBLIC_KEY;
    if (!apiKey) {
      throw new Error('VAPI API key is required');
    }

    this.vapi = new Vapi(apiKey);

    // Set up event listeners with error handling
    this.vapi.on('call-start', () => {
      this.isCallActive = true;
      this.retryCount = 0; // Reset retry count on successful connection
    });

    this.vapi.on('call-end', () => {
      this.isCallActive = false;
    });

    this.vapi.on('error', async (error) => {
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
    // Debounce calls
    const now = Date.now();
    if (now - this.lastCallTime < this.minCallInterval) {
      await new Promise(resolve => setTimeout(resolve, this.minCallInterval));
    }
    this.lastCallTime = now;

    if (this.isCallActive) {
      await this.cleanup();
    }

    try {
      await this.ensureConnection();
      
      const assistantId = import.meta.env.VITE_VAPI_ASSISTANT_ID;
      if (!assistantId) {
        throw new Error('Assistant ID is required');
      }

      // Optimize microphone initialization
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      
      // Release the stream immediately but keep track of settings
      const audioTrack = stream.getAudioTracks()[0];
      const settings = audioTrack.getSettings();
      stream.getTracks().forEach(track => track.stop());

      if (!this.vapi) throw new Error('VAPI not initialized');
      await this.vapi.start(assistantId);
      this.isCallActive = true;
      return true;
    } catch (error) {
      console.error('Failed to start call:', error);
      this.isCallActive = false;
      if (this.retryCount < this.maxRetries) {
        this.retryCount++;
        return this.retryConnection();
      }
      await this.cleanup();
      throw error;
    }
  }

  async close() {
    try {
      if (this.isCallActive && this.vapi) {
        await this.vapi.stop();
        this.isCallActive = false;
      }
    } catch (error) {
      console.error('Error stopping call:', error);
      this.isCallActive = false;
    } finally {
      // Reset connection state
      this.connectionPromise = null;
      this.retryCount = 0;
    }
  }

  private async cleanup() {
    try {
      if (this.isCallActive && this.vapi) {
        await this.vapi.stop();
        this.isCallActive = false;
      }
    } catch (error) {
      console.error('Error cleaning up call:', error);
      this.isCallActive = false;
    } finally {
      // Reset connection state
      this.connectionPromise = null;
      this.retryCount = 0;
    }
  }

  isActive(): boolean {
    return this.isCallActive;
  }

  setMuted(muted: boolean) {
    if (this.isCallActive && this.vapi) {
      this.vapi.setMuted(muted);
    }
  }

  isMuted(): boolean {
    return this.vapi?.isMuted() ?? false;
  }
}

export const vapiService = VapiService.getInstance(); 