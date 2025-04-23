import { useEffect, useState } from 'react';
import { Battery } from 'lucide-react';

const ChatbotStatusBar = () => {
  const [currentTime, setCurrentTime] = useState('12:00');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      setCurrentTime(`${hours}:${minutes.toString().padStart(2, '0')}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-12 flex items-center justify-between px-6 bg-theme-bg-primary border-b border-theme-border-primary z-10">
      <div className="text-theme-text-primary text-[14px] font-medium">{currentTime}</div>
      <div className="absolute top-0 left-0 right-0 h-7">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[25px] bg-theme-bg-primary flex items-center justify-center">
          <div className="w-16 h-[3px] rounded-full bg-theme-bg-secondary" />
        </div>
      </div>
      <div>
        <Battery className="w-6 h-6 text-theme-text-primary" />
      </div>
    </div>
  );
};

export default ChatbotStatusBar;
