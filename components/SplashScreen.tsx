import { useEffect } from 'react';
import Loader from './Loader';

interface SplashScreenProps {
  onFinish?: () => void;
  timeout?: number;
}

export default function SplashScreen({ onFinish, timeout = 3000 }: SplashScreenProps) {
  useEffect(() => {
    if (!onFinish) return;
    const timer = setTimeout(onFinish, timeout);
    return () => clearTimeout(timer);
  }, [onFinish, timeout]);

  return (
    <div className="splash-screen">
      <Loader />
      <style jsx>{`
        .splash-screen {
          position: fixed;
          inset: 0;
          background-color: #0b0b0b;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          animation: fadeOut 0.6s ease ${timeout}ms forwards;
        }

        @keyframes fadeOut {
          to {
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
          }
        }
      `}</style>
    </div>
  );
}

