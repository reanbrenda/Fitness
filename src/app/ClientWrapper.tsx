'use client';

import { useEffect } from 'react';

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.async = true;
    document.body.appendChild(script);

    window.onYouTubeIframeAPIReady = () => {
      console.log('YouTube IFrame API is ready');
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <>{children}</>;
};

export default ClientWrapper;
